"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebookF } from "react-icons/fa6";
import { ImYoutube2 } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import { LuMenu } from "react-icons/lu";
import { CgCloseO } from "react-icons/cg";
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
    const [isScrolled, setIsScrolled] = useState(false);

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
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSignOut = async () => {
        try {
            await logOut();
            setUserProfile(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="fixed top-0 w-full bg-white z-30 shadow-md">
            <nav className="flex items-center justify-between h-14 px-4 lg:px-16 bg-[#17549A]">


               {/* Mobile Menu Button */}
               <button className="lg:hidden text-white" onClick={() => setIsNavOpen(!isNavOpen)}>
                    {isNavOpen ? <CgCloseO className="text-2xl" /> : <LuMenu className="text-2xl" />}
                </button>
                {/* Logo on the Left */}
                <Link href="/">
                    <Image src={logo} alt="Logo" className="w-44 h-auto" />
                </Link>

                {/* Navbar Links (Hidden on Mobile) */}
                <div className="hidden lg:flex space-x-10 grid-flow-row  text-white font-bold">
                    <Link href="/" className='text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap'>Home</Link>
                    <Link href="/Courses" className='text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap'>Courses</Link>
                    <Link href="/Students" className='text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap'>Students</Link>
                    <Link href="/Gallery" className='text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap'>Gallery</Link>
                    <Link href="/University" className='text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap'>University</Link>
                    <Link href="/CareerGuide" className='text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap'>Career Guide</Link>
                    <Link href="/FA_Q" className='text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap'>FAQ</Link>
                    <Link href="/About_Us" className='text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap'>About Us</Link>
                    <Link href="/Contuct_US" className='text-center text-white hover:text-blue-400 duration-300 transition-all font-bold cursor-pointer whitespace-nowrap'>Contact</Link>
                </div>

                {/* User Profile on the Right */}
                <div className="flex items-center space-x-4">
                    {ManualUser ? (
                        <div className="relative group">
                        <div className='flex justify-center items-center text-white gap-4'>
                        <Image
                                src={userProfile?.photo_url || ManualUser?.photoURL || userIcon}
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />
                            <p className='hidden lg:block md:block '>{ManualUser.name}</p>
                        </div>
                            <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg hidden group-hover:block">
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

            {/* Mobile Menu */}
            {isNavOpen && (
                <div className="lg:hidden absolute w-full bg-[#2DA9E1] text-white flex flex-col items-center p-4">
                    <Link href="/">Home</Link>
                    <Link>Log Out</Link>
                    <Link href="/Courses">Courses</Link>
                    <Link href="/Students">Students</Link>
                    <Link href="/Gallery">Gallery</Link>
                    <Link href="/University">University</Link>
                    <Link href="/CareerGuide">Career Guide</Link>
                    <Link href="/FA_Q">FAQ</Link>
                    <Link href="/About_Us">About Us</Link>
                    <Link href="/Contuct_US">Contact</Link>
                </div>
            )}
        </header>
    );
}
