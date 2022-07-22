const sequelize = require("sequelize");

module.exports = (sequelize , DataTypes)=>{
    const departments = sequelize.define("departments",{
    department_name:{
        type:DataTypes.STRING
    },
    department_desc:{
        type:DataTypes.STRING
    },
     

},{
    timestamps: false,
})
    return departments
}

