const express = require('express');
const router = express.Router();
const listContollers = require('../controllers/listController');

const authenticate = require('../middlewares/authenticate')

router.post('/', authenticate, listContollers.createList);
router.get('/:movieId', authenticate, listContollers.getListID);
router.delete('/:movieId', authenticate, listContollers.deleteList)



module.exports = router;