"use client"
import useCourses from '@/hooks/useCourse';
import React from 'react'

import { RiHeart3Fill } from 'react-icons/ri';
import { SlCalender } from "react-icons/sl";
import { LuClock9 } from "react-icons/lu";
import StarRatings from 'react-star-ratings';

import Link from 'next/link';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import img1 from '../../assets/details.PNG'
import Image from 'next/image';


export default function Courses() {
  const courses = useCourses();
  console.log(courses)
  return (
    <>
      <Navbar></Navbar>


      <div className="py-14 px-16 mt-8 lg:mt-56 relative container mx-auto">
        <div className='bg-[#17549A] opacity-30 w-11/12 h-80  absolute top-16 right-16'>
          {/* <h1>adfh</h1> */}
        </div>

        <Image src={img1} className='w-full'></Image>







      </div>




      {/* <div>
          <input
            type="text"
            placeholder="Search for businesses..."
            className="w-3/12 border border-gray-300 rounded-full py-5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <button className="bg-blue-500 text-white rounded-full py-2 px-6 ml-2 hover:bg-blue-600 transition duration-200">
            Search
          </button>
        </div> */}




      <div className='container mx-auto w-10/12 lg:w-9/12 lg:w-ful grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:mt-0'>
        {
          courses?.map(course => (
            <div style={{ borderRadius: '5px' }} key={course.id} className="relative cursor-pointer bg-gray-200  mb-3 overflow-hidden group">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.image}
                  className={`rounded-2xl mb-4 object-cover w-full transition-transform duration-300 group-hover:scale-110`}
                  onDragStart={(e) => e.preventDefault()}
                />
                {/* <div className="absolute top-0 left-0 right-0 h-full bg-[#7db2ee] opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div> */}
                {/* <div className="absolute top-0 left-0 right-0 h-1/2 bg-transparent shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)' }}></div> */}

                <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <RiHeart3Fill size={24} className='text-red-500' />
                </div>
              </div>
              <div className='text-center'>
                <h2 className="text-lg font-bold">{course.course_name}</h2>
                <p className="text-black">{course.title}</p>
              </div>
              <p className="text-gray-700 mt-4">Price: ${course.price}</p>
              <div className='gap-2 flex items-center '>
                <SlCalender className='text-xs ' />
                <p className="text-gray-700">{course.Date}</p>
              </div>
              <div className='gap-2 flex items-center '>
                <LuClock9 className='text-xs' />
                <p className="text-gray-700">Total Hours: {course.total_hours}</p>
              </div>
              <StarRatings
                rating={course.rating}
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="gold"
                numberOfStars={5}
                name='rating'
              />
              <p className="text-gray-700">Enrollment Date: {course.enrollment_date}</p>

              <div className="flex justify-between mt-4 my-3">
                <Link href={`/details/${course.id}`} passHref>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ml-5 ">
                    Details
                  </button>
                </Link>
                <button className="bg-green-500 text-white py-2 mr-5 px-6 rounded transition duration-300 transform hover:bg-green-600">
                  Enroll
                </button>
              </div>
            </div>
          ))
        }
      </div>
      <Footer></Footer>
    </>
  )
}
