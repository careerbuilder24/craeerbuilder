// import { NextResponse } from "next/server";
// import promisePool from "../../../libs/db"; // adjust path to your db connection

// export async function POST(req) {
//   try {
//     const data = await req.json();

//     const query = `
//   INSERT INTO cvs 
//   (name, fatherName, motherName, maritalStatus, languagePreference, 
//    email, address, permanentAddress, phone, facebook, linkedin, youtube, 
//    objective, careerSummary, workExperience, coreSkills, extraCurriculum, reference,
//    profileImage, matchedUserEmail) 
//   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// `;

//     const values = [
//       data.name || null,
//       data.fatherName || null,
//       data.motherName || null,
//       data.maritalStatus || null,
//       data.languagePreference || null,
//       data.contact?.email || null,
//       data.contact?.address || null,
//       data.contact?.permanentAddress || null,
//       data.contact?.phone || null,
//       data.socialMedia?.facebook || null,
//       data.socialMedia?.linkedin || null,
//       data.socialMedia?.youtube || null,
//       data.objective || null,
//       data.careerSummary || null,
//       data.workExperience || null,
//       data.coreSkills || null,
//       data.extraCurriculum || null,
//       data.reference || null,
//       data.profileImage || null,
//       data.matchedUserEmail || null, // <- new field
//     ];

//     const [result] = await promisePool.execute(query, values);

//     // Save education separately
//     if (Array.isArray(data.education)) {
//       for (let edu of data.education) {
//         await promisePool.execute(
//           `INSERT INTO education (cv_id, level, institute, year, result, major) VALUES (?, ?, ?, ?, ?, ?)`,
//           [result.insertId, edu.level, edu.institute, edu.year, edu.result, edu.major]
//         );
//       }
//     }

//     return NextResponse.json({ success: true, id: result.insertId });
//   } catch (error) {
//     console.error("Error inserting CV:", error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }
// export async function POST(req) {
//   try {
//     const data = await req.json();
//     const email = data.matchedUserEmail || data.contact?.email;

//     if (!email) {
//       return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
//     }

//     // Check if CV already exists
//     const [existing] = await promisePool.execute(
//       `SELECT id FROM cvs WHERE matchedUserEmail = ?`,
//       [email]
//     );

//     if (existing.length > 0) {
//       return NextResponse.json({
//         success: false,
//         message: "You have already submitted a CV"
//       }, { status: 409 }); // Conflict status
//     }

//     // Proceed to insert if no existing CV
//     const query = `
//       INSERT INTO cvs 
//       (name, fatherName, motherName, maritalStatus, languagePreference, 
//        email, address, permanentAddress, phone, facebook, linkedin, youtube, 
//        objective, careerSummary, workExperience, coreSkills, extraCurriculum, reference,
//        profileImage, matchedUserEmail) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//       data.name || null,
//       data.fatherName || null,
//       data.motherName || null,
//       data.maritalStatus || null,
//       data.languagePreference || null,
//       data.contact?.email || null,
//       data.contact?.address || null,
//       data.contact?.permanentAddress || null,
//       data.contact?.phone || null,
//       data.socialMedia?.facebook || null,
//       data.socialMedia?.linkedin || null,
//       data.socialMedia?.youtube || null,
//       data.objective || null,
//       data.careerSummary || null,
//       data.workExperience || null,
//       data.coreSkills || null,
//       data.extraCurriculum || null,
//       data.reference || null,
//       data.profileImage || null,
//       data.matchedUserEmail || null,
//     ];

//     const [result] = await promisePool.execute(query, values);

//     // Save education separately
//     if (Array.isArray(data.education)) {
//       for (let edu of data.education) {
//         await promisePool.execute(
//           `INSERT INTO education (cv_id, level, institute, year, result, major) VALUES (?, ?, ?, ?, ?, ?)`,
//           [result.insertId, edu.level, edu.institute, edu.year, edu.result, edu.major]
//         );
//       }
//     }

//     return NextResponse.json({ success: true, id: result.insertId });

//   } catch (error) {
//     console.error("Error inserting CV:", error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

// app/api/cv/route.js
import { NextResponse } from 'next/server';
import promisePool from '../../../libs/db'; // adjust path to your db connection

// ======================= GET: fetch all CVs with education =======================
// ======================= GET: fetch all CVs with education, certificates, projects =======================
export async function GET() {
  try {
    // Fetch CVs
    const [cvRows] = await promisePool.execute(`SELECT * FROM cvs`);

    // Fetch education
    const [eduRows] = await promisePool.execute(`SELECT * FROM education`);

    // Fetch certificates
    const [certRows] = await promisePool.execute(`SELECT * FROM cvcertificates`);

    // Fetch projects
    const [projRows] = await promisePool.execute(`SELECT * FROM cvprojects`);

    // Group data
    const cvMap = {};
    cvRows.forEach(cv => {
      cvMap[cv.id] = { ...cv, education: [], certificates: [], projects: [] };
    });

    eduRows.forEach(edu => {
      if (cvMap[edu.cv_id]) {
        cvMap[edu.cv_id].education.push(edu);
      }
    });

    certRows.forEach(cert => {
      if (cvMap[cert.cv_id]) {
        cvMap[cert.cv_id].certificates.push(cert);
      }
    });

    projRows.forEach(proj => {
      if (cvMap[proj.cv_id]) {
        cvMap[proj.cv_id].projects.push(proj);
      }
    });

    const allCvs = Object.values(cvMap);

    return NextResponse.json({ success: true, data: allCvs });
  } catch (error) {
    console.error('Error fetching CVs:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


// ======================= POST: insert new CV =======================
export async function POST(req) {
  try {
    const data = await req.json();
    const email = data.matchedUserEmail || data.contact?.email;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // Check if CV already exists
    const [existing] = await promisePool.execute(
      `SELECT id FROM cvs WHERE matchedUserEmail = ?`,
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json({
        success: false,
        message: "You have already submitted a CV"
      }, { status: 409 });
    }

    // Insert main CV
    const query = `
      INSERT INTO cvs 
      (name, fatherName, motherName, maritalStatus, languagePreference, 
       email, address, permanentAddress, phone, facebook, linkedin, youtube, 
       objective, careerSummary, workExperience, coreSkills, extraCurriculum, reference,
       profileImage, matchedUserEmail, softSkills) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.name || null,
      data.fatherName || null,
      data.motherName || null,
      data.maritalStatus || null,
      data.languagePreference || null,
      data.contact?.email || null,
      data.contact?.address || null,
      data.contact?.permanentAddress || null,
      data.contact?.phone || null,
      data.socialMedia?.facebook || null,
      data.socialMedia?.linkedin || null,
      data.socialMedia?.youtube || null,
      data.objective || null,
      data.careerSummary || null,
      data.workExperience || null,
      data.coreSkills || null,
      data.extraCurriculum || null,
      data.reference || null,
      data.profileImage || null,
      data.matchedUserEmail || null,
      data.softSkills || null,
    ];

    const [result] = await promisePool.execute(query, values);
    const cvId = result.insertId;

    // Insert Education
    if (Array.isArray(data.education)) {
      for (let edu of data.education) {
        await promisePool.execute(
          `INSERT INTO education (cv_id, level, institute, year, result, major) VALUES (?, ?, ?, ?, ?, ?)`,
          [cvId, edu.level, edu.institute, edu.year, edu.result, edu.major]
        );
      }
    }

    // Insert Certificates
    if (Array.isArray(data.certificates)) {
      for (let cert of data.certificates) {
        await promisePool.execute(
          `INSERT INTO cvcertificates (cv_id, name, link, description) VALUES (?, ?, ?, ?)`,
          [cvId, cert.name || null, cert.link || null, cert.description || null]
        );
      }
    }

    // Insert Projects
    if (Array.isArray(data.projects)) {
      for (let proj of data.projects) {
        await promisePool.execute(
          `INSERT INTO cvprojects (cv_id, title, link, description) VALUES (?, ?, ?, ?)`,
          [cvId, proj.title || null, proj.link || null, proj.description || null]
        );
      }
    }

    return NextResponse.json({ success: true, id: cvId });

  } catch (error) {
    console.error("Error inserting CV:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


// ======================= PUT: update existing CV =======================
export async function PUT(req) {
  try {
    const data = await req.json();
    const email = data.matchedUserEmail || data.contact?.email;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const [existing] = await promisePool.execute(
      `SELECT id FROM cvs WHERE matchedUserEmail = ?`,
      [email]
    );

    if (existing.length === 0) {
      return NextResponse.json({ success: false, message: "CV not found" }, { status: 404 });
    }

    const cvId = existing[0].id;

    // Update main CV
    const updateQuery = `
      UPDATE cvs SET
        name = ?, fatherName = ?, motherName = ?, maritalStatus = ?, languagePreference = ?,
        email = ?, address = ?, permanentAddress = ?, phone = ?, facebook = ?, linkedin = ?, youtube = ?,
        objective = ?, careerSummary = ?, workExperience = ?, coreSkills = ?, extraCurriculum = ?, reference = ?,
        profileImage = ?, softSkills = ?
      WHERE id = ?
    `;

    const updateValues = [
      data.name || null,
      data.fatherName || null,
      data.motherName || null,
      data.maritalStatus || null,
      data.languagePreference || null,
      data.contact?.email || null,
      data.contact?.address || null,
      data.contact?.permanentAddress || null,
      data.contact?.phone || null,
      data.socialMedia?.facebook || null,
      data.socialMedia?.linkedin || null,
      data.socialMedia?.youtube || null,
      data.objective || null,
      data.careerSummary || null,
      data.workExperience || null,
      data.coreSkills || null,
      data.extraCurriculum || null,
      data.reference || null,
      data.profileImage || null,
      data.softSkills || null,
      cvId,
    ];

    await promisePool.execute(updateQuery, updateValues);

    // Delete old Education / Certificates / Projects
    // Delete old Education / Certificates / Projects
    await promisePool.execute(`DELETE FROM education WHERE cv_id = ?`, [cvId]);
    await promisePool.execute(`DELETE FROM cvcertificates WHERE cv_id = ?`, [cvId]);
    await promisePool.execute(`DELETE FROM cvprojects WHERE cv_id = ?`, [cvId]);
    // Insert new Education
    if (Array.isArray(data.education)) {
      for (let edu of data.education) {
        await promisePool.execute(
          `INSERT INTO education (cv_id, level, institute, year, result, major) VALUES (?, ?, ?, ?, ?, ?)`,
          [cvId, edu.level, edu.institute, edu.year, edu.result, edu.major]
        );
      }
    }

    // Insert new Certificates
    if (Array.isArray(data.certificates)) {
      for (let cert of data.certificates) {
        await promisePool.execute(
          `INSERT INTO cvcertificates (cv_id, name, link, description) VALUES (?, ?, ?, ?)`,
          [cvId, cert.name || null, cert.link || null, cert.description || null]
        );
      }
    }

    // Insert new Projects
    if (Array.isArray(data.projects)) {
      for (let proj of data.projects) {
        await promisePool.execute(
          `INSERT INTO cvprojects (cv_id, title, link, description) VALUES (?, ?, ?, ?)`,
          [cvId, proj.title || null, proj.link || null, proj.description || null]
        );
      }
    }

    return NextResponse.json({ success: true, message: "CV updated successfully" });

  } catch (error) {
    console.error("Error updating CV:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
