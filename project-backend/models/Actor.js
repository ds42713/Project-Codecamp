module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Actor',{
        name: {
            type: DataTypes.STRING(200),
        },

    },{
        tableName: 'actor',
        timestamps: false
    }); 

    
    model.associate = models =>{
        model.belongsToMany(models.Movie,{through: models.Movie_actor,foreignkey: 'actor_id'})
    };

    return model
}
