const { departments, patient, doctor } = require('../model/index');
const db = require('../model/index')
const { Op } = require("sequelize");


const Patient = db.patient;
const Department = db.departments
const Doctor = db.doctor;
const Doctorpatients = db.doctorpatients


module.exports.show=async(req, res)=>{
    
    const patients = await Patient.findAll({include: [{
        model:Department} ,{model:Doctorpatients}]
    })
    

    
      
    res.render('patients/patient' , {data:patients} )
}

module.exports.create=async(req , res)=>{
    const departments = await Department.findAll({})
    // console.log(departments)
    res.render('patients/addpatient',{data:departments})
}

module.exports.insert=async(req, res)=>{

    const {f_name , l_name , address , phone , date_join , date_out , department , doctor} = req.body;

    const patient = await Patient.create({
        f_name:f_name,
        l_name:l_name,
        phone:phone,
        address:address,
        date_join:date_join,
        date_out:date_out,
        departments_id:department
    })
    const doctorpatients = await Doctorpatients.create({
        patientId :patient.id,
        doctorId :doctor
    })

    res.redirect('/patients/showpatient')
}
module.exports.edit=async(req, res)=>{
    const department = await Department.findAll({})
    const {id}= req.params;
    const patients = await Patient.findOne({where:{id:id}})
    res.render('patients/editpatient',{patient:patients , data:department})

}
module.exports.update=async(req, res)=>{
    const {f_name , l_name , address , phone , date_join , date_out , department , doctor} = req.query;
    const {id}= req.params;
    const patients = await Patient.update({
        f_name:f_name,
        l_name:l_name,
        phone:phone,
        address:address,
        date_join:date_join,
        date_out:date_out,
        departments_id:department
    },{where:{id:id}})
    const doctorpatients = await Doctorpatients.update({
         patientId :patients.id,
        doctorId :doctor},{where:{patientId:id}})
    res.redirect('/patients/showpatient')

}


module.exports.delete=async(req, res)=>{
    
    const {id}= req.params;
    const patients = await Patient.destroy({where:{id:id}})
    res.redirect('/patients/showpatient')

}

module.exports.searchpatient = async (req , res)=>{
    const search = req.query.search
    const patient = await Patient.findAll({include: [{
        model: Department},{model:Doctorpatients}],where:{
        [Op.or]: [
            {id:search},
            {f_name : {[Op.like]:`%${search}%`}}
        ]
        
    }});
    res.render('patients/patient' , {data:patient})
}

module.exports.getdoctors= async (req, res)=>{
const {id} = req.params;
const doctors = await Doctor.findAll({where:{departments_id :id} , attributes:['first_name' , 'last_name' , 'id']})
res.json(doctors)

}