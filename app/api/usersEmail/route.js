import { NextResponse } from "next/server";
import promisePool from "@/libs/db"; // Import database connection

export async function GET() {
  try {
    const [rows] = await promisePool.query("SELECT email  FROM users_login.user_managements;");
    return NextResponse.json({ emails: rows }, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
}
