const express=require('express');
const routes=express.Router();

const MenuItem=require('./../models/menu');

routes.post('/', async (req, res)=>{
    try{
        const data=req.body;
        const menuItem=new MenuItem(data);
        const response=await menuItem.save();
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Item Server Error'});
    }
})

routes.get('/', async function(req, res){
    try{
        const menu=await MenuItem.find();
        console.log('Menu fetched');
        res.status(200).json(menu);
    }catch(err){
      res.status(500).json({error:'Internal Server error'});
    }
})


module.exports=routes;