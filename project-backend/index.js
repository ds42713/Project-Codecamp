require('dotenv').config()

const db = require('./models/index')
const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');
const actorRoutes = require('./routes/actor')
const streamingRoutes = require('./routes/streaming')
const genreRoutes = require('./routes/genre')
const commentRoutes = require('./routes/comment')

require('./config/passport/passport')

app.use(cors()); // จำเป็นต้องเรียก
app.use(express.json()); // จำเป็นต้องเรียก
app.use(express.urlencoded({ extended: false })); // จำเป็นต้องเรียก

app.use('/users', userRoutes);
app.use('/movie', movieRoutes);
app.use('/actor', actorRoutes);
app.use('/streaming', streamingRoutes);
app.use('/genre', genreRoutes);
app.use('/comment', commentRoutes);

db.sequelize.sync({force: false}).then(() => {
    console.log("Database is sync DONE")
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at port ${process.env.PORT}`);
    });
})
