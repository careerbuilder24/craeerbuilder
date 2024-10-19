"use client";
import useCourses from '@/hooks/useCourse';
import { useParams } from 'next/navigation';
import { SlCalender } from "react-icons/sl";
import { LuClock9 } from "react-icons/lu";
import { HiBars4 } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Image from 'next/image';
import React from 'react';
import img1 from '../../../../assets/kmn.jpg';
import Navbar from '../../componenets/Navbar/Navbar';

export default function Page() {
    const { id } = useParams();
    const courses = useCourses();

    // Loading state

    if (!courses) {
        return <div>Loading courses...</div>;
    }

    const cr = courses.find(course => course?.id === Number(id));

    console.log('Found Course:', cr);

    return (


        <>
            <Navbar></Navbar>




            <div className=' lg:mt-52  lg:absolute lg:inset-0  flex justify-center items-center    '>




                <div className='flex-col bg-[#17549A]  px-16 rounded-md'>
                    <div className='  mt-36 lg:mt-0  lg:p-4 md:p-6 '>

                        {cr ? (
                            <>
                                <div className='flex flex-col lg:flex-row text-white mt-5   bg-transparent bg-opacity-100  '>
                                    <div>
                                        <img
                                            src={cr.image}
                                            onDragStart={(e) => e.preventDefault()}
                                            alt={cr.title}
                                            className="mt-4 shadow-md rounded w-full mx-auto md:w-9/12 lg:mb-5"
                                        />
                                    </div>
                                    <div className='lg:mt-4 '>
                                        {/* <h2 className="text-2xl font-bold md:text-3xl">{cr.course_name}</h2> */}
                                        {/* <p className="text-lg md:text-xl">{cr.title}</p> */}
                                        {/* <p className="text-lg md:text-xl">Price: ${cr.price}</p> */}
                                        {/* <p className="text-lg md:text-xl">Enrollment Date: {cr.enrollment_date}</p> */}

                                        <h1 style={{ fontWeight: 300 }} className='text-4xl'>Certified Course on Master of Graphic Design</h1>
                                        <p style={{ fontWeight: 300 }} className='my-5  text-lg'>For this course any one can learn from very basic to complete graphic design. One can easily develop his <br /> design sense through this course.To take the certification one have to pass the final assessmen

                                        </p>
                                    </div>

                                </div>
                            </>
                        ) : 'Loading......'}
                    </div>

                    <div className=' text-white  lg:mt-0  lg:p-4 md:p-6'>

                        {cr ? (
                            <>
                                <div className='flex flex-col lg:flex-row text-[#17549A] mt-5 lg:gap-48  bg-white bg-opacity-100  rounded-md  lg:ml-8 px-2'>
                                    <div className='lg:ml-5'>
                                        <div>
                                            <h1 className='text-3xl my-3'>course at a glance</h1>
                                        </div>

                                        <div>
                                            <div className='gap-3 flex flex-col lg-flex-row items-start'>
                                                <div className='flex flex-col lg:flex-row items-center gap-2'>
                                                    <div className='flex justify-center items-center'>
                                                        <SlCalender className='text-xs' />
                                                        <p>{cr.Date}</p>
                                                    </div>
                                                    <div className='flex items-center gap-1'>
                                                        <HiBars4 className='text-sm' />
                                                        <h1>No. of Classes/Session: 85</h1>
                                                    </div>
                                                </div>



                                                <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
                                                    <div className='flex justify-center items-center'>
                                                        <LuClock9 className='text-xs' />
                                                        <p>{cr.Date}</p>
                                                    </div>
                                                    <div className='flex items-center gap-1'>
                                                        <SlCalender className='text-xs' />
                                                        <h1>No. of Classes/Session: 85</h1>
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-2'>
                                                    <LuClock9 className='text-xs' />
                                                    <h1>Class Schedule:</h1>
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <h1>Sunday - 5:30 PM - 8:30 PM</h1>
                                                    <h1>Tuesday - 5:30 PM - 8:30 PM</h1>
                                                </div>

                                                <div className='flex items-center'>
                                                    <IoLocationOutline className='mt-1' />
                                                    <p className='ml-1'>Venue: BASIS Institute of Technology & Management Limited <br /> BDBL Bhaban (3rd Floor - East), 12 Kawran Bazar, Dhaka -1215. Contact</p>
                                                </div>

                                                <div className='flex items-center mt-2'>
                                                    <p className='ml-4'>Number: 01810187044.</p>
                                                    <FaArrowUpRightFromSquare className='ml-2 cursor-pointer text-blue-500' />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='lg:mt-4'>
                                        <h2 className="text-2xl font-bold md:text-3xl">Price: TK. 85,000</h2>
                                        <p className="text-lg md:text-xl">Price: TK. 85,000
                                            (including VAT & TAX)</p>
                                        <p className="text-lg md:text-xl text-[#1df81d]">Discount Fee: 60,000 (One-time full payment: BDT 45,000)</p>

                                        <div className='flex flex-col justify-center items-center gap-5 mt-16'>



                                            <div className='w-32 h-10 bg-[#0054a6] text-white text-center relative overflow-hidden group cursor-pointer'>
                                                <h1 className='mt-2 font-bold '>Enroll Now</h1>
                                                <div className='bg-[#a6ce39] opacity-70 w-11/12 h-8 transition-transform duration-300 
                    group-hover:translate-x-16 group-hover:scale-y-150 group-hover:rounded-full 
                    absolute bottom-1 left-1/2 transform -translate-x-1/2'>
                                                </div>
                                            </div>

                                            <div className='w-32 h-10 bg-[#0054a6] text-white text-center relative overflow-hidden group cursor-pointer'>
                                                <h1 className='mt-2 font-bold '>Enroll Now</h1>
                                                <div className='bg-[#199ebf] opacity-70 w-11/12 h-8 transition-transform duration-300 
                    group-hover:translate-x-16 group-hover:scale-y-150 group-hover:rounded-full 
                    absolute bottom-1 left-1/2 transform -translate-x-1/2'>
                                                </div>
                                            </div>

                                            {/* extra part of enroll */}

                                            {/* <div className='w-32 h-10 bg-[#0054a6] text-white text-center relative overflow-hidden group'>
                                                <h1 className='mt-2'>Enroll Now</h1>
                                                <div className='bg-[#199ebf] opacity-70 w-11/12 h-8 transition-transform duration-300  group-hover:translate-x-12 absolute bottom-1 left-1/2 transform -translate-x-1/2'>

                                                </div>
                                            </div> */}

                                        </div>
                                    </div>

                                </div>
                            </>
                        ) : ''}
                    </div>

                </div>

            </div>



            {/* second partt */}
            <div className='container mx-auto '>
                <div className="flex items-center justify-center h-screen">
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                        <h1 className="text-white">Div 1</h1>
                    </div>
                    <div className="w-full h-full bg-green-500 flex items-center justify-center">
                        <h1 className="text-white">Div 2</h1>
                    </div>
                </div>
            </div>



        </>

    );
}
