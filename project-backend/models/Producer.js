module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Producer',{
        name: {
            type: DataTypes.STRING(200),
        },

    },{
        tableName: 'producer',
        timestamps: false
    }); 

    model.associate = models =>{
        model.hasMany(models.Movie, { foreignkey: 'producer_id' })
    
    };


    return model
}
