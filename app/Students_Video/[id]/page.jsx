// Page.js (student detail page)
'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import useRegistered from '@/hooks/useRegistered';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';
import { UserAuth } from '@/app/context/AuthContext';
import useVideo from '@/hooks/useVideo';
import useMotion from '@/hooks/useMotion';
import useStudents from '@/hooks/useStudents';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import HelmetHead from '@/app/HelmetHead/HelmetHead';
import CuriculamVite from '@/app/(with-navbar)/componenets/RunningVideoEditing/VideoEditingCV/VideoEditingCV';
import Achivements from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Achivements/Achivements';
import CourseDuration from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/CourseDuration/CourseDuration';
import PortFolio from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/PortFolio/PortFolio';
import Certifactes from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Certifactes/Certifactes';
import GraphicsStudentsGallery from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/GraphicsStudentsGallery/GraphicsStudentsGallery';
import StudentsBlogs from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/StudentsBlogs/StudentsBlogs';
import GraphicsVideos from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/GraphicsVideo/GraphicsVideos';
import img1 from '../../../assets/image1.PNG';
import Image from 'next/image';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import './VideoEdit.css';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Page() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const sidebarRef = useRef(null);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const [students] = useStudents();
    const VideoEdit = useVideo();
    const motionsData = useMotion();
    const [register] = useRegistered();
    const { ManualUser } = UserAuth();
    const { studentEditProfile } = useStudentEditProfile();

    const tabCategories = [
        { name: "Profile (CV)", slug: "profile" },
        { name: "Achievements", slug: "achievements" },
        { name: "Courses", slug: "courses" },
        { name: "Portfolio", slug: "portfolio" },
        { name: "Certificate", slug: "certificate" },
        { name: "Gallery", slug: "gallery" },
        { name: "Videos", slug: "videos" },
        { name: "Blog", slug: "blog" }
    ];

    // Wait for studentEditProfile to load and set URL dynamically
    useEffect(() => {
        if (!studentEditProfile?.data) return;

        const profile = studentEditProfile.data.find(p => p.id === Number(id));
        if (!profile) return;

        const category = profile.category || "Students_Video";
        const email = profile.email || ManualUser?.email || "";
        const tab = searchParams.get("tab") || "profile";
        const tabIndex = tabCategories.findIndex(t => t.slug === tab);

        if (tabIndex !== -1) setActiveTabIndex(tabIndex);

        const emailParam = searchParams.get("email");
        if (email && !emailParam) {
            router.replace(`/${category}/${id}?tab=${tab}&email=${email}`);
        }
    }, [studentEditProfile, id, searchParams, router, ManualUser]);

    const VideoEdits = VideoEdit?.find(Onestudent => Onestudent?.id === Number(id));

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
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

    const handleTabChange = (index) => {
        setActiveTabIndex(index);
        setIsSidebarOpen(false);

        if (!studentEditProfile?.data) return;

        const profile = studentEditProfile.data.find(p => p.id === Number(id));
        if (!profile) return;

        const category = profile.category || "Students_Video";
        const slug = tabCategories[index].slug;
        const email = profile.email || ManualUser?.email || "";

        router.replace(`/${category}/${id}?tab=${slug}${email ? `&email=${email}` : ""}`);
    };

    return (
        <>
            <HelmetHead
                title="Video Editing Students"
                description="Here have the specific data of Video Editing students who have completed the courses"
                keywords="Batch VideoEditing,CV Education,objective,courses,portfolio,Blog"
                author="Muhibullah"
            />
            <Navbar />
            <main className='lg:mt-40 mt-24 mb-10 overflow-hidden'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='relative lg:w-7/12 overflow-hidden rounded-lg mt-5'>
                        {VideoEdits && (
                            <div className='absolute bottom-5 right-6'>
                                <a
                                    href={VideoEdits?.pdfUrl}
                                    download
                                    className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                                >
                                    Download CV
                                </a>
                            </div>
                        )}
                        <Image
                            src={img1}
                            className='mt-4 w-full transition-transform duration-300 ease-in-out'
                            alt="Cover Image"
                        />
                    </div>
                </div>

                <div className='border-b-2 border-slate-200 lg:w-7/12 container mx-auto rounded-xl'>
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
                    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-30 lg:hidden transition-transform duration-500 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <div ref={sidebarRef} className="w-64 bg-[#17549A] text-white h-full p-4">
                            <h2 className="text-lg font-bold">Categories</h2>
                            <ul className="flex flex-col">
                                {tabCategories.map((category, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-200 hover:text-black cursor-pointer"
                                        onClick={() => handleTabChange(index)}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Tabs selectedIndex={activeTabIndex} onSelect={handleTabChange} className='flex flex-col md:flex-row h-auto w-full'>
                        <TabList className='flex flex-col border-r border-gray-300 cursor-pointer text-white hidden lg:flex bg-[#17549A] w-2/12 h-auto'>
                            {VideoEdits ? (
                                <div className='flex flex-col text-white w-full'>
                                    <img
                                        src={VideoEdits?.image}
                                        alt={VideoEdits?.title || 'user profile pic'}
                                        className="mt-4 shadow-lg w-10/12 mx-auto transition-transform duration-300 hover:scale-105 mb-8"
                                        width={100}
                                        height={100}
                                        style={{ border: '4px solid #ffffff' }}
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-center items-center w-9/12 mx-auto lg:mb-5 h-40">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                                </div>
                            )}

                            <div className="flex justify-center">
                                <button className='bg-blue-500 text-white rounded-xl w-8/12 h-10 hover:bg-[#44b5e6] transition duration-300 mb-5'>
                                    Hire Me
                                </button>
                            </div>

                            {tabCategories.map((tab, index) => (
                                <Tab key={index} style={{ borderBottom: '1px solid #8dbff7' }} className='p-4 text-left hover:bg-blue-200 text-[#8dbff7] hover:text-blue-600 focus:outline-none'>
                                    {tab.name}
                                </Tab>
                            ))}
                        </TabList>

                        <div className='w-full'>
                            <TabPanel><CuriculamVite /></TabPanel>
                            <TabPanel><Achivements /></TabPanel>
                            <TabPanel><CourseDuration /></TabPanel>
                            <TabPanel><PortFolio /></TabPanel>
                            <TabPanel><Certifactes /></TabPanel>
                            <TabPanel><GraphicsStudentsGallery /></TabPanel>
                            <TabPanel><GraphicsVideos /></TabPanel>
                            <TabPanel><StudentsBlogs /></TabPanel>
                        </div>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </>
    );
}
