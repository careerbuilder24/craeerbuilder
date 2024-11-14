import React from 'react';
import Video from 'next-video';
import { FaInstagram, FaLinkedin, FaFacebookF, FaYoutube } from 'react-icons/fa'; // Font Awesome icons
import img1 from '../../../../../assets/blogimg3.PNG';
import img2 from '../../../../../assets/blogimg2.PNG';
import img3 from '../../../../../assets/blogimg3.PNG';
import Image from 'next/image';

export default function GraphicsVideos() {
    return (
        <>
            <main>
                <div className='flex flex-row mt-10'>
                    {/* First part */}
                    <div className='w-8/12'>
                        {/* Video Section 1 */}
                        <div className='flex flex-row gap-4 rounded-xl ml-4 shadow-lg bg-[#272727] text-white'>
                            <div>
                                <h2 className='mt-10 ml-3'>This video is about my resume video where I talk about my skills and why I am the best.</h2>
                            </div>
                            <div className='w-11/12 lg:w-9/12 rounded-xl overflow-hidden'>
                                <Video src="/videos/madlia.mp4" controls />
                            </div>
                        </div>

                        {/* Video Section 2 */}
                        <div className='flex flex-row gap-4 rounded-xl ml-4 shadow-lg mt-10 bg-[#272727] text-white'>
                            <div className='w-11/12 rounded-xl overflow-hidden'>
                                <Video src="/videos/madlia.mp4" controls />
                            </div>
                            <div>
                                <h2 className='mt-10 ml-3'>This video is about my resume video where I talk about my skills and why I am the best.</h2>
                            </div>
                            <div>
                                <h1 className='text-white relative rounded-lg w-11 text-center h-5 top-0 right-0 bg-red-600 font-bold text-sm'>NEW</h1>
                            </div>
                        </div>

                        {/* Video Section 3 */}
                        <div className='flex flex-row gap-4 rounded-xl ml-4 shadow-lg mt-10 bg-[#272727] text-white'>
                            <div>
                                <h1 className='text-white relative rounded-lg w-11 text-center h-5 top-0 left-0 bg-red-600 font-bold text-sm'>NEW</h1>
                            </div>
                            <div>
                                <h2 className='mt-10 ml-3'>Here I have showed my skill test in type.</h2>
                            </div>
                            <div className='w-6/12 rounded-xl overflow-hidden'>
                                <Video src="/videos/madlia.mp4" controls />
                            </div>
                        </div>

                        {/* Video Section 4 */}
                        <div className='flex flex-row gap-4 rounded-xl ml-4 shadow-lg mt-10 bg-[#272727] text-white'>
                            <div className='w-6/12 rounded-xl overflow-hidden'>
                                <Video src="/videos/madlia.mp4" controls />
                            </div>
                            <div>
                                <h2 className='mt-10 ml-3'>Here I have showed my skill test in type.</h2>
                            </div>
                        </div>
                    </div>

                    {/* Second part - Follow Us Section */}
                    <div className='w-4/12 p-4 bg-gray-100 rounded-lg shadow-lg ml-3'>




                        <h3 className='text-center text-2xl mb-6 text-[#2CAAE1]'>New Blog</h3>

                        <div className='flex flex-row gap-2'>
                            <div>
                                <h3 className='text-xs'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. <span className="text-blue-500 cursor-pointer hover:underline">Read more..</span></h3>
                            </div>
                            <div>
                                <Image width={500} height={500} src={img1} className='rounded-lg'></Image>
                            </div>

                        </div>

                        <div className='flex flex-row gap-2 mt-5'>

                            <div>
                            <h3 className='text-xs'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. <span className="text-blue-500 cursor-pointer hover:underline">Read more..</span></h3>
                            </div>
                            <div className=''>
                                <Image width={500} height={500} src={img1} className='rounded-lg'></Image>
                            </div>

                        </div>
                        <div className='flex flex-row gap-2 mt-5'>

                            <div>
                            <h3 className='text-xs'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. <span className="text-blue-500 cursor-pointer hover:underline">Read more..</span></h3>
                            </div>
                            <div>
                                <Image width={500} height={500} src={img1} className='rounded-lg'></Image>
                            </div>

                        </div>





                        <h2 className='text-2xl  my-6 text-[#2CAAE1] font-bold text-center'>Follow Us</h2>

                        {/* Social Media Icons and Text */}
                        <div className='space-y-6 cursor-pointer'>
                            {/* Instagram */}
                            <div className='flex items-center space-x-4'>
                                <FaInstagram className="text-3xl text-purple-500 hover:text-purple-700 transition duration-300" />
                                <span className='text-lg text-gray-700'>Instagram</span>
                            </div>

                            {/* LinkedIn */}
                            <div className='flex items-center space-x-4'>
                                <FaLinkedin className="text-3xl text-blue-700 hover:text-blue-900 transition duration-300" />
                                <span className='text-lg text-gray-700'>LinkedIn</span>
                            </div>

                            {/* Facebook */}
                            <div className='flex items-center space-x-4'>
                                <FaFacebookF className="text-3xl text-blue-600 hover:text-blue-800 transition duration-300" />
                                <span className='text-lg text-gray-700'>Facebook</span>
                            </div>

                            {/* YouTube */}
                            <div className='flex items-center space-x-4'>
                                <FaYoutube className="text-3xl text-red-600 hover:text-red-800 transition duration-300" />
                                <span className='text-lg text-gray-700'>YouTube</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
