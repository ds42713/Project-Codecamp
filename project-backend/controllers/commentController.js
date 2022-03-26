const { includes } = require('lodash')
const {Comment, Movie, User } = require('../models')

const getComment = async (req,res,next) => {
    try {
        const movieId = Number(req.params.id)
        const comment = await Comment.findAll({
            where:{ MovieId: movieId },
            include:{
                    model: User,
                    attributes: ['name']
            }
        })
        res.status(200).json({comment})
    } catch(err) {
        next(err)
    }
}


const createComment = async (req,res) => {
    const {title, movieId} = req.body
    const movie = await Movie.findOne({where:{ id: movieId}})
    if(!movie){
        return res.status(404).json({message: 'movie not found'})
    }
    const newComment = await Comment.create({
        title: title,        
        MovieId: movieId,
        UserId: req.user.id
    })

    const comment = await Comment.findOne({
        where: { id : newComment.id },
        include: {
            model: User,
            attributes: ['name']
        }
    })


    res.status(201).json(comment)
}

const deleteComment = async (req,res,next) => {
    try{
        const { id } = req.params
        const comment = await Comment.findOne( {where: { id: id }})
        console.log(comment)
        if(!comment) {
            return res.status(400).json({message: 'comment not found'})
        }

        if(req.user.id !== comment.UserId){
            return res.status(403).json({message: 'can not delete this comment'})
        }
        await comment.destroy()
        res.status(204).json()
    } catch(err){
        next(err)
    }
}

module.exports = {
    getComment,
    createComment,
    deleteComment
};
