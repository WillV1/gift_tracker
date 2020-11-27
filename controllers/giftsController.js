const express = require('express');
const db = require('../models');
const { Recipient, Gift } = require('../models');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

//show list of gifts
router.get('/', async (req, res) => {
  try {
    const result = await db.Gift.find({})
    res.json({result})
  } catch(err) {
      console.log('Error on index.route', err);
      res.json({Error: 'Unable to retrieve user'})
  }
});

//show gift
router.get('/:id', async (req, res) => {
  try {
    const result = await db.Gift.findById(req.params.id)
    res.json({result})
  } catch(err) {
      console.log('Error on show.route', err);
      res.json({Error: 'Unable to retrieve user'})
  }
});

//add new gift
router.post('/', 
[auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('quantity', 'Quantity is required').not().isEmpty()
]], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    // const recipient = await Recipient.findById(req.params.id);

    const newGift = new Gift ({ 
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      purchased: req.body.purchased,
      // recipient: req.params.id
    })

    const gift = await newGift.save();

    // recipient.gifts.push(gift);
    // recipient.save();
    
    res.json(gift);

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

//edit gift
router.put('/:id', async (req, res) => {
  try {
    const result = await db.Gift.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    ) 
    res.json(result)
  } catch(err) {
      console.log('Error on update route', err);
      res.json({Error: 'Unable to update data'})
  } 
});

//delete gift
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.Gift.findByIdAndDelete(req.params.id)
    res.json(result)
  } catch(err) {
      console.log('Error on delete route', err);
      res.json({Error: 'Unable to delete data'})
  }
});

module.exports = router;
