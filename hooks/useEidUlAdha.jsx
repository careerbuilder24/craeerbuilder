import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useEidUlAdha() {
  const [EidUlAdha, setEidUlAdhaImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/eid_ul_adha_images');
      if (res.data.success) {
        setEidUlAdhaImages(res.data.data);
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

  return { EidUlAdha, loading, error, refetch: fetchImages };
}
