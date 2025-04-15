import React, { useState } from 'react'
import Navbar from './Shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Edit, Mail } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import { useSearchParams } from 'react-router-dom'
import UpdateProfileModal from './UpdateProfileModal'
import { useSelector } from 'react-redux'
import UseGetAppliedJobs from '@/hooks/UseGetAppliedJobs.jsx'

const Profile = () => {
   
    const isResume = true;
    const [open,setOpen]  = useState(false);
    const {user} = useSelector(store=>store.auth);
    UseGetAppliedJobs();


  return (
    <>
    <Navbar/>
    <div className='w-[100%] px-3 py-2'>
    <div className='max-w-[1240px] px-2 py-2'>

    <div className='max-w-4xl mx-auto bg-gray-100 border border-gray-800 rounded-lg my-5 p-5 overflow-hidden'>
    

    <div className='flex items-center justify-between'>
    
    <div className='flex gap-2 items-center'>
    
    <Avatar className="h-24 w-24">
        <AvatarImage className='hover:cursor-pointer' src={user?.profile?.profilePic} alt="@shadcn"/>
    </Avatar>
    
    <div>
        <h1 className='sm:text-xl text-[17px] font-bold'>{user?.fullname}</h1>
        <p className='sm:text-[15px] text-[12px] font-medium'>{user?.profile?.bio}</p>
    </div>

    </div>
   
    <Button onClick={()=>setOpen(!open)} className="sm:block hidden hover:cursor-pointer">Edit profile</Button>
    <Edit onClick={()=>setOpen(!open)} className='block sm:hidden hover:cursor-pointer'/>

    </div>

    <div className='my-5 space-y-1'>
        
        <div className='flex gap-2 items-center'>
            <Mail/>
            <a href='mailto:khandelwalharsh523@gmail.com' className='hover:underline hover:text-blue-500'>{user?.email}</a>
        </div>
        
        <div className='flex gap-2 items-center'>
            <Contact/>
            <span>{user?.phone}</span>
        </div>

    </div>


    <div>
        <p className='text-lg font-semibold underline'>SKILLS</p>
        {
            user?.profile?.skills?.map((v,index)=> <Badge key={index} className={index !== 0 ? 'mx-1' : ''} >{v}</Badge>)
        }
        
    </div>

    <div className='w-full max-w-sm items-center gap-1.5 grid mt-3'>
            <label className='font-bold text-lg'>Resume</label>
            {
                isResume ? <a href={user?.profile?.resume} className='hover:cursor-pointer hover:underline text-blue-500' target='_blank'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
            }
    </div>

    </div>

    <div>
        <AppliedJobTable/>
    </div>

    </div>
            <UpdateProfileModal open ={open} setOpen={setOpen} />
    </div>
    </>
  )
}

export default Profile
