import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAwardGiving() {
  const [AwardGiving, setAwardGiving] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/awards-giving');
      if (res.data.success) {
        setAwardGiving(res.data.data);
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

  return { AwardGiving, loading, error, refetch: fetchImages };
}
