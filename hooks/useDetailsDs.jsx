// hooks/useDetailsDs.js
import { useEffect, useState } from 'react';

const useDetailsDs = () => {
    const [DetailsDscription, setDetailsDscription] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/DetailsDs.json');
            const data = await res.json();
            setDetailsDscription(data);
        };
        fetchData();
    }, []);

    return DetailsDscription; 
};

export default useDetailsDs;
