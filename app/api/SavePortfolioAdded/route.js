// app/api/portfolio/route.js
import { NextResponse } from 'next/server';
import db from '@/libs/db'; // use @ if configured, or adjust path accordingly

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      portfolioTitle,
      webPortfolioLink,
      imageUrl,
      category,
      description,
      date,
    } = body;

    if (
      !portfolioTitle ||
      !webPortfolioLink ||
      !imageUrl ||
      !category ||
      !description ||
      !date
    ) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      `INSERT INTO users_login.studentportfolioadd 
      (portfolioTitle, webPortfolioLink, file, category, description, date) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [portfolioTitle, webPortfolioLink, imageUrl, category, description, date]
    );

    return NextResponse.json(
      { success: true, postId: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json(
      { success: false, message: 'Database error', error: error.message },
      { status: 500 }
    );
  }
}

// Get method 
export async function GET() {
    try {
        const query = 'SELECT * FROM users_login.studentportfolioadd';
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

