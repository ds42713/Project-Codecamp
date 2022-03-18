module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Producer',{
        producerName: {
            type: DataTypes.STRING(200),
        },

    },{
        underscored: true,
        tableName: 'producer',
        timestamps: false
    }); 

    model.associate = models =>{
        model.hasMany(models.Movie, { 
            foreignkey: {
                name:'ProducerId'
            } 
        })
    
    };


    return model
}
