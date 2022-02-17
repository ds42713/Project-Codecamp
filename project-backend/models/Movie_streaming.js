module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define('Movie_streaming',{

    },{
        underscored: true,
        tableName: 'movie_streaming',
        timestamps: false
    })
    return model
}