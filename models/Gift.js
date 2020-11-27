const mongoose = require('mongoose');
const giftSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  purchased: Boolean,
});

const Gift = mongoose.model('Gift', giftSchema);

module.exports = Gift;