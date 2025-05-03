// hooks/useCourses.js
import { useEffect, useState } from 'react';

const usePortfolio = () => {
    const [Gallery, setGallery] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/portfolio.json');
            const data = await res.json();
            setGallery(data);
        };
        fetchData();
    }, []);

    return Gallery;
};

export default usePortfolio;
