// File: src/app/api/eidulfitre/route.js

import db from '@/libs/db';
import { NextResponse } from 'next/server';

// GET - Fetch all Eid Ul Fitre images
export async function GET() {
    try {
        const [rows] = await db.execute(`SELECT * FROM eidulfitre_images ORDER BY id DESC`);
        return NextResponse.json({
            success: true,
            data: rows
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching Eid Ul Fitre images:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error fetching Eid Ul Fitre images.',
            error: error.message
        }, { status: 500 });
    }
}

// POST - Add new Eid Ul Fitre image
export async function POST(req) {
    try {
        const body = await req.json();
        const { imageUrl, title } = body;

        if (!imageUrl || typeof imageUrl !== 'string') {
            return NextResponse.json({
                success: false,
                message: 'Valid image URL is required.'
            }, { status: 400 });
        }

        if (!title || typeof title !== 'string' || !title.trim()) {
            return NextResponse.json({
                success: false,
                message: 'Valid image title is required.'
            }, { status: 400 });
        }

        await db.execute(
            `INSERT INTO eidulfitre_images (image_url, title) VALUES (?, ?)`,
            [imageUrl, title.trim()]
        );

        return NextResponse.json({
            success: true,
            message: 'Eid Ul Fitre image uploaded successfully.'
        }, { status: 200 });

    } catch (error) {
        console.error('Error saving Eid Ul Fitre image:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error saving Eid Ul Fitre image.',
            error: error.message
        }, { status: 500 });
    }
}

// DELETE - Remove Eid Ul Fitre image
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'Image ID is required.'
            }, { status: 400 });
        }

        await db.execute(`DELETE FROM eidulfitre_images WHERE id = ?`, [id]);

        return NextResponse.json({
            success: true,
            message: 'Eid Ul Fitre image deleted successfully.'
        }, { status: 200 });

    } catch (error) {
        console.error('Error deleting Eid Ul Fitre image:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error deleting Eid Ul Fitre image.',
            error: error.message
        }, { status: 500 });
    }
}
