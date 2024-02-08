import express  from "express";
import {test,updateUser} from '../controllers/user.controller.js'
import { verifyToken } from "../Utils/VerifyUser.js";
const router = express.Router()

router.route('/test')
.get(test)
router.route('/update/:userId')
.put(verifyToken,updateUser)
router.route("/refresh")
.get(verifyToken)


export default router