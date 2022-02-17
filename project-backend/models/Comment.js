module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Comment',{
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: true
            } 
            
        },

    },{
        underscored: true,
        tableName: 'comment',
    }); 
    model.associate = models =>{
        model.belongsTo(models.Movie,{
            foreignkey: {
                name:'commentId'
            }
        })
        model.belongsTo(models.User,{ 
            foreignkey: {
                name:'commentId'
            }
        })
    
    };

    return model
}
