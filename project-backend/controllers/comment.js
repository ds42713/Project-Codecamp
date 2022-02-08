const db = require('../models')


const addComment = async (req,res) => {
    const {title,comment,movieId,userID} = req.body

    const newComment = await db.Comment.create({
        title: title,
        comment: comment,
        MovieId: movieId,
        UserId: userID
    })
    res.status(201).send(newComment)
}

module.exports = {
    addComment,
};
