const express = require('express');
const db = require('../models')
const { User, Profile } = require('../models');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

//get profile
router.get('/user', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate('User',
    ['name']);

    if(!profile) {
      return res.status(400).json({msg: 'No profile exists for user'})
    }

    res.json(profile);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

//create profile
router.post('/', auth, async (req, res) => {
  

  try {
    let user = await User.findById(req.user.id)
    
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.username = req.body.username;
    profileFields.email = req.body.email;

    const newProfile = new Profile(profileFields)

    await newProfile.save();

    res.json(newProfile);
    
  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server error')
  }
})


module.exports = router;