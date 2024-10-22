// hooks/useCourses.js
import { useEffect, useState } from 'react';

const useCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/DigitalStudents.json');
            const data = await res.json();
            setCourses(data);
        };
        fetchData();
    }, []);

    return courses; 
};

export default useCourses;
