const mongoose = require('mongoose');
const userSchema = new mongoose.Schema ({
  name: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipient'
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;