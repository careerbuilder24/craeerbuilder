// app/api/Students_Blog_comments/route.js
import db from '@/libs/db';
import { NextResponse } from 'next/server';

// POST Method: Save a new comment
export async function POST(req) {
    try {
        const body = await req.json();
        const { user, email, text, blogId } = body; // include email

        // Basic validation
        if (!user || !text || !email) {
            return NextResponse.json(
                { success: false, message: 'User, email, and comment text are required.' },
                { status: 400 }
            );
        }

        await db.execute(
            `INSERT INTO student_blog_comments (user, email, text, blogId) VALUES (?, ?, ?, ?)`,
            [user, email, text, blogId || null]
        );

        return NextResponse.json(
            { success: true, message: 'Comment added successfully.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error adding comment:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Server error adding comment.',
                error: error.message
            },
            { status: 500 }
        );
    }
}

// GET Method: Fetch all comments
export async function GET() {
    try {
        const [rows] = await db.execute('SELECT * FROM student_blog_comments ORDER BY id DESC');

        return NextResponse.json(
            { success: true, data: rows },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Error fetching comments.',
                error: error.message
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const email = searchParams.get('email'); // pass user email

        if (!id || !email) {
            return NextResponse.json(
                { success: false, message: 'Comment ID and email are required.' },
                { status: 400 }
            );
        }

        // delete only if same email
        const [result] = await db.execute(
            'DELETE FROM student_blog_comments WHERE id = ? AND email = ?',
            [id, email]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, message: 'Not authorized to delete this comment.' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Comment deleted successfully.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting comment:', error);
        return NextResponse.json(
            { success: false, message: 'Error deleting comment.', error: error.message },
            { status: 500 }
        );
    }
}
