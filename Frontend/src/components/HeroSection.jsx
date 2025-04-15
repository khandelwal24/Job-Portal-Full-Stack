import { setSearchQuery } from '@/Redux/JobSlice.jsx';
import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query,setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {searchQuery} = useSelector(store=>store.job);

  const searchJobHandler = (e)=>{
    e.preventDefault();
    dispatch(setSearchQuery(query));
    navigate('/browse');
  }
  
  return (
    <div className='text-center max-w-[1240px] mx-auto px-5'>
    <div className='flex flex-col gap-2 mt-10 mb-5 p-2'>
    <span className='px-4 mx-auto py-2 font-medium text-[#F83002] rounded-full bg-gray-100'>No.1 Job Hunt Website </span>      
    <h1 className='md:text-5xl text-3xl font-bold sm:leading-[50px]'>Search,Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
    <p className='text-accent-foreground md:text-lg text-[14px] font-light'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, nesciunt qui sequi eius, et rerum assumenda eveniet </p>
    </div>

    <div className='relative'>
    <input value={query} onChange={(e)=>setQuery(e.target.value)} type='text' placeholder='Find your dream jobs' className='p-2 pl-3 rounded-full shadow-2xl md:w-[40%] w-[80%] place-self-center border  border-gray-200'/>
    <AiOutlineSearch onClick={searchJobHandler} className='text-2xl absolute md:top-[20%] md:right-[31%] top-[20%] right-[15%] hover:cursor-pointer'/>
    </div>

    </div>
  )
}

export default HeroSection
