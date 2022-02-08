module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('User',{
        username: {
            type: DataTypes.STRING(200),
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
        },
        role: {
            type: DataTypes.STRING(100),
        },

    },{
        tableName: 'user',
        timestamps: false
    }); 

    model.associate = models =>{
        model.hasMany(models.List,{foreignkey: 'user_id'})
        model.hasMany(models.Comment,{foreignkey: 'user_id'})
    
    };

    return model
}