"use client";
import React, { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { ImYoutube2 } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import { LuMenu } from "react-icons/lu";
import { CgCloseO } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { UserAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import logo from "../../../../assets/hv.png";
import userIcon from "../../../../assets/propfilelogo.PNG";
// import useAdminUser from "../../../../hooks/useAdminUser";
import Cookies from "js-cookie";
// import useUserMatching from "@/hooks/useUserMatching";
import useRegistered from "@/hooks/useRegistered";

export default function Navbar() {
  const router = useRouter();
  const { user, logoutAll, ManualUser } = UserAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isStudentsDropdownOpen, setIsStudentsDropdownOpen] = useState(false);

  const [register] = useRegistered();



  // Determine which user is logged in
  const loggedInUser = ManualUser || user || null;

  const userName = ManualUser?.name
    || user?.displayName
    || user?.email?.split("@")[0]
    || "User";

  const userPhoto = ManualUser?.photoURL
    || user?.photoURL
    || userProfile?.photo_url
    || userIcon;




  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`/api/user/profile?email=${user.email}`)
        .then((response) => {
          if (response.data.success) setUserProfile(response.data.data);
        })
        .catch((error) =>
          console.error("Failed to fetch user profile:", error)
        );
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // const handleSignOut = async () => {
  //   try {
  //     await logOut();
  //     sessionStorage.removeItem("manualUser");
  //     Cookies.remove("manualUser");
  //     localStorage.removeItem("blog_draft");
  //     localStorage.removeItem("blogDraft");
  //     setUserProfile(null);

  //     window.location.replace("/log_in");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleSignOut = async () => {
    try {
      await logoutAll();
      sessionStorage.removeItem("manualUser");
      Cookies.remove("manualUser");
      localStorage.removeItem("blog_draft");
      localStorage.removeItem("blogDraft");
      setUserProfile(null);

      window.location.replace("/log_in");
      await logoutAll();
      localStorage.removeItem("blog_draft");
      localStorage.removeItem("blogDraft");
      setUserProfile(null);
      router.push("/log_in"); // better than window.location.replace
    } catch (error) {
      console.log(error);
    }
  };



  // const handleDashboardRedirect = () => {
  //   router.push("/DashBoard/Student");
  // };

  // const handleDashboardRedirect = () => {
  //   const emailFromCookie = Cookies.get("user_email"); // cookie stores email directly

  //   if (emailFromCookie) {
  //     router.push(`/DashBoard/Student?email=${encodeURIComponent(emailFromCookie)}`);
  //   } else {
  //     router.push("/DashBoard/Student");
  //   }
  // };
  const handleDashboardRedirect = () => {
    const emailFromCookie = Cookies.get("user_email"); // stored email

    if (!emailFromCookie) {
      router.push("/log_in");
      return;
    }

    // Find user in register data (assuming you fetch it or have it in context)
    const userData = register?.data?.find(u => u.email === emailFromCookie);

    if (userData) {
      if (userData.role === "Admin") {
        router.push(`/DashBoard/Student/?email=${encodeURIComponent(emailFromCookie)}`);
      } else {
        router.push(`/DashBoard/Student?email=${encodeURIComponent(emailFromCookie)}`);
      }
    } else {
      router.push(`/DashBoard/Student?email=${encodeURIComponent(emailFromCookie)}`);
    }
  };
  // console.log(user?.photoURL)

  return (
    <header className="fixed top-0 w-full z-30 transition-all duration-300">
      {/* Top Contact/Social Bar */}
      <div
        className={`bg-[#122549] flex justify-center items-center gap-10 px-4 lg:px-16 py-2 border-b border-white/20 transition-transform duration-300 ${isTopBarVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
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
      <nav
        className={`flex items-center justify-between h-14 px-4 md:px-8 lg:px-12 bg-[#17549A] shadow-md transition-all duration-300 ${isTopBarVisible ? "mt-0" : "mt-[-37px]"
          }`}
      >
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? (
            <CgCloseO className="text-2xl" />
          ) : (
            <LuMenu className="text-2xl" />
          )}
        </button>

        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={249}
            height={56}
            priority
            className="h-auto w-[249px]"
            placeholder="blur"
          />
        </Link>

        {/* Navbar Links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-white font-medium mr-28">
          <Link href="/" className="hover:text-blue-400 text-sm xl:text-base">
            Home
          </Link>
          <Link
            href="/Courses"
            className="hover:text-blue-400 text-sm xl:text-base"
          >
            Courses
          </Link>

          {/* Students Dropdown */}
          <div className="relative group">
            <Link
              href="/Students"
              className="flex items-center gap-1 hover:text-blue-400 text-sm xl:text-base"
            >
              Students <IoIosArrowDown size={12} />
            </Link>
            <div className="absolute left-0 top-full bg-white text-black shadow-lg hidden group-hover:block min-w-[180px]">
              <ul className="py-2">
                <Link
                  href="/RunningStudents"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Running Students
                </Link>
                <Link
                  href="/RunningIntern"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Running Interns
                </Link>
                <Link
                  href="/RunningEmployee"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Running Employee
                </Link>
              </ul>
            </div>
          </div>

          <Link
            href="/Gallery"
            className="hover:text-blue-400 text-sm xl:text-base"
          >
            Gallery
          </Link>
          <Link
            href="/University"
            className="hover:text-blue-400 text-sm xl:text-base"
          >
            University
          </Link>
          <Link
            href="/StudyAbroad"
            className="hover:text-blue-400 text-sm xl:text-base"
          >
            Study Abroad
          </Link>
          <Link
            href="/LanguageClub"
            className="hover:text-blue-400 text-sm xl:text-base"
          >
            Language
          </Link>
          <Link
            href="/JOBS"
            className="hover:text-blue-400 text-sm xl:text-base"
          >
            Jobs
          </Link>
          <Link
            href="/CareerGuide"
            className="hover:text-blue-400 text-sm xl:text-base"
          >
            Blog
          </Link>
        </div>

        {/* User Profile */}
        {/* <div className="flex items-center space-x-3">
          {ManualUser ? (
            <div className="relative group">
              <div className="flex justify-center items-center text-white gap-2 cursor-pointer">
                <Image
                  src={
                    userProfile?.photo_url ||
                    ManualUser?.photoURL ||
                    userIcon
                  }
                  alt="User"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <p className="hidden lg:block text-sm">{ManualUser.name}</p>
              </div>

            
              <div className="hidden group-hover:block absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/Pro_file"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  Profile
                </Link>

                <button
                  onClick={handleDashboardRedirect}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/log_in"
              className="text-white hover:text-blue-400 font-medium text-sm"
            >
              Login
            </Link>
          )}
        </div> */}

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          {loggedInUser ? (
            <div className="relative group">
              <div className="flex justify-center items-center text-white gap-2 cursor-pointer">
                <Image
                  src={userPhoto}
                  alt="User"
                  width={36}
                  height={36}
                  className="rounded-full"
                  unoptimized
                />
                <p className="hidden lg:block text-sm">{userName}</p>
              </div>

              {/* Dropdown Menu */}
              <div className="hidden group-hover:block absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/Pro_file"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  Profile
                </Link>

                <button
                  onClick={handleDashboardRedirect}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/log_in"
              className="text-white hover:text-blue-400 font-medium text-sm"
            >
              Login
            </Link>
          )}
        </div>

      </nav>

      {/* Mobile Dropdown Menu */}
      {isNavOpen && (
        <div className="lg:hidden absolute w-full bg-[#2DA9E1] text-white flex flex-col items-center p-4 space-y-4 z-50">
          <Link href="/" onClick={() => setIsNavOpen(false)}>
            Home
          </Link>
          <Link href="/Courses" onClick={() => setIsNavOpen(false)}>
            Courses
          </Link>

          <button
            onClick={() => setIsStudentsDropdownOpen(!isStudentsDropdownOpen)}
            className="flex items-center gap-2"
          >
            Students <IoIosArrowDown size={14} />
          </button>
          {isStudentsDropdownOpen && (
            <div className="w-full flex flex-col text-center">
              <Link
                href="/RunningStudents"
                onClick={() => setIsNavOpen(false)}
                className="block py-2"
              >
                Running Students
              </Link>
              <Link
                href="/RunningIntern"
                onClick={() => setIsNavOpen(false)}
                className="block py-2"
              >
                Running Interns
              </Link>
              <Link
                href="/RunningEmployee"
                onClick={() => setIsNavOpen(false)}
                className="block py-2"
              >
                Running Employee
              </Link>
            </div>
          )}

          <Link href="/Gallery" onClick={() => setIsNavOpen(false)}>
            Gallery
          </Link>
          <Link href="/University" onClick={() => setIsNavOpen(false)}>
            University
          </Link>
          <Link href="/CareerGuide" onClick={() => setIsNavOpen(false)}>
            Career Guide
          </Link>
          <Link href="/FA_Q" onClick={() => setIsNavOpen(false)}>
            FAQ
          </Link>
          <Link href="/About_Us" onClick={() => setIsNavOpen(false)}>
            About Us
          </Link>
          <Link href="/Contuct_US" onClick={() => setIsNavOpen(false)}>
            Contact
          </Link>

          {/* Mobile Login/Profile Section */}
          <div className="w-full mt-4 border-t border-white/40 pt-4">
            {ManualUser ? (
              <>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Image
                    src={
                      userProfile?.photo_url ||
                      ManualUser?.photoURL ||
                      userIcon
                    }
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <p>{ManualUser.name}</p>
                </div>
                <Link
                  href="/Pro_file"
                  onClick={() => setIsNavOpen(false)}
                  className="block py-2 text-center hover:underline"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleDashboardRedirect();
                    setIsNavOpen(false);
                  }}
                  className="block w-full text-center py-2 hover:underline"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsNavOpen(false);
                  }}
                  className="block w-full text-center py-2 mt-2 bg-red-600 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/log_in"
                onClick={() => setIsNavOpen(false)}
                className="block text-center py-2 mt-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
