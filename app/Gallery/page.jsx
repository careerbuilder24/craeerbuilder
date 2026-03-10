
'use client';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Image from 'next/image';
import HelmetHead from '../HelmetHead/HelmetHead';
import ButtonTopMaker from '../buttonTopMaker/ButtonTopMaker';
import Chatbot from '../(with-navbar)/componenets/chatBot/Chatbot';
// // import img2 from '../../assets/gaallrymd.PNG';
import img1 from '../../assets/img6.jpg';
// // import img from '../../assets/sideimage.PNG';
import img2 from '../../assets/sidelogo.jpg';

import useOrientation from '@/hooks/useOrientation';
import useAdminCertificationImage from '@/hooks/useAdminCertificationImage';
import usePohelaboishakImage from '@/hooks/usePohelaboishakImage';
import useEidulfitreImages from '@/hooks/useEidulfitreImages';
import useEidUlAdha from '@/hooks/useEidUlAdha';
import useNewsEvent from '@/hooks/useNewsEvent';
import useCharity from '@/hooks/useCharity';
import useAwardGiving from '@/hooks/useAwardGiving';

export default function GalleryPage() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const { images: orientation } = useOrientation();
  const { Certification: certification } = useAdminCertificationImage();
  const { pohelaBoishakh } = usePohelaboishakImage();
  const { EidulfitreImages } = useEidulfitreImages();
  const { EidUlAdha } = useEidUlAdha();
  const { NewsEventImages } = useNewsEvent();
  const { charity } = useCharity();
  const { AwardGiving } = useAwardGiving();
  const sidebarRef = useRef(null); // <-- add this line

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  const galleryByCategory = {
    'All Events': [
      ...(orientation || []),
      ...(certification || []),
      ...(AwardGiving || []),
      ...(pohelaBoishakh || []),
      ...(EidulfitreImages || []),
      ...(EidUlAdha || []),
      ...(NewsEventImages || []),
      ...(charity || []),
    ],
    orientation: orientation || [],
    certification: certification || [],
    awards: AwardGiving || [],
    pohela: pohelaBoishakh || [],
    eidf: EidulfitreImages || [],
    eida: EidUlAdha || [],
    news: NewsEventImages || [],
    charity: charity || [],
  };

  const categories = [
    'All Events',
    'orientation',
    'certification',
    'awards',
    'pohela',
    'eidf',
    'eida',
    'news',
    'charity',
  ];

  const filteredGallery = galleryByCategory[categories[activeTabIndex]] || [];

  const handleOpen = (index) => {
    setSelectedImage(filteredGallery[index]);
    setActiveIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };




  return (
    <>
      <HelmetHead
        title="Gallery"
        description="Explore a collection of stunning images showcasing our best moments."
        keywords="gallery, pictures, photography, events"
        author="Muhibullah"
      />

      <ButtonTopMaker />
      <Navbar />

      <main className="lg:mt-32 container mx-auto flex flex-col lg:flex-row justify-center gap-6">
        <div className="my-9 w-full lg:w-9/12">

          {/* Modal for Full Image Only */}
          {/* Modal with Swiper Slider */}
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '90vw',
                maxHeight: '90vh',
                p: 0,
                bgcolor: '#000',
                boxShadow: 'none',
                borderRadius: 2,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {filteredGallery.length > 0 && (
                <Swiper
                  modules={[Navigation]}
                  navigation
                  initialSlide={activeIndex}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  className="w-full h-full"
                >
                  {filteredGallery.map((img, idx) => (
                    <SwiperSlide key={idx} className="flex justify-center items-center">
                      <Image
                        src={img.image_url?.trim() || img.image?.trim()}
                        alt={img.title || img.description || "Gallery Image"}
                        width={1600}
                        height={1000}
                        sizes="(max-width: 1024px) 100vw, 90vw"
                        priority={idx === activeIndex}
                        className="rounded-md object-contain max-h-[90vh] bg-black"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </Box>
          </Modal>




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

          {/* Tabs for categories */}
          <Tabs
            selectedIndex={activeTabIndex}
            onSelect={setActiveTabIndex}
            className="flex flex-col lg:flex-row gap-5 justify-center"
          >
            <TabList className="flex flex-col w-2/12 border-r border-gray-300 hidden lg:flex sticky top-0 z-10 bg-[#0054a5] rounded-md">
              {categories.map((cat, idx) => (
                <Tab
                  key={idx}
                  className="p-4 text-left text-[#8dbff7] hover:bg-blue-200 hover:text-blue-600 focus:outline-none mt-5"
                >
                  {cat.replace(/^\w/, (c) => c.toUpperCase())}
                </Tab>
              ))}
            </TabList>

            <div className="flex-1 overflow-auto">
              {categories.map((cat, idx) => (
                <TabPanel key={idx}>
                  <div className="flex flex-wrap justify-center gap-4">
                    {(galleryByCategory[cat] || []).map((item, index) => (
                      <div
                        key={index}
                        className="relative w-full sm:w-[48%] lg:w-[48%] cursor-pointer rounded-md overflow-hidden"
                        onClick={() => handleOpen(index)}
                      >
                        <div className="w-full h-60 relative">
                          <Image
                            src={item.image_url?.trim() || item.image?.trim()}
                            alt={item.title || item.description}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-md"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-70 p-2 text-left">
                          <time className="text-white text-sm block">
                            {item.created_at || item.date || 'No Date'}
                          </time>
                          <h3 className="text-white text-base">
                            {item.title || item.description}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>

                </TabPanel>
              ))}
            </div>
          </Tabs>



        </div>
        {/* right side  */}
        <div className="w-full lg:w-1/5 rounded h-auto bg-white sticky top-0">
          <div className=' shadow-xl rounded  mt-5 '>
            <div className='ml-4'>
              <h3 className='text-[#0054a5] font-semibold mt-3'>Graphics Orientation Class</h3>
              <p> <time dateTime="2008-02-14 20:00" className='text-[#0054a5] text-sm'>Time: 06:00 PM </time></p>
              <p> <time dateTime="2008-02-14 20:00" className='text-[#0054a5] text-sm'>Date:17 Novembmer 2024 </time></p>
              <hr className='w-10 h-1 bg-[#0054a6] mb-7' />

              <div className='w-full h-full relative overflow-hidden group cursor-pointer'>
                <Image
                  width={400}
                  height={400}
                  src={img1}
                  alt='Gallery Image second part'
                  className='w-full lg:w-11/12 h-full object-cover '
                />

                <div className='bg-[#B1AFB2] opacity-80 relative bottom-7 text-black font-bold w-11/12'>
                  CAREER BUILDER
                </div>
              </div>




            </div>

            {/* Mobile Sidebar Toggle Button */}
            <div className='block lg:hidden text-right mb-4'>
              <button onClick={toggleSidebar} className='p-2 bg-blue-500 text-white rounded'>
                {isSidebarOpen ? 'Category' : 'Category'} L
              </button>
            </div>

          </div>
          <div className=' shadow-xl rounded  mt-5 '>
            <div className='ml-4'>
              <h3 className='text-[#0054a5] font-semibold mt-3'>Motion Graphics Orientation Class</h3>
              <p> <time dateTime="2008-02-14 20:00" className='text-[#0054a5] text-sm'>Time: 06:00 PM </time></p>
              <p> <time dateTime="2008-02-14 20:00" className='text-[#0054a5] text-sm'>Date:17 Novembmer 2024 </time></p>
              <hr className='w-10 h-1 bg-[#0054a6] mb-7' />

              <div className='w-full h-full relative overflow-hidden group cursor-pointer'>
                <Image
                  width={400}
                  height={400}
                  src={img1}
                  alt='Gallery Image third part'
                  className='w-full lg:w-11/12 h-full object-cover '
                />

                <div className='bg-[#B1AFB2] opacity-80 relative bottom-7 text-black font-bold w-11/12'>
                  CAREER BUILDER
                </div>
              </div>




            </div>

          </div>
          <div className='shadow-xl rounded mt-5 hover:bg-blue-400  group-hover:backdrop-blur-3xl transition duration-300 p-4'>

            <div className='w-full h-full relative overflow-hidden group cursor-pointer '>
              <Image
                width={400}
                height={400}
                src={img2}
                alt='Gallery Image fourth part'
                className='w-full  h-full object-cover '
              />

            </div>

          </div>

        </div>
      </main>

      <Footer />
      <Chatbot />
    </>
  );
}

