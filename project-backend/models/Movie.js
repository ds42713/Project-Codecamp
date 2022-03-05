module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Movie',{
        movieName: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        details: {
            type: DataTypes.STRING(3000),
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        movieImg: {
            type: DataTypes.STRING(255),
        },
        movieImgPoster: {
            type: DataTypes.STRING(255),
        },
        type: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'MOVIE',
            validator: {
              isIn: [['MOVIE','SERIES']]
            },
        },
        season: {
            type: DataTypes.INTEGER,
        },


    },{
        underscored: true,
        tableName: 'movie',
        
    }); 

    model.associate = models =>{
        model.belongsTo(models.Producer,{
            foreignkey: {
                name:'producerId'
            }
        })
        model.hasMany(models.List, { 
            foreignkey: {
                name:'movieId'
            } 
        })
        model.hasMany(models.Comment, { 
            foreignkey: {
                name:'movieId'
            } 
        })
        model.belongsToMany(models.Actor,{
            through: models.Movie_actor,
            foreignkey: {
                name:'movieId'
            }
        })
        model.belongsToMany(models.Streaming,{
            through: models.Movie_streaming,
            foreignkey: {
                name:'movieId'
            }
        })
        model.belongsToMany(models.Genre,{
            through: models.Movie_genre,
            foreignkey: {
                name:'movieId'
            }
        })

    };
    return model
}

