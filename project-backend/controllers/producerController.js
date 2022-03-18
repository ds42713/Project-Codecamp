const { User, Movie, Genre, Streaming, Producer, Actor, Comment, Movie_actor, Movie_genre, Movie_streaming, List} = require('../models')

const createProducer = async (req,res,next) => {
    try{
        const { producerName } = req.body

        const newProducer = await Producer.create({
            producerName: producerName,
        })
        res.status(201).json(newProducer)
    } catch(err){
        next(err)
    }
}

const getProducerAll = async (req,res,next) => {
    try{
        const producer = await Producer.findAll()
        res.status(200).json(producer)
    } catch(err){
        next(err)
    }
}

module.exports = {

    createProducer,
    getProducerAll
};