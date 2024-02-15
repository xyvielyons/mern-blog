import express from 'express'
import { authorization,registerUrl,stkPush ,confirmationUrl,validationUrl,simulate,stkPushCallBack,stkquery} from '../controllers/mpesa.controller.js';
const router = express.Router();



router.route('/access_token')
.get(authorization)
router.route('/stkPush')
.get(authorization,stkPush)
router.route('/register')
.get(authorization,registerUrl)
router.route('/confirmation')
.post(confirmationUrl)
router.route('/validation')
.post(validationUrl)
router.route('/stkPushCallBack')
.post(stkPushCallBack)
router.route('/simulate')
.get(authorization,simulate)
router.route('/stkquery')
.post(authorization,stkquery)

export default router