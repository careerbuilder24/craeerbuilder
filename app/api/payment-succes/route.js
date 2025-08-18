// app/api/payment-success/route.js
import { NextResponse } from "next/server";

export async function POST() {
  // Redirect to success page after payment
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment-success`);
}
