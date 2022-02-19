const {Comment, Movie } = require('../models')


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
    res.status(201).json(newComment)
}

const deleteComment = async (req,res,next) => {
    try{
        const { id } = req.params
        const comment = await Comment.findOne( {where: { id: id }})

        if(!comment) {
            return res.status(400).json({message: 'comment not found'})
        }

        if(req.user.id !== comment.userId){
            return res.status(403).json({message: 'can not delete this comment'})
        }

        await comment.destory()
        res.status(204).json()
    } catch(err){
        next(err)
    }
}

module.exports = {
    createComment,
    deleteComment
};
