const db = require('../models')

const getGenre = async (req,res) => {
    const streaming = await db.Genre.findAll()
    res.status(200).send(streaming)
}
const getGenreID = async (req,res) => {
    const genreId = Number(req.params.id);
    const targetGenre = await db.Genre.findOne({where:{id:genreId},include:[db.Movie]})

    res.status(200).send(targetGenre)
}

module.exports = {
    getGenre,
    getGenreID,

};
