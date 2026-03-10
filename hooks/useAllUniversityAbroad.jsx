import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAllUniversityAbroad() {
  const [AddAbroadUniversity, setAddAbroadUniversity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUniversities = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/AddAbroadUniversity');
      if (res.data.success) {
        // ✅ Correct key from your API
        setAddAbroadUniversity(res.data.universities);
      } else {
        setError(new Error('Failed to fetch universities'));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  return { AddAbroadUniversity, loading, error, refetch: fetchUniversities };
}
