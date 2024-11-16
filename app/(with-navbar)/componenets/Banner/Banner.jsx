'use client';
import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img from '../../../../assets/img1.jpg'; // Import the image path
import Image from 'next/image';
import Head from 'next/head';

export default function Banner() {
    const [autoPlay, setAutoPlay] = useState(true); // State to control autoplay
    const [intervalTime, setIntervalTime] = useState(2500); // Interval time for autoplay

    useEffect(() => {
        // When the component mounts, set autoplay to true
        const autoplayInterval = setInterval(() => {
            if (autoPlay) {
                setAutoPlay(true);
            }
        }, intervalTime);
        
        // Clean up the interval when the component unmounts
        return () => clearInterval(autoplayInterval);
    }, [autoPlay, intervalTime]);

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
            <div className="lg:mt-56 mt-32 relative w-full">
                <Carousel
                    autoPlay={autoPlay}            // Auto play based on state
                    interval={intervalTime}        // Set the interval time for autoplay
                    infiniteLoop={true}           // Loop the carousel infinitely
                    showThumbs={false}            // Hide thumbnail navigation
                    showStatus={false}            // Hide status
                    transitionTime={500}          // Set the transition time (optional)
                    onMouseEnter={handleMouseEnter}  // Pause on hover
                    onMouseLeave={handleMouseLeave}  // Resume autoplay after hover
                >
                    <div>
                        <div className="relative w-full h-96 md:h-[500px] lg:h-[700px]">
                            <Image
                                src={img}
                                layout="fill"
                                objectFit="cover"
                                alt="Slide 1"
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative w-full h-96 md:h-[500px] lg:h-[700px]">
                            <Image
                                src={img}
                                layout="fill"
                                objectFit="cover"
                                alt="Slide 2"
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative w-full h-96 md:h-[500px] lg:h-[700px]">
                            <Image
                                src={img}
                                layout="fill"
                                objectFit="cover"
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
