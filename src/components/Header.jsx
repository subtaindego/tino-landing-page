"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "Authority Kit", href: "/authority-kit", badge: null },
    { label: "Free Training", href: "/swipemytraining", badge: "Free" },
    { label: "Checkout", href: "/checkout", badge: "$47" },
    { label: "Dashboard", href: "/dashboard", badge: null },
    { label: "Links", href: "/links", badge: null },
  ];

  return (
    <div className={styles.navWrapper} suppressHydrationWarning>
      {/* Centered Floating Pill Navigation Dock */}
      <nav 
        className={`${styles.floatingPill} ${scrolled ? styles.floatingPillScrolled : ''}`} 
        aria-label="Main Navigation"
        suppressHydrationWarning
      >
        {/* Brand Mini Logo on Left of Pill */}
        <Link href="/" className={styles.pillBrand} title="LinkedIn Authority Kit™">
          <div className={styles.brandDot} />
          <span className={styles.brandTitle}>TINO</span>
        </Link>

        {/* Divider */}
        <div className={styles.pillDivider} />

        {/* Desktop Links Center Stack */}
        <div className={styles.linksRow}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`${styles.badge} ${item.badge === '$47' ? styles.badgePrice : ''}`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <span className={styles.activeGlowLine} />}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={styles.mobileToggle}
          aria-label="Toggle navigation menu"
        >
          <span className={`${styles.hamBar} ${mobileOpen ? styles.hamBarTop : ''}`} />
          <span className={`${styles.hamBar} ${mobileOpen ? styles.hamBarMid : ''}`} />
          <span className={`${styles.hamBar} ${mobileOpen ? styles.hamBarBot : ''}`} />
        </button>
      </nav>

      {/* Mobile Blur Dropdown Menu */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)}>
          <div className={styles.mobileDropdownCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileCardHeader}>
              <span className={styles.mobileCardTitle}>Quick Navigation</span>
              <button 
                type="button" 
                onClick={() => setMobileOpen(false)} 
                className={styles.mobileCloseBtn}
              >
                ✕
              </button>
            </div>

            <div className={styles.mobileLinksStack}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`${styles.mobileItem} ${isActive ? styles.mobileItemActive : ''}`}
                  >
                    <span className={styles.mobileItemLabel}>{item.label}</span>
                    {item.badge && (
                      <span className={`${styles.badge} ${item.badge === '$47' ? styles.badgePrice : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
