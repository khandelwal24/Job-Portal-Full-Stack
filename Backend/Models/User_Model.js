import mongoose from "mongoose"

const User_Schema = new mongoose.Schema({
    fullname:{type:String,required:true,trim:true},
    email:{type:String,unique:true,trim:true,required:true},
    phone:{type:Number,required:true,unique:true,trim:true},
    password:{type:String,required:true},
    role:{type:String,enum:['Student','Recruiter'],required:true},
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // url to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePic:{type:String,default:''},
    },
},{timestamps:true});
export const User_Model = mongoose.model('User',User_Schema);


const Job_Schema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    requirements:[{type:String, trim:true}],
    salary:{type:Number,required:true},
    location:{type:String,required:true},
    experience:{type:Number},
    Job_Type:{type:String,required:true},
    position:{type:Number,required:true},
    company:{type:mongoose.Schema.Types.ObjectId,ref:'Company',required:true},
    created_by:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    applications:[{type:mongoose.Schema.Types.ObjectId,ref:'Applications'}]
},{timestamps:true})
export const Job_Model = mongoose.model('Job',Job_Schema)


const Compnay_Schema = new mongoose.Schema({
    name:{type:String,required:true,trim:true,unique:true},
    description:{type:String},
    website:{type:String},
    location:{type:String},
    logo:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
},{timestamps:true})
export const Company_Model = mongoose.model('Company',Compnay_Schema);


const Application_Schema = new mongoose.Schema({
    job:{type:mongoose.Schema.Types.ObjectId,ref:'Job',required:true},
    applicant:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    status:{type:String,enum:['Pending','accepted','rejected'],default:'Pending'},
},{timestamps:true});
export const Application_Model = mongoose.model('Applications',Application_Schema);