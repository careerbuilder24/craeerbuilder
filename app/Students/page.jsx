'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import Image from 'next/image';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import Link from 'next/link';
import 'react-tabs/style/react-tabs.css';
import useStudents from '@/hooks/useStudents';
import useMotion from '@/hooks/useMotion';
import useAffiliate from '@/hooks/useAffiliate';
import useVideo from '@/hooks/useVideo';
import useBusiness from '@/hooks/useBusiness';
import useFrontend from '@/hooks/useFrontend';
import useBackend from '@/hooks/useBackend';
import useDigital from '@/hooks/useDigital';
import gif from '../../assets/gif3.gif'

import './Students.css'
import Time from '../Time/Time';
import useDateTime from '@/hooks/useDateTime';
import Loader from '../(with-navbar)/componenets/Loader/Loader';
import GraphicsStudnets from '../(with-navbar)/componenets/StudentsCategories/GraphicsStudnets/GraphicsStudnets';
import MotionStudents from '../(with-navbar)/componenets/StudentsCategories/MotionStudents/MotionStudents';
import AffiliatingStudents from '../(with-navbar)/componenets/StudentsCategories/AffiliatingStudents/AffiliatingStudents';
import VideoMarketingStudents from '../(with-navbar)/componenets/StudentsCategories/VideoMarketingStudents/VideoMarketingStudents';
import BusinessDevelopmentStudents from '../(with-navbar)/componenets/StudentsCategories/BusinessDevelopmentStudnets/BusinessDevelopmentStudnets';
import FrontendDevelopmentStudents from '../(with-navbar)/componenets/StudentsCategories/FrontendDevelopmentStudents/FrontendDevelopmentStudents';
import BackendDevelopmentStudents from '../(with-navbar)/componenets/StudentsCategories/BackendDevelopmentStudents/BackendDevelopmentStudents';
import DigitalMarketingStudents from '../(with-navbar)/componenets/StudentsCategories/DigitalMarketingStudents/DigitalMarketingStudents';
import GraphicsStudents from '../(with-navbar)/componenets/StudentsCategories/GraphicsStudnets/GraphicsStudnets';


// import { Head } from 'next/document';

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const sidebarRef = useRef(null);

  // for mobile Sections
  const handleSidebarItemClick = (index) => {
    setActiveTabIndex(index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  // useEffect for scroll and outside click part for mobile responsive
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

  // Fetching all data
  const [students, loading] = useStudents();
  const Motions = useMotion();
  const Affiliate = useAffiliate();
  const Video = useVideo();
  const business = useBusiness();
  const Frontend = useFrontend();
  const Backend = useBackend();
  const digital = useDigital();

  // Search query and pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  // Function to apply search and pagination for each data type
  const applySearchAndPagination = (data) => {
    // Filter based on search query
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().includes(searchQuery)
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return { currentData, totalPages };
  };

  // Handle page change
  const handlePageChange = (page) => setCurrentPage(page);

  // Reset to page 1 when search query changes or tab changes
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when switching tabs
  }, [activeTabIndex, searchQuery]);

  // Get current data for the active tab
  const { currentData, totalPages } = (() => {
    switch (activeTabIndex) {
      case 1:
        return applySearchAndPagination(Motions);
      case 2:
        return applySearchAndPagination(Affiliate);
      case 3:
        return applySearchAndPagination(Video);
      case 4:
        return applySearchAndPagination(business);
      case 5:
        return applySearchAndPagination(Frontend);
      case 6:
        return applySearchAndPagination(Backend);
      case 7:
        return applySearchAndPagination(digital);
      default:
        return applySearchAndPagination(students);
    }
  })();




  return (
    <main>
      <Navbar />
      <div className='mt-28  bg-gray-100 h-full w-10/12 lg:w-7/12 container mx-auto mb-10'>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-2xl text-[#2CAAE1] whitespace-nowrap">
              All Students
            </h1>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Here.."
            className="px-4 py-2 w-full lg:w-64 xl:w-96 h-10 border-4 rounded-md focus:outline-none focus:border-blue-300"
          />
        </div>


        {/* Mobile Sidebar Toggle Button */}
        <div className="block lg:hidden fixed top-64 right-1 z-40">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-[#87d3ec] rounded-full text-white transition-all duration-300 transform hover:scale-110"
          >
            {isSidebarOpen ? (
              <RiArrowLeftSLine size={24} /> // Left Arrow when sidebar is open
            ) : (
              <RiArrowRightSLine size={24} /> // Right Arrow when sidebar is closed
            )}
          </button>
        </div>
        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-25 z-30 lg:hidden transition-transform duration-500 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div ref={sidebarRef} className="w-44 bg-[#17549A] text-white h-full">
            <h2 className="text-lg font-bold mb-4 text-center">All Students</h2> {/* Add margin bottom here */}
            <ul className="flex flex-col items-center  ">
              {['Graphic Design', 'Motion Graphics', 'Affiliate Marketing', 'Video Editing', 'Business Development', 'Frontend Development', 'Backend Development', 'Digital Marketing'].map((category, index) => (
                <li
                  key={index}
                  className="hover:bg-blue-200 text-[#34E5EB] focus:outline-none hover:text-blue-600 border-b border-[#DDDDDD] w-full h-10 cursor-pointer transition-all duration-200 text-center "
                  onClick={() => handleSidebarItemClick(index)}
                >
                  {category}
                </li>
              ))}
            </ul>

            {/* <div className='flex-col text-center text-2xl mt-4 font-semibold'>
              <h2>Welcome To</h2>
              <h2>Career Builder</h2>
            </div>
            <div className='w-11/12 mt-6 ml-1'>
              <Image src={gif} width={500} height={500} className='rounded-lg' />
            </div> */}
          </div>
        </div>





        <Tabs selectedIndex={activeTabIndex} onSelect={index => setActiveTabIndex(index)} className='flex flex-col lg:flex-row md:flex-row '>

          {/* Tab List */}
          <TabList style={{ width: 300 }} className='flex bg-[#0054a5] w-2/12 h-auto flex-col border-r border-gray-300 cursor-pointer mt-4 hidden  lg:flex sticky top-0 z-10   rounded-md  '>
            <Tab className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] focus:outline-none hover:text-blue-600 mt-5 border-b border-[#DDDDDD]'>Graphic Design</Tab>
            <Tab className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] focus:outline-none hover:text-blue-600  border-b border-[#DDDDDD]'>Motion Graphics</Tab>
            <Tab className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] focus:outline-none hover:text-blue-600  border-b border-[#DDDDDD]'>Affiliate Marketing</Tab>
            <Tab className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] focus:outline-none hover:text-blue-600  border-b border-[#DDDDDD]'>Video Editing</Tab>
            <Tab className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] focus:outline-none hover:text-blue-600  border-b border-[#DDDDDD]'>Business Development</Tab>
            <Tab className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] focus:outline-none hover:text-blue-600  border-b border-[#DDDDDD]'>Frontend Development</Tab>
            <Tab className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] focus:outline-none hover:text-blue-600  border-b border-[#DDDDDD]'>Backend Development</Tab>
            <Tab className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] focus:outline-none hover:text-blue-600  border-b border-[#DDDDDD]'>Digital Marketing</Tab>
          </TabList>

          {/* Tab Panels */}
          <div className='p-4 w-full'>
            <TabPanel>
              {/* tab panel 1 */}
              {/* Graphics Students tab */}
              <GraphicsStudents
                graphics={students}
                searchQuery={searchQuery}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </TabPanel>

            <TabPanel>
              {/* tab panel 2 */}
              {/* Motion Graphics tab */}
              <MotionStudents
                motions={Motions}
                searchQuery={searchQuery}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </TabPanel>

            <TabPanel>
              {/* tab panel 3 */}
              {/* Affiliate Marketing tab */}
              <AffiliatingStudents
                affiliate={Affiliate}
                searchQuery={searchQuery}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />

            </TabPanel>
            <TabPanel>
              {/* tab panel 4 */}
              {/* Video Marketing tab */}
              <VideoMarketingStudents
                videoMarketing={Video}
                searchQuery={searchQuery}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />

            </TabPanel>
            <TabPanel>
              {/* tab panel 5 */}
              {/* businesse  tab */}
              <BusinessDevelopmentStudents
                business={business}
                searchQuery={searchQuery}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </TabPanel>
            <TabPanel>
              {/* tab panel 6 */}
              {/* businesse  tab */}
              <FrontendDevelopmentStudents
                frontend={Frontend}
                searchQuery={searchQuery}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />

            </TabPanel>
            <TabPanel>
              {/* tab panel 7 */}
              {/* Backends  tab */}
              <BackendDevelopmentStudents
                backend={Backend}
                searchQuery={searchQuery}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </TabPanel>
            <TabPanel>
              {/* tab panel 8 */}
              {/* Backends  tab */}
              <DigitalMarketingStudents
                digital={digital}
                searchQuery={searchQuery}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </TabPanel>
          </div>
        </Tabs>


      </div>
      <Footer></Footer>
    </main>
  );
}
