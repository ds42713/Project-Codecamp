const express = require('express');
const router = express.Router();
const movieContollers = require('../controllers/movieController');

const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, movieContollers.getMovieAll);
router.get('/:id',authenticate, movieContollers.getMovieId);
router.post('/', movieContollers.createMovie);



module.exports = router;
