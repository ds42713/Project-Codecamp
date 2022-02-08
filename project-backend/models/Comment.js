module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Comment',{
        title: {
            type: DataTypes.STRING(200),
            
        },
        comment: {
            type: DataTypes.STRING(200),
            
        },

    },{
        tableName: 'comment',
    }); 
    model.associate = models =>{
        model.belongsTo(models.Movie,{foreignkey: 'comment_id'})
        model.belongsTo(models.User,{foreignkey: 'comment_id'})
    
    };

    return model
}
