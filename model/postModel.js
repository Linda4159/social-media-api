const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    min:4
  },
  description: {
    type: String,
    require: true,
    min:8
  },
  likes: {
    type: [String],
    default: [],
  },
  userId:{
    type:String,
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("posts",postSchema)
