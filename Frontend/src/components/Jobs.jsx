import React from 'react'
import Navbar from './Shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import Footer from './Shared/Footer';
import { useDispatch, useSelector } from 'react-redux';


const Jobs = () => {
  const {alljobs} = useSelector(store=>store.job)
  const dispatch = useDispatch();

  return (
    <>
    <div>
      <Navbar/>
        <div className='max-w-[1240px] px-3 mx-auto my-2'>
        <div className='w-full grid grid-cols-[30%_auto] md:grid-cols-[20%_auto] gap-5 h-[100%]'>
        
        <div className='px-3 py-2'>
        <div className='h-[86vh] pb-3 overflow-y-auto'>
            <FilterCard/>
        </div>
        </div>

        <div>
            {
                alljobs.length == 0 ? <span className='text-center font-bold text-5xl'>No Jobs Found</span> : 
                <div className='flex-1 h-[86vh] pb-3 overflow-y-auto p-5'>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                       { alljobs?.map((v,i)=> <Job singlejob={v} key={v._id}/>
                       )}
                    </div>
                </div>
            }
        </div>

        </div>
   </div>

        <Footer/>
   
    </div>
    </>
  )
}

export default Jobs
