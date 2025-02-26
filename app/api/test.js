import pool from '@/libs/db';

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query("SELECT NOW() AS currentTime");
    res.status(200).json({ message: "Connected to MySQL!", time: rows[0].currentTime });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
}  

// juwbghruindg



