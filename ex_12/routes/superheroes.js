const express=require('express');
const router=express.Router();
const superhero=require('../model/superhero');
const Superhero=require('../model/superhero');


// get all
router.get('/',async (req,res)=>{
    try{
        const superheroes=await Superhero.find();
        res.json(superheroes);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})


module.exports=router;