import { NextResponse } from "next/server";
import db from '../../../libs/db'
import { Rows } from "lucide-react";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            title,
            note,
            category,
            content,
            featuredImage,
            socialLinks

        } = body;

        if (!title || !note || !category || !content || !featuredImage || !socialLinks) {
            return NextResponse.json({
                success: false,
                message: 'All fields (title, note, category, content, featuredImage, socialLinks) are required'
            }, { status: 400 });
        }

        // convert socialLinks JSON to string for DB
        const socialLinksString = JSON.stringify(socialLinks)

        const created_at = new Date();

        const [result] = await db.execute(
            `INSERT INTO users_login.blog_added (title, note, category, content, featuredImage, socialLinks, created_at) VALUES(?, ?, ?, ?, ?, ?, ?)`,
            [title, note, category, content, featuredImage, socialLinksString, created_at]
        );

        return NextResponse.json({
            success: true,
            message: 'Post created successfully',
            postId: result.insertId
        });

    } catch (error) {
        console.error('error post!', error);
        return NextResponse.json({
            success: false,
            message: 'server error',
            error: error.message
        }, { status: 500 });
    }
}


// GET function

export async function GET() {
    try {
        const query = 'SELECT * FROM  users_login.blog_added';
        const [row] = await db.execute(query);
        return NextResponse.json({
            success: true,
            data: row,
        }, { status: 200 })
    } catch (error) {
        console.error('error of getting data', error)
        return NextResponse.json({
            success: false,
            message: 'Error fetching data',
            error: error.message
        }, { status: 500 })
    }
}


// DELETE 

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
        }

        const query = 'DELETE FROM users_login.blog_added WHERE id = ?';
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




//   put function 

export async function PUT(req) {
    try {

        const body = await req.json();

        const { id, title, note, category, content, featuredImage, socialLinks } = body;

        // title, note, category, content, featuredImage, socialLinks, created_at
        if (!id || !title || !note || !category || !content || !featuredImage || !socialLinks) {
            return NextResponse.json({
                success: false,
                message: 'missing ID or field value'
            }, { status: 400 })
        }

        const query = 'UPDATE users_login.blog_added SET title = ?, note =?, category = ?, content = ?, featuredImage = ?, socialLinks = ?  WHERE id = ? '

        await db.execute(query, [title, note, category, content, featuredImage, socialLinks, id]);
        return NextResponse.json({
            success: true,
            message: 'Gallery caption updated'
        }, { status: 200 });

    } catch (error) {
        console.error("Error coming ", error)

        NextResponse.json({
            success: false,
            message: "Error for updating data post",
            error: error.message,
        }, { status: 500 })
    }
}








