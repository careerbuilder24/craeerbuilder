// import axios from "axios";
// import { NextResponse } from "next/server";
// import qs from "querystring";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { customer_name, customer_email, customer_phone, course } = body;

//     const store_id = process.env.SSL_STORE_ID;
//     const store_passwd = process.env.SSL_STORE_PASS;
//     const is_sandbox = true;

//     // const data = {
//     //   store_id,
//     //   store_passwd,
//     //   total_amount: 100,
//     //   currency: "BDT",
//     //   tran_id: `tran_${Date.now()}`,
//     //   // success_url: "http://localhost:3000/payment-success",
//     //   // fail_url: "http://localhost:3000/payment-fail",
//     //   // cancel_url: "http://localhost:3000/payment-cancel",

//     //   emi_option: 0,
//     //   cus_name: customer_name,
//     //   cus_email: customer_email,
//     //   cus_phone: customer_phone,
//     //   cus_add1: "Dhaka",
//     //   cus_city: "Dhaka",
//     //   cus_country: "Bangladesh",
//     //   shipping_method: "NO",
//     //   product_name: course,
//     //   product_category: "Education",
//     //   product_profile: "general",
//     // };
//     const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
//     // const data = {
//     //   store_id,
//     //   store_passwd,
//     //   total_amount: 100,
//     //   currency: "BDT",
//     //   tran_id: `tran_${Date.now()}`,
//     //   success_url: `${APP_URL}/payment-success`,
//     //   fail_url: `${APP_URL}/payment-fail`,
//     //   cancel_url: `${APP_URL}/payment-cancel`,
//     //   emi_option: 0,
//     //   cus_name: customer_name,
//     //   cus_email: customer_email,
//     //   cus_phone: customer_phone,
//     //   cus_add1: "Dhaka",
//     //   cus_city: "Dhaka",
//     //   cus_country: "Bangladesh",
//     //   shipping_method: "NO",
//     //   product_name: course,
//     //   product_category: "Education",
//     //   product_profile: "general",
//     // };
//     const data = {
//       store_id,
//       store_passwd,
//       total_amount: 100,
//       currency: "BDT",
//       tran_id: `tran_${Date.now()}`,

//       success_url: `${APP_URL}/api/payment-success`,
//       fail_url: `${APP_URL}/api/payment-fail`,
//       cancel_url: `${APP_URL}/api/payment-cancel`,

//       emi_option: 0,
//       cus_name: customer_name,
//       cus_email: customer_email,
//       cus_phone: customer_phone,
//       cus_add1: "Dhaka",
//       cus_city: "Dhaka",
//       cus_country: "Bangladesh",
//       shipping_method: "NO",
//       product_name: course,
//       product_category: "Education",
//       product_profile: "general",
//     };

//     const url = is_sandbox
//       ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
//       : "https://securepay.sslcommerz.com/gwprocess/v4/api.php";

//     const response = await axios.post(url, qs.stringify(data), {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });

//     if (response.data?.GatewayPageURL) {
//       return NextResponse.json({ GatewayPageURL: response.data.GatewayPageURL });
//     } else {
//       console.error("SSLCommerz Failed Response:", response.data);
//       return NextResponse.json(
//         { error: "SSLCommerz Gateway error", details: response.data },
//         { status: 500 }
//       );
//     }
//   } catch (err) {
//     console.error("SSLCommerz Error:", err.response?.data || err.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import axios from "axios";
import { NextResponse } from "next/server";
import qs from "querystring";
import db from "../../../libs/db"; // your db connection file

// Post Method
export async function POST(req) {
  try {
    const body = await req.json();
    const { customer_name, customer_email, customer_phone, course } = body;

    const store_id = process.env.SSL_STORE_ID;
    const store_passwd = process.env.SSL_STORE_PASS;
    const is_sandbox = true;
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

    const amount = 100.0; // 💰 make dynamic if needed

    // Insert into DB
    const [result] = await db.execute(
      `INSERT INTO student_courses_enrollments 
       (course_name, customer_name, customer_email, customer_phone, amount, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [course, customer_name, customer_email, customer_phone, amount, "Pending"]
    );

    const tran_id = `tran_${Date.now()}_${result.insertId}`;

    const data = {
      store_id,
      store_passwd,
      total_amount: amount,
      currency: "BDT",
      tran_id,
      success_url: `${APP_URL}/api/payment-success`,
      fail_url: `${APP_URL}/api/payment-fail`,
      cancel_url: `${APP_URL}/api/payment-cancel`,
      emi_option: 0,
      cus_name: customer_name,
      cus_email: customer_email,
      cus_phone: customer_phone,
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      shipping_method: "NO",
      product_name: course,
      product_category: "Education",
      product_profile: "general",
    };

    const url = is_sandbox
      ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
      : "https://securepay.sslcommerz.com/gwprocess/v4/api.php";

    const response = await axios.post(url, qs.stringify(data), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (response.data?.GatewayPageURL) {
      return NextResponse.json({ GatewayPageURL: response.data.GatewayPageURL });
    } else {
      console.error("SSLCommerz Failed Response:", response.data);
      return NextResponse.json(
        { error: "SSLCommerz Gateway error", details: response.data },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("SSLCommerz Error:", err.response?.data || err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Get Method
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // optional filters
    const email = searchParams.get("email");
    const status = searchParams.get("status");

    let query = "SELECT * FROM student_courses_enrollments WHERE 1=1";
    const params = [];

    if (email) {
      query += " AND customer_email = ?";
      params.push(email);
    }
    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await db.execute(query, params);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET Enrollments Error:", err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

