import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',       // Where your MySQL server is running (localhost or IP)
  user: 'root',            // Your MySQL username
  password: 'Galib1234$', // Your MySQL password
  database: 'admin_data', // Your database name
});

const promisePool = pool.promise();

export default promisePool;
