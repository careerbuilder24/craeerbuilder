import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAbroadStudy() {
  const [pohelaBoishakh, setpohelaBoishakh] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/pohela-boishakh');
      if (res.data.success) {
        setpohelaBoishakh(res.data.data);
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

  return { pohelaBoishakh, loading, error, refetch: fetchImages };
}
