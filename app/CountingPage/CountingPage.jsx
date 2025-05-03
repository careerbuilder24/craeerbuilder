import React, { useState, useEffect, useRef } from 'react'; 
import Counter from '../NumberCounter/Counter';
import { PiStudentFill } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { ImOffice } from "react-icons/im";

export default function CountingPage() {
    const [startCounting, setStartCounting] = useState(false); // State to control when counting should start
    const sectionRef = useRef(null); // Ref to the section we want to observe

    useEffect(() => {
        // Create an IntersectionObserver to detect when the section comes into view
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Start counting when the section enters the viewport
                if (entry.isIntersecting) {
                    setStartCounting(true);  // Start the countdown
                }
            },
            {
                root: null, // Observe the viewport
                threshold: 0.3, // 30% of the section must be visible to start counting
            }
        );

        // Start observing the section element
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        // Cleanup when the component unmounts
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []); // Empty array ensures it runs only once on mount

    return (
        <main ref={sectionRef}>
            <div className="container mx-auto flex flex-col lg:flex-row lg:w-8/12 w-8/12 text-center my-16 gap-3 text-white">
                <div className="flex flex-col items-center w-full h-32 md:h-36 lg:h-40 bg-[#2CAAE1] rounded-md justify-center">
                    <PiStudentFill className="text-2xl md:text-3xl lg:text-4xl mb-1" />
                    <p className="text-lg md:text-xl font-bold">Running Students</p>
                    <Counter target={200} start={startCounting} />
                </div>

                <div className="flex flex-col items-center w-full h-32 md:h-36 lg:h-40 bg-[#2CAAE1] rounded-md justify-center">
                    <IoIosPeople className="text-2xl md:text-3xl lg:text-4xl mb-1" />
                    <p className="text-lg md:text-xl font-bold">Running Interns</p>
                    <Counter target={150} start={startCounting} />
                </div>

                <div className="flex flex-col items-center w-full h-32 md:h-36 lg:h-40 bg-[#2CAAE1] rounded-md justify-center">
                    <ImOffice className="text-2xl md:text-3xl lg:text-4xl mb-1" />
                    <p className="text-lg md:text-xl font-bold">Running Employee</p>
                    <Counter target={100} start={startCounting} />
                </div>

                <div className="flex flex-col items-center w-full h-32 md:h-36 lg:h-40 bg-[#2CAAE1] rounded-md justify-center">
                    <ImOffice className="text-2xl md:text-3xl lg:text-4xl mb-1" />
                    <p className="text-lg md:text-xl font-bold">Running Batch</p>
                    <Counter target={80} start={startCounting} />
                </div>

                <div className="flex flex-col items-center w-full h-32 md:h-36 lg:h-40 bg-[#2CAAE1] rounded-md justify-center">
                    <ImOffice className="text-2xl md:text-3xl lg:text-4xl mb-1" />
                    <p className="text-lg md:text-xl font-bold">Upcoming Batch</p>
                    <Counter target={80} start={startCounting} />
                </div>

                <div className="flex flex-col items-center w-full h-32 md:h-36 lg:h-40 bg-[#2CAAE1] rounded-md justify-center">
                    <ImOffice className="text-2xl md:text-3xl lg:text-4xl mb-1" />
                    <p className="text-lg md:text-xl font-bold">Upcoming Webinar</p>
                    <Counter target={80} start={startCounting} />
                </div>
            </div>
        </main>
    );
}
