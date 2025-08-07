import db from '@/libs/db';
import { NextResponse } from 'next/server';

// POST Method: Save published blog
export async function POST(req) {
    try {
        const body = await req.json();
        const { title, note, category, featuredImage, blogContent, email } = body;

        // Basic validation
        if (!title || !blogContent) {
            return NextResponse.json({
                success: false,
                message: 'Title and blog content are required.'
            }, { status: 400 });
        }

        // Optional: validate image URL
        if (featuredImage && typeof featuredImage !== 'string') {
            return NextResponse.json({
                success: false,
                message: 'Invalid image URL format.'
            }, { status: 400 });
        }

        await db.execute(
            `INSERT INTO student_published_blogs 
            (title, note, category, featuredImage, blogContent, email)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [title, note, category, featuredImage, blogContent, email]
        );

        return NextResponse.json({
            success: true,
            message: 'Blog published successfully.'
        }, { status: 200 });

    } catch (error) {
        console.error('Error publishing blog:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error publishing blog.',
            error: error.message
        }, { status: 500 });
    }
}

// GET Method: Fetch all published blogs
export async function GET() {
    try {
        const [rows] = await db.execute('SELECT * FROM users_login.student_published_blogs');
        return NextResponse.json({
            success: true,
            data: rows,
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({
            success: false,
            message: 'Error fetching blog data.',
            error: error.message
        }, { status: 500 });
    }
}

