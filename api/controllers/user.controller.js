import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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
        res.status(404).json({
            status:"fail",
            message:error
            
        })

        
     }
}
export const deleteUser = async (req,res,next)=>{
 if(!req.user.isAdmin && req.user.id != req.params.userId){
    return next(errorHandler("you are not allowed to delete this route",403))
 }

 try{
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json({
        status:"success",
        message:"user deleted"
    })

 }catch(err){
    next(errorHandler(`err`,404))
 }
}
export const signOut=(req,res,next)=>{
try {
    res.clearCookie('access_token').status(200).json({
        message:"user has been signed out"
    })
    res.clearCookie('refresh_token')
    
} catch (error) {
    
}
}

export const getUsers = async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler("you are not allowed to see all users",403))
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort || 'asc' ? 1 : -1

        const users =  await User.find()
        .sort({createdAt: sortDirection})
        .skip(startIndex)
        .limit(limit)

        const usersWithoutPassword = users.map((user)=>{
            const {password,...rest} = user._doc
            return rest;
        })

        const totalUsers = await User.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })
       res.status(200).json({
        status:"success",
        users:usersWithoutPassword,
        totalUsers,
        lastMonthUsers
       })
        
    } catch (error) {
        
    }
}

export const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.userId)
        if(!user){
            return(errorHandler("user not found",404))
        }
        const {password,...rest} = user._doc
        res.status(200).json({
            status:"success",
            user:rest
        })
        
    } catch (error) {
        next(error)
        
    }
}

