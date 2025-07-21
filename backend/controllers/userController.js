const userModel = require('../models/userModel')
const transactionModel = require('../models/transactionModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// import {Razorpay} from 'razorpay'
require('dotenv').config()
const Razorpay = require('razorpay')



const razorpayInstace = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
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
        return  res.json({success : true , credit : user.creditBalance , user : {
            name : user.name,
            email : user.email,
            id : user._id,
            creditBalance : user.creditBalance
        }})


    }
    catch(error){
        console.log('error' , error)

        return  res.json({success : false , message : "some error"+error.message})
    }
}

const paymentRazorpay = async (req, res) => {
    try {
        console.log("HII");
        
        const { userId , planId  } = req.body;
        console.log("userId:", userId, "planId:", planId);
        
        const user = await userModel.findById(userId);
        if (!user || !user._id || !planId) {
            return res.json({ success: false, message: "data not found" });
        }
        let credits , plan , amount , date;
        switch (planId) {
            case "Basic":
                credits = 10;
                plan = "Basic";
                amount = 100;
                break;
            case "Advanced":
                credits = 500;
                plan = "Advanced";
                amount = 50;
                break;
            case "Business":
                credits = 5000;
                plan = "Business";
                amount = 250;
                break;
            default:
                return res.json({ success: false, message: "Invalid plan" });
        }
        date = new Date();
        const transactionData = {   
            userId: user._id,
            plan: plan,
            credits: credits,   
            amount: amount,
            date: date,
        };
        
        const transaction = await transactionModel.create(transactionData);
        if (!transaction) {
            return res.json({ success: false, message: "Error creating transaction" });
        }

       
        const options = {
            amount: amount*100 , // amount in the smallest currency unit
            currency: process.env.CURRENCY, 
            receipt: transaction._id.toString(),
        };

        const order = await razorpayInstace.orders.create(options)
        if (!order) {
            return res.json({ success: false, message: "Error creating order" });
        }       
      
        return res.json({ success: true, order  });
    } catch (error) {
        console.error("Error in paymentRazorpay:", error);
        return res.status(500).json({ success: false, message: "Error: " + error.message });
    }
}

const verifyPayment = async (req, res) => {
    try {
        const {razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstace.orders.fetch(razorpay_order_id);
        if (!orderInfo) {
            return res.json({ success: false, message: "Order not found" });
        }
        if( orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);
            if (!transactionData) {
                return res.json({ success: false, message: "Transaction not found" });
            }
            if(transactionData.payment === true){
                return res.json({ success: false, message: "Payment already verified" });
            }
            transactionData.payment = true;
            await transactionData.save();
            const user = await userModel.findById(transactionData.userId);
            if (!user) {
                return res.json({ success: false, message: "User not found" });
            }
           
            const updatedUser = await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance + transactionData.credits });
            return res.json({ success: true, message: "Payment verified successfully" , user: updatedUser});

        }
        else{
            return res.json({ success: false, message: "Payment not successful" });
        }
        
    } catch (error) {       
        console.error("Error in verifyPayment:", error);
        return res.status(500).json({ success: false, message: "Error: " + error.message });
    }   
}


module.exports = {registerUser , loginUser , userCredits , paymentRazorpay , verifyPayment}