const express = require('express');
const db = require('../models')
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await db.Recipient.find({})
    res.json({result})
  } catch(err) {
      console.log('Error on index.route', err);
      res.json({Error: 'Unable to retrieve user'})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await db.Recipient.findById(req.params.id)
    .populate('gifts')
    .exec((err, gifts) => {
      if(err) console.log(err)
      console.log(gifts)
    })
    res.json({result, data: gifts})
  } catch(err) {
      console.log('Error on show.route', err);
      res.json({Error: 'Unable to retrieve user'})
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await db.Recipient.create(req.body)
    db.User.findById(req.body.user, (err, foundUser) => {
      if(err) return console.log(err);
      foundUser.recipients.push(result._id)
      foundUser.save((err, savedUser) => {
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
    const result = await db.Recipient.findByIdAndUpdate(
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
    const result = await db.Recipient.findByIdAndDelete(req.params.id)
    db.Gift.deleteMany({_id: {$in: result.gifts}}, (err) => {
      if(err) return console.log(err);      
    })
    res.json(result)
  } catch(err) {
      console.log('Error on delete route', err);
      res.json({Error: 'Unable to delete data'})
  }
});

module.exports = router;