'use client';

import Navbar from '../componenets/Navbar/Navbar';
import img1 from '../../../assets/details.PNG';
import { useState, useEffect } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import useBrackCourseList from '@/hooks/useBrackCourseList';
import Footer from '../componenets/Footer/Footer';
import dynamic from 'next/dynamic'; // For dynamic imports

// Dynamically import Lottie to disable SSR
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
// import animationData from '../../../assets/AnimationLotie.json'; 

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
    return <div>Loading...</div>;
  }

  return (
    <>
      <main>
        <Navbar />
        <div className="lg:mt-48 container mx-auto">
          <div className="w-9/12 container mx-auto">
            <div
              className="w-full h-72 lg:h-[400px] md:h-[400px] bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${img1.src})` }}
            >
              <div className="bg-[#17549A] w-9/12 h-36 container mx-auto rounded-xl flex items-center justify-center">
                <h1 className="text-5xl lg:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ec7e7] shadow-lg py-10">
                  All University List
                </h1>
              </div>
            </div>

            <div className="container mx-auto my-10">
              <div className="mb-4 flex justify-end">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search University..."
                  className="border p-2 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="overflow-x-auto">
                <div className="overflow-auto max-w-full max-h-[700px]">
                  <table className="min-w-[1600px] border-collapse border text-sm border-gray-200">
                    <thead className="bg-gray-800 text-white sticky top-0 z-10">
                      <tr>
                        <th className="border border-gray-200 p-2 text-center min-w-[200px]">University Name</th>
                        <th className="border border-gray-200 p-2 text-center min-w-[350px]">Undergraduate Courses & Credits</th>
                        <th className="border border-gray-200 p-2 text-center min-w-[350px]">Postgraduate Courses & Credits</th>
                        <th className="border border-gray-200 p-2 text-center min-w-[200px]">Diploma</th>
                        <th className="border border-gray-200 p-2 text-center min-w-[200px]">Course Cost</th>
                        <th className="border border-gray-200 p-2 text-center min-w-[200px]">University Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBrackList.map((BrackLists, index) => (
                        <tr
                          key={BrackLists.id}
                          className={index % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]'}
                        >
                          <td className="border text-center p-2">
                            <div className="flex flex-col items-center justify-center text-xs">
                              <img
                                src={BrackLists.image}
                                alt={BrackLists.course_name}
                                className="w-16 h-16 mx-auto"
                              />
                              <div className="text-xs mt-2 text-center">
                                {BrackLists.versity_name}
                              </div>
                            </div>
                          </td>
                          <td className="border text-left p-2 text-xs whitespace-nowrap">
                            <div>{BrackLists.course_name_First}</div>
                            <div>{BrackLists.course_name_Second}</div>
                          </td>
                          <td className="border text-center p-2 whitespace-nowrap">
                            <a href={BrackLists.apply_link} target="_blank" rel="noopener noreferrer">
                              Apply Here
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form with Lottie Animation */}
          <div className="container mx-auto my-20 flex justify-between items-center w-8/12">
            <div className="w-6/12">
              <h2 className="text-2xl font-semibold mb-4 text-[#6AD0F7]">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message"
                    className="border p-2 rounded-md w-full"
                    rows="4"
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {/* <div className="w-1/2">
              <Lottie animationData={animationData} loop={true} />
            </div> */}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
