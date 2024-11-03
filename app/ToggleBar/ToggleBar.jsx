'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdExpandMore, MdExpandLess } from 'react-icons/md'; // Import icons

const ToggleBar = ({ question, description, id, visibleDropdown, toggleDropdown }) => {
    const isOpen = visibleDropdown === id; // Check if the dropdown is open

    return (
        <div key={id}>
            <div
                className="bg-[#17549A] w-full md:w-9/12 mx-auto sm:w-full text-white p-4 cursor-pointer mb-1 flex justify-between items-center"
                onClick={() => toggleDropdown(id)}
            >
                <h2>{question}</h2>
                {isOpen ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />} {/* Toggle icon */}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.1, ease: [0.42, 0, 0.58, 1] }}
                        className="bg-gray-300 p-4 w-full md:w-9/12 mx-auto sm:w-full shadow-md overflow-hidden mb-2"
                    >
                        <p className='text-sm text-[#3e3e3e]'>{description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToggleBar;
