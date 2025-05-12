import React, { useEffect, useState } from 'react'

export default function useStudents() {
    const [Students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchData = async () => {
           try{
            const res = await fetch('/Students.json');
            const data = await res.json();
            setStudents(data);
           } catch (error) {
            console.log(error)
           }
           finally{
            setLoading(false)
           }
        };
        fetchData();
    }, []);

    return [Students, loading]; 
}
