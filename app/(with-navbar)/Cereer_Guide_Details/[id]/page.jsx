'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Image from 'next/image';

import Link from 'next/link';
import Navbar from '../../componenets/Navbar/Navbar';
import Footer from '../../componenets/Footer/Footer';
import useCareerGuide from '@/hooks/useCareerGuide';

export default function Page() {
    // Get the `id` from the URL using useRouter
    const { id } = useParams();

    // Fetch career guide data
    const CareerGuide = useCareerGuide();

    // Find the specific career guide item based on `id`
  


    const careerItem = CareerGuide?.find(BlogDetails => BlogDetails?.id === Number(id));
    // console.log(graphic)
    console.log(careerItem)
    // Check if careerItem is loaded
    if (!careerItem) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main>
                <div className='lg:mt-48 mt-20'>
                    <section className="mb-12 bg-[#F1F2F4] py-10">
                        <div className="container mx-auto text-center">
                            <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-5">
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
                                    {CareerGuide.map((_, index) => (
                                        <div className="flex gap-3 mt-1" key={index}>
                                            <input type="checkbox" name="animation" id="" />
                                            <h3>{`Category ${index + 1}`}</h3>
                                        </div>
                                    ))}
                                </div>

                                {/* Second Section - Scrollable Middle Section */}
                                <div className="p-3 w-full md:w-10/12 h-auto overflow-y-auto max-h-screen">
                                    {/* Career Guide Details */}
                                    <div className="flex flex-col sm:flex-row gap-4 p-2 mt-5 shadow-sm transition-transform duration-300 ease-in-out transform hover:translate-y-[-10px] hover:shadow-xl cursor-pointer h-auto bg-white py-5">
                                        <Image
                                            height={1000}
                                            width={1000}
                                            src={careerItem.image}
                                            className="rounded-lg w-full sm:w-2/12 h-full object-cover mt-3"
                                            alt={careerItem.title || 'Career Guide Image'}
                                        />
                                        <div className="text-left text-balance sm:w-3/4">
                                            <h3 className='text-blue-600 font-semibold'>{careerItem.title}</h3>
                                            <h4 className="text-gray-700 font-medium">{careerItem.category_name}</h4>
                                            <p className="text-gray-600">{careerItem.category_text}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Third Section - Sticky */}
                                <div className="bg-white rounded-lg shadow-lg w-full  lg:w-4/12 h-[500px] p-6 sticky top-0">
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
