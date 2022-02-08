module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Movie',{
        name: {
            type: DataTypes.STRING(200),
            unique: true
        },
        details: {
            type: DataTypes.STRING(255),
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        picture: {
            type: DataTypes.STRING(255),
        },
        type: {
            type: DataTypes.STRING(100),
        },
        season: {
            type: DataTypes.INTEGER,
        },


    },{
        tableName: 'movie',
        timestamps: false
    }); 

    model.associate = models =>{
        model.belongsTo(models.Producer,{foreignkey: 'producer_id'})
        model.hasMany(models.List, { foreignkey: 'movie_id' })
        model.hasMany(models.Comment, { foreignkey: 'movie_id' })

        model.belongsToMany(models.Actor,{through: models.Movie_actor,foreignkey: 'movie_id'})
        model.belongsToMany(models.Streaming,{through: models.Movie_streaming,foreignkey: 'movie_id'})
        model.belongsToMany(models.Genre,{through: models.Movie_genre,foreignkey: 'movie_id'})

    };
    return model
}

