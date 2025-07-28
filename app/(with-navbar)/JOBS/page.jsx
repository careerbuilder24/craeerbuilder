'use client';
import React, { useState } from 'react';
import Navbar from '../componenets/Navbar/Navbar';
import Link from 'next/link';

export default function Page() {
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Dhaka, Bangladesh' },
        { id: 2, title: 'Backend Developer', company: 'InnoTech', location: 'Chittagong, Bangladesh' },
        { id: 3, title: 'Full Stack Engineer', company: 'DevWorks', location: 'Remote' },
        { id: 4, title: 'Frontend Developer', company: 'TechCorp', location: 'Dhaka, Bangladesh' },
        { id: 5, title: 'Backend Developer', company: 'InnoTech', location: 'Chittagong, Bangladesh' },
        { id: 6, title: 'Full Stack Engineer', company: 'DevWorks', location: 'Remote' },
        { id: 7, title: 'Frontend Developer', company: 'TechCorp', location: 'Dhaka, Bangladesh' },
        { id: 8, title: 'Backend Developer', company: 'InnoTech', location: 'Chittagong, Bangladesh' },
        { id: 9, title: 'Full Stack Engineer', company: 'DevWorks', location: 'Remote' },
        { id: 10, title: 'Frontend Developer', company: 'TechCorp', location: 'Dhaka, Bangladesh' },
        { id: 11, title: 'Backend Developer', company: 'InnoTech', location: 'Chittagong, Bangladesh' },
        { id: 12, title: 'Full Stack Engineer', company: 'DevWorks', location: 'Remote' },
    ]);

    const categories = [
        'IT & Software', 'Marketing', 'Design', 'Finance', 'Engineering',
        'IT & Software', 'Engineering', 'Engineering', 'IT & Software',
        'Engineering', 'Engineering', 'IT & Software', 'IT & Software', 'Engineering'
    ];

    return (
        <>
            <Navbar />
            <div className="p-4 bg-gray-100 min-h-screen mt-28">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">

                    {/* Left - Category Section */}
                    <aside className="md:col-span-1 order-2 md:order-1 bg-white p-4 rounded shadow h-fit md:sticky md:top-28 md:max-h-[calc(100vh-7rem)] overflow-auto">
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
                        <ul className="space-y-2">
                            {categories.map((cat, idx) => (
                                <li key={idx} className="text-blue-600 hover:underline cursor-pointer">
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Center - Job Listings */}
                    <main className="md:col-span-2 order-1 md:order-2">
                        <h1 className="text-2xl font-bold mb-6 text-center">Job Listings</h1>
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="border bg-white p-4 rounded hover:shadow transition flex flex-col md:flex-row justify-between items-start md:items-center"
                                >
                                    <div>
                                        <h2 className="text-lg font-semibold">{job.title}</h2>
                                        <p className="text-gray-600">{job.company}</p>
                                        <p className="text-sm text-gray-500">{job.location}</p>
                                    </div>
                                    <button className="mt-4 md:mt-0 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm self-end md:self-auto">
                                        Apply Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </main>

                  
                    {/* Right - Advertisement Section */}
                    <aside className="md:col-span-1 order-3 bg-white p-4 rounded shadow text-center h-fit md:sticky md:top-28 md:max-h-[calc(100vh-7rem)] overflow-auto space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Sponsored</h2>

                        {/* Advertisement  Badge */}
                        <div className="flex justify-center mb-2">
                            <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                100% fREE
                            </span>
                        </div>

                        <div className="bg-gray-200 rounded p-4 shadow flex flex-col items-center">
                            <img
                                src="https://i.postimg.cc/T1YHBvM9/sfgoj.png"
                                alt="Demo Advertisement"
                                className="mb-3 rounded w-full object-cover"
                            />
                            <p className="text-gray-700 mb-2">
                                Boost your career with <strong>SkillUp Academy</strong>! Join our coding Boot camp today.
                            </p>
                            <Link
                                href="https://coursya.com/product/coursera/launch-your-online-business/?utm_source=LinkedIn%20&utm_campaign=pm"
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                                Learn More
                            </Link>
                        </div>
                    </aside>

                </div>
            </div>
        </>
    );
}
