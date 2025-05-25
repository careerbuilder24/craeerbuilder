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
// import SettingsEdits from '../Students_Dashboards_Components/SettingsEdit/SettingsEdit';
// import Certificate from '../Students_Dashboards_Components/certificate/Certificate';
// import Welcome_Page from '../Welcome_Page/Welcome_Page';
// import AllBlogs from '../Students_Dashboards_Components/AllBlog/AllBlogs';
// import Image from 'next/image';
// import Head from 'next/head';
// import StudentsAdded from '../Students_Dashboards_Components/Admin/Students_Added/StudentsAdded';
// import CourseAdded from '../Students_Dashboards_Components/Admin/Course_Added/CourseAdded';
// import UniversityBioDataAdded from '../Students_Dashboards_Components/Admin/University_BioData_Added/UniversityBioDataAdded';
// import CareerGuideBlogAdded from '../Students_Dashboards_Components/Admin/Career_Guide_Blog_Added/CareerGuideBlogAdded';
// import FAQAdded from '../Students_Dashboards_Components/Admin/FAQ_Added/FAQAdded';
// import AboutUsAdded from '../Students_Dashboards_Components/Admin/About_Us_Added/AboutUsAdded';
// import ContactUsAdded from '../Students_Dashboards_Components/Admin/Contact_Us_Added/ContactUsAdded';
// import ManageUsers from '../Students_Dashboards_Components/Admin/Manage_Users/ManageUsers';
// import AdminWelcomePage from '../Students_Dashboards_Components/Admin_Welcome_Page/AdminWelcomePage';
// import GalleryAdded from '../Students_Dashboards_Components/Admin/Gallery_Added/GalleryAdded';
// import { UserAuth } from '@/app/context/AuthContext';
// import usersAdmin from '@/hooks/useAdminUser';
// import { ThemeToggle } from '@/app/(with-navbar)/componenets/ThemeToggle/ThemeToggle';
// import PublishedPost from '@/app/(with-navbar)/componenets/PublishedPost/PublishedPost';

// const PageContent = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('');
//   const [navbarColor, setNavbarColor] = useState('#17549A');
//   const [sidebarColor, setSidebarColor] = useState('#222');
//   const [userRole, setUserRole] = useState('Admin'); // Example role
//   const [animatedText, setAnimatedText] = useState('Welcome to Career Builder');

//   // users 
//   const { ManualUser } = UserAuth();
//   const { userAdmin } = usersAdmin();

//   useEffect(() => {
//     if (ManualUser && userAdmin) {
//       const isAdmin = userAdmin.some(admin =>
//         admin.email === ManualUser.email && admin.role === 'Admin'
//       );

//       setUserRole(isAdmin ? 'Admin' : 'user');
//     }
//   }, [ManualUser, userAdmin]);

//   // useEffect(() => {
//   //   if (userRole !== 'Admin' && activeSection.startsWith('Admin')) {
//   //     router.push('/DashBoard/Student');
//   //   }
//   // }, [userRole, activeSection]);


//   // console.log('Current User:', ManualUser);
//   // console.log('Admin List:', userAdmin);
//   // console.log('User Role:', userRole);




//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const phrases = ["Welcome", "to", "Career", "Builder"];

//   // Animated text effect
//   useEffect(() => {
//     const interval = setInterval(() => {
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


//   //click active sidebar content

//   const renderSidebarForRole = () => {
//     switch (userRole) {
//       case 'Admin':
//         return (
//           <ul className="mt-3">

//             <Link href="/">Home</Link>
//             <li onClick={() => handleSectionClick('Students_Added')}>Statistics Management </li>
//             <li onClick={() => handleSectionClick('Manage_Users')}>User Management</li>
//             <li onClick={() => handleSectionClick('Course_Added')}>Course Added</li>
//             <li onClick={() => handleSectionClick('Gallery_Added')}>Gallery Added</li>
//             <li onClick={() => handleSectionClick('University_BioData_Added')}>University BioData Added</li>
//             <li onClick={() => handleSectionClick('Career_Guide_Blog_Added')}>Career Guide Blog Added</li>
//             <li onClick={() => handleSectionClick('Published_Post')}>Published Post</li>
//             <li onClick={() => handleSectionClick('FAQ_Added')}>FAQ Added</li>
//             <li onClick={() => handleSectionClick('About_Us_Added')}>About Us Added</li>
//             <li onClick={() => handleSectionClick('Contact_Us_Added')}>Contact Us Added</li>


//           </ul>
//         );
//       case 'middle user':
//         return (
//           <ul className="mt-3">
//             <Link href="/">Home</Link>
//             <li onClick={() => handleSectionClick('Profile')}>Profile</li>
//           </ul>
//         );
//       default:
//         return (
//           <ul className="mt-3">

//             <Link href="/">Home</Link>
//             <li onClick={() => handleSectionClick('Profile')}>Profile Edit</li>
//             <li onClick={() => handleSectionClick('CvUpdate')}>CV Update</li>
//             <li onClick={() => handleSectionClick('Achivements')}>Achievements</li>
//             <li onClick={() => handleSectionClick('courses')}>Courses</li>
//             <li onClick={() => handleSectionClick('Portfolio')}>Portfolio</li>
//             <li onClick={() => handleSectionClick('Certificate')}>Certificate</li>
//             <li onClick={() => handleSectionClick('Pictures')}>Pictures</li>
//             <li onClick={() => handleSectionClick('Videos')}>Videos</li>
//             <li onClick={() => handleSectionClick('Blog')}>Blog</li>
//             <li onClick={() => handleSectionClick('AllBlogs')}>All Blogs</li>
//           </ul>
//         );
//     }
//   };

//   const renderActiveSection = () => {

//     if (userRole === 'Admin') {
//       // Sections for admin
//       switch (activeSection) {
//         case 'Course_Added':
//           return <CourseAdded />;
//         case 'Students_Added':
//           return <StudentsAdded />;
//         case 'Gallery_Added':
//           return <GalleryAdded />;
//         case 'University_BioData_Added':
//           return <UniversityBioDataAdded />;
//         case 'Career_Guide_Blog_Added':
//           return <CareerGuideBlogAdded />;
//         case 'Published_Post':
//           return <PublishedPost />
//         case 'FAQ_Added':
//           return <FAQAdded />;
//         case 'About_Us_Added':
//           return <AboutUsAdded />;
//         case 'Contact_Us_Added':
//           return <ContactUsAdded />;
//         case 'Manage_Users':
//           return <ManageUsers />;
//         default:
//           return <AdminWelcomePage />;
//       }
//     } else {
//       // Sections for normal users
//       switch (activeSection) {
//         case 'Profile':
//           return <Profile />;
//         case 'CvUpdate':
//           return <CvUpload />;
//         case 'Achivements':
//           return <Achivements />;
//         case 'Portfolio':
//           return <StudentsPortfolioEdit />;
//         case 'courses':
//           return <StudentsCourses />;
//         case 'Certificate':
//           return <Certificate />;
//         case 'Pictures':
//           return <PicturesEdits />;
//         case 'Videos':
//           return <VideosEdits />;
//         case 'Blog':
//           return <BlogsEditsStudents />;
//         case 'AllBlogs':
//           return <AllBlogs />;
//         default:
//           return <Welcome_Page />;
//       }
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Student Dashboard - Career Builder</title>
//         <meta name="description" content="Manage your profile, achievements, courses, and portfolio on Career Builder" />
//         <meta name="keywords" content="student, dashboard, profile, CV, achievements, portfolio, Career Builder" />
//       </Head>
//       <section className="navbar" style={{ backgroundColor: navbarColor }}>
//         <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
//           {isSidebarOpen ? '✖' : '☰'}
//         </button>
//         <h1 className="text-3xl font-bold text-white">{animatedText}</h1>
//         {/* user login image and name */}
//         <div className="user-logo gap-3  ">
//           <ThemeToggle />
//           <Image
//             width={200}
//             height={200}
//             src="https://i.postimg.cc/s2RQWVG5/gilbert.png"
//             alt="Student Profile Dashboard"
//             className="user-image"
//           />
//           {/* <p>{ManualUser.name}</p> */}
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
import PublishedPost from '@/app/(with-navbar)/componenets/PublishedPost/PublishedPost';
import UploadedAchievements from '../Students_Dashboards_Components/UploadedAchievements/UploadedAchievements';
import UploadedCourses from '../Students_Dashboards_Components/UploadedCourses/UploadedCourses';
import UploadedPortfolio from '../Students_Dashboards_Components/UploadedPortfolio/UploadedPortfolio';

const PageContent = () => {
  // state managements
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navbarColor, setNavbarColor] = useState('#17549A');
  const [sidebarColor, setSidebarColor] = useState('#222');
  const [userRole, setUserRole] = useState('');
  const [animatedText, setAnimatedText] = useState('Welcome to Career Builder');


  const { ManualUser } = UserAuth();
  const { userAdmin } = usersAdmin();
  const router = useRouter();
  const searchParams = useSearchParams();

  const adminSections = [
    'Students_Added',
    'Manage_Users',
    'Course_Added',
    'Gallery_Added',
    'University_BioData_Added',
    'Career_Guide_Blog_Added',
    'Published_Post',
    'FAQ_Added',
    'About_Us_Added',
    'Contact_Us_Added',
  ];

  useEffect(() => {
    if (ManualUser && userAdmin) {
      const isAdmin = userAdmin.some(
        (admin) => admin.email === ManualUser.email && admin.role === 'Admin'
      );
      setUserRole(isAdmin ? 'Admin' : 'user');
    }
  }, [ManualUser, userAdmin]);

  // Block access to admin sections for non-admin users
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
      if (!userRole || (userRole !== 'Admin' && adminSections.includes(section))) {
        // router.push('/DashBoard/Student'); // redirect to safe location
        router.push('/');
      }
    }
  }, [searchParams, userRole]);


  // for txt repeat change
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedText((prev) => {
        const phrases = ["Welcome", "to", "Career", "Builder"];
        const currentIndex = phrases.indexOf(prev);
        const nextIndex = (currentIndex + 1) % phrases.length;
        return phrases[nextIndex];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    router.push(`/DashBoard/Student?section=${section}`);
  };

  const renderSidebarForRole = () => {
    switch (userRole) {
      case 'Admin':
        return (
          <ul className="mt-3">
            <Link href="/">Home</Link>
            {adminSections.map((section) => (
              <li key={section} onClick={() => handleSectionClick(section)}>
                {section.replace(/_/g, ' ')}
              </li>
            ))}
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
          // student side dashboard text
          // <ul className="mt-3 ">
          //   <Link href="/">Home</Link>
          //   <li onClick={() => handleSectionClick('Profile')}>Profile Edit</li>
          //   <li onClick={() => handleSectionClick('CvUpdate')}>CV Update</li>
          //   {/* <li onClick={() => handleSectionClick('Achivements')}>Achievements</li> */}
          //   {/* <li>
          //     <details className="group">
          //       <summary
          //         className="cursor-pointer list-none"
          //         style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}
          //       >
          //         <a onClick={() => handleSectionClick('Achivements')} className="cursor-pointer">
          //           Achievements
          //         </a>
          //       </summary>
          //       <ul className="ml-4 mt-1">
          //         <li onClick={() => handleSectionClick('UploadedAchievements')} className="cursor-pointer hover:underline">
          //           Uploaded Achievements
          //         </li>
          //       </ul>
          //     </details>
          //   </li> */}
          //   <li className="text-left">
          //     <details className="group">
          //       <summary
          //         className="cursor-pointer list-none text-left"
          //         style={{ listStyle: 'none', display: 'block' }}
          //       >
          //         <div
          //           onClick={() => handleSectionClick('Achivements')}
          //           className="cursor-pointer text-left block px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700"
          //           style={{ textDecoration: 'none' }}
          //           onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'none')}
          //           onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          //         >
          //           Achievements
          //         </div>
          //       </summary>
          //       <ul className="ml-4 mt-1 text-left">
          //         <li
          //           onClick={() => handleSectionClick('UploadedAchievements')}
          //           className="cursor-pointer px-2 py-1 rounded hover:bg-green-100 hover:text-green-700"
          //           style={{ textDecoration: 'none' }}
          //           onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'none')}
          //           onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          //         >
          //           Uploaded Achievements
          //         </li>
          //       </ul>
          //     </details>
          //   </li>
          //   <li onClick={() => handleSectionClick('courses')}>Courses</li>
          //   <li onClick={() => handleSectionClick('Portfolio')}>Portfolio</li>
          //   <li onClick={() => handleSectionClick('Certificate')}>Certificate</li>
          //   <li onClick={() => handleSectionClick('Pictures')}>Pictures</li>
          //   <li onClick={() => handleSectionClick('Videos')}>Videos</li>
          //   <li onClick={() => handleSectionClick('Blog')}>Blog</li>
          //   <li onClick={() => handleSectionClick('AllBlogs')}>All Blogs</li>
          // </ul>

          <ul className="mt-3 text-left "> {/* <-- Ensures all children align left */}
            <li>
              <Link href="/" className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-700 rounded">Home</Link>
            </li>
            <li onClick={() => handleSectionClick('Profile')} className="px-2 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded">Profile Edit</li>
            <li onClick={() => handleSectionClick('CvUpdate')} className="px-2 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded">CV Update</li>

            {/* <li>
              <details className="group">
                <summary className="list-none cursor-pointer">
                  <div
                    onClick={() => handleSectionClick('Achivements')}
                    className="block px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700 text-left"
                    // style={{ textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    Achievements
                  </div>
                </summary>
                <ul className="ml-4 mt-1 text-left">
                  <li
                    onClick={() => handleSectionClick('UploadedAchievements')}
                    className="px-2 py-1 cursor-pointer rounded hover:bg-blue-100 hover:text-blue-700"
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    Uploaded Achievements
                  </li>
                </ul>
              </details>
            </li> */}
            <details className="group my-2 p-2  rounded-lg">
              <summary className="list-none cursor-pointer">
                <div
                  onClick={() => handleSectionClick('Achivements')}
                  className="block px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700 text-left"
                  // style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  Achievements
                </div>
              </summary>
              <ul className="ml-4 mt-1 text-left">
                <li
                  onClick={() => handleSectionClick('UploadedAchievements')}
                  className=" cursor-pointer rounded hover:bg-blue-100 hover:text-blue-700"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  Uploaded Achievements
                </li>
              </ul>
            </details>
            <details className="group">
              <summary className="list-none cursor-pointer">
                <div
                  onClick={() => handleSectionClick('courses')}
                  className="block px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700 text-left"
                  // style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  Courses
                </div>
              </summary>
              <ul className="ml-4 mt-1 text-left">
                <li
                  onClick={() => handleSectionClick('UploadedCourses')}
                  className="px-2 py-1 cursor-pointer rounded hover:bg-blue-100 hover:text-blue-700"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  Uploaded Courses
                </li>
              </ul>
            </details>

            <details className="group">
              <summary className="list-none cursor-pointer">
                <div
                  onClick={() => handleSectionClick('Portfolio')}
                  className="block px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700 text-left"
                  // style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  Portfolio
                </div>
              </summary>
              <ul className="ml-4 mt-1 text-left">
                <li
                  onClick={() => handleSectionClick('UploadedPortfolio')}
                  className="px-2 py-1 cursor-pointer rounded hover:bg-blue-100 hover:text-blue-700"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  Uploaded Portfolio
                </li>
              </ul>
            </details>
            {/* <li className="px-2 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded">Portfolio</li> */}
            <li onClick={() => handleSectionClick('Certificate')} className="px-2 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded">Certificate</li>
            <li onClick={() => handleSectionClick('Pictures')} className="px-2 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded">Pictures</li>
            <li onClick={() => handleSectionClick('Videos')} className="px-2 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded">Videos</li>
            <li onClick={() => handleSectionClick('Blog')} className="px-2 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded">Blog</li>
            <li onClick={() => handleSectionClick('AllBlogs')} className="px-2 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded">All Blogs</li>
          </ul>

        );
    }
  };

  const renderActiveSection = () => {
    // admin side dashboard
    if (userRole === 'Admin') {
      switch (activeSection) {
        case 'Course_Added':
          return <CourseAdded />;
        case 'Students_Added':
          return <StudentsAdded />;
        case 'Gallery_Added':
          return <GalleryAdded />;
        case 'University_BioData_Added':
          return <UniversityBioDataAdded />;
        case 'Career_Guide_Blog_Added':
          return <CareerGuideBlogAdded />;
        case 'Published_Post':
          return <PublishedPost />;
        case 'FAQ_Added':
          return <FAQAdded />;
        case 'About_Us_Added':
          return <AboutUsAdded />;
        case 'Contact_Us_Added':
          return <ContactUsAdded />;
        case 'Manage_Users':
          return <ManageUsers />;
        default: return <AdminWelcomePage />;
      }
    } else {
      switch (activeSection) {
        // student side dashboard components
        case 'Profile': return <Profile />;
        case 'CvUpdate': return <CvUpload />;
        case 'Achivements': return <Achivements />;
        case 'UploadedCourses': return <UploadedCourses />;
        case 'UploadedAchievements':
          return <UploadedAchievements />;
        case 'Portfolio':
          return <StudentsPortfolioEdit />;
        case 'UploadedPortfolio':
          return <UploadedPortfolio />;
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
        default: return <Welcome_Page />;
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
        <div className="user-logo gap-3">
          <ThemeToggle />
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

