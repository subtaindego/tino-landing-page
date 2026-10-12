"use client";

import Link from 'next/link';
import FadeIn from './FadeIn';
import styles from './LaunchOffer.module.css';

export default function LaunchOffer() {
  return (
    <section className={styles.sectionWrapper}>
      <div className="container">
        <FadeIn>
          <div className={styles.outerCard}>
            
            {/* Top Badge */}
            <div className={styles.badge}>LAUNCH OFFER</div>

            {/* Main Heading */}
            <h2 className={styles.heading}>
              <span className={styles.headingLine}>Build your brand strategy yourself</span>
              <span className={styles.gradientHighlight}>and turn connections into clients.</span>
            </h2>

            {/* Subtitle */}
            <p className={styles.subtitle}>
              Everything in the Blueprint for one payment, with instant access and a 48 hour money back guarantee.
            </p>

            {/* Inner Pricing Card */}
            <div className={styles.innerCard}>
              <div className={styles.innerLabel}>LAUNCH SPECIAL</div>

              <div className={styles.priceRow}>
                <span className={styles.priceAmount}>$47</span>
                <span className={styles.priceCurrency}>USD</span>
              </div>

              <p className={styles.paymentType}>One time payment</p>

              <Link href="/checkout" className={styles.claimBtn}>
                Claim this offer→
              </Link>
            </div>

            {/* Bottom 3 Trust Points */}
            <div className={styles.trustRow}>
              <div className={styles.trustItem}>
                <svg className={styles.trustIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>48 Hour Money Back Guarantee</span>
              </div>

              <div className={styles.trustItem}>
                <svg className={styles.trustIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Instant Access</span>
              </div>

              <div className={styles.trustItem}>
                <svg className={styles.trustIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Secure Checkout</span>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
