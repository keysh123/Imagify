
const jwt = require('jsonwebtoken')

const userAuth = async (req,res,next) =>{
    const {token} =  req.headers;
    
    if(!token){
         return  res.json({success : false , message : "Not authorized"})
    }
    
    try {
        const decoded = await jwt.verify(token , process.env.JWT_SECRET)
        console.log("till",decoded)
        req.body = req.body || {}; // create an empty object if it's undefined
req.body.userId = decoded.id;


        // if (!req.user) {
        //     return res.status(401).json({ message: "Unauthorized" });
        // }
        return next();
    }
    catch(error){
         return  res.json({success : false , message : "some error"+error.message})
    }
}
module.exports = {userAuth}