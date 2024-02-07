const jwt = require("jsonwebtoken")

const verifyToken = async(req,res,next)=>{
    if(!req.headers.authorization) return res.status(403).json({message:"not authorized.Token is required"})

    if(req.headers.authorization){
        const token =await req.headers.authorization.split(" ")[1]
        // console.log("here",token)
        jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
            if(err) return res.status(403).json({message:"wrong or expired token"})
            else{
        req.user = payload
    next()
}
        })
    }
}

module.exports = verifyToken