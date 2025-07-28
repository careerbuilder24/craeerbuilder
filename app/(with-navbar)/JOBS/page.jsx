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

    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const openModal = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedJob(null);
    };

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
                                    <button
                                        onClick={() => openModal(job)}
                                        className="mt-4 md:mt-0 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm self-end md:self-auto"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </main>

                    {/* Right - Advertisement Section */}
                    <aside className="md:col-span-1 order-3 bg-white p-4 rounded shadow text-center h-fit md:sticky md:top-28 md:max-h-[calc(100vh-7rem)] overflow-auto space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Sponsored</h2>

                        {/* Ad 1 */}
                        <div className="flex justify-center mb-2">
                            <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                100% FREE
                            </span>
                        </div>
                        <Link
                            href="https://coursya.com/product/coursera/launch-your-online-business/?utm_source=LinkedIn%20&utm_campaign=pm"
                            className="group bg-gray-200 rounded p-4 shadow flex flex-col items-center hover:bg-gray-400 cursor-pointer ease-in-out duration-300"
                        >
                            <img
                                src="https://i.postimg.cc/T1YHBvM9/sfgoj.png"
                                alt="Ad 1"
                                className="mb-3 rounded w-full object-cover"
                            />
                            <p className="text-gray-700 mb-2 group-hover:text-white ease-in-out duration-300">
                                Boost your career with <strong className="group-hover:text-white">SkillUp Academy</strong>! Join our coding Boot camp today.
                            </p>
                            <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                                Learn More
                            </div>
                        </Link>


                        {/* Ad 2 */}
                        <Link href="https://www.datacamp.com/" className="group bg-gray-200 rounded p-4 shadow flex flex-col items-center hover:bg-gray-400 cursor-pointer ease-in-out duration-300">
                            <img
                                src="https://i.postimg.cc/pr5McPh7/ewrj.png"
                                alt="Ad 2"
                                className="mb-3 rounded w-full object-cover"
                            />
                            <p className="text-gray-700 mb-2 group-hover:text-white">
                                Join <strong>DataCamp</strong> and become a data science pro in 3 months.
                            </p>
                            <div
                                
                                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                            >
                                Try Free
                            </div>
                        </Link>

                        {/* Ad 3 */}
                        <Link  href="https://www.fiverr.com/" className="group bg-gray-200 rounded p-4 shadow flex flex-col items-center hover:bg-gray-400 cursor-pointer ease-in-out duration-300">
                            <img
                                src="https://i.postimg.cc/kGGgJrVF/sergoj.png"
                                alt="Ad 3"
                                className="mb-3 rounded w-full object-cover"
                            />
                            <p className="text-gray-700 mb-2 group-hover:text-white">
                                Kickstart your freelancing career with <strong>Fiverr Pro</strong>.
                            </p>
                            <div
                               
                                className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
                            >
                                Get Started
                            </div>
                        </Link>
                    </aside>
                </div>
            </div>

            {/* Modal for Job Application */}
            {showModal && selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                            onClick={closeModal}
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-bold mb-4">
                            Apply for {selectedJob.title}
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Upload CV/Resume
                                </label>
                                <input
                                    type="file"
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cover Letter
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full border px-3 py-2 rounded"
                                    placeholder="Write your cover letter..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Academic Institution
                                </label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded"
                                    placeholder="e.g., Institution Name "
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    CGPA
                                </label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded"
                                    placeholder="e.g., CGPA "
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Experience
                                </label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded"
                                    placeholder="e.g.,  years of Experience"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
