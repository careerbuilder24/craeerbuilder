'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import Image from 'next/image';
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

import './Students.css'
import Time from '../Time/Time';
import useDateTime from '@/hooks/useDateTime';
import Loader from '../(with-navbar)/componenets/Loader/Loader';


// import { Head } from 'next/document';

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const sidebarRef = useRef(null);
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

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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




      <div className='lg:mt-20 bg-gray-100 h-full w-10/12 lg:w-8/12 container mx-auto'>

        <div className='flex flex-col  '>
          <h1 className='text-center text-4xl mt-36 font-bold mb-6 text-[#2CAAE1] '>All Students</h1>
          {/* Search Input */}
          <div className="flex justify-center my-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Here.."
              className="px-4 py-2 w-1/2 sm:w-1/3 border-4 rounded-md focus:outline-none focus:border-blue-300"
            />
          </div>
        </div>
        {/* Mobile Sidebar Toggle Button */}
        <div className='block lg:hidden text-right mb-4'>
          <button onClick={toggleSidebar} className='p-2 bg-blue-500 text-white rounded'>
            {isSidebarOpen ? 'Category' : 'Category'}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div className='fixed inset-0   bg-gray-800 bg-opacity-75 z-50 lg:hidden'>
            <div ref={sidebarRef} className='w-64 bg-[#17549A] text-white h-full p-4'>
              <h2 className='text-lg font-bold'>Categories</h2>
              <ul className='flex flex-col'>
                {['Graphic Design', 'Motion Graphics', 'Affiliate Marketing', 'Video Editing', 'Business Development', 'Frontend Development', 'Backend Development', 'Digital Marketing'].map((category, index) => (
                  <li
                    key={index}
                    className='p-2 hover:bg-gray-200 hover:text-black cursor-pointer'
                    onClick={() => handleSidebarItemClick(index)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}



        <Tabs selectedIndex={activeTabIndex} onSelect={index => setActiveTabIndex(index)} className='flex flex-col lg:flex-row md:flex-row md:mt-40 lg:mt-0'>

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
              {/* Students tab */}
              <div className="container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:mt-0">
                {loading ? (
                  <div className="col-span-full flex justify-center items-center h-full">
                    <Loader />
                  </div>
                ) : (
                  currentData.map((student) => (
                    <div key={student.id}>
                      <Link href={`/Students_Graphics/${student.id}`} className="relative gap-4 overflow-hidden cursor-pointer">
                        <div className="lg:w-full">
                          <img src={student.image} className="w-full rounded-lg" alt="Student" />
                        </div>
                        <div className="absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100">
                          <div className="mt-20 ml-2">
                            <p>Name: {student.name}</p>
                            <p>Batch: {student.batch}</p>
                            <p>Course ID: {student.courseId}</p>
                            <p>Course Name: {student.courseName}</p>
                            <p>Duration: {student.duration}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
              {/* Pagination */}
              <div className="flex justify-center mt-4">
                <nav className="inline-flex items-center space-x-2">
                  <button
                    className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md cursor-pointer"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    &laquo;
                  </button>

                  {[...Array(totalPages).keys()].map((pageIndex) => (
                    <button
                      key={pageIndex + 1}
                      className={`px-4 py-2 bg-[#0054A5] text-white rounded-md hover:bg-[#2CAAE1] ${currentPage === pageIndex + 1 ? 'bg-blue-500 text-white' : ''}`}
                      onClick={() => handlePageChange(pageIndex + 1)}
                    >
                      {pageIndex + 1}
                    </button>
                  ))}

                  <button
                    className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    &raquo;
                  </button>
                </nav>
              </div>
            </TabPanel>

            <TabPanel>
              {/* Motion Graphics tab */}
              <div className="container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:mt-0">
                {loading ? (
                  <div className="col-span-full flex justify-center items-center h-full">
                    <Loader />
                  </div>
                ) : (
                  currentData.map((motion) => (
                    <div key={motion.id}>
                      <Link href={`/Students_Motions/${motion.id}`} className="relative gap-4 overflow-hidden cursor-pointer">
                        <div className="lg:w-full">
                          <img src={motion.image} className="w-full rounded-lg" alt="Motion" />
                        </div>
                        <div className="absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100">
                          <div className="mt-20 ml-2">
                            <p>Name: {motion.name}</p>
                            <p>Batch: {motion.batch}</p>
                            <p>Course ID: {motion.courseId}</p>
                            <p>Course Name: {motion.courseName}</p>
                            <p>Duration: {motion.duration}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
              {/* Pagination */}
              <div className="flex justify-center mt-4">
                <nav className="inline-flex items-center space-x-2">
                  <button
                    className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md cursor-pointer"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    &laquo;
                  </button>

                  {[...Array(totalPages).keys()].map((pageIndex) => (
                    <button
                      key={pageIndex + 1}
                      className={`px-4 py-2 bg-[#0054A5] text-white rounded-md hover:bg-[#2CAAE1] ${currentPage === pageIndex + 1 ? 'bg-blue-500 text-white' : ''}`}
                      onClick={() => handlePageChange(pageIndex + 1)}
                    >
                      {pageIndex + 1}
                    </button>
                  ))}

                  <button
                    className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    &raquo;
                  </button>
                </nav>
              </div>
            </TabPanel>

            <TabPanel>
              {/* Affiliate Marketing tab */}
              <div className="container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:mt-0">
                {loading ? (
                  <div className="col-span-full flex justify-center items-center h-full">
                    <Loader />
                  </div>
                ) : (
                  currentData.map((affiliate) => (
                    <div key={affiliate.id}>
                      <Link href={`/Students_Affiliating/${affiliate.id}`} className="relative gap-4 overflow-hidden cursor-pointer">
                        <div className="lg:w-full">
                          <img src={affiliate.image} className="w-full rounded-lg" alt="Affiliate" />
                        </div>
                        <div className="absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100">
                          <div className="mt-20 ml-2">
                            <p>Name: {affiliate.name}</p>
                            <p>Batch: {affiliate.batch}</p>
                            <p>Course ID: {affiliate.courseId}</p>
                            <p>Course Name: {affiliate.courseName}</p>
                            <p>Duration: {affiliate.duration}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
              {/* Pagination */}
              <div className="flex justify-center mt-4">
                <nav className="inline-flex items-center space-x-2">
                  <button
                    className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md cursor-pointer"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    &laquo;
                  </button>

                  {[...Array(totalPages).keys()].map((pageIndex) => (
                    <button
                      key={pageIndex + 1}
                      className={`px-4 py-2 bg-[#0054A5] text-white rounded-md hover:bg-[#2CAAE1] ${currentPage === pageIndex + 1 ? 'bg-blue-500 text-white' : ''}`}
                      onClick={() => handlePageChange(pageIndex + 1)}
                    >
                      {pageIndex + 1}
                    </button>
                  ))}

                  <button
                    className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    &raquo;
                  </button>
                </nav>
              </div>
            </TabPanel>

            <TabPanel>

              {/* tab panel 4 */}
              <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                {
                  Video?.map(videos => (

                    <div key={videos.id}>
                      <Link href={`/Students_Video/${videos.id}`} className=' relative gap-4 overflow-hidden cursor-pointer'>
                        <div className='lg:w-full'>
                          <img
                            src={videos.image}
                            className='w-full rounded-lg'
                            alt="Instructor"
                          />
                        </div>
                        <div className='absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                          <div className='mt-20 ml-2'>
                            <p>Name: {videos.name}</p>
                            <p>Batch: {videos.batch}</p>
                            <p>Course ID: {videos.courseId}</p>
                            <p>Course Name: {videos.courseName}</p>
                            <p>Duration: {videos.duration}</p>
                            <p>Internship: {videos.internship}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>
            </TabPanel>

            <TabPanel>

              {/* tab panel 5 */}
              <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                {
                  business?.map(businesse => (

                    <div key={businesse.id}>
                      <Link href={`/Students_Business_Development/${businesse.id}`} className=' relative gap-4 overflow-hidden cursor-pointer'>
                        <div className='lg:w-full'>
                          <img
                            src={businesse.image}
                            className='w-full rounded-lg'
                            alt="Instructor"
                          />
                        </div>
                        <div className='absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                          <div className='mt-20 ml-2'>
                            <p>Name: {businesse.name}</p>
                            <p>Batch: {businesse.batch}</p>
                            <p>Course ID: {businesse.courseId}</p>
                            <p>Course Name: {businesse.courseName}</p>
                            <p>Duration: {businesse.duration}</p>
                            <p>Internship: {businesse.internship}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>
            </TabPanel>

            <TabPanel>

              {/* tab panel 6 */}
              <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                {
                  Frontend?.map(Frontends => (

                    <div key={Frontends.id}>
                      <Link href={`/Students_Frontend_Developmet/${Frontends.id}`} className=' relative gap-4 overflow-hidden cursor-pointer'>
                        <div className='lg:w-full'>
                          <img
                            src={Frontends.image}
                            className='w-full rounded-lg'
                            alt="Instructor"
                          />
                        </div>
                        <div className='absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                          <div className='mt-20 ml-2'>
                            <p>Name: {Frontends.name}</p>
                            <p>Batch: {Frontends.batch}</p>
                            <p>Course ID: {Frontends.courseId}</p>
                            <p>Course Name: {Frontends.courseName}</p>
                            <p>Duration: {Frontends.duration}</p>
                            <p>Internship: {Frontends.internship}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>
            </TabPanel>

            <TabPanel>
              {/* tab panel 7 */}
              <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                {
                  Backend?.map(Backends => (

                    <div key={Backends.id}>
                      <Link href={`/Students_Backend_Development/${Backends.id}`} className=' relative gap-4 overflow-hidden cursor-pointer'>
                        <div className='lg:w-full'>
                          <img
                            src={Backends.image}
                            className='w-full rounded-lg'
                            alt="Instructor"
                          />
                        </div>
                        <div className='absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                          <div className='mt-20 ml-2'>
                            <p>Name: {Backends.name}</p>
                            <p>Batch: {Backends.batch}</p>
                            <p>Course ID: {Backends.courseId}</p>
                            <p>Course Name: {Backends.courseName}</p>
                            <p>Duration: {Backends.duration}</p>
                            <p>Internship: {Backends.internship}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>
            </TabPanel>

            <TabPanel>
              {/* tab panel 8 */}
              <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                {
                  digital?.map(digitals => (

                    <div key={digitals.id}>
                      <Link href={`/Students_DigitalMarketing/${digitals.id}`} className=' relative gap-4 overflow-hidden cursor-pointer'>
                        <div className='lg:w-full'>
                          <img
                            src={digitals.image}
                            className='w-full rounded-lg'
                            alt="Instructor"
                          />
                        </div>
                        <div className='absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                          <div className='mt-20 ml-2'>
                            <p>Name: {digitals.name}</p>
                            <p>Batch: {digitals.batch}</p>
                            <p>Course ID: {digitals.courseId}</p>
                            <p>Course Name: {digitals.courseName}</p>
                            <p>Duration: {digitals.duration}</p>
                            <p>Internship: {digitals.internship}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>
            </TabPanel>
          </div>
        </Tabs>
        {/* Pagination */}
      
      </div>
      <Footer></Footer>
    </main>
  );
}
