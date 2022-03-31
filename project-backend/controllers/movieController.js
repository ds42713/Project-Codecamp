const { listen } = require('express/lib/application');
const { User, Movie, Genre, Streaming, Producer, Actor, Comment, Movie_actor, Movie_genre, Movie_streaming, List} = require('../models')

const db = require('../models')

const getMovieAll = async (req, res, next) => {
    try {
        const movie = await Movie.findAll({
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
            ]})

        if(!movie){
            return res.status(400).json({message:'no movie'})
        }
        res.status(200).json({movie})

    } catch(err) {
        next(err)
    }
};

const getMovieId = async (req, res, next) => {
    try {
        const movieId = Number(req.params.id);
        const movie = await Movie.findOne({
            
            where:{id:movieId},
            include:[
                Genre,
                Streaming,
                Producer,
                Actor,
                {
                    model: Comment,
                    include: {
                      model: User,
                      attributes: ['name']
                    }
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
}

const createMovie = async (req, res, next) => {
    try{
        
        const { movieName, details, rating, type, season, movieImg, movieImgPoster, actor , genre, streaming } = req.body

        const {producer} = req.body
        if (!req.user.type == 'ADMIN' ){
            return res.status(404).json({message: 'cannot create movie'})
        }

        const movie = await Movie.findOne({where:{ movieName: movieName}})
        if(movie){
            return res.status(404).json({message: 'have movie'})
        }

        const producerId = await Producer.findOne({where:{ producerName:producer }}) //addProducer

        const createMovie = await Movie.create({
            movieName: movieName,
            details: details,
            rating: rating,
            type: type,
            movieImg: movieImg,
            movieImgPoster: movieImgPoster,
            season: season,
            ProducerId: producerId.id  
        })

        const arrayGenre = genre.split('/')
        arrayGenre.pop()

        let arrayGenreId = []
        
        for (item of arrayGenre ) {
            const genreid = await Genre.findOne({where:{genreName:item}})
            arrayGenreId.push(genreid.dataValues.id)
        }
        const idGenre = arrayGenreId.map(async (item)=> (
            await Movie_genre.create({
                GenreId: Number(item), //1,2,3
                MovieId: Number(createMovie.id) //1
            }) 
        )) 

        const arrayActor = actor.split('/')
        arrayActor.pop()

        let arrayActorId = []

        for (item of arrayActor ) {
            const actorid = await Actor.findOne({where:{actorName:item}})
            arrayActorId.push(actorid.dataValues.id)
        }
        const idActor = arrayActorId.map(async (item)=> (
            await Movie_actor.create({
                ActorId: Number(item),
                MovieId: Number(createMovie.id)
            }) 
        ))

        const arrayStreaming = streaming.split('/')
        arrayStreaming.pop()

        let arrayStreamingId = []

        for (item of arrayStreaming ) {
            const streamingid = await Streaming.findOne({where:{streamingName:item}})
            arrayStreamingId.push(streamingid.dataValues.id)
        }
        const idStreaming = arrayStreamingId.map(async (item)=> (
            await Movie_streaming.create({
                StreamingId: Number(item),
                MovieId: Number(createMovie.id)
            }) 
        ))


        res.status(201).json({createMovie})

    } catch(err) {
        next(err)
    }
}

const updateMovie = async (req, res, next) => {
    try{
        const { movieName, details, rating, type, season, movieImg, movieImgPoster } = req.body

        const {producer} = req.body
        const movieId = Number(req.params.id);

        if (!req.user.type == 'ADMID' ){
            return res.status(404).json({message: 'cannot create movie'})
        }

        const producerId = await Producer.findOne({where:{ producerName:producer }})

        const movie = await Movie.findOne({where:{id:movieId}})
        //if
        if(movie) {
            await movie.update({
                movieName: movieName,
                details: details,
                rating: rating,
                type: type,
                movieImg: movieImg,
                movieImgPoster: movieImgPoster,
                season: season,
                ProducerId: producerId.id 
            })
        }
        
        res.status(201).json({movie})

    } catch(err) {
        next(err)
    }
}

const updateMovieActor = async (req, res, next) => {
    try {
        const { actor } = req.body
        const movieId = Number(req.params.id);
        if (!req.user.type == 'ADMIN' ){
            return res.status(404).json({message: 'cannot create movie'})
        }
        const deleteMovieActor = await Movie_actor.destroy({where:{MovieId:movieId}})

        const arrayActor = actor.split('/')
        arrayActor.pop()

        let arrayActorId = []

        for (item of arrayActor ) {
            const actorid = await Actor.findOne({where:{actorName:item}})
            arrayActorId.push(actorid.dataValues.id)
        }
        const idActor = arrayActorId.map(async (item)=> (
            await Movie_actor.create({
                ActorId: Number(item),
                MovieId: movieId
            }) 
        ))
        res.status(201).json({message: "actor done"})
    } catch(err) {
        next(err)
    }
}

const updateMovieGenre = async (req, res, next) => {
    try {
        const { genre } = req.body
        const movieId = Number(req.params.id);
        if (!req.user.type == 'ADMIN' ){
            return res.status(404).json({message: 'cannot create movie'})
        }
        const deleteMovieGenre = await Movie_genre.destroy({where:{MovieId:movieId}})

        const arrayGenre = genre.split('/')
        arrayGenre.pop()

        let arrayGenreId = []

        for (item of arrayGenre ) {
            const genreid = await Genre.findOne({where:{genreName:item}})
            arrayGenreId.push(genreid.dataValues.id)
        }
        const idGenre = arrayGenreId.map(async (item)=> (
            await Movie_genre.create({
                GenreId: Number(item),
                MovieId: movieId
            }) 
        ))
        res.status(201).json({message: "genre done"})
    } catch(err) {
        next(err)
    }
}

const updateMovieStreaming = async (req, res, next) => {
    try {
        const { streaming } = req.body
        const movieId = Number(req.params.id);
        if (!req.user.type == 'ADMIN' ){
            return res.status(404).json({message: 'cannot create movie'})
        }
        const deleteMovieStreaming = await Movie_streaming.destroy({where:{MovieId:movieId}})

        const arrayStreaming = streaming.split('/')
        arrayStreaming.pop()

        let arrayStreamingId = []

        for (item of arrayStreaming ) {
            const streamingid = await Streaming.findOne({where:{streamingName:item}})
            arrayStreamingId.push(streamingid.dataValues.id)
        }
        const idStreaming = arrayStreamingId.map(async (item)=> (
            await Movie_streaming.create({
                StreamingId: Number(item),
                MovieId: movieId
            }) 
        ))

        res.status(201).json({message: "streaming done"})
    } catch(err) {
        next(err)
    }
}



module.exports = {

    getMovieAll,
    getMovieId,
    createMovie,
    updateMovie,
    updateMovieActor,
    updateMovieGenre,
    updateMovieStreaming
    
};

