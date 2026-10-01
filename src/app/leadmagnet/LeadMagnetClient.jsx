"use client";

import { useState } from 'react';
import FadeIn from '../../components/FadeIn';
import { clientConfig } from '../../config/client.config';
import styles from './page.module.css';

export default function LeadMagnetClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.target);

    try {
      await fetch(clientConfig.newsletter.formAction, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      setStatus('success');
    } catch (err) {
      setTimeout(() => {
        setStatus('success');
      }, 500);
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <div className="container">
        <div className={styles.contentContainer}>
          <FadeIn>
            {/* Top Label */}
            <div className={styles.videoBadge}>[Free 7-Day Training]</div>

            {/* Headline matching reference */}
            <h1 className={styles.headline}>
              Free 7-Day LinkedIn Brand Training: A <span className={styles.italicHighlight}>proven framework</span> to build a successful personal brand.
            </h1>
          </FadeIn>

          {/* Image Banner with Lime/Mint Halo Glow */}
          <FadeIn delay={0.15}>
            <div className={styles.imageCardWrapper}>
              <div className={styles.imageGlow} />
              <div className={styles.imageCard}>
                <img
                  src="/images/tino/banners/Banner 1.png"
                  alt="Tino LinkedIn Personal Brand Training"
                  className={styles.bannerImage}
                />
              </div>
            </div>
          </FadeIn>

          {/* Form & Notice Container */}
          <FadeIn delay={0.25}>
            <div className={styles.formContainer}>
              {/* Plus Text */}
              <p className={styles.plusNotice}>
                <strong className={styles.plusTag}>Plus:</strong> join 140+ founders getting tactical daily notes on personal brand building, profile positioning, and inbound conversion (unsubscribe anytime).
              </p>

              {status === 'success' ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>🎉</div>
                  <h3 className={styles.successTitle}>You&#39;re in!</h3>
                  <p className={styles.successDesc}>
                    Your free training notes have been sent to <strong>{email}</strong>. While you check your inbox, explore Tino's plug-and-play visual kit:
                  </p>
                  <a href="/checkout" className="btn-primary" style={{ marginTop: '1.25rem', display: 'inline-block' }}>
                    Get Tino's Authority Kit™ ($47) Now →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.leadForm} suppressHydrationWarning>
                  <input
                    type="text"
                    name="fields[first_name]"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.inputField}
                    autoComplete="name"
                    suppressHydrationWarning
                  />
                  <input
                    type="email"
                    name="email_address"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                    autoComplete="email"
                    suppressHydrationWarning
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={styles.submitBtn}
                    suppressHydrationWarning
                  >
                    {status === 'submitting' ? 'Unlocking Access...' : 'Unlock Free 7-Day Training →'}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
