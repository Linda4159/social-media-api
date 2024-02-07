const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    postId:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    commentText:{
        type:String,
        require:true
    },
    likes:{
        type:[String],
        default:[]
    }
},{timestamps:true}
)
module.exports=mongoose.model("comments",commentSchema)