const express = require('express');
const router = express.Router();
const userContollers = require('../controllers/movieController');

const authenticate = require('../middlewares/authenticate')

router.get('/', userContollers.getMovieAll);
router.get('/:id', userContollers.getMovieId);
router.post('/', userContollers.createMovie);



module.exports = router;
