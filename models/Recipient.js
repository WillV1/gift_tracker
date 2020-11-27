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
    type: String
  }],
  img: String
});

const Recipient = mongoose.model('Recipient', recipientSchema);

module.exports = Recipient;