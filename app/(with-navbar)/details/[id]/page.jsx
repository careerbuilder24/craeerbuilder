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


            {/* <div className='hidden lg:block'>

                    <Image
                        src={img1}
                        alt="Background"
                        className='object-cover  sm:w-full w-full h-[400px] md:h-[500px]'
                        layout="responsive"
                    />
                </div> */}


            {/* secodnd part */}

            <div className=' lg:mt-52  lg:absolute lg:inset-0  flex justify-center items-center   '>




                <div className='flex-col bg-[#17549A] '>
                    <div className=' text- mt-36 lg:mt-0  lg:p-4 md:p-6'>

                        {cr ? (
                            <>
                                <div className='flex flex-col lg:flex-row text-white mt-5   bg-transparent bg-opacity-100  '>
                                    <div>
                                        <img
                                            src={cr.image}
                                            onDragStart={(e) => e.preventDefault()}
                                            alt={cr.title}
                                            className="mt-4 shadow-md rounded w-3/4 mx-auto md:w-9/12 lg:mb-5"
                                        />
                                    </div>
                                    <div className='lg:mt-4'>
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

                    <div className=' text-white  lg:mt-0  p-4 md:p-6'>

                        {cr ? (
                            <>
                                <div className='flex flex-col lg:flex-row text-[#17549A] mt-5 lg:gap-48  bg-white bg-opacity-100  '>
                                    <div>
                                        <div>
                                            <h1 className='text-3xl my-3'>course at a glance</h1>
                                        </div>

                                        <div>
                                            <div className='gap-3 flex items-center '>
                                                <SlCalender className='text-xs ' />
                                                <p>{cr.Date}</p>
                                                <div className='flex items-center gap-1 '>
                                                    <HiBars4 className='text-sm' />
                                                    <h1>No. pf Classes/Session: 85</h1>
                                                </div>
                                            </div>

                                            <div className='gap-3 flex items-center '>
                                                <LuClock9 className='text-xs ' />
                                                <p>{cr.Date}</p>
                                                <div className='flex items-center gap-1 '>
                                                    <div className='flex items-center gap-1 '>
                                                        <SlCalender className='text-xs' />
                                                        <h1>No. pf Classes/Session: 85</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='gap-3 flex items-center '>
                                                <LuClock9 className='text-xs ' />
                                                <div className='flex items-center gap-1 '>
                                                    <h1>Class Schedule:</h1>
                                                </div>
                                            </div>
                                            <div className='gap-5 flex items-center '>
                                                <h1>Sunday - 5:30 PM - 8:30 PM</h1>
                                                <h1>Tuesday - 5:30 PM - 8:30 PM</h1>

                                            </div>
                                            <h1>Tuesday - 5:30 PM - 8:30 PM</h1>
                                            <div className='flex  items-center justify-center gap-1'>
                                                <div className='flex'>
                                                    <IoLocationOutline className='mt-1' />
                                                    <p>:Venue: BASIS Institute of Technology & Management Limited <br /> BDBL Bhaban (3rd Floor - East), 12 Kawran Bazar, Dhaka -1215. Contact
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex'>
                                                <p className='ml-4'>Number: 01810187044.</p>
                                                <FaArrowUpRightFromSquare className='ml-3' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='lg:mt-4'>
                                        <h2 className="text-2xl font-bold md:text-3xl">Price: TK. 85,000</h2>
                                        <p className="text-lg md:text-xl">Price: TK. 85,000
                                            (including VAT & TAX)</p>
                                        <p className="text-lg md:text-xl text-[#1df81d]">Discount Fee: 60,000 (One-time full payment: BDT 45,000)</p>
                                    </div>

                                </div>
                            </>
                        ) : ''}
                    </div>

                </div>

            </div>


        </>

    );
}
