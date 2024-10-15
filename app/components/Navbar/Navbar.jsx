"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebookF } from "react-icons/fa6";
import { ImYoutube2 } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import logo from '../../../assets/logo.jpg';
import logo2 from '../../../assets/new.gif';
import Image from 'next/image';

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleNav = () => {
        setIsNavOpen((prev) => !prev); // Toggle the state
    };

    const handleScroll = () => {
        if (window.scrollY > 50) { // Adjust this value based on your design
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            // Reset scroll state on resize
            if (window.innerWidth < 768) {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <nav>
                {/* First Section */}
                <div style={{ backgroundColor: '#e1e1e1' }} className={`h-10 flex flex-col  md:flex-row items-center  justify-center lg:block lg:p-2 p-8 ${isScrolled ? 'fixed top-0 w-full transition-all duration-300 py-16 z-20 bg-gray-200' : ''}`}>
                    <div className='flex flex-col md:flex-row justify-center items-center lg:gap-5'>
                        <div className='flex items-center lg:gap-5 gap-2 mb-2 md:mb-0'>
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

                {/* Second Section */}
                <div className={`fixed z-30 w-full transition-all duration-300 ${isScrolled && window.innerWidth >= 768 ? 'lg:top-0 transition-all duration-300' : 'lg:top-10 '} bg-white`}>
                    <div className='flex justify-center'>
                        <div className='lg:w-4/12 w-9/12 cursor-pointer lg:ml-64 m-2'>
                            <Image src={logo} className='lg:w-8/12 w-8/12 rounded-md ml-14 lg:ml-0' onDragStart={(e) => e.preventDefault()} />
                        </div>
                    </div>

                    <div style={{ background: '#17549A' }} className='h-14 flex items-center'>
                        <button className="md:hidden ml-4" onClick={toggleNav}>
                            <h1 className='text-white'>Menu</h1> {/* Toggle button */}
                        </button>
                        <div className='flex-grow justify-center hidden md:flex font-light'>
                            <ul className='flex space-x-4 text-white'>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>Home</li>
                                <div className='flex'>
                                    <div className='lg:mt-1'>
                                        <Image src={logo2} className='w-full'></Image>
                                    </div>
                                    <div>
                                        <li className='cursor-pointer'>Virtual Tutor</li>
                                    </div>
                                </div>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>Courses</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>Gallery</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>Faq</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>University</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>About us</li>
                                <li className='cursor-pointer transition-colors duration-300 hover:text-[#53baff]'>Contact</li>
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
                        <li className='cursor-pointer' onClick={toggleNav}>Home</li>
                        <li className='cursor-pointer' onClick={toggleNav}>Courses</li>
                        <li className='cursor-pointer' onClick={toggleNav}>Gallery</li>
                        <li className='cursor-pointer' onClick={toggleNav}>Faq</li>
                        <li className='cursor-pointer' onClick={toggleNav}>Univeristy</li>
                        <li className='cursor-pointer' onClick={toggleNav}>About us</li>
                        <li className='cursor-pointer' onClick={toggleNav}>Contact</li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
