import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import { globalErrorHandler } from "./controllers/errorController.js";
dotenv.config()
process.on("uncaughtException",(err)=>{
    console.log(err.message)
    console.log("unhandled exception occured application shutting down")
    process.exit(1)
})


const app = express();//running express js
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors({credentials:true,origin:["http://localhost:5173","https://www.google.com"]}))//cross origin 
app.use(cookieParser())//extract cookie from browser


const PORT = process.env.PORT
mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>app.listen(PORT,()=>console.log(`db connectio successful server running at port: ${PORT}`)))



app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)

app.use(globalErrorHandler)//global error handler



