import { useEffect, useState } from 'react';
import useMatchedUserByEmail from '@/hooks/useMatchedUserByEmail';

export default function useUploadedVideos() {
  const { matchedUsers } = useMatchedUserByEmail();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    if (!matchedUsers?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/uploadVideo?email=${matchedUsers.email}`);
      if (!res.ok) throw new Error('Failed to fetch videos');
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [matchedUsers]);

  return { videos, fetchVideos, loading, error };
}
