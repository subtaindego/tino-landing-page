<?php
/**
 * Tino Authority Kit™ - Order & Access Email Mailer
 * Compatible with PHP 7.4+ / PHP 8.x (cPanel, Apache, Nginx)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$userEmail = filter_var($data['userEmail'] ?? '', FILTER_VALIDATE_EMAIL);
$userName = htmlspecialchars(trim($data['userName'] ?? 'Valued Customer'));
$adminEmail = filter_var($data['adminEmail'] ?? 'tino@authoritykit.com', FILTER_VALIDATE_EMAIL);
$productName = htmlspecialchars($data['productName'] ?? 'LinkedIn Authority Kit™');
$totalPrice = htmlspecialchars($data['totalPrice'] ?? '47');
$hasMasterclass = !empty($data['hasMasterclass']);
$country = htmlspecialchars($data['country'] ?? 'Global');
$setPasswordLink = $data['setPasswordLink'] ?? 'http://localhost:3000/dashboard';

if (!$userEmail) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid customer email address']);
    exit;
}

$senderEmail = 'no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'authoritykit.com');
$senderName = 'Tino | LinkedIn Authority Kit';

// ==========================================
// 1. EMAIL TO CUSTOMER (Set Password & Access)
// ==========================================
$userSubject = "🎉 Order Confirmed: Set your password to access LinkedIn Authority Kit™";

$userHtml = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your LinkedIn Authority Kit™ Access</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0b0d19; color: #edeeee; margin: 0; padding: 24px; }
    .container { max-width: 580px; margin: 0 auto; background: #111424; border: 1px solid rgba(81, 248, 170, 0.2); border-radius: 14px; padding: 36px; }
    .logo { color: #51f8aa; font-weight: 800; font-size: 20px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 24px; }
    h1 { font-size: 24px; color: #ffffff; margin-top: 0; }
    p { font-size: 15px; line-height: 1.6; color: #9ca3af; }
    .box { background: rgba(81, 248, 170, 0.05); border: 1px dashed #51f8aa; border-radius: 10px; padding: 18px; margin: 24px 0; }
    .btn { display: inline-block; background: #51f8aa; color: #0b0d19 !important; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 16px; margin: 20px 0; }
    .footer { margin-top: 36px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">Tino • Authority Kit™</div>
    <h1>Welcome aboard, ' . $userName . '! 🎉</h1>
    <p>Thank you for purchasing the <strong>' . $productName . '</strong>' . ($hasMasterclass ? ' with Implementation Masterclass' : '') . '. Your payment of <strong>$' . $totalPrice . '</strong> has been confirmed.</p>
    
    <div class="box">
      <h3 style="margin-top:0; color:#ffffff;">Next Step: Set Your Dashboard Password</h3>
      <p style="margin-bottom:0;">Your member portal account has been created for: <strong style="color:#51f8aa;">' . $userEmail . '</strong>.<br>Click the secure button below to set your password and access your training & Canva templates.</p>
    </div>

    <center>
      <a href="' . $setPasswordLink . '" class="btn" target="_blank">Set Your Password & Enter Dashboard →</a>
    </center>

    <p style="font-size:13px; color:#6b7280;">If the button does not work, copy and paste this link in your browser:<br><a href="' . $setPasswordLink . '" style="color:#51f8aa;">' . $setPasswordLink . '</a></p>

    <div class="footer">
      Need assistance? Reply directly to this email or message Tino on WhatsApp.<br>
      © ' . date('Y') . ' Tino Authority Kit. All rights reserved.
    </div>
  </div>
</body>
</html>
';

$userHeaders = [];
$userHeaders[] = 'MIME-Version: 1.0';
$userHeaders[] = 'Content-type: text/html; charset=utf-8';
$userHeaders[] = 'From: ' . $senderName . ' <' . $senderEmail . '>';
$userHeaders[] = 'Reply-To: ' . $adminEmail;
$userHeaders[] = 'X-Mailer: PHP/' . phpversion();

$userMailSent = @mail($userEmail, $userSubject, $userHtml, implode("\r\n", $userHeaders));

// ==========================================
// 2. EMAIL TO ADMIN (New Order Alert)
// ==========================================
$adminSubject = "🚨 New Order: $" . $totalPrice . " from " . $userName . " (" . $userEmail . ")";

$adminHtml = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #0b0d19; color: #edeeee; padding: 20px; }
    .card { background: #131726; border-radius: 10px; border: 1px solid #38bdf8; max-width: 520px; margin: 0 auto; padding: 24px; }
    h2 { color: #38bdf8; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    td { padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; }
    td.label { color: #9ca3af; font-weight: 600; width: 40%; }
    td.val { color: #ffffff; }
  </style>
</head>
<body>
  <div class="card">
    <h2>⚡ New Order Received!</h2>
    <p>A new customer has just completed checkout on the landing page:</p>
    <table>
      <tr><td class="label">Customer Name:</td><td class="val">' . $userName . '</td></tr>
      <tr><td class="label">Customer Email:</td><td class="val"><strong style="color:#51f8aa;">' . $userEmail . '</strong></td></tr>
      <tr><td class="label">Product:</td><td class="val">' . $productName . '</td></tr>
      <tr><td class="label">Order Bump:</td><td class="val">' . ($hasMasterclass ? 'Yes ($49 Masterclass)' : 'No') . '</td></tr>
      <tr><td class="label">Total Paid:</td><td class="val" style="color:#51f8aa; font-weight:bold;">$' . $totalPrice . '</td></tr>
      <tr><td class="label">Country:</td><td class="val">' . $country . '</td></tr>
      <tr><td class="label">Date:</td><td class="val">' . date('Y-m-d H:i:s T') . '</td></tr>
    </table>
  </div>
</body>
</html>
';

$adminHeaders = [];
$adminHeaders[] = 'MIME-Version: 1.0';
$adminHeaders[] = 'Content-type: text/html; charset=utf-8';
$adminHeaders[] = 'From: ' . $senderName . ' <' . $senderEmail . '>';
$adminHeaders[] = 'Reply-To: ' . $userEmail;
$adminHeaders[] = 'X-Mailer: PHP/' . phpversion();

$adminMailSent = @mail($adminEmail, $adminSubject, $adminHtml, implode("\r\n", $adminHeaders));

echo json_encode([
    'success' => true,
    'userMailSent' => (bool)$userMailSent,
    'adminMailSent' => (bool)$adminMailSent,
    'message' => 'Processed order notification',
    'customer' => $userEmail,
    'total' => $totalPrice
]);
