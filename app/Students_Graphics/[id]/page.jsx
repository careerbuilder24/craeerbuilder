'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import 'react-tabs/style/react-tabs.css';

import useStudents from '@/hooks/useStudents';
import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import img1 from '../../../assets/image1.PNG'





import Image from 'next/image';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import HelmetHead from '@/app/HelmetHead/HelmetHead';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'


import './Graphics.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules



import useMotion from '@/hooks/useMotion';



import CuriculamVite from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/CuriculamVite/CuriculamVite';

import Achivements from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Achivements/Achivements';
import CourseDuration from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/CourseDuration/CourseDuration';
import Certifactes from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Certifactes/Certifactes';
import PortFolio from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/PortFolio/PortFolio';
import GraphicsStudentsGallery from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/GraphicsStudentsGallery/GraphicsStudentsGallery';
import StudentsBlogs from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/StudentsBlogs/StudentsBlogs';




export default function page() {

    // state sections
    const { id } = useParams();
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [students, loading] = useStudents();


    // data calling





    // for time  

    const motionsData = useMotion();  // Get the motion data (array of student objects)

    const [countdown, setCountdown] = useState({
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        finished: false,
    });

    // Use useEffect to filter the data based on the ID from the URL
    useEffect(() => {
        if (motionsData && motionsData.length > 0 && id) {
            // Find the student matching the given ID
            const student = motionsData.find((motion) => motion.id === parseInt(id));  // Assuming `id` is a number

            if (student) {
                const targetDate = new Date(student.date);  // Get the target date of the student

                // Update the countdown every second
                const interval = setInterval(() => {
                    const now = new Date();
                    const difference = targetDate - now;

                    if (difference <= 0) {
                        setCountdown({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, finished: true });
                        clearInterval(interval);
                    } else {
                        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));  // Approximate month length
                        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                        setCountdown({
                            months,
                            days,
                            hours,
                            minutes,
                            seconds,
                            finished: false,
                        });
                    }
                }, 1000); // Update every second

                return () => clearInterval(interval); // Cleanup on component unmount
            } else {
                // Handle case where student data is not found
                setCountdown({ finished: true });  // You can show an appropriate message here
            }
        }
    }, [motionsData, id]);  // Re-run when motionsData or id changes

    // If no student is found with that ID, you can display a message
    // if (!countdown.finished && !countdown.months) {
    //   return <div>Loading student data...</div>;
    // }



    const graphic = students?.find(Onestudent => Onestudent?.id === Number(id));
    // console.log(graphic)
    console.log(students)

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

    // use effect for scroll and outside click part for mobile responsive
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

    // certification filter part
    // modal part

    // modal css






    return (
        <>
            <HelmetHead
                title="Graphics Students"
                description="Here have the specific data of Graphics studens who have comopletde the courses"
                keywords="Batch Graphics,CV Education,objective,courses,portfolio,Blog"
                author="Muhibullah"

            />

            <Navbar></Navbar>



            <main className='lg:mt-40 mt-24 mb-10 overflow-hidden'>

                <div className='w-full flex flex-col justify-center items-center '>
                    <div className='relative lg:w-7/12 overflow-hidden rounded-lg mt-5'>




                        <div className='relative ' />

                        {/* Image */}


                        {
                            graphic ? (
                                <div className='absolute  bottom-5 right-6'>
                                    <a
                                        href={graphic?.pdfUrl}
                                        download
                                        className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                                    >
                                        Download CV
                                    </a>
                                </div>
                            ) : ''
                        }

                        <Image
                            src={img1}
                            className='mt-4 w-full transition-transform duration-300 ease-in-out'
                            alt="Cover Image"
                        />
                    </div>
                </div>



                <div className='  border-b-2 border-slate-200  lg:w-7/12 container mx-auto rounded-xl '>




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
                        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-30 lg:hidden transition-transform duration-500 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        <div ref={sidebarRef} className="w-64 bg-[#17549A] text-white h-full p-4">
                            <h2 className="text-lg font-bold">Categories</h2>
                            <ul className="flex flex-col">
                                {['Profile (CV)', 'Achievements', 'Courses', 'Portfolio', 'Certificate', 'Gallery', 'Blog'].map((category, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-200 hover:text-black cursor-pointer"
                                        onClick={() => handleSidebarItemClick(index)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>




                    <Tabs selectedIndex={activeTabIndex} onSelect={index => setActiveTabIndex(index)} className='flex flex-col   md:flex-row  h-auto w-full'>
                        {/* Tab List */}
                        <TabList className=' flex flex-col border-r border-gray-300 cursor-pointer text-white  hidden  lg:flex bg-[#17549A] w-2/12 h-auto '>
                            {graphic ? (
                                <div className='flex flex-col text-white  w-full '>
                                    <Image
                                        src={graphic?.image}
                                        onDragStart={(e) => e.preventDefault()}
                                        alt={graphic?.title}
                                        className="mt-4 shadow-lg w-10/12 mx-auto transition-transform duration-300 hover:scale-105 mb-8"
                                        width={100}
                                        height={100}


                                        style={{ border: '4px solid #ffffff' }} // Custom border radius
                                        onError={(e) => { e.target.src = 'fallback-image-url.jpg'; }} // Fallback image in case of error
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-center items-center w-9/12 mx-auto lg:mb-5 h-40">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                                </div>
                            )}
                            <div className="flex justify-center ">
                                <button className='bg-blue-500 text-white rounded-xl w-8/12 h-10 hover:bg-[#44b5e6]  transition duration-300 mb-5'>
                                    Hire Me
                                </button>
                            </div>

                            <div className="countdown-timers text-xs">
                                {countdown.finished ? (
                                    <h2>Target Date Reached</h2>
                                ) : (
                                    <>

                                        <div className="time flex-col py-5 ml-1">
                                            <span>{countdown.months} Months</span>:
                                            <span>{countdown.days} Days</span>:
                                            <span>{countdown.hours} Hours</span>:
                                            <span>{countdown.minutes} Minutes</span>:
                                            <span>{countdown.seconds} Seconds</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <Tab style={{ borderBottom: '1px solid #8dbff7' }} className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600   focus:outline-none'>Profile (CV)</Tab>
                            <Tab style={{ borderBottom: '1px solid #8dbff7' }} className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600 focus:outline-none'>Achievements</Tab>
                            <Tab style={{ borderBottom: '1px solid #8dbff7' }} className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600 focus:outline-none'>Courses</Tab>
                            <Tab style={{ borderBottom: '1px solid #8dbff7' }} className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600 focus:outline-none'>Portfolio</Tab>
                            <Tab style={{ borderBottom: '1px solid #8dbff7' }} className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600 focus:outline-none'>Certificate</Tab>
                            <Tab style={{ borderBottom: '1px solid #8dbff7' }} className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600 focus:outline-none'>Gallery</Tab>
                            <Tab style={{ borderBottom: '1px solid #8dbff7' }} className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600 focus:outline-none'>Blog</Tab>
                        </TabList>

                        {/* Tab Panels */}
                        <div className=' w-full'>
                            <TabPanel>

                                {/* tab panel 1 */}

                                {/* Cv part */}
                                <CuriculamVite></CuriculamVite>

                            </TabPanel>

                            {/* tab panel 2  flex-1 h-[600px] overflow-auto*/}
                            <TabPanel>
                                {/* Achivemnets part */}
                                <Achivements></Achivements>

                            </TabPanel>


                            <TabPanel>

                                {/* tab panel 3 */}

                                {/*Course  */}
                                <CourseDuration></CourseDuration>
                            </TabPanel>

                            <TabPanel>
                                {/* tab panel 4 */}

                                {/* Portfolio Part */}
                                <PortFolio></PortFolio>

                            </TabPanel>

                            <TabPanel>

                                {/* tab panel 5 */}


                                {/* certifications */}

                                <Certifactes></Certifactes>

                            </TabPanel>

                            <TabPanel>

                                {/* tab panel 6 */}
                                {/* Gallery section */}
                                <GraphicsStudentsGallery></GraphicsStudentsGallery>

                            </TabPanel>

                            <TabPanel>

                                {/* tab panel 7 */}

                                {/* Blog Sections */}

                                <StudentsBlogs></StudentsBlogs>

                            </TabPanel>

                            <TabPanel>

                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}
