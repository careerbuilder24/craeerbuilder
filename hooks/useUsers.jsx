import { useState, useEffect } from 'react';

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetching the JSON data
    fetch('/users.json')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error loading users data:', error));
  }, []);

  return users;
};

export default useUsers;
