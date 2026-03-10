
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function useAllJobsAdmin() {
//   const [AllAbroadUniversity, setAllAbroadUniversity] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchJobs = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get('/api/AddAbroadUniversity');
//       if (res.data.success) {
//         setAllAbroadUniversity(res.data.data);
//       } else {
//         setError(new Error('Failed to fetch jobs'));
//       }
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   return { AllAbroadUniversity, loading, error, refetch: fetchJobs };
// }
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAllAbroadUniversity() {
  const [AllAbroadUniversity, setAllAbroadUniversity] = useState([]);
  const [universitiesByCountry, setUniversitiesByCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUniversities = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get('/api/AddAbroadUniversity');

      if (res.data.success && Array.isArray(res.data.universities)) {
        const universities = res.data.universities.map((uni) => ({
          ...uni,
          sections: Array.isArray(uni.sections) ? uni.sections : [], // ensure sections
        }));

        setAllAbroadUniversity(universities);

        // Group by country for tabs
        const grouped = universities.reduce((acc, uni) => {
          if (!acc[uni.country]) acc[uni.country] = [];
          acc[uni.country].push(uni);
          return acc;
        }, {});
        setUniversitiesByCountry(grouped);

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

  return { 
    AllAbroadUniversity, 
    universitiesByCountry, // grouped for easier tab rendering
    loading, 
    error, 
    refetch: fetchUniversities 
  };
}
