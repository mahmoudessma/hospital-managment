const express = require('express')
const router = express.Router();
const leavecontroller = require('../controller/leavecontroller')

router.get('/allleaves',leavecontroller.show)

router.get('/addleaves',leavecontroller.addleaves)
router.post('/insertleaves',leavecontroller.insertleaves)

router.get('/editleaves/:id',leavecontroller.editleaves)
router.get('/updateleaves/:id',leavecontroller.updateleaves)

router.get('/deleteleaves/:id',leavecontroller.deleteleaves)

module.exports = router ;