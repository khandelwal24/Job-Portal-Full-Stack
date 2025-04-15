import { setallAdminJobs } from '@/Redux/JobSlice.jsx'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const UseGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{

        const fetchAdminJobs = async() =>{
            try{
                const res = await axios.get(`http://localhost:1000/api/v1/jobs/get_Admin_Job`,{withCredentials:true});
                if(res.data.success){
                    console.log("DATA: ",res.data);
                    dispatch(setallAdminJobs(res.data.jobs));
                    toast.success(res.data.message);
                }
            }
            catch(error){
                console.log('Error Occured',error);
            }
        }
        
        fetchAdminJobs();

    },[]);
}

export default UseGetAllAdminJobs
