import React, { useEffect, useState } from 'react'

export default function useUploadedCourse() {


    const [UploadedCourse, setUploadedCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/SUbmittedCourses');

                if (!res.ok) throw new Error("Failed to fetch users");

                const data = await res.json();
                setUploadedCourse(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // call it outside fetchUsers
        fetchUsers();

    }, []);
    return { UploadedCourse, loading, error };
}
