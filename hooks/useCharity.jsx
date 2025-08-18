import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useEidUlAdha() {
  const [charity, setCharity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/charity-images');
      if (res.data.success) {
        setCharity(res.data.data);
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

  return { charity, loading, error, refetch: fetchImages };
}
