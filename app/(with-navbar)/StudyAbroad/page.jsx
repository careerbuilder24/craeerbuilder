'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from 'next/image';
import 'react-tabs/style/react-tabs.css';
import useAbroadStudy from '@/hooks/useAbroadStudy';
import Footer from '../componenets/Footer/Footer';
import Navbar from '../componenets/Navbar/Navbar';
import ButtonTopMaker from '@/app/buttonTopMaker/ButtonTopMaker';
import HelmetHead from '@/app/HelmetHead/HelmetHead';
import Link from 'next/link';

export default function UniversityPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [expandedUniversityId, setExpandedUniversityId] = useState(null);

  const sidebarRef = useRef(null);
  const { data } = useAbroadStudy();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    cgpa: '',
  });

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
    setForm({ name: '', email: '', phone: '', education: '', cgpa: '' });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for ${selectedUniversity.name}`);
    closeModal();
  };

  const toggleDetails = (id) => {
    setExpandedUniversityId(prev => (prev === id ? null : id));
  };

  if (!data || countries.length === 0) {
    return <div className='text-center mt-40 text-xl'>Loading universities...</div>;
  }

  return (
    <>
      <HelmetHead
        title="Study Abroad - Explore Top International Universities"
        description="Browse and apply to top international universities from USA, Canada, UK, and more. Explore tuition, reviews, and program details."
        keywords="study abroad, international universities, university application, global education, apply abroad"
        author="Career Builder"
      />

      <main>
        <Navbar />
        <section className='mt-28 container mx-auto px-4 mb-10'>
          <h1 className="text-center text-3xl font-bold text-blue-500 mb-6">Study Abroad</h1>

          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left: Main University Content */}
            <div className='flex-1 bg-gray-100 p-4 rounded-lg'>
              {/* Sidebar Toggle for Mobile */}
              <div className="block lg:hidden fixed top-64 right-1 z-40">
                <button
                  onClick={toggleSidebar}
                  className="p-2 bg-blue-500 rounded-full text-white hover:scale-110 transition"
                  aria-label="Toggle Country Filter"
                >
                  {isSidebarOpen ? 'Close' : 'Categories'}
                </button>
              </div>

              {/* Sidebar Drawer */}
              {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-30">
                  <nav ref={sidebarRef} className="w-44 bg-blue-800 text-white h-full p-4">
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
                  </nav>
                </div>
              )}

              {/* Tabs */}
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
                          <article
                            key={university.id}
                            onClick={() => toggleDetails(university.id)}
                            className='bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition w-full cursor-pointer'
                          >
                            <header className='flex items-center justify-between'>
                              <div className='flex items-center gap-4'>
                                <Image
                                  src={university.logo}
                                  alt={`${university.name} logo`}
                                  width={50}
                                  height={50}
                                  className='object-contain flex-shrink-0'
                                />
                                <div>
                                  <h3 className='font-semibold text-sm sm:text-base'>{university.name}</h3>
                                  <p className='text-gray-500 text-xs sm:text-sm'>Tuition: {university.tuition}</p>
                                  <p className='text-yellow-500 text-xs sm:text-sm'>⭐ {university.review} / 5.0</p>
                                </div>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplyClick(university);
                                }}
                                className='bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700'
                                aria-label={`Apply to ${university.name}`}
                              >
                                Apply
                              </button>
                            </header>

                            {expandedUniversityId === university.id && (
                              <section className='mt-4 space-y-6'>
                                <Image src={university.imageOne} width={800} height={400} className='w-full rounded shadow' alt="campus" />
                                <p className='text-sm sm:text-base text-justify'>{university.descriptionOne}</p>

                                <div className='flex flex-col lg:flex-row gap-6'>
                                  <div className='lg:w-1/2'>
                                    <p className='text-sm sm:text-base text-justify'>{university.descriptionTwo}</p>
                                    <Image src={university.imageTwo} width={600} height={400} className='rounded shadow mt-2' alt="image 2" />
                                  </div>
                                  <div className='lg:w-1/2'>
                                    <Image src={university.imageThree} width={600} height={400} className='rounded shadow mb-2' alt="image 3" />
                                    <p className='text-sm sm:text-base text-justify'>{university.descriptionThree}</p>
                                  </div>
                                </div>

                                <div className='flex flex-col-reverse lg:flex-row gap-6'>
                                  <p className='text-sm sm:text-base lg:w-1/2 text-justify'>{university.descriptionFour}</p>
                                  <Image src={university.imageFour} width={600} height={400} className='rounded shadow lg:w-1/2' alt="image 4" />
                                </div>
                              </section>
                            )}
                          </article>
                        ))}
                      </div>
                    </TabPanel>
                  ))}
                </div>
              </Tabs>
            </div>

            {/* Right: Advertisement Section */}
            <aside className="w-full lg:w-72 order-3 bg-white p-4 rounded shadow text-center h-fit lg:sticky lg:top-28 lg:max-h-[calc(100vh-7rem)] overflow-auto space-y-6">
              <h2 className="text-xl font-semibold mb-4">Sponsored</h2>

              <div className="flex justify-center mb-2">
                <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  100% FREE
                </span>
              </div>
              <Link
                href="https://coursya.com/product/coursera/launch-your-online-business/?utm_source=LinkedIn%20&utm_campaign=pm"
                className="group bg-gray-200 rounded p-4 shadow flex flex-col items-center hover:bg-gray-400 cursor-pointer ease-in-out duration-300"
              >
                <img src="https://i.postimg.cc/T1YHBvM9/sfgoj.png" alt="Ad 1" className="mb-3 rounded w-full object-cover" />
                <p className="text-gray-700 mb-2 group-hover:text-white ease-in-out duration-300">
                  Boost your career with <strong className="group-hover:text-white">SkillUp Academy</strong>!
                </p>
                <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Learn More</div>
              </Link>

              <Link href="https://www.datacamp.com/" className="group bg-gray-200 rounded p-4 shadow flex flex-col items-center hover:bg-gray-400 cursor-pointer ease-in-out duration-300">
                <img src="https://i.postimg.cc/pr5McPh7/ewrj.png" alt="Ad 2" className="mb-3 rounded w-full object-cover" />
                <p className="text-gray-700 mb-2 group-hover:text-white">Join <strong>DataCamp</strong> and become a data science pro in 3 months.</p>
                <div className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">Try Free</div>
              </Link>

              <Link href="https://www.fiverr.com/" className="group bg-gray-200 rounded p-4 shadow flex flex-col items-center hover:bg-gray-400 cursor-pointer ease-in-out duration-300">
                <img src="https://i.postimg.cc/kGGgJrVF/sergoj.png" alt="Ad 3" className="mb-3 rounded w-full object-cover" />
                <p className="text-gray-700 mb-2 group-hover:text-white">Kickstart your freelancing career with <strong>Fiverr Pro</strong>.</p>
                <div className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">Get Started</div>
              </Link>
            </aside>
          </div>
        </section>

        {/* Modal */}
        {showModal && selectedUniversity && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-lg w-full max-w-md'>
              <h2 className='text-xl font-bold mb-4'>Apply to {selectedUniversity.name}</h2>
              <form className='space-y-4' onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Full Name' value={form.name} onChange={handleChange} className='w-full p-2 border rounded' required />
                <input type='email' name='email' placeholder='Email' value={form.email} onChange={handleChange} className='w-full p-2 border rounded' required />
                <input type='text' name='phone' placeholder='Phone Number' value={form.phone} onChange={handleChange} className='w-full p-2 border rounded' required />
                <input type='text' name='education' placeholder='Education Qualification' value={form.education} onChange={handleChange} className='w-full p-2 border rounded' required />
                <input type='text' name='cgpa' placeholder='CGPA' value={form.cgpa} onChange={handleChange} className='w-full p-2 border rounded' required />
                <div className='flex justify-end gap-2'>
                  <button type='button' onClick={closeModal} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>Cancel</button>
                  <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <ButtonTopMaker />
        <Footer />
      </main>
    </>
  );
}
