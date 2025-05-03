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

  //  https://careers-builder.vercel.app


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
          <span>+8809644222111</span>
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
      <nav className={`flex items-center justify-between h-14 px-4 md:px-8 lg:px-12 bg-[#17549A] shadow-md transition-all duration-300 ${isTopBarVisible ? 'mt-0' : 'mt-[-37px]'}`}>
        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? <CgCloseO className="text-2xl" /> : <LuMenu className="text-2xl" />}
        </button>

        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            className="w-32 md:w-36 lg:w-40 h-auto min-w-[128px] flex-shrink-0"
          />
        </Link>


        {/* Navbar Links */}
        {/* <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-white font-medium mr-28 whitespace-nowrap overflow-x-auto scrollbar-hide">
 */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-white font-medium mr-28">
          <Link href="/" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>Home</Link>
          <Link href="/Courses" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>Courses</Link>

          {/* Students Dropdown */}
          <div className="relative group">
            <Link href={'/Students'} className="flex items-center gap-1 px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base">
              Students <IoIosArrowDown size={12} />
            </Link>
            <div className="absolute left-0 top-full bg-white text-black shadow-lg hidden group-hover:block min-w-[180px]">
              <ul className="py-2">
                <Link href="/RunningStudents" className="block px-4 py-2 hover:bg-gray-100 text-sm">Running Students</Link>
                <Link href="/RunningIntern" className="block px-4 py-2 hover:bg-gray-100 text-sm">Running Interns</Link>
                <Link href="/RunningEmployee" className="block px-4 py-2 hover:bg-gray-100 text-sm">Running Employee</Link>
              </ul>
            </div>
          </div>

          <Link href="/Gallery" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>Gallery</Link>
          <Link href="/University" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>University</Link>
          <Link href="/CareerGuide" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>Blog</Link>
          <Link href="/FA_Q" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>FAQ</Link>
          <Link href="/About_Us" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>About</Link>
          <Link href="/Contuct_US" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>Contact</Link>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">

          {/* testing */}
          <Link
            href="/DashBoard/Student"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>
          {ManualUser ? (
            <div className="relative group">
              <div className='flex justify-center items-center text-white gap-2 cursor-pointer'>
                <Image
                  src={userProfile?.photo_url || ManualUser?.photoURL || userIcon}
                  alt="User"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <p className='hidden lg:block text-sm'>{ManualUser.name}</p>
              </div>

              {/* Dropdown Menu */}
              <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>

                <Link
                  href="/DashBoard/Student"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>

                <button
                  // onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/log_in" className="text-white hover:text-blue-400 transition-colors font-medium text-sm">
              Login
            </Link>
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
