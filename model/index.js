const { Sequelize, DataTypes } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('hospital', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
  }).catch (error=> {
    console.error('Unable to connect to the database:', error);
  })

const db={};

db.sequelize = sequelize

db.users = require('./users.model')(sequelize , DataTypes)
db.verify = require('./verify.model')(sequelize , DataTypes)
db.doctor = require('./doctor.model')(sequelize , DataTypes)
db.departments = require('./departments.model')(sequelize , DataTypes)
db.employee = require('./employee.model')(sequelize , DataTypes)
db.leave = require('./leave.model')(sequelize , DataTypes)
db.patient = require('./patient.model')(sequelize , DataTypes)
db.report = require('./reports.model')(sequelize , DataTypes)
db.doctorpatients = require('./doctorpatients.model')(sequelize , DataTypes)
db.appointment = require('./appointment.model')(sequelize , DataTypes)
db.drugs = require('./drugs.model')(sequelize , DataTypes)

// 1 to many
db.departments.hasMany(db.doctor,{
  foreignKey:'departments_id',
})
db.doctor.belongsTo(db.departments,{
  foreignKey:'departments_id',
})

// one to many
db.employee.hasMany(db.leave,{
  foreignKey:'employee_id'
})
db.leave.belongsTo(db.employee,{
  foreignKey:'employee_id'
})

// one to many
db.departments.hasMany(db.patient,{
  foreignKey:'departments_id'
})
db.patient.belongsTo(db.departments,{
  foreignKey:'departments_id'
})

// one to many
db.patient.hasMany(db.report,{
  foreignKey:'patient_id'
})
db.report.belongsTo(db.patient,{
  foreignKey:'patient_id'
})

// one to many
db.doctor.hasMany(db.report,{
  foreignKey:'doctor_id'
})
db.report.belongsTo(db.doctor,{
  foreignKey:'doctor_id'
})


db.doctor.hasMany(db.report,{
  foreignKey:'doctor_id'
})
db.report.belongsTo(db.doctor,{
  foreignKey:'doctor_id'
})



// many to many
db.patient.belongsToMany(db.doctor,{through: 'doctorpatients'})
db.doctor.belongsToMany(db.patient,{through: 'doctorpatients'})

db.patient.hasMany(db.doctorpatients,{
  foreignKey:'patientId'
})
db.doctorpatients.belongsTo(db.patient,{
  foreignKey:'patientId'
})


// one to many
db.drugs.hasMany(db.appointment,{
  foreignKey:'drugs_id'
})
db.appointment.belongsTo(db.drugs,{
  foreignKey:'drugs_id'
})



// one to many
db.doctor.hasMany(db.appointment,{
  foreignKey:'doctor_id'
})
db.appointment.belongsTo(db.doctor,{
  foreignKey:'doctor_id'
})



// one to many
db.patient.hasMany(db.appointment,{
  foreignKey:'patient_id'
})
db.appointment.belongsTo(db.patient,{
  foreignKey:'patient_id'
})


// one to many
db.departments.hasMany(db.appointment,{
  foreignKey:'departments_id'
})
db.appointment.belongsTo(db.departments,{
  foreignKey:'departments_id'
})



db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

module.exports=db;