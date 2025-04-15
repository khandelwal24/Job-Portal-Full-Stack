import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverTrigger } from '../ui/popover';
import { Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UseGetAllAdminJobs from '@/hooks/UseGetAllAdminJobs.jsx';
import { ImBin } from "react-icons/im";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

const AdminJobsTable = () => {

  const {alladminJobs,searchJobsByText} = useSelector(store=>store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterJob,setfilterJob] = useState(alladminJobs);

   useEffect(()=>{
        const FilteredJob = alladminJobs?.length>0 && alladminJobs.filter((job)=>{
          if(!searchJobsByText) return true;
          return job?.title?.toLowerCase().includes(searchJobsByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobsByText.toLowerCase()) ;
        });
        setfilterJob(FilteredJob);
    },[alladminJobs,searchJobsByText]);

  return (
    <div className='w-[100%] my-5'>
      <div className='max-w-[1240px] px-3 py-2'>
         <h1 className='text-3xl font-semibold my-3 underline'>Newly posted <span className='text-[#6A38C2]'>Jobs</span></h1>
        <Table>
            <TableCaption>A list of your recently posted Jobs</TableCaption>
            <TableHeader className='text-center'>
                <TableRow>
                    <TableHead className='text-center'>Role</TableHead>
                    <TableHead className='text-center'>Company Name</TableHead>
                    <TableHead className='text-center'>Posted Job Date</TableHead>
                    <TableHead className='text-center'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            {
              filterJob && Array.isArray(filterJob) && filterJob?.map((v,i)=>{
                return(
            <TableBody key={i} className='text-center'>
                <TableCell>{v?.title}</TableCell>
                <TableCell>{v?.company?.name}</TableCell>
                <TableCell>{v.createdAt.split('T')[0]}</TableCell>
                <TableCell>
                <Popover>
                <PopoverTrigger>
                <div className='flex gap-2 items-center'>
                    <Edit onClick={()=>navigate(`/admin/companies/${v?._id}`)} className='hover:cursor-pointer'/>
                    <Eye  onClick={()=>navigate(`/admin/job/${v?._id}/applicants`)} className='hover:cursor-pointer'/>
                    <Dialog>
                      <DialogTrigger>
                        <ImBin className='hover:cursor-pointer text-xl'/>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Are you sure? <span className='text-red-600'>Delete this Job?</span></DialogTitle>
                      </DialogHeader>
                      <div className='grid grid-cols-2 gap-3'>
                          <DialogClose asChild><Button type="button" variant="outline">Close</Button></DialogClose>
                          <Button>Delete</Button>
                      </div>
                      </DialogContent>
                    </Dialog>
                </div>
                </PopoverTrigger>
                {/* <PopoverContent>Edit Company info.</PopoverContent> */}
                </Popover>
                 </TableCell>
            </TableBody> 
                )
              }) 
            }
        </Table>
      </div>
    </div>
  )
}

export default AdminJobsTable
