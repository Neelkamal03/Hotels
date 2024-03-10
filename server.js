const express = require('express');
const app = express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body
require('dotenv').config();

//const PORT=process.env.PORT || 3000;


app.get('/', function(req, res){
    res.send("Hello world");
})


// Import the router files
const personRoutes=require('./routes/personRoutes.js');
const menuItemRoutes=require('./routes/menuRoutes.js');
const { jwtAuthMiddleware } = require('./jwt.js');
// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);



app.listen(3000, ()=>{
   console.log("Server is running");
});