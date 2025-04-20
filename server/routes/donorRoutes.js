const express = require('express');
const { signupDonor, loginDonor, getDonorsSortedByPoints} = require('../controllers/donorController');

const router = express.Router();

router.post('/signup', signupDonor);
router.post('/login', loginDonor);
router.get('/sorted', getDonorsSortedByPoints);

module.exports = router;
