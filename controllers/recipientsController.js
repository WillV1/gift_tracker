const express = require('express');
const db = require('../models');
const { User, Recipient, Gift } = require('../models');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

//get list of recipients
router.get('/', async (req, res) => {
  try {
    const result = await db.Recipient.find({})
    res.json({result})
  } catch(err) {
      console.log('Error on index.route', err);
      res.json({Error: 'Unable to retrieve user'})
  }
});

//show recipient
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

//create recipient
router.post('/', 
[auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('budget', 'Budgeted amount is required').not().isEmpty()
]], 
// upload.single('image'), 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    // const gift = await Gift.findById(req.params.id);
    // const image = await cloudinary.uploader.upload(req.file.path);

    const newRecipient = new Recipient ({ 
      name: req.body.name,
      relationship: req.body.relationship,
      budget: req.body.budget,
      user: req.user.id,
      // gifts: gift,
      // img: image
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

//edit recipient
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

//delete recipient
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