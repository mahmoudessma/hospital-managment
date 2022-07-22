const db= require('../model/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {body , validationResult} = require('express-validator');
const { checkuser } = require('../middleware/authmiddleware');



const Users = db.users;
const Verify = db.verify;
const Doctors = db.doctor;



const maxAge = 3*24*60*60;
const createToken=(id)=>{
    return jwt.sign({id} , 'mahmoud',{
        expiresIn:maxAge
    });
}

module.exports.show= async (req,res)=>{
    const verify = await Doctors.findAll({});
    // res.render('signup')
    res.json(verify)
}


module.exports.signup= async (req,res)=>{
    res.render('signup')    
}

module.exports.register=async(req,res)=>{
    const {username , email , password} = req.body;
    try{
        if(!(username && email && password))
        {
            res.status(401).send('you must fill all data')
        }
        const olduser = await Users.findOne({where :{email : email}})
        if(olduser)
        {
            res.status(401).send('you must fill all data')
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        const user = await Users.create({
            username:username,
            email:email,
            password:hashedPassword,
            email_status :'not_verified'
        })
        const token = createToken(user.id)
        res.cookie('jwt', token, { httpOnly:true , maxAge:maxAge*1000})
        const verify = await Verify.create({
            id:user.id,
            email:email , 
            username:username,
            token:token
        })
        console.log('done')
      console.log(user.email)
      res.redirect('/home')

    }

    catch(err)
    {
        res.status(400).json({errors})
    }
}


module.exports.login_form= async (req,res)=>{
    res.render('login')    
}


module.exports.login= async (req,res)=>{
    // res.render('login')    
    let {username , password} = req.query;
    try{
        if(!(username && password))
        {
            res.status(401).send('you must enter all data')
        }
        const user1 =await Users.findOne({where: {username:username}})
        console.log(user1.password)
        if(username && password)
        {
            if(user1)
            {
                const check = await bcrypt.compare(password,user1.password )
                if(check)
                {
                    const token = createToken(user1.id);
                    res.cookie('jwt', token, { httpOnly:true , maxAge : maxAge*1000})
                    const verify = await Verify.update({token : token},{where:{id:user1.id}})
                    res.redirect('/home')
                    return check
                }
                throw Error('incorrect password')
            }
            throw Error('incorrect email')
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

module.exports.home=async(req, res)=>{
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token , 'mahmoud',async (err , decodedToken)=>{
            if(err)
            {
                res.locals.user = null;
                next();
            }
            else{
                let user = await Users.findByPk(decodedToken.id)
                res.locals.user = user;
                // return user
                 console.log(user.username)
                 let updateuser = await Users.update({email_status:'verified'},{where:{id:user.id}})
                 res.render('home')
                //  next();

            }

        })
    }
 

    
}

module.exports.logout=async (req, res)=>{
    res.cookie('jwt', '' , {maxAge:1});
    res.redirect('/')

}


module.exports.forget_password_form=async(req, res)=>{

    res.render('forget-password')
}

module.exports.forget_password=async(req, res)=>{

    const{email} = req.body;
    const user= await Users.findOne({where :{email : email}})
    if(user)
    {
        const secret ='password' +user.password; 
        const payload = {
            email:user.email,
            id:user.id
        }
       
    
        const token = jwt.sign(payload, secret,{expiresIn:'15m'})
        res.cookie('jwt', token, { httpOnly:true , maxAge : maxAge*1000})
        const link = `http://localhost:5000/setpassword/${user.id}/${token}`
        // res.render(link)
        console.log(link)
        console.log(token)
        // console.log(secret)
        //  res.send({data:all})
        let id = user.id
        res.redirect(`/setpassword/${id}/${token}`);

    }
    else{
        res.redirect('/login')
    }
   
    
}

module.exports.setpassword=async(req , res)=>{
    const {id , token} =req.params
    const user= await Users.findOne({where :{id : id}})
    // res.send(req.params)
    
    const secret = 'password' +user.password; 
    
        // const token = req.cookies.jwt;
         jwt.verify(token , secret)
        res.render('set-password',{email:user.email , id:user.id , token:token})

   


}
module.exports.resetpassword=async(req, res)=>{
    const {id , token} =req.params
    const {password , password2} = req.body;
    const user= await Users.findOne({where :{id : id}})
    // res.send(req.params)
    console.log(password)
    console.log(password2)
    const secret = 'password' +user.password; 
    
        const done= jwt.verify(token , secret)
         if(password === password2)
         {
            let hashedPassword = await bcrypt.hash(password, 8);
            const updatepassword = await Users.update({password:hashedPassword} ,{ where:{id:user.id}})
            res.redirect('/home')

         }
         else{
            res.send('you must enter the same password')
         }
       

   
    
}