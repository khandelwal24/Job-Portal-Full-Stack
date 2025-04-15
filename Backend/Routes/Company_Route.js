import express from 'express'
import { Router } from 'express'
import { get_Company_ById, get_Compnay, Register_Company, updateCompany } from '../Controls/Company_Controls.js';
import { isAuth } from '../middlewares/auth.js';
import {upload} from '../utils/multer.js'

const router = express.Router();

router.route('/RegisterCompany').post(isAuth,Register_Company)
router.route('/getAllCompany').get(isAuth,get_Compnay)
router.route('/get_Company/:id').get(isAuth,get_Company_ById)
router.route('/update/:id').put(isAuth,upload.single('logo'),updateCompany)

export default router;