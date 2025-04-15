import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import cors from 'cors'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import express from 'express'

export const isAuth = async (req,res,next)=>{
    try{
        const token = await req.cookies.CookieToken;
        if(!token) return res.status(401).json({message:'User not Authenticated',success:false});
        const decode = jwt.verify(token,process.env.jwt_Secret);
        if(!decode) return res.status(401).json({message:'Invalid Token',success:false});
        req.id = decode.userId
        next();
    }
    catch(error){
        console.log('Error Occured in authentication');
        res.json({message:'Error Occured in auth.js',success:false});
    }
}

