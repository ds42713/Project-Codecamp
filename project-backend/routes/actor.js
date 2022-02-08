const express = require('express');
const router = express.Router();
const userContollers = require('../controllers/actor');

const passport = require('passport')
const authentication = passport.authenticate('jwt' , {session:false}) // 'jwt' มาจาก passport.use("jwt",JWTStrategy) ใน config/passport/passport

router.get('/:id',userContollers.getActor)
router.post('/', userContollers.addActor);

module.exports = router;
