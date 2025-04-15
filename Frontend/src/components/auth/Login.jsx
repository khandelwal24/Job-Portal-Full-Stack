import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CarTaxiFront } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setloading, setUser } from '@/Redux/authSlice';

const Login = () => {

  const [pass,setpass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector(store=>store.auth);
  const {user} = useSelector(store=>store.auth);
  
      const [info,setInfo] = useState({
          email:'',
          password:'',
          role:'',
        })
      
        const getVal = (e) =>{
          const oldValue = {...info}
          const InputName = e.target.name
          const InputValue = e.target.value
          oldValue[InputName] = InputValue
          setInfo(oldValue);
        }

        const submitHandler = async (e)=>{
          e.preventDefault();
          // console.log(info.password,info.email,info.role);
          try{
            dispatch(setloading(true));
            const res = await axios.post(`http://localhost:1000/api/v1/user/login`,info,{headers:{"Content-Type":'application/json'}, withCredentials:true});
            if(res.data.success){
              dispatch(setUser(res.data.rsp))
              toast.success(res.data.message);
              setTimeout(()=>navigate('/'),1200);
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
              email:'',
              password:'',
              role:'',
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
            <h1 className='text-center font-bold text-3xl mb-2'>Login</h1>

            <p className='mb-3'>
                <label>Email:</label>
                <input type='email' onChange={getVal} value={info.email} name='email' className='w-full p-2 outline-1 rounded-lg'/>
            </p>

            <p className='mb-3 relative'>
                <label>Password:</label>
                <input type={pass?'text':'password'} onChange={getVal} value={info.password} name='password' className='w-full bg-transparent p-2 outline-1 rounded-lg'/>
                {pass ? <FaEye onClick={()=>setpass(!pass)} className='hover:cursor-pointer text-2xl absolute bottom-[10px] right-2'/> : <FaEyeSlash onClick={()=>setpass(!pass)} className='hover:cursor-pointer text-2xl absolute text-black bottom-2 right-2' />}      
            </p>

            <p className='mb-3 flex items-center gap-3'>

            <span>
            <input name='role' checked={info.role=="Student"} onChange={getVal} type="radio" id="html" value="Student"/>
            <label htmlFor="html">Student</label>
            </span>

            <span>
            <input name='role' checked={info.role=="Recruiter"} onChange={getVal} type="radio" id="css" value="Recruiter"/>
            <label htmlFor="css">Recruiter</label>
            </span>

            </p>

            <button className='w-full hover:cursor-pointer p-2 bg-black hover:bg-gray-800 rounded-lg text-white font-medium text-lg'>{loading ? 'Please wait...' : 'Log in'}</button>
            <p className='text-right text-[14px] font-medium'>Don't have an account? <Link to={'/Signup'} className='text-blue-600 hover:underline'>Sign Up</Link> </p>
          
        </form>
    </div>
    </>
  )
}

export default Login
