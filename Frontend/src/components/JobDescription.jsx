import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSinglejob } from '@/Redux/JobSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/Redux/authSlice.jsx';
import { toast } from 'sonner';

const JobDescription = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const jobid = params.id;
  const {user} = useSelector(store=>store.auth);
  console.log(user);
  const {singleJob} = useSelector(store=>store.job);
  const isApplied = singleJob?.applications?.applicant?.includes(user?._id);
  const [alreadyApplied,setAlreadyApplied] = useState(isApplied);
  
  const applyJobHandler = async() =>{
    try{
      const res = await axios.get(`http://localhost:1000/api/v1/application/apply/${jobid}`,{withCredentials:true});
      if(res.data.success){
        setAlreadyApplied(true); //updating the local state 
        toast.success(res.data.message);
        const updateSingleJob = {...singleJob,applications:[...singleJob?.applications,{applicant:user?._id}]}
        dispatch(setSinglejob(updateSingleJob));
      }
    }
    catch(error){
      console.log('error Occured',error);
      toast.error(error.response.data.message);
    }
  }

    useEffect(()=>{
      const fetchSingleJob = async()=>{
          try{
              const res = await axios.get(`http://localhost:1000/api/v1/jobs/get/${jobid}`,{withCredentials:true})
              if(res.data.success){
                  dispatch(setSinglejob(res.data.job));
                  setAlreadyApplied(res.data.job?.applications.some(appp=>appp.applicant === user?._id))
                  console.log('AlreadyApplied',alreadyApplied);
              }
          }
          catch(error){
              console.log('error Occured',error);
          }
      }
      
      fetchSingleJob();

  },[jobid,user?._id,dispatch]);



  return (
    
    <div className='w-[100%]'>
    <div className='max-w-[1240px] mx-auto px-3 py-4'>
      
      <h1 className='text-3xl font-semibold mt-3 mb-5'> <span className='text-[#6A38C2]'>Job</span> Details</h1>
      
      <div className='p-5 border border-gray-200 shadow-2xl rounded-lg'>
      
      <div className='flex items-center justify-between'>
      
      <div>
      <h1 className='font-bold text-2xl mb-2'>{singleJob?.title}</h1>
      <div className='space-x-2 space-y-2'>
        <Badge variant="ghost" className="text-blue-600 font-bold  sm:text-sm  text-[10px]">{singleJob?.position} Positions</Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold sm:text-sm  text-[10px]">{singleJob?.Job_Type}</Badge>
        <Badge variant="ghost" className="text-[#0aff05] font-bold sm:text-sm  text-[10px]">{singleJob?.salary}LPA</Badge>
       </div>  
      </div>

      <Button onClick={alreadyApplied ? null : applyJobHandler} disabled = {alreadyApplied} className={`rounded-lg ${alreadyApplied ? 'bg-gray-600 cursor-not-allowed':'cursor-pointer'}`}>{alreadyApplied ? 'Already Applied' : 'Apply'}</Button>
      </div>
      
      <h2 className='text-xl font-medium mt-3 mb-2'>Job description</h2>
      <hr />

       <div className='my-2'>
        <p className='font-medium my-1'>Role : <span className='font-normal pl-1 text-gray-700'>{singleJob?.title}</span> </p>
        <p className='font-medium my-1'>Location : <span className='font-normal pl-1 text-gray-700'>{singleJob?.location}</span> </p>
        <p className='font-medium my-1'>Salary : <span className='font-normal pl-1 text-gray-700'>{singleJob?.salary} LPA</span> </p>
        <p className='font-medium my-1'>Experience : <span className='font-normal pl-1 text-gray-700'>2 years and more</span> </p>
        <p className='font-medium my-1'>description : <span className='font-normal pl-1 text-gray-700'>{singleJob?.description}</span> </p>
        <p className='font-medium my-1'>Total Applicants : <span className='font-normal pl-1 text-gray-700'>{singleJob?.applications?.length}</span> </p>
        <p className='font-medium my-1'>Posted Date : <span className='font-normal pl-1 text-gray-700'>{singleJob?.createdAt.split('T')[0]}</span> </p>
       </div>

      </div>



    </div>
    </div>
  )
}

export default JobDescription
