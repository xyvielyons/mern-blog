import { errorHandler } from "../Utils/CustomError.js"
import Post from "../models/post.model.js"
export const create = async(req,res,next)=>{
    if(!req.user.isAdmin){
      return next(errorHandler("you are not allowed to create a post",403))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler("please provide all required fields",400))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase()
    const newPost = new Post({
        ...req.body,slug,userId:req.user.id
    })

    try{

        const savedPost = await newPost.save();
        res.status(201).json({
            status:"success",
            message:savedPost
        })

    }catch(err){
        next(err)
    }


}