const jwt = require('jsonwebtoken');
const Donor = require('../models/Donor');
const Receiver = require('../models/Receiver');

exports.verifyDonor = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const donor = await Donor.findById(decoded.id);
      if (!donor) {
        return res.status(404).json({ error: 'Donor not found' });
      }
      req.donor = donor;
      next();
    } catch (err) {
      console.error('Donor Token Verification Error:', err.message);
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
  
//   module.exports = verifyDonor;
exports.verifyReceiver = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const receiver = await Receiver.findById(decoded.id).select('-password');
      if (!receiver) {
        return res.status(404).json({ error: 'Receiver not found' });
      }
      req.receiver = receiver;
      next();
    } catch (err) {
      console.error('Receiver Token Verification Error:', err.message);
      res.status(401).json({ error: 'Invalid token' });
    }
  };