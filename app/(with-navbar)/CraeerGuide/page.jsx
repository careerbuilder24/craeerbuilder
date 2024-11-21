'use client'
import { useState } from 'react';
import Navbar from '../componenets/Navbar/Navbar';

import img1 from '../../../assets/img1.jpg'
import Image from 'next/image';

export default function Page() {
    // State to control the visibility of the additional checkboxes
    const [showMore, setShowMore] = useState(false);

    // Toggle visibility when "See More" is clicked
    const handleSeeMoreClick = () => {
        setShowMore(!showMore);
    };

    return (
        <>
            <Navbar />
            <main>
                <div className='lg:mt-52 mt-52'>
                    <section className="mb-12 bg-gray-100 mt-5">
                        <div className="container mx-auto text-center">
                            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Features</h2>
                            <div className="flex justify-around gap-3">
                                {/* first section with fixed height */}
                                <div className="bg-white p-6 rounded-lg shadow-lg w-3/12 h-auto">
                                    <h3 className="text-xl font-medium text-blue-600">Blog Category</h3>
                                    {/* Input field */}
                                    <input
                                        type="text"
                                        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
                                        placeholder="Enter category name"
                                    />

                                    {/* Checkboxes */}
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Accounting</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Agriculture</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Agriculture Farm</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Animal</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Apparel</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Aquarium Fish Farm</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Arts & Handicraft</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Automotive Industry</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Automotive & Automobile</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Banks</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Basin</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Beauty Parlor & Spa</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Blogs & Magazines</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Books Stationary</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Brassware Industry</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Building Construction</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Buying House</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Catering</h3>
                                    </div>
                                    <div className='flex gap-3 mt-1 mb-1'>
                                        <input type="checkbox" name="animation" id="" />
                                        <h3>Cement Factory</h3>
                                    </div>

                                    {/* Show more checkboxes */}
                                    {Array(8).fill().map((_, index) => (
                                        showMore && (
                                            <div className='flex gap-3 bg-white mb-1   ' key={index}>
                                                <input type="checkbox" name="animation" id="" />
                                                <h3>Animation {index + 1}</h3>
                                            </div>
                                        )
                                    ))}

                                    {/* See More button */}
                                    <button
                                        onClick={handleSeeMoreClick}
                                        className={`mt-4  hover:underline  ${showMore ? 'bg-gray-100' : 'bg-white'}`}
                                    >
                                        {showMore ? 'See Less' : 'See More'}
                                    </button>
                                </div>

                                {/* second section */}
                                <div className="bg-white p-6 rounded-lg shadow-lg w-10/12 h-[500px] ">
                                    {/* tablet card */}
                                    <div className='container mx-auto flex flex-row gap-4 bg-red-600 rounded-xl p-2'>
                                      
                                            <Image
                                                height={500}
                                                width={500}
                                                src={img1}
                                                className='rounded-lg w-2/12 h-full object-cover' // ensure image doesn't shrink
                                            />
                                        
                                        <div className='text-left text-balance'>
                                            <h3>Lorem ipsum dolor bfuopherguoheouhnuoi, sit amet consectetur Lorem ipsum dolor bfuopherguoheouhnuoi, sit amet consectetur .</h3>
                                            <h3>Lorem ipsum dolor, </h3>
                                        </div>
                                    </div>
                                </div>


                                {/* Third section */}
                                <div className="bg-white p-6 rounded-lg shadow-lg w-4/12 h-[500px]">
                                    <h3 className="text-xl font-medium text-blue-600">Feature 1</h3>
                                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
