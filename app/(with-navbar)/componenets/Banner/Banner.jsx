'use client';
import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img from '../../../../assets/welcome-to-careerbuilder.jpg'; // Import the image path
import Image from 'next/image';
import Head from 'next/head';

export default function Banner() {
    const [autoPlay, setAutoPlay] = useState(true); // State to control autoplay

    const handleMouseEnter = () => {
        setAutoPlay(false);  // Stop autoplay on hover
    };

    const handleMouseLeave = () => {
        setAutoPlay(true);  // Resume autoplay when mouse leaves
    };

    return (
        <>
            <Head>
                <link rel="preload" href={img} as="image" />
            </Head>
            <div className="mt-28 lg:mt-40 relative w-full"> {/* Adjusted top margin */}
                <Carousel
                    autoPlay={autoPlay}            // Auto play based on state
                    interval={2500}                // Set the interval time for autoplay
                    infiniteLoop={true}           // Loop the carousel infinitely
                    showThumbs={false}            // Hide thumbnail navigation
                    showStatus={false}            // Hide status
                    transitionTime={500}          // Set the transition time (optional)
                    onMouseEnter={handleMouseEnter}  // Pause on hover
                    onMouseLeave={handleMouseLeave}  // Resume autoplay after hover
                >
                    <div>
                        <div className="relative w-full h-[29vh] md:h-[70vh] lg:h-[110vh] ">
                            <Image
                                src={img}
                               
                                alt="Slide 1"
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative w-full h-[29vh] md:h-[70vh] lg:h-[110vh] ">
                            <Image
                                src={img}
                               
                                alt="Slide 2"
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative w-full h-[29vh] md:h-[70vh] lg:h-[110vh] ">
                            <Image
                                src={img}
                               
                                alt="Slide 3"
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>
                </Carousel>
            </div>
        </>
    );
}
