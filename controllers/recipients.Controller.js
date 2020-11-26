const db = require('../models')

//index route
const index = (req, res) => {
  res.send('Recipient Route')
}

module.exports = {
  index
}