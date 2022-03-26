const express = require('express');
const router = express.Router();
const genreContollers = require('../controllers/genreController');

const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, genreContollers.getGenreAll)
router.get('/:id', authenticate, genreContollers.getGenreId)
router.post('/', authenticate, genreContollers.createGenre);

module.exports = router;
