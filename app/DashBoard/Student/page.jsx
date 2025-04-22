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
import Certificate from '../Students_Dashboards_Components/certificate/Certificate';
import Welcome_Page from '../Welcome_Page/Welcome_Page';
import AllBlogs from '../Students_Dashboards_Components/AllBlog/AllBlogs';
import Image from 'next/image';
import Head from 'next/head';
import StudentsAdded from '../Students_Dashboards_Components/Admin/Students_Added/StudentsAdded';
import CourseAdded from '../Students_Dashboards_Components/Admin/Course_Added/CourseAdded';
import UniversityBioDataAdded from '../Students_Dashboards_Components/Admin/University_BioData_Added/UniversityBioDataAdded';
import CareerGuideBlogAdded from '../Students_Dashboards_Components/Admin/Career_Guide_Blog_Added/CareerGuideBlogAdded';
import FAQAdded from '../Students_Dashboards_Components/Admin/FAQ_Added/FAQAdded';
import AboutUsAdded from '../Students_Dashboards_Components/Admin/About_Us_Added/AboutUsAdded';
import ContactUsAdded from '../Students_Dashboards_Components/Admin/Contact_Us_Added/ContactUsAdded';
import ManageUsers from '../Students_Dashboards_Components/Admin/Manage_Users/ManageUsers';
import AdminWelcomePage from '../Students_Dashboards_Components/Admin_Welcome_Page/AdminWelcomePage';
import GalleryAdded from '../Students_Dashboards_Components/Admin/Gallery_Added/GalleryAdded';
import { UserAuth } from '@/app/context/AuthContext';
import usersAdmin from '@/hooks/useAdminUser';
import { ThemeToggle } from '@/app/(with-navbar)/componenets/ThemeToggle/ThemeToggle';

const PageContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navbarColor, setNavbarColor] = useState('#17549A');
  const [sidebarColor, setSidebarColor] = useState('#222');
  const [userRole, setUserRole] = useState('Admin'); // Example role
  const [animatedText, setAnimatedText] = useState('Welcome to Career Builder');

  // users 
  const { ManualUser } = UserAuth();
  const { userAdmin } = usersAdmin();
  useEffect(() => {
    if (ManualUser && userAdmin) {
      const isAdmin = userAdmin.some(admin =>
        admin.email === ManualUser.email && admin.role === 'Admin'
      );

      setUserRole(isAdmin ? 'Admin' : 'user');
    }
  }, [ManualUser, userAdmin]);
  // useEffect(() => {
  //   if (userRole !== 'Admin' && activeSection.startsWith('Admin')) {
  //     router.push('/DashBoard/Student');
  //   }
  // }, [userRole, activeSection]);
  

  // console.log('Current User:', ManualUser);
  // console.log('Admin List:', userAdmin);
  // console.log('User Role:', userRole);




  const router = useRouter();
  const searchParams = useSearchParams();

  const phrases = ["Welcome", "to", "Career", "Builder"];

  // Animated text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedText((prev) => {
        const currentIndex = phrases.indexOf(prev);
        const nextIndex = (currentIndex + 1) % phrases.length;
        return phrases[nextIndex];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get active section from query parameters
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) setActiveSection(section);
  }, [searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    router.push(`/DashBoard/Student?section=${section}`);
  };


  //click active sidebar content

  const renderSidebarForRole = () => {
    switch (userRole) {
      case 'Admin':
        return (
          <ul className="mt-3">
         
            <Link href="/">Home</Link>
            <li onClick={() => handleSectionClick('Students_Added')}>Statistics Management </li>
            <li onClick={() => handleSectionClick('Course_Added')}>Course Added</li>
            <li onClick={() => handleSectionClick('Gallery_Added')}>Gallery Added</li>
            <li onClick={() => handleSectionClick('University_BioData_Added')}>University BioData Added</li>
            <li onClick={() => handleSectionClick('Career_Guide_Blog_Added')}>Career Guide Blog Added</li>
            <li onClick={() => handleSectionClick('FAQ_Added')}>FAQ Added</li>
            <li onClick={() => handleSectionClick('About_Us_Added')}>About Us Added</li>
            <li onClick={() => handleSectionClick('Contact_Us_Added')}>Contact Us Added</li>
            <li onClick={() => handleSectionClick('Manage_Users')}>User Management</li>
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
            <li onClick={() => handleSectionClick('Achivements')}>Achievements</li>
            <li onClick={() => handleSectionClick('courses')}>Courses</li>
            <li onClick={() => handleSectionClick('Portfolio')}>Portfolio</li>
            <li onClick={() => handleSectionClick('Certificate')}>Certificate</li>
            <li onClick={() => handleSectionClick('Pictures')}>Pictures</li>
            <li onClick={() => handleSectionClick('Videos')}>Videos</li>
            <li onClick={() => handleSectionClick('Blog')}>Blog</li>
            <li onClick={() => handleSectionClick('AllBlogs')}>All Blogs</li>
          </ul>
        );
    }
  };

  const renderActiveSection = () => {

    if (userRole === 'Admin') {
      // Sections for admin
      switch (activeSection) {
        case 'Course_Added':
          return <CourseAdded />;  // Admin course section
        case 'Students_Added':
          return <StudentsAdded />;  // Admin students section
        case 'Gallery_Added':
          return <GalleryAdded />;  // Admin university section
        case 'University_BioData_Added':
          return <UniversityBioDataAdded />;  // Admin university section
        case 'Career_Guide_Blog_Added':
          return <CareerGuideBlogAdded />;  // Admin career blog section
        case 'FAQ_Added':
          return <FAQAdded />;  // Admin FAQ section
        case 'About_Us_Added':
          return <AboutUsAdded />;  // Admin About Us section
        case 'Contact_Us_Added':
          return <ContactUsAdded />;  // Admin Contact Us section
        case 'Manage_Users':
          return <ManageUsers />;  // Mock user management
        default:
          return <AdminWelcomePage />;
      }
    } else {
      // Sections for normal users
      switch (activeSection) {
        case 'Profile':
          return <Profile />;
        case 'CvUpdate':
          return <CvUpload />;
        case 'Achivements':
          return <Achivements />;
        case 'Portfolio':
          return <StudentsPortfolioEdit />;
        case 'courses':
          return <StudentsCourses />;
        case 'Certificate':
          return <Certificate />;
        case 'Pictures':
          return <PicturesEdits />;
        case 'Videos':
          return <VideosEdits />;
        case 'Blog':
          return <BlogsEditsStudents />;
        case 'AllBlogs':
          return <AllBlogs />;
        default:
          return <Welcome_Page />;
      }
    }
  };

  return (
    <>
      <Head>
        <title>Student Dashboard - Career Builder</title>
        <meta name="description" content="Manage your profile, achievements, courses, and portfolio on Career Builder" />
        <meta name="keywords" content="student, dashboard, profile, CV, achievements, portfolio, Career Builder" />
      </Head>
      <section className="navbar" style={{ backgroundColor: navbarColor }}>
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
          {isSidebarOpen ? '✖' : '☰'}
        </button>
        <h1 className="text-3xl font-bold text-white">{animatedText}</h1>
        {/* user login image and name */}
        <div className="user-logo gap-3  ">
        <ThemeToggle />
          <Image
            width={200}
            height={200}
            src="https://i.postimg.cc/s2RQWVG5/gilbert.png"
            alt="Student Profile Dashboard"
            className="user-image"
          />
          {/* <p>{ManualUser.name}</p> */}
        </div>
      </section>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ backgroundColor: sidebarColor }}>
        <button className="close-sidebar" onClick={toggleSidebar} aria-label="Close sidebar">
          ✖ Close
        </button>
        {renderSidebarForRole()}
      </div>
      <main className="main-content-area">
        {renderActiveSection()}
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




// for user purpose development
// 'use client';

// import React, { Suspense, useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import './student.css';
// import Link from 'next/link';
// import CvUpload from '../Students_Dashboards_Components/CvUpload/CvUpload';
// import Profile from '../Students_Dashboards_Components/Profile/Profile';
// import Achivements from '../Students_Dashboards_Components/Achivements/Achivements';
// import StudentsCourses from '../Students_Dashboards_Components/StudentsCourses/StudentsCourses';
// import StudentsPortfolioEdit from '../Students_Dashboards_Components/StudentsPortfolioEdit/StudentsPortfolioEdit';
// import PicturesEdits from '../Students_Dashboards_Components/PicturesEdits/PicturesEdits';
// import VideosEdits from '../Students_Dashboards_Components/videosEdit/videosEdits';
// import BlogsEditsStudents from '../Students_Dashboards_Components/BlogsEditsStudents/BlogsEditsStudents';
// import Certificate from '../Students_Dashboards_Components/certificate/Certificate';
// import Welcome_Page from '../Welcome_Page/Welcome_Page';
// import AllBlogs from '../Students_Dashboards_Components/AllBlog/AllBlogs';
// import { UserAuth } from '@/app/context/AuthContext';
// import Image from 'next/image';

// const PageContent = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('');
//   const [navbarColor, setNavbarColor] = useState('#17549A');
//   const [sidebarColor, setSidebarColor] = useState('#222');
//   const [userRole, setUserRole] = useState('User'); // Only User role now
//   const [animatedText, setAnimatedText] = useState('Welcome to Career Builder');

//   const { ManualUser } = UserAuth();

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Animated text effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const phrases = ["Welcome", "to", "Career", "Builder"];
//       setAnimatedText((prev) => {
//         const currentIndex = phrases.indexOf(prev);
//         const nextIndex = (currentIndex + 1) % phrases.length;
//         return phrases[nextIndex];
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // Get active section from query parameters
//   useEffect(() => {
//     const section = searchParams.get('section');
//     if (section) setActiveSection(section);
//   }, [searchParams]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleSectionClick = (section) => {
//     setActiveSection(section);
//     router.push(`/DashBoard/Student?section=${section}`);
//   };

//   // Render Sidebar for User role only
//   const renderSidebarForRole = () => {
//     return (
//       <ul className="mt-3">
//         <Link href="/">Home</Link>
//         <li onClick={() => handleSectionClick('Profile')}>Profile Edit</li>
//         <li onClick={() => handleSectionClick('CvUpdate')}>CV Update</li>
//         <li onClick={() => handleSectionClick('Achivements')}>Achievements</li>
//         <li onClick={() => handleSectionClick('courses')}>Courses</li>
//         <li onClick={() => handleSectionClick('Portfolio')}>Portfolio</li>
//         <li onClick={() => handleSectionClick('Certificate')}>Certificate</li>
//         <li onClick={() => handleSectionClick('Pictures')}>Pictures</li>
//         <li onClick={() => handleSectionClick('Videos')}>Videos</li>
//         <li onClick={() => handleSectionClick('Blog')}>Blog</li>
//         <li onClick={() => handleSectionClick('AllBlogs')}>All Blogs</li>
//       </ul>
//     );
//   };

//   // Render active section for User role only
//   const renderActiveSection = () => {
//     switch (activeSection) {
//       case 'Profile':
//         return <Profile />;
//       case 'CvUpdate':
//         return <CvUpload />;
//       case 'Achivements':
//         return <Achivements />;
//       case 'Portfolio':
//         return <StudentsPortfolioEdit />;
//       case 'courses':
//         return <StudentsCourses />;
//       case 'Certificate':
//         return <Certificate />;
//       case 'Pictures':
//         return <PicturesEdits />;
//       case 'Videos':
//         return <VideosEdits />;
//       case 'Blog':
//         return <BlogsEditsStudents />;
//       case 'AllBlogs':
//         return <AllBlogs />;
//       default:
//         return <Welcome_Page />;
//     }
//   };

//   return (
//     <>
//       <section className="navbar" style={{ backgroundColor: navbarColor }}>
//         <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
//           {isSidebarOpen ? '✖' : '☰'}
//         </button>
//         <h1 className="text-3xl font-bold text-white">{animatedText}</h1>
//         <div className="user-logo gap-3">
//           <Image
//             width={200}
//             height={200}
//             src="https://i.postimg.cc/s2RQWVG5/gilbert.png"
//             alt="Student Profile Dashboard"
//             className="user-image"
//           />
//         </div>
//       </section>
//       <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ backgroundColor: sidebarColor }}>
//         <button className="close-sidebar" onClick={toggleSidebar} aria-label="Close sidebar">
//           ✖ Close
//         </button>
//         {renderSidebarForRole()}
//       </div>
//       <main className="main-content-area">
//         {renderActiveSection()}
//       </main>
//     </>
//   );
// };

// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <PageContent />
//     </Suspense>
//   );
// }

