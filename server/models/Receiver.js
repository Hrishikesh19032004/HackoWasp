const mongoose = require('mongoose');

const receiverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Add email with uniqueness
    registrationNumber: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    password: { type: String, required: true }, // for login
  },
  { timestamps: true }
);

module.exports = mongoose.model('Receiver', receiverSchema);
