// app/api/faq/route.js
import db from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, subTitle, description } = body;

    if (!title || !subTitle || !description) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    const [result] = await db.execute(
      `INSERT INTO faq_add_data (title, sub_title, description) VALUES (?, ?, ?)`,
      [title, subTitle, description]
    );

    return NextResponse.json({ success: true, message: "FAQ added", postId: result.insertId });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
  }
}


// GET function

export async function GET() {
  try {
    const query = 'SELECT * FROM  users_login.faq_add_data';
    const [row] = await db.execute(query);
    return NextResponse.json({
      success: true,
      data: row,
    }, { status: 200 })
  } catch (error) {
    console.error('error of getting data', error)
    return NextResponse.json({
      success: false,
      message: 'Error fetching data',
      error: error.message
    }, { status: 500 })
  }
}


//  Delete Function
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID is missing",
      }, { status: 400 });
    }

    const query = 'DELETE FROM users_login.faq_add_data WHERE id = ?';
    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({
        success: false,
        message: "FAQ not found or already deleted"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("The delete error is:", error);
    return NextResponse.json({
      success: false,
      message: "Error deleting FAQ",
      error: error.message,
    }, { status: 500 });
  }
}





// Update (PUT) Function
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, title, sub_title, description } = body;

    if (!id || !title || !sub_title || !description) {
      return NextResponse.json({
        success: false,
        message: "All fields (id, title, subTitle, description) are required."
      }, { status: 400 });
    }

    const query = `
      UPDATE users_login.faq_add_data
      SET title = ?, sub_title = ?, description = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [title, sub_title, description, id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({
        success: false,
        message: "FAQ not found or no changes made."
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "FAQ updated successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("The update error is:", error);
    return NextResponse.json({
      success: false,
      message: "Error updating FAQ",
      error: error.message,
    }, { status: 500 });
  }
}
