"use client"
import React, { useState } from 'react';
import { FaFacebookF } from "react-icons/fa6";
import { ImYoutube2 } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import logo from '../../../assets/logo.jpg';
import Image from 'next/image';

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen((prev) => !prev); // Toggle the state
    };
    return (
        <>
            <nav>
                <div style={{ backgroundColor: '#e1e1e1' }} className='h-10 flex flex-col md:flex-row items-center justify-center   lg:block lg:p-2 p-11'>
                    <div className='flex flex-col md:flex-row justify-center lg:gap-5 '>
                        <div className='flex flex-col md:flex-row  items-center lg:gap-5 gap-2 mb-2 md:mb-0'>
                            <h1 className='text-xs'>+8801742540234</h1>
                            <div className='flex items-center gap-2'>
                                <AiOutlineMail className='w-3 h-3 text-black' />
                                <h1 className='text-xs'>Contact Us</h1>
                            </div>
                        </div>
                        <div className="flex space-x-2 ml-2">
                            <button className="bg-blue-500 p-1 rounded-full transition duration-300 ease-in-out hover:bg-blue-400">
                                <FaFacebookF className='w-3 h-3 text-white' />
                            </button>
                            <button className="bg-red-500 p-1 rounded-full transition duration-300 ease-in-out hover:bg-red-400">
                                <ImYoutube2 className='w-3 h-3 text-white' />
                            </button>
                            <button className="bg-gray-600 p-1 rounded-full transition duration-300 ease-in-out hover:bg-gray-500">
                                <AiOutlineMail className='w-3 h-3 text-white' />
                            </button>
                        </div>
                    </div>


                </div>
                <div className='fixd z-3- w-full '>
                    <div className='flex justify-center bg-[#fff]'>
                        <div className='lg:w-3/12 w-9/12 cursor-pointer lg:ml-72 m-2'>
                            <Image src={logo} className='lg:w-5/12 rounded-md' onDragStart={(e) => e.preventDefault()}></Image>
                        </div>
                    </div>


                    <div style={{ background: '#17549A' }} className=' h-14 flex items-center '>

                        <button className="md:hidden ml-4" onClick={toggleNav}>
                            <h1 className='text-white'>Menu</h1> {/* Toggle button */}
                        </button>
                        <div className='flex-grow    justify-center hidden md:flex font-bold '>
                            <ul className='flex space-x-4 text-white'>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>HOME</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>COURSES</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>GALLERY</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>FAQ</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>UNIVERSITY</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>ABOUT US</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>CONTACT</li>
                            </ul>

                        </div>
                    </div>
                </div>
                {/* Mobile Navbar */}
                <div className={`bg-blue-300 transition-transform duration-300 ease-in-out ${isNavOpen ? 'translate-y-0' : '-translate-y-full'} fixed top-0 left-0 w-full z-50`}>
                    <div className="flex justify-between items-center p-4">
                        <h1 className='text-white'>Menu</h1>
                        <button onClick={toggleNav} className="text-white">Close</button>
                    </div>
                    <ul className='flex flex-col items-center space-y-2 py-4 text-white'>
                        <li className='cursor-pointer' onClick={toggleNav}>HOME</li>
                        <li className='cursor-pointer' onClick={toggleNav}>COURSES</li>
                        <li className='cursor-pointer' onClick={toggleNav}>GALLERY</li>
                        <li className='cursor-pointer' onClick={toggleNav}>FAQ</li>
                        <li className='cursor-pointer' onClick={toggleNav}>UNIVERSITY</li>
                        <li className='cursor-pointer' onClick={toggleNav}>ABOUT US</li>
                        <li className='cursor-pointer' onClick={toggleNav}>CONTACT</li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
