// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const useAdminUniversityBio = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUniversityBio = async () => {
//       try {
//         const response = await axios.get('/api/adminUniversityBio');
//         setData(response.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUniversityBio();

//     const interval = setInterval(fetchUniversityBio, 1000);

//     return () => {
//         isMounted = false;
//         clearInterval(interval);
//     }
//   }, []);

//   return { data, loading, error };
// };

// export default useAdminUniversityBio;
// 3d64b0e9dee39ca593b9da32467663ee

import { useEffect, useState } from 'react';
import axios from 'axios';

const useAdminUniversityBio = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; //  Declare the variable

        const fetchUniversityBio = async () => {
            try {
                const response = await axios.get('/api/adminUniversityBio');
                if (isMounted) {
                    setData(response.data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchUniversityBio();

        const interval = setInterval(fetchUniversityBio, 1000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return { data, loading, error };
};

export default useAdminUniversityBio;
