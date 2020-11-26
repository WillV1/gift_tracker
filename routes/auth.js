const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { User } = require('../models');

//register new user
router.get('/', auth, async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

//authenticate existing user
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
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required')
  .exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { email, password } = req.body;

  //user registration (see if user exists, encrypt password, return jsonwebtoken)

  try { 
    let user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({errors: [{ msg: 'Invalid credentials'}]});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(400).json({errors: [{ msg: 'Invalid credentials'}]});
    }

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