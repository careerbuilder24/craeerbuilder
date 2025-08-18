import db from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.execute(`SELECT * FROM pohela_boishakh_images ORDER BY id DESC`);
    return NextResponse.json({
      success: true,
      data: rows
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Pohela Boishakh images:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error fetching images.',
      error: error.message
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
      `INSERT INTO pohela_boishakh_images (image_url, title) VALUES (?, ?)`,
      [imageUrl, title.trim()]
    );

    return NextResponse.json({
      success: true,
      message: 'Pohela Boishakh image uploaded successfully.'
    }, { status: 200 });

  } catch (error) {
    console.error('Error saving Pohela Boishakh image:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error saving image.',
      error: error.message
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
        message: 'Image ID is required.'
      }, { status: 400 });
    }

    await db.execute(`DELETE FROM pohela_boishakh_images WHERE id = ?`, [id]);

    return NextResponse.json({
      success: true,
      message: 'Pohela Boishakh image deleted successfully.'
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting Pohela Boishakh image:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error deleting image.',
      error: error.message
    }, { status: 500 });
  }
}
