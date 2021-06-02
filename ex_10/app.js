const express=require('express');
const app=express();

const MongoClient=require('mongodb').MongoClient;
const dburl="mongodb://localhost:27017";

app.get('/',(req,res)=>{

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
app.listen(3000);