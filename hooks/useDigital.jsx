// hooks/useDigital.js
import { useEffect, useState } from 'react';

const useDigital = () => {
    const [Digital, setDigital] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/DigitalStudents.json');
            const data = await res.json();
            setDigital(data);
        };
        fetchData();
    }, []);

    return Digital; 
};

export default useDigital;
