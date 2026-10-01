"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function AdminPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0 });
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('tino_admin_auth');
    if (savedAuth === 'true') {
      setIsAdminAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin === 'tino2026' || adminPin === 'admin123') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('tino_admin_auth', 'true');
      setPinError('');
      fetchData();
    } else {
      setPinError('Incorrect passcode.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('tino_admin_auth');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setStats({ totalRevenue: data.stats.totalRevenue, totalOrders: data.stats.totalOrders });
        setOrders(data.orders);
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeAccess = async (email) => {
    if (!confirm(`Revoke dashboard access for ${email}?`)) return;
    try {
      const res = await fetch(`/api/admin/orders?email=${encodeURIComponent(email)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setActionMsg(`✓ Access revoked for ${email}`);
        fetchData();
        setTimeout(() => setActionMsg(''), 4000);
      }
    } catch {
      alert('Error revoking access');
    }
  };

  // Get password status for an order's email
  const getPasswordStatus = (email) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user?.hasPasswordSet || false;
  };

  // Unique customers (deduplicate by email, keep first occurrence = latest order)
  const uniqueOrders = orders.filter((ord, idx, arr) =>
    arr.findIndex(o => o.email === ord.email) === idx
  );

  // ── Lock screen ──
  if (!isAdminAuthenticated) {
    return (
      <main className={styles.adminLockWrapper}>
        <div className={styles.ambientGlow} />
        <div className={styles.lockBox}>
          <div className={styles.lockIcon}>🛡️</div>
          <h1 className={styles.lockTitle}>Tino Admin</h1>
          <p className={styles.lockSubtitle}>Enter passcode to access the dashboard.</p>
          <form onSubmit={handleAdminLogin} className={styles.lockForm}>
            <input
              type="password"
              placeholder="Admin Passcode"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              className={styles.lockInput}
              required
              autoFocus
            />
            {pinError && <p className={styles.errorText}>{pinError}</p>}
            <button type="submit" className={styles.lockBtn}>Unlock →</button>
          </form>
          <Link href="/" className={styles.backLink}>← Return to Website</Link>
        </div>
      </main>
    );
  }

  // ── Authenticated admin view ──
  return (
    <main className={styles.adminMain}>

      {/* Minimal top bar — only logout */}
      <div className={styles.topBar}>
        <span className={styles.topBarTitle}>🛡️ Tino Admin</span>
        <button onClick={handleAdminLogout} className={styles.logoutBtn}>Logout</button>
      </div>

      <div className={styles.contentWrap}>

        {/* Stats Row */}
        <div className={styles.metricGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Total Revenue</div>
            <div className={styles.metricValue}>${stats.totalRevenue}</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Total Sales</div>
            <div className={styles.metricValue}>{stats.totalOrders}</div>
          </div>
        </div>

        {actionMsg && <div className={styles.alertBanner}>{actionMsg}</div>}

        {/* Orders Table */}
        <div className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Orders & Access ({uniqueOrders.length})</h2>
              <p className={styles.sectionDesc}>Customers who placed an order. Password status updates live when they set it.</p>
            </div>
            <button onClick={fetchData} className={styles.refreshBtn} disabled={loading}>
              {loading ? 'Refreshing...' : '🔄 Refresh'}
            </button>
          </div>

          {uniqueOrders.length === 0 ? (
            <p className={styles.emptyNote}>No orders yet. Once someone checks out they'll appear here.</p>
          ) : (
            <div className={styles.tableResponsive}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueOrders.map((ord) => {
                    const pwdSet = getPasswordStatus(ord.email);
                    return (
                      <tr key={ord.id}>
                        <td><strong>{ord.name}</strong></td>
                        <td className={styles.emailCell}>{ord.email}</td>
                        <td><span className={styles.itemTag}>{ord.items}</span></td>
                        <td className={styles.priceCell}>${ord.totalPrice}</td>
                        <td className={styles.dateCell}>
                          {new Date(ord.createdAt).toLocaleDateString()} {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td>
                          {pwdSet ? (
                            <span className={styles.statusActive}>✓ Set</span>
                          ) : (
                            <span className={styles.statusPending}>⏳ Pending</span>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleRevokeAccess(ord.email)}
                            className={styles.deleteBtn}
                          >
                            Revoke
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
