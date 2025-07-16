import { NextResponse } from 'next/server';
import db from '@/libs/db';

export async function POST(req) {
    try {
        const body = await req.json();
        const { images } = body;

        if (!Array.isArray(images) || images.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No images received.',
            }, { status: 400 });
        }

        try {
            for (const image of images) {
                const { email, imageUrl } = image;

                if (!email || !imageUrl) {
                    continue;  // Skip incomplete items
                }

                await db.execute(
                    'INSERT INTO images (email, image_url) VALUES (?, ?)',
                    [email, imageUrl]
                );
            }

            return NextResponse.json({
                success: true,
                message: 'Images with emails saved successfully!',
            });

        } catch (error) {
            console.error('Database error:', error);
            return NextResponse.json({
                success: false,
                message: 'Database error.',
                error: error.message
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error.',
            error: error.message
        }, { status: 500 });
    }
}
// Get method 
export async function GET() {
    try {
        const query = 'SELECT * FROM users_login.images';
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
