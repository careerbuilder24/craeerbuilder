// db.js
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Galib1234$',
  database: 'users_login',
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

export default promisePool;