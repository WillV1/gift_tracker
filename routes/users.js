const express = require('express');
const { check, validationResult } = require('express-validator/check');
const ctrl = require('../controllers')
const router = express.Router();

router.get('/', ctrl.users.index);
router.get('/:id', ctrl.users.show);
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters')
  .isLength({min: 6})
], ctrl.users.create);

module.exports = router;