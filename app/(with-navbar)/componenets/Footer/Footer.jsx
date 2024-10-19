import React from 'react';
import { RiArrowRightSLine } from "react-icons/ri";
import './Footer.css'
export default function Footer() {
    return (
        <>
            <div style={{ background: '#17549A' }} className='text-white w-full h-full py-20'>
                {/* First Section */}
                <div className='flex flex-col md:flex-row justify-center lg:gap-32 gap-12 text-center md:text-left ml-5'>
                    {["Apps and Software", "Graphic Design & Printing", "Writing Services", "Website Development Services"].map((category, index) => (
                        <div className='flex flex-col' key={index}>
                            <h1 className='font-bold mb-2 cursor-pointer'>{category}</h1>
                            {category === "Apps and Software" && ["Mobile Apps Development", "Custom Software Development", "School Management Software", "Restaurant Management Software"].map(item => (
                                <div key={item} className='flex items-center'>
                                    <RiArrowRightSLine />
                                    <h1 className='hover:underline cursor-pointer'>{item}</h1>
                                </div>
                            ))}
                            {category === "Graphic Design & Printing" && ["Facebook Cover Design", "Custom Logo Design", "Business Cards Design", "Brochure Design Services", "Flyers Design Services", "Clipping Path Service"].map(item => (
                                <div key={item} className='flex items-center'>
                                    <RiArrowRightSLine />
                                    <h1 className='hover:underline cursor-pointer'>{item}</h1>
                                </div>
                            ))}
                            {category === "Writing Services" && ["Academic Writing", "Blog Post Writing", "Copywriting", "Press Release Writing", "Product Description Writing", "Website Content Writing"].map(item => (
                                <div key={item} className='flex items-center'>
                                    <RiArrowRightSLine />
                                    <h1 className='hover:underline cursor-pointer'>{item}</h1>
                                </div>
                            ))}
                            {category === "Website Development Services" && ["Business Website Design", "News Portal Website Design", "Personal Website Design", "eCommerce Website Design", "Educational Website Design", "Garments Buying House Website", "Hotel/Resort Booking Website", "Medical Website Development"].map(item => (
                                <div key={item} className='flex items-center '>
                                    <RiArrowRightSLine />
                                    <h1 className='hover:underline cursor-pointer'>{item}</h1>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <center>
                    <hr className='lg:w-8/12 w-11/12 border-white my-10' />
                </center>

                {/* Second Section */}
                <div className='flex flex-col md:flex-row justify-center lg:gap-28 gap-12 text-center md:text-left ml-5'>
                    <div className='flex flex-col lg:mr-16 lg:ml-10'>
                        <h1 className='font-bold mb-2 cursor-pointer'>Important Links</h1>
                        {["Company Profile", "Privacy Policy", "Terms and Condition", "Career Opportunity", "B2B Partnership", "Press Release"].map(item => (
                            <div key={item} className='flex items-center mb-1'>
                                <RiArrowRightSLine />
                                <h1 className='hover:underline cursor-pointer'>{item}</h1>
                            </div>
                        ))}
                    </div>
                    {["Blogger Outreach Services", "Domain & Hosting Services", "Freelancing and Outsourcing"].map((category, index) => (
                        <div className='flex flex-col ml-5' key={index}>
                            <h1 className='font-bold mb-2 cursor-pointer'>{category}</h1>
                            {category === "Blogger Outreach Services" && ["Search Engine Optimization", "Social Media Marketing", "Search Engine Marketing", "YouTube Video Ads Campaign", "Facebook Ads Campaign", "Content Marketing", "Video Marketing Services"].map(item => (
                                <div key={item} className='flex items-center mb-1'>
                                    <RiArrowRightSLine />
                                    <h1 className='hover:underline cursor-pointer'>{item}</h1>
                                </div>
                            ))}
                            {category === "Domain & Hosting Services" && ["Domain Registration", "Shared Hosting", "VPS Hosting", "Dedicated Hosting", "Cloud Hosting", "WordPress Hosting"].map(item => (
                                <div key={item} className='flex items-center mb-1'>
                                    <RiArrowRightSLine />
                                    <h1 className='hover:underline cursor-pointer'>{item}</h1>
                                </div>
                            ))}
                            {category === "Freelancing and Outsourcing" && ["Affiliate Marketing Course", "Digital Marketing Course", "Graphic Design Course", "Search Engine Optimization Course", "Website Design Course", "Website Development Course"].map(item => (
                                <div key={item} className='flex items-center mb-1'>
                                    <RiArrowRightSLine />
                                    <h1 className='hover:underline cursor-pointer'>{item}</h1>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>

            <div className='bg-[#232256] text-center text-xs py-3 text-white'>
                <h1>Copyright © 2024 All Rights Reserved By Career Builder</h1>
            </div>
        </>
    );
}
