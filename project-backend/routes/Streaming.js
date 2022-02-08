const express = require('express');
const router = express.Router();
const userContollers = require('../controllers/streaming');

const passport = require('passport')
const authentication = passport.authenticate('jwt' , {session:false}) // 'jwt' มาจาก passport.use("jwt",JWTStrategy) ใน config/passport/passport

router.get('/',userContollers.getStreaming)
router.get('/:id',userContollers.getStreamingID)
router.post('/', userContollers.addStreaming);

module.exports = router;
