
const db = require('../model/index')

const Drugs = db.drugs;



module.exports.show=async(req , res)=>{

    const drugs  = await Drugs.findAll({})
    res.render('drugs/drugs', {list:drugs})
}


module.exports.adddrugs=async(req , res)=>{

    res.render('drugs/adddrugs')

}


module.exports.insertdrugs = async(req, res)=>{
    const {name , price , quantity , p_date , expire_end}= req.body
    // res.send(req.body)
    let drugs = await Drugs.create({
        name:name , 
        price:price,
        quantity:quantity,
        p_date:p_date,
        expire_end:expire_end

    })
    res.redirect('/drugs/alldrugs')
}


module.exports.edit=async(req, res)=>{
    const {id} = req.params

    const drugs = await Drugs.findOne({where:{id:id}})
    res.render('drugs/editdrugs',{list:drugs})
}
module.exports.update=async(req, res)=>{
    const {id} = req.params
    // const {name , price , quantity , p_date , expire_end} = req.query
    const drugs = await Drugs.update(req.query , {where:{id:id}})
    res.redirect('/drugs/alldrugs')

}

module.exports.delete=async(req, res)=>{
    const {id} = req.params
    const drugs = await Drugs.destroy({where:{id:id}}) 
    res.redirect('/drugs/alldrugs')

}