const bodyParser = require('body-parser');
const { render } = require('ejs');
const express = require('express')
var cookieParser = require('cookie-parser')
const app = express();
var db= require('./model/index')



app.use(cookieParser())
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine", "ejs");
app.set("views", "./view")
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req, res)=>{
    res.render('index')
})
const user = require('./router/users.route');
app.use('/',user);

 const departments = require('./router/departments.route');
app.use('/department',departments)

const doctors = require('./router/doctor.route');
app.use('/doctor',doctors)

const employee =require('./router/employee.route')
app.use('/employee',employee);

const leaves = require('./router/leave.route');
app.use('/employee',leaves)


const patients = require('./router/patient.route');
app.use('/patients',patients)

const reports = require('./router/report.route');
app.use('/reports',reports)

const drugs = require('./router/drugs.route')
app.use('/drugs', drugs)


















app.all('*',(req ,res)=>{
    res.status(404).send('resources not founded');
})
app.listen(5000 , ()=>{
    console.log('listening on port 5000')

})