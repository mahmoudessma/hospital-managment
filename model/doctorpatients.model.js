const sequelize = require("sequelize");
const db = require('../model/index')
const Patient = db.patient;
const Department = db.departments
const Doctor = db.doctor;
module.exports = (sequelize , DataTypes)=>{
    const doctorpatients = sequelize.define("doctorpatients",{
    
},{
    timestamps: true,
})
    return doctorpatients
}

