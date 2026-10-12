<?php
/**
 * Tino Authority Kit™ — PHP Mailer via Gmail SMTP (PHPMailer)
 * Handles: Order confirmation, Admin notification, Revoke access
 * 
 * ⚙️ SETUP: Set your Gmail credentials below (lines 20-21)
 * Use a Gmail App Password: https://myaccount.google.com/apppasswords
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// ── Load PHPMailer (auto-loaded via Composer or manual include) ───────────────
$composerAutoload = __DIR__ . '/vendor/autoload.php';
$manualSrc        = __DIR__ . '/phpmailer/src';

if (file_exists($composerAutoload)) {
    require $composerAutoload;
} elseif (is_dir($manualSrc)) {
    require $manualSrc . '/Exception.php';
    require $manualSrc . '/PHPMailer.php';
    require $manualSrc . '/SMTP.php';
}

// ── Gmail SMTP Credentials ────────────────────────────────────────────────────
define('GMAIL_USER', 'sibtey02@gmail.com');        // Your Gmail
define('GMAIL_PASS', 'your_gmail_app_password');    // ← Replace with App Password
define('ADMIN_EMAIL', 'sibtey02@gmail.com');        // Admin receives order alerts
define('FROM_NAME',   'Tino | Authority Kit™');

// ── CORS & Headers ────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); echo json_encode(['success' => false, 'error' => 'Method Not Allowed']); exit; }

// ── Parse Input ───────────────────────────────────────────────────────────────
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true) ?: $_POST;

$type           = $data['type'] ?? 'order';        // 'order' | 'revoke'
$userEmail      = filter_var($data['userEmail'] ?? '', FILTER_VALIDATE_EMAIL);
$userName       = htmlspecialchars(trim($data['userName'] ?? 'Valued Customer'));
$productName    = htmlspecialchars($data['productName'] ?? 'LinkedIn Authority Kit™');
$totalPrice     = htmlspecialchars($data['totalPrice'] ?? '47');
$hasMasterclass = !empty($data['hasMasterclass']);
$country        = htmlspecialchars($data['country'] ?? 'Global');
$setPasswordLink= htmlspecialchars($data['setPasswordLink'] ?? 'http://localhost:3001/dashboard');

if (!$userEmail) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid customer email']);
    exit;
}

// ── PHPMailer helper ──────────────────────────────────────────────────────────
function createMailer() {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = GMAIL_USER;
    $mail->Password   = GMAIL_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->setFrom(GMAIL_USER, FROM_NAME);
    return $mail;
}

$results = [];

// ════════════════════════════════════════════════════════════
// TYPE: order — send customer confirmation + admin alert
// ════════════════════════════════════════════════════════════
if ($type === 'order') {

    // 1. Customer Email
    try {
        $mail = createMailer();
        $mail->addAddress($userEmail, $userName);
        $mail->Subject = '✅ Order Confirmed — Access your ' . $productName;
        $mail->isHTML(true);
        $mail->Body = '<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{font-family:Helvetica,Arial,sans-serif;background:#0b0d19;margin:0;padding:0}
.wrap{max-width:560px;margin:36px auto;background:#111424;border-radius:14px;border:1px solid rgba(81,248,170,0.18);overflow:hidden}
.hdr{background:#0b0d19;padding:28px 36px 22px;border-bottom:1px solid rgba(81,248,170,0.2)}
.logo{font-size:19px;font-weight:800;color:#51f8aa}
.badge{display:inline-block;background:rgba(81,248,170,0.1);color:#51f8aa;border:1px solid rgba(81,248,170,0.3);border-radius:20px;padding:3px 12px;font-size:12px;font-weight:600;margin-top:8px}
.body{padding:30px 36px}
h1{color:#fff;font-size:21px;font-weight:700;margin:0 0 10px}
p{color:#9ca3af;font-size:15px;line-height:1.7;margin:0 0 12px}
.box{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:9px;padding:14px 18px;margin:16px 0}
.row{padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:13px;color:#d1d5db}
.row:last-child{border:none}
.lbl{color:#6b7280}
.btn{display:block;background:#51f8aa;color:#071a10;font-weight:800;font-size:15px;text-align:center;padding:15px;border-radius:10px;text-decoration:none;margin:22px 0 10px}
.ftr{padding:16px 36px;border-top:1px solid rgba(255,255,255,0.05)}
.ftr p{color:#4b5563;font-size:12px;margin:0}
</style></head><body>
<div class="wrap">
  <div class="hdr"><div class="logo">🛡️ Authority Kit™</div><div class="badge">✅ Order Confirmed</div></div>
  <div class="body">
    <h1>Welcome, ' . $userName . '! 🎉</h1>
    <p style="color:#edeeee">Your order is confirmed. Set your password to access your dashboard instantly.</p>
    <div class="box">
      <div class="row"><span class="lbl">Product: </span>' . $productName . '</div>' .
      ($hasMasterclass ? '<div class="row"><span class="lbl">Bonus: </span>+ Implementation Masterclass</div>' : '') . '
      <div class="row"><span class="lbl">Amount: </span><strong style="color:#51f8aa">$' . $totalPrice . '</strong></div>
      <div class="row"><span class="lbl">Email: </span>' . $userEmail . '</div>
    </div>
    <a href="' . $setPasswordLink . '" class="btn">Set Password &amp; Access Dashboard →</a>
    <p style="font-size:12px;color:#4b5563">Link not working? Copy: <span style="color:#51f8aa">' . $setPasswordLink . '</span></p>
  </div>
  <div class="ftr"><p>© ' . date('Y') . ' Tino | Authority Kit™ · Reply to this email for support.</p></div>
</div></body></html>';
        $mail->AltBody = 'Your order for ' . $productName . ' ($' . $totalPrice . ') is confirmed. Set your password: ' . $setPasswordLink;
        $mail->send();
        $results['customerEmail'] = 'sent';
    } catch (Exception $e) {
        $results['customerEmail'] = 'failed: ' . $e->getMessage();
    }

    // 2. Admin Email
    try {
        $mail = createMailer();
        $mail->addAddress(ADMIN_EMAIL, 'Tino Admin');
        $mail->Subject = '💰 New Sale: $' . $totalPrice . ' from ' . $userName . ' (' . $userEmail . ')';
        $mail->isHTML(true);
        $mail->Body = '<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{font-family:Helvetica,Arial,sans-serif;background:#0b0d19;margin:0;padding:0}
.wrap{max-width:520px;margin:36px auto;background:#111424;border-radius:14px;border:1px solid rgba(255,255,255,0.07);overflow:hidden}
.hdr{padding:22px 30px;border-bottom:1px solid rgba(81,248,170,0.2)}
.logo{font-size:17px;font-weight:800;color:#51f8aa}
.tag{display:inline-block;background:rgba(81,248,170,0.1);color:#51f8aa;border:1px solid rgba(81,248,170,0.3);border-radius:20px;padding:3px 12px;font-size:12px;font-weight:600;margin-top:6px}
.body{padding:22px 30px}
h1{color:#fff;font-size:18px;font-weight:700;margin:0 0 14px}
table{width:100%;border-collapse:collapse;font-size:13px}
td{padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#d1d5db}
td.lbl{color:#6b7280;width:40%}
.rev{color:#51f8aa;font-size:20px;font-weight:800}
.btn{display:inline-block;background:rgba(81,248,170,0.1);color:#51f8aa;border:1px solid rgba(81,248,170,0.3);padding:9px 18px;border-radius:7px;text-decoration:none;font-size:13px;font-weight:600;margin-top:14px}
.ftr{padding:14px 30px;border-top:1px solid rgba(255,255,255,0.05)}
.ftr p{color:#4b5563;font-size:12px;margin:0}
</style></head><body>
<div class="wrap">
  <div class="hdr"><div class="logo">🛡️ Tino Admin</div><div class="tag">💰 New Sale!</div></div>
  <div class="body">
    <h1>New Order Received 🎉</h1>
    <table>
      <tr><td class="lbl">Customer</td><td>' . $userName . '</td></tr>
      <tr><td class="lbl">Revenue</td><td><span class="rev">$' . $totalPrice . '</span></td></tr>
      <tr><td class="lbl">Email</td><td><strong style="color:#51f8aa">' . $userEmail . '</strong></td></tr>
      <tr><td class="lbl">Country</td><td>' . $country . '</td></tr>
      <tr><td class="lbl">Product</td><td>' . $productName . '</td></tr>
      <tr><td class="lbl">Masterclass</td><td>' . ($hasMasterclass ? '✅ Yes' : '❌ No') . '</td></tr>
      <tr><td class="lbl">Date</td><td>' . date('d M Y, H:i') . '</td></tr>
    </table>
    <a href="' . $setPasswordLink . '" class="btn">View Password Setup Link →</a>
  </div>
  <div class="ftr"><p>Tino Admin Notification · <a href="http://localhost:3001/admin" style="color:#51f8aa">Open Admin Dashboard</a></p></div>
</div></body></html>';
        $mail->send();
        $results['adminEmail'] = 'sent';
    } catch (Exception $e) {
        $results['adminEmail'] = 'failed: ' . $e->getMessage();
    }

// ════════════════════════════════════════════════════════════
// TYPE: revoke — notify user their access was removed
// ════════════════════════════════════════════════════════════
} elseif ($type === 'revoke') {

    try {
        $mail = createMailer();
        $mail->addAddress($userEmail, $userName);
        $mail->Subject = '⚠️ Your Authority Kit™ Access Has Been Revoked';
        $mail->isHTML(true);
        $mail->Body = '<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
body{font-family:Helvetica,Arial,sans-serif;background:#0b0d19;margin:0;padding:0}
.wrap{max-width:520px;margin:36px auto;background:#111424;border-radius:14px;border:1px solid rgba(255,255,255,0.07);overflow:hidden}
.hdr{padding:22px 30px;border-bottom:1px solid rgba(248,113,113,0.2)}
.logo{font-size:17px;font-weight:800;color:#fff}
.body{padding:26px 30px}
h1{color:#fff;font-size:18px;font-weight:700;margin:0 0 10px}
p{color:#9ca3af;font-size:15px;line-height:1.7;margin:0 0 10px}
.notice{background:rgba(248,113,113,0.06);border:1px solid rgba(248,113,113,0.2);border-radius:9px;padding:14px 18px;margin:14px 0}
.notice p{color:#fca5a5;font-size:14px;margin:0}
.ftr{padding:14px 30px;border-top:1px solid rgba(255,255,255,0.05)}
.ftr p{color:#4b5563;font-size:12px;margin:0}
</style></head><body>
<div class="wrap">
  <div class="hdr"><div class="logo">⚠️ Authority Kit™ — Access Notice</div></div>
  <div class="body">
    <h1>Your Access Has Been Removed</h1>
    <p>Hi ' . $userName . ',</p>
    <p>Your access to the <strong style="color:#edeeee">LinkedIn Authority Kit™</strong> member portal has been revoked.</p>
    <div class="notice">
      <p>🔒 Account <strong>' . $userEmail . '</strong> no longer has dashboard access. Please contact us to reinstate.</p>
    </div>
    <p>To resolve: <strong style="color:#51f8aa">sibtey02@gmail.com</strong></p>
  </div>
  <div class="ftr"><p>© ' . date('Y') . ' Tino | Authority Kit™</p></div>
</div></body></html>';
        $mail->send();
        $results['revokeEmail'] = 'sent';
    } catch (Exception $e) {
        $results['revokeEmail'] = 'failed: ' . $e->getMessage();
    }
}

echo json_encode([
    'success' => true,
    'type'    => $type,
    'results' => $results,
]);
