const mongoose = require('mongoose');
const recipientSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  relationship: String, 
  budget: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  gifts: [{
    name: {type: String},
    price: {type: Number},
    quantity: {type: Number},
    purchased: {type: Boolean}
  }],
  image: String
});

const Recipient = mongoose.model('Recipient', recipientSchema);

module.exports = Recipient;