"use client";

// import Image from 'next/image';

import React, { useEffect, useState } from 'react';
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

    console.log(course);

    return (
        <>
            <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-10 '>

                {
                    course?.map(courses => (
                        <div key={courses.id} className="bg-gray-100 shadow-md rounded-2xl  mb-3">
                            <img
                                src={courses.image}
                                alt={courses.image}

                                className="rounded-2xl mb-4 object-cover w-full "
                                onDragStart={(e) => e.preventDefault()}
                            />
                            <div className='text-center'>
                                <h2 className="text-lg font-bold">{courses.course_name}</h2>

                                <p className=" text-gray-400">{courses.title}</p>
                            </div>
                            <p className="text-gray-700">Price: ${courses.price}</p>
                            <p className="text-gray-700">Date: {courses.Date}</p>
                            <p className="text-gray-700">Rating: {courses.rating}</p>
                            <p className="text-gray-700">Enrollment Date: {courses.enrollment_date}</p>
                            <p className="text-gray-700">Total Hours: {courses.total_hours}</p>
                            {/* Navigation Button */}
                            <Link href={`/Course`} passHref>
                                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
