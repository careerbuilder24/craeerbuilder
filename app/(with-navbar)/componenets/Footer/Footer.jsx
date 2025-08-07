import React from 'react';
import { RiArrowRightSLine } from "react-icons/ri";
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import './Footer.css';

export default function Footer() {
    return (
        <>
            {/* <Link href="/FA_Q" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>FAQ</Link>
          <Link href="/About_Us" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>About</Link>
          <Link href="/Contuct_US" className='px-1.5 py-1 hover:text-blue-400 transition-colors text-sm xl:text-base'>Contact</Link> */}
            <div className='footer-container'>
                <div className='bg-[#2BAAE3] lg:bg-[#17549A] text-white w-full py-20'>

                    <div
                        style={{ lineHeight: '25px', fontWeight: '300' }}
                        className='flex flex-col md:flex-row md:flex-wrap justify-center lg:gap-32 gap-12 px-4'
                    >
                        {["Important Links", "FAQ", "Terms and Condition"].map((category, index) => (
                            <div className='flex flex-col w-full md:w-auto' key={index}>
                                <h1 className='font-bold mb-2 text-left cursor-pointer'>{category}</h1>

                                {/* {category === "Important Links" && [
                                    "Mobile Apps Development",
                                    "Custom Software Development",
                                    "School Management Software",
                                    "Restaurant Management Software"
                                ].map(item => (
                                    <div key={item} className='flex items-center mb-1'>
                                        <RiArrowRightSLine />
                                        <h1 className='hover:underline cursor-pointer whitespace-nowrap'>{item}</h1>
                                    </div>
                                ))} */}
                                {category === "Important Links" && [
                                    { name: "FAQ", link: "/FA_Q" },
                                    { name: "About", link: "/About_Us" },
                                    { name: "Contact", link: "/Contuct_US" },
                                    { name: "Restaurant Management Software", link: "/products/restaurant-management" }
                                ].map(item => (
                                    <div key={item.name} className='flex items-center mb-1'>
                                        <RiArrowRightSLine />
                                        <Link
                                            href={item.link}
                                            className='hover:underline cursor-pointer whitespace-nowrap text-sm'
                                        >
                                            {item.name}
                                        </Link>
                                    </div>
                                ))}

                                {category === "FAQ" && [
                                    "Facebook Cover Design",
                                    "Custom Logo Design",
                                    "Business Cards Design",
                                    "Brochure Design Services",
                                    "Flyers Design Services",
                                    "Clipping Path Service"
                                ].map(item => (
                                    <div key={item} className='flex items-center mb-1'>
                                        <RiArrowRightSLine />
                                        <h1 className='hover:underline cursor-pointer whitespace-nowrap'>{item}</h1>
                                    </div>
                                ))}

                                {category === "Terms and Condition" && [
                                    "Academic Writing",
                                    "Blog Post Writing",
                                    "Copywriting",
                                    "Press Release Writing",
                                    "Product Description Writing",
                                    "Website Content Writing"
                                ].map(item => (
                                    <div key={item} className='flex items-center mb-1'>
                                        <RiArrowRightSLine />
                                        <h1 className='hover:underline cursor-pointer whitespace-nowrap'>{item}</h1>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className='flex flex-col w-full md:w-auto'>
                            <h1 className='font-bold mb-2 text-left'>Contact</h1>

                            <p className='text-justify text-sm'>
                                <strong>Email:</strong> contact@careerbuilder.com <br />
                                <strong>Address:</strong> ECB Chattar, Cantonment, Dhaka <br />
                                <strong>Contact:</strong> +880 123 456 7890
                            </p>

                            <h3 className="font-semibold text-[#0054a5] mt-4">Follow Us</h3>
                            <div className="flex gap-4 justify-center sm:justify-start my-2">
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

                            <div className="w-full mt-4 flex justify-center items-center">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1824.9538849433723!2d90.3925184!3d23.8218785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c781c50b9989%3A0x110082b1578e0943!2sCareer%20Builder%20Institute!5e0!3m2!1sen!2sbd!4v1740987843623!5m2!1sen!2sbd"
                                    className="w-full h-[180px]"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-[#232256] text-center text-xs py-3 text-white'>
                <h1>Copyright © 2025 All Rights Reserved By Career Builder</h1>
            </div>
        </>
    );
}
