import React, { useEffect } from 'react'
import Navbar from '../Shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/Redux/ApplicationSlice.jsx'

const JobApplicants = () => {
  const params = useParams();
  const applicantId = params.id;
  const dispatch = useDispatch();
  const {applicants} = useSelector(store=>store.jobApplication);

  useEffect(()=>{
    const fetchApplicants = async()=>{
      try{
        const res = await axios.get(`http://localhost:1000/api/v1/application/${applicantId}/applicants`,{withCredentials:true});
        console.log(res.data);
        if(res.data.success){
          dispatch(setApplicants(res.data.job));
          toast.success(res.data.message);
        }
      }
      catch(error){
        console.log('Error Occured',error);
      }
    }
    
    fetchApplicants();

  },[]);


  return (
    <div className='w-[100%]'>
      <Navbar/>
      <div className='max-w-[1240px] mx-auto px-3 py-2 mt-5'>
            <span className='font-semibold text-xl'>Total Applicants ({applicants?.applications?.length})</span>
            <hr className='w-full my-3'/>
            <ApplicantsTable/>
      </div>
    </div>
  )
}

export default JobApplicants
