'use client'
import { useState } from 'react';
import Navbar from '../componenets/Navbar/Navbar';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Image from 'next/image';
import useCareerGuide from '@/hooks/useCareerGuide';

export default function Page() {
    // State to control the visibility of the additional checkboxes
    const [showMore, setShowMore] = useState(false);
    const [CareerGuide] = useCareerGuide();
    console.log(CareerGuide);

    // Toggle visibility when "See More" is clicked
    const [visibleCount, setVisibleCount] = useState(10); // Start by showing 10 checkboxes
    const totalCheckboxes = 30; // Total number of checkboxes to potentially show

    // Handle "See More" button click
    const handleSeeMoreClick = () => {
        setVisibleCount(prev => Math.min(prev + 10, totalCheckboxes)); // Increase by 10 or show all checkboxes
        setShowMore(true);
    };

    return (
        <>
            <Navbar />
            <main>
                <div className='lg:mt-48 mt-20'>
                    <section className="mb-12 bg-[#F1F2F4] py-10">
                        <div className="container mx-auto text-center">
                            <div className="flex flex-col md:flex-row justify-around ">
                                {/* First Section */}
                                <div
                                    className={`bg-white p-6 rounded-lg hidden md:block shadow-md w-full md:w-3/12 transition-all duration-300 ${showMore ? 'h-auto' : 'h-[700px]'}`}
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
                                    {Array.from({ length: visibleCount }).map((_, index) => (
                                        <div className="flex gap-3 mt-1" key={index}>
                                            <input type="checkbox" name="animation" id="" />
                                            <h3>{`Category ${index + 1}`}</h3>
                                        </div>
                                    ))}
                                    {visibleCount < totalCheckboxes && (
                                        <button
                                            onClick={handleSeeMoreClick}
                                            className="mt-4 hover:underline bg-white"
                                        >
                                            See More
                                        </button>
                                    )}
                                </div>

                                {/* Second Section */}
                                <div className="p-3  w-full md:w-10/12 h-auto">

                                    <input
                                        type="text"
                                        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
                                        placeholder="Type blog name"
                                    />

                                    {/* Tablet Cards */}
                                    {CareerGuide?.map((CareerDatas) => (
                                        <div key={CareerDatas.id} className="container mx-auto">
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
                                        </div>
                                    ))}
                                </div>

                                
                                {/* Third Section */}
                                <div className="bg-white rounded-lg shadow-lg w-full sm:w-4/12 h-[500px] p-6">
                                    <h3 className=" font-medium text-blue-600 text-center text-2xl">Feature 1</h3>

                                    {/* First Item */}
                                    <div className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                        <div className="mr-2">
                                            <BsBoxArrowInUpRight />
                                        </div>
                                        <p className='text-xs mt-2 text-left'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>

                                    {/* Second Item */}
                                    <div className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                        <div className="mr-2">
                                            <BsBoxArrowInUpRight />
                                        </div>
                                        <p className='text-xs mt-2 text-left'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>

                                    {/* Third Item */}
                                    <div className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                        <div className="mr-2">
                                            <BsBoxArrowInUpRight />
                                        </div>
                                        <p className='text-xs mt-2 text-left'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                    {/* fourth Item */}
                                    <div className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                        <div className="mr-2">
                                            <BsBoxArrowInUpRight />
                                        </div>
                                        <p className='text-xs mt-2 text-left'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                    {/* fifth Item */}
                                    <div className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                        <div className="mr-2">
                                            <BsBoxArrowInUpRight />
                                        </div>
                                        <p className='text-xs mt-2 text-left'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                    {/* sisth Item */}
                                    <div className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                        <div className="mr-2">
                                            <BsBoxArrowInUpRight />
                                        </div>
                                        <p className='text-xs mt-2 text-left'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                    {/* seventh Item */}
                                    <div className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                        <div className="mr-2">
                                            <BsBoxArrowInUpRight />
                                        </div>
                                        <p className='text-xs mt-2 text-left'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                    {/* eighth Item */}
                                    <div className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                        <div className="mr-2">
                                            <BsBoxArrowInUpRight />
                                        </div>
                                        <p className='text-xs mt-2 text-left'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                    {/* ninth Item */}
                                    <div className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                        <div className="mr-2">
                                            <BsBoxArrowInUpRight />
                                        </div>
                                        <p className='text-xs mt-2 text-left'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                    {/* tenth Item */}
                                    <div className='flex flex-row items-center text-blue-500 hover:underline cursor-pointer duration-300 ease-in-out'>
                                        <div className="mr-2">
                                            <BsBoxArrowInUpRight />
                                        </div>
                                        <p className='text-xs mt-2 text-left'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
