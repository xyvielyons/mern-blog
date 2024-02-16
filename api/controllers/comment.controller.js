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
export const likeComment = async (req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler("comment not found",404))

        }

        const userIndex = comment.likes.indexOf(req.user.id)//look if the id is in the array of the likes if not available it returns -1
        if(userIndex === -1){
            comment.numberOfLikes += 1
            comment.likes.push(req.user.id)
            
        }else{
            comment.numberOfLikes -= 1
            comment.likes.splice(userIndex,1)//removing
        }
        await comment.save()
        res.status(200).json({
            status:"success",
            comment
        })
    } catch (error) {
        next(error)
        
    }
}

export const editComment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler("comment not found",404))
        }
        if (comment.userId != req.user.id && !req.user.isAdmin){
            return next(errorHandler("you are not allowed to edit this comment",403))
        }
        

        const editedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content:req.body.content
            },
            {new:true}
        )
        res.status(200).json({
            status:"success",
            editedComment
        })
    } catch (error) {
        console.log(error);
        next(error)
        
    }
}
export const deleteComment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler("comment not found",404))
        }
        if (comment.userId != req.user.id && !req.user.isAdmin){
            return next(errorHandler("you are not allowed to edit this comment",403))
        }
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json({
            status:"success",
            message:"comment has been deleted"
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}