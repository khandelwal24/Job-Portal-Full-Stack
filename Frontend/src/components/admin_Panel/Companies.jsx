import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchViaText } from '@/Redux/CompanySlice'

const Companies = () => {
  const navigate = useNavigate();
  const [searchInput,setSearchInput] = useState('');
  const dispatch = useDispatch();

  useEffect(()=>{
        dispatch(setSearchViaText(searchInput));
  },[searchInput]);

  return (
    <div className='w-[100%]'>
      <Navbar/>
      <div className='max-w-[1240px] mx-auto px-3 py-2 mt-6'>
      <div className='flex flex-col gap-2 items-center px-5'>
          <input onChange={(e)=>setSearchInput(e.target.value)} type='text' placeholder='Filter company' className='w-full border p-2.5 rounded-lg'/>
          <button onClick={()=>navigate('/admin/companies/create')} className='cursor-pointer px-3 py-2.5 rounded-lg bg-black hover:bg-gray-800 text-white w-full'>New Company</button>
      </div>
      <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
