'use client';
import React, { useState } from 'react';
import Navbar from '../componenets/Navbar/Navbar';
import { motion } from 'framer-motion';
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import img1 from '../../../assets/gallaery1.PNG';
import img2 from '../../../assets/gaallrymd.PNG';
import img3 from '../../../assets/workstation.png';
import img4 from '../../../assets/basic-core-visseion.jpg';
import img5 from '../../../assets/meeting.png';
import Image from 'next/image';
import './AboutUs.css'
import Footer from '../componenets/Footer/Footer';
import ToggleBar3 from '@/app/ToggleBar/ToggleBar3';
import useTeam from '@/hooks/useTeam';

export default function Page() {
  const [visibleDropdowns2, setVisibleDropdowns2] = useState({});

  const [Team] = useTeam();

  console.log(Team)
  // Sample employee data




  const sectionData2 = [
    {
      id: 'section-1',
      title: 'Training',
      items: [
        { id: 1, subject: 'Math Basics', description: 'Learn about addition, subtraction, and basic algebra.' },
        { id: 2, subject: 'Geometry', description: 'Understand shapes, angles, and theorems.' },
        { id: 3, subject: 'Algebra Basics', description: 'Learn about variables, equations, and functions.' },
        { id: 4, subject: 'Trigonometry', description: 'Explore sine, cosine, and tangent concepts.' },
      ],
    },


  ];

  const toggleDropdown = (sectionId, dropdownId) => {
    setVisibleDropdowns2((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === dropdownId ? null : dropdownId,
    }));
  };

  return (
    <>
      <main>
        <Navbar />

        <div className="lg:mt-auto xl:mt-52 mt-52 container mx-auto px-4 bg-gray-50 rounded-lg shadow-lg py-10">




          {/* Welcome Text */}
          <h1 className="text-center text-[#0054a5]  text-3xl lg:text-3xl mb-4 font-extrabold my-10">
            Welcome To Career Builder
          </h1>

          {/* About Us Section */}
          <div className="flex flex-col  lg:flex-row justify-center  gap-8 p-8   ">
            {/* Text Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between h-full p-4 lg:p-10 ">
              <h2 className="text-base md:text-lg font-semibold text-[#0054a5] mb-4">
                About Us
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed  lg:text-justify text-justify mb-6">
                "Career Builder Institute" emerged as IT companies in Bangladesh On January 2020 focusing on transforming unskilled people into skilled. The activities also comprises of a sound range of activities such as basic skills training, remunerated skill traineeships and career placement which complete the individual career path. We deliver training that combines technical knowledge and practice to empower job seekers. Thanks to Mr. Md Muhibbullah Shiddique and Lt. Col. Mohammad Moniruzzaman (Retd.), vision their great head, the Institute has already established itself and gained confidence and sense of aspirants of professions. Someone one will come and speak regarding IT and we want it to speak in relation Bangladesh. Skill development is therefore our prime concern. This will help in development of India and its economy.
              </p>
            </div>


            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 flex flex-col lg:flex-row justify-between items-center gap-8 h-full about-us-section"
            >
              {/* Card 1 */}
              <div className="flex flex-col items-center text-center bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-full ">
                <Image
                  onDragStart={(e) => e.preventDefault()}
                  width={300}
                  height={400}
                  src={img2}
                  alt="Managing Director"
                  className="mb-4 border-4 border-[#0054a5]"
                  loading="lazy"
                />
                <figcaption className="text-black text-xs mb-4 text-left">
                  <p className="font-bold text-base">Md. Muhibbullah Shiddique</p>
                  <p className="font-bold">Managing Director</p>
                </figcaption>
                <figcaption className="text-gray-500 text-xs text-justify">
                  Mr. Md. Muhibbullah Shiddique, an IT professional with a career spanning over a decade since 2009, specializes in programming, web development, graphic design, creative content writing, digital marketing, affiliate marketing, eCommerce development, business consultancy, and mentoring. His extensive experience is a testament to his expertise and the trust he has earned in the industry. He aims to eradicate unemployment and poverty in Bangladesh by transforming unskilled individuals into skilled professionals and ensuring their local and global employment.He aims to eradicate unemployment and poverty in Bangladesh by transforming
                </figcaption>
                {/* Social Media Icons */}
                <div className="flex gap-4 mt-4">
                  <a
                    href="https://www.linkedin.com/in/muhibbullah/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white rounded-full p-2 hover:scale-110 transition-transform"
                  >
                    <FaLinkedin size={16} />
                  </a>
                  <a
                    href="https://www.facebook.com/muhibbullah.shiddique"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white rounded-full p-2 hover:scale-110 transition-transform"
                  >
                    <FaFacebook size={16} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white rounded-full p-2 hover:scale-110 transition-transform"
                  >
                    <FaTwitter size={16} />
                  </a>
                </div>

              </div>

              {/* Card 2 */}

              <div className="flex flex-col items-center text-center bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-full">
                <Image
                  onDragStart={(e) => e.preventDefault()}
                  width={300}
                  height={400}
                  src={img1}
                  alt="Chairman"
                  className="mb-4 border-4 border-[#0054a5]"
                  loading="lazy"
                />
                <figcaption className="text-black text-xs mb-4 text-left">
                  <p className="font-bold text-base">Lt. Col. Mohammad Moniruzzamn (Retd)</p>
                  <p className="font-bold">Chairman</p>
                </figcaption>
                <figcaption className="text-gray-500 text-xs text-justify">
                  Lt. Col. Mohammad Moniruzzamn, with 31 years of military experience and exceptional organizational skills, is recently retired. He is very enthusiastic about contributing to the improvement of the socioeconomic condition (insufficient income and unemployment problem) of society and adamant about alleviating poverty through goal-oriented advanced training and skill development. Integration of our trained persons with the global market and earning foreign currency may be one of the solutions to our economic crisis. With this mission and vision, he takes over as the Chief Administrator of the Career Builder Institute.
                </figcaption>
                {/* Social Media Icons */}
                <div className="flex gap-4 mt-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white rounded-full p-2 hover:scale-110 transition-transform"
                  >
                    <FaLinkedin size={16} />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white rounded-full p-2 hover:scale-110 transition-transform"
                  >
                    <FaFacebook size={16} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white rounded-full p-2 hover:scale-110 transition-transform"
                  >
                    <FaTwitter size={16} />
                  </a>
                </div>

              </div>




            </motion.div>

          </div>



          {/* basic core vission and mission */}
          <div className="work-station-section flex flex-col-reverse lg:flex-row justify-between items-center gap-8 p-8 my-16 px-16">
            {/* Animated Text and Content */}
            <motion.div
              className="flex flex-col justify-center items-start space-y-6"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-base md:text-lg font-semibold text-[#0054a5] mb-4 ml-1">
                Vision & Mission
              </h2>
              <div className="flex flex-row">
                {/* Section rendering */}
                {sectionData2.map((section) => (
                  <div key={section.id} className="w-full">
                    {section.items.map(({ id, subject, description }) => (
                      <ToggleBar3
                        key={`${section.id}-${id}`}
                        id={id}
                        subject={subject}
                        description={description}
                        visibleDropdown={visibleDropdowns2[section.id]}
                        toggleDropdown={(dropdownId) => toggleDropdown(section.id, dropdownId)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>


            <div className="shadow-xl-red-400">
              <Image
                onDragStart={(e) => e.preventDefault()}
                src={img4}
                width={600}
                height={600}
                loading="lazy"
                className="w-full lg:w-10/12 h-auto"
                alt='Vision & Mission'
              />
            </div>
          </div>




          {/* Work Station */}
          <div className='work-station-section flex flex-col lg:flex-row justify-center items-center gap-8 p-8 my-16'>
            <Image onDragStart={(e) => e.preventDefault()} src={img3} width={600} height={600} loading='lazy' className=" shadow-xl-red-400" alt='Work Station' />
            <div className="flex flex-col justify-center items-start space-y-6">
              <h2 className="text-base md:text-lg font-semibold text-[#0054a5] mb-4 ">
                Work Station
              </h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed text-justify mb-6 max-w-3xl">
                This workstation is especially made to manage client projects while encouraging students' skill development, giving them the chance to launch their careers with a solid foundation. Our staff ensures that every project is carried out with professionalism and attention to detail by working in a cooperative and encouraging environment. Students can acquire practical experience, best practices, and the skills they need to succeed in industries like SEO management, web development, and graphic design on this excellent platform. Students who have access to the appropriate resources, guidance, and tools are well-positioned to provide customers with excellent results while also setting themselves up for future success in the workplace.
              </p>
            </div>
          </div>




          {/* Join us */}
          <div className='work-station-section flex flex-col lg:flex-row justify-center items-center gap-8 p-8 my-16'>
            <div className="flex flex-col justify-center items-start space-y-6">
              <h2 className="text-base md:text-lg font-semibold text-[#0054a5] mb-4 ">
                Join Us
              </h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed text-justify mb-6 max-w-3xl">
                Embark on an exciting journey toward a fulfilling and successful career with Career Builder Institute. Our expertly crafted programs are tailored to meet the demands of the ever-evolving digital economy, ensuring you gain the skills, knowledge, and practical experience needed to excel in your chosen field. Whether you’re looking to enhance your current expertise or explore new opportunities, our supportive learning environment and hands-on training will empower you to achieve your aspirations. Enroll today to take the first step toward unlocking your potential and building a brighter, more prosperous future!
              </p>
            </div>
            <Image onDragStart={(e) => e.preventDefault()} src={img5} width={600} height={600} loading='lazy' className=" shadow-xl-red-400" alt='Join Us' />
          </div>

          <h3 className="text-center text-[#0054a5]  text-3xl lg:text-3xl mb-4 font-extrabold my-10">
            Our Team
          </h3>




          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto">
            {Team.map((member) => (
              <div
                key={member.id}
                className="relative group flex flex-col items-center justify-center"
              >
                {/* Image */}
                <Image
                  width={300}
                  height={100} // Significantly reduced height
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[500px] object-cover rounded-md" // Force height to 100px
                />

                {/* Hover Overlay */}
                <div
                  className="absolute bottom-0 left-0 w-full h-0 text-white  opacity-0 group-hover:h-[13%] group-hover:opacity-90 transition-all duration-300"
                  style={{
                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1))", // Gradient effect
                  }}
                >
                  <h3 className="text-lg font-semibold mt-2">{member.name}</h3>
                  <p className="text-sm">{member.designation}</p>
                </div>

              </div>
            ))}
          </div>













        </div>
        <Footer />
      </main>
    </>
  );
}
