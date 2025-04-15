import express from 'express'
import { Router } from 'express'
import { isAuth } from '../middlewares/auth.js';
import { get_Admin_JobDashboard, getAllJobs, getJobById, Post_Job } from '../Controls/Job_Controls.js';


const router = express.Router();

router.route('/post_Job').post(isAuth,Post_Job);
router.route('/getAllJobs').get(isAuth,getAllJobs);
router.route('/get_Admin_Job').get(isAuth,get_Admin_JobDashboard);
router.route('/get/:id').get(isAuth,getJobById);

export default router;