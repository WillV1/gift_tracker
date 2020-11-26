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
  quantity_purchased: Number,
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipient'
  }
});

const Gift = mongoose.model('Gift', giftSchema);

module.exports = Gift;