import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect } from 'react';
import logo from '../../../../assets/admin.gif'

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
                <Image src={logo} alt="Welcome GIF" className="welcome-gif" />
            </div>

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

                .welcome-gif {
                    max-width: 100%;
                    height: auto;
                }
            `}</style>
        </>
    );
}
