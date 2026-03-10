'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import HelmetHead from '@/app/HelmetHead/HelmetHead';
import Image from 'next/image';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { Mail, MessageCircle } from "lucide-react";
import './Graphics.css';

import CuriculamVite from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/CuriculamVite/CuriculamVite';
import Achivements from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Achivements/Achivements';
import CourseDuration from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/CourseDuration/CourseDuration';
import Certifactes from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Certifactes/Certifactes';
import PortFolio from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/PortFolio/PortFolio';
import GraphicsStudentsGallery from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/GraphicsStudentsGallery/GraphicsStudentsGallery';
import StudentsBlogs from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/StudentsBlogs/StudentsBlogs';
import GraphicsVideos from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/GraphicsVideo/GraphicsVideos';
import img1 from '../../../assets/image1.PNG';
import Loader from '@/app/(with-navbar)/componenets/Loader/Loader';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';
import useRegistered from '@/hooks/useRegistered';
import { UserAuth } from '@/app/context/AuthContext';
import './Graphics.css';

export default function GraphicsStudentPage() {
  const { slug, id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sidebarRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [studentEditProfile] = useStudentEditProfile();
  const [register] = useRegistered();
  const { ManualUser } = UserAuth();

  const students = studentEditProfile?.data || [];
  const student = useMemo(
    () => students.find(s => s.id === Number(id)),
    [students, id]
  );

  const MatchedEmail = register?.data?.find(profile => profile.email === ManualUser?.email);

  const tabCategories = [
    { name: "Profile (CV)", slug: "profile" },
    { name: "Achievements", slug: "achievements" },
    { name: "Courses", slug: "courses" },
    { name: "Portfolio", slug: "portfolio" },
    { name: "Certificate", slug: "certificate" },
    { name: "Pictures", slug: "pictures" },
    { name: "Videos", slug: "videos" },
    { name: "Blog", slug: "blog" }
  ];

  // Clean slug generator
  const formatSlug = (text) =>
    text?.trim().replace(/\s+/g, "_").toLowerCase() || "student";

  // Set active tab from URL
  useEffect(() => {
    const tabSlug = searchParams.get("tab");
    if (tabSlug) {
      const foundIndex = tabCategories.findIndex(t => t.slug === tabSlug);
      if (foundIndex !== -1) setActiveTabIndex(foundIndex);
    }
  }, [searchParams]);

  // Update URL with slug + tab + email
  useEffect(() => {
    if (!student) return;
    const currentTab = searchParams.get("tab") || "profile";
    const slugName = formatSlug(student.name || "student");
    const email = MatchedEmail?.email ? `&email=${MatchedEmail.email}` : "";
    const newUrl = `/Students_Graphics/${slugName}/${id}?tab=${currentTab}${email}`;
    window.history.replaceState(null, "", newUrl);
  }, [student, MatchedEmail?.email, id, searchParams]);

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    if (!student) return;
    const slug = tabCategories[index].slug;
    const slugName = formatSlug(student.name || "student");
    const email = MatchedEmail?.email ? `&email=${MatchedEmail.email}` : "";
    const newUrl = `/Students_Graphics/${slugName}/${id}?tab=${slug}${email}`;
    window.history.replaceState(null, "", newUrl);
  };

  // Sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("no-scroll");
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  if (!student) return <Loader />;

  return (
    <>
      <HelmetHead
        title={`${student.name} - Student Details`}
        description={`Profile and details of student ${student.name}`}
        keywords="student profile, portfolio, courses, achievements"
        author="Muhibullah"
      />
      <Navbar />

      <main className="lg:mt-16 mt-24 mb-10 overflow-hidden">
        {/* Cover */}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="relative md:w-full lg:w-7/12 overflow-hidden rounded-lg mt-5 container">
            {student.pdfUrl && (
              <div className="absolute bottom-5 right-6">
                <a
                  href={student.pdfUrl}
                  download
                  className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Download CV
                </a>
              </div>
            )}
            <div className="relative w-full h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden mt-5">
              <Image src={img1} alt="cover Image" fill className="object-cover" priority />
            </div>
          </div>
        </div>

        {/* Tabs + Sidebar */}
        <div className="border-b-2 border-slate-200 lg:w-7/12 container mx-auto rounded-xl relative">
          {/* Mobile toggle */}
          <div className="block lg:hidden fixed top-64 right-1 z-40">
            <button
              onClick={toggleSidebar}
              className="p-2 bg-[#87d3ec] rounded-full text-white transition-all duration-300 transform hover:scale-110"
            >
              {isSidebarOpen ? <RiArrowLeftSLine size={24} /> : <RiArrowRightSLine size={24} />}
            </button>
          </div>

          {/* Mobile sidebar */}
          <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-25 z-30 lg:hidden transition-transform duration-500 ease-in-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div ref={sidebarRef} className="w-44 bg-[#17549A] text-white h-full">
              <Image
                src={student.uploadedImage}
                alt={student.name}
                width={100}
                height={100}
                className="mx-auto mt-4 "
              />
              <button
                className="bg-blue-500 text-white rounded-xl w-8/12 h-10 hover:bg-[#44b5e6] transition duration-300 m-5 mx-auto"
                onClick={() => setIsModalOpen(true)}
              >
                Hire Me
              </button>
              <ul className="flex flex-col items-center">
                {tabCategories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleTabChange(index);
                      setIsSidebarOpen(false);
                    }}
                    className={`hover:bg-blue-200 w-full h-10 cursor-pointer border-b border-[#DDDDDD] text-center pt-2 ${
                      activeTabIndex === index ? "bg-blue-200 text-blue-600" : "text-[#34E5EB]"
                    }`}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop tabs */}
          <Tabs selectedIndex={activeTabIndex} onSelect={handleTabChange} className="flex flex-col md:flex-row h-auto w-full">
            <TabList className="hidden lg:flex flex-col border-r border-gray-300 bg-[#17549A] w-2/12 h-auto text-white">
              <Image
                src={student.uploadedImage}
                alt={student.name}
                width={100}
                height={100}
                className="mt-4 mx-auto border-2 border-white"
              />
              <button
                className="bg-blue-500 text-white rounded-xl w-8/12 h-10 hover:bg-[#44b5e6] transition duration-300 mb-5 mx-auto mt-5"
                onClick={() => setIsModalOpen(true)}
              >
                Hire Me
              </button>
              {tabCategories.map((tab, index) => (
                <Tab
                  key={index}
                  className={`p-2 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600 cursor-pointer ${
                    activeTabIndex === index ? "bg-blue-200 text-blue-600" : ""
                  }`}
                >
                  {tab.name}
                </Tab>
              ))}
            </TabList>

            {/* Panels */}
            <div className="w-full">
              <TabPanel><CuriculamVite student={student} /></TabPanel>
              <TabPanel><Achivements student={student} /></TabPanel>
              <TabPanel><CourseDuration student={student} /></TabPanel>
              <TabPanel><PortFolio student={student} /></TabPanel>
              <TabPanel><Certifactes student={student} /></TabPanel>
              <TabPanel><GraphicsStudentsGallery student={student} /></TabPanel>
              <TabPanel><GraphicsVideos student={student} /></TabPanel>
              <TabPanel><StudentsBlogs student={student} /></TabPanel>
            </div>
          </Tabs>
        </div>
      </main>

      <Footer />
    </>
  );
}
