import db from '@/libs/db';
import { NextResponse } from 'next/server';

// POST Method: Save a new job circular
export async function POST(req) {
    try {
        const body = await req.json();
        const { title, category, company, email, location, description, responsibilities, requirements, benefits, logo } = body;

        // Basic validation
        if (!title || !category || !company || !email) {
            return NextResponse.json({
                success: false,
                message: 'Title, category, company, and email are required.'
            }, { status: 400 });
        }

        await db.execute(
            `INSERT INTO job_circulars 
            (title, category, company, email, location, description, responsibilities, requirements, benefits, logo) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, category, company, email, location, description, responsibilities, requirements, benefits, logo || null]
        );

        return NextResponse.json({
            success: true,
            message: 'Job circular posted successfully.'
        }, { status: 200 });

    } catch (error) {
        console.error('Error posting job circular:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error posting job circular.',
            error: error.message
        }, { status: 500 });
    }
}

// GET Method: Fetch all job circulars
export async function GET() {
    try {
        const [rows] = await db.execute('SELECT * FROM job_circulars ORDER BY created_at DESC');
        return NextResponse.json({
            success: true,
            data: rows,
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching job circulars:', error);
        return NextResponse.json({
            success: false,
            message: 'Error fetching job circular data.',
            error: error.message
        }, { status: 500 });
    }
}

// PUT Method: Update a job circular by id
export async function PUT(req) {
  try {
    // Parse JSON explicitly
    const body = await req.json();
    console.log("PUT body:", body);

    const { id, title, category, company, email, location, description, responsibilities, requirements, benefits, logo } = body;

    if (!id) return NextResponse.json({ success: false, message: 'Job ID is required for update.' }, { status: 400 });

    // Make sure all required fields exist
    const [result] = await db.execute(
      `UPDATE job_circulars
       SET title = ?, category = ?, company = ?, email = ?, location = ?, description = ?, responsibilities = ?, requirements = ?, benefits = ?, logo = ?
       WHERE id = ?`,
      [title, category, company, email, location, description, responsibilities, requirements, benefits, logo || null, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, message: 'No job found with this ID.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Job circular updated successfully.' });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ success: false, message: 'Server error', error: error.message }, { status: 500 });
  }
}


// DELETE Method: Delete a job circular by id
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Job ID is required for deletion." },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      `DELETE FROM job_circulars WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "No job found with this ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Job deleted successfully." });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}


