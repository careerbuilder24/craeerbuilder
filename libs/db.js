// // db.js
import dotenv from 'dotenv';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

dotenv.config(); // Load environment variables

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'Galib1234$',
//   database: 'users_login',
// });

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,  // Use your actual MySQL host, NOT a website URL
//   user: process.env.DB_USER,  // Set up environment variables in Vercel
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// const promisePool = pool.promise();

// // Function to get user by email
// export async function getUserByEmail(email) {
//   try {
//     const [rows] = await promisePool.query('SELECT * FROM user_managements WHERE email = ?', [email]);
//     if (rows.length === 0) return null;
//     return rows[0];
//   } catch (error) {
//     console.error('Database query error:', error);
//     return null;
//   }
// }

// export default promisePool;




// db.js
import dotenv from 'dotenv';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

dotenv.config(); // Load environment variables

const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,  
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

// Function to get user by email
export async function getUserByEmail(email) {
  try {
    if (!email) {
      console.error("❌ getUserByEmail: Email is undefined or empty");
      return null;
    }

    const trimmedEmail = email.trim().toLowerCase(); // Ensure case insensitivity
    console.log("🔍 Searching user by email:", trimmedEmail);

    const [rows] = await promisePool.query(
      "SELECT * FROM users_login.user_managements WHERE LOWER(email) = ?",
      [trimmedEmail]
    );

    console.log("📢 Database Query Result:", rows);

    if (rows.length === 0) {
      console.warn("⚠️ No user found for email:", trimmedEmail);
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("❌ Database query error:", error);
    return null;
  }
}

export default promisePool;
