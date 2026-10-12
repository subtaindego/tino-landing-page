// src/app/api/admin/resend-email/route.js
// Resend the set-password email to a lead who hasn't set password yet

import { NextResponse } from 'next/server';
import { sendCustomerOrderEmail } from '../../../../lib/mailer';
import { getOrders } from '../../../../lib/db';

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    // Find their most recent order for product details
    const orders = getOrders();
    const order = orders.find(o => o.email.toLowerCase() === email.toLowerCase());

    const setPasswordLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard?action=set_password&email=${encodeURIComponent(email)}`;

    await sendCustomerOrderEmail({
      userName: name || 'Member',
      userEmail: email,
      productName: order?.items || 'LinkedIn Authority Kit™',
      totalPrice: order?.totalPrice || 47,
      hasMasterclass: order?.hasMasterclass || false,
      country: order?.country || 'US',
      setPasswordLink,
    });

    console.log(`📧 Resent set-password email to: ${email}`);

    return NextResponse.json({ success: true, message: `Email resent to ${email}` });
  } catch (error) {
    console.error('Resend email error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
