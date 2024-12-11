'use client';
import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Navbar from '../componenets/Navbar/Navbar';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Footer from '../componenets/Footer/Footer';
import loti from '../../../public/animationData/lottie/contact.json';

// Define default map center for ECB Chattar, Dhaka Cantonment, Dhaka, Bangladesh
// const defaultCenter = {
//     lat: 23.822092060593015, // Replace with verified latitude
//     lng: 90.39310646674065, // Replace with verified longitude
// };

export default function ContactUs() {
    // const { isLoaded } = useJsApiLoader({
    //     googleMapsApiKey: 'AIzaSyAzWgXd4omMlX_3qDhV-AISkfNCQDmGKBk', // Ensure the key is correct
    // });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add logic to send form data to your backend or email service
        setFormData({ name: '', email: '', message: '' }); // Reset form
    };

    return (
        <>
            <Navbar />
            <main>
                <div className="lg:mt-52 md:mt-52 mt-52 text-center mx-auto container px-4 ">
                    <h1 className="text-center text-[#0054a5] text-3xl mb-4 font-extrabold mt-10">
                        Contact Us
                    </h1>

                    {/* Four Columns for Email, Address, Contact Number, and Follow Us */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto container lg:w-8/12 p-4">
                        <div className="text-justify p-3 bg-white rounded shadow-md">
                            <h3 className="font-semibold text-[#0054a5]">Email</h3>
                            <p className='text-gray-700 break-words'>contact@careerbuilder.com</p>
                        </div>
                        <div className="text-left p-3 bg-white rounded shadow-md">
                            <h3 className="font-semibold text-[#0054a5]">Address</h3>
                            <p>ECB Chattar, Cantonment, Dhaka</p>
                        </div>
                        <div className="text-left p-3 bg-white rounded shadow-md">
                            <h3 className="font-semibold text-[#0054a5]">Contact</h3>
                            <p>+880 123 456 7890</p>
                        </div>
                        <div className="text-left p-3 bg-white rounded shadow-md">
                            <h3 className="font-semibold text-[#0054a5]">Follow Us</h3>
                            <div className="flex gap-4 justify-center sm:justify-start">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                                    <FaFacebook size={20} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                                    <FaTwitter size={20} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
                                    <FaLinkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-10 container mx-auto flex justify-center mb-10">
                       
                        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-3/5" style={{ height: '500px' }}>
                            {isLoaded && (
                                <GoogleMap
                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                    center={defaultCenter}
                                    zoom={18}
                                    mapTypeId="roadmap"
                                >
                                    <Marker position={defaultCenter} />
                                </GoogleMap>
                            )}
                        </div>
                    </div> */}
                    {/* Contact Form and Lottie Animation */}
                    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between w-full sm:w-3/4 md:w-1/2 lg:w-3/5 p-6 bg-white rounded shadow-md my-24 gap-10 ">
                        <div className="w-full lg:w-2/3">
                            <h2 className="text-2xl font-bold text-[#0054a5] mb-4 text-left">Send us a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 text-left">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border rounded shadow-sm focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                <div className="mb-4 text-left">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border rounded shadow-sm focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>
                                {/* Subject Dropdown */}
                                <div className="mb-4 text-left">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="subject">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border rounded shadow-sm focus:ring focus:ring-blue-300"
                                        required
                                    >
                                        <option value="">Select a Subject</option>
                                        <option value="admission">Admission</option>
                                        <option value="B2B">B2B</option>
                                        <option value="branch-opening">Branch Opening</option>
                                        <option value="request-internship">Request for Internship</option>
                                        <option value="request-certification">Request for Certification</option>
                                        <option value="request-employment">Request for Employment</option>
                                    </select>
                                </div>
                                <div className="mb-4 text-left">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border rounded shadow-sm focus:ring focus:ring-blue-300"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>



                                <button
                                    type="submit"
                                    className="w-full bg-[#0054a5] text-white py-2 px-4 rounded shadow hover:bg-[#003b78] transition duration-200"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>

                        <div className="w-full lg:w-1/3 mt-8 lg:mt-0 flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ">
                            <h3 className="text-lg font-serif text-[#0054a5] mb-4">Stay Connected</h3>
                            <Player
                                autoplay
                                loop
                                src={loti}
                                style={{ height: '100%', maxHeight: '350px', width: '100%', maxWidth: '350px' }}
                                speed={1.2}
                            />
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
