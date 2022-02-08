const express = require('express');
const router = express.Router();
const userContollers = require('../controllers/movie');



router.get('/', userContollers.getMovie);
router.get('/:id', userContollers.getMovieId);
router.post('/', userContollers.addMovie);



module.exports = router;
