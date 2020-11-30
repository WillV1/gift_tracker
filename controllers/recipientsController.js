const express = require('express');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const db = require('../models');
const { User, Recipient } = require('../models');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// const upload = require('../services/upload');
// const { uploadImage, getImage } = require('./imageController');


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

//show recipient
router.get('/:id', auth, async (req, res) => {
  try {
    const result = await db.Recipient.findById(req.params.id, "-__v")

    if(!result) {
      return res.status(404).json({msg: 'Recipient not found'})
    };
    res.json({result})
    
  } catch(err) {
    console.log(err.message);

    if(err.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Recipient not found'})
    };
    res.status(500).send('Server error');
  }
});

//create recipient
router.post('/', 
[auth, 
//   [
//   check('name', 'Name is required').not().isEmpty(),
//   check('budget', 'Budgeted amount is required').not().isEmpty()
// ]
], 
upload.single('image'),
async (req, res) => {
  // const errors = validationResult(req);
  // if(!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() })
  // }

  try {

    const user = await User.findById(req.user.id).select('-password');
    const result = await cloudinary.uploader.upload(req.file.path);

    const newRecipient = new Recipient ({ 
      name: req.body.name,
      relationship: req.body.relationship,
      budget: req.body.budget,
      user: req.user.id,
      image: result.public_id
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

//edit recipient (add / edit gifts)
router.put('/:id', auth, async (req, res) => {
  try {

    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const purchased = req.body.purchased;

    const recipient = await db.Recipient.findByIdAndUpdate(
      req.params.id,
      {$push: {"gifts": {name: name, 
      price: price,
      quantity: quantity,
      purchased: purchased}}},
      {safe: true, upsert: true, new: true},
      );
    res.json(recipient)

  } catch(err) {
    console.log(err.message);
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
    console.log(err.message);

    if(err.kind === 'ObjectId') {
      return res.status(404).json({msg: 'Recipient not found'})
    };

    res.status(500).send('Server error');
  }
});

module.exports = router;