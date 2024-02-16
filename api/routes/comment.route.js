import express from 'express'
import { verifyToken } from "../Utils/VerifyUser.js";

import { getComments,createComment,editComment,deleteComment,getPostComments,likeComment } from '../controllers/comment.controller.js';
const router = express.Router();



router.route('/create')
.post(verifyToken,createComment)

router.route('/getPostComments/:postId')
.get(getPostComments)
router.route('/likeComment/:commentId')
.put(verifyToken,likeComment)
router.route('/editComment/:commentId')
.put(verifyToken,editComment)
router.route('/deleteComment/:commentId')
.delete(verifyToken,deleteComment)
router.route('/getComments')
.get(verifyToken,getComments)

export default router