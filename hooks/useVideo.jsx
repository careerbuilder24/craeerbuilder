import React, { useEffect, useState } from 'react'

export default function useStudents() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/StudentsVideo.json');
            const data = await res.json();
            setCourses(data);
        };
        fetchData();
    }, []);

    return courses; 
}
