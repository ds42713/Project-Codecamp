module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Streaming',{
        name: {
            type: DataTypes.STRING(200),
            unique: true
        },

    },{
        tableName: 'streaming',
        timestamps: false
    }); 

    model.associate = models =>{
        model.belongsToMany(models.Movie,{through: models.Movie_streaming,foreignkey: 'streaming_id'})
    };

    return model
}
