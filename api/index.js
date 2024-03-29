import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import { globalErrorHandler } from "./controllers/errorController.js";
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import paymentRoutes from "./routes/payments.route.js"
import path from "path"
dotenv.config()
process.on("uncaughtException",(err)=>{
    console.log(err.message)
    console.log("unhandled exception occured application shutting down")
    process.exit(1)
})

const __dirname = path.resolve();
const app = express();//running express js
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
//app.use(cors({credentials:true,origin:["http://localhost:5173","https://www.google.com","https://xaviers-mern-blog.onrender.com","https://cloud.mongodb.com"]}))//cross origin 
//app.use(cors())//cross origin 
//app.use(cors({credentials:true,origin:"*"}))//cross origin 

app.use(cookieParser())//extract cookie from browser

const corsOptions = {
  origin:"https://xaviers-mern-blog.onrender.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://xaviers-mern-blog.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

const PORT = process.env.PORT
mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


.then(()=>app.listen(PORT,()=>console.log(`db connectio successful server running at port: ${PORT}`)))



app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)
app.use("/api/comment",commentRoutes)
app.use("/api/daraja",paymentRoutes)
app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use(globalErrorHandler)//global error handler



