import useStudents from '@/hooks/useStudents';
import { useParams } from 'next/navigation';
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaEarthAfrica } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import React from 'react'
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function CuriculamVite() {
    const { id } = useParams();
    const [students, loading] = useStudents();
    const graphic = students.find(Onestudent => Onestudent?.id === Number(id));
    console.log(graphic)
    return (
        <>
            <div className='flex flex-col-reverse lg:flex-row '>

                <div className='  lg:w-8/12'>


                    <p className='text-2xl text-red-400 font-bold text-center '>Objective</p>

                    <p className=' my-5 text-sm px-2'>Dynamic and results-oriented professional with a proven track record in [your industry/field]. Possessing strong skills in [specific skills or technologies], I excel in driving projects to completion and delivering innovative solutions. With [number] years of experience in [specific roles or sectors], I am adept at [mention key responsibilities or achievements]. Committed to continuous learning and professional development, I thrive in fast-paced environments and collaborate effectively with diverse teams to achieve organizational goals.</p>

                    <p className='text-2xl text-red-400 font-bold my-4 text-center'>Education</p>
                    <div className='flex flex-row lg:ml-16 ml-5 gap-3 '>
                        <p><strong>9 GCSEs including English </strong></p>
                        <p className='text-sm'> | London Bridge</p>
                    </div>
                    <div className='flex  flex-row  gap-3 text-sm lg:ml-16 ml-5'>
                        <p>Comprehensive School </p>
                        <p className='text-sm'> | Sep 2021 - May 2023</p>
                    </div>
                    <div className='flex flex-col lg:flex-row  gap-1 text-sm lg:ml-16 ml-5'>
                        <p>Predicted Grades (6),</p>
                        <p> Mathematuics (7),</p>
                        <p> Scince (6),</p>
                        <p>Art (6),</p>
                    </div>
                    <div className='text-sm  my-5 lg:ml-16 ml-5'>
                        <p>Extracurricular Activites:</p>
                        <p>-Talented musician, achieving Grade 7 Piano and Grade 5 flute.</p>
                        <p>-Captain of the school netball team for the 4 seasons which connected of 2 separate age groups. 11-13 and 14-16</p>
                        <p>-Acted as mentor for years 1 and 2.</p>
                        <p>-Looked after the school and ensured all areas reminder clean an Environment Perfect</p>
                        <p>Memberships</p>
                        <p>-Member of the school club attending various national champion</p>
                        <p>as a piano player for the school chair.</p>
                        <p>-Member of the school club</p>
                    </div>


                    <p className='text-2xl text-red-400 font-bold my-4 text-center ml-16'>Career Summery</p>

                    <div className='flex flex-col lg:flex-row lg:ml-3 ml-5 lg:gap-5 gap-2 font-bold  text-sm '>
                        <p>
                            <strong>May 2022 - Aug 2022</strong>
                        </p>
                        <div className='flex flex-col'>
                            <p>
                                <strong>Action Aid Cancer Charity, London</strong>
                            </p>
                            <p><strong>
                                Volountry Fundraiser</strong></p>
                        </div>

                    </div>
                    <div className='lg:ml-3 ml-5 mt-4 text-sm'>
                        <p>Outline</p>
                        <p>Support the Action Aid CCancer Charity Shop to fundraise by going door to door for contributions, rising over $600 for Charity with 12 weeks</p>
                    </div>

                    <p className='text-2xl text-red-400 font-bold my-4 text-center'>Additional</p>

                    <div className='lg:ml-3 ml-6 mb-10 lg:mb-0 text-sm '>
                        <p className='font-bold'><strong>Awards</strong></p>
                        <p className='mt-1 mb-3'>Winner of the London Bridge Comperative School Geography Awards 2020</p>

                        <p>Participated in the UK Young Competition 2022 as part of the London</p>
                        <p>Bridge Comphrensive School Chair was took 1st place</p>
                        <p className='my-1 font-bold'><strong>Software</strong></p>
                        <p > MS Word, MS Excel, MS Powerpoint</p>
                        <p className='my-1 font-bold'><strong>Language</strong></p>
                        <p>English (native), Spanish(conversational)</p>
                    </div>
                </div>

                <div className='bg-[#44b5e6] lg:w-4/12    rounded-lg '>

                    {graphic ? (
                        <div className='flex flex-col   w-full h-full '>
                            <div className='w-ful mt-4 text-white'>
                                <Image
                                    src={graphic?.image}
                                    onDragStart={(e) => e.preventDefault()}
                                    alt='cv picture'
                                    className="mt-4 shadow-lg w-10/12 mx-auto mb-8  "
                                    width={100}
                                    height={100}

                                    style={{ border: '4px solid #ffffff', }} // Custom border radius
                                    onError={(e) => { e.target.src = 'fallback-image-url.jpg'; }} // Fallback image in case of error
                                />
                                <p className='text-center text-2xl font-bold'>{graphic.name}</p>
                                <p className='text-xl text-center'>Student</p>
                                <p className='text-center mt-5 text-xl font-bold mb-2'>Contact Details</p>
                                <hr className='w-96 h-1  ml-1' />
                                <div className='flex flex-row gap-2 justify-center items-center  mt-1'>
                                    <BsFillTelephoneFill className='text-white' />
                                    <p>+88017535366</p>
                                </div>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <AiOutlineMail className='text-white my-3' />
                                    <p>abula@gmail.com</p>
                                </div>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <FaEarthAfrica className='text-white' />
                                    <p>London</p>
                                </div>

                                <p className='text-center mt-5 text-xl font-bold mb-2'>Core Skills</p>
                                <hr className='w-80 h-1  ' />
                                <div className='flex mt-3 ml-5'>
                                    <GoDotFill className='mt-1 text-sm mr-3' />
                                    <p>Communication and delegation</p>
                                </div>
                                <div className='flex mt-2 ml-5'>
                                    <GoDotFill className='mt-1 text-sm mr-3' />
                                    <p>Fundraising experience</p>

                                </div>
                                <div className='flex  ml-5 mt-2'>
                                    <GoDotFill className=' text-sm mr-3' />
                                    <p>Captain of the school netball team</p>
                                </div>
                                <div className='flex  ml-5 mt-2'>
                                    <GoDotFill className=' text-sm mr-3' />
                                    <p>Member of the school piano club</p>
                                </div>
                                <div className='flex  ml-5 mt-2'>
                                    <GoDotFill className=' text-sm mr-3' />
                                    <p>School coding national competitor</p>
                                </div>
                                <div className='flex  ml-5 mt-2'>
                                    <GoDotFill className=' text-sm mr-3' />
                                    <p>IT skills - predicted 6 at GCSE</p>
                                </div>
                            </div>





                            {/* social platform */}
                            <div className="flex justify-center items-center h-full my-16">
                                <div className="flex space-x-6 cursor-pointer">
                                    {/* Instagram */}
                                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 hover:bg-purple-700 transition duration-300">
                                            <FaInstagram className="text-white text-xl" />
                                        </div>
                                    </a>

                                    {/* LinkedIn */}
                                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-900 transition duration-300">
                                            <FaLinkedin className="text-white text-xl" />
                                        </div>
                                    </a>

                                    {/* Facebook */}
                                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-800 transition duration-300">
                                            <FaFacebookF className="text-white text-xl" />
                                        </div>
                                    </a>

                                    {/* YouTube */}
                                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-800 transition duration-300">
                                            <FaYoutube className="text-white text-xl" />
                                        </div>
                                    </a>
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
