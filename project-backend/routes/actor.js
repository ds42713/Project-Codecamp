const express = require('express');
const userContollers = require('../controllers/actorController');
const authenticate = require('../middlewares/authenticate')


const router = express.Router();

router.get('/', authenticate, userContollers.getActorAll)
router.get('/:id', authenticate, userContollers.getActorId)
router.post('/', authenticate, userContollers.createActor);

module.exports = router;





