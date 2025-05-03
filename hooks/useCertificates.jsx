// hooks/useCertificates.js
import { useEffect, useState } from 'react';

const useCertificates = () => {
    const [Digital, setDigital] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/certificates.json');
            const data = await res.json();
            setDigital(data);
        };
        fetchData();
    }, []);

    return Digital; 
};

export default useCertificates;
