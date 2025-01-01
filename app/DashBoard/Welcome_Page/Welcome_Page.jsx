import React from 'react';

export default function Welcome_Page() {
    return (
        <>
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
                }

                .welcome-text {
                    text-align: center;
                    color: #ffffff;
                }

                .line {
                    font-size: 8rem;
                    font-weight: bold;
                    font-family: 'Pacifico', cursive; /* Stylish font */
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
            `}</style>
        </>
    );
}
