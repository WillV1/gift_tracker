const express = require('express');
const db = require('../models')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await db.User.find({})
    res.json({result})
  } catch (err) {
      console.log('Error on index.route', err);
      res.json({Error: 'Unable to retrieve user'})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await db.User.findById(req.params.id)
    res.json({result})
  } catch (err) {
      console.log('Error on show.route', err);
      res.json({Error: 'Unable to retrieve user'})
  }
});

router.post('/', [
  //express validation
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters')
  .isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { name, email, password } = req.body;

  //user registration (see if user exists, encrypt password, return jsonwebtoken)

  try { 
    let user = await db.User.findOne({email});
    if(user) {
      return res.status(400).json({errors: [{ msg: 'User already exists'}]});
    }

    user = new User({
      name, email, password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.SECRET,
    { expiresIn: 360000 },
    (err, token) => {
    if(err) throw err;
    res.json({token});
    });

  } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error')
  };


});

module.exports = router;