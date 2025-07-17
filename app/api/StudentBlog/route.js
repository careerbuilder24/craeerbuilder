import db from '@/libs/db';
import { NextResponse } from 'next/server';

// POST Method: Save published blog
export async function POST(req) {
    try {
        const body = await req.json();
        const { title, note, category, featuredImage, blogContent } = body;

        if (!title || !blogContent) {
            return NextResponse.json({
                success: false,
                message: 'Title and blog content are required.'
            }, { status: 400 });
        }

        await db.execute(
            `INSERT INTO  student_published_blogs (title, note, category, featuredImage, blogContent)
             VALUES (?, ?, ?, ?, ?)`,
            [title, note, category, featuredImage, blogContent]
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
