const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req , res) => {
    try{
        const {name , email , password} = req.body;
        if(!name || !email || !password){
           return res.json({success : false , message : "Missing Details"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const userData ={name , email , password : hashedPassword}
        const user = await userModel.create(userData);
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)

        return res.status(201).json({success : true , user , message : 'User created successfully',token})

    }
    catch(error){
        console.log('error' , error)

        return  res.json({success : false , message : "some error"+error.message})

    }
}
const loginUser = async (req , res) => {
    try{
        const { email , password} = req.body;
        if(!email || !password){
           return res.json({success : false , message : "Missing Details"})
        }

        const user = await userModel.findOne({email : email}).select('+password');
        if(!user){
             return res.json({success : false , message : "Invalid credentials"})
        }
        const comparePassword = await bcrypt.compare(password,user.password)
         if(!comparePassword){
             return res.json({success : false , message : "Invalid credentials"})
        }
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)

        return res.status(201).json({success : true , user , message : 'User login successfully',token})

    }
    catch(error){
        console.log('error' , error)

        return  res.json({success : false , message : "some error"+error.message})

    }
}

const userCredits = async (req,res) => {
    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
             return  res.json({success : false , message : "some error"})
        }
        return  res.json({success : true , credits : user.creditBalance})


    }
    catch(error){
        console.log('error' , error)

        return  res.json({success : false , message : "some error"+error.message})
    }
}


module.exports = {registerUser , loginUser , userCredits}