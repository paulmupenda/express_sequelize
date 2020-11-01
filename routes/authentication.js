const route = require('express').Router()
const bcrypt = require('bcryptjs');
const config = require('config');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');


route.post('/',async (req,res)=>{
    const { email , password} = req.body;
    if(!email || !password) return res.status(400).json({msg:"remplisse tout les champs"});

    await UserModel.findOne({where:{email}})
    .then(user=>{
        if(!user) return res.status(400).json({msg:'user does not exists'})

        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                jwt.sign(
                    {id: user.id},
                    config.get('secret_key'),
                    {expiresIn: 3600},
                    (err, token)=>{
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )
            } else{
                res.status(401).json({msg: 'password does not match'})
            }
            
        })
    })
})



module.exports = route;