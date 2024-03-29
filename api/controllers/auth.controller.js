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

            // if(req.cookies[`access_token`]){
            //     req.cookies[`access_token`]=""
            // }

            const accessToken = jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},process.env.SECRET_STR,
                {
                expiresIn:"1d"
            })
            const refreshToken = jwt.sign({id:validUser._id},process.env.SECRET_STR,
                {
                expiresIn:"2d"
            })
            
             res.cookie("access_token",accessToken,{
                 path:"/",
                 httpOnly:true,
                 //expires:new Date(Date.now() + 1000 * 30)
                 maxAge:5184000000,
                 sameSite: 'None'
                
             })
             res.cookie("refresh_token",refreshToken,{
                path:"/",
                httpOnly:true,
                maxAge:10368000000,
                sameSite: 'None'
                //expires:new Date(Date.now() + 1000 * 30)
               
            })
            const {password:pass,...rest} = validUser._doc
            res.status(200).json({
                    status:"success",
                    message:"signin successful",
                    user:rest
                })
            
            // res.status(200).cookie("access_token",token,{
            //     path:"/",
            //     httpOnly:true,
            //     expires:new Date(Date.now() + 1000 * 30)
                
            // }).json({
            //     status:"success",
            //     message:"signin successful",
            //     user:rest
            // })



            
        } catch (error) {

                    next(errorHandler(`an error occured ${error.message}`,400))

        }


    }





export const google = async(req,res,next) => {
    const {email,name,googlePhotoUrl} = req.body;
    if(!email){
        next(errorHandler(`fill all the required credentials `))
    }
    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_STR)
            const {password:pass,...rest} = user._doc

            res.status(200).cookie("access_token",token,{
                httpOnly:true
            }).json({
                status:"success",
                message:"signin successful",
                data:rest
            })
            
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            
            const hashedPassword = await bcrypt.hashSync(generatedPassword,10)
            const {name,email,googlePhotoUrl} = req.body
            if(!email || !name){
                next(errorHandler(`fill all the required credentials `,404))
            }
            const newUser = new User({
                username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture:googlePhotoUrl
            })

            await newUser.save()
            const token = jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.SECRET_STR)
            const {password:pass,...rest} = newUser._doc
            res.status(200).cookie("access_token",token,{
                httpOnly:true
            }).json({
                status:"success",
                message:"signin successful",
                data:rest
            })
        }
        
        
    } catch (error) {
        next(errorHandler(`fail${error} `,404))

        
    }
   }
    