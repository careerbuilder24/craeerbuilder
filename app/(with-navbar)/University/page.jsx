// 'use client';

// import Navbar from '../componenets/Navbar/Navbar';
// import img1 from '../../../assets/details.PNG';
// import { useState, useEffect } from 'react';
// import { FaArrowDown } from 'react-icons/fa';
// import useBrackCourseList from '@/hooks/useBrackCourseList';
// import Footer from '../componenets/Footer/Footer';
// import dynamic from 'next/dynamic'; // For dynamic imports

// // Dynamically import Lottie to disable SSR
// const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
// import animationData from '../../../assets/AnimationLotie.json';
// import Chatbot from '../componenets/chatBot/Chatbot';

// export default function Page() {
//   const BrackList = useBrackCourseList();

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredBrackList, setFilteredBrackList] = useState([]);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   useEffect(() => {
//     if (BrackList && BrackList.length > 0) {
//       const result =
//         searchQuery === ''
//           ? BrackList
//           : BrackList.filter((item) =>
//             item.versity_name?.toLowerCase().includes(searchQuery.toLowerCase())
//           );

//       setFilteredBrackList(result);
//     }
//   }, [searchQuery, BrackList]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data Submitted:', formData);
//     alert('Thank you for contacting us! We will get back to you shortly.');
//     setFormData({ name: '', email: '', message: '' });
//   };

//   if (!BrackList || BrackList.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <main>
//         <Navbar />
//         <div className="lg:mt-32 container mx-auto">
//           <div className="w-9/12 container mx-auto">
//             <div className="w-full">
//               {/* Full-Width Image Container */}
//               <div className="w-full mt-6 sm:mt-10"> {/* Margin top added */}
//                 <div className="w-full h-64 sm:h-96 md:h-[500px] bg-contain bg-no-repeat bg-center">
//                   <img
//                     src={img1.src}
//                     alt="University List"
//                     className="w-full h-full object-contain object-center"
//                   />
//                 </div>
//               </div>

//               {/* Text Container - BELOW the image */}
//               <div className="w-full max-w-4xl mx-auto mt-3 sm:mt-5">
//                 <div className="bg-[#17549A] rounded-xl flex items-center justify-center px-4 py-3 sm:px-6 sm:py-6 shadow-xl">
//                   <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ec7e7]">
//                     All University List
//                   </h1>
//                 </div>
//               </div>

//             </div>


//             <div className="container mx-auto my-10">
//               <div className="mb-4 flex justify-end">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search University..."
//                   className="border p-2 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div className="overflow-x-auto">
//                 <div className="overflow-auto max-w-full max-h-[700px]">
//                   <table className="min-w-[1600px] border-collapse border text-sm border-gray-200">
//                     <thead className="bg-gray-800 text-white sticky top-0 z-10">
//                       <tr>
//                         <th className="border border-gray-200 p-2 text-center min-w-[200px]">University Name</th>
//                         <th className="border border-gray-200 p-2 text-center min-w-[350px]">Undergraduate Courses & Credits</th>
//                         <th className="border border-gray-200 p-2 text-center min-w-[350px]">Postgraduate Courses & Credits</th>
//                         <th className="border border-gray-200 p-2 text-center min-w-[200px]">Diploma</th>
//                         <th className="border border-gray-200 p-2 text-center min-w-[200px]">Course Cost</th>
//                         <th className="border border-gray-200 p-2 text-center min-w-[200px]">University Link</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredBrackList.map((BrackLists, index) => (
//                         <tr
//                           key={BrackLists.id}
//                           className={index % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]'}
//                         >
//                           <td className="border text-center p-2">
//                             <div className="flex flex-col items-center justify-center text-xs">
//                               <img
//                                 src={BrackLists.image}
//                                 alt={BrackLists.course_name}
//                                 className="w-16 h-16 mx-auto"
//                               />
//                               <div className="text-xs mt-2 text-center">
//                                 {BrackLists.versity_name}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="border text-left p-2 text-xs whitespace-nowrap">
//                             <div>{BrackLists.course_name_First}</div>
//                             <div>{BrackLists.course_name_Second}</div>
//                           </td>
//                           <td className="border text-center p-2 whitespace-nowrap">
//                             <a href={BrackLists.apply_link} target="_blank" rel="noopener noreferrer">
//                               Apply Here
//                             </a>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form with Lottie Animation */}
//           <div className="container mx-auto my-20 flex justify-between items-center w-8/12">
//             <div className="w-6/12">
//               <h2 className="text-2xl font-semibold mb-4 text-[#6AD0F7]">Contact Us</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2" htmlFor="name">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your name"
//                     className="border p-2 rounded-md w-full"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2" htmlFor="email">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Enter your email"
//                     className="border p-2 rounded-md w-full"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2" htmlFor="message">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     placeholder="Enter your message"
//                     className="border p-2 rounded-md w-full"
//                     rows="4"
//                     required
//                   />
//                 </div>
//                 <div className="text-center">
//                   <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//             <div className="w-1/2">
//               <Lottie animationData={animationData} loop={true} />
//             </div>
//           </div>
//         </div>

//         <Footer />
//       </main>
//       <Chatbot />
//     </>
//   );
// }
'use client';

import Navbar from '../componenets/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaGraduationCap, FaMoneyBillWave, FaIdBadge, FaSearch } from 'react-icons/fa'; // Added new icons
import useBrackCourseList from '@/hooks/useBrackCourseList';
import Footer from '../componenets/Footer/Footer';
import dynamic from 'next/dynamic';
import Chatbot from '../componenets/chatBot/Chatbot';

// Dynamically import Lottie to disable SSR
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '../../../assets/AnimationLotie.json';

export default function Page() {
  const BrackList = useBrackCourseList();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBrackList, setFilteredBrackList] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (BrackList && BrackList.length > 0) {
      const result =
        searchQuery === ''
          ? BrackList
          : BrackList.filter((item) =>
              item.versity_name?.toLowerCase().includes(searchQuery.toLowerCase())
            );

      setFilteredBrackList(result);
    }
  }, [searchQuery, BrackList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Thank you for contacting us! We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  if (!BrackList || BrackList.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-medium">
        Loading...
      </div>
    );
  }

  // Helper component for mobile card data
  const MobileCardItem = ({ icon: Icon, label, value, isLink = false, linkHref = '' }) => (
    <div className="flex items-start text-gray-700 py-1 border-b border-gray-100 last:border-b-0">
      <Icon className="w-4 h-4 text-[#17549A] mt-1 flex-shrink-0 mr-2" />
      <div className="flex flex-col w-full">
        <span className="text-xs font-semibold text-gray-500 uppercase">{label}</span>
        {isLink ? (
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium break-words"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm font-medium break-words">{value}</span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <main>
        <Navbar />
        <div className="lg:mt-32 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl mx-auto">
            
            {/* --- HEADER --- */}
            <div className="w-full max-w-4xl mx-auto mt-8 mb-10">
              <div className="bg-gradient-to-r from-[#17549A] to-cyan-500 rounded-xl flex items-center justify-center px-4 py-4 sm:py-6 shadow-xl"> 
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center">
                  University Course List
                </h1>
              </div>
            </div>

            {/* --- University List Table/Cards Section --- */}
            <div className="container mx-auto my-10 sm:my-16">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Available Courses</h2>
                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search University..."
                        className="border border-gray-300 pl-10 pr-4 py-2 rounded-lg text-sm w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-[#17549A] transition duration-150"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* --- DESKTOP/TABLET TABLE (Hidden on small screens) --- */}
              <div className="hidden sm:block shadow-xl rounded-lg border border-gray-200">
                <div className="w-full"> 
                  <table className="w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-[#17549A] text-white sticky top-0 z-10">
                      <tr>
                        <th className="w-[15%] px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider">
                          University
                        </th>
                        <th className="w-[25%] px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider">
                          Undergrad Courses
                        </th>
                        <th className="w-[25%] px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider">
                          Postgrad Courses
                        </th>
                        <th className="w-[10%] px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider">
                          Diploma
                        </th>
                        <th className="w-[10%] px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider">
                          Cost (USD)
                        </th>
                        <th className="w-[15%] px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider">
                          Apply Link
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filteredBrackList.map((BrackLists, index) => (
                        <tr
                          key={BrackLists.id}
                          className={`
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            hover:bg-blue-50 transition duration-150 ease-in-out
                          `}
                        >
                          {/* UNIVERSITY NAME */}
                          <td className="px-2 py-3 text-center text-sm font-medium text-gray-900 overflow-hidden">
                            <div className="flex flex-col items-center justify-center">
                              <img
                                src={BrackLists.image}
                                alt={BrackLists.versity_name}
                                className="w-8 h-8 mx-auto object-contain rounded-full border"
                              />
                              <div className="text-xs sm:text-sm mt-1 font-semibold text-gray-700 whitespace-normal">
                                {BrackLists.versity_name}
                              </div>
                            </div>
                          </td>
                          
                          {/* UNDERGRAD COURSES */}
                          <td className="px-2 py-3 text-left text-sm text-gray-500 overflow-hidden">
                            <ul className="list-disc pl-4 space-y-0">
                                <li className="text-xs">{BrackLists.course_name_First || 'N/A'}</li>
                                <li className="text-xs">{BrackLists.course_name_Second || 'N/A'}</li>
                            </ul>
                          </td>
                          
                          {/* POSTGRAD COURSES */}
                          <td className="px-2 py-3 text-left text-sm text-gray-500 overflow-hidden">
                            <ul className="list-disc pl-4 space-y-0">
                                <li className="text-xs">{BrackLists.course_name_Third || 'N/A'}</li>
                                <li className="text-xs">{BrackLists.course_name_Fourth || 'N/A'}</li>
                            </ul>
                          </td>
                          
                          {/* DIPLOMA */}
                          <td className="px-2 py-3 text-center text-xs text-gray-500 overflow-hidden">
                            <span className="text-gray-700 font-medium">
                                {BrackLists.diploma || 'N/A'} 
                            </span>
                          </td>
                          
                          {/* COURSE COST */}
                          <td className="px-2 py-3 text-center text-xs font-semibold text-green-600 overflow-hidden">
                            <span className="bg-green-100 px-1 py-0.5 rounded-full text-xs">
                                {BrackLists.course_cost || 'Inquire'} 
                            </span>
                          </td>
                          
                          {/* APPLY LINK */}
                          <td className="px-2 py-3 text-center text-xs font-medium overflow-hidden">
                            <a 
                              href={BrackLists.apply_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#17549A] hover:text-blue-700 font-semibold transition duration-150 inline-flex items-center group"
                            >
                              Apply
                              <FaArrowRight className="ml-1 w-2 h-2 transition duration-300 group-hover:translate-x-1" />
                            </a>
                          </td>
                        </tr>
                      ))}
                      {filteredBrackList.length === 0 && (
                          <tr>
                              <td colSpan="6" className="text-center py-8 text-gray-500 text-lg">
                                  No universities found matching your search.
                              </td>
                          </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* --- MOBILE CARD VIEW (Hidden on large screens) --- */}
              <div className="sm:hidden space-y-4">
                {filteredBrackList.map((BrackLists) => (
                    <div key={BrackLists.id} className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
                        {/* University Header */}
                        <div className="flex items-center border-b pb-3 mb-3">
                            <img
                                src={BrackLists.image}
                                alt={BrackLists.versity_name}
                                className="w-10 h-10 object-contain rounded-full border mr-3"
                            />
                            <h3 className="text-lg font-bold text-[#17549A]">{BrackLists.versity_name}</h3>
                        </div>

                        {/* Details */}
                        <div className="space-y-2">
                            <MobileCardItem 
                                icon={FaGraduationCap} 
                                label="Undergraduate Courses" 
                                value={`${BrackLists.course_name_First || 'N/A'} / ${BrackLists.course_name_Second || 'N/A'}`}
                            />
                            <MobileCardItem 
                                icon={FaGraduationCap} 
                                label="Postgraduate Courses" 
                                value={`${BrackLists.course_name_Third || 'N/A'} / ${BrackLists.course_name_Fourth || 'N/A'}`}
                            />
                            <MobileCardItem 
                                icon={FaIdBadge} 
                                label="Diploma" 
                                value={BrackLists.diploma || 'N/A'}
                            />
                            <MobileCardItem 
                                icon={FaMoneyBillWave} 
                                label="Course Cost (USD)" 
                                value={BrackLists.course_cost || 'Inquire Directly'}
                            />
                        </div>

                        {/* Apply Link */}
                        <div className="mt-4 pt-3 border-t">
                            <MobileCardItem 
                                icon={FaArrowRight} 
                                label="Application Link" 
                                value="Apply Now"
                                isLink={true}
                                linkHref={BrackLists.apply_link}
                            />
                        </div>
                    </div>
                ))}

                {filteredBrackList.length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-lg">
                        No universities found matching your search.
                    </div>
                )}
              </div>
            </div>

            {/* --- Contact Form with Lottie Animation --- */}
            <div className="container mx-auto my-20 flex flex-col lg:flex-row justify-between items-center w-full max-w-6xl p-6 bg-white rounded-xl shadow-2xl">
              <div className="w-full lg:w-1/2 p-4">
                <h2 className="text-3xl font-bold mb-6 text-[#17549A] border-b-2 border-[#6AD0F7] pb-2">
                  Get in Touch
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#6AD0F7] focus:border-transparent transition duration-150"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#6AD0F7] focus:border-transparent transition duration-150"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter your message"
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#6AD0F7] focus:border-transparent transition duration-150"
                      rows="4"
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-[#17549A] text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-[1.01]"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-full lg:w-1/2 p-4 mt-8 lg:mt-0">
                <Lottie animationData={animationData} loop={true} />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
      <Chatbot />
    </>
  );
}