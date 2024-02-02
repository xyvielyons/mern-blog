import User from "../models/user.model.js"
import bcrypt from "bcrypt"
export const signup = async (req,res) =>{
    try {
        const {username,email,password} = req.body
        if (!username || !email || !password){
            return res.status(400).json({
                status:"fail",
                message:"all field are required"
            })
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
        res.status(401).json({
            status:"failed",
            message:error.message
        })
        
    }
   
    

}