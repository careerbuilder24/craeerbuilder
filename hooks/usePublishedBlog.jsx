'use client'
import { useEffect, useState } from 'react'

export default function usePublishedBlog() {
  const [published, setPublished] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishedPosts = async () => {
      try {
        const res = await fetch('/api/career_guide_Blog'); // Removed localhost
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const data = await res.json(); // Added await here
        setPublished(data);
        
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedPosts();
  }, []);

  return { published, loading, error }; // Return object instead of array
}