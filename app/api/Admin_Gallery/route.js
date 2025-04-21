import { NextRequest, NextResponse } from "next/server";
import db from '../../../libs/db'
import { refType } from "@mui/utils";
// import { Rows } from "lucide-react";
// import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";
export async function POST(req) {
    try {
        const body = await req.json();
        console.log("API received body:", body);

        let { galleryImage, eventText, CreatedTime } = body;

        // Convert to MySQL datetime format
        const mysqlTime = new Date(CreatedTime).toISOString().slice(0, 19).replace('T', ' ');
        CreatedTime = mysqlTime;


        if (!galleryImage || !CreatedTime || eventText === undefined || eventText === null) {
            console.error("Missing data:", { galleryImage, eventText, CreatedTime });
            return NextResponse.json({
                success: false,
                message: 'Missing fields'
            }, { status: 400 });
        }



        const query = `INSERT INTO users_login.event_gallery (gallery_image, event_text, created_at) VALUES (?, ?, ?)`;


        const values = [galleryImage, eventText, CreatedTime];

        console.log("Query:", query);
        console.log("Values:", values);

        const [result] = await db.execute(query, values);

        return NextResponse.json({
            success: true,
            message: 'Gallery Data Added Successfully',
            GalleryID: result.insertId
        }, { status: 201 });

    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({
            success: false,
            message: 'Error adding gallery data',
            error: error.message
        }, { status: 500 });
    }
}



export async function GET() {
    try {
        const query = 'SELECT * FROM users_login.event_gallery';
        const [rows] = await db.execute(query);

        return NextResponse.json({
            success: true,
            data: rows, // fixed typo: from `mag` to `data`
        }, { status: 200 });

    } catch (error) {
        console.log('Error fetching event gallery data:', error);
        return NextResponse.json({
            success: false,
            message: "Error fetching data",
            error: error.message
        }, { status: 500 });
    }
}



// 3d64b0e9dee39ca593b9da32467663ee

// PUT Function
export async function PUT(req) {
    try {
        const { id, eventText } = await req.json();

        // Handle missing fields
        if (!id || eventText === undefined) {
            return NextResponse.json({
                success: false,
                message: 'Missing ID or eventText',
            }, { status: 400 });
        }

        // Run query only if input is valid
        const query = 'UPDATE users_login.event_gallery SET event_text = ? WHERE id = ?';
        await db.execute(query, [eventText, id]);

        return NextResponse.json({
            success: true,
            message: "Gallery Caption Updated",
        }, { status: 200 });

    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'Error Updating gallery data',
            error: err.message,
        }, { status: 500 });
    }
}





// delete api creating

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
        }

        const query = 'DELETE FROM users_login.event_gallery WHERE id = ?';
        await db.execute(query, [id]);

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



