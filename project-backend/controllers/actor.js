const db = require('../models')

const getActor = async (req,res) => {
    const actorId = Number(req.params.id);
    const targetActor = await db.Actor.findOne({where:{id:actorId},include:[db.Movie]})

    res.status(200).send(targetActor)
}

const addActor = async (req,res) => {
    const {actorName} = req.body

    const newActor = await db.Actor.create({
        name: actorName,
    })
    res.status(201).send(newActor)
}

module.exports = {
    getActor,
    addActor,
};
