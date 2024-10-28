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
  // console.log(courses)
  return (
    <>
      <Navbar></Navbar>


      <div className="lg:py-14 lg:px-16 mt-8 lg:mt-40 relative lg:container lg:mx-auto">
        <div className='bg-[#17549A] hidden lg:block opacity-30 w-11/12 h-80 absolute top-16 right-16'></div>

        <div className='flex flex-col items-center'>
          <Image src={img1} className='w-full hidden lg:block' />

          {/* search bar */}






          {/* input filed  */}
          <div className='hidden md:block'>
            <div

              className="flex top-36   lg:left-52 overflow-hidden bg-[#c0d9f3] w-9/12    shadow-lg absolute  px-10 rounded-full  lg:mt-5  items-center  ">

              <from  className="w-3/12  ">
                <select style={{ padding: '10px 8px', borderRadius: '4px' }} className="bg-white cursor-pointer">
                  <option>Grapics Designe</option>
                  <option>Motion Grapics Designe</option>
                  <option>Video Editing</option>
                  <option>Business Development</option>
                  <option>Frontend Development</option>
                  <option>Backend Development</option>

                </select>
              </from>
              

              <div className=" w-full    mb-10  mt-10">
                <form>
                  <div className="relative  flex flex-row">
                    <input
                      type="text"
                      className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded  focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Search..."
                      alt='search bar'
                    />
                    <button
                      type="submit"
                      className=" inset-y-0 flex items-center px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Search
                    </button>
                  </div>
                </form>



              </div>


            </div>



          </div>
          {/* search button for mobile */}

          <div className="lg:w-5/12 w-full md:hidden lg:hidden     mb-10 relative top-32">
            <form>
              <div className="relative">
                <input
                  type="text"
                  className="block w-8/12 px-4 py-2 text-gray-700 placeholder-gray-400 border rounded ml-10 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Search..."
                  alt='search bar'
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-11  flex items-center px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>




      <div className='container mx-auto w-10/12 lg:w-ful grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:mt-10 mt-28 md:mt-96'>
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
            

                <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <RiHeart3Fill size={24} className='text-red-500' />
                </div>
              </div>
              <div className='text-center'>
                <h2 className="text-lg font-bold">{course.course_name}</h2>
                <p className="text-black">{course.title}</p>
              </div>
             <div className='ml-4'>
             <p className="text-gray-700 mt-4 ">Price: ${course.price}</p>
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

             </div>

              <div className="flex justify-between mt-4 my-5 ">
                <Link href={`/details/${course.id}`} passHref>
                  <button className="bg-blue-500 text-white py-2 mr-5 px-8 rounded hover:bg-blue-600 transition duration-300 ml-4 ">
                    Details
                  </button>
                </Link>
                <button className="bg-green-500 text-white py-2 mr-5 px-8 rounded transition duration-300 transform hover:bg-green-600">
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
