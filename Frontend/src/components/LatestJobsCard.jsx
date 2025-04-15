import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobsCard = ({job}) => {
  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/jobs/description/${job?._id}`)} className='bg-gray-100 p-3 border rounded-lg border-gray-300  shadow-xl hover:cursor-pointer hover:scale-105 duration-200 ease-in-out transition-all'>
    
    <div>
      <h6 className='font-semibold text-lg'>{job?.company?.name}</h6>
      <p className='font-mono text-sm'>{job?.company?.location}</p>
    </div>

    <div className='my-2'>
      <h6 className='text-lg font-semibold'>{job?.title}</h6>
      <p className='text-[12px] font-sans'>description : {job?.description} </p>
    </div>

    <div className='space-x-2 space-y-2'>
        <Badge variant="ghost" className="text-blue-600 font-bold">{job?.position} Positions</Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold">{job?.Job_Type}</Badge>
        <Badge variant="ghost" className="text-[#0aff05] font-bold">{job?.salary}LPA</Badge>
    </div> 

    </div>
  )
}

export default LatestJobsCard
