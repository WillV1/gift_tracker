const express = require('express');
const db = require('../models')
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await db.Gift.find({})
    res.json({result})
  } catch(err) {
      console.log('Error on index.route', err);
      res.json({Error: 'Unable to retrieve user'})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await db.Gift.findById(req.params.id)
    res.json({result})
  } catch(err) {
      console.log('Error on show.route', err);
      res.json({Error: 'Unable to retrieve user'})
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await db.Gift.create(req.body)
    db.Recipient.findById(req.body.recipient, (err, foundRecipient) => {
      if(err) return console.log(err);
      foundRecipient.gifts.push(result._id)
      foundRecipient.save((err, savedRecipient) => {
        if (err) return console.log(err)
      })
    })
    res.json({result})
  } catch(err) {
    console.log('Error on create route', err);
    res.json({Error: 'Unable to save data'})
  }
});

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
