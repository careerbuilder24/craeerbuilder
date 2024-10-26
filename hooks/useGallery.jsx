// hooks/useCourses.js
import { useEffect, useState } from 'react';

const useCourses = () => {
    const [Gallery, setGallery] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/galleryData.json');
            const data = await res.json();
            setGallery(data);
        };
        fetchData();
    }, []);

    return Gallery; 
};

export default useCourses;
