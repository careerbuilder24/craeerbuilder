// hooks/useUniversities.js or .ts
import { useEffect, useState } from 'react';

export default function useAbroadStudy() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/AbroadStudy.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading universities:', error);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
