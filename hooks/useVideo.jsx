import React, { useEffect, useState } from 'react'

export default function useStudents() {
    const [Video, setVideo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/StudentsVideo.json');
            const data = await res.json();
            setVideo(data);
        };
        fetchData();
    }, []);

    return Video; 
}
