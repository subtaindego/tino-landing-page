import fs from 'fs';
import path from 'path';

// On Netlify (and most serverless platforms), process.cwd() is read-only.
// Only /tmp is writable. We use /tmp in production and local data/ in dev.
const IS_PROD = process.env.NODE_ENV === 'production';
const dataDir = IS_PROD ? '/tmp/tino-data' : path.join(process.cwd(), 'data');
const ordersFile = path.join(dataDir, 'orders.json');
const usersFile = path.join(dataDir, 'users.json');

function ensureFiles() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(ordersFile)) {
      // In production, seed from the committed data/ files if they exist
      const seedOrdersPath = path.join(process.cwd(), 'data', 'orders.json');
      const seedData = fs.existsSync(seedOrdersPath)
        ? fs.readFileSync(seedOrdersPath, 'utf8')
        : '[]';
      fs.writeFileSync(ordersFile, seedData);
    }
    if (!fs.existsSync(usersFile)) {
      const seedUsersPath = path.join(process.cwd(), 'data', 'users.json');
      const seedData = fs.existsSync(seedUsersPath)
        ? fs.readFileSync(seedUsersPath, 'utf8')
        : '[]';
      fs.writeFileSync(usersFile, seedData);
    }
  } catch (err) {
    // Silently continue — reads will return [] as fallback
  }
}

export function getOrders() {
  ensureFiles();
  try {
    const raw = fs.readFileSync(ordersFile, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export function saveOrders(orders) {
  ensureFiles();
  try {
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf8');
  } catch (err) {
    console.error('saveOrders error:', err.message);
  }
}

export function getUsers() {
  ensureFiles();
  try {
    const raw = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export function saveUsers(users) {
  ensureFiles();
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('saveUsers error:', err.message);
  }
}
