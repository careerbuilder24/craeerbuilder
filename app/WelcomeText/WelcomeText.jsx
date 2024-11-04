import React from 'react'
import logo2 from '../../assets/new.gif';
import { BsArrowUpRightCircle } from "react-icons/bs";
import Image from 'next/image';

import abs from './Welcome.css';
import CountingPage from '../CountingPage/CountingPage';
// import useCourses from '@/hooks/useCourse';
export default function WelcomeText() {



  return (
    <>

      <div className='mt-28 container mx-auto  text-center'>

        <center>
          <div className='bg-[#17549A] w-7/12 h-20 rounded-xl flex justify-center items-center'>
            <h1 className=' lg:text-6xl text-xl font-bold  text-white'>Welcome To Career Builder</h1>
          </div>
          <CountingPage></CountingPage>
        </center>


        <div className='mt-10 flex flex-col lg:flex-row  justify-center gap-10 my-10  px-2'>
          <div className='w-full lg:w-1/2'>
            <div className='relative w-full ' style={{ paddingBottom: '56.25%' }}>
              <iframe
                className='absolute top-0  left-0 w-full h-full'
                src="https://www.youtube.com/embed/d4dLKSnumkU"
                title="YouTube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          </div>
          <div className='w-full lg:w-1/2'>
            <div className='relative w-full' style={{ paddingBottom: '56.25%' }}>
              <iframe
                className='absolute top-0 left-0 w-full h-full'
                src="https://www.youtube.com/embed/6wIuE_kdw7E"
                title="YouTube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>






      </div>
    </>
  )
}
