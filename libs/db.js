import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config(); // Load environment variables

// Create a MySQL connection using Railway DATABASE_URL
const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Function to get user by email
export async function getUserByEmail(email) {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM user_managements WHERE email = ?',
      [email]
    );
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    console.error('Database query error:', error);
    return null;
  }
}

export default connection;
