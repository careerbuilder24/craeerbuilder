"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { RiHeart3Fill } from 'react-icons/ri';
import { SlCalender } from "react-icons/sl";
import { LuClock9 } from "react-icons/lu";
import StarRatings from 'react-star-ratings';

import Link from 'next/link';

export default function FirstSection() {
    const [course, setCourse] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/Data.json');
            const data = await res.json();
            setCourse(data);
        };
        fetchData();
    }, []);

    return (
        <>
         <Head>
            <link rel='preload' href={course.image} as='image'></link>
        </Head>
            <div className='container mx-auto w-10/12 lg:w-ful grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:mt-10'>
                {
                    course?.map(courses => (
                        <div style={{borderRadius: '5px' }} key={courses.id} className="relative cursor-pointer bg-gray-200  mb-3 overflow-hidden group">
                            <div className="relative">
                                <img
                                style={{ height: '250px' }}
                                
                                    src={courses.image}
                                    alt='Banner Image'
                                    className={`rounded-2xl mb-4  object-cover w-full transition-transform duration-300 group-hover:scale-110`}
                                    onDragStart={(e) => e.preventDefault()}
                                />
                                {/* <div className="absolute top-0 left-0 right-0 h-full bg-[#7db2ee] opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div> */}
                                {/* <div className="absolute top-0 left-0 right-0 h-1/2 bg-transparent shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)' }}></div> */}

                                <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <RiHeart3Fill size={24} className='text-red-500' />
                                </div>
                            </div>
                            <div className='text-center'>
                                <h2 className="text-lg font-bold">{courses.course_name}</h2>
                                <p className="text-black">{courses.title}</p>
                            </div>
                            <p className="text-gray-700 mt-4">Price: ${courses.price}</p>
                            <div className='gap-2 flex items-center '>
                                <SlCalender className='text-xs ' />
                                <p className="text-gray-700">{courses.Date}</p>
                            </div>
                            <div className='gap-2 flex items-center '>
                                <LuClock9 className='text-xs' />
                                <p className="text-gray-700">Total Hours: {courses.total_hours}</p>
                            </div>
                            <StarRatings
                                rating={courses.rating}
                                starDimension="20px"
                                starSpacing="2px"
                                starRatedColor="gold"
                                numberOfStars={5}
                                name='rating'
                            />
                            <p className="text-gray-700">Enrollment Date: {courses.enrollment_date}</p>

                            <div className="flex justify-between mt-4 my-5 ">
                                <Link  href={`/details/${courses.id}`} passHref>
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

        </>
    );
}
