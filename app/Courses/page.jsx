"use client"
import useCourses from '@/hooks/useCourse';
import React from 'react'

import { RiHeart3Fill } from 'react-icons/ri';
import { SlCalender } from "react-icons/sl";
import { LuClock9 } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import StarRatings from 'react-star-ratings';

import Link from 'next/link';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import img1 from '../../assets/details.PNG'
import Image from 'next/image';
import Head from 'next/head';


export default function Courses() {


  const courses = useCourses();
  // console.log(courses)
  return (
    <>
      <Head>
        <link rel='preload' href={img1} as='image'></link>
        <link rel='preload' href={courses.image} as='image'></link>
      </Head>
      <Navbar></Navbar>


      <div className="lg:py-14 lg:px-16 mt-8 lg:mt-48 relative lg:container lg:mx-auto">
        <div className='bg-[#17549A] hidden lg:block opacity-30 w-11/12 h-80 absolute top-16 right-16'></div>

        <div className='flex flex-col items-center'>
          <Image src={img1} className='w-full hidden lg:block' />

          {/* search bar */}
          
          {/* input filed  */}
          <div className='hidden md:block'>
            <div

              className="flex top-36   lg:left-52 overflow-hidden bg-[#c0d9f3] w-9/12    shadow-lg absolute  px-10 rounded-full  lg:mt-5  items-center  ">

              <from className="w-3/12  ">
                <select style={{ padding: '10px 8px', borderRadius: '4px' }} className="bg-white cursor-pointer">
                  <option className='font-bold'>All Courses</option>
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




      <div className='container mx-auto w-full md:w-10/12 lg:w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:mt-5 mt-28 p-10 lg:p-0'>
        {
          courses?.map(courses => (
            <div key={courses.id} className="relative cursor-pointer shadow-lg mb-3 overflow-hidden rounded-xl border hover:border-black border-[#DDDD] transition-all duration-300 group">
              <div className="relative">
                <Image
                  style={{ height: '160px' }}
                  height={500}
                  width={500}
                  src={courses.image}
                  alt='Banner Image'
                  className={`rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110`}
                  onDragStart={(e) => e.preventDefault()}
                />

                {/* Heart Icon */}
                <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <RiHeart3Fill size={24} className='text-red-500' />
                </div>

                <div className="flex flex-row gap-1 justify-center items-center text-xs">
                  <div className="w-20 h-5 bg-gray-300 rounded-md flex justify-center items-center">
                    <p>Batch</p>
                    <p>5th</p>
                  </div>
                  <div className="flex flex-row justify-center items-center w-28 h-5 bg-gray-300 rounded-md">
                    <MdPeopleAlt />
                    <p>Seat Left 140</p>
                  </div>
                  <div className="flex flex-row items-center w-24 h-5 bg-gray-300 rounded-md">
                    <MdAccessTime />
                    <p>Time left 16</p>
                  </div>
                </div>
              </div>

              <div className='ml-3 mt-2 text-sm'>
                <h2 className="text-lg font-bold">{courses.course_name}</h2>
                <p className="text-sm text-black">{courses.title}</p>

                <div className='gap-1 flex items-center my-1'>
                  <div className='flex flex-row items-center gap-1'>
                    <SlCalender className='text-xs' />
                    <p className="text-gray-700 mr-3">{courses.Date}</p>
                  </div>
                  <LuClock9 className='text-xs' />
                  <p className="text-gray-700">Duration {courses.total_hours}h</p>
                </div>

                <StarRatings
                  rating={courses.rating}
                  starDimension="15px"
                  starSpacing="2px"
                  starRatedColor="gold"
                  numberOfStars={5}
                  name='rating'
                />

                <p className="text-gray-700">{courses.enrollment_date}</p>
              </div>

              <div className="mt-4 my-5 px-2">
                <Link href={`/details/${courses.id}`} passHref>
                  <button className="bg-[#b3dfee] text-white py-2 mr-5 px-8 rounded hover:bg-[#56d3fd] transition w-full duration-300 font-bold">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        }
      </div>





      <Footer></Footer>
    </>
  )
}
