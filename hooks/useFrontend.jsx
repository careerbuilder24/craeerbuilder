import React, { useEffect, useState } from 'react'

export default function useStudents() {
    const [Frontend, setFrontend] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/FrontendStudent.json');
            const data = await res.json();
            setFrontend(data);
        };
        fetchData();
    }, []);

    return Frontend; 
}
