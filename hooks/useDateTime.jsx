// hooks/useDateTime.js
import { useEffect, useState } from 'react';

const useDateTime = () => {
    const [Digital, setDigital] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/DateTime.json');
            const data = await res.json();
            setDigital(data);
        };
        fetchData();
    }, []);

    return Digital; 
};

export default useDateTime;
