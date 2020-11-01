const route = require('express').Router();
const ItemModel = require('../models/ItemModel');


route.get('/', (req,res)=>{
    ItemModel.findAll()
    .then((data)=>{
        res.json(data)
    })
    .catch(err => res.json(err));
});


route.post('/', (req,res)=>{
    const { label, qty } = req.body;
    if(!label || !qty) return res.status(400).json({msg:'remplisser tout le champ svp!!'});
    ItemModel.create({label,qty})
    .then((data)=>{
        res.json(data)
    })
    .catch(err => res.json(err));
})


route.put('/:id', (req,res)=> {
const id = req.params.id;
const { label, qty} = req.body;
if(!label || !qty) return res.status(400).json({msg:'remplisser tout le champ svp!!'})
ItemModel.update({label, qty}, {where:{id}})
.then(data => {
    res.json(data);
})
.catch(err => console.log(err));
})


//delete 
route.delete('/:id',(req,res)=>{
    let id = req.params.id;
    ItemModel.destroy({where:{id}})
    .then(data => {
        res.json(data);
    })
    .catch(err => console.log(err));
})



module.exports = route