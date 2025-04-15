import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar.jsx'
import AdminJobsTable from './AdminJobsTable.jsx'
import UseGetAllAdminJobs from '@/hooks/UseGetAllAdminJobs.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsearchJobsByText } from '@/Redux/JobSlice.jsx'

const AdminJobs = () => {
  UseGetAllAdminJobs();
  const navigate = useNavigate();
  const [searchInput,setSearchInput] = useState('');
  const dispatch = useDispatch();

  useEffect(()=>{
        dispatch(setsearchJobsByText(searchInput));
  },[searchInput]);

  return (
    <div className='w-[100%]'>
    <Navbar/>
        <div className='max-w-[1240px] mx-auto px-3 py-2 mt-6'>
        <div className='flex flex-col gap-2 items-center px-5'>
          <input onChange={(e)=>setSearchInput(e.target.value)} type='text' placeholder='Filter Jobs' className='w-full border p-2.5 rounded-lg'/>
          <button onClick={()=>navigate('/admin/jobs/create')} className='cursor-pointer px-3 py-2.5 rounded-lg bg-black hover:bg-gray-800 text-white w-full'>Post New Job</button>
        </div>
        <AdminJobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs
