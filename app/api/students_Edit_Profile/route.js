import db from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("api received", body);
        const { name, maritalStatus, email, phone, address, permanentAddress, facebook, linkedin, aboutMyself, uploadedImage } = body;

        if (!name || !maritalStatus || !email || !phone || !address || !permanentAddress || !facebook || !linkedin || !aboutMyself || !uploadedImage) {
            console.log("missing Data", { name, maritalStatus, email, phone, address, permanentAddress, facebook, aboutMyself, linkedin, uploadedImage });
            return NextResponse.json({
                success: false,
                message: "Missing Field"
            }, { status: 400 });
        }

        const query = 'INSERT INTO users_login.edit_profile(name, maritalStatus, email, phone, address, permanentAddress, facebook, linkedin, aboutMyself, uploadedImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [name, maritalStatus, email, phone, address, permanentAddress, facebook, linkedin, aboutMyself, uploadedImage];

        const [result] = await db.execute(query, values);

        return NextResponse.json({
            success: true,
            message: "Data added",
            PostID: result.insertId
        }, { status: 201 });

    } catch (error) {
        console.error("Error in post Data", error);
        return NextResponse.json({
            success: false,
            message: "Error adding data",
            error: error.message
        }, { status: 500 });
    }
}


// Get method 
export async function GET() {
    try {
        const query = 'SELECT * FROM users_login.edit_profile';
        const [row] = await db.execute(query);
        return NextResponse.json({
            success: true,
            data: row,
        }, { status: 200 })
    } catch (error) {
        console.error('error of getting data', error);
        return NextResponse.json({
            success: false,
            message: 'Error for Get Data',
            error: error.message
        }, { status: 500 })
    }
}




// PUT method to update student
// export async function PUT(req) {
//     try {
//         const body = await req.json();
//         const { id, name, email, phone, address, facebook, linkedin } = body;

//         if (!id || !name || !email || !phone || !address || !facebook || !linkedin) {
//             return NextResponse.json({
//                 success: false,
//                 message: "All fields are required (id, name, email, phone, address, facebook, linkedin)."
//             }, { status: 400 });
//         }

//         const query = `
//             UPDATE users_login.edit_profile
//             SET name = ?, email = ?, phone = ?, address = ?, facebook = ?, linkedin = ?
//             WHERE id = ?
//         `;

//         const [result] = await db.execute(query, [
//             name, email, phone, address, facebook, linkedin, id
//         ]);

//         if (result.affectedRows === 0) {
//             return NextResponse.json({
//                 success: false,
//                 message: "Student not found or no changes made."
//             }, { status: 404 });
//         }

//         return NextResponse.json({
//             success: true,
//             message: "Student profile updated successfully."
//         }, { status: 200 });

//     } catch (error) {
//         console.error("Update error:", error);
//         return NextResponse.json({
//             success: false,
//             message: "Error updating student profile.",
//             error: error.message,
//         }, { status: 500 });
//     }
// }

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, email, phone, address, facebook, linkedin, uploadedImage } = body;

    if (!id || !name || !email || !phone || !address || !facebook || !linkedin || !uploadedImage) {
      return NextResponse.json({
        success: false,
        message: "All fields are required including uploadedImage.",
      }, { status: 400 });
    }

    const query = `
      UPDATE users_login.edit_profile
      SET name = ?, email = ?, phone = ?, address = ?, facebook = ?, linkedin = ?, uploadedImage = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      name, email, phone, address, facebook, linkedin, uploadedImage, id
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json({
        success: false,
        message: "Student not found or no changes made."
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Student profile updated successfully."
    }, { status: 200 });

  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({
      success: false,
      message: "Error updating student profile.",
      error: error.message,
    }, { status: 500 });
  }
}
