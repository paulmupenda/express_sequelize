const route = require('express').Router();
const UserModel = require('../models/UserModel');


route.get('/', (req,res)=>{
    UserModel.findAll()
    .then((data)=> res.json(data))
    .catch(err=> console.log(err))
})



module.exports = route;

