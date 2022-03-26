const {Streaming, Movie} = require('../models')

const getStreamingAll = async (req,res,next) => {
    try{
        const streaming = await Streaming.findAll()
        res.status(200).json(streaming)
    } catch (err) {
        next(err)
    }
}
const getStreamingId = async (req,res,next) => {
    try{
        const streamingId = Number(req.params.id);
        const targetStreaming = await Streaming.findOne({where:{id:streamingId},include:[Movie]})
        if(!targetStreaming){
            return res.status(400).json({message:'no streaming'})
        }
        res.status(200).send(targetStreaming)
    } catch (err) {
        next(err)
    }
}

const createStreaming = async (req,res,next) => {
    try{
        const {streamingName,streamingImg} = req.body
        if (!req.user.type == 'ADMID' ){
            return res.status(404).json({message: 'cannot create movie'})
        }
        const newStreaming = await Streaming.create({
            streamingName: streamingName,
            streamingImg: streamingImg
        })
        res.status(201).json(newStreaming)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getStreamingAll,
    getStreamingId,
    createStreaming,
};
