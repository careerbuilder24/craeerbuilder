import useStudents from '@/hooks/useStudents';
import { useParams } from 'next/navigation';
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaEarthAfrica } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import useMotion from '@/hooks/useMotion';
import React from 'react'
import Image from 'next/image';
import useVideo from '@/hooks/useVideo';

export default function CuriculamVite() {
    const { id } = useParams();
    const Video = useVideo();
    const Videos = Video.find(Onestudent => Onestudent?.id === Number(id));

    return (
        <>
            <div className='flex flex-col-reverse md:flex-row lg:flex-row container mx-auto px-2 md:px-4 lg:px-0 gap-6 md:gap-8'>

                {/* Main Content */}
                <div className='lg:w-8/12 md:flex-1 w-full'>
                    <p className='text-2xl text-red-400 font-bold text-center '>Objective</p>
                    <p className='my-5 text-sm md:text-base px-2 md:px-4 lg:px-0 text-justify ml-7'>
                        Dynamic and results-oriented professional with a proven track record in [your industry/field]. Possessing strong skills in [specific skills or technologies], I excel in driving projects to completion and delivering innovative solutions. With [number] years of experience in [specific roles or sectors], I am adept at [mention key responsibilities or achievements]. Committed to continuous learning and professional development, I thrive in fast-paced environments and collaborate effectively with diverse teams to achieve organizational goals.
                    </p>

                    <p className='text-2xl text-red-400 font-bold my-4 text-center'>Education</p>
                    <div className='flex flex-col md:flex-row md:ml-8 gap-1 md:gap-3'>
                        <p><strong>9 GCSEs including English </strong></p>
                        <p className='text-sm'> | London Bridge</p>
                    </div>
                    <div className='flex flex-col md:flex-row gap-1 md:gap-3 text-sm md:ml-8'>
                        <p>Comprehensive School </p>
                        <p className='text-sm'> | Sep 2021 - May 2023</p>
                    </div>
                    <div className='flex flex-col md:flex-row gap-1 text-sm md:ml-8'>
                        <p>Predicted Grades (6),</p>
                        <p>Mathematics (7),</p>
                        <p>Science (6),</p>
                        <p>Art (6),</p>
                    </div>
                    <div className='text-sm my-5 md:ml-8'>
                        <p>Extracurricular Activities:</p>
                        <p>- Talented musician, achieving Grade 7 Piano and Grade 5 flute.</p>
                        <p>- Captain of the school netball team for 4 seasons connecting 2 age groups (11-13 & 14-16).</p>
                        <p>- Acted as mentor for years 1 and 2.</p>
                        <p>- Maintained school cleanliness and environment standards.</p>
                        <p>Memberships</p>
                        <p>- Member of the school club attending national competitions as a piano player for the school chair.</p>
                    </div>

                    <p className='text-2xl text-red-400 font-bold my-4 text-center md:text-left md:ml-8'>Career Summary</p>
                    <div className='flex flex-col md:flex-row md:ml-8 gap-2 md:gap-5 font-bold text-sm'>
                        <p><strong>May 2022 - Aug 2022</strong></p>
                        <div className='flex flex-col'>
                            <p><strong>Action Aid Cancer Charity, London</strong></p>
                            <p><strong>Voluntary Fundraiser</strong></p>
                        </div>
                    </div>
                    <div className='md:ml-8 ml-5 mt-4 text-sm'>
                        <p>Outline</p>
                        <p>Supported the Action Aid Cancer Charity Shop to fundraise by going door to door, raising over $600 in 12 weeks.</p>
                    </div>

                    <p className='text-2xl text-red-400 font-bold my-4 text-center md:text-left md:ml-8'>Additional</p>
                    <div className='md:ml-8 ml-6 mb-10 md:mb-0 text-sm'>
                        <p className='font-bold'>Awards</p>
                        <p className='mt-1 mb-3'>Winner of the London Bridge Comprehensive School Geography Awards 2020</p>
                        <p>Participated in the UK Young Competition 2022 and took 1st place.</p>

                        <p className='my-1 font-bold'>Software</p>
                        <p>MS Word, MS Excel, MS PowerPoint</p>

                        <p className='my-1 font-bold'>Language</p>
                        <p>English (native), Spanish (conversational)</p>
                    </div>
                </div>

                {/* Sidebar / Video Section */}
                <div className='bg-[#44b5e6] rounded-lg p-4 md:p-6 flex-shrink-0
                                md:w-[300px] lg:w-4/12 w-full'>

                    {Videos ? (
                        <div className='flex flex-col w-full h-full items-center'>
                            <div className='w-full text-white'>
                                <img
                                    src={Videos?.image}
                                    onDragStart={(e) => e.preventDefault()}
                                    alt={Videos?.title}
                                    className="mt-4 shadow-lg w-full max-w-[250px] md:max-w-full mx-auto mb-8 object-contain"
                                    style={{ border: '4px solid #ffffff' }}
                                    onError={(e) => { e.target.src = 'fallback-image-url.jpg'; }}
                                />
                                <p className='text-center text-2xl font-bold'>{Videos.name}</p>
                                <p className='text-xl text-center'>Student</p>

                                <p className='text-center mt-10 md:mt-16 text-xl font-bold mb-2'>Contact Details</p>
                                <hr className='w-full md:w-80 h-1 mx-auto' />
                                <div className='flex flex-row gap-2 justify-center items-center mt-2'>
                                    <BsFillTelephoneFill className='text-white' />
                                    <p>+88017535366</p>
                                </div>
                                <div className='flex flex-row gap-2 justify-center items-center my-2'>
                                    <AiOutlineMail className='text-white' />
                                    <p>abula@gmail.com</p>
                                </div>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <FaEarthAfrica className='text-white' />
                                    <p>London</p>
                                </div>

                                <p className='text-center mt-10 md:mt-16 text-xl font-bold mb-2'>Core Skills</p>
                                <hr className='w-64 md:w-80 h-1 mx-auto' />
                                <div className='flex flex-col gap-2 mt-3 md:ml-5'>
                                    {['Communication and delegation', 'Fundraising experience', 'Captain of the school netball team', 'Member of the school piano club', 'School coding national competitor', 'IT skills - predicted 6 at GCSE'].map((skill, idx) => (
                                        <div key={idx} className='flex'>
                                            <GoDotFill className='mt-1 text-sm mr-3' />
                                            <p>{skill}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center w-9/12 mx-auto lg:mb-5 h-40">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
