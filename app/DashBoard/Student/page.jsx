'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './student.css';
import Link from 'next/link';
import CvUpload from '../Students_Dashboards_Components/CvUpload/CvUpload';
import Profile from '../Students_Dashboards_Components/Profile/Profile';
import Achivements from '../Students_Dashboards_Components/Achivements/Achivements';
import StudentsCourses from '../Students_Dashboards_Components/StudentsCourses/StudentsCourses';
import StudentsPortfolioEdit from '../Students_Dashboards_Components/StudentsPortfolioEdit/StudentsPortfolioEdit';
import PicturesEdits from '../Students_Dashboards_Components/PicturesEdits/PicturesEdits';
import VideosEdits from '../Students_Dashboards_Components/videosEdit/videosEdits';
import BlogsEditsStudents from '../Students_Dashboards_Components/BlogsEditsStudents/BlogsEditsStudents';
import SettingsEdits from '../Students_Dashboards_Components/SettingsEdit/SettingsEdit';
import Image from 'next/image';
import Certificate from '../Students_Dashboards_Components/certificate/Certificate';
import Head from 'next/head';  // Import next/head for SEO
import Welcome_Page from '../Welcome_Page/Welcome_Page';

const PageContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navbarColor, setNavbarColor] = useState('#17549A');
  const [sidebarColor, setSidebarColor] = useState('#222');
  const [userRole, setUserRole] = useState('user');
  const [animatedText, setAnimatedText] = useState('Welcome to Career Builder');

  const router = useRouter();
  const searchParams = useSearchParams();

  const phrases = [
    "Welcome",
    "to",
    "Career",
    "Builder"
  ];

  // Effect for animated text
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedText(prev => {
        const currentIndex = phrases.indexOf(prev);
        const nextIndex = (currentIndex + 1) % phrases.length;
        return phrases[nextIndex];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Effect to get section from query params
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);

  // Sidebar toggle function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Section click handler
  const handleSectionClick = (section) => {
    setActiveSection(section);
    router.push(`/DashBoard/Student?section=${section}`);
  };

  // Render Sidebar based on user role
  const renderSidebarForRole = () => {
    switch (userRole) {
      case 'admin':
        return (
          <ul className="mt-3">
            <Link href="/">Home</Link>
            <li onClick={() => handleSectionClick('Profile')}>Profile</li>
            <li onClick={() => handleSectionClick('Achivements')}>Achivements</li>
            <li onClick={() => handleSectionClick('courses')}>Courses</li>
            <li onClick={() => handleSectionClick('Portfolio')}>Portfolio</li>
          </ul>
        );
      case 'middle user':
        return (
          <ul className="mt-3">
            <Link href="/">Home</Link>
            <li onClick={() => handleSectionClick('Profile')}>Profile</li>
          </ul>
        );
      default:
        return (
          <ul className="mt-3">
            <Link href="/">Home</Link>
            <li onClick={() => handleSectionClick('Profile')}>Profile Edit</li>
            <li onClick={() => handleSectionClick('CvUpdate')}>CV Update</li>
            <li onClick={() => handleSectionClick('Achivements')}>Achivements</li>
            <li onClick={() => handleSectionClick('courses')}>Courses</li>
            <li onClick={() => handleSectionClick('Portfolio')}>Portfolio</li>
            <li onClick={() => handleSectionClick('Certificate')}>Certificate</li>
            <li onClick={() => handleSectionClick('Pictures')}>Pictures</li>
            <li onClick={() => handleSectionClick('Videos')}>Videos</li>
            <li onClick={() => handleSectionClick('Blog')}>Blog</li>
            <li onClick={() => handleSectionClick('settings')}>Settings</li>
          </ul>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Student Dashboard - Career Builder</title>
        <meta name="description" content="Manage your profile, achievements, courses, and portfolio on Career Builder" />
        <meta name="keywords" content="student, dashboard, profile, CV, achievements, portfolio, Career Builder" />
        <meta property="og:title" content="Student Dashboard - Career Builder" />
        <meta property="og:description" content="Manage your profile, achievements, courses, and portfolio on Career Builder" />
        <meta property="og:image" content="https://i.postimg.cc/s2RQWVG5/gilbert.png" />
      </Head>
      <section className="navbar" style={{ backgroundColor: navbarColor }}>
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
          {isSidebarOpen ? '✖' : '☰'}
        </button>
        <h1 className="text-3xl font-bold text-white text-wrapper">{animatedText}</h1>
        <div className="user-logo">
          <Image
            width={200}
            height={200}
            src="https://i.postimg.cc/s2RQWVG5/gilbert.png"
            alt="Student Profile Dashboard"
            className="user-image"
          />
        </div>
      </section>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ backgroundColor: sidebarColor }}>
        <button className="close-sidebar" onClick={toggleSidebar} aria-label="Close sidebar">
          ✖ Close
        </button>
        {renderSidebarForRole()}
      </div>
      <main className="main-content-area">
        <div className="main-content" role="main">
          {/* Show blank page if no active section */}
          {activeSection ? (
            <>
              {activeSection === 'Profile' && <Profile />}
              {activeSection === 'CvUpdate' && <CvUpload />}
              {activeSection === 'Achivements' && <Achivements />}
              {activeSection === 'Portfolio' && <StudentsPortfolioEdit />}
              {activeSection === 'courses' && <StudentsCourses />}
              {activeSection === 'Certificate' && <Certificate />}
              {activeSection === 'Pictures' && <PicturesEdits />}
              {activeSection === 'Videos' && <VideosEdits />}
              {activeSection === 'Blog' && <BlogsEditsStudents />}
              {activeSection === 'settings' && <SettingsEdits navbarColor={navbarColor} sidebarColor={sidebarColor} />}
            </>
          ) : (
            <Welcome_Page /> // Blank page content
          )}
        </div>
      </main>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
