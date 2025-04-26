import promisePool from '../../../libs/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("API Received Body:", body);

        const {
            courseTitle, batchNumber, seatsLeft, timeLeft, starRating,
            courseCost, courseOutlineTitle, courseOutlineDesc,
            tutorVideo, instructorImage, gifFile, benefits, projects
        } = body;

        // Construct query and values
        const query = `INSERT INTO users_login.courses 
                       (course_title, batch_number, seats_left, time_left, star_rating, course_cost, 
                        course_outline_title, course_outline_description, uploaded_video, 
                        instructor_image, uploaded_gif, Course_Benifits, Course_Projects)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            courseTitle, batchNumber, seatsLeft, timeLeft, starRating, courseCost,
            courseOutlineTitle, courseOutlineDesc, tutorVideo, instructorImage,
            gifFile, JSON.stringify(benefits), JSON.stringify(projects)
        ];

        console.log("API Query Values:", values);

        const [result] = await promisePool.execute(query, values);
        return NextResponse.json({
            success: true,
            message: 'Course added successfully',
            courseId: result.insertId
        }, { status: 201 });

    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({
            success: false,
            message: 'Error adding course',
            error: error.message
        }, { status: 500 });
    }
}

// GET method 
export async function GET() {
    try {
        const query = 'SELECT * FROM users_login.courses';
        const [rows] = await promisePool.execute(query);

        return NextResponse.json({
            success: true,
            course: rows
        }, { status: 200 });
    } catch (error) {
        console.log("Error fetching courses:", error);
        return NextResponse.json({
            success: false,
            message: "Error fetching courses",
            error: error.message
        }, { status: 500 });
    }
}

// DELETE 

export async function DELETE(req) {
    try {
        // const { id } = await req.json();
        // if (!id) {
        //     return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
        // }

        const { id } = await req.json();
        if (!id || typeof id !== 'number') {
            return NextResponse.json({ success: false, message: 'Missing or invalid ID' }, { status: 400 });
        }


        const query = 'DELETE FROM users_login.courses WHERE id = ?';
        await promisePool.execute(query, [id]);

        return NextResponse.json({ success: true, message: 'Deleted successfully' }, { status: 200 });

    } catch (err) {
        console.log('the delete error is:', err)
        return NextResponse.json({
            success: false,
            message: 'Error deleting gallery item',
            error: err.message
        }, { status: 500 })
    }
}



