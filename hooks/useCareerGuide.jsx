import React, { useEffect, useState } from 'react'

export default function useCareerGuide() {
    const [useCareerGuide, setuseCareerGuide] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchData = async () => {
           try{
            const res = await fetch('/CareerGuide.json');
            const data = await res.json();
            setuseCareerGuide(data);
           } catch (erro) {
            console.log(erro)
           }
           finally{
            setLoading(false)
           }
        };
        fetchData();
    }, []);

    return [useCareerGuide, loading]; 
}
