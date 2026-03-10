'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useStudentAllAdmin() {
  const [StudentAddedDataAdminData, setStudentAddedDataAdminData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students from API
  const fetchAddedStudentData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/StudentAddedDataAdmin');
      setStudentAddedDataAdminData(data); // save all student data
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update student in local state instantly
  const updateStudentData = (id, updatedStudent) => {
    setStudentAddedDataAdminData(prev => {
      const index = prev.students.findIndex(stu => stu.id === id);
      if (index !== -1) {
        const updatedStudents = [...prev.students];
        updatedStudents[index] = { ...updatedStudents[index], ...updatedStudent };
        return { ...prev, students: updatedStudents };
      }
      return prev;
    });
  };

  useEffect(() => {
    fetchAddedStudentData();
  }, []);

  return { StudentAddedDataAdminData, loading, error, fetchAddedStudentData, updateStudentData };
}
