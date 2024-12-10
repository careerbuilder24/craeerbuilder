import React, { useEffect, useState } from 'react'

export default function useTeam() {
    const [useTeam, setuseTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchData = async () => {
           try{
            const res = await fetch('/Team.json');
            const data = await res.json();
            setuseTeam(data);
           } catch (erro) {
            console.log(erro)
           }
           finally{
            setLoading(false)
           }
        };
        fetchData();
    }, []);

    return [useTeam, loading]; 
}
