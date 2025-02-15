import { NextResponse } from "next/server";
import { getUserByEmail } from '../../../../libs/db'; // Make sure to use the correct path to your db.js

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }

    // Fetch user data from the database using email
    const userProfile = await getUserByEmail(email);

    // Check if user exists
    if (!userProfile) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    // Return the user profile with name and photo_url
    return NextResponse.json({
      success: true,
      data: {
        name: userProfile.name,
        photo_url: userProfile.photo,
        role: userProfile.role
      }
    });
  } catch (error) {
    console.error(" API ERROR:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
