import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EidulfitreImages() {
  const [EidulfitreImages, setEidulfitreImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/EidulfitreImages');
      if (res.data.success) {
        setEidulfitreImages(res.data.data);
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

  return { EidulfitreImages, loading, error, refetch: fetchImages };
}
