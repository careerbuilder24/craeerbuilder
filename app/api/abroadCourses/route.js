import { NextResponse } from "next/server";
import promisePool from "../../../libs/db";

export async function POST(request) {
  try {
    //  Parse JSON body (not formData)
    const body = await request.json();
    const {
      language,
      title,
      slug,
      batch,
      seats,
      date,
      duration,
      level,
      instructor,
      image,
      description,
      syllabus,
      objectives,
      benefits,
      schedule,
      career,
      reviews,
      certification,
      country,
    } = body;

    //  Correct: promisePool is already an object
    const db = promisePool;

    const query = `
      INSERT INTO users_login.abroadCourses 
      (language, title, slug, batch, seats, date, duration, level, instructor, image, description, syllabus, objectives, benefits, schedule, career, reviews, certification, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      language,
      title,
      slug,
      batch,
      seats,
      date,
      duration,
      level,
      instructor,
      image,
      description,
      JSON.stringify(syllabus),
      JSON.stringify(objectives),
      JSON.stringify(benefits),
      JSON.stringify(schedule),
      JSON.stringify(career),
      JSON.stringify(reviews),
      certification,
      country,
    ];

    const [result] = await db.execute(query, values);

    return NextResponse.json(
      { success: true, message: "Course added successfully", id: result.insertId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding course:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add course", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await promisePool.execute(
      "SELECT * FROM users_login.abroadCourses ORDER BY id DESC"
    );
    return NextResponse.json({ success: true, courses: rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching courses", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ success: false, error: "Course ID is required" }, { status: 400 });

    const db = promisePool;
    await db.execute("DELETE FROM users_login.abroadCourses WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ success: false, message: "Failed to delete course", error: error.message }, { status: 500 });
  }
}

