import React, { useEffect, useState } from 'react'

export default function useStudents() {
    const [Motion, setMotion] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/StudentsMotion.json');
            const data = await res.json();
            setMotion(data);
        };
        fetchData();
    }, []);

    return Motion; 
}
