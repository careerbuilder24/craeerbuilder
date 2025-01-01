"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebookF } from "react-icons/fa6";
import { ImYoutube2 } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import { CgCloseO } from "react-icons/cg";
import { LuMenu } from "react-icons/lu";
import logo from '../../../../assets/logo.jpg';
import logo2 from '../../../../assets/new.gif';
import logo3 from '../../../../assets/propfilelogo.PNG';
import Image from 'next/image';
import Link from 'next/link';
import { UserAuth } from "../../../context/AuthContext";
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

export default function Navbar() {

    const router = useRouter();
    // Auth context
    const { user, logOut } = UserAuth();



    // google logout

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error)
        }
    }

    console.log(user);

    // navbar funtions
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);



    const toggleNav = () => {
        setIsNavOpen((prev) => !prev);
    };



    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        // Check the initial scroll position and set isScrolled accordingly
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);




    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;

        // If the option is 'Running Students', navigate to the RunningStudents page
        if (selectedOption === 'Running Students') {
            router.push('/Students');
        } else if (selectedOption === 'Running Interns') {
            // Handle Running Interns navigation
            router.push('/RunningInterns');
        } else if (selectedOption === 'Running Employee') {
            // Handle Running Employee navigation
            router.push('/RunningEmployee');
        }
    };



    return (
        <header>
            <nav>
                {/* First Section */}
                <div style={{ backgroundColor: '#e1e1e1' }} className={`h-10 flex flex-col  md:flex-row items-center  justify-center lg:block lg:p-2 p-8 hidden `}>
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
                <div
                    style={{ borderBottom: '1px solid white' }}
                    className={`fixed z-30 w-full transition-all duration-300 bg-white ${isScrolled ? 'top-0' : 'lg:top-10 top-0'}`}
                >
                    <div className="flex justify-center ">
                        <div className="w-9/12 lg:w-4/12 cursor-pointer mx-2 lg:ml-64 container ">
                            <Image
                            alt='nav logo image'
                                src={logo}
                                className="w-8/12 lg:w-8/12 rounded-md ml-14 lg:ml-0"
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>

                    {/* Navbar */}
                    <div style={{ background: '#17549A' }} className="h-14 flex items-center">
                        <button className="lg:hidden ml-4" onClick={toggleNav}>
                            <div className="w-8 h-8 hover:bg-[#0499fd] bg-white rounded-lg">
                                <center>
                                    <LuMenu className="text-3xl font-bold" />
                                </center>
                            </div>
                        </button>

                        {/* Desktop Navbar */}
                        <div className="hidden lg:flex grow justify-center font-light">
                            <div className="flex justify-center items-center space-x-10 mt-2 lg:ml-10 text-base text-white">
                                <Link
                                    href="/"
                                    className="duration-300 transition-all font-bold cursor-pointer whitespace-nowrap"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/Courses"
                                    className="text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap"
                                >
                                    Courses
                                </Link>

                                {/* Dropdown */}


                                <div className="relative group">
                                    {/* Parent Trigger for Dropdown */}
                                    <div className="text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap">
                                        <Link href="/Students" className="flex items-center justify-center h-full font-bold">
                                            Students
                                            <span className="ml-2 text-sm transition-transform duration-300 transform group-hover:rotate-180">&#x25BC;</span> {/* Dropdown arrow */}
                                        </Link>
                                    </div>

                                    {/* Dropdown Content */}
                                    <div className="dropdown-content z-10 menu py-3 px-4 shadow-lg rounded-t-lg w-56 font-semibold bg-white text-gray-800 absolute left-0 top-full mt-0 hidden group-hover:block transition-all duration-300">
                                        <Link href="/RunningStudents" className="block py-2 px-4 hover:bg-blue-100 hover:scale-105 transition-all rounded-lg">
                                            <span className="flex items-center">
                                                <span className="mr-2">&#x1F393;</span> {/* Graduation cap icon */}
                                                Running Students
                                            </span>
                                        </Link>
                                        <Link href="/RunningIntern" className="block py-2 px-4 hover:bg-blue-100 hover:scale-105 transition-all rounded-lg">
                                            <span className="flex items-center">
                                                <span className="mr-2">&#x1F4BC;</span> {/* Briefcase icon */}
                                                Running Interns
                                            </span>
                                        </Link>
                                        <Link href="/RunningEmployee" className="block py-2 px-4 hover:bg-blue-100 hover:scale-105 transition-all rounded-lg">
                                            <span className="flex items-center">
                                                <span className="mr-2">&#x1F464;</span> {/* Employee icon */}
                                                Running Employees
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                {/* Other Links */}
                                <Link href="/Gallery" className="text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap">
                                    Gallery
                                </Link>
                                <Link href="/University" className="text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap">
                                    University
                                </Link>
                                <Link href="/CareerGuide" className="text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap">
                                    Career Guide
                                </Link>
                                <Link href="/FA_Q" className="text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap">
                                    FAQ
                                </Link>
                                <Link href="/About_Us" className="text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap">
                                    About us
                                </Link>
                                <Link href="/Contuct_US" className="text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap">
                                    Contact
                                </Link>

                                {/* Login/Logout Button */}
                                {user ? (
                                    ''
                                ) : (
                                    <div className="text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap">
                                        <Link href="/log_in">Login</Link>
                                    </div>
                                )}

                                {/* User Profile Dropdown */}
                                <div className="ml-4 group relative">
                                    {user ? (
                                        <div className="flex flex-row items-center gap-4 cursor-pointer">
                                            <Image
                                                tabIndex={0}
                                                height={50}
                                                width={50}
                                                className="rounded-full"
                                                src={user?.photoURL || logo3 || ''}
                                                alt=""
                                            />
                                            <p className="text-white">{user?.displayName || 'Anonymous'}</p>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    <div className="dropdown-content z-[1] menu py-3 px-4 shadow rounded-lg w-52 font-bold bg-white absolute left-6 hidden group-hover:block transition-all cursor-pointer">
                                        {user ? (
                                            <ul>
                                                <li className="block py-2 text-gray-800 hover:bg-blue-400 rounded">Profile</li>
                                                <Link className="block py-2 text-gray-800 hover:bg-blue-400 rounded" href={'/DashBoard/Student'}>Dashboard</Link>
                                                <li className="block py-2 text-gray-800 hover:bg-blue-400 rounded" onClick={handleSignOut}>
                                                    LogOut
                                                </li>
                                            </ul>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Mobile Navbar */}
                <div
                    style={{ background: '#2DA9E1' }}
                    className={`transition-transform duration-700 ease-in-out lg:hidden fixed top-28 md:top-44 right-0 h-full z-50 w-64 transform ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex justify-between items-center p-4">

                        <button className="lg:hidden absolute left-5 top-5 " onClick={toggleNav}>
                            <CgCloseO className="text-2xl text-white" />
                        </button>
                    </div>
                    <div className="flex flex-col items-center space-y-2 py-4 gap-3 ">


                        <Link href={'/'} style={{ borderRadius: '4px' }} className='h-10 mt-10 w-[245px]  bg-white '>
                            <h3 className='ml-10 mt-1'>Home</h3>
                        </Link>

                        {/* <div className='flex'>

                                <div className='lg:mt-1 w-7'>
                                    <Image src={logo2} className='w-full'></Image>
                                </div>

                                <div className='relative group'>


                                    

                                    <div className='text-center text-white  hover:hover:text-blue-400   duration-300 transition-all font-bold cursor-pointer'>
                                        <Link href={'/Students'} className='flex items-center justify-center h-full font-bold'>
                                            Students
                                        </Link>
                                    </div>


                                </div>
                            </div> */}




                        <div style={{ borderRadius: '4px' }} className='h-10 w-[245px]  bg-white '>
                            <h3 className='ml-10 mt-1'>Gallery</h3>
                        </div>






                        <div>
                            <div className="w-11/12">
                                <select
                                    style={{ padding: '10px 44px', borderRadius: '4px' }}
                                    className="cursor-pointer"
                                    onChange={handleSelectChange}
                                >

                                    <option className='font-bold'>Students</option>
                                    <option>Running Students</option>
                                    <option>Running Interns</option>
                                    <option>Running Employee</option>
                                </select>
                            </div>
                        </div>


                        <div style={{ borderRadius: '4px' }} className='h-10 w-[245px]  bg-white '>
                            <h3 className='ml-10 mt-1'>Craeer Guide</h3>
                        </div>


                        <div style={{ borderRadius: '4px' }} className='h-10 w-[245px]  bg-white '>
                            <h3 className='ml-10 mt-1'>Faq</h3>
                        </div>

                        <div style={{ borderRadius: '4px' }} className='h-10 w-[245px]  bg-white '>
                            <h3 className='ml-10 mt-1'>About us</h3>
                        </div>

                        <div style={{ borderRadius: '4px' }} className='h-10 w-[245px]  bg-white '>
                            <h3 className='ml-10 mt-1'>Contact</h3>
                        </div>



                    </div>
                </div>

            </nav>
        </header>
    );
}
