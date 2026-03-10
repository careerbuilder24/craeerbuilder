
import promisePool from '@/libs/db';
import { NextResponse } from 'next/server';

// ✅ Helper: normalize student type
const normalizeStudentType = (type) => {
  switch (type) {
    case 'Running_Intern':
    case 'Running_Employee':
      return type;
    default:
      return 'Running_Student';
  }
};

// ✅ Helper: format JS date or ISO string to YYYY-MM-DD
const formatDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split('T')[0];
};

// ========================== POST ==========================
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("API Received Body (POST):", body);

    const {
      topInfo,
      personalInfo,
      courseDetails,
      purpose,
      educationRows,
      extraCourses,
      jobExperience,
      businessInfo,
      declaration,
      image,
      signature
    } = body;

    const query = `
      INSERT INTO users_login.students_added_admin 
      (form_no, branch, batch, date, student_name, father_name, mother_name, present_address, permanent_address, contact1, contact2, dob, nid, email, status,
       course_subject, course_session, course_time, program, purpose, education, extra_courses, job_experience, business_info, student_image, signature_image, declaration)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      topInfo.formNo,
      topInfo.branch,
      topInfo.batch,
      formatDate(topInfo.date),             // ✅ fix
      personalInfo.studentName,
      personalInfo.fatherName,
      personalInfo.motherName,
      personalInfo.presentAddress,
      personalInfo.permanentAddress,
      personalInfo.contact1,
      personalInfo.contact2,
      formatDate(personalInfo.dob),         // ✅ fix
      personalInfo.nid,
      personalInfo.email,
      normalizeStudentType(personalInfo.studentType),
      courseDetails.subject,
      courseDetails.session,
      courseDetails.time,
      courseDetails.program,
      JSON.stringify(purpose),
      JSON.stringify(educationRows),
      JSON.stringify(extraCourses),
      JSON.stringify(jobExperience),
      JSON.stringify(businessInfo),
      image,
      signature,
      declaration ? 1 : 0
    ];

    const [result] = await promisePool.execute(query, values);

    return NextResponse.json({
      success: true,
      message: 'Student added successfully',
      studentId: result.insertId
    }, { status: 201 });

  } catch (error) {
    console.error("Database error (POST):", error);
    return NextResponse.json({
      success: false,
      message: 'Error adding student',
      error: error.message
    }, { status: 500 });
  }
}

// ========================== GET ==========================
export async function GET() {
  try {
    const query = 'SELECT * FROM users_login.students_added_admin ORDER BY created_at DESC';
    const [rows] = await promisePool.execute(query);

    return NextResponse.json({
      success: true,
      students: rows
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching students",
      error: error.message
    }, { status: 500 });
  }
}

// ========================== PUT ==========================
export async function PUT(req) {
  try {
    const body = await req.json();
    console.log("API Received PUT Body:", body);

    const {
      studentId,
      topInfo,
      personalInfo,
      courseDetails,
      purpose,
      educationRows,
      extraCourses,
      jobExperience,
      businessInfo,
      declaration,
      student_image,
      signature_image
    } = body;

    const query = `
      UPDATE users_login.students_added_admin SET
        form_no = ?, branch = ?, batch = ?, date = ?,
        student_name = ?, father_name = ?, mother_name = ?, present_address = ?, permanent_address = ?, 
        contact1 = ?, contact2 = ?, dob = ?, nid = ?, email = ?, status = ?,
        course_subject = ?, course_session = ?, course_time = ?, program = ?,
        purpose = ?, education = ?, extra_courses = ?, job_experience = ?, business_info = ?, 
        student_image = ?, signature_image = ?, declaration = ?
      WHERE id = ?
    `;

    const values = [
      topInfo.formNo || null,
      topInfo.branch || null,
      topInfo.batch || null,
      formatDate(topInfo.date), // already handles null
      personalInfo.studentName || null,
      personalInfo.fatherName || null,
      personalInfo.motherName || null,
      personalInfo.presentAddress || null,
      personalInfo.permanentAddress || null,
      personalInfo.contact1 || null,
      personalInfo.contact2 || null,
      formatDate(personalInfo.dob),
      personalInfo.nid || null,
      personalInfo.email || null,
      normalizeStudentType(personalInfo.studentType || personalInfo.status) || 'Running_Student',
      courseDetails.subject || null,
      courseDetails.session || null,
      courseDetails.time || null,
      courseDetails.program || null,
      JSON.stringify(purpose || {}),
      JSON.stringify(educationRows || []),
      JSON.stringify(extraCourses || []),
      JSON.stringify(jobExperience || []),
      JSON.stringify(businessInfo || []),
      student_image || null,
      signature_image || null,
      declaration ? 1 : 0,
      studentId
    ];


    await promisePool.execute(query, values);

    return NextResponse.json({
      success: true,
      message: 'Student updated successfully'
    }, { status: 200 });

  } catch (error) {
    console.error("Database error on update:", error);
    return NextResponse.json({
      success: false,
      message: 'Error updating student',
      error: error.message
    }, { status: 500 });
  }
}


// ========================== DELETE ==========================
// ========================== DELETE ==========================
export async function DELETE(req) {
  try {
    let studentId;

    //  Try to get ID from query params
    const { searchParams } = new URL(req.url);
    studentId = searchParams.get("id");

    //  If not in query, try from request body
    if (!studentId) {
      try {
        const body = await req.json();
        studentId = body?.id;
      } catch (err) {
        // ignore JSON parse error
      }
    }

    if (!studentId) {
      return NextResponse.json(
        { success: false, message: "Student ID is required" },
        { status: 400 }
      );
    }

    const query = "DELETE FROM users_login.students_added_admin WHERE id = ?";
    const [result] = await promisePool.execute(query, [studentId]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Student deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error (DELETE):", error);
    return NextResponse.json(
      { success: false, message: "Error deleting student", error: error.message },
      { status: 500 }
    );
  }
}
