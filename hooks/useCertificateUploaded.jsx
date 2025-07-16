import { useEffect, useState } from 'react';

export default function useCertificateUploaded() {
    const [CertificateUploaded, setCertificateUploaded] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificateUploaded = async () => {
            try {
                const res = await fetch('/api/certificates');
                if (!res.ok) throw new Error("Failed to fetch courses");
                const data = await res.json();
                setCertificateUploaded(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificateUploaded();
    }, []);

    return { CertificateUploaded, loading, error };
}
