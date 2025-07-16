import { useEffect, useState } from 'react';

export default function useUploadedImage() {
    const [UploadedImage, setImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificateUploaded = async () => {
            try {
                const res = await fetch('/api/StudentImage');
                if (!res.ok) throw new Error("Failed to fetch courses");
                const data = await res.json();
                setImage(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificateUploaded();
    }, []);

    return { UploadedImage, loading, error };
}
