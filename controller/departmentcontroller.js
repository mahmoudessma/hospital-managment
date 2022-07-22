const { response } = require('express');
const db = require('../model/index')


const Department = db.departments;
const Patient = db.patient

module.exports.adddepartment_form=async(req, res)=>{
    res.render('departments/adddepartment')
}
module.exports.adddepartment=async(req, res)=>{
    const {department_name , department_desc}= req.body;

    if(!(department_name && department_desc))
    {
        response.send('enter the data')
    }
    else
    {
        const departments = await Department.create({
            department_name : department_name,
            department_desc : department_desc
        })
        
    }
    const departmentss = await Department.findAll({});

    res.render('departments/departments', {data : departmentss})
}

module.exports.show=async(req, res)=>{
    const departments  = await Department.findAll({});
    // console.log(departments)
    if(!departments){
        response.send(null)
    }
    else {
        res.render('departments/departments', {data : departments})
    }
}

module.exports.deletedepartment=async(req, res)=>
{
    const departments  = await Department.findAll({});
    let id= req.params.id
    await Department.destroy({
        where: {
          id:id
        }
      });
    //   res.send('done')
    res.render('departments/departments', {data : departments})

}

module.exports.editdepartment = async (req , res)=>{
    let id = req.params.id;
    const department = await Department.findOne({where:{id:id}})
    console.log(department.department_name)
    res.render('departments/editdepartment', {data : department})


}


module.exports.updatedepartment=async (req , res)=>{
    let id = req.params.id
    const department =await Department.update(req.query , {where :{id:id}})
    // res.send('ok')
    res.redirect('/department/showedepartments')
}

module.exports.showpatient = async(req ,res)=>{
    const {id}= req.params
    const patients = await Patient.findAll({where:{departments_id:id}
    })  
    res.render('departments/showpatient' , {data:patients} )

}
 
