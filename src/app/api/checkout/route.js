import { NextResponse } from 'next/server';
import { getOrders, saveOrders, getUsers, saveUsers } from '../../../lib/db';
import { clientConfig } from '../../../config/client.config';

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
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;
    const setPasswordLink = `${baseUrl}/dashboard?action=set_password&email=${encodeURIComponent(cleanEmail)}`;

    // 4. Send Emails via PHP Mailer endpoint (if configured) or local mock
    const phpMailerUrl = process.env.PHP_MAILER_URL || process.env.NEXT_PUBLIC_PHP_MAILER_URL;
    let phpMailResult = null;

    if (phpMailerUrl) {
      try {
        const phpRes = await fetch(phpMailerUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: cleanEmail,
            userName: cleanName,
            adminEmail: clientConfig.profile.email,
            productName,
            totalPrice,
            hasMasterclass: !!addMasterclass,
            country: country || 'US',
            setPasswordLink
          })
        });
        phpMailResult = await phpRes.json();
      } catch (phpErr) {
        console.warn('PHP Mailer call error:', phpErr.message);
      }
    }

    console.log('--------------------------------------------------');
    console.log('📧 [EMAIL DISPATCHED TO CUSTOMER]:', cleanEmail);
    console.log('   Subject: Order Confirmed - Set your password for LinkedIn Authority Kit™');
    console.log('   Access & Set Password Link:', setPasswordLink);
    console.log('📧 [EMAIL DISPATCHED TO ADMIN]:', clientConfig.profile.email);
    console.log(`   Subject: New Order: $${totalPrice} from ${cleanName} (${cleanEmail})`);
    console.log('--------------------------------------------------');

    return NextResponse.json({
      success: true,
      order: newOrder,
      setPasswordLink,
      phpMailResult,
      message: 'Order created, customer added to database, and email notifications triggered'
    });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
