import { User_Model } from "../Models/User_Model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import cloudinary from "../Utils/CloudinaryP.js";


export const register = async(req,res)=>{
    try{
        const {fullname,email,phone,password,role} = req.body;
        if(!fullname || !email || !phone || !password || !role) return res.status(401).json({message:'All feilds are required',success:false});

        //cloudinary set
        const file = req.file;
        let cloduRsp;
        if(file) cloduRsp = await cloudinary.uploader.upload(req.file.path,{folder:'Job_Portal'})

        let rsp = await User_Model.findOne({email});
        if(rsp) return res.status(400).json({message:'User email already exists',success:false});
        const hashPass = await bcrypt.hash(password,10);
        rsp = await User_Model.create({fullname,email,phone,password:hashPass,role,profile:{profilePic:cloduRsp?.secure_url}})
        return res.status(200).json({message:'User Registered Successfully',success:true,rsp});
    }
    catch(error){
        console.log('Error Occured during Registration !!!',error);
        res.json({message:"Error Occured in register page",success:false});
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password,role} = req.body
        if(!email || !password || !role) return res.status(401).json({message:'All feilds are required!!',success:false})
        let rsp = await User_Model.findOne({email})
        if(!rsp) return res.status(401).json({message:'Email doesnt exists ',success:false});
        
        const validate = await bcrypt.compare(password,rsp?.password);
        if(!validate) return res.status(401).json({message:'Incorrect Passowrd',success:false});

        // check if role is correct or not 
        if(role!==rsp.role) return res.status(401).json({message:'Account does not exists with this role', success:false})

        const payload = {
            userId: rsp._id,
            email: rsp.email,
            user_role: rsp.role
        }

        let token = jwt.sign(payload,process.env.jwt_Secret,{expiresIn:'1d'})
        
        const Options = {
            httpOnly:true, // for security purpose like cross side scripting 
            sameSite:'strict',
            maxAge: new Date(Date.now() + 2*24*60*60*1000),
        }
        
        rsp = rsp.toObject();
        rsp.password = undefined
        rsp.token = token

        return res.status(200).cookie('CookieToken',token,Options).json({message:`Login Successful - Welcome ${rsp.fullname}`,success:true,rsp});
    }
    catch(error){
        console.log('Error Occured',error);
        res.json({message:'Error Occured Bro',success:false});
    }
}

export const LogOut = async(req,res)=>{
    try{
        return await res.status(200).cookie('CookieToken','',{maxAge:0}).json({message:'User logged Out Successfully',success:true});
    }
    catch(error){
        console.log('Error occured');
        res.json({message:'Error Occured during logOut',success:false});
    }
}

export const updateProfile = async(req,res)=>{
    try{
        const{fullname,email,phone,bio,skills} =  req.body
        const file = req.file;
        console.log(fullname,email,phone,bio,skills,file)
        // Cloudinary SetUp:

        let Cloudrsp;
        if(file) Cloudrsp = await cloudinary.uploader.upload(req.file.path,{folder:'Jobs_Portal'});
        
        let skills_Array;
        if(skills) skills_Array = skills.split(",");
        const LoggedInUserid = req.id;// from middle ware authentication..file
        let rsp = await User_Model.findById(LoggedInUserid).select('-password')
        if(!rsp) return res.status(400).json({message:'User not found login 1st !!',success:false})

            if(fullname) rsp.fullname = fullname
            if(email) rsp.email = email
            if(phone) rsp.phone = phone
            if (bio) rsp.profile.bio = bio;
            if(skills) rsp.profile.skills = skills_Array;
            if(file) {
                rsp.profile.resume = Cloudrsp.secure_url;
                rsp.profile.resumeOriginalName = Cloudrsp.original_filename
                // console.log("OriginalName : ",Cloudrsp.original_filename)
            }
            
            await rsp.save();
            return res.status(200).json({message:'Profile Edited Successfully',success:true,rsp});
    }
    catch(error){
        console.log('Error Occured in Updatation',error);
        res.json({message:'Error Occured',success:false});
    }
}
