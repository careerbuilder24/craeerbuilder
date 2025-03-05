"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { RiHeart3Fill } from 'react-icons/ri';
import { SlCalender } from "react-icons/sl";
import { LuClock9 } from "react-icons/lu";
import StarRatings from 'react-star-ratings';
import { MdPeopleAlt } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import Link from 'next/link';
import Image from 'next/image';
import './FirstSection.css'

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
            <div className='container mx-auto w-10/12 md:w-10/12 lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:mt-10 custom-grid-layout'>
                {
                    course?.map(courses => (
                        <div key={courses.id} className="relative cursor-pointer shadow-lg mb-3 overflow-hidden rounded-xl border  border-[#DDDD] group hover:border-[#56D3FD] transition-all duration-300 group">

                            {/* Image Section */}
                            <div className="relative">
                                <Image
                                    src={courses.image}
                                    alt="Card Image"
                                    className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
                                    onDragStart={(e) => e.preventDefault()}
                                    layout="intrinsic" // or "responsive" depending on how you want the image's sizing to behave
                                    width={500}
                                    height={300} // Adjust this to match the aspect ratio you want
                                />


                                {/* Heart Icon */}
                                <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <RiHeart3Fill size={24} className='text-red-500' />
                                </div>

                                {/* Info Section (Batch, Seats, Time Left) */}
                                <div className="flex flex-row gap-1 justify-center items-center text-xs">
                                    <div className="w-16 h-5 bg-gray-300 rounded-md flex justify-center items-center">
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

                            {/* Course Info Section */}
                            <div className='ml-3 mt-2 text-sm'>
                                <h2 className="text-base font-bold">{courses.course_name}</h2>
                                {/* <p className="text-sm text-black">{courses.title}</p> */}

                                <div className='gap-1 flex items-center my-1'>
                                    <div className='flex flex-row items-center gap-1'>
                                        <SlCalender className='text-xs' />
                                        <p className="text-gray-700 mr-3">{courses.Date}</p>
                                    </div>
                                    <LuClock9 className='text-xs' />
                                    <p className="text-gray-700">Duration {courses.total_hours}h</p>
                                </div>

                                {/* Ratings */}
                                <StarRatings
                                    rating={courses.rating}
                                    starDimension="15px"
                                    starSpacing="2px"
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name='rating'
                                />

                                {/* Enrollment Date */}
                                <p className="text-gray-700">{courses.enrollment_date}</p>
                            </div>

                            {/* Button Section */}
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

        </>
    );
}
