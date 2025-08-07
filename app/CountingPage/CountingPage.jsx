'use client'
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

    return (
        <main ref={sectionRef}>
            <div className="container mx-auto flex flex-col lg:flex-row flex-wrap justify-center items-center gap-6 text-white my-16 px-4">

                {[
                    { icon: <PiStudentFill />, label: "Running Students", target: 200 },
                    { icon: <IoIosPeople />, label: "Running Interns", target: 150 },
                    { icon: <ImOffice />, label: "Running Employee", target: 100 },
                    { icon: <ImOffice />, label: "Running Batch", target: 80 },
                    { icon: <ImOffice />, label: "Upcoming Batch", target: 80 },
                    { icon: <ImOffice />, label: "Upcoming Webinar", target: 80 }
                ].map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center flex-shrink-0 w-52 md:w-56 h-40 bg-[#2CAAE1] rounded-md justify-center px-4"
                    >
                        <div className="text-3xl md:text-4xl lg:text-5xl mb-2">
                            {item.icon}
                        </div>
                        <p className="text-base md:text-lg font-bold text-center mb-1">
                            {item.label}
                        </p>
                        <div className="text-2xl md:text-3xl font-semibold">
                            <Counter target={item.target} start={startCounting} />
                        </div>
                    </div>
                ))}

            </div>
        </main>
    );
}
