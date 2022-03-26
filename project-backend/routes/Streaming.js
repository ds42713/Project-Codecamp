const express = require('express');
const router = express.Router();
const streamingContollers = require('../controllers/streamingController');

const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, streamingContollers.getStreamingAll)
router.get('/:id', authenticate, streamingContollers.getStreamingId)
router.post('/', authenticate, streamingContollers.createStreaming);

module.exports = router;
