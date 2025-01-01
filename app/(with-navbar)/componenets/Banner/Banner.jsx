'use client';
import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img from '../../../../assets/welcome-to-careerbuilder.jpg';
import img2 from '../../../../assets/welcome-to-careerbuilder-2.jpg';
import img3 from '../../../../assets/welcome-to-careerbuilder-3.jpg';
import img4 from '../../../../assets/welcome-to-careerbuilder-4.jpg';
import img5 from '../../../../assets/welcome-to-careerbuilder-5.jpg';
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
            <div className="mt-28 lg:mt-40 relative w-full "> {/* Adjusted top margin */}
                <Carousel
                    autoPlay={autoPlay}            // Auto play based on state
                    interval={2500}                // Set the interval time for autoplay
                    infiniteLoop={true}            // Loop the carousel infinitely
                    showThumbs={false}             // Hide thumbnail navigation
                    showStatus={false}             // Hide status
                    transitionTime={500}           // Set the transition time (optional)
                    onMouseEnter={handleMouseEnter} // Pause on hover
                    onMouseLeave={handleMouseLeave} // Resume autoplay after hover
                >
                    {/* parts of image */}
                    {[img, img2, img4, img5].map((src, index) => (
                        <div
                            key={index}
                            className="flex justify-center items-center w-full h-[29vh] md:h-[50vh] lg:h-[70vh] mt-24" // Centers content
                        >
                            <Image
                                src={src}
                                alt={`Slide ${index + 1}`}
                                layout="responsive" // Makes the image responsive
                                width={1600} // You can adjust this width based on your image's actual size
                                height={900} // You can adjust this height to match the aspect ratio
                                objectFit="contain" // Ensures the image scales without distortion
                                onDragStart={(e) => e.preventDefault()}
                                className="w-full max-w-[100%] lg:max-w-[120%] xl:max-w-[130%]" // Make image width larger on larger screens
                            />
                        </div>
                    ))}

                </Carousel>
            </div>
        </>
    );
}
