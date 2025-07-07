'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from 'next/image';
import Navbar from '../componenets/Navbar/Navbar';
import Footer from '../componenets/Footer/Footer';
import 'react-tabs/style/react-tabs.css';
import Link from 'next/link';
import useAbroadStudy from '@/hooks/useAbroadStudy';

export default function UniversityPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const sidebarRef = useRef(null);
  const { data } = useAbroadStudy();

  const countries = Object.keys(data || {});

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const handleApplyClick = (university) => {
    setSelectedUniversity(university);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUniversity(null);
  };

  if (!data || countries.length === 0) {
    return <div className='text-center mt-40 text-xl'>Loading universities...</div>;
  }

  return (
    <main>
      <Navbar />
      <div className='mt-28 bg-gray-100 w-11/12 lg:w-8/12 container mx-auto mb-10'>
        <div className="text-center text-3xl font-bold text-blue-500 mb-6">Study Abroad</div>

        {/* Sidebar toggle (Mobile only) */}
        <div className="block lg:hidden fixed top-64 right-1 z-40">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-blue-500 rounded-full text-white hover:scale-110 transition"
          >
            {isSidebarOpen ? 'Close' : 'Categories'}
          </button>
        </div>

        {/* Sidebar Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-30">
            <div ref={sidebarRef} className="w-44 bg-blue-800 text-white h-full p-4">
              <ul className="space-y-2">
                {countries.map((country, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer p-2 rounded ${activeTabIndex === index ? 'bg-blue-600' : ''}`}
                    onClick={() => {
                      setActiveTabIndex(index);
                      setIsSidebarOpen(false);
                    }}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tabs UI */}
        <Tabs selectedIndex={activeTabIndex} onSelect={setActiveTabIndex} className='flex flex-col lg:flex-row'>
          <TabList className='hidden lg:flex flex-col bg-blue-700 text-white w-48 rounded-md mt-4'>
            {countries.map((country, index) => (
              <Tab
                key={index}
                className={`p-3 cursor-pointer border-b border-blue-500 hover:bg-blue-500 ${activeTabIndex === index ? 'bg-blue-600' : ''}`}
              >
                {country}
              </Tab>
            ))}
          </TabList>

          <div className='p-4 w-full'>
            {countries.map((country, index) => (
              <TabPanel key={index}>
                <h2 className='text-2xl font-semibold mb-4 text-blue-600'>{country} Universities</h2>
                <div className='flex flex-col gap-4'>
                  {data[country]?.map((university) => (
                    <Link
                      href={`/DetailsAbroad/${university.id}`}
                      passHref
                      key={university.id}
                      className='bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition w-full'
                    >
                      <div className='flex items-center gap-4'>
                        <Image
                          src={university.logo}
                          alt={university.name}
                          width={50}
                          height={50}
                          className='object-contain flex-shrink-0'
                        />
                        <div>
                          <div className='font-semibold text-sm sm:text-base'>{university.name}</div>
                          <div className='text-gray-500 text-xs sm:text-sm'>Tuition: {university.tuition}</div>
                          <div className='text-yellow-500 text-xs sm:text-sm'>⭐ {university.review} / 5.0</div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // prevent link navigation
                          handleApplyClick(university);
                        }}
                        className='bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700'
                      >
                        Apply
                      </button>
                    </Link>
                  ))}
                </div>
              </TabPanel>
            ))}
          </div>
        </Tabs>
      </div>

      {/* Modal */}
      {showModal && selectedUniversity && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>Apply to {selectedUniversity.name}</h2>
            <form className='space-y-4'>
              <input type='text' placeholder='Full Name' className='w-full p-2 border rounded' />
              <input type='email' placeholder='Email' className='w-full p-2 border rounded' />
              <input type='text' placeholder='Phone Number' className='w-full p-2 border rounded' />
              <input type='text' placeholder='Address' className='w-full p-2 border rounded' />
              <input type='text' placeholder='Education Qualification' className='w-full p-2 border rounded' />
              <input type='text' placeholder='CGPA' className='w-full p-2 border rounded' />
              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
