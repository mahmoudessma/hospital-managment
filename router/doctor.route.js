const express = require('express')

const router = express.Router()
const doctorcontroller = require('../controller/doctorcontroller')
// const path = require('path')
// const multer  = require('multer')
// const storage = multer.diskStorage({
//     destination:(req, res, cb)=>{
//         cb(null,'public/images')
//     },
//     filename:(req, file , cb)=>{
//         console.log(file);
//         cb(null , Date.now()+ path.originalname)
//     }
// })
// const upload = multer({storage:storage})


router.get('/showdoctors', doctorcontroller.show)

router.get('/adddoctor', doctorcontroller.adddoctor)
router.post('/adddoctor',doctorcontroller.upload, doctorcontroller.insertdoctor)

router.get('/editdoctors/:id', doctorcontroller.editdoctors)
router.get('/updatedoctor/:id',doctorcontroller.upload, doctorcontroller.updatedoctor)


router.get('/deletedoctor/:id', doctorcontroller.deletedoctor)
router.get('/search', doctorcontroller.search)



module.exports=router