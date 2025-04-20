const Donor = require('../models/Donor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Donor Signup
exports.signupDonor = async (req, res) => {
  const { name, number, email, location, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDonor = new Donor({ name, number, email, location, password: hashedPassword });

    await newDonor.save();
    res.status(201).json({ message: 'Donor registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering donor', details: error.message });
  }
};

// Donor Login
exports.loginDonor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const donor = await Donor.findOne({ email });
    if (!donor) return res.status(404).json({ error: 'Donor not found' });

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Replace 'SECRET_KEY' with an actual secret
    res.json({ token, donor });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in donor', details: error.message });
  }
};

exports.getDonorsSortedByPoints = async (req, res) => {
  try {
    const donors = await Donor.find({}, 'name points')  // Only retrieve name and points
      .sort({ points: 1 })  // Sort by points in ascending order
      .exec();

    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching donors', details: error.message });
  }
};