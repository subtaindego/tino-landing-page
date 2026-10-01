"use client";

import { useState } from 'react';
import { clientConfig } from '../../config/client.config';
import FadeIn from '../../components/FadeIn';
import RatingBadge from '../../components/RatingBadge';
import styles from './page.module.css';

export default function SwipeMyTrainingPage() {
  const { newsletter, theme } = clientConfig;
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.target);

    try {
      await fetch(newsletter.formAction, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      setStatus('success');
    } catch (err) {
      // Even if blocked by CORS, simulate success for demo
      setTimeout(() => {
        setStatus('success');
      }, 600);
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.ambientGlow} />

      <div className="container">
        <FadeIn>
          <div className={`glass-card ${styles.contentBox}`}>
            <div className={styles.topLabel}>
              <span className="pill-badge">{newsletter.videoDurationLabel}</span>
            </div>

            <h1 className={styles.headline}>
              Free 7-Day LinkedIn Brand Training: A <span className={styles.accentText}>proven framework</span> to build a successful personal brand.
            </h1>

            <p className={styles.subtext}>
              {newsletter.subtext}
            </p>

            {/* Video / Thumbnail preview frame */}
            <div className={styles.thumbnailContainer}>
              <img 
                src={newsletter.thumbnailUrl} 
                alt="Free Training Thumbnail" 
                className={styles.thumbnail}
              />
              <div className={styles.playOverlay}>
                <div className={styles.playButton}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <span className={styles.playText}>Instant Video Unlock On Next Page</span>
              </div>
            </div>

            {/* Form Section */}
            <div className={styles.formContainer}>
              {status === 'success' ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>🎉</div>
                  <h3 className={styles.successTitle}>You&#39;re in, {name || "friend"}!</h3>
                  <p className={styles.successDesc}>
                    Check your email inbox (and spam just in case) for your direct access link. Or jump straight into the kit:
                  </p>
                  <a href="/checkout" className="btn-primary" style={{ marginTop: '1.25rem' }}>
                    Get Tino's Authority Kit™ ($47) Now →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <input 
                      name="fields[first_name]" 
                      type="text" 
                      placeholder="Your First Name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                      className={styles.input}
                    />
                    <input 
                      name="email_address" 
                      type="email" 
                      placeholder="Your Best Email Address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      className={styles.input}
                    />
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className={`btn-primary ${styles.submitBtn}`}>
                    {status === 'submitting' ? 'Unlocking Training...' : 'Unlock Free 7-Day Training →'}
                  </button>
                  <p className={styles.privacyNote}>
                    🔒 100% privacy. No spam. One-click unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>

            <div className={styles.badgeFooter}>
              <RatingBadge />
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
