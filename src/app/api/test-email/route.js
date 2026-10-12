// src/app/api/test-email/route.js
// Temporary test route — delete after confirming emails work

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Tino Test" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: '✅ Test Email — Gmail SMTP Working!',
      html: `
        <div style="font-family:Arial,sans-serif;background:#0a0a0a;padding:30px;color:#f0f0f0;">
          <div style="max-width:500px;margin:0 auto;background:#111;border-radius:12px;border:1px solid #2a2a2a;padding:32px;text-align:center;">
            <div style="font-size:48px;margin-bottom:16px;">✅</div>
            <h1 style="color:#34d399;margin:0 0 12px;font-size:22px;">Gmail SMTP Working!</h1>
            <p style="color:#aaa;font-size:14px;line-height:1.6;margin:0 0 20px;">
              Tino mailer is successfully configured with Google SMTP.<br>
              Emails will now be sent directly via Gmail.
            </p>
            <div style="background:#1a1a1a;border-radius:8px;padding:16px;text-align:left;font-size:12px;color:#666;">
              <div>SMTP Host: smtp.gmail.com</div>
              <div>Port: 587 (STARTTLS)</div>
              <div>User: ${process.env.SMTP_USER}</div>
              <div>Time: ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })} PKT</div>
            </div>
          </div>
        </div>`,
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      sentTo: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
    }, { status: 500 });
  }
}
