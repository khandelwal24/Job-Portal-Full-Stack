import React from 'react'
import LatestJobsCard from './LatestJobsCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
    const {alljobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
  return (
    <div className='w-[100%] my-10 p-4'>
    <div className='max-w-[1240px] px-4 py-3 mx-auto'>
    <h1 className='text-4xl font-bold'> <span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
    {/* Card */}
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-4'>
        {
            alljobs?.length !==0 ? alljobs.slice(0,6)?.map((v,i)=><LatestJobsCard key={v?._id} job={v}/>) : <span>There ar no current Openings</span>
        }
    </div>
    </div>
      
    </div>
  )
}

export default LatestJobs
