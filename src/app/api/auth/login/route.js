import { NextResponse } from 'next/server';
import { getUsers } from '../../../../lib/db';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    // Security check: Only emails in database are allowed
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Access denied: No active purchase found for this email. Only verified buyers can log into the member portal.'
      }, { status: 403 });
    }

    // Check if user access is blocked by admin
    if (user.isBlocked) {
      return NextResponse.json({
        success: false,
        error: 'Access suspended: Your dashboard access has been blocked by the admin. Please contact support.'
      }, { status: 403 });
    }

    // Check if password has been set
    if (!user.hasPasswordSet || !user.password) {
      return NextResponse.json({
        success: false,
        needPasswordSetup: true,
        error: 'You have not set your password yet. Please set your password to enter.'
      }, { status: 400 });
    }

    // Verify password
    if (user.password !== password) {
      return NextResponse.json({
        success: false,
        error: 'Invalid password. Please check your credentials.'
      }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
