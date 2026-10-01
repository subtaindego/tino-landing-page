import { NextResponse } from 'next/server';
import { getOrders, saveOrders, getUsers, saveUsers } from '../../../../lib/db';

export async function GET(request) {
  try {
    const orders = getOrders();
    const users = getUsers();

    const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.totalPrice) || 0), 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalUsers
      },
      orders,
      users
    });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email, allowAccessOnly } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (name || 'VIP Client').trim();

    const users = getUsers();
    let existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'This email is already registered in the database.'
      }, { status: 400 });
    }

    // Add user
    const newUser = {
      id: 'usr_admin_' + Date.now(),
      email: cleanEmail,
      name: cleanName,
      password: '',
      hasPasswordSet: false,
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    users.unshift(newUser);
    saveUsers(users);

    if (!allowAccessOnly) {
      // Also record order
      const orders = getOrders();
      orders.unshift({
        id: 'ord_manual_' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        country: 'Manual Admin Grant',
        items: 'LinkedIn Authority Kit™ (Admin Granted)',
        totalPrice: 47,
        hasMasterclass: true,
        paymentMethod: 'manual_grant',
        status: 'paid',
        createdAt: new Date().toISOString()
      });
      saveOrders(orders);
    }

    return NextResponse.json({
      success: true,
      message: `Access granted for ${cleanEmail}!`,
      user: newUser
    });
  } catch (error) {
    console.error('Admin add error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const emailToDelete = searchParams.get('email');

    if (!emailToDelete) {
      return NextResponse.json({ success: false, error: 'Email parameter required' }, { status: 400 });
    }

    const cleanEmail = emailToDelete.trim().toLowerCase();
    const users = getUsers().filter(u => u.email.toLowerCase() !== cleanEmail);
    saveUsers(users);

    return NextResponse.json({
      success: true,
      message: `User ${cleanEmail} access removed`
    });
  } catch (error) {
    console.error('Admin delete error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
