

import { NextResponse } from 'next/server';
import db from '../../../libs/db';

export const POST = async (req) => {
  try {
    const body = await req.json();
    const {
      university_logo,
      university_name,
      undergraduate_course,
      undergraduate_credits,
      postgraduate_course,
      postgraduate_credits,
      university_cost,
      diploma_course_name,
      diploma_course_cost,
      university_link,
      created_at
    } = body;


    if (
      !university_logo || !university_name || !undergraduate_course || !undergraduate_credits ||
      !postgraduate_course || !postgraduate_credits || !university_cost || !diploma_course_name ||
      !university_link || !diploma_course_cost || !created_at
    ) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const result = await db.query(
      `INSERT INTO users_login.university_data (
        university_logo, university_name, undergraduate_course, undergraduate_credits,
        postgraduate_course, postgraduate_credits, university_cost, diploma_course_name,
        diploma_course_cost, university_link, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        university_logo,
        university_name,
        undergraduate_course,
        undergraduate_credits,
        postgraduate_course,
        postgraduate_credits,
        university_cost,
        diploma_course_name,
        diploma_course_cost,
        university_link,
        new Date(),
      ]
    );

    return NextResponse.json({ message: 'University bio added successfully', result });
  } catch (error) {
    console.error('Error inserting university bio:', error);
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
};



// GET function

export async function GET() {
  try {
    const query = `SELECT * FROM users_login.university_data`;

    const [rows] = await db.execute(query);
    return NextResponse.json({
      success: true,
      data: rows
    }, { status: 200 })
  } catch (error) {
    console.error('Error Fetching University data: ', error);
    return NextResponse.json({
      success: false,
      message: "error Fetching Data",
      error: error.message
    })


  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const {
      id,
      university_logo,
      university_name,
      undergraduate_course,
      undergraduate_credits,
      postgraduate_course,
      postgraduate_credits,
      university_cost,
      diploma_course_name,
      diploma_course_cost,
      university_link,
    } = body;

    if (
      !id || !university_logo || !university_name || !undergraduate_course || !undergraduate_credits ||
      !postgraduate_course || !postgraduate_credits || !university_cost || !diploma_course_name ||
      !university_link || !diploma_course_cost
    ) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const query = `
      UPDATE users_login.university_data
      SET 
        university_logo = ?, 
        university_name = ?, 
        undergraduate_course = ?, 
        undergraduate_credits = ?, 
        postgraduate_course = ?, 
        postgraduate_credits = ?, 
        university_cost = ?, 
        diploma_course_name = ?, 
        diploma_course_cost = ?, 
        university_link = ?
      WHERE id = ?
    `;

    const values = [
      university_logo,
      university_name,
      undergraduate_course,
      undergraduate_credits,
      postgraduate_course,
      postgraduate_credits,
      university_cost,
      diploma_course_name,
      diploma_course_cost,
      university_link,
      id
    ];

    const [result] = await db.execute(query, values);

    return NextResponse.json({
      success: true,
      message: 'University data updated successfully',
      result,
    }, { status: 200 });

  } catch (err) {
    console.error('Error updating university data:', err);
    return NextResponse.json({
      success: false,
      message: 'Error updating university data',
      error: err.message,
    }, { status: 500 });
  }
}



export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    }

    const query = 'DELETE FROM users_login.university_data WHERE id = ?';
    await db.execute(query, [id]);

    return NextResponse.json({ success: true, message: 'Deleted successfully' }, { status: 200 });

  } catch (err) {
    console.log('the delete error is:', err)
    return NextResponse.json({
      success: false,
      message: 'Error deleting gallery item',
      error: err.message
    }, { status: 500 })
  }
}



