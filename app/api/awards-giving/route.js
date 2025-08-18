import db from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.execute(`SELECT * FROM awards_giving_images ORDER BY id DESC`);
    return NextResponse.json({
      success: true,
      data: rows,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching awards giving images:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error fetching awards giving images.',
      error: error.message,
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { imageUrl, title } = body;

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json({
        success: false,
        message: 'Valid image URL is required.',
      }, { status: 400 });
    }

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({
        success: false,
        message: 'Valid image title is required.',
      }, { status: 400 });
    }

    await db.execute(
      `INSERT INTO awards_giving_images (image_url, title) VALUES (?, ?)`,
      [imageUrl, title.trim()]
    );

    return NextResponse.json({
      success: true,
      message: 'Awards giving image uploaded successfully.',
    }, { status: 200 });

  } catch (error) {
    console.error('Error saving awards giving image:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error saving awards giving image.',
      error: error.message,
    }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Image ID is required.',
      }, { status: 400 });
    }

    await db.execute(`DELETE FROM awards_giving_images WHERE id = ?`, [id]);

    return NextResponse.json({
      success: true,
      message: 'Awards giving image deleted successfully.',
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting awards giving image:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error deleting awards giving image.',
      error: error.message,
    }, { status: 500 });
  }
}
