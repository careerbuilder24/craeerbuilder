// // /app/api/googleLogin/route.js
// import { NextResponse } from "next/server";
// import promisePool from "@/libs/db";

// export async function POST(req) {
//   try {
//     const { name, email, photoURL } = await req.json();

//     if (!email) {
//       return NextResponse.json(
//         { success: false, message: "Email is required" },
//         { status: 400 }
//       );
//     }

//     const trimmedEmail = email.trim().toLowerCase();

//     // Check if user already exists
//     const [rows] = await promisePool.query(
//       "SELECT * FROM users_login.user_managements WHERE LOWER(email) = ?",
//       [trimmedEmail]
//     );

//     let user;

//     if (rows.length === 0) {
//       // Insert new Google user
//       const [result] = await promisePool.query(
//         `INSERT INTO users_login.user_managements 
//         (name, email, password,  role, created_at) 
//         VALUES (?, ?, ?, 'student', NOW())`,
//         [name || trimmedEmail.split("@")[0], trimmedEmail, null, photoURL || null]
//       );

//       console.log("Inserted new Google user:", trimmedEmail, "Insert ID:", result.insertId);

//       user = {
//         id: result.insertId,
//         name: name || trimmedEmail.split("@")[0],
//         email: trimmedEmail,
//         // photo: photoURL || null,
//         role: "student",
//       };
//     } else {
//       user = rows[0];
//       console.log("Google user already exists:", trimmedEmail);
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Google login successful",
//       user,
//     });
//   } catch (error) {
//     console.error("Google login DB error:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
// /app/api/googleLogin/route.js
import { NextResponse } from "next/server";
import promisePool from "@/libs/db";

export async function POST(req) {
  try {
    const { name, email, photoURL } = await req.json();
    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    const [rows] = await promisePool.query(
      "SELECT * FROM users_login.user_managements WHERE LOWER(email) = ?",
      [trimmedEmail]
    );

    let user;
    if (rows.length === 0) {
      const [result] = await promisePool.query(
        `INSERT INTO users_login.user_managements (name, email, password, role, created_at)
         VALUES (?, ?, ?, 'student', NOW())`,
        [name || trimmedEmail.split("@")[0], trimmedEmail, null]
      );

      user = {
        id: result.insertId,
        name: name || trimmedEmail.split("@")[0],
        email: trimmedEmail,
        role: "student",
      };
    } else {
      user = rows[0];
    }

    // ✅ Track Google login activity
    await promisePool.query(
      `INSERT INTO users_login.login_activity (user_email, user_name, login_date)
       VALUES (?, ?, NOW())`,
      [user.email, user.name]
    );

    return NextResponse.json({
      success: true,
      message: "Google login successful",
      user,
    });
  } catch (error) {
    console.error("Google login DB error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
