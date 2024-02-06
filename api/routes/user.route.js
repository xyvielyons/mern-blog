import express  from "express";
import {test,updateUser} from '../controllers/user.controller.js'
import { verifyToken } from "../Utils/VerifyUser.js";
const router = express.Router()

router.route('/test')
.get(test)
router.route('/update/:userId')
.put(verifyToken,updateUser)

export default router