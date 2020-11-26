const express = require('express');
const ctrl = require('../controllers')
const router = express.Router();

router.get('/', ctrl.gifts.index);

module.exports = router;