import { NextResponse } from 'next/server';
import { getOrders, saveOrders, getUsers, saveUsers } from '../../../lib/db';
import { clientConfig } from '../../../config/client.config';
import { sendCustomerOrderEmail, sendAdminOrderEmail } from '../../../lib/mailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, country, addMasterclass, paymentMethod } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (name || 'Member').trim();

    // Calculate totals
    const basePrice = clientConfig.product.isLaunchActive 
      ? clientConfig.product.launchPrice 
      : clientConfig.product.regularPrice;
    const bumpPrice = 49;
    const totalPrice = addMasterclass ? basePrice + bumpPrice : basePrice;
    const productName = clientConfig.product.name;

    // 1. Save or Update User in database
    const users = getUsers();
    let existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!existingUser) {
      existingUser = {
        id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        email: cleanEmail,
        name: cleanName,
        password: '',
        hasPasswordSet: false,
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      users.unshift(existingUser);
      saveUsers(users);
    }

    // 2. Save Order in database
    const orders = getOrders();
    const newOrder = {
      id: 'ord_' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      country: country || 'US',
      items: productName + (addMasterclass ? ' + Implementation Masterclass' : ''),
      totalPrice,
      hasMasterclass: !!addMasterclass,
      paymentMethod: paymentMethod || 'card',
      status: 'paid',
      createdAt: new Date().toISOString()
    };
    orders.unshift(newOrder);
    saveOrders(orders);

    // 3. Construct Set Password Link
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('3001'))
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `${protocol}://${host}`;
    const setPasswordLink = `${baseUrl}/dashboard?action=set_password&email=${encodeURIComponent(cleanEmail)}`;

    // 4. Send Emails via Nodemailer
    const emailPayload = {
      userName: cleanName,
      userEmail: cleanEmail,
      productName,
      totalPrice,
      hasMasterclass: !!addMasterclass,
      country: country || 'US',
      setPasswordLink,
    };

    let emailResults = { customer: null, admin: null };

    try {
      await sendCustomerOrderEmail(emailPayload);
      emailResults.customer = 'sent';
      console.log('📧 Customer email sent to:', cleanEmail);
    } catch (emailErr) {
      emailResults.customer = 'failed: ' + emailErr.message;
      console.warn('⚠️ Customer email failed:', emailErr.message);
    }

    try {
      await sendAdminOrderEmail(emailPayload);
      emailResults.admin = 'sent';
      console.log('📧 Admin email sent to:', process.env.ADMIN_EMAIL || 'sibtey02@gmail.com');
    } catch (emailErr) {
      emailResults.admin = 'failed: ' + emailErr.message;
      console.warn('⚠️ Admin email failed:', emailErr.message);
    }

    console.log('--------------------------------------------------');
    console.log('📧 [ORDER PROCESSED]:', cleanEmail);
    console.log('   Set Password Link:', setPasswordLink);
    console.log('   Email Results:', emailResults);
    console.log('--------------------------------------------------');

    return NextResponse.json({
      success: true,
      order: newOrder,
      setPasswordLink,
      emailResults,
      message: 'Order created, user saved, and email notifications sent'
    });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
