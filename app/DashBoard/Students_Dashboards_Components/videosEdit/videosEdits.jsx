import React, { useState } from 'react';

export default function Page() {
    const [videos, setVideos] = useState([]);
    const [playing, setPlaying] = useState(null); // Track the currently playing video

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('video/')) {
            const videoUrl = URL.createObjectURL(file);
            setVideos((prevVideos) => [...prevVideos, videoUrl]);
        } else {
            alert('Please upload a valid video file');
        }
    };

    const handlePlay = (index) => {
        setPlaying(index);
    };

    const handlePause = () => {
        setPlaying(null);
    };

    return (
        <>
            <main>
                <h1>Upload Videos</h1>
                <input type="file" accept="video/*" onChange={handleVideoUpload} />
                <button
                    onClick={() => document.querySelector('input[type="file"]').click()}
                >
                    Choose Video
                </button>
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <div key={index} className="video-item">
                            <video
                                controls
                                width="300"
                                preload="auto"
                                onPlay={() => handlePlay(index)}
                                onPause={handlePause}
                                muted={playing !== index} // Mute other videos when one is playing
                            >
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}
                </div>
            </main>

            <style jsx>{`
                .video-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 16px;
                    margin-top: 20px;
                }
                .video-item {
                    border: 1px solid #ccc;
                    padding: 10px;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                }
                button {
                    margin-top: 10px;
                    padding: 8px 16px;
                    font-size: 16px;
                    cursor: pointer;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                }
                button:hover {
                    background-color: #45a049;
                }
            `}</style>
        </>
    );
}
