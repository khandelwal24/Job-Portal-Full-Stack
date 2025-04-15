import React, { useEffect } from 'react'
import Navbar from './Shared/Navbar'
import HeroSection from './HeroSection'
import JobsCarousal from './JobsCarousal'
import LatestJobs from './LatestJobs'
import Footer from './Shared/Footer'
import UseGetAllJobs from '@/hooks/UseGetAllJobs.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  
  
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user?.role === "Recruiter") navigate('/admin/companies');
  },[]);
  

  UseGetAllJobs();

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <JobsCarousal/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
