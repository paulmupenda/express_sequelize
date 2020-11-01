const route = require('express').Router();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


route.get('/', (req,res)=>{
    UserModel.findAll()
    .then((data)=> res.json(data))
    .catch(err=> console.log(err))
})


route.post('/',(req,res)=>{
    // distractiring
    let {name, email, password} = req.body;
    if(!name || !email || !password) res.status(400).json({msg:"remplisser tout les champs"});

    // check if user exists
    UserModel.findOne({where:{email}})
    .then(user=>{
        if(user) return  res.status(400).json({msg:'l\'utilisateur existe deja'});
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,(err, hash)=>{
                if(err) throw err;
                password = hash;
                UserModel.create({name,email,password})
                .then(user => {
                    jwt.sign(
                        {id: user.id},
                        config.get('secret_key'),
                        {expiresIn: 3600},
                        (err, token)=>{
                            if(err) throw err;
                            res.json({
                                token,
                                user:{
                                    name: user.name
                                }
                            })
                        }
                    )
                })
            })
        })

    })
    .catch(err => console.log(err))
    
})



module.exports = route;

