import express from 'express'
import { verifyToken } from "../Utils/VerifyUser.js";

import { createComment,getPostComments } from '../controllers/comment.controller.js';
const router = express.Router();



router.route('/create')
.post(verifyToken,createComment)

router.route('/getPostComments/:postId')
.get(getPostComments)

export default router