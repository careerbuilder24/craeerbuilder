
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicantApplied() {
  const [AllApplicant, setAllApplicant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/applyApplicant');
      if (res.data.success) {
        setAllApplicant(res.data.applications); // <-- corrected
      } else {
        setError(new Error('Failed to fetch applications'));
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

  return { AllApplicant, loading, error, refetch: fetchJobs };
}
