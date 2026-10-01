"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function AdminPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Dashboard Data
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalUsers: 0 });
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // New User Form
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  // Check saved admin session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('tino_admin_auth');
    if (savedAuth === 'true') {
      setIsAdminAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Default PIN: tino2026 (or admin123)
    if (adminPin === 'tino2026' || adminPin === 'admin123') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('tino_admin_auth', 'true');
      setPinError('');
      fetchData();
    } else {
      setPinError('Incorrect Admin Passcode. Try "tino2026"');
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
        setStats(data.stats);
        setOrders(data.orders);
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newEmail) return;

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, name: newName })
      });
      const data = await res.json();
      if (data.success) {
        setActionMsg(`✓ Access granted for ${newEmail}`);
        setNewEmail('');
        setNewName('');
        fetchData();
        setTimeout(() => setActionMsg(''), 4000);
      } else {
        setActionMsg(`⚠️ ${data.error}`);
      }
    } catch (err) {
      setActionMsg('⚠️ Network error adding user');
    }
  };

  const handleDeleteUser = async (email) => {
    if (!confirm(`Are you sure you want to revoke dashboard access for ${email}?`)) return;

    try {
      const res = await fetch(`/api/admin/orders?email=${encodeURIComponent(email)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setActionMsg(`Revoked access for ${email}`);
        fetchData();
        setTimeout(() => setActionMsg(''), 4000);
      }
    } catch (err) {
      alert('Error deleting user');
    }
  };

  // If not logged in as Admin, show Passcode Lock
  if (!isAdminAuthenticated) {
    return (
      <main className={styles.adminLockWrapper}>
        <div className={styles.ambientGlow} />
        <div className={styles.lockBox}>
          <div className={styles.lockIcon}>🛡️</div>
          <h1 className={styles.lockTitle}>Tino Admin Portal</h1>
          <p className={styles.lockSubtitle}>
            Enter admin passcode to view orders and manage customer database.
          </p>

          <form onSubmit={handleAdminLogin} className={styles.lockForm}>
            <input
              type="password"
              placeholder="Admin Passcode (e.g. tino2026)"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              className={styles.lockInput}
              required
              autoFocus
            />
            {pinError && <p className={styles.errorText}>{pinError}</p>}
            <button type="submit" className={styles.lockBtn}>
              Unlock Admin Portal →
            </button>
          </form>

          <div className={styles.quickHint}>
            Passcode hint: <code>tino2026</code>
          </div>
          <Link href="/" className={styles.backLink}>
            ← Return to Website
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.adminMain}>
      <header className={styles.adminNav}>
        <div className={styles.navLeft}>
          <span className={styles.logoBadge}>TINO ADMIN</span>
          <span className={styles.portalTitle}>Order &amp; Customer Management</span>
        </div>
        <div className={styles.navRight}>
          <Link href="/dashboard" className={styles.previewBtn} target="_blank">
            Open Dashboard ↗
          </Link>
          <button onClick={handleAdminLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <div className={styles.contentWrap}>
        {/* Top Metric Cards */}
        <div className={styles.metricGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Total Revenue</div>
            <div className={styles.metricValue}>${stats.totalRevenue}</div>
            <div className={styles.metricSub}>Gross customer sales</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Orders Placed</div>
            <div className={styles.metricValue}>{stats.totalOrders}</div>
            <div className={styles.metricSub}>Checkout transactions</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Authorized Buyers</div>
            <div className={styles.metricValue}>{stats.totalUsers}</div>
            <div className={styles.metricSub}>Emails with dashboard access</div>
          </div>
        </div>

        {actionMsg && <div className={styles.alertBanner}>{actionMsg}</div>}

        {/* Quick Add Authorized Email Section */}
        <div className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Grant Manual Dashboard Access</h2>
              <p className={styles.sectionDesc}>
                Add an email to authorize them for dashboard login without them going through checkout.
              </p>
            </div>
          </div>

          <form onSubmit={handleAddUser} className={styles.addForm}>
            <input
              type="text"
              placeholder="Customer Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={styles.formInput}
            />
            <input
              type="email"
              placeholder="customer@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className={styles.formInput}
              required
            />
            <button type="submit" className={styles.primaryActionBtn}>
              + Grant Access
            </button>
          </form>
        </div>

        {/* Orders Table */}
        <div className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Recent Orders ({orders.length})</h2>
              <p className={styles.sectionDesc}>Real-time purchases from checkout</p>
            </div>
            <button onClick={fetchData} className={styles.refreshBtn} disabled={loading}>
              {loading ? 'Refreshing...' : '🔄 Refresh Data'}
            </button>
          </div>

          {orders.length === 0 ? (
            <p className={styles.emptyNote}>No orders recorded yet. Make a test checkout to see it appear here!</p>
          ) : (
            <div className={styles.tableResponsive}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Product / Details</th>
                    <th>Amount</th>
                    <th>Country</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id}>
                      <td>
                        <strong>{ord.name}</strong>
                      </td>
                      <td className={styles.emailCell}>{ord.email}</td>
                      <td>
                        <span className={styles.itemTag}>{ord.items}</span>
                      </td>
                      <td className={styles.priceCell}>${ord.totalPrice}</td>
                      <td>{ord.country}</td>
                      <td className={styles.dateCell}>
                        {new Date(ord.createdAt).toLocaleDateString()} {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td>
                        <span className={styles.paidBadge}>✓ Paid</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Database Users & Access Permissions */}
        <div className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Authorized Dashboard Users ({users.length})</h2>
              <p className={styles.sectionDesc}>
                Only emails in this table can log into the member dashboard.
              </p>
            </div>
          </div>

          <div className={styles.tableResponsive}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Authorized Email</th>
                  <th>Password Status</th>
                  <th>Date Added</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((usr) => (
                  <tr key={usr.id || usr.email}>
                    <td>{usr.name || 'Member'}</td>
                    <td className={styles.emailCell}>
                      <strong>{usr.email}</strong>
                    </td>
                    <td>
                      {usr.hasPasswordSet ? (
                        <span className={styles.statusActive}>✓ Password Set</span>
                      ) : (
                        <span className={styles.statusPending}>⏳ Pending Password Setup</span>
                      )}
                    </td>
                    <td className={styles.dateCell}>
                      {usr.createdAt ? new Date(usr.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(usr.email)}
                        className={styles.deleteBtn}
                        title="Revoke dashboard access"
                      >
                        Revoke Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
