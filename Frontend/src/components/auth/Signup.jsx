import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Form, Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setloading } from '@/Redux/authSlice';

const Signup = () => {
    
    const [pass,setpass] = useState(false);
    const navigate = useNavigate();
    const {loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.auth);
    
    const [info,setInfo] = useState({
        fullname:'',
        email:'',
        phone:'',
        password:'',
        role:'',
        file:''
      })
    
      const getVal = (e) =>{
        const oldValue = {...info}
        const InputName = e.target.name
        const InputValue = e.target.value
        oldValue[InputName] = InputValue
        setInfo(oldValue);
      }

      const filehandler = (e) => {
        setInfo({...info,file:e.target.files?.[0]})
      }
    
      const submitHandler = async (e) => {
        e.preventDefault();
        console.log(info.fullname, info.password,info.email,info.phone, info.role, info.file);
        const formData = new FormData();
        formData.append('fullname',info.fullname);
        formData.append('email',info.email);
        formData.append('phone',info.phone);
        formData.append('password',info.password);
        formData.append('role',info.role);
        if(info?.file) formData.append('file',info?.file);
        try{
            dispatch(setloading(true));
            const res = await axios.post(`https://job-portal-full-stack.pages.dev/api/v1/user/register`,formData,{headers:{"Content-Type":'muiltipart/form-data'}, withCredentials:true},);
            if(res.data.success){
                toast.success(res.data.message);
                setTimeout(()=>navigate('/login'),1200);
            }
        }
        catch(error){
            console.log('error Occured',error);
            toast.error(error.response.data.message)
        }
        finally{
            dispatch(setloading(false));
        }
        setInfo({
            fullname:'',
            email:'',
            phone:'',
            password:'',
            role:'',
            file:''
        })
      }

      useEffect(()=>{
        if(user) navigate('/');
      },[]);

  return (
    <>
    <Navbar/>
    <div className='flex justify-center items-center mx-auto max-w-6xl'>
        <form onSubmit={submitHandler} method='post' className='w-[70%] sm:w-1/2 border-2 border-black p-2.5 rounded-xl my-10'>
            <h1 className='text-center font-bold text-3xl mb-2'>Sign Up</h1>
            
            <p className='mb-3'>
                <label>Name:</label>
                <input value={info.fullname} onChange={getVal} name='fullname' type='text' className='w-full p-2 outline-1 rounded-lg'/>
            </p>

            <p className='mb-3'>
                <label>Email:</label>
                <input type='email' onChange={getVal} value={info.email} name='email' className='w-full p-2 outline-1 rounded-lg'/>
            </p>

            <p className='mb-3'>
                <label>Phone:</label>
                <input type='tel' onChange={getVal} value={info.phone} name='phone' className='w-full p-2 outline-1 rounded-lg'/>
            </p>

            <p className='mb-3 relative'>
                <label>Password:</label>
                <input type={pass?'text':'password'} onChange={getVal} value={info.password} name='password' className='w-full bg-transparent p-2 outline-1 rounded-lg'/>
                {pass ? <FaEye onClick={()=>setpass(!pass)} className='hover:cursor-pointer text-2xl absolute bottom-[10px] right-2'/> : <FaEyeSlash onClick={()=>setpass(!pass)} className='hover:cursor-pointer text-2xl absolute text-black bottom-2 right-2' />}      
            </p>

            <p className='mb-3 flex md:flex-row flex-col items-center gap-3'>
           
            <span className='space-x-2.5'>
                <label>Profile : </label>
                <input value={info?.profile} onChange={filehandler} name='file' className='cursor-pointer bg-gray-200 w-[50%] p-2 rounded-md' type='file' accept='image/*'/>
            </span>

            <div className='flex gap-3 items-center'>
                        <span>
                        <input name='role' checked={info.role=="Student"} onChange={getVal} type="radio" id="html" value="Student"/>
                        <label htmlFor="html">Student</label>
                        </span>

                        <span>
                        <input name='role' checked={info.role=="Recruiter"} onChange={getVal} type="radio" id="css" value="Recruiter"/>
                        <label htmlFor="css">Recruiter</label>
                        </span>
            </div>

            </p>

            <button className='w-full hover:cursor-pointer p-2 bg-black hover:bg-gray-800 rounded-lg text-white font-medium text-lg'>{loading ? 'Please wait...':'Sign Up'}</button>
            <p className='text-right text-[14px] font-medium'>Already have an account? <Link to={'/login'} className='text-blue-600 hover:underline'>Login</Link> </p>
          
        </form>
    </div>
    </>
  )
}

export default Signup
