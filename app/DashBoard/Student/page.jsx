'use client';

import React, { useEffect, useState } from 'react';
import './student.css'; // Importing the external CSS file
import Link from 'next/link';
import logo from '../../../assets/logo.jpg';
import Image from 'next/image';
import CvUpload from '../Students_Dashboards_Components/CvUpload/CvUpload'
import Profile from '../Students_Dashboards_Components/Profile/Profile'
import Achivements from '../Students_Dashboards_Components/Achivements/Achivements'
import StudentsCourses from '../Students_Dashboards_Components/StudentsCourses/StudentsCourses'
import StudentsPortfolioEdit from '../Students_Dashboards_Components/StudentsPortfolioEdit/StudentsPortfolioEdit'
import CertificatesEdit from '../Students_Dashboards_Components/CertificatesEdit/CertificatesEdit'
import PicturesEdits from '../Students_Dashboards_Components/PicturesEdits/PicturesEdits'
import VideosEdits from '../Students_Dashboards_Components/videosEdit/videosEdits';
import BlogsEditsStudents from '../Students_Dashboards_Components/BlogsEditsStudents/BlogsEditsStudents';
import SettingsEdits from '../Students_Dashboards_Components/SettingsEdit/SettingsEdit';




export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Profile'); // Default section set to 'Profile'
  const [navbarColor, setNavbarColor] = useState('#17549A'); // Track navbar color
  const [sidebarColor, setSidebarColor] = useState('#222'); // Track sidebar color
  const [animatedText, setAnimatedText] = useState('');

  // text animation

  const fullText = 'Welcome to Career Builder';
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText((prev) => fullText.slice(0, index + 1)); // Update text one character at a time
      index = (index + 1) % (fullText.length + 1); // Loop back to the start
    }, 150); // Adjust speed as needed
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [fullText]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    if (name === 'navbarColor') {
      setNavbarColor(value);
    } else if (name === 'sidebarColor') {
      setSidebarColor(value);
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar" style={{ backgroundColor: navbarColor }}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? '✖' : '☰'} {/* Toggling between ☰ and ✖ */}
        </button>



        {/* nav text */}

        {/* Animated Text */}
        <h1 className="text-3xl font-bold text-white">{animatedText}</h1>


        {/* <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div> */}



        <div className="user-logo">
          <img
            src="https://via.placeholder.com/40" // Replace with actual user image
            alt="User"
            className="user-image"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ backgroundColor: sidebarColor }}>
        <button className="close-sidebar" onClick={toggleSidebar}>
          ✖ Close
        </button>
        <ul className='mt-3'>
          <Link href={'/'}>Home</Link>
          <li onClick={() => handleSectionClick('CvUpdate')}>CV Update</li>
          <li onClick={() => handleSectionClick('Profile')}>Profile</li>
          <li onClick={() => handleSectionClick('Achivements')}>Achivements</li>
          <li onClick={() => handleSectionClick('courses')}>Courses</li>
          <li onClick={() => handleSectionClick('Portfolio')}>Portfolio</li>
          <li onClick={() => handleSectionClick('Certificate')}>Certificate</li>
          <li onClick={() => handleSectionClick('Pictures')}>Pictures</li>
          <li onClick={() => handleSectionClick('Videos')}>Videos</li>
          <li onClick={() => handleSectionClick('Blog')}>Blog</li>
          <li onClick={() => handleSectionClick('settings')}>Settings</li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content-area">
        <div className="main-content">
          {activeSection === 'Profile' && (
            <div>
              <Profile />
            </div>
          )}

          {activeSection === 'CvUpdate' && (
            <div>
              <CvUpload></CvUpload>
            </div>
          )}

          {activeSection === 'Achivements' && (
            <div>
              <Achivements />
            </div>
          )}

          {activeSection === 'courses' && (
            <div>
              <StudentsCourses />
            </div>
          )}

          {activeSection === 'Portfolio' && (
            <div>
              <StudentsPortfolioEdit />
            </div>
          )}

          {activeSection === 'Certificate' && (
            <div>
              <CertificatesEdit />
            </div>
          )}

          {activeSection === 'Pictures' && (
            <div>
              <PicturesEdits />
            </div>
          )}

          {activeSection === 'Videos' && (
            <div>
              <VideosEdits />
            </div>
          )}

          {activeSection === 'Blog' && (
            <div>
              <BlogsEditsStudents />
            </div>
          )}

          {activeSection === 'settings' && (
            <SettingsEdits 
              navbarColor={navbarColor}
              sidebarColor={sidebarColor}
              onColorChange={handleColorChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
