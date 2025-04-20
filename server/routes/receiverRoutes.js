const express = require('express');
const { signupReceiver, loginReceiver } = require('../controllers/receiverController');

const router = express.Router();

router.post('/signup', signupReceiver);
router.post('/login', loginReceiver);

module.exports = router;
