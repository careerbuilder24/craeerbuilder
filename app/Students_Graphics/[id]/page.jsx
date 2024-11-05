'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import 'react-tabs/style/react-tabs.css';
import useStudents from '@/hooks/useStudents';
import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import img1 from '../../../assets/image1.PNG'
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaEarthAfrica } from "react-icons/fa6";
import Image from 'next/image';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import HelmetHead from '@/app/HelmetHead/HelmetHead';
import useDetailsCourse from '@/hooks/useDetailsCourse';

import './Graphics.css'
import Link from 'next/link';
import useGallery from '@/hooks/useGallery';
import usePortfolio from '@/hooks/usePortfolio';



export default function page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sidebarRef = useRef(null);


    // data calling
    const portfolio = usePortfolio();
    const course = useDetailsCourse();
    const achivements = useGallery();



    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const student = useStudents();
    const { id } = useParams();

    const graphic = student.find(Onestudent => Onestudent?.id === Number(id));
    // console.log(graphic)
    console.log(portfolio)

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
                                        href={graphic.pdfUrl}
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
                                    {['Profile (CV)', 'Achievements', 'Courses', 'Portfolio', 'Certificate', 'Gallery', 'Blog'].map((category, index) => (
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

                    <Tabs selectedIndex={activeTabIndex} onSelect={index => setActiveTabIndex(index)} className='flex flex-col   md:flex-row   w-full'>
                        {/* Tab List */}
                        <TabList className='flex flex-col border-r border-gray-300 cursor-pointer text-white  hidden  lg:flex bg-[#17549A] w-2/12 h-[1045px] '>
                            {graphic ? (
                                <div className='flex flex-col text-white  w-full '>
                                    <Image
                                        src={graphic.image}
                                        onDragStart={(e) => e.preventDefault()}
                                        alt={graphic.title}
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

                                <div className='flex flex-col-reverse lg:flex-row '>

                                    <div className='  lg:w-8/12'>
                                        <p className='text-2xl text-red-400 font-bold text-center '>Objective</p>
                                        <p className=' my-5 text-sm px-2'>Dynamic and results-oriented professional with a proven track record in [your industry/field]. Possessing strong skills in [specific skills or technologies], I excel in driving projects to completion and delivering innovative solutions. With [number] years of experience in [specific roles or sectors], I am adept at [mention key responsibilities or achievements]. Committed to continuous learning and professional development, I thrive in fast-paced environments and collaborate effectively with diverse teams to achieve organizational goals.</p>

                                        <p className='text-2xl text-red-400 font-bold my-4 text-center'>Education</p>
                                        <div className='flex flex-row lg:ml-16 ml-5 gap-3 '>
                                            <p><strong>9 GCSEs including English </strong></p>
                                            <p className='text-sm'> | London Bridge</p>
                                        </div>
                                        <div className='flex  flex-row  gap-3 text-sm lg:ml-16 ml-5'>
                                            <p>Comprehensive School </p>
                                            <p className='text-sm'> | Sep 2021 - May 2023</p>
                                        </div>
                                        <div className='flex flex-col lg:flex-row  gap-1 text-sm lg:ml-16 ml-5'>
                                            <p>Predicted Grades (6),</p>
                                            <p> Mathematuics (7),</p>
                                            <p> Scince (6),</p>
                                            <p>Art (6),</p>
                                        </div>
                                        <div className='text-sm  my-5 lg:ml-16 ml-5'>
                                            <p>Extracurricular Activites:</p>
                                            <p>-Talented musician, achieving Grade 7 Piano and Grade 5 flute.</p>
                                            <p>-Captain of the school netball team for the 4 seasons which connected of 2 separate age groups. 11-13 and 14-16</p>
                                            <p>-Acted as mentor for years 1 and 2.</p>
                                            <p>-Looked after the school and ensured all areas reminder clean an Environment Perfect</p>
                                            <p>Memberships</p>
                                            <p>-Member of the school club attending various national champion</p>
                                            <p>as a piano player for the school chair.</p>
                                            <p>-Member of the school club</p>
                                        </div>


                                        <p className='text-2xl text-red-400 font-bold my-4 text-center ml-16'>Career Summery</p>

                                        <div className='flex flex-col lg:flex-row lg:ml-3 ml-5 lg:gap-5 gap-2 font-bold  text-sm '>
                                            <p>
                                                <strong>May 2022 - Aug 2022</strong>
                                            </p>
                                            <div className='flex flex-col'>
                                                <p>
                                                    <strong>Action Aid Cancer Charity, London</strong>
                                                </p>
                                                <p><strong>
                                                    Volountry Fundraiser</strong></p>
                                            </div>

                                        </div>
                                        <div className='lg:ml-3 ml-5 mt-4 text-sm'>
                                            <p>Outline</p>
                                            <p>Support the Action Aid CCancer Charity Shop to fundraise by going door to door for contributions, rising over $600 for Charity with 12 weeks</p>
                                        </div>

                                        <p className='text-2xl text-red-400 font-bold my-4 text-center'>Additional</p>

                                        <div className='lg:ml-3 ml-6 mb-10 lg:mb-0 text-sm '>
                                            <p className='font-bold'><strong>Awards</strong></p>
                                            <p className='mt-1 mb-3'>Winner of the London Bridge Comperative School Geography Awards 2020</p>

                                            <p>Participated in the UK Young Competition 2022 as part of the London</p>
                                            <p>Bridge Comphrensive School Chair was took 1st place</p>
                                            <p className='my-1 font-bold'><strong>Software</strong></p>
                                            <p > MS Word, MS Excel, MS Powerpoint</p>
                                            <p className='my-1 font-bold'><strong>Language</strong></p>
                                            <p>English (native), Spanish(conversational)</p>
                                        </div>
                                    </div>

                                    <div className='bg-[#44b5e6] lg:w-4/12    rounded-lg '>

                                        {graphic ? (
                                            <div className='flex flex-col   w-full h-full '>
                                                <div className='w-ful mt-4 text-white'>
                                                    <Image
                                                        src={graphic.image}
                                                        onDragStart={(e) => e.preventDefault()}
                                                        alt={graphic.title}
                                                        className="mt-4 shadow-lg w-10/12 mx-auto mb-8  "
                                                        width={100}
                                                        height={100}

                                                        style={{ border: '4px solid #ffffff', }} // Custom border radius
                                                        onError={(e) => { e.target.src = 'fallback-image-url.jpg'; }} // Fallback image in case of error
                                                    />
                                                    <p className='text-center text-2xl font-bold'>{graphic.name}</p>
                                                    <p className='text-xl text-center'>Student</p>
                                                    <p className='text-center mt-20 text-xl font-bold mb-2'>Contact Details</p>
                                                    <hr className='w-96 h-1  ml-1' />
                                                    <div className='flex flex-row gap-2 justify-center items-center  mt-1'>
                                                        <BsFillTelephoneFill className='text-white' />
                                                        <p>+88017535366</p>
                                                    </div>
                                                    <div className='flex flex-row gap-2 justify-center items-center'>
                                                        <AiOutlineMail className='text-white my-3' />
                                                        <p>abula@gmail.com</p>
                                                    </div>
                                                    <div className='flex flex-row gap-2 justify-center items-center'>
                                                        <FaEarthAfrica className='text-white' />
                                                        <p>London</p>
                                                    </div>

                                                    <p className='text-center mt-20 text-xl font-bold mb-2'>Core Skills</p>
                                                    <hr className='w-80 h-1  ' />
                                                    <div className='flex mt-3 ml-5'>
                                                        <GoDotFill className='mt-1 text-sm mr-3' />
                                                        <p>Communication and delegation</p>
                                                    </div>
                                                    <div className='flex mt-2 ml-5'>
                                                        <GoDotFill className='mt-1 text-sm mr-3' />
                                                        <p>Fundraising experience</p>
                                                    </div>
                                                    <div className='flex  ml-5 mt-2'>
                                                        <GoDotFill className=' text-sm mr-3' />
                                                        <p>Captain of the school netball team</p>
                                                    </div>
                                                    <div className='flex  ml-5 mt-2'>
                                                        <GoDotFill className=' text-sm mr-3' />
                                                        <p>Member of the school piano club</p>
                                                    </div>
                                                    <div className='flex  ml-5 mt-2'>
                                                        <GoDotFill className=' text-sm mr-3' />
                                                        <p>School coding national competitor</p>
                                                    </div>
                                                    <div className='flex  ml-5 mt-2'>
                                                        <GoDotFill className=' text-sm mr-3' />
                                                        <p>IT skills - predicted 6 at GCSE</p>
                                                    </div>
                                                </div>

                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center w-9/12 mx-auto lg:mb-5 h-40">
                                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
                                            </div>
                                        )}
                                    </div>

                                </div>


                            </TabPanel>

                            {/* tab panel 2  flex-1 h-[600px] overflow-auto*/}
                            <TabPanel>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-4 h-[1000px] overflow-auto w-full mt-3'>
                                    {achivements?.map((achivement) => (
                                        <div key={achivement.id}>
                                            <div className='relative gap-4 overflow-hidden cursor-pointer'>
                                                <div className='lg:w-full'>
                                                    <img
                                                        width={600}
                                                        height={400}
                                                        src={achivement.image}

                                                        className='w-full h-full rounded-md'
                                                    />
                                                </div>
                                                <div className='relative bottom-11 rounded-md flex-col bg-black opacity-75'>
                                                    <div className='ml-3'>
                                                        <time datetime="2008-02-14 20:00" className='text-white text-sm'>{achivement.date}</time>
                                                        <h3 className='text-white text-base'>{achivement.description}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </TabPanel>


                            <TabPanel>

                                {/* tab panel 3 */}

                                {/* courses  */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border-collapse border text-sm border-gray-200">
                                        <thead className="bg-gray-800 text-white">
                                            <tr>
                                                <th className="border border-gray-200 p-2 text-center">Start Date</th>
                                                <th className="border border-gray-200 p-2 text-center">End Date</th>
                                                <th className="border border-gray-200 p-2 text-center">Title</th>
                                                <th className="border border-gray-200 p-2 text-center">Duration</th>
                                                <th className="border border-gray-200 p-2 text-center">Details</th>
                                                <th className="border border-gray-200 p-2 text-center">Certificate</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {course?.map((courses) => (
                                                <tr key={courses.id}>
                                                    <td className="border bg-[#3082df]  text-white border-gray-200 p-2 text-center">{courses.startDate}</td>
                                                    <td className="border bg-[#3082df] text-white border-gray-200 p-2 text-center">{courses.endDate}</td>
                                                    <td className="border bg-[#3082df] text-white border-gray-200 p-2 text-center">{courses.title}</td>
                                                    <td className="border bg-[#3082df] text-white border-gray-200 p-2 text-center">{courses.duration}</td>
                                                    <td className="border bg-[#79b0ee]  text-white border-gray-200 p-2 text-center">{courses.details}</td>
                                                    <td className="border bg-[#79b0ee] text-white border-gray-200 p-2 text-center"><Link href={'/Cer_tificate'} className='hover:underline'>Show</Link></td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
                                            {filteredGallery?.map((Gallerys, index) => (
                                                <div key={Gallerys.id}>
                                                    <div className='relative gap-4 overflow-hidden cursor-pointer'>
                                                        <div className='lg:w-full'>
                                                            <img
                                                                width={600}
                                                                height={400}
                                                                src={Gallerys.image}
                                                                onClick={() => handleOpen(index)}
                                                                className='w-full h-full rounded-md'
                                                            />
                                                        </div>
                                                        <div className='relative bottom-11 rounded-md flex-col bg-black opacity-75'>
                                                            <div className='ml-3'>
                                                                <time datetime="2008-02-14 20:00" className='text-white text-sm'>{Gallerys.date}</time>
                                                                <h3 className='text-white text-base'>{Gallerys.description}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> */}
                            </TabPanel>
                            <TabPanel>
                                {/* tab panel 4 */}
                                <div className={'border-2'}>
                                    <Tabs className="my-5">
                                        <TabList className="flex justify-center items-center space-x-4">
                                            <Tab className="cursor-pointer p-2 border-2 transition-all duration-200 hover:border-blue-500 focus:outline-blue-500 hover:bg-blue-100 selected:bg-blue-200">
                                                All Works
                                            </Tab>
                                            <Tab className="cursor-pointer p-2 border-2 transition-all duration-200 hover:border-blue-500 focus:outline-blue-500 hover:bg-blue-100 selected:bg-blue-200">
                                                Html and CSS Work
                                            </Tab>
                                            <Tab className="cursor-pointer p-2 border-2 transition-all duration-200 hover:border-blue-500 focus:outline-blue-600 hover:bg-blue-100 selected:bg-blue-200">
                                                Figma to React Work
                                            </Tab>
                                        </TabList>

                                        {/* Tab Panels */}
                                        <TabPanel>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                                {portfolio.map((portfolios) => (
                                                    <div key={portfolios.id} className="card w-96 bg-base-100 shadow-xl">
                                                        <figure className="relative overflow-hidden">
                                                            {/* Image with scrolling effect on hover */}
                                                            <img
                                                                className="w-full transition-transform duration-500 ease-in-out transform hover:translate-y-80"
                                                                src={portfolios.image}
                                                                alt="Portfolio"
                                                            />
                                                        </figure>
                                                        <div className="card-body">
                                                            <h2 className="card-title"> {portfolios.title} </h2>
                                                            <p>Price: ${portfolios.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <h1>hello2</h1>
                                        </TabPanel>
                                        <TabPanel>
                                            <h1>hello3</h1>
                                        </TabPanel>
                                        <TabPanel>
                                            <h1>hello4</h1>
                                        </TabPanel>
                                    </Tabs>

                                </div>
                            </TabPanel>

                            <TabPanel>

                                {/* tab panel 5 */}

                                {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
                                            {filteredGallery?.map((Gallerys, index) => (
                                                <div key={Gallerys.id}>
                                                    <div className='relative gap-4 overflow-hidden cursor-pointer'>
                                                        <div className='lg:w-full'>
                                                            <img
                                                                width={600}
                                                                height={400}
                                                                src={Gallerys.image}
                                                                onClick={() => handleOpen(index)}
                                                                className='w-full h-full rounded-md'
                                                            />
                                                        </div>
                                                        <div className='relative bottom-11 rounded-md flex-col bg-black opacity-75'>
                                                            <div className='ml-3'>
                                                                <time datetime="2008-02-14 20:00" className='text-white text-sm'>{Gallerys.date}</time>
                                                                <h3 className='text-white text-base'>{Gallerys.description}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> */}
                            </TabPanel>

                            <TabPanel>

                                {/* tab panel 6 */}

                                {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
                                            {filteredGallery?.map((Gallerys, index) => (
                                                <div key={Gallerys.id}>
                                                    <div className='relative gap-4 overflow-hidden cursor-pointer'>
                                                        <div className='lg:w-full'>
                                                            <img
                                                                width={600}
                                                                height={400}
                                                                src={Gallerys.image}
                                                                onClick={() => handleOpen(index)}
                                                                className='w-full h-full rounded-md'
                                                            />
                                                        </div>
                                                        <div className='relative bottom-11 rounded-md flex-col bg-black opacity-75'>
                                                            <div className='ml-3'>
                                                                <time datetime="2008-02-14 20:00" className='text-white text-sm'>{Gallerys.date}</time>
                                                                <h3 className='text-white text-base'>{Gallerys.description}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> */}
                            </TabPanel>

                            <TabPanel>

                                {/* tab panel 7 */}

                                {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
                                            {filteredGallery?.map((Gallerys, index) => (
                                                <div key={Gallerys.id}>
                                                    <div className='relative gap-4 overflow-hidden cursor-pointer'>
                                                        <div className='lg:w-full'>
                                                            <img
                                                                width={600}
                                                                height={400}
                                                                src={Gallerys.image}
                                                                onClick={() => handleOpen(index)}
                                                                className='w-full h-full rounded-md'
                                                            />
                                                        </div>
                                                        <div className='relative bottom-11 rounded-md flex-col bg-black opacity-75'>
                                                            <div className='ml-3'>
                                                                <time datetime="2008-02-14 20:00" className='text-white text-sm'>{Gallerys.date}</time>
                                                                <h3 className='text-white text-base'>{Gallerys.description}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> */}
                            </TabPanel>

                            <TabPanel>

                                {/* tab panel 8 */}

                                {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
                                            {filteredGallery?.map((Gallerys, index) => (
                                                <div key={Gallerys.id}>
                                                    <div className='relative gap-4 overflow-hidden cursor-pointer'>
                                                        <div className='lg:w-full'>
                                                            <img
                                                                width={600}
                                                                height={400}
                                                                src={Gallerys.image}
                                                                onClick={() => handleOpen(index)}
                                                                className='w-full h-full rounded-md'
                                                            />
                                                        </div>
                                                        <div className='relative bottom-11 rounded-md flex-col bg-black opacity-75'>
                                                            <div className='ml-3'>
                                                                <time datetime="2008-02-14 20:00" className='text-white text-sm'>{Gallerys.date}</time>
                                                                <h3 className='text-white text-base'>{Gallerys.description}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> */}
                            </TabPanel>
                        </div>
                    </Tabs>


                </div>


            </main>
            <Footer></Footer>
        </>
    )
}
