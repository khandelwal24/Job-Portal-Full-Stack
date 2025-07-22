import { setAlljobs } from '@/Redux/JobSlice.jsx'
import axios, { all } from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const UseGetAllJobs = () => {
    
    const {alljobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    const {searchQuery} = useSelector(store=>store.job);

    useEffect(()=>{
        const fetchAlljobs = async()=>{
            const res = await axios.get(`https://job-portal-full-stack.pages.dev/api/v1/jobs/getAllJobs?keyword=${searchQuery}`,{withCredentials:true});
            if(res.data.success){
                console.log(res.data.jobs);
                // dispatch(setAlljobs([...alljobs,res?.data?.jobs]));
                dispatch(setAlljobs(res.data.jobs))
            }
        }
        fetchAlljobs();
    },[])
}

export default UseGetAllJobs
