const db = require('../models')

const getMovie = async (req, res) => {
    const movie = await db.Movie.findAll({include:[db.Genre,db.Streaming,db.Producer,db.Actor,db.Comment]})
    res.status(200).send(movie)
};

const getMovieId = async (req,res) => {
    const movieId = Number(req.params.id);
    const targetMovie = await db.Movie.findOne({where:{id:movieId},include:[db.Genre,db.Streaming,db.Producer,db.Actor,db.Comment]})

    res.status(200).send(targetMovie)
}

// const addMovie = async (req,res) => {
//     const {movieName,movieDetails,movieRating,moviePicture,movieType,movieSeason} = req.body
//     const {producerId} = req.body
//     const {actorId} = req.body

//     const newMovie = await db.Movie.create({
//         name: movieName,
//         details: movieDetails,
//         rating: movieRating,
//         picture: moviePicture,
//         type: movieType,
//         season: movieSeason,
//         ProducerId: producerId,
//     })

//     const newActor_movie = await db.Movie_actor.create({
//          ActorId: actorId,
//          movie_id: newMovie.id,
//      })
//      console.log(newMovie.id)
//      console.log(newActor_movie)
//     res.status(201).send(newMovie)

// }

const addMovie = async (req,res) => {
    const {movieName,movieDetails,movieRating,moviePicture,movieType,movieSeason} = req.body
    const {producerId} = req.body
    //const streamingId = req.body.streamingId
    // const [genreId] = req.body
    // const [actorId] = req.body 
    
    const actor = db.Actor.hasMany(db.Movie , { as:'movie_actor'})

    const newMovie = await db.Movie.create({
        name: movieName,
        details: movieDetails,
        rating: movieRating,
        picture: moviePicture,
        type: movieType,
        season: movieSeason,
        ProducerId: producerId,

        Actors: [
            {id:1,name:'Robert Downey Jr.'},
            {id:2,name:'Chris Evans'}
        ]
        // สร้าง actor ใหม่

    }
    , {
         include: [{
            association : db.Actor,
            as : 'movie_id'
        } ] 
    })

    res.status(201).send(newMovie)

}

module.exports = {
    getMovie,
    addMovie,
    getMovieId
    
};

