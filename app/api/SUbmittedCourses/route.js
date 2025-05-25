import db from '../../../libs/db';
import { NextResponse } from 'next/server';


// POST Method
export async function POST(req) {
    try {
        const body = await req.json();
        const { startDate, endDate, title, duration, details, certificate, imageUrl, created_time } = body;

        if (!startDate || !endDate || !title || !duration || !details || !certificate || !imageUrl || !created_time) {
            return NextResponse.json({
                success: false,
                message: 'All fields are required'
            }, { status: 400 });
        }


        const [result] = await db.execute(
            `INSERT INTO users_login.studentcourses (startDate, endDate, title, duration, details, certificate,imageUrl, created_time ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [startDate, endDate, title, duration, details, certificate, imageUrl, created_time]
        );

        return NextResponse.json({
            success: true,
            message: 'Course submitted successfully',
            postId: result.insertId,
        });

    } catch (error) {
        console.error('Error inserting data:', error);
        return NextResponse.json({
            success: false,
            message: 'Server Error',
            error: error.message
        }, { status: 500 });
    }
}



// GET method
export async function GET() {

    try {
        const query = 'SELECT * FROM users_login.studentcourses';
        const [row] = await db.execute(query);


        return NextResponse.json({
            success: true,
            data: row,
        }, { status: 200 })
    } catch (error) {
        console.error("error of getting data");
        return NextResponse.json({
            success: false,
            message: "Error of fetching data",
            error: error.message
        }, { status: 500 })
    }
}

// Delete Method

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'Missing ID'
            }, { status: 400 });
        }


        const query = ' DELETE FROM users_login.studentcourses WHERE id = ?'

        await db.execute(query, [id]);

        return NextResponse.json({
            success: true,
            message: 'Deleted Successfully',
           
        })
    } catch (error) {

        console.error("The delete error is", error)
        return NextResponse.json({
            success: false,
            message: 'Error deleting gallery item',
            error: error.message
        }, { status: 500 })

    }
}
