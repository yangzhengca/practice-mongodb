const express=require('express');
const app=express();
const mongoose=require('mongoose');

// const superhero=require('./model/superhero');
// const Superhero=require('./model/superhero');

const dburl="mongodb://localhost/comics"

const superheroRouter=require('./routes/superheroes')
app.use('/superheroes',superheroRouter)

app.listen(3000);

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology: true});
const db=mongoose.connection;
db.on("error",(err)=>console.error(err));
db.once('open',()=>console.log('Connected to database ...'));

app.use(express.json());


// // get all
// app.get('/',async (req,res)=>{
//     try{
//         const superheroes=await Superhero.find();
//         res.json(superheroes);
//     }catch(err){
//         res.status(500).json({message:err.message});
//     }
// })