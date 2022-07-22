const jwt = require('jsonwebtoken')

const db = require('../model/index')

const Users = db.users;

module.exports.requireAuth=async (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token , 'mahmoud' , (err , decodedToken)=>{
            if(err)
            {
                console.log(err.message);
                res.redirect('/login_form')
            }
            else{
                console.log(decodedToken)
                next();
            }
        })

    }
    else{
        res.redirect('/login_form')
    }

}
module.exports.checkuser= (req, res , next)=>{
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
                 next();

            }

        })
    }
    else{
        res.locals.user = null;
        next();
    }

}