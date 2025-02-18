"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebookF } from "react-icons/fa6";
import { ImYoutube2 } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import { LuMenu } from "react-icons/lu";
import { CgCloseO } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';
import { UserAuth } from "../../../context/AuthContext";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import logo from '../../../../assets/hv.png';
import userIcon from '../../../../assets/propfilelogo.PNG';

export default function Navbar() {
    const router = useRouter();
    const { user, logOut, ManualUser } = UserAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isTopBarVisible, setIsTopBarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isStudentsDropdownOpen, setIsStudentsDropdownOpen] = useState(false);

    useEffect(() => {
        if (user && user.email) {
            axios.get(`/api/user/profile?email=${user.email}`)
                .then(response => {
                    if (response.data.success) setUserProfile(response.data.data);
                })
                .catch(error => console.error("Failed to fetch user profile:", error));
        }
    }, [user]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsTopBarVisible(false);
            } else {
                setIsTopBarVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleSignOut = async () => {
        try {
            await logOut();
            setUserProfile(null);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <header className="fixed top-0 w-full z-30 transition-all duration-300">
            {/* Top Contact/Social Bar */}
            <div className={`bg-[#122549] flex justify-center items-center gap-10 px-4 lg:px-16 py-2 border-b border-white/20 transition-transform duration-300 ${isTopBarVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex items-center gap-4 text-sm text-white">
                    <span>+880 1234 56789</span>
                    <span className="h-4 w-px bg-white/50"></span>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="text-white hover:text-blue-400 transition-colors">
                        <AiOutlineMail className="text-white" />
                    </a>
                    <a href="#" className="text-white hover:text-blue-400 transition-colors">
                        <FaFacebookF size={18} />
                    </a>
                    <a href="#" className="text-white hover:text-red-600 transition-colors">
                        <ImYoutube2 size={20} />
                    </a>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav className={`flex items-center justify-between h-14 px-4 lg:px-16 bg-[#17549A] shadow-md transition-all duration-300 ${isTopBarVisible ? 'mt-0' : 'mt-[-37px]'}`}>
                {/* Mobile Menu Button */}
                <button className="lg:hidden text-white" onClick={() => setIsNavOpen(!isNavOpen)}>
                    {isNavOpen ? <CgCloseO className="text-2xl" /> : <LuMenu className="text-2xl" />}
                </button>

                {/* Logo */}
                <Link href="/">
                    <Image src={logo} alt="Logo" className="w-44 h-auto" />
                </Link>

                {/* Navbar Links */}
                <div className="hidden lg:flex space-x-10 text-white font-bold">
                    <Link href="/" className='hover:text-blue-400 transition-colors'>Home</Link>
                    <Link href="/Courses" className='hover:text-blue-400 transition-colors'>Courses</Link>

                    {/* Students Dropdown for Large Screens */}
                    <div className="relative group">
                        <Link href={'/Students'} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                            Students <IoIosArrowDown size={14} />
                        </Link>
                        <div className="absolute left-0  bg-white text-black shadow-lg  hidden group-hover:block w-56">
                            <ul className="p-2">
                                <Link href="/RunningStudents" className="block py-2 px-4 hover:bg-gray-200">Running Students</Link>
                                <Link href="/RunningIntern" className="block py-2 px-4 hover:bg-gray-200">Running Interns</Link>
                                <Link href="/RunningEmployee" className="block py-2 px-4 hover:bg-gray-200">Running Employee</Link>
                            </ul>
                        </div>
                    </div>

                    <Link href="/Gallery" className='hover:text-blue-400 transition-colors'>Gallery</Link>
                    <Link href="/University" className='hover:text-blue-400 transition-colors'>University</Link>
                    <Link href="/CareerGuide" className='hover:text-blue-400 transition-colors'>Career Guide</Link>
                    <Link href="/FA_Q" className='hover:text-blue-400 transition-colors'>FAQ</Link>
                    <Link href="/About_Us" className='hover:text-blue-400 transition-colors'>About Us</Link>
                    <Link href="/Contuct_US" className='hover:text-blue-400 transition-colors'>Contact</Link>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-4">
                    {ManualUser ? (
                        <div className="relative group">
                            <div className='flex justify-center items-center text-white gap-4'>
                                <Image
                                    src={userProfile?.photo_url || ManualUser?.photoURL || userIcon}
                                    alt="User"
                                    width={40}
                                    height={40}
                                    className="rounded-full cursor-pointer"
                                />
                                <p className='hidden lg:block'>{ManualUser.name}</p>
                            </div>
                            <div className="absolute right-0  bg-white text-black shadow-lg hidden group-hover:block">
                                <ul className="p-2">
                                    <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer">Profile</li>
                                    <Link href="/DashBoard/Student" className="block py-1 px-4 hover:bg-gray-200">Dashboard</Link>
                                    <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleSignOut}>Log Out</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Link href="/log_in" className="text-white font-bold">Login</Link>
                    )}
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {isNavOpen && (
                <div className="lg:hidden absolute w-full bg-[#2DA9E1] text-white flex flex-col items-center p-4 space-y-4">
                    <Link href="/">Home</Link>
                    <Link href="/Courses">Courses</Link>
                    <button onClick={() => setIsStudentsDropdownOpen(!isStudentsDropdownOpen)} className="flex items-center gap-2">
                        Students <IoIosArrowDown size={14} />
                    </button>
                    {isStudentsDropdownOpen && (
                        <div className="w-full flex flex-col text-center">
                            <Link href="/RunningStudents" className="block py-2 px-4 hover:bg-gray-200">Running Students</Link>
                            <Link href="/RunningIntern" className="block py-2 px-4 hover:bg-gray-200">Running Interns</Link>
                            <Link href="/RunningEmployee" className="block py-2 px-4 hover:bg-gray-200">Running Employee</Link>
                        </div>
                    )}

                    <Link href="/Gallery" className='hover:text-blue-400 transition-colors'>Gallery</Link>
                    <Link href="/University" className='hover:text-blue-400 transition-colors'>University</Link>
                    <Link href="/CareerGuide" className='hover:text-blue-400 transition-colors'>Career Guide</Link>
                    <Link href="/FA_Q" className='hover:text-blue-400 transition-colors'>FAQ</Link>
                    <Link href="/About_Us" className='hover:text-blue-400 transition-colors'>About Us</Link>
                    <Link href="/Contuct_US" className='hover:text-blue-400 transition-colors'>Contact</Link>
                </div>
            )}
        </header>
    );
}
