const Receiver = require('../models/Receiver');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Receiver Signup
exports.signupReceiver = async (req, res) => {
  const { name, email, registrationNumber, phone, location, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new receiver instance
    const newReceiver = new Receiver({
      name,
      email,
      registrationNumber,
      phone,
      location,
      password: hashedPassword,
    });

    // Save to database
    await newReceiver.save();
    res.status(201).json({ message: 'Receiver registered successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Error registering receiver', details: error.message });
  }
};

// Receiver Login
// Receiver Login
exports.loginReceiver = async (req, res) => {
  const { email, password } = req.body;

  try {
    const receiver = await Receiver.findOne({ email }); // Find by email instead of registration number
    if (!receiver) return res.status(404).json({ error: 'Receiver not found' });

    const isMatch = await bcrypt.compare(password, receiver.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: receiver._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, receiver });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in receiver', details: error.message });
  }
};
