"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function AdminPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalUsers: 0 });
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState({ text: '', type: 'success' });
  const [revoking, setRevoking] = useState(''); // email being revoked

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
      setPinError('Incorrect passcode. Please try again.');
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
        setStats({
          totalRevenue: data.stats.totalRevenue,
          totalOrders: data.stats.totalOrders,
          totalUsers: data.stats.totalUsers,
        });
        setOrders(data.orders);
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (text, type = 'success') => {
    setActionMsg({ text, type });
    setTimeout(() => setActionMsg({ text: '', type: 'success' }), 5000);
  };

  const handleRevokeAccess = async (email, name) => {
    if (!confirm(`Revoke dashboard access for ${name} (${email})?\n\nThis will send them an email notification and remove their account.`)) return;
    setRevoking(email);
    try {
      const res = await fetch(`/api/admin/orders?email=${encodeURIComponent(email)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showMsg(`✓ Access revoked for ${email}. Email notification sent.`, 'success');
        fetchData();
      } else {
        showMsg('Error: ' + data.error, 'error');
      }
    } catch {
      showMsg('Network error revoking access.', 'error');
    } finally {
      setRevoking('');
    }
  };

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'pending'
  const [searchQuery, setSearchQuery] = useState('');

  // Resend set-password email to a lead
  const handleResendEmail = async (customer) => {
    try {
      const res = await fetch('/api/admin/resend-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: customer.email, name: customer.name }),
      });
      const data = await res.json();
      if (data.success) showMsg(`✓ Set-password invite resent to ${customer.email}`, 'success');
      else showMsg('Error: ' + data.error, 'error');
    } catch {
      showMsg('Network error resending email.', 'error');
    }
  };

  // Build unified customer records
  const unifiedCustomers = [];
  const processedEmails = new Set();

  orders.forEach(ord => {
    const cleanEmail = ord.email.toLowerCase();
    if (!processedEmails.has(cleanEmail)) {
      processedEmails.add(cleanEmail);
      const matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail);
      unifiedCustomers.push({
        id: ord.id || matchedUser?.id || cleanEmail,
        name: ord.name || matchedUser?.name || 'Customer',
        email: ord.email,
        items: ord.items || 'LinkedIn Authority Kit™',
        totalPrice: ord.totalPrice || 47,
        createdAt: ord.createdAt || matchedUser?.createdAt || new Date().toISOString(),
        hasPasswordSet: matchedUser?.hasPasswordSet || false,
        role: matchedUser?.role || 'customer',
        userObj: matchedUser || null
      });
    }
  });

  users.forEach(u => {
    const cleanEmail = u.email.toLowerCase();
    if (!processedEmails.has(cleanEmail)) {
      processedEmails.add(cleanEmail);
      unifiedCustomers.push({
        id: u.id,
        name: u.name || 'Member',
        email: u.email,
        items: 'LinkedIn Authority Kit™',
        totalPrice: 47,
        createdAt: u.createdAt || new Date().toISOString(),
        hasPasswordSet: !!u.hasPasswordSet,
        role: u.role || 'customer',
        userObj: u
      });
    }
  });

  // Sort newest first
  unifiedCustomers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Counts for filter pills
  const totalCount = unifiedCustomers.length;
  const activeCount = unifiedCustomers.filter(c => c.hasPasswordSet).length;
  const pendingCount = unifiedCustomers.filter(c => !c.hasPasswordSet).length;

  // Filtered & searched data
  const filteredCustomers = unifiedCustomers.filter(c => {
    if (activeFilter === 'active' && !c.hasPasswordSet) return false;
    if (activeFilter === 'pending' && c.hasPasswordSet) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = c.name?.toLowerCase().includes(q);
      const matchEmail = c.email?.toLowerCase().includes(q);
      const matchItem = c.items?.toLowerCase().includes(q);
      return matchName || matchEmail || matchItem;
    }

    return true;
  });

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
              id="admin-passcode-input"
              suppressHydrationWarning
            />
            {pinError && <p className={styles.errorText}>⚠️ {pinError}</p>}
            <button type="submit" className={styles.lockBtn} id="admin-unlock-btn" suppressHydrationWarning>Unlock Dashboard →</button>
          </form>
          <Link href="/" className={styles.backLink}>← Return to Website</Link>
        </div>
      </main>
    );
  }

  // ── Authenticated admin view ──
  return (
    <main className={styles.adminMain}>

      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <span className={styles.topBarTitle}>🛡️ Tino Admin</span>
          <span className={styles.topBarSub}>sibtey02@gmail.com</span>
        </div>
        <div className={styles.topBarRight}>
          <button onClick={fetchData} className={styles.refreshTopBtn} disabled={loading} id="admin-refresh-btn">
            {loading ? '⏳' : '🔄'} {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button onClick={handleAdminLogout} className={styles.logoutBtn} id="admin-logout-btn">Logout</button>
        </div>
      </div>

      <div className={styles.contentWrap}>

        {/* Stats Row */}
        <div className={styles.metricGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>💰 Total Revenue</div>
            <div className={styles.metricValue}>${stats.totalRevenue.toLocaleString()}</div>
          </div>
          <div 
            className={`${styles.metricCard} ${styles.clickableCard}`}
            onClick={() => setActiveFilter('all')}
            title="Click to view all customers"
          >
            <div className={styles.metricLabel}>👥 All Customers</div>
            <div className={styles.metricValue}>{totalCount}</div>
          </div>
          <div 
            className={`${styles.metricCard} ${styles.clickableCard}`}
            onClick={() => setActiveFilter('active')}
            title="Click to filter Active Members"
          >
            <div className={styles.metricLabel}>✅ Active Members</div>
            <div className={styles.metricValue}>{activeCount}</div>
          </div>
          <div 
            className={`${styles.metricCard} ${styles.clickableCard}`}
            onClick={() => setActiveFilter('pending')}
            title="Click to filter Pending Leads"
          >
            <div className={styles.metricLabel}>🟡 Awaiting Password</div>
            <div className={styles.metricValue} style={{ color: '#fbbf24' }}>{pendingCount}</div>
          </div>
        </div>

        {/* Action Message Banner */}
        {actionMsg.text && (
          <div className={actionMsg.type === 'error' ? styles.alertBannerError : styles.alertBanner}>
            {actionMsg.text}
          </div>
        )}

        {/* ── Single Unified Table Card ── */}
        <div className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                {activeFilter === 'all' && `👥 All Customers (${filteredCustomers.length})`}
                {activeFilter === 'active' && `✅ Active Members (${filteredCustomers.length})`}
                {activeFilter === 'pending' && `🟡 Pending Leads — Awaiting Password (${filteredCustomers.length})`}
              </h2>
              <p className={styles.sectionDesc}>
                Seamlessly manage all customer orders, access permissions, password statuses, and email invites from one place.
              </p>
            </div>
          </div>

          {/* ── Filter Toolbar & Real-time Search ── */}
          <div className={styles.toolbarRow}>
            <div className={styles.filterGroup}>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`${styles.filterPill} ${activeFilter === 'all' ? styles.filterPillActive : ''}`}
                id="filter-all-btn"
              >
                All <span className={styles.filterCountBadge}>{totalCount}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('active')}
                className={`${styles.filterPill} ${activeFilter === 'active' ? styles.filterPillActive : ''}`}
                id="filter-active-btn"
              >
                ✅ Active Members <span className={styles.filterCountBadge}>{activeCount}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('pending')}
                className={`${styles.filterPill} ${activeFilter === 'pending' ? styles.filterPillActive : ''}`}
                id="filter-pending-btn"
              >
                🟡 Pending Leads <span className={styles.filterCountBadge}>{pendingCount}</span>
              </button>
            </div>

            <div className={styles.searchWrap}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search by name, email, or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                id="admin-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={styles.clearSearchBtn}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* ── Table ── */}
          {filteredCustomers.length === 0 ? (
            <p className={styles.emptyNote}>
              {searchQuery
                ? `No customers match "${searchQuery}". Try a different keyword.`
                : activeFilter === 'pending'
                ? '✅ Excellent! No pending leads — all customers have set their passwords.'
                : activeFilter === 'active'
                ? 'No active members yet in this view.'
                : 'No orders or users recorded yet.'}
            </p>
          ) : (
            <div className={styles.tableResponsive}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((cust, idx) => {
                    const isRevoking = revoking === cust.email;
                    return (
                      <tr key={cust.id + '_' + idx} className={styles.tableRow}>
                        <td className={styles.indexCell}>{idx + 1}</td>
                        <td>
                          <strong className={styles.nameCell}>{cust.name}</strong>
                          {cust.role === 'admin' && (
                            <span className={styles.roleBadgeAdmin} style={{ marginLeft: '6px' }}>Admin</span>
                          )}
                        </td>
                        <td className={styles.emailCell}>{cust.email}</td>
                        <td>
                          <span className={styles.itemTag}>{cust.items}</span>
                        </td>
                        <td className={styles.priceCell}>${cust.totalPrice}</td>
                        <td className={styles.dateCell}>
                          {new Date(cust.createdAt).toLocaleDateString()}<br />
                          <span className={styles.timeText}>
                            {new Date(cust.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>
                        <td>
                          {cust.hasPasswordSet ? (
                            <span className={styles.statusActive}>✅ Active Member</span>
                          ) : (
                            <span className={styles.statusPending}>⏳ Awaiting Password</span>
                          )}
                        </td>
                        <td>
                          <div className={styles.actionCellGroup}>
                            {!cust.hasPasswordSet && (
                              <button
                                type="button"
                                onClick={() => handleResendEmail(cust)}
                                className={styles.resendBtn}
                                title="Send reminder email with set-password link"
                                id={`resend-btn-${idx}`}
                              >
                                📧 Resend Email
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRevokeAccess(cust.email, cust.name)}
                              className={styles.revokeBtn}
                              disabled={isRevoking}
                              title={cust.hasPasswordSet ? 'Revoke dashboard access' : 'Remove pending customer'}
                              id={`revoke-btn-${idx}`}
                            >
                              {isRevoking ? 'Processing...' : cust.hasPasswordSet ? '🚫 Revoke Access' : '🗑 Remove'}
                            </button>
                          </div>
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
