require('dotenv').config()
require('./config/passport')
const db = require('./models/index')
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');
const actorRoutes = require('./routes/actor')
const streamingRoutes = require('./routes/streaming')
const genreRoutes = require('./routes/genre')
const commentRoutes = require('./routes/comment');
const listRoutes = require('./routes/list');


const app = express();

app.use(cors()); // จำเป็นต้องเรียก
app.use(express.json()); // จำเป็นต้องเรียก
app.use(express.urlencoded({ extended: false })); // จำเป็นต้องเรียก

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/actors', actorRoutes);
app.use('/streamings', streamingRoutes);
app.use('/genres', genreRoutes);
app.use('/comments', commentRoutes);
app.use('/lists', listRoutes);

app.use((req,res) => {
    res.status(404).json({ message: 'resource not found on this server '})
})
app.use((err,req,res,next) => {
    console.log(err)
    res.status(500).json({ message: err.message })
})

const port = process.env.PORT
db.sequelize.sync({force: false}).then(() => {
    console.log("Database is sync DONE")
    app.listen(port, () => {
        console.log(`Server is running at port ${process.env.PORT}`);
    });
})