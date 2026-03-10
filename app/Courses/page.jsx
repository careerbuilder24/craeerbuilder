// "use client";

// import useCourses from '@/hooks/useCourse';
// import useDetailsCourses from '@/hooks/useDetailsCourses';
// import React, { useState, useEffect } from 'react';
// import { RiHeart3Fill } from 'react-icons/ri';
// import { SlCalender } from "react-icons/sl";
// import { LuClock9 } from "react-icons/lu";
// import { MdAccessTime, MdPeopleAlt } from "react-icons/md";
// import StarRatings from 'react-star-ratings';
// import Link from 'next/link';
// import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
// import Footer from '../(with-navbar)/componenets/Footer/Footer';
// import Image from 'next/image';
// import Chatbot from '../(with-navbar)/componenets/chatBot/Chatbot';
// import HelmetHead from '../HelmetHead/HelmetHead';
// import img1 from '../../assets/details.PNG';
// import './Course.css';

// export default function Courses() {
//   const { DetailsCourses } = useDetailsCourses(); //   API data
//   const [loading, setLoading] = useState(true);

//   // For search and filtering (optional)
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedTitle, setSelectedTitle] = useState('');

//   useEffect(() => {
//     if (DetailsCourses) {
//       setLoading(false);
//     }
//   }, [DetailsCourses]);

//   const courseTitles = [
//     ...new Set(DetailsCourses?.map(course => course.course_title).filter(Boolean))
//   ];

//   const filteredCourses = DetailsCourses?.filter(course => {
//     const matchesSearch = course.course_title
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesTitle = selectedTitle === '' || course.course_title === selectedTitle;
//     return matchesSearch && matchesTitle;
//   });

//   return (
//     <>
//       <HelmetHead
//         title="Career Builder's Courses"
//         description="Browse and apply to top-rated international courses. Explore tuition, reviews, seat availability, and duration."
//         keywords="study abroad, online courses, international courses, career programs, course details"
//         author="Career Builder"
//       />

//       <Navbar />

//       {/* Header Banner Section */}
//       <div className="lg:py-14 relative lg:container lg:mx-auto lg:w-8/12 left-1">
//         <div className="flex flex-col items-center relative z-0 mt-16">
//           <div
//             className="max-w-[1200px] w-full h-[300px] bg-cover bg-center bg-[#77b1eb] opacity-80 relative mx-auto"
//             style={{ backgroundImage: `url(${img1.src})` }}
//           ></div>

//           {/* Mobile Search */}
//           <div className="lg:w-5/12 w-full md:hidden lg:hidden mb-10 relative bottom-28 overflow-hidden">
//             <div className="relative">
//               <input
//                 type="text"
//                 className="block w-8/12 px-4 py-2 text-gray-700 placeholder-gray-400 border rounded ml-10 focus:outline-none focus:ring focus:ring-blue-300"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="absolute inset-y-0 right-11 flex items-center px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
//               >
//                 Search
//               </button>
//             </div>

//             <div className="w-11/12 mt-5">
//               <select
//                 value={selectedTitle}
//                 onChange={(e) => setSelectedTitle(e.target.value)}
//                 className="bg-white cursor-pointer w-full py-2 px-3 rounded"
//               >
//                 <option value="">All Courses</option>
//                 {courseTitles.map((title, index) => (
//                   <option key={index} value={title}>{title}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Search */}
//       <div className="container mx-auto flex justify-center items-center hidden md:flex">
//         <div className="flex bg-[#2CAAE1] w-9/12 md:w-9/12 lg:w-9/12 shadow-lg p-5 items-center mb-10">
//           <div className="w-4/12">
//             <select
//               value={selectedTitle}
//               onChange={(e) => setSelectedTitle(e.target.value)}
//               className="bg-[#17549A] text-white cursor-pointer w-full py-3 px-4 rounded-l-md"
//             >
//               <option value="">All Courses</option>
//               {courseTitles.map((title, index) => (
//                 <option key={index} value={title}>{title}</option>
//               ))}
//             </select>
//           </div>

//           <div className="w-8/12 flex">
//             <input
//               type="text"
//               className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border-none rounded-r-md focus:outline-none focus:ring focus:ring-blue-300"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="ml-2 px-6 py-2 text-white bg-[#17549A] rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 🔹 Courses Grid */}
//       <div className="container mx-auto md:w-10/12 lg:w-7/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 custom-grid-layout lg:mt-0 w-9/12 md:mt-10">
//         {loading ? (
//           <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
//           </div>
//         ) : filteredCourses?.length > 0 ? (
//           filteredCourses.map((course) => (
//             <div
//               key={course.id}
//               className="relative cursor-pointer shadow-lg mb-3 overflow-hidden rounded-xl border group hover:border-[#56D3FD] border-[#DDDD] transition-all duration-300 bg-[#edf5f8]"
//             >
//               {/* 🖼 Banner Image */}
//               <div className="relative">
//                 <Image
//                   src={course.banner_image || '/default-banner.jpg'}
//                   alt={course.course_title || 'Course Banner'}
//                   width={500}
//                   height={300}
//                   className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
//                   onDragStart={(e) => e.preventDefault()}
//                 />

//                 {/*  Heart Icon */}
//                 <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <RiHeart3Fill size={24} className="text-red-500" />
//                 </div>

//                 {/* Info bar */}
//                 <div className="flex flex-row gap-1 justify-center items-center text-xs">
//                   <div className="w-16 h-5 bg-gray-300 rounded-md flex justify-center items-center px-1">
//                     <p>Batch {course.batch_number || '-'}</p>
//                   </div>
//                   <div className="flex flex-row justify-center items-center w-24 lg:w-28 h-5 bg-gray-300 rounded-md px-1">
//                     <MdPeopleAlt className="mr-1" />
//                     <p>Seat {course.seats_left || '-'}</p>
//                   </div>
//                   <div className="flex flex-row items-center w-20 h-5 bg-gray-300 rounded-md px-1">
//                     <MdAccessTime className="mr-1" />
//                     <p>{course.time_left ? course.time_left.slice(11, 16) : 'N/A'}</p>
//                   </div>
//                 </div>
//               </div>

//               {/*  Course Info */}
//               <div className="ml-3 mt-2 text-sm">
//                 <h2 className="text-base font-bold">{course.course_title}</h2>

//                 <div className="gap-1 flex items-center my-1">
//                   <div className="flex flex-row items-center gap-1">
//                     <SlCalender className="text-xs" />
//                     <p className="text-gray-700 mr-3">
//                       {course.startDate
//                         ? new Date(course.startDate).toLocaleDateString('en-GB', {
//                             day: '2-digit',
//                             month: 'short',
//                             year: 'numeric',
//                           })
//                         : 'No Date'}
//                     </p>
//                   </div>
//                   <LuClock9 className="text-xs" />
//                   <p className="text-gray-700">
//                     Duration {course.numberOfClasses || 'N/A'} classes
//                   </p>
//                 </div>

//                 {/*  Rating */}
//                 <StarRatings
//                   rating={parseFloat(course.star_rating) || 0}
//                   starDimension="15px"
//                   starSpacing="2px"
//                   starRatedColor="gold"
//                   numberOfStars={5}
//                   name="rating"
//                 />
//               </div>

//               {/*  View Details Button */}
//               <div className="mt-4 px-2 mb-3">
//                 <Link href={`/details/${course.id}`} passHref>
//                   <button className="bg-[#b3dfee] text-white py-2 px-8 rounded hover:bg-[#56d3fd] transition w-full duration-300 font-bold">
//                     View Details
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-lg">No courses found</p>
//         )}
//       </div>

//       <Footer />
//       <Chatbot />
//     </>
//   );
// }
"use client";

import useCourses from '@/hooks/useCourse';
import useDetailsCourses from '@/hooks/useDetailsCourses';
import React, { useState, useEffect } from 'react';
import { RiHeart3Fill } from 'react-icons/ri';
import { SlCalender } from "react-icons/sl";
import { LuClock9 } from "react-icons/lu";
import { MdAccessTime, MdPeopleAlt } from "react-icons/md";
import StarRatings from 'react-star-ratings';
import Link from 'next/link';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import Footer from '../(with-navbar)/componenets/Footer/Footer';
import Image from 'next/image';
import Chatbot from '../(with-navbar)/componenets/chatBot/Chatbot';
import HelmetHead from '../HelmetHead/HelmetHead';
import img1 from '../../assets/details.PNG';
import './Course.css';

// ✅ Helper to create slug from course title
const createSlug = (title) => {
  return title
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove special characters
    .trim()
    .replace(/\s+/g, '-') // replace spaces with dashes
    .replace(/-+/g, '-'); // collapse multiple dashes
};

export default function Courses() {
  const { DetailsCourses } = useDetailsCourses();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');





  useEffect(() => {
    if (DetailsCourses) setLoading(false);
  }, [DetailsCourses]);

  const courseTitles = [
    ...new Set(DetailsCourses?.map(course => course.course_title).filter(Boolean))
  ];

  const filteredCourses = DetailsCourses?.filter(course => {
    const matchesSearch = course.course_title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTitle = selectedTitle === '' || course.course_title === selectedTitle;
    return matchesSearch && matchesTitle;
  });

  return (
    <>
      <HelmetHead
        title="Career Builder's Courses"
        description="Browse and apply to top-rated international courses. Explore tuition, reviews, seat availability, and duration."
        keywords="study abroad, online courses, international courses, career programs, course details"
        author="Career Builder"
      />

      <Navbar />

      {/* Header Banner Section */}
      <div className="lg:py-14 relative lg:container lg:mx-auto lg:w-8/12 left-1">
        <div className="flex flex-col items-center relative z-0 mt-16">
          <div
            className="max-w-[1200px] w-full h-[300px] bg-cover bg-center bg-[#77b1eb] opacity-80 relative mx-auto"
            style={{ backgroundImage: `url(${img1.src})` }}
          ></div>

          {/* Mobile Search */}
          <div className="lg:w-5/12 w-full md:hidden lg:hidden mb-10 relative bottom-28 overflow-hidden">
            <div className="relative">
              <input
                type="text"
                className="block w-8/12 px-4 py-2 text-gray-700 placeholder-gray-400 border rounded ml-10 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-11 flex items-center px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Search
              </button>
            </div>

            <div className="w-11/12 mt-5">
              <select
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                className="bg-white cursor-pointer w-full py-2 px-3 rounded"
              >
                <option value="">All Courses</option>
                {courseTitles.map((title, index) => (
                  <option key={index} value={title}>{title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Search */}
      <div className="container mx-auto flex justify-center items-center hidden md:flex">
        <div className="flex bg-[#2CAAE1] w-9/12 md:w-9/12 lg:w-9/12 shadow-lg p-5 items-center mb-10">
          <div className="w-4/12">
            <select
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              className="bg-[#17549A] text-white cursor-pointer w-full py-3 px-4 rounded-l-md"
            >
              <option value="">All Courses</option>
              {courseTitles.map((title, index) => (
                <option key={index} value={title}>{title}</option>
              ))}
            </select>
          </div>

          <div className="w-8/12 flex">
            <input
              type="text"
              className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border-none rounded-r-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 px-6 py-2 text-white bg-[#17549A] rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Courses Grid */}
      <div className="container mx-auto md:w-10/12 lg:w-7/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 custom-grid-layout lg:mt-0 w-9/12 md:mt-10">
        {loading ? (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : filteredCourses?.length > 0 ? (
          filteredCourses.map((course) => {
            const slug = createSlug(course.course_title);
            return (
              <div
                key={course.id}
                className="relative cursor-pointer shadow-lg mb-3 overflow-hidden rounded-xl border group hover:border-[#56D3FD] border-[#DDDD] transition-all duration-300 bg-[#edf5f8]"
              >
                {/*  Banner Image */}
                <div className="relative">
                  <Image
                    src={course.banner_image || '/default-banner.jpg'}
                    alt={course.course_title || 'Course Banner'}
                    width={500}
                    height={300}
                    className="rounded-t-xl mb-4 object-cover w-full transition-transform duration-300 hover:scale-110"
                    onDragStart={(e) => e.preventDefault()}
                  />

                  {/* Heart Icon */}
                  <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <RiHeart3Fill size={24} className="text-red-500" />
                  </div>

                  {/* Info bar */}
                  <div className="flex flex-row gap-1 justify-center items-center text-xs">
                    <div className="w-16 h-5 bg-gray-300 rounded-md flex justify-center items-center px-1">
                      <p>Batch {course.batch_number || '-'}</p>
                    </div>
                    <div className="flex flex-row justify-center items-center w-24 lg:w-28 h-5 bg-gray-300 rounded-md px-1">
                      <MdPeopleAlt className="mr-1" />
                      <p>Seat {course.seats_left || '-'}</p>
                    </div>
                    <div className="flex flex-row items-center w-20 h-5 bg-gray-300 rounded-md px-1">
                      <MdAccessTime className="mr-1" />
                      <p>{course.time_left ? course.time_left.slice(11, 16) : 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/*  Course Info */}
                <div className="ml-3 mt-2 text-sm">
                  <h2 className="text-base font-bold">{course.course_title}</h2>

                  <div className="gap-1 flex items-center my-1">
                    <div className="flex flex-row items-center gap-1">
                      <SlCalender className="text-xs" />
                      <p className="text-gray-700 mr-3">
                        {course.startDate
                          ? new Date(course.startDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })
                          : 'No Date'}
                      </p>
                    </div>
                    <LuClock9 className="text-xs" />
                    <p className="text-gray-700">
                      Duration {course.numberOfClasses || 'N/A'} classes
                    </p>
                  </div>

                  {/*  Rating */}
                  <StarRatings
                    rating={parseFloat(course.star_rating) || 0}
                    starDimension="15px"
                    starSpacing="2px"
                    starRatedColor="gold"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>

                {/*  View Details Button with Slug */}
                <div className="mt-4 px-2 mb-3">
                  <Link href={`/details/${slug}`} passHref>
                    <button className="bg-[#b3dfee] text-white py-2 px-8 rounded hover:bg-[#56d3fd] transition w-full duration-300 font-bold">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-lg">No courses found</p>
        )}
      </div>

      <Footer />
      <Chatbot />
    </>
  );
}
