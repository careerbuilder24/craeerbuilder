import bcrypt from 'bcryptjs';
import { getUserByEmail } from '../../../libs/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log(`Login attempt for email: ${email}`);

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 400 });
    }

    // Return the user data (including the user's name and photo) upon successful login
    return NextResponse.json({
      success: true,
      message: 'Login successful!',
      user: {
        name: user.name, // Assuming the name column in the database is 'name'
        email: user.email,
        photoURL: user.photo || '' // Use the 'photo' column from the database
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}