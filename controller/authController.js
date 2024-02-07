const authController= require('express')
const userModel = require("../model/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// authenticate user

const authUser = async(req,res)=>{
    try {
        const checkEmail = await userModel.findOne({email:req.body.email})
        if(checkEmail){
            return res.status(500).json({message:"email already in use"})
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const newUser = await userModel.create({...req.body, password : hashedPassword})

        const{password,...others} = newUser._doc

        const token =jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"2hr"})
        return res.status(201).json({user:others,token})
        

        
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}

const userLogin = async(req,res)=>{
    try {
       const user = await userModel.findOne({email:req.body.email}) 
       if(!user){
        return res.status(500).json({message:"wrong credentials,Try again"})
       }
       const comparePass = await bcrypt.compare(req.body.password,user.password)
       if(!comparePass){
        return res.status(500).json({message:"wrong password,Try again"})
       }
       const {password,...others} = user._doc
       const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"2hr"})
    //    console.log(token)

       return res.status(201).json({user:others,token})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}
module.exports ={ authUser,userLogin}