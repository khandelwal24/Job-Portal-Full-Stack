import { setAllappliedJobs } from '@/Redux/JobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const UseGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async()=>{
            try{
                const res = await axios.get(`http://localhost:1000/api/v1/application/get`,{withCredentials:true});
                if(res.data.success){
                    toast.success(res.data.message);
                    dispatch(setAllappliedJobs(res.data.Total_applications));
                }
            }
            catch(error){
                console.log('Error Occured',error);
                toast.error(error.response.data.message);
            }
        }
        
        fetchAppliedJobs();

    },[]);
}

export default UseGetAppliedJobs
