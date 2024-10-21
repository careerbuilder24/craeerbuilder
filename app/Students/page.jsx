'use client';
import React, { useState } from 'react';
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar';
import Image from 'next/image';
import instrastor from '../../assets/insta.avif';
import instrastor1 from '../../assets/insta1.avif';
import instrastor2 from '../../assets/insta3.avif';
import Footer from '../(with-navbar)/componenets/Footer/Footer';

export default function Page() {
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  return (
    <main>
      <Navbar />
      <div className='lg:mt-56 mt-40 container mx-auto h-16 w-full flex items-center justify-center '>
        <div className="flex flex-col justify-center gap-3 mt-10">
          <button
            onClick={() => handleButtonClick(1)}
            className="bg-[#00adea] text-black rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300"
          >
            ALL
          </button>




          <div className='flex'>
            <button
              onClick={() => handleButtonClick(2)}
              className="bg-green-500 text-white rounded-md  w-36 hover:bg-green-600 transition duration-300"
            >
              Graphic Design
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              className="bg-green-500 text-white rounded-md w-36 hover:bg-green-600 transition duration-300"
            >
              Mption Graphics
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              className="bg-green-500 text-white rounded-md w-32 hover:bg-green-600 transition duration-300"
            >
              Video Editing
            </button>

            <button
              onClick={() => handleButtonClick(2)}
              className="bg-green-500 text-white rounded-md w-72 hover:bg-green-600 transition duration-300"
            >
              Web Development (Front-end)
            </button>
          </div>



          <div className='flex'>
            <button
              onClick={() => handleButtonClick(2)}
              className="bg-green-500 text-white rounded-md w-72 hover:bg-green-600 transition duration-300"
            >
              Web Development (Backend)
            </button>
            <button
              onClick={() => handleButtonClick(3)}
              className="bg-red-500 text-white rounded-md w-44 hover:bg-red-600 transition duration-300"
            >
              Digital Marketing
            </button>
            <button
              onClick={() => handleButtonClick(3)}
              className="bg-red-500 text-white rounded-md w-44  hover:bg-red-600 transition duration-300"
            >
              Affiliate Marketing
            </button>
            <button
              onClick={() => handleButtonClick(3)}
              className="bg-red-500 text-white rounded-md w-60 hover:bg-red-600 transition duration-300"
            >
              Business Development
            </button>
          </div>








        </div>
      </div>

      {/* card section */}
      <div className="text-center my-6 mt-16">
        {activeButton === 1 && (
          <div className='container mx-auto'>
            <div className='flex flex-grow flex-col lg:flex-row lg:w-11/12 lg:ml-24  gap-4 mt-5'>


              <div className='lg:w-6/12 relative gap-4 overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>


              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>



            </div>
            <div className='flex flex-grow flex-col lg:flex-row lg:w-11/12 lg:ml-24  gap-4 mt-5'>


              <div className='lg:w-6/12 relative gap-4 overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>


              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>



            </div>
            <div className='flex flex-grow flex-col lg:flex-row lg:w-11/12 lg:ml-24  gap-4 mt-5'>


              <div className='lg:w-6/12 relative gap-4 overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>


              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>



            </div>
          </div>
        )}
        {activeButton === 2 && (
          <div className='container mx-auto'>
            <div className='flex flex-grow flex-col lg:flex-row lg:w-11/12 lg:ml-24  gap-4 mt-5 '>


              <div className='lg:w-6/12 relative gap-4 overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>


              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>



            </div>
            <div className='flex flex-grow flex-col lg:flex-row lg:w-11/12 lg:ml-24  gap-4 mt-5 '>


              <div className='lg:w-6/12 relative gap-4 overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>


              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>



            </div>
            <div className='flex flex-grow flex-col lg:flex-row lg:w-11/12 lg:ml-24  gap-4 mt-5 '>


              <div className='lg:w-6/12 relative gap-4 overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>


              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor1}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>



            </div>
          </div>
        )
        }
        {activeButton === 3 && (
          <div className='container mx-auto'>
            <div className='flex flex-grow flex-col lg:flex-row lg:w-11/12 lg:ml-24  gap-4 mt-5'>


              <div className='lg:w-6/12 relative gap-4 overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>


              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>



            </div>
            <div className='flex flex-grow flex-col lg:flex-row lg:w-11/12 lg:ml-24  gap-4 mt-5'>


              <div className='lg:w-6/12 relative gap-4 overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>


              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>



            </div>
            <div className='flex flex-grow flex-col lg:flex-row lg:w-11/12 lg:ml-24  gap-4 mt-5'>


              <div className='lg:w-6/12 relative gap-4 overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>


              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>
              <div className='lg:w-6/12 relative overflow-hidden cursor-pointer'>
                <div className='lg:w-11/12'>
                  <Image
                    src={instrastor2}
                    className='w-full rounded-lg'
                    alt="Instructor"
                  />
                </div>
                <div className='absolute top-0 lg:w-11/12 w-full h-full left-0 bg-gray-500 bg-opacity-50 text-white transition-transform duration-700 ease-in-out transform translate-y-[-20px] opacity-0 hover:translate-y-0 hover:opacity-100'>
                  <div className='mt-14'>
                    <p>Sushmita Shen</p>
                    <p>Batch: 01</p>
                    <p>Course ID: 127894</p>
                    <p>Course Name: Graphics Design</p>
                    <p>Duration: 6 Months</p>
                    <p>Internship: 2 Months</p>
                  </div>
                </div>
              </div>



            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </main>
  );
}
