import dotenv from 'dotenv';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

dotenv.config(); // Load environment variables

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,  // ✅ Fixed incorrect key
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

// Function to get user by email
export async function getUserByEmail(email) {
  try {
    const [rows] = await promisePool.query('SELECT * FROM user_managements WHERE email = ?', [email]);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error('Database query error:', error);
    return null;
  }
}

export default promisePool;  // ✅ Ensure correct default export
