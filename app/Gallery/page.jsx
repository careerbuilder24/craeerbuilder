'use client'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar'
import Footer from '../(with-navbar)/componenets/Footer/Footer'

// import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';



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
import { Head } from 'next/document';
import ButtonTopMaker from '../buttonTopMaker/ButtonTopMaker';
// import TextReveal from '../TextReveal/TextReveal'




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Use a percentage for responsiveness
    maxWidth: 600, // Set a max width for larger screens
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 1,
    borderRadius: '8px', // Optional: Add rounded corners for aesthetics
};


export default function page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const sidebarRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);





    // menu togglebar section

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


    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    
    const handleOpen = (index) => {
        setSelectedImage(Gallery[index]); // Set the selected image based on the clicked index
        setActiveIndex(index); // Set the active index for Swiper
        setOpen(true); // Open the modal
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null); // Clear selected image on close
    };



    // filter those events
    const filterEvents = () => {
        const categories = [
            'All Events',
            'orientation',
            'certification',
            'awards',
            'pohela',
            'eidf',
            'eida',
            'cahrity',
        ];

        if (activeTabIndex === 0) return Gallery; // All events

        const selectedCategory = categories[activeTabIndex];
        return Gallery.filter(event => event.events === selectedCategory.toLowerCase());
    };

    const filteredGallery = filterEvents();

    console.log(filteredGallery)




    return (

        <main>
            <ButtonTopMaker></ButtonTopMaker>
            <Navbar></Navbar>


            <div className='lg:mt-56'>


                <div className='container mx-auto my-9 lg:w-9/12 w-10/12'>

                    <div className='container mx-auto my-9 lg:w-9/12 w-10/12'>


                        {/* Modal Part */}
                        <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <Box sx={style}>
                            {selectedImage && (
                                <Swiper
                                    className="mySwiper"
                                    initialSlide={activeIndex}
                                    spaceBetween={30}
                                    pagination={{ clickable: true }}
                                    navigation={true}
                                    modules={[Navigation]}
                                    onSlideChange={(swiper) => setSelectedImage(filteredGallery[swiper.activeIndex])}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 1,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 1,
                                            spaceBetween: 30,
                                        },
                                        1024: {
                                            slidesPerView: 1,
                                            spaceBetween: 30,
                                        },
                                    }}
                                >
                                    {filteredGallery.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                onDragStart={(e) => e.preventDefault()} // Prevent drag
                                                src={image.image}
                                                className="w-full h-auto rounded-md"
                                                alt={`Slide ${index + 1}`}
                                            />
                                            <div className="relative bottom-11 rounded-md flex-col bg-black opacity-75 p-3">
                                                <time dateTime={image.date} className="text-white text-sm">{image.date}</time>
                                                <h3 className="text-white text-base">{image.description}</h3>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </Box>
                    </Modal>


                    </div>
                    <div className="flex flex-col lg:flex-row gap-10 h-auto">
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
                                            {Gallery?.map((Gallerys, index) => (
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
                                        </div>
                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 2 */}

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
                                        </div>
                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 3 */}

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
                                        </div>
                                    </TabPanel>
                                    <TabPanel>

                                        {/* tab panel 4 */}

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
                                        </div>

                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 5 */}

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
                                        </div>
                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 6 */}

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
                                        </div>
                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 7 */}

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
                                        </div>
                                    </TabPanel>

                                    <TabPanel>

                                        {/* tab panel 8 */}

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
                                        </div>
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
