const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:6
    },
    followings:{
        type:[String],
        default:[]
    },
    followers:{
        type:[String],
        defaut:[]
    },
    
},{timestamps:true})
module.exports = mongoose.model("users",userSchema)

