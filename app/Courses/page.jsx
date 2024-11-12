"use client";
import useCourses from '@/hooks/useCourse';
import React, { useState, useEffect } from 'react';
import { RiHeart3Fill } from 'react-icons/ri';
import { SlCalender } from "react-icons/sl";
import { LuClock9 } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import StarRatings from 'react-star-ratings';
import Link from 'next/link';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import img1 from '../../assets/details.PNG';
import Image from 'next/image';
import Head from 'next/head';

import './Course.css'
export default function Courses() {
  const courses = useCourses();
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [selectedTitle, setSelectedTitle] = useState(''); // State for selected title
  const [loading, setLoading] = useState(true); // Loading state

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle title select change
  const handleTitleChange = (e) => {
    setSelectedTitle(e.target.value);
  };

  // Get unique course titles for the dropdown
  const courseTitles = [...new Set(courses?.map(course => course.course_name))];

  // Filter courses based on search term and selected title
  const filteredCourses = courses?.filter(course => {
    const matchesSearchTerm = course.course_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTitle = selectedTitle === '' || course.course_name === selectedTitle;
    return matchesSearchTerm && matchesTitle;
  });

  // Set loading to false once courses are fetched (when `courses` data is available)
  useEffect(() => {
    if (courses) {
      setLoading(false);
    }
  }, [courses]);

  return (
    <>
      <Head>
        <link rel='preload' href={img1} as='image' />
        <link rel='preload' href={courses?.image} as='image' />
      </Head>

      <Navbar />

      <div className="lg:py-14 lg:px-24 mt-8 lg:mt-48 relative lg:container lg:mx-auto lg:w-8/12 left-1 " >
        {/* Upper gradient of Banner image */}
        <div className='bg-[#17549A] hidden lg:block opacity-30 w-10/12 container h-64 absolute top-12 right-24'></div>

        <div className='flex flex-col items-center'>
          <Image src={img1} className='w-full hidden lg:block' />

          {/* Search bar */}
          <div className='hidden md:block'>
            <div className="flex top-32 right-24  lg:left-40  overflow-hidden bg-[#c0d9f3] w-9/12 shadow-lg absolute px-10 rounded-full lg:mt-5 items-center md:mt-16">

              {/* Dropdown for course titles */}
              <form className="w-3/12">
                <select
                  value={selectedTitle}
                  onChange={handleTitleChange}
                  style={{ padding: '10px 8px', borderRadius: '4px' }}
                  className="bg-white cursor-pointer"
                >
                  <option className='font-bold' value=''>All Courses</option>
                  {courseTitles.map((title, index) => (
                    <option key={index} value={title}>{title}</option>
                  ))}
                </select>
              </form>

              <div className="w-full mb-10 mt-10">
                <form>
                  <div className="relative flex flex-row">
                    <input
                      type="text"
                      className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button
                      type="submit"
                      className="inset-y-0 flex items-center px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile search button */}
          <div className="lg:w-5/12 w-full md:hidden lg:hidden mb-10 relative top-32 overflow-hidden">
            <form>
              <div className="relative">
                <input
                  type="text"
                  className="block w-8/12 px-4 py-2 text-gray-700 placeholder-gray-400 border rounded ml-10 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-11 flex items-center px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto md:w-10/12 lg:w-7/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 custom-grid-layout mt-72 lg:mt-0 w-9/12 md:mt-96">
        {loading ? (
          // Show loader in the center of the page
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : filteredCourses?.length > 0 ? (
          filteredCourses?.map(course => (
            <div key={course.id} className="relative cursor-pointer shadow-lg mb-3 overflow-hidden rounded-xl border hover:border-black border-[#DDDD] transition-all duration-300 group bg-[#edf5f8]">
              {/* Image Section */}
              <div className="relative">
                <Image
                  style={{ height: '160px' }}
                  height={1000}
                  width={1000}
                  src={course.image}
                  alt="Banner Image"
                  className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
                  onDragStart={(e) => e.preventDefault()}
                />

                {/* Heart Icon */}
                <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <RiHeart3Fill size={24} className="text-red-500" />
                </div>

                {/* Info Section */}
                <div className="flex flex-row gap-1 justify-center items-center text-xs">
                  <div className="w-16 h-5 bg-gray-300 rounded-md flex justify-center items-center">
                    <p>Batch</p>
                    <p>5th</p>
                  </div>
                  <div className="flex flex-row justify-center items-center w-24 lg:w-28 h-5 bg-gray-300 rounded-md">
                    <MdPeopleAlt />
                    <p>Seat Left 140</p>
                  </div>
                  <div className="flex flex-row items-center w-20 h-5 bg-gray-300 rounded-md">
                    <MdAccessTime />
                    <p>Time left 16</p>
                  </div>
                </div>
              </div>

              {/* Course Info Section */}
              <div className="ml-3 mt-2 text-sm">
                <h2 className="text-base font-bold">{course.course_name}</h2>
                {/* <p className="text-sm text-black">{course.title}</p> */}

                <div className="gap-1 flex items-center my-1">
                  <div className="flex flex-row items-center gap-1">
                    <SlCalender className="text-xs" />
                    <p className="text-gray-700 mr-3">{course.Date}</p>
                  </div>
                  <LuClock9 className="text-xs" />
                  <p className="text-gray-700">Duration {course.total_hours}h</p>
                </div>

                {/* Ratings */}
                <StarRatings
                  rating={course.rating}
                  starDimension="15px"
                  starSpacing="2px"
                  starRatedColor="gold"
                  numberOfStars={5}
                  name="rating"
                />

                {/* Enrollment Date */}
                <p className="text-gray-700">{course.enrollment_date}</p>
              </div>

              {/* Button Section */}
              <div className="mt-4 px-2 mb-3">
                <Link href={`/details/${course.id}`} passHref>
                  <button className="bg-[#b3dfee] text-white py-2 px-8 rounded hover:bg-[#56d3fd] transition w-full duration-300 font-bold">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No courses found</p>
        )}
      </div>


      <Footer />
    </>
  );
}
