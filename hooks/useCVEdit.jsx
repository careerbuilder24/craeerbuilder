import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCVEdit() {
  const [CvEdit, setCvEdit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/cv');
      if (res.data.success) {
        setCvEdit(res.data.data);
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

  return { CvEdit, loading, error, refetch: fetchImages };
}
