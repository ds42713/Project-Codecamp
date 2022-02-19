const {Genre,Movie} = require('../models')

const getGenreAll = async (req,res,next) => {
    try{
        const streaming = await Genre.findAll()
        res.status(200).send(streaming)
    } catch (err) {
        next(err)
    }
}
const getGenreId = async (req,res) => {
    try{
        const genreId = Number(req.params.id);
        const targetGenre = await Genre.findOne({where:{id:genreId},include:[Movie]})
        if(!targetGenre){
            return res.status(400).json({message:'no genre'})
        }
        res.status(200).send(targetGenre)
    } catch (err){
        next(err)
    }
}

const createGenre = async (req,res,next) => {
    try{
        const {genreName} = req.body

        const newGenre = await Genre.create({
            genreName: genreName,
        })
        res.status(201).json(newGenre)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getGenreAll,
    getGenreId,
    createGenre

};
