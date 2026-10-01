"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FadeIn from './FadeIn';
import styles from './CountdownOffer.module.css';
import { clientConfig } from '../config/client.config';

export default function CountdownOffer() {
  const { product } = clientConfig;
  const currentPrice = product.isLaunchActive ? product.launchPrice : product.regularPrice;
  const originalPrice = product.regularPrice;
  const savings = originalPrice - currentPrice;

  // Real-time countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 48
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initialize or retrieve persistent countdown
    const STORAGE_KEY = 'tino_launch_offer_end';
    let endTime = localStorage.getItem(STORAGE_KEY);

    if (!endTime || Date.now() > Number(endTime)) {
      // Set new 24-hour countdown window
      const newEndTime = Date.now() + (14 * 3600 + 36 * 60 + 48) * 1000;
      localStorage.setItem(STORAGE_KEY, String(newEndTime));
      endTime = String(newEndTime);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const difference = Number(endTime) - now;

      if (difference <= 0) {
        // Reset a fresh rolling urgency window
        const newEndTime = Date.now() + 24 * 3600 * 1000;
        localStorage.setItem(STORAGE_KEY, String(newEndTime));
        setTimeLeft({ hours: 23, minutes: 59, seconds: 59 });
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNum = (num) => String(num).padStart(2, '0');

  return (
    <section className={styles.timerSection}>
      <div className="container">
        <FadeIn>
          <div className={styles.timerCard}>
            
            {/* Top Urgency Pill */}
            <div className={styles.urgencyBadge}>
              <span className={styles.fireIcon}>🔥</span>
              <span>Limited Launch Offer • 70% Off Ends Soon</span>
            </div>

            {/* Main Headline */}
            <h2 className={styles.timerHeading}>
              Design elite graphics by yourself <span className={styles.highlightText}>and convert connections into clients.</span>
            </h2>

            <p className={styles.timerSubheadline}>
              Once the countdown timer reaches zero, this launch special concludes and the price permanently returns to <span className={styles.strikethroughPrice}>${originalPrice}</span>.
            </p>

            {/* Countdown Digits Display */}
            <div className={styles.countdownContainer}>
              <div className={styles.timeBox}>
                <span className={styles.timeValue}>
                  {mounted ? formatNum(timeLeft.hours) : '14'}
                </span>
                <span className={styles.timeLabel}>Hours</span>
              </div>

              <span className={styles.timeSeparator}>:</span>

              <div className={styles.timeBox}>
                <span className={styles.timeValue}>
                  {mounted ? formatNum(timeLeft.minutes) : '36'}
                </span>
                <span className={styles.timeLabel}>Minutes</span>
              </div>

              <span className={styles.timeSeparator}>:</span>

              <div className={styles.timeBox}>
                <span className={`${styles.timeValue} ${styles.pulseSec}`}>
                  {mounted ? formatNum(timeLeft.seconds) : '48'}
                </span>
                <span className={styles.timeLabel}>Seconds</span>
              </div>
            </div>

            {/* Price Presentation Row */}
            <div className={styles.priceRow}>
              <div className={styles.oldPriceWrap}>
                <span className={styles.oldPriceLabel}>Regular Price</span>
                <span className={styles.oldPrice}>${originalPrice}</span>
              </div>

              <div className={styles.arrowDivider}>→</div>

              <div className={styles.newPriceWrap}>
                <span className={styles.newPriceLabel}>Launch Special</span>
                <div className={styles.dealPriceWrap}>
                  <span className={styles.dealPrice}>${currentPrice}</span>
                  <span className={styles.currencyTag}>USD</span>
                </div>
              </div>

              <span className={styles.savingsTag}>
                Save ${savings} Today
              </span>
            </div>

            {/* Scarcity Progress Bar */}
            <div className={styles.scarcityBox}>
              <div className={styles.scarcityInfo}>
                <span>⚡ <strong>86% Claimed</strong> — Only 14 launch licenses remaining at ${currentPrice}</span>
              </div>
              <div className={styles.progressBarTrack}>
                <div className={styles.progressBarFill} style={{ width: '86%' }} />
              </div>
            </div>

            {/* High-Converting CTA Button */}
            <div className={styles.btnWrapper}>
              <Link 
                href="/checkout" 
                className={styles.ctaButton}
              >
                Claim This Offer (Save ${savings}) →
              </Link>
            </div>

            {/* Trust Assurance Micro-Notes */}
            <div className={styles.trustFooter}>
              <span>🛡️ 48-Hour Money-Back Guarantee</span>
              <span>•</span>
              <span>⚡ Instant Canva Access</span>
              <span>•</span>
              <span>🔒 256-Bit SSL Encrypted Checkout</span>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
