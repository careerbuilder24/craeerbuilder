'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAllAbroadUniversityApplicant() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get('/api/university-apply');
                const data = res.data;

                if (data.success) {
                    setApplications(data.universities);
                } else {
                    setError('Failed to fetch applications.');
                }
            } catch (err) {
                console.error('Error fetching applications:', err);
                setError('Something went wrong while fetching.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    return { applications, loading, error, setApplications };
}
