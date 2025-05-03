import { useEffect, useState } from 'react'

export default function useFrontend() {
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
