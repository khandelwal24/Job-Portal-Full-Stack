import { Company_Model, User_Model, Job_Model } from "../Models/User_Model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

//Admin post karega Jobs
export const Post_Job = async(req,res)=>{
    try{
        const userId = req.id; //logged In user ki id
        const {title,description,requirements,salary,Job_Type,location,position,experience,companyId} = req.body
        if(!title || !description || !requirements || !salary || !Job_Type || !location || !position || !experience || !companyId) return res.status(401).json({message:'Something is missing',success:false});
        let Job = await Job_Model.create({title,description,requirements:requirements.split(','),salary,Job_Type,location,position,experience,company:companyId, created_by:userId})
        return res.status(201).json({message:'New job created Successfully',success:true,Job});
    }
    catch(error){
        console.log('Error Occured',error);
    }
}

//Students ke liye
export const getAllJobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        };
        const jobs = await Job_Model.find(query).populate('created_by company').sort({createdAt:-1}).select('-jobs.created_by.password');
        if(!jobs) return res.status(404).json({message:'jobs not found',success:false});
        return res.status(200).json({message:'Successfully fetched jobs',success:true,jobs});
    }
    catch(error){
        console.log('Error Occured',error);
    }
}

//Students ke liye
export const getJobById = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job_Model.findById(jobId).populate('applications');
        if(!job) return res.status(404).json({message:'Job not found',success:false});
        return res.status(200).json({message:'Job found',success:true,job});
    }
    catch(error){
        console.log('error Occured',error);
    }
}

// Admin ke liye 
export const get_Admin_JobDashboard = async(req,res)=>{
    try{
        const adminId = req.id;
        const jobs = await Job_Model.find({created_by:adminId}).populate('company').sort({createdAt:-1});
        if(!jobs) return res.status(404).json({message:'Jobs not found',success:false});
        return res.status(200).json({message:'Jobs Found',success:true,jobs});
    }
    catch(error){
        console.log('error Occured',error);
    }
}