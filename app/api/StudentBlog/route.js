import db from '@/libs/db';
import { NextResponse } from 'next/server';

// POST Method: Save published blog
export async function POST(req) {
    try {
        const body = await req.json();
        const { title, note, category, featuredImage, blogContent, email } = body;

        if (!title || !blogContent) {
            return NextResponse.json({
                success: false,
                message: 'Title and blog content are required.'
            }, { status: 400 });
        }

        await db.execute(
            `INSERT INTO  student_published_blogs (title, note, category, featuredImage, blogContent, email)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, note, category, featuredImage, blogContent,email]
        );

        return NextResponse.json({
            success: true,
            message: 'Blog published successfully.'
        });

    } catch (error) {
        console.error('Error publishing blog:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error publishing blog.',
            error: error.message
        }, { status: 500 });
    }
}

// Get method 
export async function GET() {
    try {
        const query = 'SELECT * FROM users_login.student_published_blogs';
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

