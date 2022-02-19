const express = require('express');
const commentContollers = require('../controllers/commentController');
const authenticate = require('../middlewares/authenticate')

const router = express.Router();

router.post('/', authenticate, commentContollers.createComment);
router.delete('/', authenticate, commentContollers.deleteComment)

module.exports = router;
