const express = require('express')

const router = express.Router()
const patientcontroller = require('../controller/patientcontroller')

router.get('/showpatient' , patientcontroller.show)

router.get('/addpatient',patientcontroller.create)
router.post('/insertpatient',patientcontroller.insert)

router.get('/editpatients/:id',patientcontroller.edit)
router.get('/updatepatients/:id',patientcontroller.update)

router.get('/deletepatients/:id',patientcontroller.delete)

router.get('/searchpatient/',patientcontroller.searchpatient);

// get doctors from the dept
router.get('/getdoctor/:id',patientcontroller.getdoctors)



module.exports = router;