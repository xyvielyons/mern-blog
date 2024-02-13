import { errorHandler } from "../Utils/CustomError.js"
import Comment from "../models/comment.model.js"
export const createComment = async (req,res,next)=>{
    try {
        const {content,postId,userId} = req.body
        if(userId !== req.user.id){
            return next(errorHandler("you are not allowed to create this comment",403))

        }
        const newComment = new Comment({
            content,
            postId,
            userId
        });
        await newComment.save();
        res.status(200).json({
            status:"success",
            newComment
        })
        
    } catch (error) {
        next(error)
        
    }
}
export const getPostComments = async (req,res,next)=>{
    try {
        const comments = await Comment.find({postId:req.params.postId}).sort({
            createdAt:-1
        })
        res.status(200).json({
            status:"success",
            comments
        })
    } catch (error) {
        next(error)
        
    }
}