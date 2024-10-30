'use client'
import React, { useEffect, useState } from 'react'

export default function ButtonTopMaker() {
  
    const [visible, setVisible] = useState(false);
    // button make page upper part
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
    // css stle for button take upper page
    const styles = {
        button: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
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
                >
                    ↑
                </button>
            )}
        </main>
    )
}
