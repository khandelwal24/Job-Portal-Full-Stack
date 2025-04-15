import express from 'express'
import { Router } from 'express'
import { isAuth } from '../middlewares/auth.js';
import { appliedUser, get_Applicants, getApplied_Jobs, updateStatus } from '../Controls/Applications_Controls.js';

const router = express.Router();

router.route('/apply/:id').get(isAuth,appliedUser);
router.route('/get').get(isAuth,getApplied_Jobs);
router.route('/:id/applicants').get(isAuth,get_Applicants);
router.route('/status/:id/update').post(isAuth,updateStatus);

export default router;

