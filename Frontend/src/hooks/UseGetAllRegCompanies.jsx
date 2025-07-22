import { setAllRegComp } from '@/Redux/CompanySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const UseGetAllRegCompanies = () => {
    
    const dispatch = useDispatch();
    const {AllRegComp} = useSelector(store=>store.company);

  useEffect(()=>{
    const registeredCompines = async()=>{
        try{
            const res = await axios.get(`https://job-portal-full-stack.pages.dev/api/v1/company/getAllcompany`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllRegComp(res.data.companies));
                toast.success(res.data.message);
            }
        }
        catch(error){
            console.log('Error occured',error);
            toast.error(error.response.data.message);
        }
    }

    registeredCompines();

  },[])
}

export default UseGetAllRegCompanies
