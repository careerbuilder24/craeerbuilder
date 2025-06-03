
import React, { useEffect, useState } from 'react'

export default function useSavedPortfolioSaved () {

  const [studentSavedPortfolio, setStudentSavedPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/SavePortfolioAdded')
        const data = await res.json();
        setStudentSavedPortfolio(data);
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return [studentSavedPortfolio, loading];
}
