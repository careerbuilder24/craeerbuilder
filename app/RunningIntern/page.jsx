'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useRouter, useSearchParams } from 'next/navigation';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';
import Link from 'next/link';
import './RunningIntern.css';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import Loader from '../(with-navbar)/componenets/Loader/Loader';

// Utility function to make slug from name
const slugifyName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // spaces → dash
    .replace(/[^\w-]/g, ''); // remove special chars
};

// Reusable student grid
function StudentGrid({
  students,
  searchQuery,
  currentPage,
  handlePageChange,
  itemsPerPage = 12,
  isLoading,
}) {
  if (!Array.isArray(students)) students = [];

  // While fetching
  if (isLoading) {
    return (
      <div className="col-span-full flex justify-center items-center h-40">
        <Loader />
      </div>
    );
  }

  // Filter by search
  const filteredData = students.filter(
    (s) =>
      (s?.fullName || s?.name || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (s?.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      <div className="container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:mt-0">
        {filteredData.length === 0 ? (
          <div className="col-span-full flex justify-center items-center h-40 text-gray-500">
            No interns found
          </div>
        ) : (
          currentData.map((student) => {
            const nameSlug = slugifyName(student.fullName || student.name || 'intern');
            return (
              <div key={student.id} className="relative overflow-hidden rounded-lg">
                <Link href={`/profile/${nameSlug}-${student.id}`} className="block">
                  <img
                    src={student.uploadedImage || student.image}
                    alt={student.fullName || student.name}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                  <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-gray-700 bg-opacity-70 text-white opacity-0 hover:opacity-100 transition duration-500 ease-in-out flex items-center">
                    <div className="p-4">
                      <p>Name: {student.fullName || student.name}</p>
                      <p>Email: {student.email}</p>
                      <p>Phone: {student.phone}</p>
                      <p>Address: {student.address}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="inline-flex items-center space-x-2">
            <button
              className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md cursor-pointer disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &laquo;
            </button>

            {[...Array(totalPages).keys()].map((pageIndex) => (
              <button
                key={pageIndex + 1}
                className={`px-4 py-2 rounded-md ${currentPage === pageIndex + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#0054A5] text-white hover:bg-[#2CAAE1]'
                  }`}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            ))}

            <button
              className="px-4 py-2 bg-[#0054A5] text-white hover:bg-[#2CAAE1] border rounded-md cursor-pointer disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &raquo;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default function RunningInternsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const sidebarRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  //  updated to include isLoading
  const [studentEditProfile, isLoading] = useStudentEditProfile();

  // Tab categories
  const tabCategories = [
    { name: 'All Interns', slug: 'all' },
    { name: 'Graphic Design', slug: 'Students_Graphics' },
    { name: 'Motion Graphics', slug: 'Students_Motions' },
    { name: 'Affiliate Marketing', slug: 'Students_Affiliating' },
    { name: 'Video Editing', slug: 'Students_Video' },
    { name: 'Business Development', slug: 'Students_Business_Development' },
    { name: 'Frontend Development', slug: 'Students_Frontend_Developmet' },
    { name: 'Backend Development', slug: 'Students_Backend_Development' },
    { name: 'Digital Marketing', slug: 'Students_DigitalMarketing' },
  ];

  // Sync tab with URL
  useEffect(() => {
    const tabSlug = searchParams.get('tab');
    if (tabSlug) {
      const index = tabCategories.findIndex((t) => t.slug === tabSlug);
      if (index !== -1) setActiveTabIndex(index);
    }
  }, [searchParams]);

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    setCurrentPage(1);
    router.push(`?tab=${tabCategories[index].slug}`, { scroll: false });
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleSidebarItemClick = (index) => {
    handleTabChange(index);
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

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

  //  Only running interns
  const runningInterns = useMemo(() => {
    return (studentEditProfile?.data || []).filter(
      (s) => s.studentType === 'Running_Interns'
    );
  }, [studentEditProfile]);

  return (
    <main>
      <Navbar />
      <div className="mt-28 bg-gray-100 h-full w-10/12 lg:w-7/12 container mx-auto mb-10">
        {/* Search */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
          <h1 className="text-2xl text-[#2CAAE1] whitespace-nowrap">Running Interns</h1>
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
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-25 z-30 lg:hidden transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div ref={sidebarRef} className="w-44 bg-[#17549A] text-white h-full">
            <h2 className="text-lg font-bold mb-4 text-center">Categories</h2>
            <ul className="flex flex-col items-center">
              {tabCategories.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => handleSidebarItemClick(index)}
                  className={`hover:bg-blue-200 text-[#34E5EB] w-full h-10 cursor-pointer border-b border-[#DDDDDD] text-center pt-2 ${activeTabIndex === index ? 'bg-blue-200 text-blue-600' : ''
                    }`}
                >
                  {tab.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          selectedIndex={activeTabIndex}
          onSelect={handleTabChange}
          className="flex flex-col lg:flex-row mt-4"
        >
          {/* Tab List */}
          <TabList className="flex bg-[#0054a5] w-full md:w-5/12 lg:w-3/12 h-auto flex-col border-r border-gray-300 cursor-pointer hidden lg:flex sticky top-0 z-10 rounded-md">
            {tabCategories.map((tab, index) => (
              <Tab
                key={index}
                className={`p-4 text-left text-[#8dbff7] border-b border-[#DDDDDD] hover:bg-blue-200 hover:text-blue-700 whitespace-nowrap md:whitespace-normal ${activeTabIndex === index ? 'bg-blue-200 text-blue-600' : ''
                  }`}
              >
                {tab.name}
              </Tab>
            ))}
          </TabList>

          {/* Tab Panels */}
          <div className="p-4 w-full">
            {tabCategories.map((tab, index) => {
              // Filter running interns per tab
              const students =
                tab.slug === 'all'
                  ? runningInterns
                  : runningInterns.filter((s) => s.category === tab.slug);

              return (
                <TabPanel key={index}>
                  <StudentGrid
                    students={students}
                    searchQuery={searchQuery}
                    currentPage={currentPage}
                    handlePageChange={setCurrentPage}
                    isLoading={isLoading}
                  />
                </TabPanel>
              );
            })}
          </div>
        </Tabs>
      </div>
      <Footer />
    </main>
  );
}


