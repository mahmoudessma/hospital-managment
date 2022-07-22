const express = require('express')
const router = express.Router();
const userscontroller = require('../controller/userscontroller');
const { requireAuth ,checkuser} = require('../middleware/authmiddleware');


router.get('/show',userscontroller.show)
router.get('/signup',userscontroller.signup)
router.post('/register',userscontroller.register)

router.get('/login_form',userscontroller.login_form)
router.get('/login',userscontroller.login)

router.get('/home',checkuser,requireAuth,userscontroller.home)


// forget-password
router.get('/forget-password',userscontroller.forget_password_form)
router.post('/forget-password',userscontroller.forget_password)
router.get('/setpassword/:id/:token',userscontroller.setpassword)
router.post('/resetpassword/:id/:token',userscontroller.resetpassword)

router.get('/logout',userscontroller.logout)


module.exports = router;