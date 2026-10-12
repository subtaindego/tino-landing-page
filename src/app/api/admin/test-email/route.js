import { NextResponse } from 'next/server';
import { sendCustomerOrderEmail, sendAdminOrderEmail } from '../../../../lib/mailer';

// GET /api/admin/test-email
// Opens in browser to test if email is working
export async function GET(request) {
  const testPayload = {
    userName: 'Test User',
    userEmail: 'sibtey02@gmail.com',
    productName: 'LinkedIn Authority Kit™',
    totalPrice: 47,
    hasMasterclass: false,
    country: 'PK',
    setPasswordLink: 'http://localhost:3001/dashboard?action=set_password&email=test%40test.com',
  };

  const results = {};

  try {
    await sendCustomerOrderEmail(testPayload);
    results.customerEmail = '✅ Customer email sent successfully';
  } catch (err) {
    results.customerEmail = '❌ Customer email FAILED: ' + err.message;
  }

  try {
    await sendAdminOrderEmail(testPayload);
    results.adminEmail = '✅ Admin email sent successfully';
  } catch (err) {
    results.adminEmail = '❌ Admin email FAILED: ' + err.message;
  }

  const allOk = !results.customerEmail.includes('FAILED') && !results.adminEmail.includes('FAILED');

  return NextResponse.json({
    success: allOk,
    message: allOk
      ? '🎉 Both emails sent! Check sibtey02@gmail.com inbox (also check Spam folder).'
      : '⚠️ Some emails failed. Check SMTP_PASS in .env.local',
    results,
    smtpConfig: {
      host: process.env.SMTP_HOST || 'NOT SET',
      port: process.env.SMTP_PORT || 'NOT SET',
      user: process.env.SMTP_USER || 'NOT SET',
      passSet: process.env.SMTP_PASS && process.env.SMTP_PASS !== 'your_gmail_app_password_here'
        ? '✅ App Password is set'
        : '❌ App Password NOT set — still placeholder!',
    }
  }, { status: allOk ? 200 : 500 });
}
