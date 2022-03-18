const express = require('express');
const router = express.Router();
const producerContollers = require('../controllers/producerController');

const authenticate = require('../middlewares/authenticate')


router.get('/', authenticate, producerContollers.getProducerAll);
router.post('/', authenticate, producerContollers.createProducer);

module.exports = router;