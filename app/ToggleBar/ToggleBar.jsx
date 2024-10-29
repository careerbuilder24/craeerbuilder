'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToggleBar = ({ question, description, id, visibleDropdown, toggleDropdown }) => {
    return (
        <div key={id}>
            <div
                className="bg-[#4f287b] w-full md:w-9/12 mx-auto sm:w-full text-white p-4 cursor-pointer mb-1"
                onClick={() => toggleDropdown(id)}
            >
                <h2>{question}</h2>
            </div>

            <AnimatePresence>
                {visibleDropdown === id && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.1, ease: [0.42, 0, 0.58, 1] }}
                        className="bg-gray-100 p-4 w-full md:w-9/12 mx-auto sm:w-full shadow-md overflow-hidden mb-2" // Added mb-4 here
                    >
                        <p className='text-sm text-[#3e3e3e]'>{description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToggleBar;
