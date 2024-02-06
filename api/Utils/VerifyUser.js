import jwt from "jsonwebtoken"
import {errorHandler} from "./CustomError.js"

export const verifyToken = (req,res,next)=>{
     const token = req.cookies.access_token;//get from name of cookie
    if(!token){
        return next(errorHandler("unauthorized",401))
    }
    jwt.verify(token,process.env.SECRET_STR,(err,user)=>{
        if(err){
            return next(errorHandler(401,"Unauthorized"))
        }
        req.user = user
        next()
    })//it is going to give us either an error or tha user data from that cookie
    

}