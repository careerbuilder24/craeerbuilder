// // app/api/upload/route.js
// import { NextResponse } from 'next/server';
// import db from '@/libs/db'; // Ensure alias is correct

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { imageUrl, text, date, time } = body;

//     // Validate input
//     if (!imageUrl || !text || !date || !time) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'All fields (imageUrl, text, date, time) are required',
//         },
//         { status: 400 }
//       );
//     }

//     const created_at = new Date();

//     const [result] = await db.execute(
//       `INSERT INTO users_login.achievements (image_url, text, date, time, created_at) VALUES (?, ?, ?, ?, ?)`,
//       [imageUrl, text, date, time, created_at]
//     );

//     return NextResponse.json({
//       success: true,
//       message: 'Image data inserted successfully',
//       id: result.insertId,
//     });
//   } catch (error) {
//     console.error('POST /api/upload error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Server error',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
// app/api/upload/route.js
import { NextResponse } from 'next/server';
import db from '@/libs/db';

export async function POST(req) {
    try {
        const body = await req.json();
        const { image_url, text, date, time } = body;

        if (!image_url || !text || !date || !time) {
            return NextResponse.json({
                success: false,
                message: 'All fields are required (imageUrl, text, date, time)'
            }, { status: 400 });
        }

        const created_at = new Date();

        const [result] = await db.execute(
            `INSERT INTO achievements (image_url, text, date, time, created_at) VALUES (?, ?, ?, ?, ?)`,
            [image_url, text, date, time, created_at]
        );

        return NextResponse.json({
            success: true,
            message: 'Achievement added successfully',
            id: result.insertId
        });
    } catch (err) {
        console.error('Upload error:', err);
        return NextResponse.json({
            success: false,
            message: 'Server error',
            error: err.message
        }, { status: 500 });
    }
}
