const { Actor,Movie } = require('../models')

const getActorAll = async (req,res,next) => {
    try{
        const actor = await Actor.findAll()
        res.status(200).json(actor)
    } catch(err){
        next(err)
    }
}
const getActorId = async (req,res,next) => {
    try{
        const actorId = Number(req.params.id);
        const targetActor = await Actor.findOne({where:{id:actorId},include:[Movie]})
        if(!targetActor){
            return res.status(400).json({message:'no actor'})
        }

        res.status(200).json(targetActor)
    } catch(err){
        next(err)
    }
}

const createActor = async (req,res,next) => {
    try {
        const {actorName} = req.body

        const newActor = await Actor.create({
            actorName: actorName,
        })
        res.status(201).json(newActor)
    } catch(err){
        next(err)
    }
}

module.exports = {
    getActorAll,
    getActorId,
    createActor,
};
