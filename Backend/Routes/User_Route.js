import express from 'express'
import { Router } from 'express'
import { login, LogOut, register, updateProfile } from '../Controls/User_Controls.js';
import { isAuth } from '../middlewares/auth.js';

import multer from 'multer';
import {upload} from '../utils/multer.js'
import cloudinary from '../Utils/CloudinaryP.js'

const router = express.Router();

router.route('/register').post(upload.single('file'),register)
router.route('/login').post(login)
router.route('/logout').get(LogOut)
router.route('/edits/profile').post(isAuth,upload.single('file'),updateProfile)

export default router