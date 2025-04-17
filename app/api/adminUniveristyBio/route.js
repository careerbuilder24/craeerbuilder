

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

    // ✅ Fixed validation: now correctly checks for missing fields
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
