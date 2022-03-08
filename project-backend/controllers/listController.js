const {Movie, List} = require('../models')

const createList = async (req, res, next) => {
    try {
        const { movieId } = req.body
        const movie = await Movie.findOne({where:{id: movieId}})
        if(!movie) {
            return res.status(404).json({message: 'movie not found'})
        }

        const list = await List.findOne({where:{
            MovieId: movieId,
            UserId: req.user.id
        }})
        console.log(list)
        if(list) {
            return res.status(404).json({message: 'u have movie'})
        }

        await List.create({
            MovieId: movieId,
            UserId: req.user.id
        })

        res.status(200).json({List})

    } catch(err) {
        next(err)
    }
};

const getListID = async (req, res, next) => {
    try {
        const { movieId } = req.params
        const movie = await Movie.findOne({where:{id: movieId}})
        if(!movie) {
            return res.status(404).json({message: 'movie not found'})
        }

        const list = await List.findOne({where:{
            MovieId: movieId,
            UserId: req.user.id
        }})

        if(!list) {
            return res.status(404).json({message: 'false'})
        }

        res.status(200).json(list)

    } catch(err) {
        next(err)
    }
};

const deleteList = async (req,res,next) => {
    try{
        const { movieId } = req.params
        console.log(movieId)
        console.log(req.user.id)
        const list = await List.findOne( {where: { 
            MovieId: movieId,
            UserId: req.user.id
        }})
        console.log(list)
        if(!list) {
            return res.status(400).json({message: 'list not found'})
        }

        if(req.user.id !== list.UserId){
            return res.status(403).json({message: 'can not delete this like'})
        }

        await list.destroy()
        res.status(204).json()

    } catch(err){
        next(err)
    }
}

module.exports = {

    createList,
    getListID,
    deleteList
    
};