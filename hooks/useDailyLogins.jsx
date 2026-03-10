// /hooks/useDailyLogins.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useDailyLogins() {
  const [dailyLogins, setDailyLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDailyLogins = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/stats/daily-logins");
      if (res.status === 200) {
        setDailyLogins(res.data);
      } else {
        setError(new Error("Failed to fetch daily login stats"));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyLogins();
  }, []);

  return { dailyLogins, loading, error, refetch: fetchDailyLogins };
}
