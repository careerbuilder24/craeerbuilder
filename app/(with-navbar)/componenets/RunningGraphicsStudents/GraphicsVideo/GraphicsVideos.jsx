import React from 'react';
import Video from 'next-video';
import { FaInstagram, FaLinkedin, FaFacebookF, FaYoutube } from 'react-icons/fa'; // Font Awesome icons
import img1 from '../../../../../assets/blogimg3.PNG';
import img2 from '../../../../../assets/blogimg2.PNG';
import img3 from '../../../../../assets/blogimg3.PNG';
import Image from 'next/image';
import useYoutubeStudents from '@/hooks/useYoutubeStudents';

export default function GraphicsVideos() {
    const { youtubeVideos, loading, error } = useYoutubeStudents();  // Call the custom hook to get the data

    // Conditional rendering based on loading or error states
    if (loading) {
        return <div>Loading videos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <main>
                <div className="flex flex-col lg:flex-row mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center items-center gap-4 my-3 px-2 w-full lg:w-9/12">
                        {youtubeVideos.map((video) => (
                            <div
                                key={video.id}
                                className="bg-[#002C47] p-3 shadow-lg rounded-lg overflow-hidden w-full flex flex-col"
                            >
                                {/* Video Title/Text - Moved to top */}
                                <h3 className="text-lg font-semibold text-center text-white">
                                    {video.title}
                                </h3>

                                {/* Video iframe with controls */}
                                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.videoId}?controls=1&modestbranding=1&mute=0`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>

                                </div>
                            </div>
                        ))}
                    </div>



                    {/* Second part - Follow Us Section */}
                    <div className="w-full lg:w-3/12 p-4 bg-gray-100 rounded-lg shadow-lg lg:ml-3">
                        <h3 className="text-center text-xl mb-6 text-[#2CAAE1]">My Videos</h3>
                        <div className="mt-10 w-full lg:max-w-[1120px] overflow-y-auto h-[300px]">
                            <div className="flex flex-col space-y-4"> {/* Vertical flex layout */}
                                {youtubeVideos.map((video) => (
                                    <div key={video.id} className="w-full">
                                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                            <iframe
                                                className="absolute top-0 left-0 w-full h-full"
                                                src={`https://www.youtube.com/embed/${video.videoId}`}
                                                title={video.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2 className="text-2xl my-6 text-[#2CAAE1] font-bold text-center">Follow Us</h2>

                        {/* Social Media Icons and Text */}
                        <div className="space-y-6 cursor-pointer">
                            {/* Instagram */}
                            <div className="flex items-center space-x-4">
                                <FaInstagram className="text-3xl text-purple-500 hover:text-purple-700 transition duration-300" />
                                <span className="text-lg text-gray-700">Instagram</span>
                            </div>

                            {/* LinkedIn */}
                            <div className="flex items-center space-x-4">
                                <FaLinkedin className="text-3xl text-blue-700 hover:text-blue-900 transition duration-300" />
                                <span className="text-lg text-gray-700">LinkedIn</span>
                            </div>

                            {/* Facebook */}
                            <div className="flex items-center space-x-4">
                                <FaFacebookF className="text-3xl text-blue-600 hover:text-blue-800 transition duration-300" />
                                <span className="text-lg text-gray-700">Facebook</span>
                            </div>

                            {/* YouTube */}
                            <div className="flex items-center space-x-4">
                                <FaYoutube className="text-3xl text-red-600 hover:text-red-800 transition duration-300" />
                                <span className="text-lg text-gray-700">YouTube</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
