import db from "@/libs/db";
import { NextResponse } from "next/server";



// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("api received", body);

//     const { id, ...fields } = body; // get id and all other fields

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: "Student ID is required for update" },
//         { status: 400 }
//       );
//     }

//     // Remove undefined or empty fields
//     const filteredFields = Object.entries(fields).reduce((acc, [key, value]) => {
//       if (value !== undefined && value !== "") {
//         acc[key] = value;
//       }
//       return acc;
//     }, {});

//     // If no fields to update, return
//     if (Object.keys(filteredFields).length === 0) {
//       return NextResponse.json(
//         { success: false, message: "No fields to update" },
//         { status: 400 }
//       );
//     }

//     // Build dynamic SET clause for SQL
//     const setClause = Object.keys(filteredFields)
//       .map((key) => `${key} = ?`)
//       .join(", ");

//     const values = Object.values(filteredFields);

//     //  Add created_at if you want to log update time
//     const created_at = new Date();
//     const finalQuery = `
//       UPDATE users_login.edit_profile
//       SET ${setClause}, created_at = ?
//       WHERE id = ?
//     `;

//     const [result] = await db.execute(finalQuery, [...values, created_at, id]);

//     if (result.affectedRows === 0) {
//       return NextResponse.json(
//         { success: false, message: "Update failed: No record found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: "Profile updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating data:", error);
//     return NextResponse.json(
//       { success: false, message: "Error updating data", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// Get method 


export async function POST(req) {
  try {
    const body = await req.json();
    console.log("api received", body);

    const { id, ...fields } = body; // extract id, but don't require it

    // Remove undefined or empty fields
    const filteredFields = Object.entries(fields).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (Object.keys(filteredFields).length === 0) {
      return NextResponse.json(
        { success: false, message: "No fields to update or insert" },
        { status: 400 }
      );
    }

    const created_at = new Date();

    if (id) {
      // Update existing record
      const setClause = Object.keys(filteredFields)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(filteredFields);
      const finalQuery = `
        UPDATE users_login.edit_profile
        SET ${setClause}, created_at = ?
        WHERE id = ?
      `;
      const [result] = await db.execute(finalQuery, [...values, created_at, id]);
      if (result.affectedRows === 0) {
        return NextResponse.json(
          { success: false, message: "Update failed: No record found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, message: "Profile updated successfully" },
        { status: 200 }
      );
    } else {
      // Insert new record
      const keys = Object.keys(filteredFields).join(", ");
      const placeholders = Object.keys(filteredFields).map(() => "?").join(", ");
      const values = Object.values(filteredFields);
      const finalQuery = `
        INSERT INTO users_login.edit_profile (${keys}, created_at)
        VALUES (${placeholders}, ?)
      `;
      await db.execute(finalQuery, [...values, created_at]);
      return NextResponse.json(
        { success: true, message: "Profile created successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error processing data:", error);
    return NextResponse.json(
      { success: false, message: "Error processing data", error: error.message },
      { status: 500 }
    );
  }
}


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





//  Flexible PUT (partial update)
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Student ID is required." },
        { status: 400 }
      );
    }

    // Filter out empty or undefined fields
    const filteredFields = Object.entries(fields).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== "") acc[key] = value;
      return acc;
    }, {});

    if (Object.keys(filteredFields).length === 0) {
      return NextResponse.json(
        { success: false, message: "No fields provided for update." },
        { status: 400 }
      );
    }

    // Build dynamic query
    const setClause = Object.keys(filteredFields)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(filteredFields);

    // Add updated timestamp
    const created_at = new Date();
    const query = `
      UPDATE users_login.edit_profile
      SET ${setClause}, created_at = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [...values, created_at, id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "No matching record found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Profile updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { success: false, message: "Error updating profile", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE student
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Student ID is required." },
        { status: 400 }
      );
    }

    const query = `DELETE FROM users_login.edit_profile WHERE id = ?`;
    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "No student found with this ID." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Student deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting student.", error: error.message },
      { status: 500 }
    );
  }
}

