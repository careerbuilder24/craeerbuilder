"use client";
import useCourses from '@/hooks/useCourse';
import { useParams } from 'next/navigation';
import { SlCalender } from "react-icons/sl";
import { LuClock9 } from "react-icons/lu";
import { HiBars4 } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import Image from 'next/image';
import React, { useState } from 'react';
import img1 from '../../../../assets/kmn.jpg';
import logo from '../../../../assets/logo.jpg';
import gif1 from '../../../../assets/webgify.gif';
import instrastor from '../../../../assets/inst.jpg';
import Navbar from '../../componenets/Navbar/Navbar';
import Footer from '../../componenets/Footer/Footer';
import StarRatings from 'react-star-ratings';
import useDigital from '@/hooks/useDetailsDs';
import ToggleBar from '@/app/ToggleBar/ToggleBar';
import Video from 'next-video';
import { TiArrowRight } from "react-icons/ti";
import img2 from '../../../../assets/image-logo.PNG';
// import myVideo from '../../../..';

// import madia from '../../../../assets/madlia.mp4'
import './Details.css'
import WhatsAppButton from '@/app/(with-navbar)/componenets/WhatsAppButton/WhatsAppButton';


export default function Page() {
    const [isHovered, setIsHovered] = useState(false);
    const [visibleDropdown, setvisibleDropdown] = useState(null);
    const { id } = useParams();
    const courses = useCourses();

    const ditails = useDigital();

    console.log(ditails)



    const toggleDropdown = (id) => {
        setvisibleDropdown(visibleDropdown === id ? null : id);
    };

    // Loading state
    if (!courses) {
        return <div>Loading courses...</div>;
    }

    const cr = courses.find(course => course?.id === Number(id));

    return (
        <main>
            <Navbar />
            {/* First Section */}
            <div className='lg:mt-52 flex justify-center items-center'>
                <div className=' flex-col  bg-[#17549A] lg:w-9/12 rounded-md lg:mb-5 py-7 container'>
                    <div className='mt-36 lg:mr-80 lg:mt-0 lg:p-4 md:p-6'>
                        {cr ? (
                            <div className='flex flex-col lg:flex-row text-white lg:ml-6 '>
                                <img
                                    src={cr.image}
                                    onDragStart={(e) => e.preventDefault()}
                                    alt={cr.title}
                                    className="mt-4 shadow-md rounded w-9/12 mx-auto md:w-3/12 lg:mb-5"
                                />
                                <div className='lg:mt-4 ml-10 mt-4'>
                                    <h1 style={{ fontWeight: 300 }} className='text-4xl'>Certified Course on Master of Graphic Design</h1>
                                    <p style={{ fontWeight: 300 }} className='my-5 text-lg'>For this course any one can learn from very basic to complete graphic design...</p>
                                </div>
                            </div>
                        ) : 'Loading......'}
                    </div>

                    <div className='text-white lg:mt-0 lg:p-4 md:p-6 '>
                        {cr ? (
                            <div className='flex flex-col justify-between  lg:flex-row text-[#17549A] mt-5  bg-white    rounded-md ml-8 mr-8  lg:w-12/12  py-5'>
                                <div className='ml-5'>
                                    <h1 className='text-3xl my-3'>Course at a Glance</h1>
                                    <div className='gap-3 flex flex-col lg:flex-col items-start'>
                                        <div className='flex flex-col lg:flex-row  gap-2'>
                                            <div className='flex items-center'>
                                                <SlCalender className='text-xs' />
                                                <p>{cr.Date}</p>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <HiBars4 className='text-sm' />
                                                <h1>No. of Classes/Session: 85</h1>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-2 '>
                                            <LuClock9 className='text-xs' />
                                            <h1>Class Schedule:</h1>
                                            <div className='flex items-center'>
                                                <SlCalender className='text-xs' />
                                                <p>{cr.Date}</p>
                                            </div>

                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <h1>Sunday - 5:30 PM - 8:30 PM</h1>
                                            <h1>Tuesday - 5:30 PM - 8:30 PM</h1>
                                        </div>

                                        <div className='flex items-center'>
                                            <IoLocationOutline className='lg:mt-1' />
                                            <p className='lg:ml-1'>Venue: BASIS Institute of Technology...</p>
                                        </div>

                                        <div className='flex items-center '>
                                            <p className='ml-4'>Number: 01810187044.</p>
                                            <FaArrowUpRightFromSquare className='ml-2 cursor-pointer text-blue-500' />
                                        </div>
                                    </div>
                                </div>

                                <div className='lg:mt-4 lg:mr-20 mt-4 ml-5'>
                                    <h2 className="text-2xl font-bold md:text-3xl">Price: TK. 85,000</h2>
                                    <p className="text-lg md:text-xl">Price: TK. 85,000 (including VAT & TAX)</p>
                                    <p className="text-lg md:text-xl ">One time full payment: BDT 21,000.</p>


                                    <div className='flex flex-col justify-center items-center gap-5 mt-10'>



                                        <div className='w-36 h-10 bg-[#0054a6] text-white text-center relative overflow-hidden group cursor-pointer '>
                                            <h1 className='mt-2 font-bold '>Enroll Now</h1>
                                            <div className='bg-[#199ebf] opacity-70 w-11/12 h-8 transition-transform duration-300 
                    group-hover:translate-x-16 group-hover:scale-y-150 group-hover:rounded-full 
                    absolute bottom-1 left-1/2 transform -translate-x-1/2'>
                                            </div>
                                        </div>

                                        <div className='w-36 h-10 bg-[#0054a6] text-white text-center relative overflow-hidden group cursor-pointer'>
                                            <h1 className='mt-2 font-bold '>Add to wishlist</h1>
                                            <div className='bg-[#199ebf] opacity-70 w-11/12 h-8 transition-transform duration-300 
                    group-hover:translate-x-16 group-hover:scale-y-150 group-hover:rounded-full 
                    absolute bottom-1 left-1/2 transform -translate-x-1/2'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                </div>
            </div>

            {/* Second part */}
            <div className='container mx-auto my-9 lg:w-9/12 w-10/12'>
                <div className="flex flex-col  gap-4 lg:flex-row items-center justify-center h-auto">
                    <div className="w-full lg:w-4/5 h-auto lg:h-[2000px]   mb-4 lg:mb-0 shadow-lg p-4 rounded">





                        <div className="my-10 flex flex-col lg:flex-row  py-10">
                            <div className='lg:w-3/5'>
                                <h2 className='text-center text-[#0054a5] font-semibold text-4xl mb-10'>COURSE OUTLEN</h2>
                                {ditails?.map(({ id, description, subject }) => (
                                    <ToggleBar
                                        key={id}
                                        id={id}
                                        subject={subject}
                                        description={description}
                                        visibleDropdown={visibleDropdown}
                                        toggleDropdown={toggleDropdown}
                                    />
                                ))}
                            </div>
                            <div className='lg:w-2/5'>

                                <div className='   lg:mr-4 px-4'>

                                    <h3 className='text-[#0054a5] font-semibold text-2xl'>Course Overview</h3>

                                    <hr className='w-20 h-1 bg-[#0054a6] mb-10' />
                                    <Video src="/videos/madlia.mp4" controls />

                                    <h3 className='text-[#0054a5] font-semibold  mt-5 mb-2 text-2xl'>Course Benifits</h3>
                                    <hr className='w-20 h-1 bg-[#0054a6] ' />

                                    <div>
                                        <ul>

                                            <li className='flex items-center mt-2'><TiArrowRight className='text-2xl mr-2' /> Paid Internship (3 Motnhs)</li>
                                            <li className='flex items-center mt-2'><TiArrowRight className='text-2xl mr-2' />Full time job Facility (6 Months)</li>

                                        </ul>
                                    </div>


                                    <h3 className='text-[#0054a5] font-semibold  mt-5 mb-2 text-2xl'>Course Projects Include</h3>
                                    <hr className='w-20 h-1 bg-[#0054a6] ' />

                                    <div>
                                        <ul>

                                            <li className='flex items-center mt-2'><TiArrowRight className='text-2xl mr-2' />Proejct (1) Basic html Proejct by figma</li>
                                            <li className='flex items-center mt-2'><TiArrowRight className='text-2xl mr-2' />Proejct (2) Project with Boothstrap</li>
                                            <li className='flex items-center mt-2'><TiArrowRight className='text-2xl mr-2' />Proejct (3) Project with tawildind</li>
                                            <li className='flex items-center mt-2'><TiArrowRight className='text-2xl mr-2' />Proejct (5) e-commerce base</li>

                                        </ul>
                                    </div>
                                    <div className='mt-5'>
                                        <WhatsAppButton></WhatsAppButton>
                                    </div>





                                </div>
                            </div>

                        </div>



                    </div>

                    <div className="w-full  lg:w-1/5  rounded h-auto lg:h-[2000px] bg-white  ">

                        <div className=' shadow-xl rounded py-10 mt-5'>
                            <div className='lg:ml-4'>
                                <p className='text-[#0054a5] font-semibold mt-3'>MEET THE INSTRUCTOR</p>
                                <hr className='w-10 h-1 bg-[#0054a6] mb-7' />
                                <div className='w-full h-full relative overflow-hidden group cursor-pointer'>
                                    <Image
                                        src={instrastor}
                                        className='w-full h-full object-cover transition-all duration-300 group-hover:filter-none filter grayscale'
                                    />

                                    <div className='bg-green-600 opacity-80 relative bottom-7 text-white font-bold'>
                                        SUSHMITA DEBI
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='w-12/12 shadow-xl rounded p-4  mt-5'>
                            <Image
                                onDragStart={(e) => e.preventDefault()}
                                src={img2}
                                className='w-full  h-full object-cover '
                            />
                        </div>

                        <div className=' shadow-xl rounded py-10'>
                            <div className='font-bold'>
                                <Image alt='gif file' src={gif1} onDragStart={(e) => e.preventDefault()}></Image>
                                <p className='text-[#0054a5]  mt-3 text-center '>Build Career in Web</p>
                            </div>

                        </div>











                        <div className=' shadow-xl rounded py-10 mt-5'>
                            <div className='lg:ml-4'>
                                <p className='text-[#0054a5] font-semibold mt-3'>who can join</p>
                                <hr className='w-10 h-1 bg-[#0054a6]' />

                                <p className='mt-4 text-base'>This course is intended for <br /> those who want to work as a <br /> Software Tester. This course covers <br /> software testing in detail.</p>
                            </div>

                        </div>






                        <div className=' shadow-xl rounded py-10 mt-5'>
                            <div className='lg:ml-4'>
                                <p className='text-[#0054a5] font-semibold mt-3'>TRAINING VENUE</p>
                                <hr className='w-10 h-1 bg-[#0054a6]' />

                                <Image src={logo} className='relative right-3'></Image>
                                <p className='mt-4 text-base'>Moitry chattar ECB mor Dhaka-1205</p>
                                <StarRatings
                                    rating={cr?.rating}
                                    starDimension="20px"
                                    starSpacing="2px"
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name='rating'
                                />

                            </div>

                        </div>

                    </div>
                </div>
            </div>



            <Footer></Footer>
        </main>
    );
}



