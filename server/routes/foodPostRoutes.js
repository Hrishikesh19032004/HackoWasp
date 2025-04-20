const express = require('express');
const {  applyForFoodPost, selectReceiver, createFoodPost, getAllFoodPosts } = require('../controllers/foodPostController');
const { verifyReceiver, verifyDonor } = require('../middleware/authMiddleware'); // Middleware to authenticate donor
const multer = require('multer');

const router = express.Router();

// Multer configuration for photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Set upload directory
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname), // Unique filename
});

const upload = multer({ storage });

// Routes
router.post('/create', verifyDonor, upload.single('photo'), createFoodPost); // With optional photo upload
router.get('/all', getAllFoodPosts); // Public route to fetch all food posts
// Receiver applies for a donation
router.post('/apply/:id', applyForFoodPost); // :id = FoodPost ID

// Donor selects a receiver
router.post('/select/:id', verifyDonor, selectReceiver); // :id = FoodPost ID
module.exports = router;
