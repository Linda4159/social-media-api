// const userSchema = require("../model/userModel")
const userController = require("express").Router()
const bcrypt = require("bcrypt")
const userModel = require("../model/userModel")

// get one user

const singleUser = async(req,res)=>{
    try{
const user = await userModel.findById(req.params.userId)
if(!user){ return res.status(500).json({message:"wrong user id"})
    }
const {password,...others} = user._doc
return res.status(200).json({user:others})
}catch(error){
        return res.status(500).json(error.message)
    }
}


// get all users

const allUsers = async(req,res)=>{
    try{
const getAllUsers = await userModel.find()

const formattedUsers = getAllUsers.map((userModel)=>{
    return {username : userModel.username, email : userModel.email, _id : userModel._id, createdAt : userModel.createdAt}
})
return res.status(200).json({user:formattedUsers})
    }catch(error){
        return res.status(500).json(error.message)
    }
}

// update user

const updateUser = async(req,res)=>{
    if(req.params.userId === req.user.id){
        try{
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password,10)
            }
            const userUpdate = await userModel.findByIdAndUpdate(
                req.params.userId,
                {$set:req.body},
                {new:true}
                )
                return res.status(200).json(userUpdate)
                }catch(error){
                    return res.status(500).json(error.message)
                }
    }else{
return res.status(403).json({message:"you can only change your own profile"})
    }
   
}

// delete user

const deleteUser = async(req,res)=>{
    if(req.params.userId === req.user.id){
        try{
await userModel.findByIdAndDelete(req.params.userId)
return res.status(200).json({message:"user has been successfully deleted"})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }else{
        return res.status(403).json({message:"you can only delete your own profile"})
    }
   
}

// follow/unfollow

const toggleUser = async(req,res)=>{
    try {
        const currentUserId = req.user.id
        console.log(currentUserId)
        const otherUserId = req.params.otherUserId
        console.log("iiouo",otherUserId)

        if(currentUserId === otherUserId){
            return res.status(500).json({message:"you can't follow youself.!!!!!!!"})
        }

        const currentUser = await userModel.findById(currentUserId)
        const otherUsers = await userModel.findById(otherUserId)

        console.log("tyhe", otherUsers)

        // To follow

        if(!currentUser.followings.includes(otherUserId)){
            currentUser.followings.push(otherUserId)
            console.log("sfsfsf",currentUser)
            otherUsers.followers.push(currentUserId)
            await otherUsers.save()
            await currentUser.save()
            return res.status(200).json({message:"you are now following this user"})

            // To unfollow
        }else{
            currentUser.followings = currentUser.followings.filter((id)=>id !== otherUserId)
            otherUsers.followers = otherUsers.followers.filter((id)=>id !== otherUserId)
            await currentUser.save()
            await otherUsers.save()
            return res.status(200).json({message:"you have successfully unfollowed this user"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {singleUser,allUsers,updateUser,deleteUser,toggleUser}