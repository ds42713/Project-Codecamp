const db = require('../models')

const getStreaming = async (req,res) => {
    const streaming = await db.Streaming.findAll()
    res.status(200).send(streaming)
}
const getStreamingID = async (req,res) => {
    const streamingId = Number(req.params.id);
    const targetStreaming = await db.Streaming.findOne({where:{id:streamingId},include:[db.Movie]})

    res.status(200).send(targetStreaming)
}

const addStreaming = async (req,res) => {
    const {streamingName} = req.body

    const newStreaming = await db.Streaming.create({
        name: streamingName,
    })
    res.status(201).send(newStreaming)
}

module.exports = {
    getStreaming,
    getStreamingID,
    addStreaming,
};
