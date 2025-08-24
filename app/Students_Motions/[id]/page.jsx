'use client'

import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import 'react-tabs/style/react-tabs.css';

import useStudents from '@/hooks/useStudents';
import useMotions from '@/hooks/useMotion';
import useMotion from '@/hooks/useMotion';
import useRegistered from '@/hooks/useRegistered';
import { UserAuth } from '@/app/context/AuthContext';

import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import HelmetHead from '@/app/HelmetHead/HelmetHead';

import img1 from '../../../assets/image1.PNG';
import Image from 'next/image';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';

import CuriculamVite from '@/app/(with-navbar)/componenets/RunningMotionStudents/MotionCV/MotionCV';
import Achivements from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Achivements/Achivements';
import CourseDuration from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/CourseDuration/CourseDuration';
import Certifactes from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Certifactes/Certifactes';
import PortFolio from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/PortFolio/PortFolio';
import GraphicsStudentsGallery from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/GraphicsStudentsGallery/GraphicsStudentsGallery';
import StudentsBlogs from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/StudentsBlogs/StudentsBlogs';
import GraphicsVideos from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/GraphicsVideo/GraphicsVideos';

import './Motion.css';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Page() {

  const { id } = useParams();
  const sidebarRef = useRef(null);
  const searchParams = useSearchParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [students] = useStudents();
  const motions = useMotions();
  const motionsData = useMotion();
  const [register] = useRegistered();
  const { ManualUser } = UserAuth();

  const [countdown, setCountdown] = useState({
    months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, finished: false
  });

  const tabCategories = [
    { name: "Profile (CV)", slug: "profile" },
    { name: "Achievements", slug: "achievements" },
    { name: "Courses", slug: "courses" },
    { name: "Portfolio", slug: "portfolio" },
    { name: "Certificate", slug: "certificate" },
    { name: "Pictures", slug: "pictures" },
    { name: "Videos", slug: "videos" },
    { name: "Blog", slug: "blog" }
  ];

  // Find matched email
  const MatchedEmail = register?.data?.find(profile => profile.email === ManualUser?.email);

  // Update URL with plain email without reloading
  useEffect(() => {
    if (!MatchedEmail?.email) return;

    const currentTab = searchParams.get("tab") || "profile";
    const newUrl = `/Students_Motions/${id}?tab=${currentTab}&email=${MatchedEmail.email}`;
    window.history.replaceState(null, '', newUrl);
  }, [MatchedEmail?.email, id, searchParams]);

  // Set initial tab from URL
  useEffect(() => {
    const tabSlug = searchParams.get("tab");
    if (tabSlug) {
      const foundIndex = tabCategories.findIndex(t => t.slug === tabSlug);
      if (foundIndex !== -1) setActiveTabIndex(foundIndex);
    }
  }, [searchParams]);

  // Countdown timer
  useEffect(() => {
    if (!motionsData || !id) return;

    const student = motionsData.find(motion => motion.id === parseInt(id));
    if (!student) {
      setCountdown({ finished: true });
      return;
    }

    const targetDate = new Date(student.date);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdown({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, finished: true });
        clearInterval(interval);
      } else {
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({ months, days, hours, minutes, seconds, finished: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [motionsData, id]);

  const motion = motions?.find(s => s?.id === Number(id));

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) setIsSidebarOpen(false);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('no-scroll');
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Tab change → update URL while keeping plain email
  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    const slug = tabCategories[index].slug;
    const email = MatchedEmail?.email || '';
    const newUrl = `/Students_Motions/${id}?tab=${slug}${email ? `&email=${email}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  };

  return (
    <>
      <HelmetHead
        title="Graphics Students"
        description="Here have the specific data of Graphics students who have completed the courses"
        keywords="Batch Graphics,CV Education,objective,courses,portfolio,Blog"
        author="Muhibullah"
      />
      <Navbar />

      <main className='lg:mt-16 mt-24 mb-10 overflow-hidden'>
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='relative lg:w-7/12 overflow-hidden rounded-lg mt-5'>
            {motion && (
              <div className='absolute bottom-5 right-6'>
                <a
                  href={motion?.pdfUrl}
                  download
                  className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Download CV
                </a>
              </div>
            )}
            <Image
              src={img1}
              className='mt-4 w-full transition-transform duration-300 ease-in-out'
              alt="Cover Image"
            />
          </div>
        </div>

        <div className='border-b-2 border-slate-200 lg:w-7/12 container mx-auto rounded-xl'>

          {/* Mobile Sidebar Toggle */}
          <div className="block lg:hidden fixed top-64 right-1 z-40">
            <button
              onClick={toggleSidebar}
              className="p-2 bg-[#87d3ec] rounded-full text-white transition-all duration-300 transform hover:scale-110"
            >
              {isSidebarOpen ? <RiArrowLeftSLine size={24} /> : <RiArrowRightSLine size={24} />}
            </button>
          </div>

          {/* Mobile Sidebar */}
          <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-30 lg:hidden transition-transform duration-500 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div ref={sidebarRef} className="w-64 bg-[#17549A] text-white h-full p-4">
              <h2 className="text-lg font-bold">Categories</h2>
              <ul className="flex flex-col">
                {tabCategories.map((category, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 hover:text-black cursor-pointer"
                    onClick={() => handleTabChange(index)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Tabs selectedIndex={activeTabIndex} onSelect={handleTabChange} className='flex flex-col md:flex-row h-auto w-full'>
            {/* Tab List */}
            <TabList className='flex flex-col border-r border-gray-300 cursor-pointer text-white hidden lg:flex bg-[#17549A] w-2/12 h-auto'>
              {motion ? (
                <div className='flex flex-col text-white w-full'>
                  <Image
                    src={motion?.image}
                    alt={motion?.title || 'user profile pic'}
                    className="mt-4 shadow-lg w-10/12 mx-auto transition-transform duration-300 hover:scale-105 mb-8"
                    width={100}
                    height={100}
                    onError={(e) => { e.target.src = 'fallback-image-url.jpg'; }}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center w-9/12 mx-auto lg:mb-5 h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                </div>
              )}
              <div className="flex justify-center">
                <button className='bg-blue-500 text-white rounded-xl w-8/12 h-10 hover:bg-[#44b5e6] transition duration-300 mb-5'>Hire Me</button>
              </div>

              <div className="countdown-timers text-xs">
                {countdown.finished ? (
                  <h2>Target Date Reached</h2>
                ) : (
                  <div className="time flex-col py-5 ml-1">
                    <span>{countdown.months} Months</span>:
                    <span>{countdown.days} Days</span>:
                    <span>{countdown.hours} Hours</span>:
                    <span>{countdown.minutes} Minutes</span>:
                    <span>{countdown.seconds} Seconds</span>
                  </div>
                )}
              </div>

              {tabCategories.map((tab, index) => (
                <Tab key={index} style={{ borderBottom: '1px solid #8dbff7' }} className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600 focus:outline-none'>
                  {tab.name}
                </Tab>
              ))}
            </TabList>

            {/* Tab Panels */}
            <div className='w-full'>
              <TabPanel><CuriculamVite /></TabPanel>
              <TabPanel><Achivements /></TabPanel>
              <TabPanel><CourseDuration /></TabPanel>
              <TabPanel><PortFolio /></TabPanel>
              <TabPanel><Certifactes /></TabPanel>
              <TabPanel><GraphicsStudentsGallery /></TabPanel>
              <TabPanel><GraphicsVideos /></TabPanel>
              <TabPanel><StudentsBlogs /></TabPanel>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
