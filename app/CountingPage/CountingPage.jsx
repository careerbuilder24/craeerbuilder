'use client';
import React, { useState, useEffect, useRef } from 'react';
import Counter from '../NumberCounter/Counter';
import { PiStudentFill } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { ImOffice } from "react-icons/im";

export default function CountingPage() {
    const [startCounting, setStartCounting] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCounting(true);
                }
            },
            { root: null, threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const items = [
        { icon: <PiStudentFill />, label: "Running Students", target: 200 },
        { icon: <IoIosPeople />, label: "Running Interns", target: 150 },
        { icon: <ImOffice />, label: "Running Employee", target: 100 },
        { icon: <ImOffice />, label: "Running Batch", target: 80 },
        { icon: <ImOffice />, label: "Upcoming Batch", target: 80 },
        { icon: <ImOffice />, label: "Upcoming Webinar", target: 80 }
    ];

    return (
        <main ref={sectionRef} className='my-16'>
            <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 px-4 lg:px-28">

                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center w-full h-32 lg:w-48 lg:h-32 bg-gradient-to-br from-[#17549A]/90 to-[#4CA0E0]/60 backdrop-blur-md border border-white/20 rounded-lg justify-center px-3 shadow-md transition transform hover:scale-105 hover:shadow-xl cursor-pointer"
                    >
                        <div className="text-2xl md:text-3xl mb-1 text-white drop-shadow-md">
                            {item.icon}
                        </div>
                        <p className="text-sm md:text-base font-semibold text-center mb-1 text-white drop-shadow-md">
                            {item.label}
                        </p>
                        <div className="text-xl md:text-2xl font-semibold text-white drop-shadow-md">
                            <Counter target={item.target} start={startCounting} />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
