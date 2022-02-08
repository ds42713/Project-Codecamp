module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Genre',{
        name: {
            type: DataTypes.STRING(200),
        },

    },{
        tableName: 'genre',
        timestamps: false
    }); 
    model.associate = models =>{
        model.belongsToMany(models.Movie,{through: models.Movie_genre,foreignkey: 'genre_id'})
    };

    return model
}