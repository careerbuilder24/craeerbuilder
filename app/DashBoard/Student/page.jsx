'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
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
import Certificate from '../Students_Dashboards_Components/Certificates/Certificate';
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
import UploadedCertificate from '../Students_Dashboards_Components/UploadedCertificate/UploadedCertificate';
import UploadedPicture from '../Students_Dashboards_Components/UploadedPicture/UploadedPicture';
import logo from '../../../assets/logo.jpg';
import {
  FiHome,
  FiFileText,
  FiBook,
  FiLayers,
  FiUsers,
  FiImage,
  FiVideo,
  FiGlobe,
  FiTrendingUp,
  FiCreditCard,
  FiMessageCircle,
  FiBriefcase
} from 'react-icons/fi';
import { ImProfile } from "react-icons/im";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";


const PageContent = () => {
  const sections = [
    { key: "courses", label: "Courses", uploadedKey: "UploadedCourses" },
    { key: "portfolio", label: "Portfolio", uploadedKey: "UploadedPortfolio" },
    { key: "certificate", label: "Certificate", uploadedKey: "UploadedCertificate" },
    { key: "picture", label: "Picture", uploadedKey: "UploadedPicture" },
  ];
  const sidebarMenu = [
    {
      label: "Page",
      icon: <FiFileText />,
      children: [
        "Create Page", "All Pages", "Page Category", "Main Page", "Sub Page", "Sub-Sub Page"
      ]
    },
    {
      label: "Blogs",
      icon: <FiMessageCircle />,
      children: ["Create Post", "All Posts"]
    },
    {
      label: "Course",
      icon: <FiBook />,
      children: ["Create Course", "All Courses"]
    },
    {
      label: "Category",
      icon: <FiLayers />,
      children: ["Create Category", "All Categories"]
    },
    {
      label: "Student",
      icon: <FiUsers />,
      children: ["Student Profile", "Running Students", "Intern Students", "Employed Students", "All Students"]
    },
    {
      label: "Photo Gallery",
      icon: <FiImage />,
      children: ["Orientation", "Certification", "Awards Giving", "Pohela Boishakh", "Eid-ul-Fitre", "Eid-ul-Adha", "News Event", "Charity Program", "All Photos"]
    },
    {
      label: "Video Gallery",
      icon: <FiVideo />,
      children: ["Orientation", "Certification", "Awards Giving", "Pohela Boishakh", "Eid-ul-Fitre", "Eid-ul-Adha", "News Event", "Charity Program", "All Videos"]
    },
    {
      label: "University",
      icon: <FiGlobe />,
      children: ["Add University", "All Universities"]
    },
    {
      label: "Study Abroad",
      icon: <FiTrendingUp />,
      children: ["Add University", "Candidate Application", "Pending Application", "Approved Application", "Rejected Application", "All Universities"]
    },
    {
      label: "Payment",
      icon: <FiCreditCard />,
      children: ["Add Payment", "Course Payment", "Internship Payment", "Employment Payment", "Study Abroad Payment", "Refund Payment", "Discount Payment", "Due Payment", "Others Payment"]
    },
    {
      label: "Language",
      icon: <FiBook />,
      children: ["Add Language Course", "All Language Courses"]
    },
    {
      label: "Job Circular",
      icon: <FiBriefcase />,
      children: ["Circular Job", "Job Applicants", "All Jobs"]
    }
  ];


  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (label) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const [openSections, setOpenSections] = useState({});
  const contentRefs = useRef({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Effect to set maxHeight for smooth transition on open/close
  useEffect(() => {
    sections.forEach(({ key }) => {
      const el = contentRefs.current[key];
      if (el) {
        if (openSections[key]) {
          el.style.maxHeight = el.scrollHeight + "px";
        } else {
          el.style.maxHeight = "0px";
        }
      }
    });
  }, [openSections, sections]);
  // state managements
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const dropdownRefs = useRef({});



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

  sidebarMenu.forEach(({ label }) => {
    const el = dropdownRefs.current[label];
    if (el) {
      if (openDropdowns[label]) {
        el.style.maxHeight = el.scrollHeight + 'px';
      } else {
        el.style.maxHeight = '0px';
      }
    }
  });
  useEffect(() => {
    sections.forEach(({ key }) => {
      const el = contentRefs.current[key];
      if (el) {
        if (openSections[key]) {
          el.style.maxHeight = el.scrollHeight + "px";
        } else {
          el.style.maxHeight = "0px";
        }
      }
    });

    sidebarMenu.forEach(({ label }) => {
      const el = dropdownRefs.current[label];
      if (el) {
        if (openDropdowns[label]) {
          el.style.maxHeight = el.scrollHeight + 'px';
        } else {
          el.style.maxHeight = '0px';
        }
      }
    });
  }, [openSections, openDropdowns, sections, sidebarMenu]);


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
              <li key={section} onClljiujick={() => handleSectionClick(section)}>
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


          <div
            className={`sidebar ${isSidebarOpen ? 'open' : ''} bg-[#222222] text-white h-screen overflow-y-auto`}
          >
            <button
              className="w-full text-left p-2 hover:bg-red-500"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              ✖ Close
            </button>

            <Link href="/">
              <div className='flex justify-center items-center'>
                <Image
                  src={logo}
                  alt="Logo"
                  className=" md:w-36 lg:w-full h-auto w-full rounded-lg flex-shrink-0 mt-5"
                />
              </div>
            </Link>


            <ul className="mt-3 text-left px-3 pb-10"> {/* Padding bottom avoids scroll conflict */}
              <li>
                <Link
                  href="/"
                  className=" px-2 flex items-center gap-3 text-[#DCDCDE]   hover:bg-blue-100 hover:text-blue-700 rounded"
                >
                  <FiHome />
                  Home
                </Link>
              </li>

              {/* First section of sidebar */}

              {sidebarMenu.map((menu, index) => (
                <li key={menu.label}>
                  <div
                    onClick={() => toggleDropdown(menu.label)}
                    className="group flex justify-between items-center cursor-pointer text-[#DCDCDE] hover:bg-blue-100 hover:text-blue-700 px-2 rounded"
                  >
                    <span className="flex items-center gap-2">
                      {menu.icon}
                      {menu.label}
                    </span>
                    {openDropdowns[menu.label] ? <FiChevronDown /> : <FiChevronRight />}
                  </div>

                  <div
                    ref={(el) => (dropdownRefs.current[menu.label] = el)}
                    className="ml-4 space-y-1 overflow-hidden transition-all duration-500 ease-in-out text-[#DCDCDE]"
                    style={{ maxHeight: '0px' }}
                  >
                    {menu.children.map((child) => (
                      <p
                        key={child}
                        onClick={() => handleSectionClick(child.replace(/\s+/g, ''))}
                        className="cursor-pointer hover:text-blue-700 hover:bg-blue-100 rounded text-[#DCDCDE]"
                      >
                        {child}
                      </p>
                    ))}
                  </div>
                </li>
              ))}


              <li
                onClick={() => handleSectionClick('Profile')}
                className="px-2 flex items-center gap-3  cursor-pointer   text-[#DCDCDE]  hover:bg-blue-100 hover:text-blue-800  rounded"
              >
                <ImProfile className='  text-[#DCDCDE] hover:bg-blue-100 hover:text-blue-700   ' />
                Profile Edit
              </li>
              <li
                onClick={() => handleSectionClick('CvUpdate')}
                className="px-2 flex items-center gap-3 cursor-pointer   text-[#DCDCDE]  hover:bg-blue-100 group-hover:text-blue-700   rounded"
              >
                <MdOutlineSystemUpdateAlt className=' text-[#DCDCDE]  hover:bg-blue-100 group-hover:text-blue-700  ' />
                CV Update
              </li>

              {sections.map(({ key, label, uploadedKey }) => {
                const isOpen = !!openSections[key];
                return (
                  <div
                    key={key}
                    className=" bg-[#222222] rounded my-5"
                  >
                    <div
                      onClick={() => {
                        toggleSection(key);
                        handleSectionClick(key);  // Important for middle content load
                      }}
                      className="flex items-center justify-between px-2  cursor-pointer text-[#DCDCDE]  hover:bg-blue-100 hover:text-blue-800 rounded"
                    >
                      <span>{label}</span>
                      {isOpen ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </div>

                    <div
                      ref={(el) => (contentRefs.current[key] = el)}
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{ maxHeight: "0px" }}
                    >
                      <ul className=" ">
                        <li
                          onClick={() => handleSectionClick(uploadedKey)}
                          className="px-2 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded text-[#DCDCDE] "
                        >
                          Uploaded {label}
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}

              <li
                onClick={() => handleSectionClick('Videos')}
                className="px-2  cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded text-[#DCDCDE] "
              >
                Videos
              </li>
              <li
                onClick={() => handleSectionClick('Blog')}
                className="px-2  cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded text-[#DCDCDE] "
              >
                Blog
              </li>
              <li
                onClick={() => handleSectionClick('AllBlogs')}
                className="px-2  cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded text-[#DCDCDE] "
              >
                All Blogs
              </li>
            </ul>
          </div>

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
        case 'Career_Guilde_Blog_Added':
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
        case 'Profile':
          return <Profile />;
        case 'CvUpdate':
          return <CvUpload />;
        case 'Achivements':
          return <Achivements />;
        case 'UploadedCourses':
          return <UploadedCourses />;
        case 'UploadedAchievements':
          return <UploadedAchievements />;
        case 'portfolio':
          return <StudentsPortfolioEdit />;
        case 'UploadedPortfolio':
          return <UploadedPortfolio />;
        case 'courses':
          return <StudentsCourses />;
        case 'certificate':
          return <Certificate />;
        case 'UploadedCertificate':
          return <UploadedCertificate />;
        case 'picture':
          return <PicturesEdits />;
        case 'UploadedPicture':
          return <UploadedPicture />;
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
      <section className="navbar" >
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
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} >
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

