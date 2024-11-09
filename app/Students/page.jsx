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


// import { Head } from 'next/document';

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  // use effect for scroll and outside click part
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

  // data rendering

  const student = useStudents();
  const Motions = useMotion();
  const Affiliate = useAffiliate();
  const Video = useVideo();
  const business = useBusiness();
  const Frontend = useFrontend();
  const Backend = useBackend();
  const digital = useDigital();
  const DateTime = useDateTime();






  const handleSidebarItemClick = (index) => {
    setActiveTabIndex(index);
    // Keep the sidebar open when clicking an item
  };




  console.log(student)



  return (
    <main>

      <Navbar />




      <div className='lg:mt-56 bg-gray-100 h-full w-10/12 lg:w-8/12 container mx-auto'>
        <h1 className='text-center text-4xl mt-36 font-bold mb-6'>Running Students</h1>

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



        <Tabs selectedIndex={activeTabIndex} onSelect={index => setActiveTabIndex(index)} className='flex flex-col lg:flex-row md:flex-row md:mt-40 lg:mt-10'>
          {/* Tab List */}
          <TabList style={{ width: 300 }} className='flex flex-col border-r border-gray-300 cursor-pointer mt-4 hidden lg:flex'>
            <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Graphic Design</Tab>
            <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Motion Graphics</Tab>
            <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Affiliate Marketing</Tab>
            <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Video Editing</Tab>
            <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Business Development</Tab>
            <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Frontend Development</Tab>
            <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Backend Development</Tab>
            <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Digital Marketing</Tab>
          </TabList>

          {/* Tab Panels */}
          <div className='p-4 w-full'>
            <TabPanel>
              {/* tab panel 1 */}
              <div className="container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:mt-0">
                {student?.map((students) => (
                  <div key={students.id}>
                    <Link href={`/Students_Graphics/${students.id}`} className="relative gap-4 overflow-hidden cursor-pointer">
                      <div className="lg:w-full">
                        <img
                          src={students.image}
                          className="w-full rounded-lg"
                          alt="Motion Graphics"
                        />
                      </div>
                      <div className="absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100">
                        <div className="mt-20 ml-2">
                          <p>Name: {students.name}</p>
                          <p>Batch: {students.batch}</p>
                          <p>Course ID: {students.courseId}</p>
                          <p>Course Name: {students.courseName}</p>
                          <p>Duration: {students.duration}</p>
                          {/* <div>
                            <p>Target Date: {new Date(students?.date).toLocaleDateString()}</p>
                           
                            <Time targetDate={students?.date} />
                          </div> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </TabPanel>


            <TabPanel>

              {/* tab panel 2 */}

              <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                {
                  Motions?.map(Motion => (

                    <div key={Motions.id}>
                      <Link href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
                        <div className='lg:w-full'>
                          <img
                            src={Motion.image}
                            className='w-full rounded-lg'
                            alt="Instructor"
                          />
                        </div>
                        <div className='absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                          <div className='mt-20 ml-2'>
                            <p>Name: {Motion.name}</p>
                            <p>Batch: {Motion.batch}</p>
                            <p>Course ID: {Motion.courseId}</p>
                            <p>Course Name: {Motion.courseName}</p>
                            <p>Duration: {Motion.duration}</p>
                            <p>Internship: {Motion.internship}</p>

                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>

            </TabPanel>

            <TabPanel>

              {/* tab panel 3 */}

              <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                {
                  Affiliate?.map(Affiliates => (

                    <div key={Affiliates.id}>
                      <Link href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
                        <div className='lg:w-full'>
                          <img
                            src={Affiliates.image}
                            className='w-full rounded-lg'
                            alt="Instructor"
                          />
                        </div>
                        <div className='absolute top-0 lg:w-12/12 w-full h-full left-0 rounded-md bg-gray-700 bg-opacity-70 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                          <div className='mt-20 ml-2'>
                            <p>Name: {Affiliates.name}</p>
                            <p>Batch: {Affiliates.batch}</p>
                            <p>Course ID: {Affiliates.courseId}</p>
                            <p>Course Name: {Affiliates.courseName}</p>
                            <p>Duration: {Affiliates.duration}</p>
                            <p>Internship: {Affiliates.internship}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>
            </TabPanel>

            <TabPanel>

              {/* tab panel 4 */}
              <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                {
                  Video?.map(videos => (

                    <div key={videos.id}>
                      <Link href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
                      <Link href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
                      <Link href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
                      <Link href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
                      <Link href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
      </div>





      <Footer></Footer>
    </main>
  );
}
