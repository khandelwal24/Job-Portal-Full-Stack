import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='w-[100%] py-3 px-4 bg-gray-200'>
    <div className='max-w-[1240px] mx-auto px-3'>
    <div className='w-full mx-auto flex justify-between items-center'>
        
        <div>
            <p className='text-lg'>Job Hunt</p>
            <p className='text-sm'>&copy; 2024 all right are reserved</p>
        </div>

        <div className='flex items-center gap-3'>
            <a> <FaFacebookSquare className='text-3xl hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 font-bold' /> </a>
            <a> <FaLinkedin className='text-3xl hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 font-bold' /> </a>
            <a> <FaTwitter className='text-3xl hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 font-bold'/> </a>
        </div>

    </div>
    </div>
      
    </div>
  )
}

export default Footer
