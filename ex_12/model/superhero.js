const mongoose=require('mongoose');

const superHeroSchema=new mongoose.Schema({
    name:String,
    description:String
},{collection:'superheroes'});

module.exports=mongoose.model('Superhero',superHeroSchema);