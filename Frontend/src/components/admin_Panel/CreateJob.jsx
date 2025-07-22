import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { AlignLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {

    const [loading,setloading] = useState(false);
    const {AllRegComp} = useSelector(store=>store.company);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [info,setinfo] = useState({
            title:'',
            description:'',
            requirements:'',
            location:'',
            salary:'',
            Job_Type:'',
            experience:'',
            position:'',
            companyId:'',
        })
    
        const getVal = (e) =>{
            const oldVal = {...info}
            const InputName = e.target.name;
            const InputVal = e.target.value;
            oldVal[InputName] = InputVal
            setinfo(oldVal);
        }

        const setChangeHandler = (val)=>{
            const selectedCompany = AllRegComp.find((company)=>company?.name === val);
            setinfo({...info,companyId:selectedCompany._id});
        }

        const handleSubmit = async(e) =>{
            e.preventDefault();
            console.log('Form data: ',info);

            try{
                setloading(true);
                const res = await axios.post(`https://job-portal-full-stack.pages.dev/api/v1/jobs/post_Job`,info,{headers:{"Content-Type":'application/json'},withCredentials:true});
                if(res.data.success){
                    toast.success(res.data.message);
                   setTimeout(()=>navigate('/admin/jobs'),1200);
                }
            }
            catch(error){
                console.log('Error Occured',error);
                toast.error(error.response.data.message);
            }
            finally{
                setloading(false);
                setinfo({
                    title:'',
                    description:'',
                    requirements:'',
                    location:'',
                    salary:'',
                    Job_Type:'',
                    experience:'',
                    position:'',
                    companyId:'',
                })
            }
        }


  return (
    <div>
    <Navbar/>
        <div className='w-[100%] my-10'>
        <div className='max-w-[1240px] mx-auto px-3 py-2'>
        <form onSubmit={handleSubmit} className='border shadow-2xl border-gray-700 p-5 rounded-lg mx-auto max-w-[700px]'>
            <h6 className='text-2xl text-center font-semibold underline mb-3'>Enter Job Details</h6>

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className='text-sm font-semibold'>Title</label>
                    <input onChange={getVal} value={info.title} name='title' type='text' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>description</label>
                    <input onChange={getVal} value={info.description} name='description' type='text' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>requirements</label>
                    <input onChange={getVal} value={info.requirements} name='requirements' type='text' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>Salary in(LPA)</label>
                    <input onChange={getVal} value={info.salary} name='salary' type='text' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>Location</label>
                    <input onChange={getVal} value={info.location} name='location' type='text' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>Job type</label>
                    <input onChange={getVal} value={info.Job_Type} name='Job_Type' type='text' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>Experience</label>
                    <input onChange={getVal} value={info.experience} name='experience' type='number' className='w-full p-2.5 rounded-lg border' />
                </div>
                <div>
                    <label className='text-sm font-semibold'>Open Positions</label>
                    <input onChange={getVal} value={info.position} name='position' type='number' className='w-full p-2.5 rounded-lg border' />
                </div>

                <div>
                <label className='text-sm font-semibold'>Select a Company</label>
                {
                    AllRegComp?.length !== 0 && 
                    <select name="companyId" value={info.companyId} onChange={(e)=>setChangeHandler(e.target.value)} className='w-full p-2.5 rounded-lg border'>
                    <option className='text-gray-600'>--- Select a company ---</option>
                        {
                            AllRegComp.map((v,i)=>{
                                return(
                                    <option>{v?.name}</option>
                                )
                            })
                        }
                    </select>
                }
                </div>
            </div>
            <Button disabled = {loading} type='submit' className='w-full hover:cursor-pointer text-white px-2.5 py-2 flex mt-5 '>{ loading ? 'Please wait...' : 'Post New Job'}</Button>
            {
                AllRegComp.length===0 && <p className='text-red-600 tex-sm text-center font-semibold my-2'>***Please Register a company first then try to post Job***</p>
            }
        </form>
        </div>
        </div>
    </div>
  )
}

export default CreateJob
