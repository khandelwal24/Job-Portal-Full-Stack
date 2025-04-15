import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/Redux/JobSlice.jsx';

const Category = ["Frontend Developer","Backend Developer","DevOps Engineer","Cloud Engineer","FullStack Developer","Cyber-Security Expert","Data-Analyst","Data-Engineer","Machine Engineer","Graphic Designer"];

const JobsCarousal = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchJobHandler = (query)=>{
        dispatch(setSearchQuery(query));
        navigate('/browse');
    }

  return (
    <div className='my-5 p-5 w-[100%]'>
        <div className='max-w-[1240px] mx-auto'>
            <Carousel className="md:max-w-[45%] max-w-[60%] mx-auto text-center">
                <CarouselContent className="-ml-1">
                {
                    Category.map((v,i)=>(
                        <CarouselItem key={i} className="pl-1 sm:basis-1/2 lg:basis-1/3">
                            <Button onClick={()=>searchJobHandler(v)} className="hover:cursor-pointer rounded-full">{v}</Button>
                        </CarouselItem>
                    ))
                }
                </CarouselContent>
                <CarouselPrevious className='hover:cursor-pointer' />
                <CarouselNext className='hover:cursor-pointer' />
            </Carousel>
        </div>       
    </div>
  )
}

export default JobsCarousal
