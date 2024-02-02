import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import customError from "./Utils/CustomError.js"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
dotenv.config()
process.on("uncaughtException",(err)=>{
    console.log(err.message)
    console.log("unhandled exception occured application shutting down")
    process.exit(1)
})


const app = express();//running express js
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())//cross origin 



const PORT = process.env.PORT
mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>app.listen(PORT,()=>console.log(`db connectio successful server running at port: ${PORT}`)))



app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || "error"

    res.status(error.statusCode).json({
        status :error.statusCode,
        message :error.message,
        stacktrace:error.stack,
        error:error
    })
} )


app.all("*",(req,res,next)=>{
const err = new customError(`cant find ${req.originalUrl}`,404)
next(err)
        

})



