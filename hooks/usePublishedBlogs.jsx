import { useEffect, useState } from 'react';

export default function usePublishedBlogs() {
    const [publishedBlogs, setPublishedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublishedBlogs = async () => {
            try {
                const res = await fetch('/api/StudentBlog');  // API endpoint from your Next.js route
                if (!res.ok) throw new Error("Failed to fetch published blogs.");
                const data = await res.json();
                setPublishedBlogs(data?.data || []);  // Assuming { success, data: [...] }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPublishedBlogs();
    }, []);

    return { publishedBlogs, loading, error };
}
