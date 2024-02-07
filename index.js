const connectDB = require("./database/db")
require ("dotenv").config()
connectDB()
const appConfig = require("./app")

const express = require("express")

const App = express()
appConfig(App)


const port = process.env.port || 1002

const server = App.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})