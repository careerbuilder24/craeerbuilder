import { useState, useEffect } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/usersEmail");
        const data = await response.json();
        setUsers(data.emails); // Assuming `data.emails` contains an array of email objects
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return users;
};

export default useUsers;
