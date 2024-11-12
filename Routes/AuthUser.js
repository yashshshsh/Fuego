const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = `I know i am  a genius!!!`
const FetchUser = require('../Middleware/FetchUser')

// http://localhost:4512/api/authUser/createuser/
// {
//     "name" : "yash",
//     "email" : "yash@gmail.com",
//     "password" : "1234"
// }
router.post('/createuser',async(req,res)=>{
    let success = false 
    try{
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).send({success,error:'Sorry a user with this email already exist'})
        }  

        const salt = await bcrypt.genSalt(10);
        const Secret_pass = await bcrypt.hash(req.body.password,salt);

        let photoData = null;
        let photoContentType = null;
        if(req.file){
            photoData = req.file.buffer;
            photoContentType = req.file.mimetype;
        }

        user = await User.create({
            name: req.body.name,
            email:req.body.email,
            password: Secret_pass,
        })

        const data = {
            user:{
                id: user._id,
            }
        }

        const authToken = jwt.sign(data,JWT_Secret);
        success = true;
        res.status(200).json({success,authToken})
    } catch(error){
        res.status(400).json({error:'Internal Server Error',message:error.message})
    }
});

// http://localhost:4512/api/authUser/loginUser
router.post('/loginUser',async(req,res)=>{
    let success = false;
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({success,error:'Please try again with the correct credentials'})
        }
        const passwordCompare = bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(200).json({error : "Please enter the correct credentials"})
        }
        const data = {
            user:{
                id: user._id
            }
        }
        const authToken = jwt.sign(data,JWT_Secret);
        success = true;
        res.json({success,authToken})
    } catch(error){
        console.log(error.message);
        return res.status(400).json({error:"Internal server error",message:error.message});
    }
})

module.exports = router;