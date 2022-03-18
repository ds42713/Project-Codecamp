module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Movie',{
        movieName: {
            type: DataTypes.STRING(200),
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
                name:'ProducerId'
            }
        })
        model.hasMany(models.List, { 
            foreignkey: {
                name:'MovieId'
            } 
        })
        model.hasMany(models.Comment, { 
            foreignkey: {
                name:'MovieId'
            } 
        })
        model.belongsToMany(models.Actor,{
            through: models.Movie_actor,
            foreignkey: {
                name:'MovieId'
            }
        })
        model.belongsToMany(models.Streaming,{
            through: models.Movie_streaming,
            foreignkey: {
                name:'MovieId'
            }
        })
        model.belongsToMany(models.Genre,{
            through: models.Movie_genre,
            foreignkey: {
                name:'MovieId'
            }
        })

    };
    return model
}

