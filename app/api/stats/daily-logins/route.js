// /app/api/stats/daily-logins/route.js
import { NextResponse } from "next/server";
import promisePool from "@/libs/db";

export async function GET() {
  try {
    const [rows] = await promisePool.query(`
      SELECT 
        DATE(login_date) AS date, 
        COUNT(*) AS total_logins
      FROM users_login.login_activity
      GROUP BY DATE(login_date)
      ORDER BY DATE(login_date) ASC;
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching daily logins:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
