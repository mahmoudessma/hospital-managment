const express = require('express')

const router = express.Router()
const reportcontroller = require('../controller/reportcontroller');


router.get('/allreports',reportcontroller.show);

router.get('/addreports',reportcontroller.create);
router.post('/insertreports',reportcontroller.insert);


router.get('/deletereports/:id',reportcontroller.deletereports);

router.get('/editreports/:id',reportcontroller.edit)
router.get('/updatereports/:id',reportcontroller.update)


router.get('/getpatient/:id',reportcontroller.getpatient);



module.exports = router;