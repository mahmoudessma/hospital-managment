const db= require('../model/index')
const { Op } = require("sequelize");
const { employee } = require('../model/index');
const Leaves = db.leave;
const Employee = db.employee;


module.exports.show = async(req, res)=>{
    const leave = await Leaves.findAll({include: [{
        model: Employee,}]})
    res.render('leave/leave',{user:leave});
}

module.exports.addleaves=async(req, res)=>{
    const employee = await Employee.findAll({});
    res.render('leave/add_leave' , {employee:employee})
}

module.exports.insertleaves = async(req, res)=>{
    const{employee , leave_type,reason ,date_from , date_to} =req.body;
    
    const leave = await Leaves.create({
        leave_type:leave_type,
        reason:reason,
        date_to:date_to,
        date_from:date_from,
        employee_id:employee
    });
    res.redirect('/employee/allleaves')
}

module.exports.editleaves = async(req , res)=>{
    const {id} = req.params
    const leaves= await Leaves.findByPk(id)
    const employee = await Employee.findAll({});
    console.log(employee)
    res.render('leave/edit_leave' , {user:leaves , employee:employee})
}

module.exports.updateleaves = async (req, res)=>{
    const {id} = req.params
    const leave = await Leaves.update(req.query,{where:{id:id}});
    res.redirect('/employee/allleaves')
}

module.exports.deleteleaves = async (req, res)=>{
    const {id}=req.params;
    const leave = await Leaves.destroy({where:{id:id}})
    res.redirect('/employee/allleaves');
}