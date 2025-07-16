'use client'
import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";

export default function ButtonTopMaker() {

    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const styles = {
        button: {
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '70px',
            height: '70px',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
        },
    };

    return (
        <main>
            {visible && (
                <button
                    onClick={scrollToTop}
                    style={styles.button}
                    aria-label="Scroll to top"
                    className='flex justify-center items-center'
                >
                    <FaArrowUp className='text-3xl animate-bounce' />
                </button>
            )}
        </main>
    )
}
