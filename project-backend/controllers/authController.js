const { User } = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req,res,next) => {
    try {
        const { name, username, password, confirmPassword} = req.body
        if (password !== confirmPassword){
            return res.status(400).json({ message: 'password and confirm password did not match'})
        }

        const existUser = await User.findOne({ where: {username: username}})
        if(existUser){
            res.status(400).send({message: "username already taken."})
        } else {
            
            const salt = bcryptjs.genSaltSync(12)
            const hashedPassword = bcryptjs.hashSync(password, salt)

            await User.create({
                name: name,
                username: username,
                password: hashedPassword,
                role: 'USER'
            })
            res.status(201).send({message: 'user created'})
        }
    } catch(err){
        next(err)
    }
}


const login =  async (req,res,next) => {
    try{
        const {username, password } = req.body
        let user = await User.findOne({where:{username:username}})
        if(!user){
            return res.status(400).send({message:"username or password is wrong"})
        } 

        const isMatch = await bcryptjs.compare(password , user.password)
        if(!isMatch) {
            return res.status(400).json({message: "invalid email, phone number or password"})
        }
        const payload = { 
            id: user.id, 
            name: user.name,
            role: user.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24 * 30
        })
        const { name, role } = user;
        res.status(200).json({token, user:{name, role}})
        
    } catch(err){
        next(err)
    }
}

const getUser = async (req,res,next) => {
    const { id, name, role } = req.user;
    res.status(200).json({
        user: { id, name, role 
    }});
}

module.exports = {
    register,
    login,
    getUser
}
