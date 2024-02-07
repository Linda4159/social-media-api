const mongoose = require("mongoose")



const connectDB = async()=>{
    try{
    await mongoose.connect(process.env.LOCAL_URL).then(()=>{
        console.log("connection successful")
    })
}catch(error){
    console.error(error.message)
    process.exit(1)
}
}

module.exports = connectDB