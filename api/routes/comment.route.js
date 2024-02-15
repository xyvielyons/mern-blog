import express from 'express'
import { verifyToken } from "../Utils/VerifyUser.js";

import { createComment,editComment,getPostComments,likeComment } from '../controllers/comment.controller.js';
const router = express.Router();



router.route('/create')
.post(verifyToken,createComment)

router.route('/getPostComments/:postId')
.get(getPostComments)
router.route('/likeComment/:commentId')
.put(verifyToken,likeComment)
router.route('/editComment/:commentId')
.put(verifyToken,editComment)


export default router