// hooks/useAffiliate.js
import { useEffect, useState } from 'react';

const useBrackCourseList = () => {
    const [Affiliate, setAffiliate] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/BrackList.json');
            const data = await res.json();
            setAffiliate(data);
        };
        fetchData();
    }, []);

    return Affiliate; 
};

export default useBrackCourseList;
