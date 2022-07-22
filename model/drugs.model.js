const sequelize = require("sequelize");

module.exports = (sequelize , DataTypes)=>{
    const drugs = sequelize.define("drugs",{
    name:{
        type:DataTypes.STRING
    },
    p_date:{
        type:DataTypes.STRING
    },
    expire_end:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.STRING
    },
    quantity:{
        type:DataTypes.STRING
    },   

},{
    timestamps: false,
})
    return drugs
}

