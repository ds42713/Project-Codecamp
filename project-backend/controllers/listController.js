const {Movie, List, User, Genre, Streaming, Producer, Actor, Comment} = require('../models')

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

const getListAll = async (req, res, next) => {
    try {
        const movie = await List.findAll({

            where:{ UserId: req.user.id},
            include:[
                {
                    model: Movie,
                    include:[
                        {
                            model: Producer ,
                            attributes: ['producerName']
                        },
                        {
                            model: Genre ,
                            attributes: ['genreName']
                        },
                        {
                            model: Streaming ,
                            attributes: ['streamingName','streamingImg']
                        },
                        {
                            model: Actor ,
                            attributes: ['actorName']
                        },
                        {
                            model: Comment ,
                            attributes: ['title', "createdAt"]
                        },
                        {
                            model: List,
                            attributes: ['UserId']
                        }
                    ]
        
                }
            ]

    
        })

        if(!movie){
            return res.status(400).json({message:'no movie'})
        }
        res.status(200).json({movie})

    } catch(err) {
        next(err)
    }
};

module.exports = {

    createList,
    getListID,
    deleteList,
    getListAll
    
};