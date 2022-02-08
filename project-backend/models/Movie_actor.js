module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define('Movie_actor',{

    },{
        tableName: 'movie_actor',
        timestamps: false
    })
    return model
}