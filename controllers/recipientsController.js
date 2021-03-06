const express = require('express');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const db = require('../models');
const { User, Recipient } = require('../models');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');


//get list of recipients
router.get('/', auth, async (req, res) => {
  try {
    const recipients = await db.Recipient.find({})
    res.json(recipients)
  } catch(err) {
      console.log(err.message);
      res.status(500).send('Server error');
  }
});

//show gift
router.get('/gift/:id/:gift_id', auth, async (req, res) => {

  try {
    const recipient = await db.Recipient.findById(req.params.id);
  

    const gift = recipient.gifts.id(req.params.gift_id)

    if(!gift) {
      return res.status(404).json({msg: 'Gift does not exist'})
    }

    res.json(gift)
    
  } catch(err) {

    if(err.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Recipient not found'})
    };

    res.status(500).send('Server error');
  }
});

//show recipient
router.get('/:id', auth, async (req, res) => {
  try {
    const result = await db.Recipient.findById(req.params.id)

    if(!result) {
      return res.status(404).json({msg: 'Recipient not found'})
    };
    res.json(result)
    
  } catch(err) {

    if(err.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Recipient not found'})
    };
    res.status(500).send('Server error');
  }
});

//create recipient
router.post('/', 
[auth,], 
upload.single('image'),
async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select('-password');
    const result = await cloudinary.uploader.upload(req.file.path);

    const newRecipient = new Recipient ({ 
      name: req.body.name,
      relationship: req.body.relationship,
      budget: req.body.budget,
      user: req.user.id,
      image: result.url
    })
  
    const recipient = await newRecipient.save();

    user.recipients.push(recipient);
    user.save();

    res.json(recipient);

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

//add gift
router.post('/gift/:id', [auth, [
      check('name', 'Name is required').not().isEmpty(),
      check('price', 'Price is required').not().isEmpty()
]], async(req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const recipient = await Recipient.findById(req.params.id);

    const newGift = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      purchased: req.body.purchased
    }

    recipient.gifts.unshift(newGift);

    await recipient.save();

    res.json(recipient.gifts);

  } catch(err) {
    res.status(500).send('Server error');
  }
});

//edit gift
router.put('/gift/:id/:gift_id', auth, async (req, res) => {
  try {

    const recipient = await db.Recipient.findById(req.params.id);
    const giftToUpdate = recipient.gifts.id(req.params.gift_id);

    giftToUpdate.name = req.body.name;
    giftToUpdate.price = req.body.price;
    giftToUpdate.quantity = req.body.quantity;
    giftToUpdate.purchased = req.body.purchased;

    await recipient.save()
    res.json(recipient)
  } catch(err) {

    res.status(500).send('Server error');
  } 
});

//edit recipient
router.put('/:id', auth, async (req, res) => {
  try {

    const recipient = await db.Recipient.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      );
    res.json(recipient)
  } catch(err) {

    res.status(500).send('Server error');
  } 
});

//delete gift
router.delete('/gift/:id/:gift_id', auth, async (req, res) => {
  try {

    const result = await db.Recipient.findById (
      req.params.id,
    )
    const giftToDelete = result.gifts.id(req.params.gift_id)
    giftToDelete.remove()
    await result.save()

    res.sendStatus(200)
  } catch(err) {

    if(err.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Recipient not found'})
    };

    res.status(500).send('Server error');
  }
});


//delete recipient
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await db.Recipient.findById(req.params.id);

    if(result.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'User not authorized'})
    }

    await result.remove();

    res.json({msg: 'Recipient removed'})
  } catch(err) {

    if(err.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Recipient not found'})
    };

    res.status(500).send('Server error');
  }
});

module.exports = router;