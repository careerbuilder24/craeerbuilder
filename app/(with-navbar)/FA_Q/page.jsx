'use client';
import { useState } from 'react';
import Navbar from '../componenets/Navbar/Navbar';
import dynamic from 'next/dynamic'; // Import dynamic for SSR handling
import animationData from '../../../public/animationData/lottie/FaqSearch.json'; 
import Footer from '../componenets/Footer/Footer';
import ToggleBar2 from '@/app/ToggleBar/ToggleBar2';
import Chatbot from '../componenets/chatBot/Chatbot';

// Dynamically import Lottie component with SSR disabled
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

export default function Page() {
  const [visibleDropdowns, setVisibleDropdowns] = useState({}); // Object to track visibility per section

  // Lottie options
  const lottieOptions = {
    loop: true, 
    autoplay: true, 
    animationData: animationData, 
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const sectionData = [
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
    {
      id: 'section-2',
      title: 'Internship',
      items: [
        { id: 5, subject: 'Physics', description: 'Explore the laws of motion and thermodynamics.' },
        { id: 6, subject: 'Chemistry', description: 'Study elements, compounds, and chemical reactions.' },
        { id: 7, subject: 'Mechanics', description: 'Understand forces, motion, and energy.' },
        { id: 8, subject: 'Atomic Structure', description: 'Learn about the composition of atoms and molecules.' },
      ],
    },
    {
      id: 'section-3',
      title: 'Employment',
      items: [
        { id: 9, subject: 'Biology', description: 'Learn about cells, organs, and ecosystems.' },
        { id: 10, subject: 'Environmental Science', description: 'Understand climate change and sustainability.' },
        { id: 11, subject: 'Human Anatomy', description: 'Explore the structure and function of the human body.' },
        { id: 12, subject: 'Ecology', description: 'Study ecosystems, biodiversity, and conservation.' },
      ],
    },
  ];

  const toggleDropdown = (sectionId, dropdownId) => {
    setVisibleDropdowns((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === dropdownId ? null : dropdownId,
    }));
  };

  return (
    <>
      <Navbar />
      <main className="lg:mt-60 md:mt-60 container mx-auto px-4 lg:my-72 my-20 ">
        <div className="container mx-auto ">
          {/* Lottie animation display */}
          <div className="w-full lg:w-1/3 bg-white p-4 container mx-auto mt-6">
            <Lottie options={lottieOptions} height={215} width={200} />
          </div>
          <h1 className='text-center text-[#0054a5] font-semibold text-2xl lg:text-4xl my-16'>FAQ (Frequently Asked Question)</h1>
          <div className="flex flex-col lg:flex-row lg:px-44">
            {/* Section rendering */}
            {sectionData.map((section) => (
              <div key={section.id} className="w-full lg:w-6/12 px-4 container mx-auto  ">
                <h2 className="text-center text-[#0054a5] font-semibold text-2xl lg:text-4xl mb-6">
                  {section.title}
                </h2>
                {section.items.map(({ id, subject, description }) => (
                  <ToggleBar2
                    key={`${section.id}-${id}`}
                    id={id}
                    subject={subject}
                    description={description}
                    visibleDropdown={visibleDropdowns[section.id]}
                    toggleDropdown={(dropdownId) => toggleDropdown(section.id, dropdownId)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
