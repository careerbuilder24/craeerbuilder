import React, { useEffect, useState } from 'react'

export default function useRegistered() {

  const [register, setRegister] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/register')
        const data = await res.json();
        setRegister(data);
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return [register, loading];
}
