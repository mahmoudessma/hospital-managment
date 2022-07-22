const sequelize = require("sequelize");

module.exports = (sequelize , DataTypes)=>{
    const users = sequelize.define("users",{
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    email_status:{
        type:DataTypes.STRING
    },
    
     

},{
    timestamps: false,
})
    return users
}

