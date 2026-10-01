"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clientConfig } from '../config/client.config';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { product, theme } = clientConfig;
  const price = product.isLaunchActive ? product.launchPrice : product.regularPrice;

  const navLinks = [
    { name: "Authority Kit", href: "/" },
    { name: "Free Training", href: "/swipemytraining" },
    { name: "Checkout", href: "/checkout" },
    { name: "Links Hub", href: "/links" },
    { name: "Member Portal", href: "/dashboard" },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        {/* Brand Brand Logo & Tag */}
        <Link href="/" className={styles.brand}>
          <div className={styles.avatarGlow}>
            <img 
              src={clientConfig.profile.avatarUrl} 
              alt={theme.clientName} 
              className={styles.avatarImg}
            />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>Authority™</span>
            <span className={styles.brandSub}>Kit</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className={styles.headerAction}>
          <Link href="/checkout" className={`btn-primary ${styles.ctaBtn}`}>
            <span>Get Kit — ${price}</span>
            <span className={styles.badgeSale}>75% OFF</span>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            type="button" 
            className={styles.hamburger} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.openTop : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.openMid : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.openBot : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className="container">
            <div className={styles.mobileLinks}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`${styles.mobileNavLink} ${pathname === link.href ? styles.activeMobileNavLink : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/checkout" 
                onClick={() => setMenuOpen(false)}
                className="btn-primary" 
                style={{ width: '100%', marginTop: '0.75rem' }}
              >
                Get {clientConfig.product.name} — ${price}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
