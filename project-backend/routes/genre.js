const express = require('express');
const router = express.Router();
const genreContollers = require('../controllers/genreController');

const authenticate = require('../middlewares/authenticate')

router.get('/', genreContollers.getGenreAll)
router.get('/:id', genreContollers.getGenreId)
router.post('/', authenticate, genreContollers.createGenre);

module.exports = router;
