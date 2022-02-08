const express = require('express');
const router = express.Router();
const userContollers = require('../controllers/genre');

const passport = require('passport')
const authentication = passport.authenticate('jwt' , {session:false}) // 'jwt' มาจาก passport.use("jwt",JWTStrategy) ใน config/passport/passport

router.get('/',userContollers.getGenre)
router.get('/:id',userContollers.getGenreID)


module.exports = router;
