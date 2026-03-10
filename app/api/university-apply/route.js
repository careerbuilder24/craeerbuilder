// import db from '../../../libs/db';
// import { NextResponse } from 'next/server';

// //  POST: Add new university
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, country, tuition, review, logo, mainImage, created_at } = body;

//     // Validation
//     if (!name || !country || !tuition || !review || !logo || !mainImage || !created_at) {
//       return NextResponse.json({
//         success: false,
//         message: 'All fields are required',
//       }, { status: 400 });
//     }

//     // Insert query
//     const [result] = await db.execute(
//       `INSERT INTO users_login.abroad_applications (name, country, tuition, review, logo, mainImage, created_at)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [name, country, tuition, review, logo, mainImage, created_at]
//     );

//     return NextResponse.json({
//       success: true,
//       message: 'University added successfully',
//       universityId: result.insertId,
//     });
//   } catch (error) {
//     console.error('Error inserting university:', error);
//     return NextResponse.json({
//       success: false,
//       message: 'Server Error',
//       error: error.message,
//     }, { status: 500 });
//   }
// }

// //  GET: Fetch all universities

import db from "../../../libs/db";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, education, cgpa, university_name, university_id, country } = body;

    if (!name || !email || !phone || !education || !university_name || !country) {
      return NextResponse.json({
        success: false,
        message: "All required fields must be filled",
      }, { status: 400 });
    }

    const [result] = await db.execute(
      `INSERT INTO users_login.abroad_applications 
       (user_name, user_email, phone, education, cgpa, university_name, university_id, country, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, education, cgpa, university_name, university_id, country, new Date()]
    );

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      insertId: result.insertId,
    }, { status: 200 });

  } catch (error) {
    console.error("Error inserting application:", error);
    return NextResponse.json({
      success: false,
      message: "Server Error",
      error: error.message,
    }, { status: 500 });
  }
}


export async function GET() {
  try {
    const query = 'SELECT * FROM users_login.abroad_applications ORDER BY id DESC';
    const [rows] = await db.execute(query);

    return NextResponse.json({
      success: true,
      universities: rows,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching data',
      error: error.message,
    }, { status: 500 });
  }
}

// ✅ DELETE: Remove a university by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Missing ID',
      }, { status: 400 });
    }

    const query = 'DELETE FROM users_login.abroad_applications WHERE id = ?';
    await db.execute(query, [id]);

    return NextResponse.json({
      success: true,
      message: 'University deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting university:', error);
    return NextResponse.json({
      success: false,
      message: 'Error deleting university',
      error: error.message,
    }, { status: 500 });
  }
}

//  PATCH - Update status (Accept / Deny)
export async function PATCH(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Missing ID or Status' }, { status: 400 });
    }

    await db.execute('UPDATE users_login.abroad_applications SET status = ? WHERE id = ?', [status, id]);

    return NextResponse.json({
      success: true,
      message: `Application status updated to ${status}`,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({
      success: false,
      message: 'Error updating status',
      error: error.message,
    }, { status: 500 });
  }
}
