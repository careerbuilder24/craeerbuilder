
// import promisePool from "../../../libs/db"; 
// import { NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";

// export async function POST(req) {
//     try {
//         const formData = await req.formData();

//         const name = formData.get("name");
//         const country = formData.get("country");
//         const tuition = formData.get("tuition");
//         const review = formData.get("review");

//         const logo = formData.get("logo");   // File
//         const mainImage = formData.get("mainImage"); // File

//         if (!name || !country || !tuition || !review || !logo || !mainImage) {
//             return NextResponse.json(
//                 { success: false, message: "Missing required fields" },
//                 { status: 400 }
//             );
//         }

//         // Upload directory
//         const uploadDir = path.join(process.cwd(), "public", "uploads");

//         // Save helper
//         const saveFile = async (file) => {
//             if (!file) return null;
//             const buffer = Buffer.from(await file.arrayBuffer());
//             const fileName = `${Date.now()}-${file.name}`;
//             const filePath = path.join(uploadDir, fileName);
//             await writeFile(filePath, buffer);
//             return `/uploads/${fileName}`;
//         };

//         // Save logo + main image
//         const logoUrl = await saveFile(logo);
//         const mainImageUrl = await saveFile(mainImage);

//         // Handle dynamic sections
//         const sections = [];
//         for (let [key, value] of formData.entries()) {
//             if (key.startsWith("sections")) {
//                 const match = key.match(/sections\[(\d+)\]\[(.+)\]/);
//                 if (match) {
//                     const index = match[1];
//                     const field = match[2];
//                     if (!sections[index]) sections[index] = {};
//                     if (value instanceof File) {
//                         const imgUrl = await saveFile(value);
//                         sections[index][field] = imgUrl;
//                     } else {
//                         sections[index][field] = value;
//                     }
//                 }
//             }
//         }

//         // Ensure sections is always an array
//         const sectionsJson = JSON.stringify(sections.length ? sections : []);

//         // Insert into DB
//         const query = `
//           INSERT INTO users_login.abroadUniversities (name, country, tuition, review, logo, mainImage, sections)
//           VALUES (?, ?, ?, ?, ?, ?, ?)
//         `;
//         const values = [name, country, tuition, review, logoUrl, mainImageUrl, sectionsJson];

//         const [result] = await promisePool.execute(query, values);

//         return NextResponse.json(
//             { success: true, message: "University added successfully", universityId: result.insertId },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error("Upload error:", error);
//         return NextResponse.json(
//             { success: false, message: "Error adding university", error: error.message },
//             { status: 500 }
//         );
//     }
// }

// // GET → Fetch universities
// export async function GET(req) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get("id");

//         let query = "SELECT * FROM users_login.abroadUniversities";
//         let values = [];

//         if (id) {
//             query += " WHERE id = ?";
//             values.push(id);
//         }

//         const [rows] = await promisePool.execute(query, values);

//         // Safely parse sections JSON
//         const universities = rows.map((uni) => {
//             let sections = [];
//             try {
//                 if (uni.sections) sections = JSON.parse(uni.sections);
//             } catch (e) {
//                 console.warn(`Failed to parse sections for university ID ${uni.id}:`, e.message);
//                 sections = [];
//             }
//             return { ...uni, sections };
//         });

//         return NextResponse.json(
//             { success: true, universities },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Fetch error:", error);
//         return NextResponse.json(
//             { success: false, message: "Error fetching universities", error: error.message },
//             { status: 500 }
//         );
//     }
// }
import promisePool from "../../../libs/db";
import { NextResponse } from "next/server";

// POST: Add a new university
export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const country = formData.get("country");
    const tuition = formData.get("tuition");
    const review = formData.get("review");
    const category = formData.get("category");
    const created_at = new Date();

    const logoUrl = formData.get("logo"); // Already uploaded via ImgBB
    const mainImageUrl = formData.get("mainImage"); // Already uploaded via ImgBB
    const sectionsRaw = formData.get("sections"); // JSON string

    if (!name || !country || !tuition || !review || !logoUrl || !mainImageUrl || !category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    let sections = [];
    if (sectionsRaw) {
      try {
        sections = JSON.parse(sectionsRaw);
      } catch (e) {
        console.warn("Failed to parse sections:", e.message);
        sections = [];
      }
    }

    // Insert into database
    const query = `
      INSERT INTO users_login.abroadUniversities
      (name, country, tuition, review, category, logo, mainImage, sections, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, country, tuition, review, category, logoUrl, mainImageUrl, JSON.stringify(sections), created_at];
    const [result] = await promisePool.execute(query, values);

    return NextResponse.json(
      { success: true, message: "University added successfully", universityId: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: "Error adding university", error: error.message },
      { status: 500 }
    );
  }
}


// GET: Fetch universities
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    let query = "SELECT * FROM users_login.abroadUniversities";
    const values = [];
    if (id) {
      query += " WHERE id = ?";
      values.push(id);
    }

    const [rows] = await promisePool.execute(query, values);

    const universities = rows.map((uni) => {
      let sections = [];

      if (uni.sections) {
        try {
         
          sections =
            typeof uni.sections === "string"
              ? JSON.parse(uni.sections)
              : uni.sections;
        } catch (e) {
          console.warn(
            `Failed to parse sections for university ID ${uni.id}:`,
            e.message
          );
          sections = [];
        }
      }

      return { ...uni, sections };
    });

    return NextResponse.json(
      { success: true, universities },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching universities",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
