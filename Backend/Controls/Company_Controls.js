import { Company_Model, User_Model } from "../Models/User_Model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import cloudinary from "../Utils/CloudinaryP.js";


export const Register_Company = async(req,res)=>{
    try{
        const {companyName} = req.body
        if(!companyName) return res.status(400).json({message:'CompnayName is required',success:false});
        let company = await Company_Model.findOne({name:companyName})
        if(company) return res.status(400).json({message:'You cannnot register the same compnay again'});
        company = await Company_Model.create({name:companyName, userId:req.id});
        return res.status(201).json({message:'Company registered Successfully',success:true,company});
    }
    catch(error){
        console.log('Error Occured',error);
    }
}

export const get_Compnay = async(req,res)=>{
    try{
        const LoggedInuserId = req.id
        let companies = await Company_Model.find({userId:LoggedInuserId}).sort({createdAt:-1});
        if(!companies) return res.status(404).json({message:'No comapnies found',success:false});
        return res.status(200).json({message:'Here is the list of all registered Companies !!',success:true,companies})
    }
    catch(error){
        console.log('Error Occured',error);
    }
}

export const get_Company_ById = async(req,res)=>{
    try{
        const companyId = req.params.id;
        const company = await Company_Model.findById({_id:companyId})
        if(!company) return res.status(404).json({message:'No company found !!',success:false});
        return res.status(200).json({message:'Company Found',success:true,company});
    }  
    catch(error){
        console.log('Error Occured',error);
        res.json({message:'error Occured',error});
    }
}

export const updateCompany = async(req,res)=>{
    try{
        const compnayId = req.params.id
        const {name,description,website,location} = req.body
        let logo = req.file;
        //cloudinary...
        let CloudRsp;
        if(logo) CloudRsp = await cloudinary.uploader.upload(req.file.path,{folder:'Job_Portal/companyLogo'});
        const updateData = {name,description,website,location,logo:CloudRsp?.secure_url};
        const company = await Company_Model.findByIdAndUpdate(compnayId,updateData,{new:true});
        if(!company) res.status(401).json({message:'Company not found',success:false});
        return res.status(200).json({message:'Company Info. is Updated Successfully',success:true,company});
    }
    catch(error){
        console.log('erro occured',error);
    }
}