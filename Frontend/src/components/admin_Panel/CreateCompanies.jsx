import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/Redux/CompanySlice.jsx'

const CreateCompanies = () => {
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState('');
    const {SingleCompany} = useSelector(store=>store.company);
    const dispatch = useDispatch();

    const RegisterNewComp = async()=>{
        try{
            const res = await axios.post(`http://localhost:1000/api/v1/company/RegisterCompany`,{companyName},{headers:{"Content-Type":'application/json'}, withCredentials:true});
            if(res.data?.success){
                dispatch(setSingleCompany(res.data?.company));
                toast.success(res.data?.message);
                const companyId = res.data?.company?._id
                setTimeout(()=>navigate(`/admin/companies/${companyId}`),1200);
            }
        }
        catch(error){
            console.log('error Occured',error);
            toast.error(error.response?.data.message);
        }
    }

  return (
    <div>
        <Navbar/>
        <div className='w-[100%] my-6 px-2'>
        <div className='max-w-[1240px] mx-auto px-3 py-2'>

        <div className='my-10 max-w-[900px] mx-auto'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-600'>What would you like to give your company name? You can Change this later</p>

            <div className='mt-10'>
                <label className='font-semibold'>Company Name</label>
                <input value={companyName} onChange={(e)=>setCompanyName(e.target.value)} type="text" className='w-full p-2.5 border rounded-lg mb-3 mt-1' />
                <div className='space-x-2'>
                <Button className="hover:cursor-pointer" variant="outline" onClick={()=>navigate('/admin/companies')}>Cancel</Button>
                <Button className="hover:cursor-pointer" onClick={RegisterNewComp}>Continue</Button>
                </div>
            </div>
        </div>

        </div>
        </div>
    </div>
  )
}

export default CreateCompanies
