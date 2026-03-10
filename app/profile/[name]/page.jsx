'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import HelmetHead from '@/app/HelmetHead/HelmetHead';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';
import useMatchingUploadedCourses from '@/hooks/useMatchingUploadedCourses';
import useSavedPortfolioSaved from '@/hooks/useSavedPortfolioSaved';

import img1 from '@/assets/image1.PNG';
import CuriculamVite from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/CuriculamVite/CuriculamVite';
import PortFolio from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/PortFolio/PortFolio';
import CourseDuration from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/CourseDuration/CourseDuration';
import Certifactes from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Certifactes/Certifactes';
import Pictures from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/Pictures/Pictures';
import Navbar from '@/app/(with-navbar)/componenets/Navbar/Navbar';
import Footer from '@/app/(with-navbar)/componenets/Footer/Footer';
import Loader from '@/app/(with-navbar)/componenets/Loader/Loader';
import useUploadedCourse from '@/hooks/useUploadedCourse';
import useCertificateUploaded from '@/hooks/useCertificateUploaded';
import useUploadedImage from '@/hooks/useUploadedImage';
import UploadedVideos from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/UploadedVideos/UploadedVideos';
import StudentsBlogs from '@/app/(with-navbar)/componenets/RunningGraphicsStudents/StudentsBlogs/StudentsBlogs';

export default function StudentProfile() {
    const { name } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    // const [register] = useRegistered();
    const { UploadedCourse } = useUploadedCourse();
    const [studentEditProfile] = useStudentEditProfile();
    const { matchedStudentProfiles } = useMatchingUploadedCourses();
    const [studentSavedPortfolio] = useSavedPortfolioSaved();
    const { CertificateUploaded, loading, error } = useCertificateUploaded();
    const { UploadedImage } = useUploadedImage();

    

    const tabCategories = [
        { name: 'Profile (CV)', slug: 'profile' },
        // { name: 'Achievements', slug: 'achievements' },
        { name: 'Courses', slug: 'courses' },
        { name: 'Portfolio', slug: 'portfolio' },
        { name: 'Certificates', slug: 'certificate' },
        { name: 'Pictures', slug: 'pictures' },
        { name: 'Videos', slug: 'videos' },
        { name: 'Blog', slug: 'blog' },
    ];

    const [slugName, slugId] = useMemo(() => {
        if (!name) return [null, null];
        const parts = name.split('-');
        return [parts.slice(0, -1).join('-'), parts[parts.length - 1]];
    }, [name]);

    const student = useMemo(() => {
        return studentEditProfile?.data?.find((s) => String(s.id) === slugId);
    }, [studentEditProfile, slugId]);

    useEffect(() => {
        const currentTab = searchParams.get('tab');
        if (currentTab) {
            const index = tabCategories.findIndex((t) => t.slug === currentTab);
            if (index !== -1) setActiveTabIndex(index);
        }
    }, [searchParams]);

    if (!student) return <Loader />;

    const handleTabChange = (index) => {
        setActiveTabIndex(index);
        const newTabSlug = tabCategories[index].slug;
        router.push(
            `/profile/${student.name.replace(/\s+/g, '-').toLowerCase()}-${student.id}?tab=${newTabSlug}`
        );
    };

    // ===== Helper Functions =====
    const getStudentCourses = () => {
        // Ensure UploadedCourse is an array
        const uploadedCoursesArray = Array.isArray(UploadedCourse?.data)
            ? UploadedCourse.data
            : [];

        // Filter by student email
        const uploadedCourses = uploadedCoursesArray.filter(
            (course) => course?.email === student?.email
        );

        // Fallback: matchedStudentProfiles
        const matchedCourses = matchedStudentProfiles?.filter(
            (course) => course?.email === student?.email
        ) || [];

        // Combine both, remove duplicates by id
        const allCourses = [...uploadedCourses, ...matchedCourses];
        const uniqueCourses = Array.from(
            new Map(allCourses.map((c) => [c.id, c])).values()
        );

        return uniqueCourses;
    };


    const getStudentPortfolio = () => {
        // Ensure studentSavedPortfolio is an array
        const portfolioArray = Array.isArray(studentSavedPortfolio?.data)
            ? studentSavedPortfolio.data
            : [];
        return portfolioArray.filter(item => item?.email === student?.email);
    };

    console.log(studentEditProfile)

    return (
        <>
            <HelmetHead
                title={`${student.name} - Motion Student`}
                description={`Details of Motion student ${student.name}`}
                keywords="motion student, portfolio, courses, achievements"
                author="Muhibullah"
            />
            <Navbar />

            <main className="lg:mt-0 mt-24 mb-10 overflow-hidden">
                {/* Cover Image */}
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="relative lg:w-7/12 overflow-hidden rounded-lg mt-5 container">
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
                            <Image
                                src={img1}
                                alt={student.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="shadow-xl lg:w-7/12 container mx-auto rounded-2xl relative">
                    <Tabs
                        selectedIndex={activeTabIndex}
                        onSelect={handleTabChange}
                        className="flex flex-col md:flex-row h-auto w-full"
                    >
                        {/* Sidebar Tabs */}
                        <TabList className="hidden lg:flex flex-col border-r border-gray-300 bg-[#17549A] w-2/12 h-auto text-white">
                            <Image
                                src={student.uploadedImage || '/placeholder.png'}
                                alt={student.name}
                                width={100}
                                height={100}
                                className="mt-4 mx-auto border-2 border-white mb-4"
                            />
                            <button
                                onClick={() => alert("Hire me clicked!")}
                                className="bg-blue-500 text-white rounded-xl w-8/12 h-10 hover:bg-[#44b5e6] transition duration-300 mx-auto mb-5"
                            >
                                Hire Me
                            </button>
                            {tabCategories.map((tab, index) => (
                                <Tab
                                    key={index}
                                    className={`p-2 text-left hover:bg-blue-200 hover:text-blue-600 cursor-pointer ${activeTabIndex === index
                                        ? 'bg-blue-200 text-blue-600'
                                        : 'text-[#8dbff7]'
                                        }`}
                                >
                                    {tab.name}
                                </Tab>
                            ))}
                        </TabList>

                        {/* Content */}
                        <div className="w-full px-2 sm:px-4 lg:px-0 mt-5">
                            <TabPanel>
                                <CuriculamVite motion={student} />
                            </TabPanel>
                            {/* <TabPanel>Achievements content goes here</TabPanel> */}
                            <TabPanel>
                                <CourseDuration
                                    student={student}
                                    matchedStudentProfiles={getStudentCourses()}
                                />
                            </TabPanel>

                            <TabPanel>
                                <PortFolio
                                    student={student}
                                    matchedStudentPortfolio={getStudentPortfolio()}
                                />
                            </TabPanel>
                            <TabPanel>
                                <Certifactes student={student} />
                            </TabPanel>

                            <TabPanel>
                                <Pictures student={student} />
                            </TabPanel>

                            <TabPanel>
                                <UploadedVideos student={student} />
                            </TabPanel>
                            <TabPanel>
                                <StudentsBlogs student={student} />
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </>
    );
}
