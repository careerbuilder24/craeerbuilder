'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import 'react-tabs/style/react-tabs.css';
import { useRouter, useSearchParams } from 'next/navigation';

import useStudents from '@/hooks/useStudents';
import useMotion from '@/hooks/useMotion';
import useAffiliate from '@/hooks/useAffiliate';
import useVideo from '@/hooks/useVideo';
import useBusiness from '@/hooks/useBusiness';
import useFrontend from '@/hooks/useFrontend';
import useBackend from '@/hooks/useBackend';
import useDigital from '@/hooks/useDigital';

import GraphicsStudents from '../(with-navbar)/componenets/StudentsCategories/GraphicsStudnets/GraphicsStudnets';
import MotionStudents from '../(with-navbar)/componenets/StudentsCategories/MotionStudents/MotionStudents';
import AffiliatingStudents from '../(with-navbar)/componenets/StudentsCategories/AffiliatingStudents/AffiliatingStudents';
import VideoMarketingStudents from '../(with-navbar)/componenets/StudentsCategories/VideoMarketingStudents/VideoMarketingStudents';
import BusinessDevelopmentStudents from '../(with-navbar)/componenets/StudentsCategories/BusinessDevelopmentStudnets/BusinessDevelopmentStudnets';
import FrontendDevelopmentStudents from '../(with-navbar)/componenets/StudentsCategories/FrontendDevelopmentStudents/FrontendDevelopmentStudents';
import BackendDevelopmentStudents from '../(with-navbar)/componenets/StudentsCategories/BackendDevelopmentStudents/BackendDevelopmentStudents';
import DigitalMarketingStudents from '../(with-navbar)/componenets/StudentsCategories/DigitalMarketingStudents/DigitalMarketingStudents';

import './Students.css'

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const sidebarRef = useRef(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab categories with slugs
  const tabCategories = [
    { name: 'Graphic Design', slug: 'graphic-design' },
    { name: 'Motion Graphics', slug: 'motion-graphics' },
    { name: 'Affiliate Marketing', slug: 'affiliate-marketing' },
    { name: 'Video Editing', slug: 'video-editing' },
    { name: 'Business Development', slug: 'business-development' },
    { name: 'Frontend Development', slug: 'frontend-development' },
    { name: 'Backend Development', slug: 'backend-development' },
    { name: 'Digital Marketing', slug: 'digital-marketing' },
  ];

  // Set tab from URL param on mount
  useEffect(() => {
    const tabSlug = searchParams.get("tab");
    if (tabSlug) {
      const index = tabCategories.findIndex(t => t.slug === tabSlug);
      if (index !== -1) {
        setActiveTabIndex(index);
      }
    }
  }, [searchParams]);

  // Handle tab change + update URL
  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    const slug = tabCategories[index].slug;
    router.push(`?tab=${slug}`, { scroll: false });
  };

  // for mobile Sections
  const handleSidebarItemClick = (index) => {
    handleTabChange(index);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  // useEffect for scroll and outside click part for mobile responsive
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
  const [students] = useStudents();
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
  const itemsPerPage = 12;

  // Function to apply search and pagination for each data type
  const applySearchAndPagination = (data) => {
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().includes(searchQuery)
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    return { currentData, totalPages };
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTabIndex, searchQuery]);

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
      <div className='mt-28 bg-gray-100 h-full w-10/12 lg:w-7/12 container mx-auto mb-10'>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
          <h1 className="text-2xl text-[#2CAAE1] whitespace-nowrap">All Students</h1>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Here.."
            className="px-4 py-2 w-full lg:w-64 xl:w-96 h-10 border-4 rounded-md focus:outline-none focus:border-blue-300"
          />
        </div>

        {/* Mobile Sidebar Toggle */}
        <div className="block lg:hidden fixed top-64 right-1 z-40">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-[#87d3ec] rounded-full text-white transition-all duration-300 transform hover:scale-110"
          >
            {isSidebarOpen ? <RiArrowLeftSLine size={24} /> : <RiArrowRightSLine size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-25 z-30 lg:hidden transition-transform duration-500 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div ref={sidebarRef} className="w-44 bg-[#17549A] text-white h-full">
            <h2 className="text-lg font-bold mb-4 text-center">All Students</h2>
            <ul className="flex flex-col items-center">
              {tabCategories.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => handleSidebarItemClick(index)}
                  className={`hover:bg-blue-200 text-[#34E5EB] w-full h-10 cursor-pointer border-b border-[#DDDDDD] text-center pt-2 ${activeTabIndex === index ? 'bg-blue-200 text-blue-600' : ''}`}
                >
                  {tab.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tabs */}
        <Tabs selectedIndex={activeTabIndex} onSelect={handleTabChange} className='flex flex-col lg:flex-row'>
          {/* Tab List */}
          <TabList className='flex bg-[#0054a5] w-full md:w-5/12 lg:w-3/12 h-auto flex-col border-r border-gray-300 cursor-pointer mt-4 hidden lg:flex sticky top-0 z-10 rounded-md'>
            {tabCategories.map((tab, index) => (
              <Tab
                key={index}
                className={`p-4 text-left 
        text-[#8dbff7] border-b border-[#DDDDDD] 
        hover:bg-blue-200 hover:text-blue-700 
        whitespace-nowrap md:whitespace-normal 
        ${activeTabIndex === index ? 'bg-blue-200 text-blue-600' : ''}`}
              >
                {tab.name}
              </Tab>
            ))}
          </TabList>




          {/* Tab Panels */}
          <div className='p-4 w-full'>
            <TabPanel>
              <GraphicsStudents graphics={students} searchQuery={searchQuery} currentPage={currentPage} handlePageChange={setCurrentPage} />
            </TabPanel>
            <TabPanel>
              <MotionStudents motions={Motions} searchQuery={searchQuery} currentPage={currentPage} handlePageChange={setCurrentPage} />
            </TabPanel>
            <TabPanel>
              <AffiliatingStudents affiliate={Affiliate} searchQuery={searchQuery} currentPage={currentPage} handlePageChange={setCurrentPage} />
            </TabPanel>
            <TabPanel>
              <VideoMarketingStudents videoMarketing={Video} searchQuery={searchQuery} currentPage={currentPage} handlePageChange={setCurrentPage} />
            </TabPanel>
            <TabPanel>
              <BusinessDevelopmentStudents business={business} searchQuery={searchQuery} currentPage={currentPage} handlePageChange={setCurrentPage} />
            </TabPanel>
            <TabPanel>
              <FrontendDevelopmentStudents frontend={Frontend} searchQuery={searchQuery} currentPage={currentPage} handlePageChange={setCurrentPage} />
            </TabPanel>
            <TabPanel>
              <BackendDevelopmentStudents backend={Backend} searchQuery={searchQuery} currentPage={currentPage} handlePageChange={setCurrentPage} />
            </TabPanel>
            <TabPanel>
              <DigitalMarketingStudents digital={digital} searchQuery={searchQuery} currentPage={currentPage} handlePageChange={setCurrentPage} />
            </TabPanel>
          </div>
        </Tabs>
      </div>
      <Footer />
    </main>
  );
}
