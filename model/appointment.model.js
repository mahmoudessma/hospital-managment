const sequelize = require("sequelize");

module.exports = (sequelize , DataTypes)=>{
    const appointment = sequelize.define("appointment",{
    phone:{
        type:DataTypes.STRING
    },
    date:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    time:{
        type:DataTypes.STRING
    },
    
    

},{
    timestamps: false,
})
    return appointment
}

