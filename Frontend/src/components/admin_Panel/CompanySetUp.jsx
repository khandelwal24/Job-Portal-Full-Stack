import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Button } from '../ui/button'
import { ArrowBigLeft, ArrowBigLeftIcon } from 'lucide-react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setAllRegComp } from '@/Redux/CompanySlice'
import UseGetCompanyById from '@/hooks/UseGetCompanyById'


const CompanySetUp = () => {
    
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setloading] = useState(false);
    const {AllRegComp,SingleCompany} = useSelector(store=>store.company);


    const companyId = params.id;
    UseGetCompanyById(companyId);

    const [info,setinfo] = useState({
        name:'',
        description:'',
        website:'',
        location:'',
        logo:''
    })

    const getVal = (e) =>{
        const oldVal = {...info}
        const InputName = e.target.name;
        const InputVal = e.target.value;
        oldVal[InputName] = InputVal
        setinfo(oldVal);
    }
    const fileHandler = (e) =>{
        setinfo({...info,logo:e.target.files?.[0]});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        if(info.name) formData.append('name',info.name);
        if(info.description) formData.append('description',info.description);
        if(info.location) formData.append('location',info.location);
        if(info.website) formData.append('website',info.website);
        if(info.logo) formData.append('logo',info.logo);
        try{
            setloading(true);
            const res = await axios.put(`https://job-portal-full-stack.pages.dev/api/v1/company/update/${companyId}`,formData,{headers:{"Content-Type":"multipart/form-data"},withCredentials:true});
            if(res.data.success){
                console.log(res.data);
                toast.success(res.data.message);
                dispatch(setAllRegComp(res.data.company));
                setTimeout(()=>navigate('/admin/companies',2000));
            }
        }
        catch(error){
            console.log('error Occured',error);
            toast.error(error.response.data.message);
        }
        finally{
           setloading(false);
            setinfo({
                name:'',
                description:'',
                location:'',
                website:'',
                logo:null
            })
        }
    }

    useEffect(()=>{
        setinfo({
            name:SingleCompany?.name||'',
            location:SingleCompany?.location||'',
            description:SingleCompany?.description||'',
            website:SingleCompany?.website||'',
            logo:SingleCompany?.logo||null,
        })
    },[SingleCompany])

  return (
    <div>
    <Navbar/>
        <div className='w-[100%] my-10'>
        <div className='max-w-[1240px] mx-auto px-3 py-2'>
        <form onSubmit={handleSubmit} className='border-[2px] border-gray-700 p-5 rounded-lg mx-auto max-w-[700px]'>
            <h6 className='text-2xl text-center font-semibold underline mb-3'>Enter Company Details</h6>

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className='text-sm font-semibold'>Company Name</label>
                    <input onChange={getVal} value={info.name} name='name' type='text' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>Description</label>
                    <input onChange={getVal} value={info.description} name='description' type='text' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>Work Location</label>
                    <input onChange={getVal} value={info.location} name='location' type='text' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>Company Website</label>
                    <input onChange={getVal} value={info.website} name='website' type='text' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>Company Logo</label>
                    <input onChange={fileHandler} name='logo' type='file' accept='image/*' className='w-full p-2.5 rounded-lg border' />
                </div>
            </div>
            <button disabled = {loading} type='submit' className='bg-black hover:bg-gray-800 hover:cursor-pointer text-white px-2.5 py-2 flex rounded-lg mt-3 justify-self-center '>{ loading ? 'Please wait...' : 'Update'}</button>
        </form>
        </div>
        </div>
    </div>
  )
}

export default CompanySetUp
