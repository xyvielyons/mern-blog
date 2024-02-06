import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import { errorHandler } from "../Utils/CustomError.js"
export const test = (req,res)=>{
    res.status(200).json({
        status : "success",
        message:"Api is working"

    })
}

export const updateUser = async(req,res,next) =>{
     console.log(req.user)

    if(req.user.id !== req.params.userId){
        return next(errorHandler("you are not allowed to update this user",403))
    }//the cookie information has to be verified by the actual user id the user types in the search parameter


    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler("password must be at lease 6 characters",400))
        }
        req.body.password=bcrypt.hashSync(req.body.password,10)
    }
    

    if (req.body.username){
        if(req.body.username.legth < 7 || req.body.username.length > 20){
            return next(errorHandler("username must be between 7 and 20 characters",400))
        }
    }    

    if(req.body.username.includes(" ")){
        return next(errorHandler("username cannot contain spaces",400))
    }

    if(req.body.username !== req.body.username.toLowerCase()){
        return next(errorHandler("username must be lowercase",400))

    }

    
     try{
         const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture,
                password:req.body.password
            }//wherever here is included it is going to update
        },{new:true}) //it is going to send the new information ({new,true})
        const {password,...rest} = updatedUser._doc
        res.status(200).json({
            status:"success",
            user:rest
        })
     }catch(error){
        next(error)
    }
}