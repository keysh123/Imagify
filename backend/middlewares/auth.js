const jwt = require('jsonwebtoken')

const userAuth = async (req,res,next) =>{
    const token = req?.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!token){
         return  res.json({success : false , message : "Not authorized"})
    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.body.userId = decoded._id;
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return next();
    }
    catch(error){
         return  res.json({success : false , message : "some error"+error.message})
    }
}
module.exports = {userAuth}