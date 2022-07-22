
const sequelize = require("sequelize");

module.exports = (sequelize , DataTypes)=>{
    const verify = sequelize.define("verify",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
         primaryKey: true
    },
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    token:{
        type:DataTypes.STRING
    },
},{
    timestamps: false,
})
    return verify
}

