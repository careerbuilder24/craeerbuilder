"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { RiHeart3Fill } from 'react-icons/ri';
import { SlCalender } from "react-icons/sl";
import { LuClock9 } from "react-icons/lu";
import StarRatings from 'react-star-ratings';
import { MdPeopleAlt, MdAccessTime } from "react-icons/md";
import Link from 'next/link';
import Image from 'next/image';
import './FirstSection.css';

export default function FirstSection() {
    const [course, setCourse] = useState([]);
    const [showAll, setShowAll] = useState(false); // Show/hide toggle

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/Data.json');
            const data = await res.json();
            setCourse(data);
        };
        fetchData();
    }, []);

    // Show only 6 items initially (2 rows if 3 per row)
    const visibleCourses = showAll ? course : course.slice(0, 6);

    return (
        <>
            <Head>
                <link rel='preload' href={course.image} as='image'></link>
            </Head>
            <div className='container mx-auto w-10/12 md:w-10/12 lg:w-7/12'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:mt-10 custom-grid-layout'>
                    {
                        visibleCourses?.map(courses => (
                            <div key={courses.id} className="relative cursor-pointer shadow-lg mb-3 overflow-hidden rounded-xl border border-[#DDDD] group hover:border-[#56D3FD] transition-all duration-300 group">
                                <div className="relative">
                                    <Image
                                        src={courses.image.trimStart()}
                                        alt="Card Image"
                                        className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
                                        onDragStart={(e) => e.preventDefault()}
                                        layout="intrinsic"
                                        width={500}
                                        height={300}
                                    />
                                    <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <RiHeart3Fill size={24} className='text-red-500' />
                                    </div>
                                    <div className="flex flex-row gap-1 justify-center items-center text-xs">
                                        <div className="w-16 h-5 bg-gray-300 rounded-md flex justify-center items-center gap-1 px-1">
                                            <p>Batch</p>
                                            <p>5th</p>
                                        </div>
                                        <div className="flex flex-row justify-center items-center w-28 h-5 bg-gray-300 rounded-md gap-1 px-1">
                                            <MdPeopleAlt />
                                            <p>Seat Left 140</p>
                                        </div>
                                        <div className="flex flex-row items-center w-24 h-5 bg-gray-300 rounded-md gap-1 px-1">
                                            <MdAccessTime />
                                            <p>Time left 16</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='ml-3 mt-2 text-sm'>
                                    <h2 className="text-base font-bold">{courses.course_name}</h2>
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
                                <div className="mt-4 px-2 mb-3">
                                    <Link href={`/details/${courses.id}`} passHref>
                                        <button className="bg-[#b3dfee] text-white py-2 px-8 rounded hover:bg-[#56d3fd] transition w-full duration-300 font-bold">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* View More Button */}
                {!showAll && course.length > 6 && (
                    <div className="flex justify-center mt-2">
                        <button
                            className="bg-[#56d3fd] my-10 hover:bg-[#32c4f0] text-white font-bold py-2 px-6 rounded transition duration-300"
                            onClick={() => setShowAll(true)}
                        >
                            View More
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
