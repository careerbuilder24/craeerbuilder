import { NextResponse } from "next/server";
import promisePool from "../../../libs/db"; // adjust path to your db connection

export async function POST(req) {
  try {
    const data = await req.json();

    // Assuming data.imageUrl contains the hosted image link
    const query = `
      INSERT INTO cvs 
      (name, fatherName, motherName, maritalStatus, languagePreference, 
       email, address, permanentAddress, phone, facebook, linkedin, youtube, 
       objective, careerSummary, workExperience, coreSkills, extraCurriculum, reference,
       profileImage) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.name,
      data.fatherName,
      data.motherName,
      data.maritalStatus,
      data.languagePreference,
      data.contact.email,
      data.contact.address,
      data.contact.permanentAddress,
      data.contact.phone,
      data.socialMedia.facebook,
      data.socialMedia.linkedin,
      data.socialMedia.youtube,
      data.objective,
      data.careerSummary,
      data.workExperience,
      data.coreSkills,
      data.extraCurriculum,
      data.reference,
      data.imageUrl, // save hosted image link here
    ];

    const [result] = await promisePool.execute(query, values);

    // Save education separately
    if (Array.isArray(data.education)) {
      for (let edu of data.education) {
        await promisePool.execute(
          `INSERT INTO education (cv_id, level, institute, year, result, major) VALUES (?, ?, ?, ?, ?, ?)`,
          [result.insertId, edu.level, edu.institute, edu.year, edu.result, edu.major]
        );
      }
    }

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Error inserting CV:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
