import { errorHandler } from "../Utils/CustomError.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"
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

export const signin = async(req,res,next) => {
        const {username,email,password} = req.body
        if (!email || !password){
            next(errorHandler("all fields are required",400))
        }
        try {
            const validUser = await User.findOne({email}).select("+password")
            //const userDetails = await User.findOne({email})
            if(!validUser){
                next(errorHandler(404,"user not found"))

            }

            const validPassword = bcrypt.compareSync(password,validUser.password)

            if(!validPassword){
                return next(errorHandler("invalid password",400))
            }

            const token = jwt.sign({id:validUser._id},process.env.SECRET_STR)
            
            const {password:pass,...rest} = validUser._doc
            res.status(200).cookie("access_token",token,{
                httpOnly:true
            }).json({
                status:"success",
                message:"signin successful",
                user:rest
            })



            
        } catch (error) {

                    next(errorHandler(`an error occured ${error.message}`,400))

        }


    }
   
    

