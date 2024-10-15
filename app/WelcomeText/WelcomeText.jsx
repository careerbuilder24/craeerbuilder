import React from 'react'
import logo2 from '../../assets/new.gif';
import { BsArrowUpRightCircle } from "react-icons/bs";
import Image from 'next/image';
export default function WelcomeText() {
  return (
    <>
      <div className='mt-28 container mx-auto  text-center'>

        <center>
          <div className='bg-[#17549A] w-7/12 h-20 rounded-xl flex justify-center items-center'>
            <h1 className=' lg:text-6xl text-xl font-bold  text-white'>Welcome To Career Builder</h1>
          </div>
        </center>
        <div className='flex justify-center'>
          <div className='lg:mt-3'>
            <Image src={logo2} className='w-full'></Image>
          </div>
          <div>
            <h1 className='text-[#663399] text-3xl mt-3 font-bold'>Admission Going on 50%</h1>
          </div>
        </div>

        <div className=''>
          <ul>
            <li className='flex justify-center gap-3 mt-5 mr-2 items-center'>  <BsArrowUpRightCircle className='lg:text-2xl text-xl text-[#8ed1fc]' />
              <h1 className='lg:text-xl font-semibold'>Hands-on training + video tutorials + class projects</h1></li>
            <li className='flex justify-center lg:gap-3 mt-4 lg:mt-5 ml-12 lg:ml-72 items-center'>  <BsArrowUpRightCircle className='text-3xl lg:text-2xl mt-3 text-[#8ed1fc]' />
              <h1 className='lg:text-xl mt-3  font-semibold'>3 months internship opportunity for skill enhancement, Salary Rs.8000 per month*</h1></li>
            <li className='flex justify-center gap-3 mt-5 lg:ml-72 ml-12 items-center '>  <BsArrowUpRightCircle className='text-2xl lg:text-2xl text-[#8ed1fc]' />
              <h1 className='lg:text-xl text-sm font-semibold'>6 months full time job opportunity to gain experience, salary Rs.12000 per month*</h1></li>
            <li className='flex justify-center gap-3 mt-5 lg:ml-48 items-center'>  <BsArrowUpRightCircle className='text-2xl text-[#8ed1fc]' />
              <h1 className='lg:text-xl font-semibold'>Training Certificate + Internship Certificate + Job Experience Certificate</h1></li>
            <li className='flex justify-center gap-3 mt-5 lg:ml-24 items-center'>  <BsArrowUpRightCircle className='text-2xl text-[#8ed1fc]' />
              <h1 className='lg:text-xl font-semibold'>Work Portfolio + Freelancing + Outsourcing + Job Reference</h1></li>
            <li className='flex justify-center gap-3 mt-5 lg:mr-16 items-center'>  <BsArrowUpRightCircle className='text-2xl text-[#8ed1fc]' />
              <h1 className='lg:text-xl font-semibold'>New Job Update + Career Guide + Followup</h1></li>
          </ul>


        </div>
      </div>
    </>
  )
}
