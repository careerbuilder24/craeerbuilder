import { useState, useEffect } from "react";
const useUsers = () => {
  const [userAdmin, setUsersAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/makeAdmin");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsersAdmin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { userAdmin, loading, error };
};

export default useUsers;
