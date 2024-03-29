import express from "express";
import { verifyToken } from "../Utils/VerifyUser.js";
import { create ,getPosts,deletePost,updatePost} from "../controllers/post.controller.js";
const router = express.Router()
router.route('/create')
.post(verifyToken,create)
router.route('/getPosts')
.get(getPosts)
router.route('/deletepost/:postId/:userId')
.delete(verifyToken,deletePost)
router.route('/updatepost/:postId/:userId')
.put(verifyToken,updatePost)


export default router