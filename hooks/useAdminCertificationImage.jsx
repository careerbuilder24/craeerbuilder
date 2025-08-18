import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAdminCertificationImage() {
  const [Certification, setCertification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/certification-image');
      if (res.data.success) {
        setCertification(res.data.data);
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

  return { Certification, loading, error, refetch: fetchImages };
}
