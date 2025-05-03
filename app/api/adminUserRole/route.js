import pool from '@/libs/db';

// Named export for GET request
export async function GET(req) {
    console.log('API route accessed for adminUserRole.');

    if (req.method !== 'GET') {
        return new Response(
            JSON.stringify({ error: `Method ${req.method} not allowed` }),
            { status: 405 }
        );
    }

    try {
        console.log('Fetching users with admin role...');
        const [rows] = await pool.execute(
            'SELECT email, role FROM users_login.user_managements WHERE role = ?',
            ['Admin']
        );

        console.log('Fetched rows:', rows);

        // Return the result as a JSON response
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
