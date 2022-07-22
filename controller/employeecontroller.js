const db = require('../model/index')

const Employee = db.employee;
const Leaves = db.leave;
const { Op } = require("sequelize");



module.exports.addemployee=async(req , res)=>{
    res.render('employee/addemployee');
}

module.exports.insertemployee=async(req , res)=>{
    const {name , email , contact , salary , join_date , role}= req.body;

    const employee = await Employee.create({
        name :name ,
        email:email,
        contact:contact,
        role:role,
        join_date:join_date,
        salary:salary
    })
    res.redirect('/employee/showemployee')
}

module.exports.show=async (req, res)=>{
    const employee = await Employee.findAll({})
    res.render('employee/employee',{employee:employee})
}

module.exports.editemployee = async (req, res)=>{
    const {id} = req.params;

    // const employee = await Employee.findByPk(id)
    const employees = await Employee.findOne({where :{id:id}})
    console.log(employees)
    res.render('employee/editemployee',{list:employees})
}
module.exports.updatemployee = async (req , res)=>{
    const {id} = req.params;

    const employee = await Employee.update(req.query , {where:{id:id}});
    res.redirect('/employee/showemployee')
}
module.exports.deleteemployee = async (req , res)=>{
    const {id} = req.params;
    
    const employee = await Employee.destroy({where:{id:id}});
    


    res.redirect('/employee/showemployee')
}

module.exports.searchemployee = async (req , res)=>{
    const search = req.query.search
    const employee = await Employee.findAll({where:{
        [Op.or]: [
            {id:search},
            {name : {[Op.like]:`%${search}%`}}
        ]
        
    }});
    res.render('employee/employee' , {employee:employee})
}