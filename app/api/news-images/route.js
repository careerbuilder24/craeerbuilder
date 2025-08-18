import db from '@/libs/db';
import { NextResponse } from 'next/server';

// GET all news images
export async function GET() {
  try {
    const [rows] = await db.execute(`SELECT * FROM news_images ORDER BY id DESC`);
    return NextResponse.json({
      success: true,
      data: rows
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching News images:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error fetching images.',
      error: error.message
    }, { status: 500 });
  }
}

// POST new image
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
      `INSERT INTO news_images (image_url, title) VALUES (?, ?)`,
      [imageUrl, title.trim()]
    );

    return NextResponse.json({
      success: true,
      message: 'News image uploaded successfully.'
    }, { status: 200 });

  } catch (error) {
    console.error('Error saving News image:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error saving image.',
      error: error.message
    }, { status: 500 });
  }
}

// DELETE image
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

    await db.execute(`DELETE FROM news_images WHERE id = ?`, [id]);

    return NextResponse.json({
      success: true,
      message: 'News image deleted successfully.'
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting News image:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error deleting image.',
      error: error.message
    }, { status: 500 });
  }
}
