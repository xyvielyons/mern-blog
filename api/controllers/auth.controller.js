import { errorHandler } from "../Utils/CustomError.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
export const signup = async (req,res,next) =>{
    try {
        const {username,email,password} = req.body
        if (!username || !email || !password){
            next(errorHandler("all fields are required",400))
        }
        const hashedPassword = bcrypt.hashSync(password,10)
    
        const newUser = new User({
            username,
            email,
            password:hashedPassword
    
        })
        await newUser.save();

        res.status(201).json({
            status:"success",
            message:"signup successful"
        })
        
    } catch (error) {
        next(errorHandler(`an error occured ${error.message}`,400))
        
    }
   
    

}