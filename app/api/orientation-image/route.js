import db from '@/libs/db';
import { NextResponse } from 'next/server';

// GET Method: Fetch all Orientation Program images
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM orientation_images ORDER BY uploaded_at DESC');
    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching image data.',
      error: error.message,
    }, { status: 500 });
  }
}

// POST Method: Save Orientation Program image with title
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
      `INSERT INTO orientation_images (image_url, title) VALUES (?, ?)`,
      [imageUrl, title.trim()]
    );

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully.',
    }, { status: 200 });
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error saving image.',
      error: error.message,
    }, { status: 500 });
  }
}

// DELETE Method: Remove an image by ID
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

    await db.execute(`DELETE FROM orientation_images WHERE id = ?`, [id]);

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully.',
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({
      success: false,
      message: 'Error deleting image.',
      error: error.message,
    }, { status: 500 });
  }
}
