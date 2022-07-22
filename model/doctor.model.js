const sequelize = require("sequelize");

module.exports = (sequelize , DataTypes)=>{
    const doctor = sequelize.define("doctor",{
    first_name:{
        type:DataTypes.STRING
    },
    last_name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    dob:{
        type:DataTypes.STRING
    },
    gender:{
        type:DataTypes.STRING
    },address:{
        type:DataTypes.STRING
    },
    phone:{
        type:DataTypes.STRING
    },
    image:{
        type:DataTypes.TEXT
    },
    
    biography:{
        type:DataTypes.STRING
    },  
    

},{
    timestamps: false,
})
    return doctor
}

