const db = require('../models')

//index route
const index = (req, res) => {
  res.send('Gift Route')
}

module.exports = {
  index
}
