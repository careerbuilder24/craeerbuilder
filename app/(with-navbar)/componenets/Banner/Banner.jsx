'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from "react-icons/fa";
import { ImCross } from "react-icons/im"; // for close button
import Head from 'next/head';

import img from '../../../../assets/img5.jpg';
import img2 from '../../../../assets/img3.jpg';
import img3 from '../../../../assets/img6.jpg';
import img4 from '../../../../assets/meeting.png';
import img5 from '../../../../assets/workstation.png';
import img6 from '../../../../assets/workstationtwo.jpg';
import Link from 'next/link';

export default function Banner() {
    const heroImages = [img.src, img2.src, img3.src, img4.src, img5.src, img6.src];
    const [currentImage, setCurrentImage] = useState(0);
    const [currentText, setCurrentText] = useState(0);
    const [showVideo, setShowVideo] = useState(false); // 👈 new state

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
                {/* Background Images */}
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
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center text-white px-4">
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

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <motion.button
                            onClick={() => setShowVideo(true)}
                            className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 shadow-xl transition relative"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaPlay className="text-white text-2xl md:text-3xl ml-1" />
                            <span className="absolute inset-0 rounded-full bg-red-600 opacity-50 animate-ping"></span>
                        </motion.button>

                        <Link
                            href={'/Courses'}
                            className="group relative px-10 py-3 bg-gradient-to-r from-[#17549A] to-[#4CA0E0] hover:from-[#0F3A70] hover:to-[#66B2FF] text-white text-lg font-semibold rounded-full shadow-lg transition overflow-hidden flex items-center justify-center"
                        >
                            <span className="transition-opacity duration-300 group-hover:opacity-0">
                                Learn More
                            </span>
                            <span className="absolute opacity-0 text-5xl group-hover:opacity-100 transition-all duration-300 font-bold">
                                &rarr;
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="absolute bottom-6 w-full text-center px-4">
                    <span className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold drop-shadow-lg">
                        CareerBuilder
                    </span>
                </div>

                {/* Video Modal 👇 */}
                <AnimatePresence>
                    {showVideo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        >
                            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/d4dLKSnumkU?autoplay=1"  
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />

                                <button
                                    onClick={() => setShowVideo(false)}
                                    className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full"
                                >
                                    <ImCross />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
}
