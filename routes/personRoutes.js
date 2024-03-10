const express=require('express');
const router=express.Router();

const Person=require('./../models/Person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

router.post('/signup', async (req, res)=>{
    try{
       const data=req.body;

       const newPerson=new Person(data);

       const response= await newPerson.save();
       console.log('data saved');

       const payload={
          id:response.id,
          name:response.name
       }
       
       const token=generateToken(payload);
       res.status(200).json({response, token});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.post('/login', async (req, res)=>{
     try{
        // Extract username and password from request body
        const {username, password} =req.body;

        //Find user by username
        const user= await Person.findOne({username: username});
        console.log(user);
        //If user does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password)))
        {
           return res.status(401).json({error: "Invalid username or password"});
        }
        
        //generate token
        const payload={
            id: user.id,
            name: user.name
        }
        const token=generateToken(payload);
        //return token as response
        res.json({token});
     }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
     }
})

router.get('/profile', jwtAuthMiddleware, async (req, res)=>{
    try{
        const userData=req.user;
        
        const userId=userData.id;
        const user=await Person.findById(userId);
        
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.get('/', jwtAuthMiddleware, async (req, res)=>{
 try{
     const data=await Person.find();
     console.log('data fetched');
     res.status(200).json(data);
 }catch(err){
    console.log(err);
    res.status(500).json({error:'Interal Server Error'});
 }
})

router.get('/:workType', async (req, res)=>{
    try{
        const workType = req.params.workType; //Extracting the work type from the URL parameter.
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
           const response=await Person.find({work: workType});
           console.log('response fetched');
           res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid work type'});
        }
    }catch(err){
         console.log(err);
         res.status(500).json({error:'Internal Server Error'});
    }
})

router.put('/:id', async (req, res)=>{
    try{
       const personId=req.params.id;
       const updatedPersonData=req.body;

       const response=await Person.findByIdAndUpdate(personId, updatedPersonData, {
          new:true,
          runValidators:true
       });
       
       if(!response){
         res.status(404).json({error:'Person not found'});
       }

       console.log('Data Updated');
       res.status(200).json(response);
    }catch(err){
       console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id',async (req, res)=>{
    try{
        const personId=req.params.id;
        
        const response=await Person.findByIdAndDelete(personId) ;
        if(!response){
           res.status(404).json({error:'Person not found'});
        }
        res.status(200).json({message:'Person deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports = router;
