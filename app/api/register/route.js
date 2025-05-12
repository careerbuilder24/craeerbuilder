import promisePool from '../../../libs/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users_login.user_managements (name, email, password, created_at) VALUES (?, ?, ?, NOW())';
        const values = [name, email, hashedPassword];

        // Insert user into the database
        const [result] = await promisePool.execute(query, values);

        return NextResponse.json({ success: true, message: "User registered successfully!", userId: result.insertId });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ success: false, message: "Error registering user" }, { status: 500 });
    }
}


export async function GET() {

    try {
        const query = 'SELECT * FROM users_login.user_managements';
        const [row] = await promisePool.execute(query);
        return NextResponse.json({
            success: true,
            data: row,
        }, { status: 200 })
    } catch (error) {
        console.error("error of getting data");
        return NextResponse.json({
            success: false,
            message: "Error of fetching data",
            error: error.message
        }, { status: 500 })
    }
}