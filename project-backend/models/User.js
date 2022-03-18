module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('User',{
        username: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'USER',
            validator: {
                isIn: [['ADMIN','USER']]
            },
        },      
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
              notEmpty: true
            }
        },
    },{
        underscored: true,
        tableName: 'user',
    }); 

    model.associate = models =>{
        model.hasMany(models.List,{
            foreignkey: {
                name:'UserId'
            }
        })
        model.hasMany(models.Comment,{
            foreignkey: {
                name:'UserId'
            }
        })
    
    };

    return model
}