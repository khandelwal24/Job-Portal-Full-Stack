import React, { useEffect } from 'react'
import Navbar from './Shared/Navbar.jsx'
import Job from './Job.jsx';
import Footer from './Shared/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/Redux/JobSlice.jsx';
import UseGetAllJobs from '@/hooks/UseGetAllJobs.jsx';

const Browse = () => {
    UseGetAllJobs();
    const {alljobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchQuery(''));
        }
    },[]);

  return (
    <>
    <div className='w-[100%]'>
        <Navbar/>
        <div className='max-w-[1240px] px-5 py-2 mx-auto'>
            <h1 className='font-semibold text-xl'>Search Results ({alljobs.length})</h1>
            <hr className='w-1/6 mt-2' />
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 my-5'>
            {
                alljobs?.map((v,i)=>{
                    return(
                        <Job key={v?._id} singlejob={v}/>
                    )
                })
            }
            </div>
        </div>
            <Footer/>
    </div>
        </>
  )
}

export default Browse
