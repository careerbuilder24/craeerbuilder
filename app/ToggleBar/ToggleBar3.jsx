'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToggleBar3 = ({ subject, description, id, visibleDropdown, toggleDropdown }) => {
    const isOpen = visibleDropdown === id; // Check if the dropdown is open

    return (
        <div key={id} className="w-96 mx-auto"> {/* Set fixed width here */}
            <div
                className="bg-[#2CAAE1] w-full text-white p-4 cursor-pointer mb-1 flex justify-between items-center"
                onClick={() => toggleDropdown(id)}
            >
                <div className="flex flex-row lg:gap-2">
                    <h2>Class 0{id}:</h2>
                    <h2>{subject}</h2>
                </div>

                {/* Animated Plus to Minus Icon */}
                <div className="w-5 h-5 relative flex items-center justify-center">
                    {/* Horizontal Line */}
                    <motion.span
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute bg-white h-1 w-3 rounded"
                    />
                    {/* Vertical Line */}
                    <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute bg-white h-1 w-3 rounded rotate-90"
                    />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                            opacity: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
                            scale: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
                        }}
                        layout
                        className="bg-[#17549A] p-4 mx-auto  shadow-md overflow-hidden mb-2 w-full  "
                    >
                        <p className="text-sm text-white">{description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToggleBar3;
