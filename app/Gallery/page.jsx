'use client'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar'
import Footer from '../(with-navbar)/componenets/Footer/Footer'

import instrastor from '../../assets/insta.avif';
import instrastor1 from '../../assets/insta1.avif';
import instrastor2 from '../../assets/insta3.avif';


// image part


import img1 from '../../assets/gallery3.PNG';
import img4 from '../../assets/gl1.jpg';
import img5 from '../../assets/gl2.jpg';
// import img2 from '../../assets/gaallrymd.PNG';
import img3 from '../../assets/img6.jpg';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import useGallery from '@/hooks/useGallery';
import Image from 'next/image'
// import TextReveal from '../TextReveal/TextReveal'

export default function page() {
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

    const Gallery = useGallery();

    console.log(Gallery)



    const handleSidebarItemClick = (index) => {
        setActiveTabIndex(index);

    };

    console.log(Gallery)




    return (
        <main>
            <Navbar></Navbar>


            <div className='lg:mt-56'>


                <div className='container mx-auto my-9 lg:w-9/12 w-10/12'>
                    <div className="flex flex-row gap-10 h-auto">
                        <div className="w-full   bg-white  mb-4 lg:mb-0 shadow-lg p-4 rounded">

                            <h1 className='text-center text-4xl mt-5 font-bold mb-6'>Picture Gallery</h1>

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



                            <Tabs selectedIndex={activeTabIndex} onSelect={index => setActiveTabIndex(index)} className='flex flex-col lg:flex-row md:flex-row md:mt-40 lg:mt-5'>
                                {/* Tab List */}
                                <TabList style={{ width: 300 }} className='flex flex-col border-r border-gray-300 cursor-pointer mt-4 hidden lg:flex'>
                                    <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>All Events</Tab>
                                    <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Orientation</Tab>
                                    <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Certification</Tab>
                                    <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Awards Giving</Tab>
                                    <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Pohela Boishakh</Tab>
                                    <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Eidal-Fitr</Tab>
                                    <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Eid al-Adha</Tab>
                                    <Tab className='p-4 text-left hover:bg-gray-200 focus:outline-none'>Charity Programe</Tab>
                                </TabList>

                                {/* Tab Panels */}
                                <div className=' w-full'>
                                    <TabPanel>

                                        {/* tab panel 1 */}

                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
                                            {
                                                Gallery?.map(Gallery => (

                                                    <div key={Gallery.id}>
                                                        <div className=' relative gap-4 overflow-hidden cursor-pointer'>
                                                            <div className='lg:w-full'>
                                                                <img src={Gallery.image} className='w-full h-full rounded-md'></img>
                                                            </div>
                                                            <div className='relative bottom-11 rounded-md flex-col  bg-black opacity-75 '>
                                                                <div className='ml-3'>
                                                                    <time datetime="2008-02-14 20:00" className='text-white text-sm'>{Gallery.date}</time>

                                                                    <h3 className='text-white text-base'>{Gallery.description} </h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>






                                        {/* <div className='flex flex-col md:flex-row lg:flex-row  gap-5 '>

                                            {
                                                Gallery.map(Gallerys => {
                                                    <div key={Gallerys.id}>



                                                        <img src={Gallerys.image} className=' rounded-md'></img>
                                                        <div className='relative bottom-12 flex-col  bg-black opacity-75 '>
                                                            <div className='ml-3'>
                                                                <time datetime="2008-02-14 20:00" className='text-white'>{Gallerys.date}</time>

                                                                <h3 className='text-white'>{Gallerys.description} </h3>
                                                            </div>
                                                        </div>

                                                    </div>

                                                })
                                            }








                                        </div> */}








                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 2 */}

                                        <div className='flex flex-col md:flex-row lg:flex-row  gap-5 '>

                                            <div>



                                                <Image src={img1} className=' rounded-md'></Image>
                                                <div className='relative bottom-12 flex-col  bg-black opacity-75 '>
                                                    <div className='ml-3'>
                                                        <time datetime="2008-02-14 20:00" className='text-white'>19/06/2024</time>

                                                        <h3 className='text-white'>Orientation class: Graphic Design (2) </h3>
                                                    </div>
                                                </div>

                                            </div>

                                            <div>
                                                <Image src={img5} className=' rounded-md'></Image>
                                                <div className='relative bottom-12 flex-col  bg-black opacity-75 '>
                                                    <div className='ml-3'>
                                                        <time datetime="2008-02-14 20:00" className='text-white'>19/06/2024</time>

                                                        <h3 className='text-white'>Orientation class: Web Development  (2) </h3>
                                                    </div>
                                                </div>
                                            </div>




                                        </div>

                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 3 */}

                                        {/* <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                                            {
                                                Affiliate?.map(Affiliates => (

                                                    <div key={Affiliates.id}>
                                                        <div href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div> */}
                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 4 */}
                                        {/* <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                                            {
                                                Video?.map(videos => (

                                                    <div key={videos.id}>
                                                        <div href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div> */}
                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 5 */}
                                        {/* <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                                            {
                                                business?.map(businesse => (

                                                    <div key={businesse.id}>
                                                        <div href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div> */}
                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 6 */}
                                        {/* <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                                            {
                                                Frontend?.map(Frontends => (

                                                    <div key={Frontends.id}>
                                                        <div href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div> */}
                                    </TabPanel>

                                    <TabPanel>
                                        {/* tab panel 7 */}
                                        {/* <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                                            {
                                                Backend?.map(Backends => (

                                                    <div key={Backends.id}>
                                                        <div href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div> */}
                                    </TabPanel>

                                    <TabPanel>
                                        {/* tab panel 8 */}
                                        {/* <div className='container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:mt-0'>
                                            {
                                                digital?.map(digitals => (

                                                    <div key={digitals.id}>
                                                        <div href={'/StudentsDetails'} className=' relative gap-4 overflow-hidden cursor-pointer'>
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
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div> */}
                                    </TabPanel>
                                </div>
                            </Tabs>



                        </div>

                        <div className="w-full  lg:w-1/5  rounded h-auto lg:h-[2000px] bg-white  ">










                            <div className=' shadow-xl rounded py-10 mt-5'>
                                <div className='ml-4'>
                                    <p className='text-[#0054a5] font-semibold mt-3'>UP COMING EVENTS</p>
                                    <hr className='w-10 h-1 bg-[#0054a6] mb-7' />


                                    <p className='text-[#0054a5]  mt-3 text-center font-bold'>IT Feast</p>
                                    <div className='w-full h-full relative overflow-hidden group cursor-pointer'>
                                        <Image
                                            src={img3}
                                            className='w-full lg:w-11/12 h-full object-cover transition-all duration-300 group-hover:filter-none filter grayscale'
                                        />

                                        <div className='bg-green-600 opacity-80 relative bottom-7 text-white font-bold w-11/12'>
                                            CAREER BUILDER
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <Footer></Footer>
        </main>
    )
}
