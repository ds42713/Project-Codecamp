module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Genre',{
        genreName: {
            type: DataTypes.STRING(200),
        },

    },{
        underscored: true,
        tableName: 'genre',
        timestamps: false
    }); 
    model.associate = models =>{
        model.belongsToMany(models.Movie,{
            through: models.Movie_genre,
            foreignkey: {
                name: 'genreId'
            }
        })
    };

    return model
}