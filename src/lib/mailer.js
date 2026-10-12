// src/lib/mailer.js
// Gmail SMTP via Nodemailer
// Env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL

import nodemailer from 'nodemailer';

// ─── Transporter ─────────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ─── Design Tokens (matching globals.css exactly) ─────────────────────────────
const C = {
  bg:            '#0b0d19',
  surface:       '#0e101f',
  surfaceCard:   '#111420',
  border:        'rgba(237,238,238,0.08)',
  borderMint:    'rgba(81,248,170,0.25)',
  textPrimary:   '#edeeee',
  textSecondary: '#9ca3af',
  accent:        '#51f8aa',
  accentDark:    '#0b1611',
  accentGlow:    'rgba(81,248,170,0.18)',
  star:          '#ffb800',
  red:           '#ef4444',
  redDark:       '#1a0808',
  green:         '#22c55e',
  greenDark:     '#0a1a0e',
};

// ─── Shared Layout Wrappers ───────────────────────────────────────────────────
const emailWrapper = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tino</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background:${C.bg};font-family:'Inter',system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer background -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card Container: max 600px -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:${C.surfaceCard};border-radius:16px;border:1px solid ${C.border};overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.6),0 0 1px rgba(237,238,238,0.06);">
          ${content}
        </table>

        <!-- Footer note -->
        <p style="margin:24px 0 0;font-size:12px;color:#3a3d52;text-align:center;">
          © ${new Date().getFullYear()} Tino · LinkedIn Authority Kit™ · All rights reserved
        </p>

      </td>
    </tr>
  </table>
</body>
</html>`;

// Mint gradient header band
const headerBand = (icon, title, subtitle) => `
<tr>
  <td style="background:linear-gradient(135deg,#0d1e18 0%,#0b1812 100%);border-bottom:1px solid ${C.borderMint};padding:36px 40px 32px;text-align:center;position:relative;">
    <!-- Mint glow blob -->
    <div style="font-size:40px;line-height:1;margin-bottom:16px;">${icon}</div>
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;letter-spacing:-0.5px;color:${C.textPrimary};line-height:1.2;">${title}</h1>
    ${subtitle ? `<p style="margin:0;font-size:15px;color:${C.textSecondary};line-height:1.5;">${subtitle}</p>` : ''}
    <!-- Mint pill badge -->
    <div style="display:inline-block;margin-top:16px;padding:5px 16px;border-radius:9999px;border:1px solid rgba(81,248,170,0.3);background:rgba(81,248,170,0.08);font-size:12px;font-weight:600;color:${C.accent};letter-spacing:0.06em;text-transform:uppercase;">
      LinkedIn Authority Kit™
    </div>
  </td>
</tr>`;

// Mint CTA button
const ctaButton = (href, text) => `
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center" style="padding:8px 0 4px;">
      <a href="${href}" target="_blank"
         style="display:inline-block;background:linear-gradient(90deg,#51f8aa 0%,#b8f8b8 100%);color:#0b1611;text-decoration:none;padding:14px 36px;border-radius:9999px;font-size:15px;font-weight:700;letter-spacing:0.01em;box-shadow:0 4px 20px rgba(81,248,170,0.35);">
        ${text}
      </a>
    </td>
  </tr>
</table>`;

// Divider
const divider = `
<tr>
  <td style="padding:0 40px;">
    <div style="height:1px;background:${C.border};"></div>
  </td>
</tr>`;

// Info row (label + value)
const infoRow = (label, value, valueColor = C.textPrimary) => `
<tr>
  <td style="padding:10px 0;font-size:14px;color:${C.textSecondary};width:40%;">${label}</td>
  <td style="padding:10px 0;font-size:14px;color:${valueColor};font-weight:600;text-align:right;">${value}</td>
</tr>`;


// ─── 1. Customer Order Confirmation ──────────────────────────────────────────
export async function sendCustomerOrderEmail({
  userName, userEmail, productName, totalPrice,
  hasMasterclass, country, setPasswordLink,
}) {
  const transporter = createTransporter();
  const basePrice = hasMasterclass ? totalPrice - 49 : totalPrice;

  const body = `
    ${headerBand('🎉', `Welcome aboard, ${userName}!`, 'Your order has been confirmed and your access is ready.')}

    <!-- Body -->
    <tr>
      <td style="padding:36px 40px 20px;">

        <!-- Greeting -->
        <p style="margin:0 0 24px;font-size:15px;color:${C.textSecondary};line-height:1.7;">
          Thank you for purchasing the <strong style="color:${C.textPrimary};">${productName}</strong>. You now have everything you need to build a top 1% LinkedIn authority presence — starting today.
        </p>

        <!-- Order Summary Card -->
        <div style="background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:24px;margin-bottom:24px;">
          <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.accent};">Order Summary</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            ${infoRow(productName, `$${basePrice}`)}
            ${hasMasterclass ? infoRow('Implementation Masterclass', '$49') : ''}
            <tr><td colspan="2" style="padding:8px 0;"><div style="height:1px;background:${C.border};"></div></td></tr>
            <tr>
              <td style="padding:10px 0;font-size:16px;font-weight:700;color:${C.textPrimary};">Total Paid</td>
              <td style="padding:10px 0;font-size:20px;font-weight:800;color:${C.accent};text-align:right;">$${totalPrice}</td>
            </tr>
          </table>
        </div>

        <!-- Set Password CTA Block -->
        <div style="background:linear-gradient(135deg,#0d1e18 0%,#0b1611 100%);border:1px solid ${C.borderMint};border-radius:12px;padding:28px;margin-bottom:24px;text-align:center;">
          <p style="margin:0 0 6px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.accent};">Next Step</p>
          <p style="margin:0 0 20px;font-size:15px;color:${C.textSecondary};line-height:1.6;">
            Set your password to unlock your member dashboard and access all templates instantly.
          </p>
          ${ctaButton(setPasswordLink, 'Set Password & Access Dashboard →')}
          <p style="margin:14px 0 0;font-size:12px;color:#4a5568;">🔒 Secure link · expires in 48 hours</p>
        </div>

        <!-- What's included -->
        <div style="background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:24px;margin-bottom:24px;">
          <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.accent};">What You Get</p>
          ${[
            '10+ High-Authority LinkedIn Banner Templates (Canva)',
            '10+ Featured Section Funnel Designs',
            '15+ Authority Carousel & Post Templates',
            'Personal Brand Visual Style Guide (PDF)',
            hasMasterclass ? '🔥 Implementation Masterclass (60-min)' : null,
          ].filter(Boolean).map(item => `
          <div style="display:flex;align-items:flex-start;margin-bottom:10px;">
            <span style="color:${C.accent};font-size:16px;margin-right:10px;margin-top:1px;flex-shrink:0;">✓</span>
            <span style="font-size:14px;color:${C.textSecondary};line-height:1.5;">${item}</span>
          </div>`).join('')}
        </div>

        <!-- Order details row -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
          ${infoRow('Email', userEmail)}
          ${infoRow('Country', country)}
          ${infoRow('Status', '<span style="color:#51f8aa;">✓ Paid</span>')}
        </table>

      </td>
    </tr>

    <!-- Guarantee footer -->
    <tr>
      <td style="background:${C.surface};border-top:1px solid ${C.border};padding:20px 40px;text-align:center;">
        <p style="margin:0;font-size:13px;color:${C.textSecondary};">
          🛡️ <strong style="color:${C.textPrimary};">48-Hour Money-Back Guarantee</strong> · Not satisfied? Just reply to this email.
        </p>
      </td>
    </tr>`;

  const html = emailWrapper(body);

  const textContent = `
Hello ${userName},

Thank you for your order! Your purchase of the ${productName} has been confirmed.

ORDER SUMMARY:
- Product: ${productName} ($${basePrice})
${hasMasterclass ? '- Implementation Masterclass: $49\n' : ''}- Total Paid: $${totalPrice}
- Email: ${userEmail}
- Status: Confirmed / Paid

NEXT STEP — ACCESS YOUR DASHBOARD:
Please use the following secure link to set your password and access your dashboard templates and videos:
${setPasswordLink}

WHAT IS INCLUDED:
- 10+ High-Authority LinkedIn Banner Templates (Canva)
- 10+ Featured Section Funnel Designs
- 15+ Authority Carousel & Post Templates
- Personal Brand Visual Style Guide (PDF)
${hasMasterclass ? '- Implementation Masterclass Video Breakdown\n' : ''}
48-HOUR GUARANTEE:
If you need any help, have questions, or require support, simply reply to this email directly.

Best regards,
Tino Support Team
${process.env.SMTP_USER || 'support@tino.com'}
`.trim();

  await transporter.sendMail({
    from: `"Tino Authority Kit" <${process.env.SMTP_USER}>`,
    to: userEmail,
    replyTo: process.env.SMTP_USER,
    subject: `Order Confirmation: Your LinkedIn Authority Kit Access`,
    text: textContent,
    html,
    headers: {
      'X-Entity-Ref-ID': `ord_${Date.now()}`,
      'List-Unsubscribe': `<mailto:${process.env.SMTP_USER}?subject=unsubscribe>`,
    }
  });

  return { success: true };
}


// ─── 2. Admin Order Notification ─────────────────────────────────────────────
export async function sendAdminOrderEmail({
  userName, userEmail, productName, totalPrice,
  hasMasterclass, country,
}) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || 'sibtey02@gmail.com';

  const body = `
    ${headerBand('💰', 'New Order Received!', `${userName} just purchased — $${totalPrice}`)}

    <tr>
      <td style="padding:36px 40px 28px;">

        <!-- Amount highlight -->
        <div style="background:linear-gradient(135deg,${C.greenDark} 0%,#0b1812 100%);border:1px solid rgba(34,197,94,0.2);border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.green};">Total Revenue</p>
          <p style="margin:0;font-size:40px;font-weight:800;color:${C.green};letter-spacing:-1px;">$${totalPrice}</p>
        </div>

        <!-- Order details -->
        <div style="background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:24px;">
          <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.accent};">Order Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            ${infoRow('Customer', userName)}
            ${infoRow('Email', `<a href="mailto:${userEmail}" style="color:${C.accent};text-decoration:none;">${userEmail}</a>`)}
            ${infoRow('Product', productName)}
            ${infoRow('Masterclass', hasMasterclass ? '<span style="color:#51f8aa;">✓ Yes (+$49)</span>' : '<span style="color:#9ca3af;">No</span>')}
            ${infoRow('Country', country)}
            ${infoRow('Time', new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi', dateStyle: 'medium', timeStyle: 'short' }) + ' PKT')}
          </table>
        </div>

      </td>
    </tr>

    <tr>
      <td style="background:${C.surface};border-top:1px solid ${C.border};padding:16px 40px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#3a3d52;">Tino Admin System · Auto-generated notification</p>
      </td>
    </tr>`;

  const html = emailWrapper(body);
  const textContent = `New Order: ${userName} purchased ${productName} for $${totalPrice}. Email: ${userEmail}, Country: ${country}.`;

  await transporter.sendMail({
    from: `"Tino System" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    replyTo: userEmail,
    subject: `Order Notification: ${userName} ($${totalPrice})`,
    text: textContent,
    html,
  });

  return { success: true };
}


// ─── 3. Revoke Access Email ───────────────────────────────────────────────────
export async function sendRevokeAccessEmail({ userName, userEmail }) {
  const transporter = createTransporter();

  const body = `
    ${headerBand('⛔', 'Access Revoked', 'Your membership access has been removed.')}

    <tr>
      <td style="padding:36px 40px 28px;">
        <p style="margin:0 0 16px;font-size:15px;color:${C.textSecondary};line-height:1.7;">
          Hi <strong style="color:${C.textPrimary};">${userName}</strong>,
        </p>
        <p style="margin:0 0 16px;font-size:15px;color:${C.textSecondary};line-height:1.7;">
          Your access to the <strong style="color:${C.textPrimary};">LinkedIn Authority Kit™</strong> has been revoked. If you believe this is a mistake or have any questions, please reply to this email directly and we'll resolve it promptly.
        </p>

        <div style="background:${C.redDark};border:1px solid rgba(239,68,68,0.2);border-radius:12px;padding:20px;margin-top:24px;">
          <p style="margin:0;font-size:14px;color:#f87171;line-height:1.6;">
            ⚠️ Your dashboard login and template access links are no longer active.
          </p>
        </div>
      </td>
    </tr>

    <tr>
      <td style="background:${C.surface};border-top:1px solid ${C.border};padding:20px 40px;text-align:center;">
        <p style="margin:0;font-size:13px;color:${C.textSecondary};">
          Questions? Reply to this email · <a href="mailto:${process.env.SMTP_USER}" style="color:${C.accent};text-decoration:none;">${process.env.SMTP_USER}</a>
        </p>
      </td>
    </tr>`;

  const html = emailWrapper(body);
  const textContent = `Hello ${userName},\n\nYour access to the LinkedIn Authority Kit has been revoked. If you have any questions or believe this is an error, please reply to this email directly.\n\nTino Support: ${process.env.SMTP_USER}`;

  await transporter.sendMail({
    from: `"Tino Authority Kit" <${process.env.SMTP_USER}>`,
    to: userEmail,
    replyTo: process.env.SMTP_USER,
    subject: 'Notice: LinkedIn Authority Kit Access Status',
    text: textContent,
    html,
  });

  return { success: true };
}

