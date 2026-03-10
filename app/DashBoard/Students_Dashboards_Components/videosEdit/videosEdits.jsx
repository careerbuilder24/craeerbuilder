import useMatchedUserByEmail from '@/hooks/useMatchedUserByEmail';
import React, { useState, useEffect } from 'react';

export default function Page() {
    const [videos, setVideos] = useState([]);
    const [url, setUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { matchedUsers } = useMatchedUserByEmail();

    const fetchVideos = async () => {
        if (!matchedUsers?.email) return;
        try {
            const res = await fetch(`/api/uploadVideo?email=${matchedUsers.email}`);
            const data = await res.json();
            setVideos(data.videos || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [matchedUsers]);

    const handleUploadVideo = async () => {
        if (!url) return alert('Please enter a YouTube URL');
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        if (!youtubeRegex.test(url)) return alert('Please enter a valid YouTube URL');
        if (!matchedUsers?.email) return alert('User email not found');

        try {
            const res = await fetch('/api/uploadVideo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: matchedUsers.email, youtube_url: url }),
            });

            const data = await res.json();
            if (res.ok) {
                setUrl('');
                setShowModal(false);
                alert(data.message);
                fetchVideos();
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Error uploading video');
        }
    };

    const getEmbedUrl = (videoUrl) => {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = videoUrl.match(regExp);
        return match && match[2] ? `https://www.youtube.com/embed/${match[2]}` : '';
    };

    const handleDeleteVideo = async (youtube_url) => {
        if (!matchedUsers?.email) return alert('User email not found');
        if (!confirm('Are you sure you want to delete this video?')) return;

        try {
            const res = await fetch(
                `/api/uploadVideo?email=${matchedUsers.email}&youtube_url=${encodeURIComponent(
                    youtube_url
                )}`,
                { method: 'DELETE' }
            );

            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                fetchVideos();
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting video');
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Upload YouTube Videos</h1>

            <div className="flex mb-6">
                <input
                    type="text"
                    placeholder="Enter YouTube URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="p-2 w-80 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 text-white px-6 rounded-r-md hover:bg-green-600 transition"
                >
                    Add Video
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 w-full container mx-auto">
                {videos.map((video, index) => (
                    <div
                        key={index}
                        className="relative border border-gray-300 p-3 rounded-lg bg-white shadow-sm flex flex-col items-center group"
                        style={{
                            flex: '0 0 28%',
                            minWidth: '150px',
                        }}
                    >
                        {/* Hover delete button */}
                        <button
                            onClick={() => handleDeleteVideo(video.youtube_url)}
                            className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center w-12 h-12 text-3xl rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition"
                            style={{ lineHeight: '1' }}
                        >
                            ×
                        </button>

                        <iframe
                            width="100%"
                            height="240"
                            src={getEmbedUrl(video.youtube_url)}
                            title={`video-${index}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Confirm Upload</h2>
                        <p className="mb-6">Do you want to upload this YouTube video?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUploadVideo}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
