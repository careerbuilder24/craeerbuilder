
// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function useAddedAllLanguageCourses() {
//   const [AllLanguageCourses, setAllLanguageCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get('/api/abroadCourses');
//         const data = res.data;

//         if (data.success) {
//           setAllLanguageCourses(data.courses); 
//         } else {
//           setError('Failed to fetch courses.');
//         }
//       } catch (err) {
//         console.error('Error fetching courses:', err);
//         setError('Something went wrong while fetching.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return { AllLanguageCourses, loading, error };
// }
'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useAddedAllLanguageCourses() {
  const [AllLanguageCourses, setAllLanguageCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/abroadCourses');
      const data = res.data;

      if (data.success) {
        setAllLanguageCourses(data.courses); 
      } else {
        setError('Failed to fetch courses.');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Something went wrong while fetching.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { AllLanguageCourses, loading, error, refetch: fetchCourses };
}
