const express= require('express')
const router = express.Router()
const drugscontroller = require('../controller/drugscontroller');

router.get('/alldrugs' , drugscontroller.show);

router.get('/adddrugs' , drugscontroller.adddrugs);
router.post('/insertdrugs' , drugscontroller.insertdrugs);

router.get('/editdrugs/:id' , drugscontroller.edit);
router.get('/updatedrugs/:id' , drugscontroller.update);
router.get('/deletedrugs/:id' , drugscontroller.delete);




module.exports = router;