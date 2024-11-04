// hooks/useDetailsCourse.js
import { useEffect, useState } from 'react';

const useDetailsCourse = () => {
    const [Digital, setDigital] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/DetailsCourse.json');
            const data = await res.json();
            setDigital(data);
        };
        fetchData();
    }, []);

    return Digital; 
};

export default useDetailsCourse;
