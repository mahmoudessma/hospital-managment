const sequelize = require("sequelize");

module.exports = (sequelize , DataTypes)=>{
    const patient = sequelize.define("patient",{
    f_name:{
        type:DataTypes.STRING
    },
    l_name:{
        type:DataTypes.STRING
    },
    date_join:{
        type:DataTypes.STRING
    },
    date_out:{
        type:DataTypes.STRING
    },
    phone:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING
    },
     

},{
    timestamps: false,
})
    return patient
}

