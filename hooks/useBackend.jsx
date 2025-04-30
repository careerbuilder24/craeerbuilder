// hooks/useBackend.js
import { useEffect, useState } from 'react';

const useBackend = () => {
    const [Backend, setBackend] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/BackendStudents.json');
            const data = await res.json();
            setBackend(data);
        };
        fetchData();
    }, []);

    return Backend; 
};

export default useBackend;
