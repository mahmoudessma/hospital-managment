const sequelize = require("sequelize");

module.exports = (sequelize , DataTypes)=>{
    const report = sequelize.define("report",{
    description:{
        type:DataTypes.STRING
    },
    title:{
        type:DataTypes.STRING
    },
    date:{
        type:DataTypes.STRING
    }
     

},{
    timestamps: false,
})
    return report
}

