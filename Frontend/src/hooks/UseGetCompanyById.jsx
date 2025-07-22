
import { setSingleCompany } from '@/Redux/CompanySlice'
import axios from 'axios'
import { CarTaxiFront } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const UseGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompanyById = async()=>{
        try{
            const res = await axios.get(`http://localhost:1000/api/v1/company/get_Company/${companyId}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
            }
        }
        catch(error){
            console.log('Error occured',error);
        }
    }
   
    fetchCompanyById();

  },[companyId])
}

export default UseGetCompanyById
