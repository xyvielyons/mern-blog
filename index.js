import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config({path:"./config.env"})

const app = express();//running express js
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())//cross origin 


const PORT = process.env.PORT
mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>app.listen(PORT,()=>console.log(`server running at port: ${PORT}`)))
.catch((err)=>console.log(err.message))
