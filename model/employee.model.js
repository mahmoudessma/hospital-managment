const sequelize = require("sequelize");

module.exports = (sequelize , DataTypes)=>{
    const employee = sequelize.define("employee",{
    name:{
        type:DataTypes.STRING
    },
    contact:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING
    },
    salary:{
        type:DataTypes.STRING
    },
    join_date:{
        type:DataTypes.STRING
    },
    

},{
    timestamps: true,
    sequelize,
    paranoid: true,
  // If you want to give a custom name to the deletedAt column
  deletedAt: 'destroyTime',
  createdAt: false,
  updatedAt: false,
})
    return employee
}

