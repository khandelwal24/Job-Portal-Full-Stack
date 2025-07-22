import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import userRoute from './Routes/User_Route.js'
import companyRoute from './Routes/Company_Route.js'
import JobRoute from './Routes/Job_Route.js'
import ApplicationRoute from './Routes/Application_Route.js'
import path from 'path'

const app = express();

//middle-wares :
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:['PUT','POST','GET','DELETE']
}))



// Deployment part...
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname,'/Frontend/dist')));
app.get('*',(_,res)=>{
       res.sendFile(path.resolve(_dirname,'Frontend','dist','index.html'))
})



mongoose.connect(process.env.MONGO_URL,{dbName:'Job_Portal'}).then(()=>console.log('MongoDB connected')).catch(()=>console.log('Errro Occured'));
const port = process.env.PORT || 4000;


//APIs
app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/jobs',JobRoute);
app.use('/api/v1/application',ApplicationRoute);

app.listen(port,()=>console.log(`Server is Running on port no. ${port}`));


