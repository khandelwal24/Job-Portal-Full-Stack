import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({singlejob}) => {
  const navigate = useNavigate();

  const daysAgoFunc = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff/(1*24*60*60*1000));
  }

  return (
    <div className='border shadow-2xl border-gray-800 p-3 rounded-lg hover:scale-105 duration-200 ease-in-out transition-all'>

    <div className='w-full flex justify-between items-center'>
     <p className='text-gray-600 text-sm'>{daysAgoFunc(singlejob?.createdAt) == 0 ? "Today" : `${daysAgoFunc(singlejob?.createdAt)} days ago`}</p>
     <Button variant="outline" className="rounded-full hover:cursor-pointer" size="icon"><Bookmark/></Button>
    </div>
    
    <div className='flex items-center pt-3 gap-2'>

     <Button className="p-6 rounded-full" size="icon" variant="outline">
     <Avatar>
        <AvatarImage className='hover:cursor-pointer' src={singlejob?.company?.logo} alt="@shadcn"/>
    </Avatar>
    </Button>
    
    <div>
    <p className='font-semibold text-lg'>{singlejob?.company?.name}</p>
    <p className='font-mono text-sm'>{singlejob?.company?.location}</p>
    </div>

    </div>

    <div className='my-2'>
        <h5 className='font-bold sm:text-lg text-[15px]'>{singlejob?.title}</h5>
        <p className='text-[12px] text-gray-600'>{singlejob?.description}</p>
    </div>
    
    
    <div className='space-x-2 space-y-2'>
        <Badge variant="ghost" className="text-blue-600 font-bold  sm:text-sm  text-[10px]">{singlejob?.position} Positions</Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold sm:text-sm  text-[10px]">{singlejob?.Job_Type}</Badge>
        <Badge variant="ghost" className="text-[#0aff05] font-bold sm:text-sm  text-[10px]">{singlejob?.salary}LPA</Badge>
    </div>

    <div className='space-x-3 space-y-2 mt-3 mb-2'>
        <Button onClick={()=>navigate(`/jobs/description/${singlejob?._id}`)} variant="outline" className="hover:cursor-pointer">Details</Button>
        <Button className="bg-[#6A38C2] hover:bg-[#7a5fa9] hover:cursor-pointer">Save for later</Button>
    </div>


    </div>
  )
}

export default Job
