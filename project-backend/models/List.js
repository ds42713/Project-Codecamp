module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('List',{
        username: {
            type: DataTypes.STRING(200),
        },
    },{
        tableName: 'list',
        timestamps: false
    }); 
    model.associate = models =>{
        model.belongsTo(models.Movie,{foreignkey: 'list_id'})
        model.belongsTo(models.User,{foreignkey: 'list_id'})
    
    };

    return model
}
