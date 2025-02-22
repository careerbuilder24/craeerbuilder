'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import useStudents from '@/hooks/useStudents';
import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import img1 from '../../../assets/image1.PNG'
import Image from 'next/image';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import HelmetHead from '@/app/HelmetHead/HelmetHead';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import { Mail, MessageCircle } from "lucide-react";
import './Graphics.css'
import 'swiper/css';
import 'swiper/css/navigation';
import useMotion from '@/hooks/useMotion';
import CuriculamVite from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/CuriculamVite/CuriculamVite';
import Achivements from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Achivements/Achivements';
import CourseDuration from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/CourseDuration/CourseDuration';
import Certifactes from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Certifactes/Certifactes';
import PortFolio from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/PortFolio/PortFolio';
import GraphicsStudentsGallery from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/GraphicsStudentsGallery/GraphicsStudentsGallery';
import StudentsBlogs from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/StudentsBlogs/StudentsBlogs';
import GraphicsVideos from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/GraphicsVideo/GraphicsVideos';

export default function Page() {
  const { id } = useParams();
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [students, loading] = useStudents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const motionsData = useMotion();
  const [countdown, setCountdown] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
  });

  const graphic = students?.find(Onestudent => Onestudent?.id === Number(id));

  // Countdown effect
  useEffect(() => {
    if (motionsData && motionsData.length > 0 && id) {
      const student = motionsData.find((motion) => motion.id === parseInt(id));
      if (student) {
        const targetDate = new Date(student.date);
        const interval = setInterval(() => {
          const now = new Date();
          const difference = targetDate - now;
          if (difference <= 0) {
            setCountdown({ ...countdown, finished: true });
            clearInterval(interval);
          } else {
            const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
            const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            setCountdown({ months, days, hours, minutes, seconds, finished: false });
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [motionsData, id]);

  // Mobile sidebar handlers
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
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

  // Modal handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Tab categories
  const tabCategories = [
    "Profile (CV)",
    "Achievements", 
    "Courses",
    "Portfolio",
    "Certificate",
    "Pictures",
    "Videos",
    "Blog"
  ];

  return (
    <>
      <HelmetHead
        title="Graphics Students"
        description="Here have the specific data of Graphics students who have completed the courses"
        keywords="Batch Graphics,CV Education,objective,courses,portfolio,Blog"
        author="Muhibullah"
      />

      <Navbar />

      <main className='lg:mt-40 mt-24 mb-10 overflow-hidden'>
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='relative lg:w-7/12 overflow-hidden rounded-lg mt-5'>
            {graphic && (
              <div className='absolute bottom-5 right-6'>
                <a
                  href={graphic?.pdfUrl}
                  download
                  className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Download CV
                </a>
              </div>
            )}
            <Image
              src={img1}
              className='mt-4 w-full transition-transform duration-300 ease-in-out hidden md:block lg:block'
              alt="Cover Image"
            />
          </div>
        </div>

        <div className='border-b-2 border-slate-200 lg:w-7/12 container mx-auto rounded-xl'>
          {/* Mobile Toggle Button */}
          <div className="block lg:hidden fixed top-64 right-1 z-40">
            <button
              onClick={toggleSidebar}
              className="p-2 bg-[#87d3ec] rounded-full text-white transition-all duration-300 transform hover:scale-110"
            >
              {isSidebarOpen ? <RiArrowLeftSLine size={24} /> : <RiArrowRightSLine size={24} />}
            </button>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-25 z-30 lg:hidden transition-transform duration-500 ease-in-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div ref={sidebarRef} className="w-44 bg-[#17549A] text-white h-full">
              {graphic && (
                <Image
                  src={graphic.image}
                  alt="Student"
                  className="ml-10 mt-4"
                  width={100}
                  height={100}
                  style={{ border: '4px solid #fff' }}
                />
              )}

              <button
                className="bg-blue-500 text-white rounded-xl w-8/12 h-10 hover:bg-[#44b5e6] transition duration-300 m-5 ml-10"
                onClick={openModal}
              >
                Hire Me
              </button>

              <ul className="flex flex-col items-center">
                {tabCategories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveTabIndex(index);
                      setIsSidebarOpen(false);
                    }}
                    className={`hover:bg-blue-200 text-[#34E5EB] w-full h-10 cursor-pointer border-b border-[#DDDDDD] text-center pt-2 ${
                      activeTabIndex === index ? 'bg-blue-200 text-blue-600' : ''
                    }`}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 text-center relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Hire Me</h2>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <textarea
                    placeholder="Your Message"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp Number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-[#122549] text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-transform"
                    >
                      <Mail className="w-5 h-5" /> Send Email
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-transform"
                    >
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 bg-[#17549A] text-white px-6 py-2 rounded-lg hover:bg-[#4887fc] transition-transform"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Desktop Tabs */}
          <Tabs selectedIndex={activeTabIndex} onSelect={setActiveTabIndex} className='flex flex-col md:flex-row h-auto w-full'>
            <TabList className='hidden lg:flex flex-col border-r border-gray-300 bg-[#17549A] w-2/12 h-auto text-white'>
              {graphic && (
                <Image
                  src={graphic.image}
                  alt="Student"
                  className="mt-4 w-10/12 mx-auto mb-8"
                  width={100}
                  height={100}
                  style={{ border: '4px solid #fff' }}
                />
              )}
              <button
                className="bg-blue-500 text-white rounded-xl w-8/12 h-10 hover:bg-[#44b5e6] transition duration-300 mb-5 mx-auto"
                onClick={openModal}
              >
                Hire Me
              </button>
              {tabCategories.map((category, index) => (
                <Tab
                  key={index}
                  className={`p-2 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600 cursor-pointer ${
                    activeTabIndex === index ? 'bg-blue-200 text-blue-600' : ''
                  }`}
                  style={{ borderBottom: '1px solid #8dbff7' }}
                >
                  {category}
                </Tab>
              ))}
            </TabList>

            {/* Tab Content */}
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
  )
}