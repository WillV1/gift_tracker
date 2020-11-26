const db = require('../models')

//index route
const index = (req, res) => {
  res.send('User Route')
}

module.exports = {
  index
}