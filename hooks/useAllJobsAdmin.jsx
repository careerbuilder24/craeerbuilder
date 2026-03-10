
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAllJobsAdmin() {
  const [AllJobsAdmin, setAllJobsAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/jobs');
      if (res.data.success) {
        setAllJobsAdmin(res.data.data);
      } else {
        setError(new Error('Failed to fetch jobs'));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { AllJobsAdmin, loading, error, refetch: fetchJobs };
}
