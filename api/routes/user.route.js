import express  from "express";
import {test,updateUser,deleteUser,signOut} from '../controllers/user.controller.js'
import { verifyToken } from "../Utils/VerifyUser.js";
const router = express.Router()

router.route('/test')
.get(test)
router.route('/update/:userId')
.put(verifyToken,updateUser)
router.route("/refresh")
.get(verifyToken)
router.route("/delete/:userId")
.delete(verifyToken,deleteUser)
router.route("/signout")
.post(signOut)
export default router