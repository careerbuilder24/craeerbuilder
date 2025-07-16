import db from '@/libs/db';
import { NextResponse } from 'next/server';

// POST Method: Save uploaded certificate data
export async function POST(req) {
    try {
        const body = await req.json();
        const { images } = body;  // Expect array of images with text, date, imageUrl

        if (!Array.isArray(images) || images.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No images provided',
            }, { status: 400 });
        }

        for (const image of images) {
            const { text, date, email, imageUrl } = image;

            if (!text || !date || !email || !imageUrl) {
                continue;  // Skip incomplete image entries
            }

            await db.execute(
                `INSERT INTO users_login.certificates (title, date,email,imageUrl) VALUES (?, ?, ?, ?)`,
                [text, date, email, imageUrl]
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Certificates saved successfully',
        });

    } catch (error) {
        console.error('Error saving certificates:', error);
        return NextResponse.json({
            success: false,
            message: 'Server Error',
            error: error.message
        }, { status: 500 });
    }
}

// GET Method: Retrieve stored certificates
export async function GET() {
    try {
        const [rows] = await db.execute('SELECT * FROM users_login.certificates ORDER BY id DESC');

        return NextResponse.json({
            success: true,
            data: rows,
        });

    } catch (error) {
        console.error('Error fetching certificates:', error);

        return NextResponse.json({
            success: false,
            message: 'Error fetching certificates',
            error: error.message,
        }, { status: 500 });
    }
}
