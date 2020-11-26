const express = require('express');
const ctrl = require('../controllers')
const router = express.Router();

router.get('/', ctrl.recipients.index);

module.exports = router;