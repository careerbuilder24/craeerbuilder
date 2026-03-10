// import { NextResponse } from 'next/server';
// import db from '@/libs/db'; // adjust path to your DB connection

// // GET - fetch all videos for a user
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get('email');

//     if (!email) {
//       return NextResponse.json({ message: 'Email is required' }, { status: 400 });
//     }

//     const [videos] = await db.execute(
//       'SELECT youtube_url FROM user_videos WHERE email = ? ORDER BY id DESC',
//       [email]
//     );

//     return NextResponse.json({ videos: videos.map((v) => v.youtube_url) });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: 'Database error' }, { status: 500 });
//   }
// }

// // POST - upload a new video
// export async function POST(req) {
//   try {
//     const { email, youtube_url } = await req.json();

//     if (!email || !youtube_url) {
//       return NextResponse.json({ message: 'Email and URL are required' }, { status: 400 });
//     }

//     // Check if video already exists
//     const [existing] = await db.execute(
//       'SELECT id FROM user_videos WHERE email = ? AND youtube_url = ?',
//       [email, youtube_url]
//     );

//     if (existing.length > 0) {
//       return NextResponse.json({ message: 'Video already uploaded' }, { status: 409 });
//     }

//     // Insert video
//     await db.execute(
//       'INSERT INTO user_videos (email, youtube_url) VALUES (?, ?)',
//       [email, youtube_url]
//     );

//     return NextResponse.json({ message: 'Video uploaded successfully' });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: 'Database error' }, { status: 500 });
//   }
// }

// // DELETE - remove a video
// export async function DELETE(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get('email');
//     const youtube_url = searchParams.get('youtube_url');

//     if (!email || !youtube_url) {
//       return NextResponse.json({ message: 'Email and URL are required' }, { status: 400 });
//     }

//     await db.execute('DELETE FROM user_videos WHERE email = ? AND youtube_url = ?', [
//       email,
//       youtube_url,
//     ]);

//     return NextResponse.json({ message: 'Video deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: 'Database error' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import db from '@/libs/db';

// GET - fetch all videos or by user email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    let videos;
    if (email) {
      const [rows] = await db.execute(
        'SELECT youtube_url FROM user_videos WHERE email = ? ORDER BY id DESC',
        [email]
      );
      videos = rows;
    } else {
      const [rows] = await db.execute(
        'SELECT email, youtube_url FROM user_videos ORDER BY id DESC'
      );
      videos = rows;
    }

    return NextResponse.json({
      videos: videos.map((v) => ({
        email: v.email ?? email,
        youtube_url: v.youtube_url,
      })),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Database error' }, { status: 500 });
  }
}

// POST - upload a new video
export async function POST(req) {
  try {
    const { email, youtube_url } = await req.json();
    if (!email || !youtube_url) {
      return NextResponse.json(
        { message: 'Email and URL are required' },
        { status: 400 }
      );
    }

    const [existing] = await db.execute(
      'SELECT id FROM user_videos WHERE email = ? AND youtube_url = ?',
      [email, youtube_url]
    );
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Video already uploaded' }, { status: 409 });
    }

    await db.execute(
      'INSERT INTO user_videos (email, youtube_url) VALUES (?, ?)',
      [email, youtube_url]
    );

    return NextResponse.json({ message: 'Video uploaded successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Database error' }, { status: 500 });
  }
}

// DELETE - remove a video
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const youtube_url = searchParams.get('youtube_url');

    if (!email || !youtube_url) {
      return NextResponse.json(
        { message: 'Email and URL are required' },
        { status: 400 }
      );
    }

    await db.execute(
      'DELETE FROM user_videos WHERE email = ? AND youtube_url = ?',
      [email, youtube_url]
    );

    return NextResponse.json({ message: 'Video deleted successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Database error' }, { status: 500 });
  }
}
