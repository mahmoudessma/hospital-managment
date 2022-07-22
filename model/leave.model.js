const sequelize = require("sequelize");

module.exports = (sequelize , DataTypes)=>{
    const leave = sequelize.define("leave",{
    leave_type:{
        type:DataTypes.STRING
    },
    reason:{
        type:DataTypes.STRING,
        allowNull: false
    },
    date_from:{
        type:DataTypes.STRING
    },
    date_to:{
        type:DataTypes.STRING
    },

    
     

},{
    timestamps: false,
})
    return leave
}

