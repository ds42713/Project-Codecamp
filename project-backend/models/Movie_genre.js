module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define('Movie_genre',{

    },{
        underscored: true,
        tableName: 'movie_genre',
        timestamps: false
    })
    return model
}