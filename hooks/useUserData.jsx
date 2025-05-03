// hooks/useUserData.js
import { useState, useEffect } from 'react';

const useUserData = (email) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/profile?email=${email}`);
        const data = await response.json();

        if (data.success) {
          setUserData(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  return { userData, loading, error };
};

export default useUserData;
