const express=require('express');
const app=express();

const MongoClient=require('mongodb').MongoClient;
const dburl="mongodb://localhost:27017";

app.listen(3000);

//show JSON array of full collection
app.get('/superheroes',(req,res)=>{
    MongoClient.connect(dburl,(err,client)=>{
        console.log("connected to MongoDB ...");
        const db=client.db("comics");
        const collection=db.collection("superheroes");
        collection.find({}).toArray((err,documents)=>{
            client.close();
            res.send(JSON.stringify(documents));
        });
    });
});

//show a JSON object of the specific ID
app.get('/superheroes/:id',(req,res)=>{
    const selectedID=req.params.id;
    MongoClient.connect(dburl,(err,client)=>{
        console.log("connected to MongoDB ...");
        const db=client.db("comics");
        const collection=db.collection("superheroes");
        const ObjectID=require('mongodb').ObjectID;
        collection.find({_id:ObjectID(selectedID)}).toArray((err,documents)=>{
            const selectedHero=documents[0];
            client.close();
            res.send(JSON.stringify(selectedHero));
        });
    });
});

//create a new hero info, and show json object of it 
app.post('/superheroes',(req,res)=>{
    const newHero={
        name:"FLASH",
        image:"flash.jpg"
    }
    MongoClient.connect(dburl,(err,client)=>{
        console.log("connected to MongoDB ...");
        const db=client.db("comics");
        const collection=db.collection("superheroes");        
        collection.insertOne(newHero,(err,documents)=>{
            client.close();
            res.send(JSON.stringify(newHero));
            console.log(JSON.stringify(newHero));
        });
    });
});

//update a hero info,and show a JSON object of the specific ID
app.put('/superheroes/:id',(req,res)=>{
    const selectedID=req.params.id;
    const newHeroInfo={
        name:"test",
        image:"captaincanada.jpg"
    }
    MongoClient.connect(dburl,(err,client)=>{
        console.log("connected to MongoDB ...");
        const db=client.db("comics");
        const collection=db.collection("superheroes");
        const ObjectID=require('mongodb').ObjectID;
        const setNewHeroInfo={$set:newHeroInfo}
        collection.updateOne({_id:ObjectID(selectedID)},setNewHeroInfo,(err,result)=>{
            
        });
        collection.find({_id:ObjectID(selectedID)}).toArray((err,documents)=>{
            const selectedHero=documents[0];
            client.close();
            res.send(JSON.stringify(selectedHero));
            console.log(selectedHero)
        });
    });
});


//delete a hero with specific id,and show a JSON object of the specific ID(show a blank page???)
app.delete('/superheroes/:id',(req,res)=>{
    const selectedID=req.params.id;
    MongoClient.connect(dburl,(err,client)=>{
        console.log("connected to MongoDB ...");
        const db=client.db("comics");
        const collection=db.collection("superheroes");
        const ObjectID=require('mongodb').ObjectID;
        collection.deleteOne({_id:ObjectID(selectedID)},(err,result)=>{

        });
        collection.find({_id:ObjectID(selectedID)}).toArray((err,documents)=>{
            const selectedHero=documents[0];
            client.close();
            res.send(JSON.stringify(selectedHero));
        });
    });
});