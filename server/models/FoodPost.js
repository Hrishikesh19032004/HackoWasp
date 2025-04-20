// const mongoose = require('mongoose');

// const foodPostSchema = new mongoose.Schema({
//   donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true }, // Reference to the donor
//   foodName: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   expirationDate: { type: Date, required: true },
//   category: { type: String, required: true }, // e.g., "Vegetarian", "Non-Vegetarian", etc.
//   pickupLocation: { type: String, required: true },
//   contactDetails: { type: String, required: true },
//   photo: { type: String, default: null }, // File path for uploaded photo
// }, { timestamps: true });

// module.exports = mongoose.model('FoodPost', foodPostSchema);
const mongoose = require('mongoose');

const foodPostSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  foodName: { type: String, required: true },
  quantity: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  category: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  contactDetails: { type: String, required: true },
  photo: { type: String, default: null },
  appliedReceivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receiver' }], // List of applicants
}, { timestamps: true });

module.exports = mongoose.model('FoodPost', foodPostSchema);
