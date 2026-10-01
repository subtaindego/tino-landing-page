import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const ordersFile = path.join(dataDir, 'orders.json');
const usersFile = path.join(dataDir, 'users.json');

function ensureFiles() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(ordersFile, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
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
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf8');
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
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
}
