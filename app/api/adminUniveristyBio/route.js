import { NextResponse } from 'next/server';
import db from '../../../libs/db'; // Ensure correct export

export async function POST(req) {
  try {
    const text = await req.text();
    const body = text ? JSON.parse(text) : null;

    const { university_name, university_logo, undergraduate_course, undergraduate_credits, postgraduate_course, postgraduate_credits, university_cost, diploma_course_name, diploma_course_cost, university_link } = body;

    if (!university_logo || !university_name || !undergraduate_course || !undergraduate_credits || !postgraduate_course || !postgraduate_credits || !university_cost || !diploma_course_name || !university_link || diploma_course_cost) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    

    const {
      universityName,
      UniversityLogo,
      undergraduateCourse,
      undergraduateCredits,
      postgraduateCourse,
      postgraduateCredits,
      universityCost,
      diplomaCourseName,
      diplomaCourseCost, // This was missing from SQL (if needed, add it below)
      universityLink,
    } = body;

    const sql = `INSERT INTO universities (
      university_name, university_logo, undergraduate_course, undergraduate_credits,
      postgraduate_course, postgraduate_credits, university_cost,
      diploma_course_name, diploma_course_cost, university_link, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; // 11 values now

    const [result] = await db.execute(sql, [
      universityName || null,
      UniversityLogo || null,
      undergraduateCourse || null,
      undergraduateCredits || null,
      postgraduateCourse || null,
      postgraduateCredits || null,
      universityCost || null,
      diplomaCourseName || null,
      diplomaCourseCost || null,
      universityLink || null,
      diploma_course_cost || null,
      new Date() // Server-side timestamp
    ]);

    return NextResponse.json({ message: 'University data inserted successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to insert university data', error: error.message }, { status: 500 });
  }
}
