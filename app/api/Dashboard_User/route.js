import { NextResponse } from "next/server";
// import db from "../../../libs/db";
import db from "@/libs/db";

export async function GET() {
  try {
    // Execute the query using the promise-based API
    const [rows] = await db.query("SELECT * FROM admin_data.user_managements;");
    
    // Return the results as a JSON response
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch data." });
  }
}
