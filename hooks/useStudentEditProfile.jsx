
import React, { useEffect, useState } from 'react'

export default function useStudentEditProfile() {

  const [studentEditProfile, setStudentEditProfile] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/students_Edit_Profile')
        const data = await res.json();
        setStudentEditProfile(data);
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return [studentEditProfile, loading];
}
