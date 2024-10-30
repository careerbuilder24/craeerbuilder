'use client'
import { useParams } from 'next/navigation';
import React from 'react'
import useStudents from '@/hooks/useStudents';
import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import img1 from '../../../assets/image1.PNG'
import { IoLocationOutline } from "react-icons/io5";
import gif1 from '../../../assets/8i75.gif'
import gif2 from '../../../assets/gif2.gif'
import Image from 'next/image';

export default function page() {


    const student = useStudents();
    const { id } = useParams();

    const graphic = student.find(Onestudent => Onestudent?.id === Number(id));
    console.log(graphic)

    return (
        <main>
            <Navbar></Navbar>

            <div className='mt-44'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='relative w-7/12 overflow-hidden rounded-lg '>

                        <div className='absolute inset-0 bg-gradient-to-r ' />

                        {/* Image */}
                        <Image
                            src={img1}
                            className='mt-4 transition-transform duration-300 ease-in-out'
                            alt="Description of the image"
                        />
                    </div>
                </div>


                <div>
                    <div className='flex justify-center items-center  '>
                        <div className='w-2/12 h-auto bg-[#17549A]  rounded-lg'>
                            {graphic ? (
                                <div className='flex flex-col text-white relative bottom-28' >
                                    <div>
                                        <Image
                                        
                                            src={graphic.image}
                                            onDragStart={(e) => e.preventDefault()}
                                            alt={graphic.title}
                                            className="mt-4 shadow-lg w-9/12 mx-auto lg:mb-5 transition-transform duration-300 hover:scale-105 "
                                            style={{ borderRadius: '180px', border: '10px solid #ffffff' }} // Custom border radius
                                            width={600}
                                            height={300}
                                        />
                                    </div>
                                    <div>
                                        <h1 className='text-center text-xl font-bold'>{graphic.name}</h1>
                                        <div className='flex justify-center items-center mt-4'>
                                            <IoLocationOutline ></IoLocationOutline>
                                            <p className=''>Khulna</p>
                                        </div>

                                        <p className='ml-16 text-[#00B5FF] mt-3 text-xl font-bold'>SCORE</p>
                                        <div className='flex flex-row justify-center items-center mt-2 gap-2'>
                                            <p className='text-3xl  font-bold'>242</p>
                                            <p>15+ IN THIS WEEK</p>
                                        </div>

                                        <div className='flex flex-row justify-center items-center gap-5 mt-10'>
                                            <Image src={gif1} alt="gif1" className='w-2/12 rounded-md' />
                                            <p>Achivements</p>

                                        </div>
                                        <div className='ml-10 px-8 mt-4'>
                                            <div>
                                                <progress className="progress progress-info w-56" value="40" max="100"></progress>
                                                <p className='text-xs text-right'>Coding Skill</p>
                                            </div>
                                            <div>
                                                <progress className="progress progress-info w-56" value="70" max="100"></progress>
                                                <p className='text-xs text-right'>Design Skill</p>
                                            </div>
                                            <div>
                                                <progress className="progress progress-info w-56" value="30" max="100"></progress>
                                                <p className='text-xs text-right'>Develop kill</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-row justify-center items-center gap-5 mt-10'>
                                            <Image src={gif2} alt="gif1" className='w-2/12 rounded-lg' />
                                            <p>Got Intern</p>

                                        </div>
                                        <p className='text-xl text-center font-bold'>Intern at Codertrust</p>

                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center w-9/12 mx-auto lg:mb-5 h-40">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                                </div>
                            )}
                        </div>

                        <div className='w-5/12  h-auto'>
                            <div className='flex flex-col'>
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


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}
