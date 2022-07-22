const express = require('express')
const router = express.Router()

const departmentcontroller = require('../controller/departmentcontroller')

router.get('/adddepartment' , departmentcontroller.adddepartment_form)
router.post('/adddepartment' , departmentcontroller.adddepartment)
router.get('/showedepartments' , departmentcontroller.show)

router.get('/deletedepartment/:id' , departmentcontroller.deletedepartment)

router.get('/editdepartment/:id' , departmentcontroller.editdepartment)
router.get('/updatedepartment/:id' , departmentcontroller.updatedepartment)



router.get('/showpatient/:id' , departmentcontroller.showpatient)



module.exports = router