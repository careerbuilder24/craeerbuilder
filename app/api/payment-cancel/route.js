// app/api/payment-cancel/route.js
import { NextResponse } from "next/server";

export async function POST() {
  // Force GET redirect instead of re-POST
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancel`,
    302  // 👈 important: makes browser follow with GET
  );
}
