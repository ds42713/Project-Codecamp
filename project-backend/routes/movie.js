const express = require('express');
const router = express.Router();
const movieContollers = require('../controllers/movieController');

const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, movieContollers.getMovieAll);
router.get('/:id',authenticate, movieContollers.getMovieId);

router.post('/',authenticate, movieContollers.createMovie);

router.patch('/:id',authenticate, movieContollers.updateMovie);
router.post('/actors/:id',authenticate, movieContollers.updateMovieActor);
router.post('/genres/:id',authenticate, movieContollers.updateMovieGenre);
router.post('/streamings/:id',authenticate, movieContollers.updateMovieStreaming);


module.exports = router;
