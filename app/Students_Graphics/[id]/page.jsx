'use client'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
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





export default function page() {

    // pdf
    
    

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const student = useStudents();
    const { id } = useParams();

    const graphic = student.find(Onestudent => Onestudent?.id === Number(id));
    console.log(graphic)

    return (
        <main>
            <Navbar></Navbar>

            <div className='mt-44 mb-10 '>
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



                <div className='  border-b-2 border-slate-200  w-7/12 container mx-auto rounded-xl '>
                    <Tabs selectedIndex={activeTabIndex} onSelect={index => setActiveTabIndex(index)} className='flex flex-col  md:flex-row   w-full'>
                        {/* Tab List */}
                        <TabList className='flex flex-col border-r border-gray-300 cursor-pointer text-white  hidden  lg:flex bg-[#17549A] w-2/12 '>
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
                            <Tab className='p-4 text-left hover:bg-blue-200 hover:text-blue-600  focus:outline-none'>All Events</Tab>
                            <Tab className='p-4 text-left hover:bg-blue-200 hover:text-blue-600 focus:outline-none'>Orientation</Tab>
                            <Tab className='p-4 text-left hover:bg-blue-200 hover:text-blue-600 focus:outline-none'>Certification</Tab>
                            <Tab className='p-4 text-left hover:bg-blue-200 hover:text-blue-600 focus:outline-none'>Awards Giving</Tab>
                            <Tab className='p-4 text-left hover:bg-blue-200 hover:text-blue-600 focus:outline-none'>Pohela Boishakh</Tab>
                            <Tab className='p-4 text-left hover:bg-blue-200 hover:text-blue-600 focus:outline-none'>Eidal-Fitr</Tab>
                            <Tab className='p-4 text-left hover:bg-blue-200 hover:text-blue-600 focus:outline-none'>Eid al-Adha</Tab>
                            <Tab className='p-4 text-left hover:bg-blue-200 hover:text-blue-600 focus:outline-none'>Charity Programe</Tab>
                        </TabList>

                        {/* Tab Panels */}
                        <div className=' w-full'>
                            <TabPanel>

                                {/* tab panel 1 */}

                                <div className='flex flex-col lg:flex-row   '>

                                    <div className='bg-white lg:w-7/12'>
                                        <p className='text-2xl text-red-400 font-bold text-center '>Professional Profile</p>
                                        <p className=' my-5 text-sm px-2'>Dynamic and results-oriented professional with a proven track record in [your industry/field]. Possessing strong skills in [specific skills or technologies], I excel in driving projects to completion and delivering innovative solutions. With [number] years of experience in [specific roles or sectors], I am adept at [mention key responsibilities or achievements]. Committed to continuous learning and professional development, I thrive in fast-paced environments and collaborate effectively with diverse teams to achieve organizational goals.</p>

                                        <p className='text-2xl text-red-400 font-bold my-4 text-center'>Education</p>
                                        <div className='flex flex-row lg:ml-16 gap-3 '>
                                            <p><strong>9 GCSEs including English </strong></p>
                                            <p className='text-sm'> | London Bridge</p>
                                        </div>
                                        <div className='flex flex-row  gap-3 text-sm ml-16'>
                                            <p>Comprehensive School </p>
                                            <p className='text-sm'> | Sep 2021 - May 2023</p>
                                        </div>
                                        <div className='flex flex-row  gap-1 text-sm ml-16'>
                                            <p>Predicted Grades (6),</p>
                                            <p> Mathematuics (7),</p>
                                            <p> Scince (6),</p>
                                            <p>Art (6),</p>
                                        </div>
                                        <div className='text-sm  my-5 ml-16'>
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

                                        <div className='flex flex-row ml-3 gap-5 font-bold  text-sm '>
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
                                        <div className='ml-3 text-sm'>
                                            <p>Outline</p>
                                            <p>Support the Action Aid CCancer Charity Shop to fundraise by going door to door for contributions, rising over $600 for Charity with 12 weeks</p>
                                        </div>

                                        <p className='text-2xl text-red-400 font-bold my-4 text-center'>Additional</p>

                                        <div className='ml-3 text-sm'>
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

                                    <div className='bg-[#44b5e6] lg:w-5/12   rounded-lg'>

                                        {graphic ? (
                                            <div className='flex flex-col   w-full '>
                                                <div className='w-ful mt-4 text-white'>
                                                    <Image
                                                        src={graphic.image}
                                                        onDragStart={(e) => e.preventDefault()}
                                                        alt={graphic.title}
                                                        className="mt-4 shadow-lg w-10/12 mx-auto transition-transform duration-300 hover:scale-105 mb-8  "
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
                                                    <hr className='w-80 h-1  ml-5' />
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

                            <TabPanel>

                                {/* tab panel 2 */}

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

                                {/* tab panel 3 */}

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
                                {/* 
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
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


            </div>
            <Footer></Footer>
        </main>
    )
}
