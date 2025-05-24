import React, { useEffect, useState } from 'react'

export default function useAchievements() {


    const [Achievement, setAchievement] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/achievements');

                if (!res.ok) throw new Error("Failed to fetch users");

                const data = await res.json();
                setAchievement(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // call it outside fetchUsers
        fetchUsers();

    }, []);
    return { Achievement, loading, error };
}
