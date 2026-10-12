// src/app/api/auth/status/route.js
// Verify if an email has purchased/exists in the database, and check their password status

import { NextResponse } from 'next/server';
import { getUsers, getOrders } from '../../../../lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email parameter required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const orders = getOrders();

    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    const order = orders.find(o => o.email.toLowerCase() === cleanEmail);

    // If neither user nor order exists in admin database
    if (!user && !order) {
      return NextResponse.json({
        success: false,
        exists: false,
        error: 'No order or account found for this email address. Please make sure you are using the same email you entered at checkout.'
      }, { status: 404 });
    }

    if (user && user.isBlocked) {
      return NextResponse.json({
        success: false,
        exists: true,
        isBlocked: true,
        error: 'Your dashboard access has been suspended by the administrator.'
      }, { status: 403 });
    }

    const hasPasswordSet = Boolean(user && user.hasPasswordSet && user.password);

    return NextResponse.json({
      success: true,
      exists: true,
      email: cleanEmail,
      name: user?.name || order?.name || 'Member',
      hasPasswordSet,
      needPasswordSetup: !hasPasswordSet
    });
  } catch (error) {
    console.error('Auth status check error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
