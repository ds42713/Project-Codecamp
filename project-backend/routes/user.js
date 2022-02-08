const express = require('express');
const router = express.Router();
const userContollers = require('../controllers/user');


router.post('/register', userContollers.registerUser);
router.post('/login', userContollers.loginUser);

module.exports = router;
