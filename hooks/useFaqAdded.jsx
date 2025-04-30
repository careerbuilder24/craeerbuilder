import { useState, useEffect, useCallback } from "react";

const useFaqAdded = () => {
  const [userFaqAdded, setFaqAdded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsersDataGallery = useCallback(async () => {
    try {
      const response = await fetch("/api/FAQ_Added");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setFaqAdded(data.data);
      setError(null); // reset error if successful
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // you could disable this if you don’t want to flicker loading every 5 sec
    }
  }, []);

  useEffect(() => {
    fetchUsersDataGallery(); // Initial fetch

    const interval = setInterval(() => {
      fetchUsersDataGallery();
    }, 1000); // 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, [fetchUsersDataGallery]);

  return [userFaqAdded, loading, error];
};

export default useFaqAdded;
