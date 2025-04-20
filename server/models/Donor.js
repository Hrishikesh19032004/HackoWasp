
const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  location: String,
  password: String,
  points: {
    type: Number,
    default: 0,  // Initialize points to 0
  },
});

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
