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
import img1 from '../../assets/details.jpg';
import Image from 'next/image';
import Head from 'next/head';

import './Course.css'
import Chatbot from '../(with-navbar)/componenets/chatBot/Chatbot';
export default function Courses() {
  const courses = useCourses();
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [selectedTitle, setSelectedTitle] = useState(''); // State for selected title
  const [loading, setLoading] = useState(true); // Loading state
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterSuggestions(value);
  };
  const filterSuggestions = (term) => {
    if (term === '') {
      setFilteredSuggestions([]);
    } else {
      const filtered = courseTitles.filter(title =>
        title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
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

      <div className="lg:py-14    relative lg:container lg:mx-auto lg:w-8/12 left-1">
        {/* Upper gradient of Banner image applied as background */}
        <div className="flex flex-col items-center relative z-0 mt-16">
          {/* Image section (with gradient as background) */}
          <div
            className="w-full h-72 lg:h-[300px] md:h-[300px] bg-cover bg-center bg-[#77b1eb] opacity-80 relative"
            style={{ backgroundImage: `url(${img1.src})` }} // Ensure img1.src contains the image URL
          >
            {/* The gradient is applied over the image */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#2CAAE1] to-transparent opacity-45"></div> gjhk*/}
          </div>




          {/* Mobile Search Button (visible only on small screens) */}
          <div className="lg:w-5/12 w-full md:hidden lg:hidden mb-10 relative bottom-28 overflow-hidden ">

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


            {/* Dropdown for course titles */}
            <div className="w-11/12  mt-5">
              <select
                value={selectedTitle}
                onChange={handleTitleChange}
                style={{ padding: '10px 8px', borderRadius: '4px' }}
                className="bg-white cursor-pointer w-full"
              >
                <option className='font-bold' value=''>All Courses</option>
                {courseTitles.map((title, index) => (
                  <option key={index} value={title}>{title}</option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </div>


      {/* Centered Search Bar */}
      <div className="container mx-auto flex justify-center items-center  hidden md:flex">
        <div className="flex bg-[#2CAAE1] w-9/12 md:w-9/12 lg:w-9/12 shadow-lg p-5  items-center mb-10">

          {/* Dropdown for course titles */}
          <div className="w-4/12">
            <select
              value={selectedTitle}
              onChange={handleTitleChange}
              className="bg-[#17549A] text-white cursor-pointer w-full py-3 px-4 rounded-l-md"
            >
              <option className="font-bold" value="">All Courses</option>
              {courseTitles.map((title, index) => (
                <option key={index} value={title}>{title}</option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="w-8/12 flex">
            <input
              type="text"
              className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border-none rounded-r-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="ml-2 px-6 py-2 text-white bg-[#17549A] rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
            >
              Search...
            </button>
          </div>

        </div>
      </div>



      <div className="container mx-auto md:w-10/12 lg:w-7/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 custom-grid-layout  lg:mt-0 w-9/12 md:mt-10">
        {loading ? (
          // Show loader in the center of the page
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : filteredCourses?.length > 0 ? (
          filteredCourses?.map(course => (
            <div key={course.id} className="relative cursor-pointer shadow-lg mb-3 overflow-hidden rounded-xl border group hover:border-[#56D3FD] border-[#DDDD] transition-all duration-300 group bg-[#edf5f8]">
              {/* Image Section */}
              <div className="relative">
                {/* <Image
                  style={{ height: '160px' }}
                  height={1000}
                  width={1000}
                  src={course.image}
                  alt="Banner Image"
                  className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
                  onDragStart={(e) => e.preventDefault()}
                /> */}

                <Image
                  src={course.image}
                  alt="Card Image"
                  className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
                  onDragStart={(e) => e.preventDefault()}
                  layout="intrinsic" // or "responsive" depending on how you want the image's sizing to behave
                  width={500}
                  height={300} // Adjust this to match the aspect ratio you want
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
      <Chatbot />
    </>
  );
}
