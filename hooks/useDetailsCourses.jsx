
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useDetailsCourses() {
  const [DetailsCourses, setDetailsCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetailsCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/courses');
      if (res.data.success && res.data.course) {
        //  Correct key from your API
        setDetailsCourses(res.data.course);
      } else {
        setError(new Error('Failed to fetch courses'));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsCourses();
  }, []);

  return { DetailsCourses, loading, error, refetch: fetchDetailsCourses };
}
