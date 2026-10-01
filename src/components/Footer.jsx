"use client";
import Link from 'next/link';
import FadeIn from './FadeIn';
import styles from './Footer.module.css';
import { clientConfig } from '../config/client.config';

export default function Footer({ checkoutMode = false }) {
  const { profile } = clientConfig;

  if (checkoutMode) {
    return null;
  }

  return (
    <footer id="footer" className={styles.footerSection}>
      <div className="container">
        {/* High-Converting CTA Card */}
        <FadeIn>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaHeading}>
              Ready to take your personal brand and business to <span className={styles.highlightText}>the absolute highest level?</span>
            </h2>

            <div className={styles.ctaBtnStack}>
              <Link href="/checkout" className={styles.ctaPrimaryBtn}>
                Get instant access to program →
              </Link>
              <a 
                href={profile?.calBookingUrl || "https://cal.com/authoritykit/discovery-call"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.ctaSecondaryBtn}
              >
                Or book a 1:1 Coaching Call →
              </a>
            </div>

            <p className={styles.ctaSignoff}>
              Can&#39;t wait to see you on the inside! - <strong>Tino</strong>
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
