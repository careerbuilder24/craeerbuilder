'use client';
import React from 'react';
import Navbar from '../componenets/Navbar/Navbar';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Footer from '../componenets/Footer/Footer';

// Define default map center for ECB Chattar, Dhaka Cantonment, Dhaka, Bangladesh
const defaultCenter = {
    lat: 23.8265, // Latitude for ECB Chattar
    lng: 90.3961  // Longitude for ECB Chattar
};

export default function ContactUs() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAzWgXd4omMlX_3qDhV-AISkfNCQDmGKBk', // Ensure the key is correct
    });

    if (!isLoaded) {
        return <div>Loading Map...</div>;
    }

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


                    <div className="mt-10 container mx-auto flex justify-center mb-20">
                        {/* Google Map */}
                        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-3/5" style={{ height: '500px' }}>
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '100%' }}
                                center={defaultCenter}
                                zoom={15} // Adjust zoom level for better detail view of ECB Chattar
                            >
                                <Marker position={defaultCenter} />
                            </GoogleMap>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
