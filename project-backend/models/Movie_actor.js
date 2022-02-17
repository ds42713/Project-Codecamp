module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define('Movie_actor',{

    },{
        underscored: true,
        tableName: 'movie_actor',
        timestamps: false
    })
    return model
}