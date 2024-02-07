const postController = require("express").Router()
const postModel = require("../model/postModel")

// get all post

const getAllPost = async(req,res)=>{
    try{
const posts = await postModel.find({})
return res.status(200).json(posts)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

// get one post

const getOnePost = async(req,res)=>{
    try{
const post = await postModel.findById(req.params.postId)

if(!post){
    return res.status(500).json({message:"No such ppst with this id!!!!"})
}else{
    return res.status(200).json(post)
}
    }catch(error){
        return res.status(500).json(error.message)
    }
}

// create post

const createPost = async(req,res)=>{
    try {
        const newPost = await postModel.create({...req.body, userId:req.user.id})
        return res.status(200).json(newPost)
    } catch (error) {
      return res.status(500).json(error.message)  
    }
}

// update post

const updatePost =async(req,res)=>{
    try {
      const post= await postModel.findById(req.params.id)  
      if(post.userId === req.user.id){
        const postUpdate = await postModel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
            )
    return res.status(200).json(postUpdate)
 }else{
    return res.status(403).json({message:"You can only update your own post."})
 }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

// delete post

const deletePost = async(req,res)=>{
    try {
      const post = await postModel.findById(req.params.id)
      if(!post){
        return res.status(500).json({message:"No such post"})
      } else if(post.userId !== req.user.id){
        return res.status(403).json({message:"You can only delete your own post"})
     }else{
        await postModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"post has been successfully deleted"})
     } 
    } catch (error) {
       return res.status(500).json(error.message) 
    }
}

// Like and unlike

const likesDislikes = async(req,res)=>{
    try{
const currentUserId = req.params.id
const post = await postModel.findById(req.params.id)

// if the user already iked the post, then reject else accept

if(post.likes.includes(currentUserId)){
post.likes = post.likes.filter((id)=> id !== currentUserId)
await post.save()
return res.status(200).json({message:"user successfully unlike the post"})
}else{
post.likes.push(currentUserId)
await post.save()
return res.status(200).json({message:" user successfully liked the post"})
}
    }catch(error){
        return res.status(500).json(error.message)
    }
}
module.exports = {getAllPost,getOnePost,createPost,updatePost,deletePost,likesDislikes}