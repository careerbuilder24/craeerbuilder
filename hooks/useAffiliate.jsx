// hooks/useAffiliate.js
import { useEffect, useState } from 'react';

const useAffiliate = () => {
    const [Affiliate, setAffiliate] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/StudentsAffiliate.json');
            const data = await res.json();
            setAffiliate(data);
        };
        fetchData();
    }, []);

    return Affiliate; 
};

export default useAffiliate;
