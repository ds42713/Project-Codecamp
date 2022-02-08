const express = require('express');
const router = express.Router();
const commentContollers = require('../controllers/comment');

const passport = require('passport')
const authentication = passport.authenticate('jwt' , {session:false}) // 'jwt' มาจาก passport.use("jwt",JWTStrategy) ใน config/passport/passport


router.post('/', commentContollers.addComment);

module.exports = router;
