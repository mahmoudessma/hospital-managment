const db= require('../model/index')
const Doctor = db.doctor;
const Department = db.departments
const path = require('path')
const multer  = require('multer');
const { doctor } = require('../model/index');


module.exports.show=async(req, res)=>{
    const doctors = await Doctor.findAll({include: [{
        model: Department,}]})
        // console.log(doctors)
        // res.json(doctors[2].department.department_name)
    res.render('doctor/doctor',{list : doctors}) 
}

module.exports.adddoctor=async(req, res)=>{
    const departments = await Department.findAll({});
    res.render('doctor/adddoctor',{data:departments})
} 
module.exports.insertdoctor=async(req, res)=>{

const {first_name , last_name , email , dob , gender, address , phone , image, biography , department} = req.body;
const doctor = await Doctor.create({
    first_name:first_name,
    last_name:last_name,
    email:email,
    dob:dob,
    gender:gender,
    address:address,
    phone:phone,
    image: req.file.path,
    biography:biography,
    departments_id : department
})
res.redirect('/doctor/showdoctors')
// res.send(req.bocy)
}



module.exports.editdoctors=async (req, res)=>{
    const department = await Department.findAll({})
    const doctors = await Doctor.findAll({include: [{
        model: Department,}]})
        res.render('doctor/editdoctor' ,{list:doctors , data:department})
}
module.exports.updatedoctor=async (req, res)=>{
    const id = req.params.id
    const {first_name , last_name , email , dob , gender, address , phone , image, biography , department} = req.query;
    const doctor = await Doctor.update({
        first_name:first_name,
    last_name:last_name,
    email:email,
    dob:dob,
    gender:gender,
    address:address,
    phone:phone,
    // image: req.file.path,
    biography:biography,
    departments_id : department
    }, {where:{id:id}})
    // res.send('ok')
    res.redirect('/doctor/showdoctors')
}


module.exports.deletedoctor = async (req , res)=>{
    let id= req.params.id
    await Doctor.destroy({
        where: {
          id:id
        }
      });
    res.redirect('/doctor/showdoctors')

}

module.exports.search=async(req, res)=>{
    const first_name = req.query.first_name;
    const doctors = await Doctor.findOne({where:{first_name:first_name}})
    console.log(doctors)
    res.render('doctor/doctor',{list:doctors})
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

module.exports.upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

