import { useState, useEffect } from 'react';

// Custom hook to fetch and manage YouTube video data
export default function useYoutubeStudents() {
    const [youtubeVideos, setYoutubeVideos] = useState([]);  // State to store the video data
    const [loading, setLoading] = useState(true);  // State for loading
    const [error, setError] = useState(null);  // State for error handling

    // Fetch YouTube videos data
    useEffect(() => {
        async function fetchVideos() {
            try {
                setLoading(true); // Set loading to true when fetching starts
                const response = await fetch('/YoutubeVideoStudents.json'); // Fetch from a JSON file (you can change this to an API endpoint)
                if (!response.ok) {
                    throw new Error('Failed to fetch video data');
                }
                const data = await response.json();
                setYoutubeVideos(data); // Set the fetched data to state
            } catch (error) {
                setError(error.message); // Handle error if fetch fails
            } finally {
                setLoading(false); // Set loading to false when fetching completes
            }
        }

        fetchVideos();  // Call the fetch function when the component mounts
    }, []);  // Empty dependency array means this effect runs only once after the first render

    return { youtubeVideos, loading, error };  // Return data, loading state, and error state
}
