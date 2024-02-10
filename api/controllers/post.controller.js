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
        res.status(400).json({
            status:"fail",
            message:err
        })
        next(err)
    }


}
export const getPosts = async(req,res,next)=>{
  try {
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9

    const sortDirection = req.query.order == "asc" ? 1 : -1;
    const posts = await Post.find({
        ...(req.query.userId && {userId:req.query.userId}),
        ...(req.query.category && {category:req.query.category}),
        ...(req.query.slug && {slug:req.query.slug}),
        ...(req.query.postId && {userId:req.query.postId}),
        ...(req.query.searchTerm && {
            $or:[
                {title:{$regex:req.query.searchTerm,$options:"i"}},
                {content:{$regex:req.query.searchTerm,$options:"i"}},
            ],
        }),

    }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit)
    
    const totalPosts = await Post.countDocuments();//no of posts
    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
    )

    const lastMonthPosts = await Post.countDocuments({
        createdAt:{$gte:oneMonthAgo}
    })
    res.status(201).json({
        status:"success",
        posts,
        totalPosts,
        lastMonthPosts

    })
    
  } catch (error) {
    next(errorHandler(`something went wrong ${error}`,404))
    
  }
}
export const deletePost = async(req,res,next)=> {
if(!req.user.isAdmin || req.user.id !== req.params.userId){
    return next(errorHandler("you are not allowed to delete this post",403))
}
try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({
        status:"success",
        message:"the post has been deleted"
    })
    
} catch (error) {
    next(error)
}
}