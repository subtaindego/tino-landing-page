import { NextResponse } from 'next/server';
import { getUsers, saveUsers } from '../../../../lib/db';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail);

    if (userIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'No order or account found for this email address. Please make sure you are using the same email you entered at checkout.'
      }, { status: 404 });
    }

    if (users[userIndex].isBlocked) {
      return NextResponse.json({
        success: false,
        error: 'Access suspended: Your account access has been blocked by the admin.'
      }, { status: 403 });
    }

    // Update password
    users[userIndex].password = password;
    users[userIndex].hasPasswordSet = true;
    users[userIndex].passwordUpdatedAt = new Date().toISOString();
    saveUsers(users);

    return NextResponse.json({
      success: true,
      message: 'Password set successfully! You are now authorized to log into your dashboard.',
      user: {
        email: users[userIndex].email,
        name: users[userIndex].name,
        role: users[userIndex].role
      }
    });
  } catch (error) {
    console.error('Set password error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
