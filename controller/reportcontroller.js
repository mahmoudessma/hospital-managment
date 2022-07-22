const { patient } = require('../model/index');
const db = require('../model/index')

const Report = db.report;
const Patient = db.patient;
const Doctor = db.doctor;
const Doctorpatients = db.doctorpatients

module.exports.show=async(req, res)=>{
    const reports= await Report.findAll({include:[{model:Patient},{model:Doctor}]})
    // res.json(reports)
    res.render('reports/reports',{data:reports})
}
module.exports.create=async(req ,res)=>{
    
    const doctors = await Doctor.findAll({})
    res.render('reports/addreports',{doctor:doctors})
    
}
module.exports.getpatient=async(req, res)=>{
    const {id} = req.params;
    const Patients = await Patient.findAll({include:[{model:Doctorpatients, where:{doctorId:id}}]}) 
    res.json(Patients)
}
module.exports.insert=async(req, res)=>{
    const{description , title , patient , doctor , date}= req.body

    const report = await Report.create({
        description:description,
        title:title,
        date:date,
        patient_id:patient,
        doctor_id:doctor
    })
    res.redirect('/reports/allreports')
    // res.send(req.body)
}

module.exports.deletereports = async(req , res)=>{
    const {id} = req.params
    const report = await Report.destroy({where:{id:id}})
    res.redirect('/reports/allreports')
}


module.exports.edit = async (req ,res)=>{
    const {id} = req.params

    const reports= await Report.findOne({where:{id:id}})
    const doctor = await Doctor.findAll({})
    // res.json(reports)
    res.render('reports/editreports',{data:reports , doctor:doctor})

}

module.exports.update = async(req ,res)=>{
    const{description , title , patient , doctor , date}= req.query
    const {id} = req.params
    const reports = await Report.update({
        description:description,
        title:title,
        date:date,
        patient_id:patient,
        doctor_id:doctor
    } , {where :{id:id}})
    res.redirect('/reports/allreports')


}