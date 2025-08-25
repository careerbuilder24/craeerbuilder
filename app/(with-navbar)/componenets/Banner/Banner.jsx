'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from "react-icons/fa";
import Head from 'next/head';

import img from '../../../../assets/img5.jpg';
import img2 from '../../../../assets/img3.jpg';
import img3 from '../../../../assets/img6.jpg';
import img4 from '../../../../assets/meeting.png';
import img5 from '../../../../assets/workstation.png';
import img6 from '../../../../assets/workstationtwo.jpg';

export default function Banner() {
    const heroImages = [img.src, img2.src, img3.src, img4.src, img5.src, img6.src];
    const [currentImage, setCurrentImage] = useState(0);
    const [currentText, setCurrentText] = useState(0);
    const texts = [
        "Build Your Career With CareerBuilder",
        "Learn New Skills",
        "Achieve Your Dreams",
    ];

    // Auto change images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    // Auto change text
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <>
            <Head>
                <link rel="preload" href={img.src} as="image" />
            </Head>

            <section className="relative h-[100vh] flex flex-col items-center justify-center overflow-hidden">

                {/* Background Images with Zoom-in animation */}
                <div className="absolute inset-0">
                    {heroImages.map((bg, index) => (
                        <AnimatePresence key={index}>
                            {index === currentImage && (
                                <motion.div
                                    key={bg}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${bg})` }}
                                />
                            )}
                        </AnimatePresence>
                    ))}
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center text-white px-4">

                    {/* Animated Text Container with fixed height to prevent button shift */}
                    <div className="h-28 md:h-36 lg:h-44 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={currentText}
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg italic"
                            >
                                {texts[currentText]}
                            </motion.h1>
                        </AnimatePresence>
                    </div>

                    {/* Buttons side by side - won't move when text animates */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <motion.button
                            onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")}
                            className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 shadow-xl transition relative"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaPlay className="text-white text-2xl md:text-3xl ml-1" />
                            <span className="absolute inset-0 rounded-full bg-red-600 opacity-50 animate-ping"></span>
                        </motion.button>

                        <button
                            onClick={() => window.location.href = "#learn-more"}
                            className="group relative px-10 py-3 bg-gradient-to-r from-[#17549A] to-[#4CA0E0] hover:from-[#0F3A70] hover:to-[#66B2FF] text-white text-lg font-semibold rounded-full shadow-lg transition overflow-hidden flex items-center justify-center"
                        >
                            <span className="transition-opacity duration-300 group-hover:opacity-0">
                                Learn More
                            </span>
                            <span className="absolute opacity-0 text-5xl group-hover:opacity-100 transition-all duration-300 font-bold">
                                &rarr;
                            </span>
                        </button>
                    </div>

                </div>

                {/* CareerBuilder Text at Bottom */}
                <div className="absolute bottom-6 w-full text-center px-4">
                    <span className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold drop-shadow-lg">
                        CareerBuilder
                    </span>
                </div>

            </section>
        </>
    );
}
