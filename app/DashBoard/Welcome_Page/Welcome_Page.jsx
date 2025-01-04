import Head from 'next/head';
import React, { useEffect } from 'react';

export default function Welcome_Page() {
    useEffect(() => {
        // Dynamically setting the title and meta tags on page load
        document.title = "Welcome to Career Builder - Elevate Your Career";
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Welcome to Career Builder, the platform to help you grow your career with professional development tools, CV updates, and more.");
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute("content", "Career Builder, professional development, career growth, CV updates, portfolio, job search");
        }

        const metaOgTitle = document.querySelector('meta[property="og:title"]');
        if (metaOgTitle) {
            metaOgTitle.setAttribute("content", "Welcome to Career Builder - Elevate Your Career");
        }

        const metaOgDescription = document.querySelector('meta[property="og:description"]');
        if (metaOgDescription) {
            metaOgDescription.setAttribute("content", "Welcome to Career Builder, the platform to help you grow your career with professional development tools, CV updates, and more.");
        }

        const metaOgImage = document.querySelector('meta[property="og:image"]');
        if (metaOgImage) {
            metaOgImage.setAttribute("content", "https://i.postimg.cc/s2RQWVG5/gilbert.png");
        }

        const metaOgUrl = document.querySelector('meta[property="og:url"]');
        if (metaOgUrl) {
            metaOgUrl.setAttribute("content", "https://www.career-builder.com");
        }
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className="welcome-page">
                <div className="welcome-text">
                    <div className="line">Welcome</div>
                </div>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700&family=Pacifico&display=swap');
            `}</style>

            <style jsx>{`
                .welcome-page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #0054a5, #00c4cc);
                    overflow: hidden;
                    padding: 10px;
                }

                .welcome-text {
                    text-align: center;
                    color: #ffffff;
                }

                .line {
                    font-size: 8rem;
                    font-weight: bold;
                    font-family: 'Pacifico', cursive;
                    font-style: italic;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 
                                 0 0 20px rgba(255, 255, 255, 0.6),
                                 0 0 30px rgba(0, 180, 255, 0.4), 
                                 0 0 40px rgba(0, 180, 255, 0.2);
                    animation: textGlow 3s infinite alternate, float 4s ease-in-out infinite;
                }

                @keyframes textGlow {
                    0% {
                        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 
                                     0 0 20px rgba(255, 255, 255, 0.6),
                                     0 0 30px rgba(0, 180, 255, 0.4), 
                                     0 0 40px rgba(0, 180, 255, 0.2);
                    }
                    100% {
                        text-shadow: 0 0 20px rgba(255, 255, 255, 1), 
                                     0 0 30px rgba(255, 255, 255, 0.8),
                                     0 0 40px rgba(0, 220, 255, 0.6), 
                                     0 0 50px rgba(0, 220, 255, 0.4);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @media (max-width: 768px) {
                    .line {
                        font-size: 5rem;
                    }
                }

                @media (max-width: 480px) {
                    .line {
                        font-size: 3rem;
                    }
                }
            `}</style>
        </>
    );
}
