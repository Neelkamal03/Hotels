const mongoose=require('mongoose');

//Define the MongoDb connection URL
//const mongoURL=process.env.MONGO_URL_LOCAL; //Replace hotels with database you want to access.
//const mongoURL=process.env.MONGODB_URL;
const mongoURL='mongodb+srv://kneel062:12345@cluster0.stfjyt1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURL, {}); 

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db=mongoose.connection;

//Define event listeners for database connection

db.on('connected', ()=>{
    console.log("Connected to MongoDb server");
});

// db.on('error', ()=>{
//  console.log("MongoDb connection error:", err);
// });
db.on('error', (err) => {
    console.error("MongoDB connection error:", err);
    console.error(err.stack);  // Add this line to print the stack trace
});

db.on('disconnected', ()=>{
    console.log("MongoDb disconnected");
});

//Export database connection to server file
module.exports=db;