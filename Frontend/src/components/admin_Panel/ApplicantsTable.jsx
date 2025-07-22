import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { Badge } from '../ui/badge'
import { setStatus } from '@/Redux/ApplicationSlice'

const ApplicantsTable = () => {
    const shortlistingStatus = ["Accepted","Rejected"];
    const {applicants,STATUS} = useSelector(store=>store.jobApplication);
    const dispatch = useDispatch();

    const statusHandler = async(status,id)=>{
        try{
            const res = await axios.post(`https://job-portal-full-stack.pages.dev/api/v1/application/status/${id}/update`,{status},{withCredentials:true});
            // console.log(res.data.application.status);
            if(res.data.success){
                dispatch(setStatus(res.data.application.status));
                toast.success(res.data.message);
            }
        }
        catch(error){
            console.log('Error Occured',error);
            toast.error(error.response.data.message);
        }
    }

  return (
    <div>
      <Table>
        <TableCaption>A list of all applied candidates for this job</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact no.</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
            <TableBody>
            {
                applicants?.applications?.map((vv,i)=>{
                    return(
                        <TableRow key={i}>
                                <TableCell>{vv?.applicant?.fullname}</TableCell>
                                <TableCell>{vv?.applicant?.email}</TableCell>
                                <TableCell>{vv?.applicant?.phone}</TableCell>
                                <TableCell>{vv?.createdAt.split('T')[0]}</TableCell>
                                <TableCell><a className='text-blue-600 underline' href={vv?.applicant?.profile?.resume}>{vv?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal/>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status,i)=>{
                                                    return(
                                                        <div onClick={()=>statusHandler(status,vv?._id)} className='hover:bg-gray-300 p-2 rounded-lg hover:cursor-pointer' key={i}>
                                                            <span key={i}>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                
                                <TableCell><Badge>{STATUS}</Badge></TableCell>
                        </TableRow>
                    )
                })
            }
            </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
