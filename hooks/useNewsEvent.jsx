import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useNewsEvent() {
  const [NewsEventImages, setNewsEventImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/news-images');
      if (res.data.success) {
        setNewsEventImages(res.data.data);
      } else {
        setError(new Error('Failed to fetch images'));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { NewsEventImages, loading, error, refetch: fetchImages };
}
