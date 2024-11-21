import React, { useEffect, useState } from 'react'

export default function useBusiness() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/BusinessDevelopment.json');
            const data = await res.json();
            setCourses(data);
        };
        fetchData();
    }, []);

    return courses; 
}
