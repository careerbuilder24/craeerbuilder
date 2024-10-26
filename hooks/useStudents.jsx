import React, { useEffect, useState } from 'react'

export default function useStudents() {
    const [Students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/Students.json');
            const data = await res.json();
            setStudents(data);
        };
        fetchData();
    }, []);

    return Students; 
}
