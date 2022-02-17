module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('List',{

    },{
        tableName: 'list',
        timestamps: false
    }); 
    model.associate = models =>{
        model.belongsTo(models.Movie,{
            foreignkey: {
                name:'listId'
            }
        })
        model.belongsTo(models.User,{
            foreignkey: {
                name:'listId'
            }
        })
    
    };

    return model
}
