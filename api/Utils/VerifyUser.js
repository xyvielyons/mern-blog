import jwt from "jsonwebtoken"
import {errorHandler} from "./CustomError.js"

// export const verifyToken = (req,res,next)=>{
//    const cookies = req.headers.cookie;
//    // console.log(cookies)
//    const token = cookies.split("=")[1]
//    console.log(token)
//    //   const headers = req.headers[`authorization`]
//    //   const token = headers.split(" ")[1];//splits and then selects the token itself
//      if(!token){
//        return res.status(404).json({
//             message:"no token found"
//         })
//      }

//      jwt.verify(token,process.env.SECRET_STR,(err,user)=>{
//         if(err){
//            return res.status(400).json({
//                 message:"invalid token token has expired"
//             })
//         }
//         console.log(user)
//         req.user = user
        
//      })
//    next()
// }
export const verifyToken = (req,res,next)=>{
   const accesstoken = req.cookies.access_token

   if(!accesstoken){
       if(renewToken(req,res,next)){
           next()
       }


    // return next(errorHandler(`access token not found`,404))
   }else{
       jwt.verify(accesstoken,process.env.SECRET_STR,(err,user)=>{
           if(err){
               return res.status(201).json({
                   valid:false,
                   message:"invalid Token"
               })
           }else{
               req.user = user
               next()
           }
       })

   }
}

export const renewToken = (req,res,next)=>{
   const refreshtoken = req.cookies.refresh_Token
   let exist = false
   if(!refreshtoken){
      res.status(201).json({
         valid:false,
         message:"no refresh Token"
     })
  return next(errorHandler(`norefresh token found`,404))
   }else{
       jwt.verify(refreshtoken,process.env.SECRET_STR,(err,decoded)=>{
           if(err){
               return res.status(201).json({
                   valid:false,
                   message:"invalid refresh Token"
               })
           }else{
               const accessToken = jwt.sign({id:decoded._id},process.env.SECRET_STR,
                   {
                   expiresIn:"1d"
               })
               res.cookie("access_token",accessToken,{
                   path:"/",
                   httpOnly:true,
                   //expires:new Date(Date.now() + 1000 * 30)
                   maxAge:5184000000,
                   sameSite: 'None'
                  
               })
               exist = true
           }
       })

   }
   return exist

}