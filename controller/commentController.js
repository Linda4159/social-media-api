const commentController = require("express").Router();
const commentModel = require("../model/commentModel");

// create a comment

const postComment = async (req, res) => {
  try {
    const createComment = await commentModel.create({
      ...req.body,
      userId: req.user.id,
    });
    return res.status(201).json(createComment);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
// get a comment

const oneComment = async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.commentId);

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(200).json(error.message);
  }
};
// get all comments

const allComments = async (req, res) => {
  try {
    const comments = await commentModel.find({ postId: req.params.postId });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
// update a comment

const updateComment = async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.commentId);
    console.log("new",comment)
    if (!comment) {
      return res.status(403).json({ message: "No such comment" });
  
    }
      if (comment.userId === req.user.id) {
        comment.commentText = req.body.commentText;
        await comment.save();
        return res.status(200).json({ comment, message: "comment successfully updated" });
      } else {
        return res
          .status(403)
          .json({ message: "you can only update your own comments" });
      }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
// delete a comment

const deleteComment = async(req,res)=>{
    try {
        const comment = await commentModel.findById(req.params.commentId)
        if(comment.userId === req.user.id){
         await commentModel.findByIdAndDelete(req.params.commentId)
         return res.status(200).json({message:"comment has been successfully deleted"})
        }else{
            return res.status(403).json({message:"you can delete only your own comments"})
        }
    } catch (error) {
       return res.status(500).json(error.message) 
    }
}
// like-unlike a comment

const likeToggle = async(req,res)=>{
    try {
        const currentUserId = req.user.id
        const comment = await commentModel.findById(req.params.commentId)
        if(!comment.likes.includes(currentUserId)){
            comment.likes.push(currentUserId)
            await comment.save()
            return res.status(200).json({message:"you have successfully liked this comment"})
        }else{
            comment.likes = comment.likes.filter((id)=>id !== currentUserId)
            await comment.save()
            return res.status(200).json({message:"you have successfully unlike this comment"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { allComments, oneComment, postComment, updateComment,deleteComment, likeToggle };
