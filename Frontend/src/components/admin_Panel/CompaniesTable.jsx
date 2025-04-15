import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import UseGetAllRegCompanies from '@/hooks/UseGetAllRegCompanies.jsx'
import { useSelector } from 'react-redux'
import { Delete, Edit } from 'lucide-react'
import UseGetCompanyById from '@/hooks/UseGetCompanyById'
import { useNavigate } from 'react-router-dom'
import { ImBin } from "react-icons/im";

const CompaniesTable = () => {
  UseGetAllRegCompanies();
  const navigate = useNavigate();
  const {AllRegComp,SearchViaText} = useSelector(store=>store.company);
  const [filterComp, setFilterComp] = useState(AllRegComp);

  useEffect(()=>{
      const FilteredCompany = AllRegComp.length>0 && AllRegComp.filter((company)=>{
        if(!SearchViaText) return true;
        return company?.name?.toLowerCase().includes(SearchViaText.toLowerCase());
      });
      setFilterComp(FilteredCompany);
  },[AllRegComp,SearchViaText]);


  return (
    <div className='w-[100%] my-5'>
      <div className='max-w-[1240px] px-3 py-2'>
         <h1 className='text-3xl font-semibold my-3 underline'>Registered <span className='text-[#6A38C2]'>Companies</span></h1>
        <Table>
            <TableCaption>A list of your recently registered Companies</TableCaption>
            <TableHeader className='text-center'>
                <TableRow>
                    <TableHead className='text-center'>Logo</TableHead>
                    <TableHead className='text-center'>Company Name</TableHead>
                    <TableHead className='text-center'>Date Of Registration</TableHead>
                    <TableHead className='text-center'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            {
              filterComp && Array.isArray(filterComp) && filterComp?.map((v,i)=>{
                return(
            <TableBody key={i} className='text-center'>
                <TableCell>
                    <Avatar className='justify-self-center'>
                        <AvatarImage className='h-10 w-10 rounded-full justify-self-center' src={v?.logo} />
                    </Avatar>
                </TableCell>
                <TableCell> {v?.name} </TableCell>
                <TableCell> {v?.createdAt.split('T')[0]} </TableCell>
                <TableCell>
                <Popover>
                <PopoverTrigger>
                <div className='flex gap-2 items-center'>
                    <Edit onClick={()=>navigate(`/admin/companies/${v?._id}`)} className='hover:cursor-pointer'/>
                    <ImBin className='hover:cursor-pointer text-xl'/>
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

export default CompaniesTable
