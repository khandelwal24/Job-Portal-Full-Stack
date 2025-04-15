import { Company_Model, User_Model, Application_Model, Job_Model } from "../Models/User_Model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const appliedUser = async(req,res)=>{
    try{
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId) return res.status(401).json({message:'Job_Id is required',success:false});
        
        //check if the user has already applied for that jobId or not
        const Already_Applied_Jobs = await Application_Model.findOne({job:jobId, applicant:userId});
        if(Already_Applied_Jobs) return res.status(401).json({message:'You have already applied for this job !!',success:false});

        //check if job exists or not:
        const job = await Job_Model.findById(jobId);
        if(!job) return res.status(404).json({message:'Jobnot found',success:false});

        // Now if all the things are available then create a new Application :
        const new_Application = await Application_Model.create({job:jobId, applicant:userId});
        job.applications.push(new_Application._id) // from Job_Model
        await job.save();
        return res.status(200).json({message:'Application submitted Successfully',success:true,new_Application});
    }
    catch(error){
        console.log('Error Occured',error);
    }
}


export const getApplied_Jobs = async(req,res)=>{
    try{
        const userId = req.id;
        const Total_applications = await Application_Model.find({applicant:userId}).sort({createdAt:-1})
        .populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{path:'company'}
        });
        if(!Total_applications) return resizeBy.status(404).json({message:'No application found',success:false});
        return res.status(200).json({message:'Your applied jobs',success:true,Total_applications});
    }
    catch(error){
        console.log('Error cocured',error);
    }
}

//Admin ke liye
export const get_Applicants = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job_Model.findById(jobId)
        .populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:'applicant'
        }).populate({path:'company'})
        if(!job) return res.status(404).json({message:'Job not Found',success:false});
        return res.status(200).json({message:'applicants Found',success:true,job});
    }
    catch(error){
        console.log('error Occured',error);
    }
}


export const updateStatus = async(req,res)=>{
    try{
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status) return res.status(404).json({message:'Status is required',success:false});
        const application = await Application_Model.findOne({_id:applicationId});
        if(!application) return res.status(404).json({message:'application not found',success:false});
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({message:'Application Status updated Successfully',success:true,application});
    }
    catch(error){
        console.log('Error Occured',error);
    }
}