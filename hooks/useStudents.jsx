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
           } catch (erro) {
            console.log(erro)
           }
           finally{
            setLoading(false)
           }
        };
        fetchData();
    }, []);

    return [Students, loading]; 
}
