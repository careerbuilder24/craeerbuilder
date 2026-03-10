// "use client";

// import React, { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { RiHeart3Fill } from 'react-icons/ri';
// import { SlCalender } from "react-icons/sl";
// import { LuClock9 } from "react-icons/lu";
// import StarRatings from 'react-star-ratings';
// import { MdPeopleAlt, MdAccessTime } from "react-icons/md";
// import Link from 'next/link';
// import Image from 'next/image';
// import './FirstSection.css';

// export default function FirstSection() {
//     const [course, setCourse] = useState([]);
//     const [showAll, setShowAll] = useState(false); // Show/hide toggle

//     useEffect(() => {
//         const fetchData = async () => {
//             const res = await fetch('/Data.json');
//             const data = await res.json();
//             setCourse(data);
//         };
//         fetchData();
//     }, []);

//     // Show only 6 items initially (2 rows if 3 per row)
//     const visibleCourses = showAll ? course : course.slice(0, 6);

//     return (
//         <>
//             <Head>
//                 <link rel='preload' href={course.image} as='image'></link>
//             </Head>
//             <div className='container mx-auto w-10/12 md:w-10/12 lg:w-7/12'>
//                 <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:mt-10 custom-grid-layout'>


//                     {
//                         visibleCourses?.map(courses => (
//                             <div key={courses.id} className="relative cursor-pointer shadow-lg mb-3 overflow-hidden rounded-xl border border-[#DDDD] group hover:border-[#56D3FD] transition-all duration-300 group">
//                                 <div className="relative">
//                                     <Image
//                                         src={courses.image.trimStart()}
//                                         alt="Card Image"
//                                         className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
//                                         onDragStart={(e) => e.preventDefault()}
//                                         layout="intrinsic"
//                                         width={500}
//                                         height={300}
//                                     />
//                                     <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                         <RiHeart3Fill size={24} className='text-red-500' />
//                                     </div>
//                                     <div className="flex flex-row gap-1 justify-center items-center text-xs">
//                                         <div className="w-16 h-5 bg-gray-300 rounded-md flex justify-center items-center gap-1 px-1">
//                                             <p>Batch</p>
//                                             <p>5th</p>
//                                         </div>
//                                         <div className="flex flex-row justify-center items-center w-28 h-5 bg-gray-300 rounded-md gap-1 px-1">
//                                             <MdPeopleAlt />
//                                             <p>Seat Left 140</p>
//                                         </div>
//                                         <div className="flex flex-row items-center w-24 h-5 bg-gray-300 rounded-md gap-1 px-1">
//                                             <MdAccessTime />
//                                             <p>Time left 16</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className='ml-3 mt-2 text-sm'>
//                                     <h2 className="text-base font-bold">{courses.course_name}</h2>
//                                     <div className='gap-1 flex items-center my-1'>
//                                         <div className='flex flex-row items-center gap-1'>
//                                             <SlCalender className='text-xs' />
//                                             <p className="text-gray-700 mr-3">{courses.Date}</p>
//                                         </div>
//                                         <LuClock9 className='text-xs' />
//                                         <p className="text-gray-700">Duration {courses.total_hours}h</p>
//                                     </div>
//                                     <StarRatings
//                                         rating={courses.rating}
//                                         starDimension="15px"
//                                         starSpacing="2px"
//                                         starRatedColor="gold"
//                                         numberOfStars={5}
//                                         name='rating'
//                                     />
//                                     <p className="text-gray-700">{courses.enrollment_date}</p>
//                                 </div>
//                                 <div className="mt-4 px-2 mb-3">
//                                     <Link href={`/details/${courses.id}`} passHref>
//                                         <button className="bg-[#b3dfee] text-white py-2 px-8 rounded hover:bg-[#56d3fd] transition w-full duration-300 font-bold">
//                                             View Details
//                                         </button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>

//                 {/* View More Button */}
//                 {!showAll && course.length > 6 && (
//                     <div className="flex justify-center mt-2">
//                         <button
//                             className="bg-[#56d3fd] my-10 hover:bg-[#32c4f0] text-white font-bold py-2 px-6 rounded transition duration-300"
//                             onClick={() => setShowAll(true)}
//                         >
//                             View More
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }
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
import useDetailsCourses from '@/hooks/useDetailsCourses'; // Import the hook
import './FirstSection.css';

// ✅ Helper to create slug from course title (copied from the reference code)
const createSlug = (title) => {
    return title
        ?.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special characters
        .trim()
        .replace(/\s+/g, '-') // replace spaces with dashes
        .replace(/-+/g, '-'); // collapse multiple dashes
};

export default function FirstSection() {
    // 💡 Use the custom hook to fetch dynamic details data
    const { DetailsCourses, loading } = useDetailsCourses(); 
    const [showAll, setShowAll] = useState(false); // Show/hide toggle

    // 💡 The data is now available in DetailsCourses, no need for the useEffect block to fetch from Data.json
    
    // Show only 6 items initially
    const visibleCourses = showAll 
        ? DetailsCourses 
        : DetailsCourses?.slice(0, 6) || []; // Use DetailsCourses, default to empty array

    return (
        <>
            <Head>
                {/* ⚠️ Note: course is now a list, not a single object. 
                    This preload might not be optimal here. */}
                {/* <link rel='preload' href={course.image} as='image'></link> */}
            </Head>
            <div className='container mx-auto w-10/12 md:w-10/12 lg:w-7/12'>
                
                {loading && (
                     <div className="flex justify-center items-center h-40">
                         <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                     </div>
                )}

                {!loading && visibleCourses.length === 0 && (
                    <p className="text-center text-lg mt-10">No courses available.</p>
                )}

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:mt-10 custom-grid-layout'>

                    {
                        visibleCourses?.map(course => ( // Renamed from 'courses' to 'course' for clarity
                            <div key={course.id} className="relative cursor-pointer shadow-lg mb-3 overflow-hidden rounded-xl border border-[#DDDD] group hover:border-[#56D3FD] transition-all duration-300">
                                <div className="relative">
                                    <Image
                                        // 💡 Use course.banner_image from DetailsCourses
                                        src={course.banner_image?.trimStart() || '/default-course-image.jpg'}
                                        alt={course.course_title || "Course Image"} // 💡 Use course_title
                                        className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
                                        onDragStart={(e) => e.preventDefault()}
                                        layout="intrinsic"
                                        width={500}
                                        height={300}
                                    />
                                    <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <RiHeart3Fill size={24} className='text-red-500' />
                                    </div>

                                    {/* 💡 Info Bar - Using properties from DetailsCourses */}
                                    <div className="flex flex-row gap-1 justify-center items-center text-xs">
                                        <div className="w-16 h-5 bg-gray-300 rounded-md flex justify-center items-center px-1">
                                            <p>Batch {course.batch_number || '-'}</p>
                                        </div>
                                        <div className="flex flex-row justify-center items-center w-24 lg:w-28 h-5 bg-gray-300 rounded-md px-1">
                                            <MdPeopleAlt className="mr-1" />
                                            <p>Seat {course.seats_left || '-'}</p>
                                        </div>
                                        <div className="flex flex-row items-center w-20 h-5 bg-gray-300 rounded-md px-1">
                                            <MdAccessTime className="mr-1" />
                                            {/* Assuming time_left is a string like "2024-01-01T16:00:00.000Z" and we want the time part */}
                                            <p>{course.time_left ? course.time_left.slice(11, 16) : 'N/A'}</p> 
                                        </div>
                                    </div>
                                </div>
                                <div className='ml-3 mt-2 text-sm'>
                                    {/* 💡 Use course.course_title */}
                                    <h2 className="text-base font-bold">{course.course_title}</h2> 
                                    <div className='gap-1 flex items-center my-1'>
                                        <div className='flex flex-row items-center gap-1'>
                                            <SlCalender className='text-xs' />
                                            {/* 💡 Format the date from course.startDate */}
                                            <p className="text-gray-700 mr-3">
                                                {course.startDate
                                                ? new Date(course.startDate).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })
                                                : 'No Date'}
                                            </p>
                                        </div>
                                        <LuClock9 className='text-xs' />
                                        {/* 💡 Use course.numberOfClasses */}
                                        <p className="text-gray-700">Duration {course.numberOfClasses || 'N/A'} classes</p>
                                    </div>
                                    <StarRatings
                                        // 💡 Use course.star_rating and ensure it's a number
                                        rating={parseFloat(course.star_rating) || 0}
                                        starDimension="15px"
                                        starSpacing="2px"
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                    {/* 💡 Removed enrollment_date since it wasn't in the reference data structure */}
                                    {/* <p className="text-gray-700">{course.enrollment_date}</p> */}
                                </div>
                                <div className="mt-4 px-2 mb-3">
                                    {/* 💡 Use createSlug for dynamic link */}
                                    <Link href={`/details/${createSlug(course.course_title)}`} passHref>
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
                {!showAll && DetailsCourses?.length > 6 && ( // Check original array length
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