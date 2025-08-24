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
import AdminWelcomePage from '../Students_Dashboards_Components/AdminWelcomePage/AdminWelcomePage';

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
import {
  FiUserPlus,
  FiBookOpen,
  FiMessageSquare,
  FiHelpCircle,
  FiInfo,
  FiPhone
} from 'react-icons/fi';

const adminSectionIcons = {
  Students_Added: <FiUserPlus />,
  Manage_Users: <FiUsers />,
  Course_Added: <FiBookOpen />,
  Gallery_Added: <FiImage />,
  University_Added: <FiGlobe />,
  // Career_Guide_Blog: <FiFileText />,
  Published_Post: <FiMessageSquare />,
  FAQ_Added: <FiHelpCircle />,
  About_Us_Added: <FiInfo />,
  Contact_Us_Added: <FiPhone />
};
import { ImProfile } from "react-icons/im";
import { MdDashboard, MdOutlineSystemUpdateAlt } from "react-icons/md";
import Create_Page from '../Students_Dashboards_Components/Create_Page/CreatePage';
import All_Page from '../Students_Dashboards_Components/All_Page/All_Page';
import Add_Students from '../Students_Dashboards_Components/Add_Students/Add_Students';

// import usePublishedBlog from '@/hooks/usePublishedBlog';
import AllCourse from '../Students_Dashboards_Components/Admin/AllCourse/AllCourse';
import AllPhoto from '../Students_Dashboards_Components/Admin/AllPhoto/AllPhoto';
import OrientationImage from '../Students_Dashboards_Components/Admin/OrientationImage/OrientationImage';
import AdminCertificationImage from '../Students_Dashboards_Components/Admin/AdminCertificationImage/AdminCertificationImage';
import AwardsGiving from '../Students_Dashboards_Components/Admin/AwardsGiving/AwardsGiving';
import PohelaBoishakhImage from '../Students_Dashboards_Components/Admin/pohelaboishakImage/pohelaboishakImage';
import EidUlFitre from '../Students_Dashboards_Components/Admin/EidUlFitre/EidUlFitre';
import EidUlAdha from '../Students_Dashboards_Components/Admin/EidUlAdha/EidUlAdha';
import News from '../Students_Dashboards_Components/Admin/News/News';
import UploadCharityImage from '../Students_Dashboards_Components/Admin/UploadCharityImage/UploadCharityImage';
import { RiGraduationCapFill } from 'react-icons/ri';
import { BsPersonFillCheck, BsPersonVcard } from 'react-icons/bs';
import { PiCertificateFill } from 'react-icons/pi';
import { SlPicture } from 'react-icons/sl';
import { AiFillPicture } from 'react-icons/ai';
import StudentEnrollCourse from '../Students_Dashboards_Components/StudentEnrollCourse/StudentEnrollCourse';
import { IoNotificationsSharp } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import useRegistered from '@/hooks/useRegistered';
import { HiOutlineArrowLeftEndOnRectangle } from 'react-icons/hi2';
import ProfileEdit from '../Students_Dashboards_Components/ProfileEdit/ProfileEdit';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';
import { TfiWorld } from 'react-icons/tfi';


const PageContent = () => {

  const [register] = useRegistered();

  const firstUser = register?.data?.[0]?.role ?? ""; // default empty string



  console.log(firstUser)  // "Admin"
  const [studentEditProfile] = useStudentEditProfile();



  //  console.log(register?.data?.[0]?.role); 


  const sections = [
    // { key: "Enroll Course", icon: <BsPersonFillCheck />, label: "Enroll Course", uploadedKey: "Enroll_Course" },
    { key: "courses", icon: <RiGraduationCapFill />, label: "Courses", uploadedKey: "UploadedCourses" },
    { key: "portfolio", icon: <BsPersonVcard />, label: "Portfolio", uploadedKey: "UploadedPortfolio" },
    { key: "certificate", icon: <PiCertificateFill />, label: "Certificate", uploadedKey: "UploadedCertificate" },
    { key: "picture", icon: <AiFillPicture />, label: "Picture", uploadedKey: "UploadedPicture" },


  ];
  const sidebarMenu = [
    {
      label: "Page",
      icon: <FiFileText />,
      children: [
        { label: "Create Page", key: "Create_Page" },
        { label: "All Page", key: "All_Page" },
        { label: "Page Category", key: "PageCategory" },
        { label: "Main Page", key: "MainPage" },
        { label: "Sub Page", key: "SubPage" },
        { label: "Sub-Sub Page", key: "SubSubPage" }
      ]
    },
    {
      label: "Blogs",
      icon: <FiMessageCircle />,
      // badgeCount: published?.data?.length || 0,
      children: [
        { label: "Create Post", key: "Create_Post" },
        { label: "All Posts", key: "All_Posts" }
      ]
    },
    {
      label: "Course",
      icon: <FiBook />,
      children: [
        { label: "Create Course", key: "Create_Course" },
        { label: "All Courses", key: "All_Course" }
      ]
    },
    {
      label: "Category",
      icon: <FiLayers />,
      children: [
        { label: "Create Category", key: "CreateCategory" },
        { label: "All Categories", key: "AllCategories" }
      ]
    },
    {
      label: "Student",
      icon: <FiUsers />,
      children: [
        { label: "Add Student", key: "Add_Student" },
        { label: "Running Students", key: "RunningStudents" },
        { label: "Intern Students", key: "InternStudents" },
        { label: "Employed Students", key: "EmployedStudents" },
        { label: "All Students", key: "All_Students" }
      ]
    },
    {
      label: "Photo Gallery",
      icon: <FiImage />,
      children: [
        { label: "All Photos", key: "AllPhoto" },
        { label: "Orientation", key: "OrientationImage" },
        { label: "Certification", key: "AdminCertificationImage" },
        { label: "Awards Giving", key: "AwardsGiving" },
        { label: "Pohela Boishakh", key: "pohelaboishakImage" },
        { label: "Eid-ul-Fitre", key: "EidUlFitre" },
        { label: "Eid-ul-Adha", key: "EidUlAdha" },
        { label: "News Event", key: "News" },
        { label: "Charity Program", key: "UploadCharityImage" },
      ]
    },
    {
      label: "Video Gallery",
      icon: <FiVideo />,
      children: [
        { label: "Orientation", key: "VideoOrientation" },
        { label: "Certification", key: "VideoCertification" },
        { label: "Awards Giving", key: "VideoAwards" },
        { label: "Pohela Boishakh", key: "VideoPohelaBoishakh" },
        { label: "Eid-ul-Fitre", key: "VideoEidFitre" },
        { label: "Eid-ul-Adha", key: "VideoEidAdha" },
        { label: "News Event", key: "VideoNews" },
        { label: "Charity Program", key: "VideoCharity" },
        { label: "All Videos", key: "AllVideos" }
      ]
    },
    {
      label: "University",
      icon: <FiGlobe />,
      badgeCount: 3, // <- add this
      children: [
        { label: "Add University", key: "AddUniversity" },
        { label: "All Universities", key: "AllUniversities" }
      ]
    },
    {
      label: "Study Abroad",
      icon: <FiTrendingUp />,
      children: [
        { label: "Add University", key: "SA_AddUniversity" },
        { label: "Candidate Application", key: "SA_CandidateApp" },
        { label: "Pending Application", key: "SA_PendingApp" },
        { label: "Approved Application", key: "SA_ApprovedApp" },
        { label: "Rejected Application", key: "SA_RejectedApp" },
        { label: "All Universities", key: "SA_AllUniversities" }
      ]
    },
    {
      label: "Payment",
      icon: <FiCreditCard />,
      children: [
        { label: "Add Payment", key: "AddPayment" },
        { label: "Course Payment", key: "CoursePayment" },
        { label: "Internship Payment", key: "InternshipPayment" },
        { label: "Employment Payment", key: "EmploymentPayment" },
        { label: "Study Abroad Payment", key: "StudyAbroadPayment" },
        { label: "Refund Payment", key: "RefundPayment" },
        { label: "Discount Payment", key: "DiscountPayment" },
        { label: "Due Payment", key: "DuePayment" },
        { label: "Others Payment", key: "OthersPayment" }
      ]
    },
    {
      label: "Language",
      icon: <FiBook />,
      children: [
        { label: "Add Language Course", key: "AddLanguageCourse" },
        { label: "All Language Courses", key: "AllLanguageCourses" }
      ]
    },
    {
      label: "Job Circular",
      icon: <FiBriefcase />,
      children: [
        { label: "Circular Job", key: "CircularJob" },
        { label: "Job Applicants", key: "JobApplicants" },
        { label: "All Jobs", key: "AllJobs" }
      ]
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



  const [userRole, setUserRole] = useState(null);




  const { ManualUser } = UserAuth();
  const { userAdmin } = usersAdmin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = ManualUser?.email || ""; // fallback to empty string

  const adminSections = [
    'Students_Added',
    'Manage_Users',
    // 'Course_Added',
    // 'Gallery_Added',
    'University_Added',
    // 'Career_Guide_Blog',
    "Profile_Edit",
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





  // Set default section based on role
  useEffect(() => {
    if (!userAdmin || !ManualUser) return;

    const isAdmin = userAdmin.some(admin =>
      admin?.email?.toLowerCase() === ManualUser.email?.toLowerCase() &&
      admin?.role?.toLowerCase() === 'admin'
    );

    if (isAdmin) {
      setUserRole("Admin");   //  exact string match
      setActiveSection("AdminWelcomePage");
    } else {
      setUserRole("Student"); //  not "user", use "Student"
      setActiveSection("Welcome_Page");
    }
  }, [userAdmin, ManualUser]);











  // While loading role, render nothing (no flicker)
  if (userRole === null) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-lg font-semibold ">
        <span className='text-red-500 text-3xl'> You have no Access to see this page </span>
        <Link className='p-5 bg-blue-500 rounded-md text-white' href={'/'}>Back to home</Link>
      </div>
    );
  }




  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSectionClick = (section) => {
    setActiveSection(section);


    router.push(`/DashBoard/Student?section=${section}&email=${encodeURIComponent(email)}`);

  };

  const renderSidebarForRole = () => {
    switch (userRole) {
      case 'Admin':
        return (

          // Admin Users

          <>

            <ul className="mt-3">
              {/* <Link href="/">Home</Link> */}

              <Link href="/">
                <div className='flex justify-center items-center'>
                  <Image
                    src={logo}
                    alt="Logo"
                    className=" md:w-36 lg:w-full h-auto w-full rounded-lg flex-shrink-0 "
                  />
                </div>
              </Link>
              <li>
                <Link
                  href="/"
                  className=" px-2 flex items-center gap-3    hover:bg-blue-100 hover:text-blue-700 rounded"
                >
                  <FiHome />
                  Home
                </Link>
              </li>



              {adminSections.map((section) => (
                <li
                  key={section}
                  onClick={() => handleSectionClick(section)}
                  className="group hover:bg-blue-100   px-2 rounded flex items-center gap-2  hover:text-blue-700 cursor-pointer transition-colors duration-200"
                >
                  {adminSectionIcons[section] && (
                    <span className="text-inherit">{adminSectionIcons[section]}</span>
                  )}
                  {section.replace(/_/g, ' ')}
                </li>
              ))}




              {sidebarMenu.map((menu, index) => (
                <li key={menu.label}>
                  <div
                    onClick={() => toggleDropdown(menu.label)}
                    className="group flex justify-between  items-center cursor-pointer  hover:bg-blue-100 hover:text-blue-700 px-2 rounded relative"
                  >
                    <span className="flex items-center gap-2">
                      {menu.icon}
                      <p>{menu.label}</p>
                    </span>

                    <div className="flex items-center gap-1">
                      {/* Badge if present */}
                      {menu.badgeCount > 0 && (
                        <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {menu.badgeCount}
                        </span>
                      )}
                      {openDropdowns[menu.label] ? <FiChevronDown /> : <FiChevronRight />}
                    </div>
                  </div>

                  <div
                    ref={(el) => (dropdownRefs.current[menu.label] = el)}
                    className="ml-4 space-y-1 overflow-hidden transition-all duration-500 ease-in-out  "
                    style={{ maxHeight: '0px' }}
                  >
                    {menu.children.map(({ label, key }) => (
                      <p
                        key={key}
                        onClick={() => handleSectionClick(key)}
                        className="ml-4 pl-2 mt-3 py-1 cursor-pointer hover:text-blue-700 hover:bg-blue-100 rounded  transition-colors duration-200"
                      >
                        {label}
                      </p>
                    ))}

                  </div>
                </li>
              ))}

            </ul>
            <div className=" relative bottom-0">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold p-5 bg-[#17549A] py-2 hover:bg-blue-100 hover:text-blue-700 rounded duration-300 ease-in-out"
              >
                <HiOutlineArrowLeftEndOnRectangle className='text-2xl' />
                Back Home
              </Link>
            </div>
          </>

        );
      case 'middle user':
        return (
          <ul className="mt-3">
            <Link href="/">Home</Link>
            <li onClick={() => handleSectionClick('Profile')}>Profile</li>
          </ul>
        );
      // student panel 
      default:
        return (


          <div
            className={`sidebar ${isSidebarOpen ? 'open' : ''} bg-[#222222]   text-white h-screen overflow-y-auto `}
          >
            <button
              className="w-full text-left p-2 hover:bg-red-500"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              ✖ Close
            </button>

            {/* Students Users */}
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

              <li
                onClick={() => handleSectionClick('dashboard')}
                className="px-2 flex items-center gap-3  cursor-pointer     hover:bg-blue-100 hover:text-blue-800  rounded"
              >

                <MdDashboard className='hover:bg-blue-100 hover:text-blue-700' />
                Dashboard
              </li>


              <Link
                href={'/'}
                className="px-2 flex items-center gap-3  cursor-pointer     hover:bg-blue-100 hover:text-blue-800  rounded"
              >
                <IoMdHome className="hover:bg-blue-100 hover:text-blue-700 text-xl" />
                Visit Website
              </Link>

              <li
                onClick={() => {
                  const matchedProfile = studentEditProfile?.data?.find(
                    (profile) => profile.email === ManualUser?.email
                  );
                  if (matchedProfile) {
                    router.push(
                      `/${matchedProfile.category}/${matchedProfile.id}?tab=profile&email=${matchedProfile.email}`
                    );
                  } else {
                    router.push("/"); // fallback
                  }
                }}
                className="px-2 flex items-center gap-3 cursor-pointer hover:bg-blue-100 hover:text-blue-800 rounded"
              >
                <TfiWorld className='hover:bg-blue-100 hover:text-blue-700' />


                Visit Profile
              </li>

              <li
                onClick={() => handleSectionClick('Profile')}
                className="px-2 flex items-center gap-3  cursor-pointer     hover:bg-blue-100 hover:text-blue-800  rounded"
              >
                <ImProfile className='   hover:bg-blue-100 hover:text-blue-700   ' />
                Profile Edit
              </li>
              <li
                onClick={() => handleSectionClick('CvUpdate')}
                className="px-2 flex items-center gap-3  cursor-pointer     hover:bg-blue-100 hover:text-blue-800  rounded"
              >
                <MdOutlineSystemUpdateAlt className='   hover:bg-blue-100 hover:text-blue-700   ' />
                CV Update
              </li>
              <li
                onClick={() => handleSectionClick('Enroll_Course')}
                className="px-2 flex items-center gap-3  cursor-pointer     hover:bg-blue-100 hover:text-blue-800  rounded"
              >
                <BsPersonFillCheck className='   hover:bg-blue-100 hover:text-blue-700   ' />
                Enroll Course
              </li>



              {sections.map(({ key, label, icon, uploadedKey }) => {
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
                      className="flex items-center justify-between px-2  cursor-pointer   hover:bg-blue-100 hover:text-blue-800 rounded"
                    >

                      <span className="flex items-center gap-2">
                        {icon}
                        <p>{label}</p>
                      </span>
                      {isOpen ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </div>
                    {/* text-[#DCDCDE] */}
                    <div
                      ref={(el) => (contentRefs.current[key] = el)}
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{ maxHeight: "0px" }}
                    >
                      <ul className=" ">
                        <li
                          onClick={() => handleSectionClick(uploadedKey)}
                          className="px-2 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded  "
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
                className="px-2  cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded  "
              >
                Videos


              </li>

              <li
                onClick={() => handleSectionClick('Blog')}
                className="px-2  cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded  "
              >
                Blog
              </li>
              <li
                onClick={() => handleSectionClick('AllBlogs')}
                className="px-2  cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded  "
              >
                All Blogs
              </li>



            </ul>

            <div className=" relative bottom-0 lg:mt-36 md:mt-36 ">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 font-bold p-10 bg-[#17549A] py-2 hover:bg-blue-100 hover:text-blue-700 rounded duration-300 ease-in-out"
              >
                <HiOutlineArrowLeftEndOnRectangle className='text-2xl ' />
                Back Home
              </Link>
            </div>
          </div>

        );
    }
  };


  const renderActiveSection = () => {
    // admin side dashboard
    if (userRole === 'Admin') {
      switch (activeSection) {
        case 'Create_Page':
          return <Create_Page />;
        case 'All_Page':
          return <All_Page />;
        case 'Students_Added':
          return <StudentsAdded />;
        case 'pohelaboishakImage':
          return <PohelaBoishakhImage />;
        case 'EidUlFitre':
          return <EidUlFitre />;
        case 'EidUlAdha':
          return <EidUlAdha />;
        case 'UploadCharityImage':
          return <UploadCharityImage />;
        case 'News':
          return <News />;
        case 'AllPhoto':
          return <AllPhoto />;
        case 'OrientationImage':
          return <OrientationImage />;
        case 'AdminCertificationImage':
          return <AdminCertificationImage />;
        case 'AwardsGiving':
          return <AwardsGiving />;
        case 'University_Added':
          return <UniversityBioDataAdded />;
        case 'Create_Post':
          return <CareerGuideBlogAdded />;
        case 'Create_Course':
          return <CourseAdded />;
        case 'All_Course':
          return <AllCourse />;
        case 'All_Posts':
          return <PublishedPost />;
        case 'FAQ_Added':
          return <FAQAdded />;
        case 'About_Us_Added':
          return <AboutUsAdded />;
        case 'Contact_Us_Added':
          return <ContactUsAdded />;
        case 'Manage_Users':
          return <ManageUsers />;
        case 'Add_Student':
          return <Add_Students />;
        default: return <AdminWelcomePage />;
      }
    } else {
      switch (activeSection) {
        // student side dashboard components
        case 'Profile':
          return <Profile />;
        case 'Profile_Edit':
          return <ProfileEdit />;
        case 'CvUpdate':
          return <CvUpload />;
        case 'dashboard':
          return <Welcome_Page />;
        case 'Enroll_Course':
          return <StudentEnrollCourse />;
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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold hidden md:block lg:block text-white break-words">
          Welcome to Career Builder
        </h1>


        {/* notify icon */}
        <div className="user-logo gap-3 relative">
          <ThemeToggle />

          {userRole !== "Admin" && (
            <div className="relative group">
              <button className="notification-btn relative">
                <IoNotificationsSharp className="text-xl text-[#2CAAE1]" />
                <span className="notification-badge">3</span>
              </button>

              {/* Notification Dropdown */}
              <div
                className="notification-dropdown grid-cols-3 absolute top-0 right-0
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-opacity duration-300 ease-in-out
        shadow-lg rounded-xl p-4 z-50"
              >
                <ul className="notification-grid">
                  <li>Job Enquiry: 50</li>
                  <li>Job Post: 50</li>
                  <li>My Portfolio: 50</li>
                  <li>Blog Post: 50</li>
                  <li>Picture: 50</li>
                  <li>Videos: 50</li>
                  <li>Course: 50</li>
                  <li>Study Abroad: 50</li>
                  <li>Language: 50</li>
                  <li>University: 50</li>
                  <li>Latest Blog: 50</li>
                </ul>
              </div>
            </div>
          )}

          {/* Profile Image always */}
          <Image
            width={40}
            height={40}
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




