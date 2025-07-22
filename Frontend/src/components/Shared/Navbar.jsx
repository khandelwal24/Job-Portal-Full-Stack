import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { PopoverTrigger, Popover, PopoverContent } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { IoMenu } from "react-icons/io5";
import { Button } from '../ui/button';
import { IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/Redux/authSlice';

const Navbar = () => {
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogOutHandler = async() =>{
        try{
            const res = await axios.get(`http://localhost:1000/api/v1/user/logout`,{headers:{"Content-Type":'application/json'},withCredentials:true});
            if(res.data.success){
                setTimeout(()=>navigate('/'),1200);
                dispatch(setUser(null));
                toast.success(res.data.message);
            }
        }   
        catch(error){
            console.log('Error Occured',error);
            toast.error(error.response.data.message);
        }
    }
  return (  
<div className='w-[100%] px-2.5'>
<div className='max-w-[1240px] mx-auto p-2.5 flex justify-between items-center'>
        
        <h1 className='text-2xl font-bold text-center md:text-left'>Job<span className='text-[#F83002]'>Portal</span> </h1>
        
        <div className='sm:block hidden'>
        <div className='gap-4 flex items-center font-medium '>

        {
            user && user.role == "Student" ? 
            <>
            <Link to={'/'} className='hover:text-[#F83002]' href='#home'>Home</Link>
            <Link to={'/jobs'} className='hover:text-[#F83002]' href='#Jobs'>Jobs</Link>
            <Link to={'/browse'} className='hover:text-[#F83002]' href='#Browse'>Browse</Link>
            </>
             : 
             <>
            <Link to={'/admin/companies'} className='hover:text-[#F83002]' href='#home'>Companies</Link>
            <Link to={'/admin/jobs'} className='hover:text-[#F83002]' href='#jobsAdmin'>Jobs</Link>
             </>
        }
           
          
           {
            !user ? 
                <div className='flex items-center gap-2'>
                <Link to={'/login'}><Button className='hover:cursor-pointer' variant="outline">Login</Button></Link>
                <Link to={'/Signup'}><Button className='hover:cursor-pointer'>SignUp</Button></Link> 
                </div>
             :  
            <Popover>
            <PopoverTrigger asChild>
                <Avatar>
                    <AvatarImage className='hover:cursor-pointer' src={user?.profile?.profilePic} alt="@shadcn"/>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className='w-70'>
            <div className='flex gap-2 items-center hover:bg-gray-300 p-2 rounded-lg mb-2'>
                <Avatar>
                    <AvatarImage className='hover:cursor-pointer' src= {user?.profile?.profilePic} alt="@shadcn"/>
                </Avatar>
                <div>
                    <h4 className='font-medium'>{user.fullname}</h4>
                    <p className='font-light text-sm text-muted-foreground'>{user.profile.bio}</p>
                </div>
            </div>
            <div className='p-2 flex items-center gap-2 justify-around'>
              {user && user.role === "Student" && ( <Link to={'/profile'} href="#" className='hover:underline font-semibold flex gap-1'><FaUser className='text-2xl font-semibold'/>View profile</Link>) }
                <a onClick={LogOutHandler} href="#" className='hover:underline font-semibold flex gap-1'> <IoLogOut className='text-2xl font-semibold'/> Logout</a>
            </div>
            </PopoverContent>
           </Popover>
           }
          
        </div>  
        </div>

        <IoMenu className='text-2xl text-black sm:hidden block'/>
</div>
</div>
  )
}

export default Navbar
