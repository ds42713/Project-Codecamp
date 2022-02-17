module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Streaming',{
        streamingName: {
            type: DataTypes.STRING(200),
            unique: true
        },

    },{
        underscored: true,
        tableName: 'streaming',
        timestamps: false
    }); 

    model.associate = models =>{
        model.belongsToMany(models.Movie,{
            through: models.Movie_streaming,
            foreignkey: {
                name:'streamingId'
            }
        })
    };

    return model
}
