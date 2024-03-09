const mongoose=require('mongoose');

//Define the MongoDb connection URL
const mongoURL='mongodb://127.0.0.1:27017/hotels'; //Replace hotels with database you want to access.

mongoose.connect(mongoURL, {}); 

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db=mongoose.connection;

//Define event listeners for database connection

db.on('connected', ()=>{
    console.log("Connected to MongoDb server");
});

db.on('error', ()=>{
 console.log("MongoDb connection error:", err);
});

db.on('disconnected', ()=>{
    console.log("MongoDb disconnected");
});

//Export database connection to server file
module.exports=db;