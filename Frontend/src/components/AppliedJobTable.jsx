import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useDispatch, useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const {Allappliedjobs} = useSelector(store=>store.job);
  const dispatch = useDispatch();


  return (
    <div className='w-[100%]'>
    <div className='max-w-4xl py-3 mx-auto'>
      <h1 className='text-4xl font-bold mt-3 mb-5'>Applied <span className='text-[#6A38C2]'>Jobs</span></h1>
      <div>
        <Table className="text-center">
            <TableCaption>A list of your Applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Applied Date</TableHead>
                    <TableHead className="text-center">Job Role</TableHead>
                    <TableHead className="text-center">Company</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {
                Allappliedjobs?.map((v,i)=>(
                    <TableRow key={i}>
                        <TableCell>{v?.createdAt?.split('T')[0]}</TableCell>
                        <TableCell>{v.job?.title}</TableCell>
                        <TableCell>{v.job?.company?.name}</TableCell>
                        <TableCell>
                          <Badge className={`${v?.status == "accepted" ? 'bg-green-400 text-black' : v?.status=="rejected" ? 'bg-red-500':''}`}>{v?.status}</Badge>
                        </TableCell>
                    </TableRow>
                ))
            }
            </TableBody>
        </Table>
      </div>
    </div>
    </div>
  )
}

export default AppliedJobTable
