const express = require('express')
const router = express.Router()
const employeecontroller = require('../controller/employeecontroller');

router.get('/addemployee',employeecontroller.addemployee);
router.post('/insertemployee',employeecontroller.insertemployee);

router.get('/showemployee',employeecontroller.show);

router.get('/editemployee/:id',employeecontroller.editemployee);
router.get('/updateemployee/:id',employeecontroller.updatemployee);

router.get('/deleteemployee/:id',employeecontroller.deleteemployee);


router.get('/searchemployee/',employeecontroller.searchemployee);

module.exports=router;