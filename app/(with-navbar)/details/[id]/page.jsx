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
import React from 'react';
import img1 from '../../../../assets/kmn.jpg';
import logo from '../../../../assets/logo.jpg';
import instrastor from '../../../../assets/inst.jpg';
import Navbar from '../../componenets/Navbar/Navbar';
import Footer from '../../componenets/Footer/Footer';
import StarRatings from 'react-star-ratings';

export default function Page() {
    const { id } = useParams();
    const courses = useCourses();

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
                <div className=' flex-col  bg-[#17549A] lg:w-9/12 rounded-md lg:mb-5 py-4'>
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

                    <div className='text-white lg:mt-0 lg:p-4 md:p-6'>
                        {cr ? (
                            <div className='flex flex-col justify-between lg:flex-row text-[#17549A] mt-5  bg-white   rounded-md lg:ml-8 mr-8  lg:w-12/12 ml-8'>
                                <div className='lg:ml-5'>
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

                                        <div className='flex items-center gap-2'>
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

                                <div className='lg:mt-4 lg:mr-20 mt-4'>
                                    <h2 className="text-2xl font-bold md:text-3xl">Price: TK. 85,000</h2>
                                    <p className="text-lg md:text-xl">Price: TK. 85,000 (including VAT & TAX)</p>
                                    <p className="text-lg md:text-xl text-[#1df81d]">One time full payment: BDT 21,000.</p>


                                    <div className='flex flex-col justify-center items-center gap-5 mt-10'>



                                        <div className='w-36 h-10 bg-[#0054a6] text-white text-center relative overflow-hidden group cursor-pointer'>
                                            <h1 className='mt-2 font-bold '>Enroll Now</h1>
                                            <div className='bg-[#a6ce39] opacity-70 w-11/12 h-8 transition-transform duration-300 
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
                    <div className="w-full lg:w-4/5  bg-white mb-4 lg:mb-0 shadow-lg p-4 rounded">
                        <div>
                            <p style={{ fontWeight: '700' }} className='font-medium text-sm'>Certificate Course on Software Testing & Quality Assurance</p>
                            <h1 tyle={{ fontWeight: '700' }} className='text-base mt-3 font-semibold mb-4'>Course Outline:</h1>
                            <h1 style={{ fontWeight: '400' }} className='mb-3 text-xl'>Manual Testing</h1>
                            <h1 className='my-3 text-xl'>Software Development Life Cycle</h1>
                        </div>

                        <div className='my-4'>
                            <ul>
                                <li className='flex gap-2 '>    <GoDotFill className='text-[#634949] mt-1' />
                                    <h1>Waterfall Model</h1></li>
                                <li className='flex my-2 gap-2'>    <GoDotFill className='text-[#634949] mt-1' />
                                    <h1>Spiral Model</h1></li>
                                <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                    <h1>Prototype Model</h1></li>
                                <li className='flex my-2 gap-2 text-[#3e3e3e]'>    <GoDotFill className='mt-1' />
                                    <h1>V-Model</h1></li>
                                <li className='flex text-[#3e3e3e] gap-2'>    <GoDotFill className='mt-1' />
                                    <h1>Hybrid Model</h1></li>
                            </ul>
                        </div>

                        <div>
                            <h1 className='text-xl'>Software Testing</h1>

                            <p className='text-sm font-semibold mt-3 mb-4 text-[#3e3e3e]'>What is Quality? <br />
                                Functional and Non-Functional Quality Attributes <br />
                                Test Levels</p>

                            <div className='my-4'>
                                <ul>
                                    <li className='flex gap-2'>    <GoDotFill className='text-[#634949] mt-1' />
                                        <h1>Component Testing</h1></li>
                                    <li className='flex my-2 gap-2'>    <GoDotFill className='text-[#634949] mt-1' />
                                        <h1>Integration Testing</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>System Testing</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Acceptance Testing</h1></li>
                                    <li className='flex my-2 gap-2 ml-4 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Alpha Testing</h1></li>
                                    <li className='flex my-2 gap-2 ml-4 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Beta Testing</h1></li>
                                </ul>
                                <p className='text-sm font-semibold mt-3 mb-4 text-[#3e3e3e] my-4'>Static Testing Technique</p>
                            </div>




                            <div className='my-4'>


                                <p className='text-sm font-semibold mt-3 mb-4 text-[#3e3e3e] my-4'>Static Testing Technique</p>


                                <ul>
                                    <li className='flex gap-2'>    <GoDotFill className='text-[#634949] mt-1' />
                                        <h1>Control Flow analysis</h1></li>
                                    <li className='flex my-2 gap-2'>    <GoDotFill className='text-[#634949] mt-1' />
                                        <h1>Data Flow analysis</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Cyclomatic Complexity</h1></li>



                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className=''>White Box Testing Technique</h1></li>
                                    <li className='flex my-2 gap-2 ml-4 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Statement Coverage</h1></li>
                                    <li className='flex my-2 gap-2 ml-4 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Decision / Branch Coverage</h1></li>
                                    <li className='flex my-2 gap-2  text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949]'>Condition Coverage</h1></li>

                                </ul>
                            </div>
                            <p className='text-sm  mt-3 mb-4 text-[#3e3e3e] my-4'>Path Coverage</p>

                            <div>
                                <ul>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='font-bold'>Black Box Testing</h1></li>
                                    <li className='flex my-2 gap-2 ml-4 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Functional Testing</h1></li>
                                    <li className='flex my-2 ml-4 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Non-Functional Testing</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Smoke Testing/Sanity Testing</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Adhoc Testing</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Exploratory Testing</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Compatibility Testing</h1></li>
                                    <li className='flex my-2 gap-2  text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='font-bold'>Performance Testing</h1></li>
                                    <li className='flex my-2 ml-4 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Load Testing</h1></li>
                                    <li className='flex my-2 ml-4 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Stress Testing</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Performance Testing</h1></li>
                                </ul>
                                <p className='text-sm  mt-3 mb-4 text-[#3e3e3e] my-4'>Soak Testing</p>

                            </div>





                            <div>
                                <ul>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Reliability Testing</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Usability Testing</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Accessibility Testing</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Globalization Testing</h1></li>

                                    <li className='flex my-2 gap-2 ml-4 text-[#634949]'>     <GoDotFill className='mt-1' />
                                        <h1>Functional Testing</h1></li>
                                    <li className='flex mt-2 ml-4 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Non-Functional Testing</h1></li>


                                </ul>
                                <p className='text-sm   text-[#3e3e3e] mt-3 mb-1'>Retesting / Confirmation Testing <br />
                                    Regression Testing</p>
                                <h1 className='font-bold'>TEST CASE</h1>

                            </div>




                            <div>
                                <ul>
                                    <li className='flex my-2 gap-2 mt-10 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Introduction to Test Case</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Test Case Templates</h1></li>
                                    <li className='flex my-2 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1 className='text-[#634949] font-bold'>Test Case Design Techniques</h1></li>


                                    <li className='flex gap-2 my-2 ml-4 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Specification Based</h1></li>
                                    <li className='flex mt-2 gap-2 ml-4 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Equivalence Class Partitioning</h1></li>
                                    <li className='flex mt-2 ml-4 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Boundary Value Analysis</h1></li>
                                    <li className='flex mt-2 gap-2 ml-4 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Decision Table Testing</h1></li>
                                    <li className='flex mt-2 ml-4 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Use Case based Testing</h1></li>
                                    <li className='flex mt-2 ml-4 gap-2 text-[#634949]'>    <GoDotFill className='mt-1' />
                                        <h1>Experienced Based</h1></li>


                                </ul>


                            </div>



                        </div>
                    </div>

                    <div className="w-full  lg:w-1/5  rounded h-auto lg:h-[2000px] bg-white  ">
                        <div className=' shadow-xl rounded py-10'>
                            <div className='ml-4'>
                                <p className='text-[#0054a5] font-semibold mt-3'>Tentative Class Start</p>
                                <hr className='w-10 h-1 bg-[#0054a6]' />
                            </div>
                            <h1 className='text-center text-[#3c763d] font-bold mt-3 text-2xl'>23rd October, 2024</h1>
                        </div>




                        <div className=' shadow-xl rounded py-10 mt-5'>
                            <div className='ml-4'>
                                <p className='text-[#0054a5] font-semibold mt-3'>Available Seat</p>
                                <hr className='w-10 h-1 bg-[#0054a6]' />
                            </div>
                            <h1 className='text-center text-[#3c763d] font-bold mt-3 text-2xl'>23rd October, 2024</h1>

                            <center>
                                <h1 className='text-[0054a5] font-bold text-[#0054a6] text-3xl'>10 / 25</h1>
                                <div className='w-36 h-10 bg-[#0054a6] text-white text-center relative overflow-hidden group cursor-pointer'>
                                    <h1 className='mt-2 font-bold '>Enroll Now</h1>
                                    <div className='bg-[#a6ce39] opacity-70 w-11/12 h-8 transition-transform duration-300 
                    group-hover:translate-x-16 group-hover:scale-y-150 group-hover:rounded-full 
                    absolute bottom-1 left-1/2 transform -translate-x-1/2'>
                                    </div>
                                </div>
                            </center>

                        </div>


                        <div className=' shadow-xl rounded py-10 mt-5'>
                            <div className='ml-4'>
                                <p className='text-[#0054a5] font-semibold mt-3'>who can join</p>
                                <hr className='w-10 h-1 bg-[#0054a6]' />

                                <p className='mt-4 text-base'>This course is intended for <br /> those who want to work as a <br /> Software Tester. This course covers <br /> software testing in detail.</p>
                            </div>

                        </div>






                        <div className=' shadow-xl rounded py-10 mt-5'>
                            <div className='ml-4'>
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




                        <div className=' shadow-xl rounded py-10 mt-5'>
                            <div className='ml-4'>
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







                                {/* <div className='w-11/12 mt-4'>



                                    <div className={` bg-blue-500 opacity-30 h-10 wfull relative `}>

                                    </div>
                                  
                                </div> */}




                            </div>

                        </div>
                    </div>
                </div>
            </div>



            <Footer></Footer>
        </main>
    );
}
