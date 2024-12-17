'use client'

import { useState } from 'react';
import Navbar from '../componenets/Navbar/Navbar';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Image from 'next/image';
import useCareerGuide from '@/hooks/useCareerGuide';
import Footer from '../componenets/Footer/Footer';
import Link from 'next/link';
import { PiHandsClappingFill } from "react-icons/pi";
import { BiSolidDislike } from "react-icons/bi";

export default function Page() {
    const [CareerGuide] = useCareerGuide();
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
   
 console.log(CareerGuide)

    // Filter the CareerGuide based on the search term
    const filteredCareerGuide = CareerGuide.filter((career) => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
            career.title.toLowerCase().includes(lowercasedSearchTerm) ||
            career.career_Category_name.toLowerCase().includes(lowercasedSearchTerm) ||
            career.category_name.toLowerCase().includes(lowercasedSearchTerm) ||
            career.category_text.toLowerCase().includes(lowercasedSearchTerm)
        );
    });

    return (
        <>
            <Navbar />
            <main>
                <div className='lg:mt-48 mt-20'>
                    <section className="mb-12 bg-[#F1F2F4] py-10">
                        <div className="container mx-auto text-center">
                            {/* Sticky Search Input */}
                            <div className="sticky top-0 z-10 lg:mr-36 mb-4">
                                <input
                                    type="text"
                                    className="mt-4 p-2 border border-gray-300 rounded-md w-6/12"
                                    placeholder="Search blog title, category or text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                                />
                            </div>
                            <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-5 ">
                                {/* First Section - Sticky */}
                                <div
                                    className={`bg-white p-6 rounded-lg shadow-md w-full md:w-3/12 transition-all duration-300 hidden lg:block`}
                                >
                                    <div className='bg-[#17549A] p-2'>
                                        <h3 className="text-xl font-medium text-white">Blog Category</h3>
                                        <input
                                            type="text"
                                            className="mt-4 p-2 border border-gray-300 rounded-md w-full"
                                            placeholder="Enter category name"
                                        />
                                    </div>

                                    {/* Checkboxes */}
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <div className="flex gap-3 mt-1" key={index}>
                                            <input type="checkbox" name="animation" id="" />
                                            <h3>{`Category ${index + 1}`}</h3>
                                        </div>
                                    ))}
                                </div>

                                {/* Second Section - Scrollable Middle Section */}
                                <div className="p-3 w-full md:w-10/12 h-auto overflow-y-auto max-h-screen">
                                    {/* Tablet Cards - Display filtered results */}
                                    {filteredCareerGuide?.length > 0 ? (
                                        filteredCareerGuide.map((CareerDatas) => (
                                            <Link href={`/Cereer_Guide_Details/${CareerDatas.id}`} key={CareerDatas.id} className="container mx-auto">
                                                <div className="flex flex-col sm:flex-row gap-4 p-2 mt-5 shadow-sm transition-transform duration-300 ease-in-out transform hover:translate-y-[-10px] hover:shadow-xl cursor-pointer h-auto bg-white py-5">
                                                    <Image
                                                        height={1000}
                                                        width={1000}
                                                        src={CareerDatas.image}
                                                        className="rounded-lg w-full sm:w-2/12 h-full object-cover mt-3"
                                                        alt={CareerDatas.title || 'Career Guide Image'}
                                                    />
                                                    <div className="text-left text-balance sm:w-3/4">
                                                        <h3 className='text-blue-600 font-semibold'>{CareerDatas.title}</h3>
                                                        <h4 className="text-gray-700 font-medium">{CareerDatas.category_name}</h4>
                                                        <p className="text-gray-600">{CareerDatas.category_text}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p>No results found for <span className='text-red-500'>{searchTerm}</span>.</p> // Display message when no results match
                                    )}
                                </div>

                                {/* Third Section - Sticky */}
                                <div className="bg-white rounded-lg shadow-lg w-full lg:w-4/12 h-[500px] p-6 sticky top-48">
                                    <h3 className="text-blue-600 text-center text-2xl font-bold">Recent Top Blogs</h3>

                                   

                                    {/* List Items */}
                                    {['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'].map((item, index) => (
                                        <div key={index} className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                            <div className="mr-2">
                                                <BsBoxArrowInUpRight />
                                            </div>
                                            <p className='text-xs mt-2 text-left'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            </p>
                                        </div>
                                    ))}
                                    



                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}
