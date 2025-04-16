import { useState, useEffect, useCallback } from "react";

const useAdminGalleryAdded = () => {
  const [userAdminGalleryAdded, setAdminGalleryAdded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsersDataGallery = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Admin_Gallery");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setAdminGalleryAdded(data.data);
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
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, [fetchUsersDataGallery]);

  return [userAdminGalleryAdded, loading, error];
};

export default useAdminGalleryAdded;
