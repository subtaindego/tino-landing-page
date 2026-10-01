"use client";

import { useState, useEffect } from 'react';
import { clientConfig } from '../../config/client.config';
import FadeIn from '../../components/FadeIn';
import styles from './page.module.css';

export default function LinksPage() {
  const { profile, linksPage, theme } = clientConfig;
  
  // Data resolution matching inspiration layout
  const creatorName = linksPage?.name || profile?.name || theme?.clientName || "Tino";
  const creatorLocation = linksPage?.location || "London, UK / Global";
  const creatorRole = linksPage?.role || "Personal Brand & LinkedIn Strategist";
  const creatorBio = linksPage?.bio || profile?.bio || "Building top 1% personal brands on LinkedIn. I help founders, consultants, and creators build visual authority that commands high fees.";
  const statsText = linksPage?.statsText || "Trusted by 140+ founders & creators";
  const avatarUrl = linksPage?.avatarUrl || profile?.avatarUrl || "/images/tino/tino.png";
  
  const proofAvatars = linksPage?.proofAvatars || [
    "/images/dummy/avatar1.jpg",
    "/images/dummy/avatar2.jpg",
    "/images/dummy/avatar3.jpg",
    "/images/dummy/avatar4.jpg",
    "/images/dummy/avatar5.jpg"
  ];

  const leadMagnet = linksPage?.leadMagnet || {
    headline: "140+ CREATORS ALREADY ENROLLED:",
    subtext: "Get my free 7-day training on personal brand building, visual positioning, and profile conversion.",
    buttonText: "GET FREE TRAINING ⚡"
  };

  const cards = linksPage?.cards || [
    {
      id: "free-training",
      icon: "zap",
      badge: "⚡ Free 7-Day Training",
      title: "LinkedIn Brand Training",
      description: "Step-by-step masterclass to build an authoritative personal brand and attract clients on autopilot.",
      ctaText: "Start Free Training →",
      url: "/swipemytraining"
    },
    {
      id: "authority-kit",
      icon: "box",
      badge: "🚀 Launch Special $47",
      title: "LinkedIn Authority Kit™",
      description: "Plug-and-play Canva templates and visual framework to instantly look like a top 1% authority.",
      ctaText: "Get Authority Kit ($47) →",
      url: "/checkout"
    },
    {
      id: "linkedin-branding",
      icon: "layers",
      badge: "⭐ Done-For-You",
      title: "Bespoke Profile Branding",
      description: "Custom visual identity and profile architecture tailored specifically for high-growth founders and executives.",
      ctaText: "Explore Visual System →",
      url: "/authority-kit"
    },
    {
      id: "discovery-call",
      icon: "calendar",
      badge: "📞 1-on-1 Call",
      title: "1:1 Brand Strategy Call",
      description: "40-minute private consultation with Tino to audit your brand positioning and client acquisition funnel.",
      ctaText: "Schedule Session →",
      url: "https://cal.com/authoritykit/discovery-call"
    }
  ];

  const socialLinks = linksPage?.socialLinks || [
    { name: "LinkedIn", url: profile?.linkedin || "https://www.linkedin.com", icon: "linkedin" },
    { name: "Instagram", url: profile?.instagram || "https://instagram.com", icon: "instagram" },
    { name: "WhatsApp", url: profile?.whatsapp || "https://wa.me/923000000000", icon: "whatsapp" },
    { name: "Calendar", url: profile?.calBookingUrl || "https://cal.com", icon: "calendar" },
    { name: "Website", url: "/", icon: "globe" }
  ];

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!userEmail) return;
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 700);
  };

  const renderCardIcon = (iconName) => {
    switch (iconName) {
      case 'zap':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        );
      case 'layers':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        );
      case 'box':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        );
      case 'calendar':
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        );
    }
  };

  const renderSocialIcon = (iconName) => {
    switch (iconName) {
      case 'linkedin':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'whatsapp':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        );
      case 'calendar':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        );
      case 'globe':
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        );
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.ambientGlow} />

      <div className="container" style={{ maxWidth: '1240px' }}>
        <div className={styles.layoutSplit}>
          
          {/* ================= LEFT COLUMN: PROFILE & LEAD CAPTURE ================= */}
          <aside className={styles.profileColumn}>
            <FadeIn>
              <div className={styles.profileCard}>
                
                {/* Creator Avatar (Squircle with vibrant glowing border) */}
                <div className={styles.avatarSquircle}>
                  <img 
                    src={avatarUrl} 
                    alt={creatorName}
                    className={styles.avatarImg}
                    onError={(e) => {
                      e.currentTarget.src = "/images/tino/tino.png";
                    }}
                  />
                </div>

                {/* Creator Name */}
                <h1 className={styles.creatorName}>{creatorName}</h1>

                {/* Location & Title Line */}
                <div className={styles.locationTitleRow}>
                  <span className={styles.locItem}>📍 {creatorLocation}</span>
                  <span className={styles.dotSeparator}>•</span>
                  <span className={styles.roleItem}>🎨 {creatorRole}</span>
                </div>

                {/* Social Proof Row (5 overlapping avatars + stars + counter) */}
                <div className={styles.proofRow}>
                  <div className={styles.avatarStack}>
                    {proofAvatars.slice(0, 5).map((imgSrc, i) => (
                      <img 
                        key={i} 
                        src={imgSrc} 
                        alt="Founder" 
                        className={styles.proofAvatar}
                        style={{ zIndex: 10 - i }}
                      />
                    ))}
                  </div>
                  <div className={styles.proofInfo}>
                    <div className={styles.stars}>★★★★★</div>
                    <div className={styles.proofText}>{statsText}</div>
                  </div>
                </div>

                {/* Bio Description */}
                <p className={styles.bioText}>{creatorBio}</p>

                {/* Lead Capture Opt-In Form Box */}
                <div className={styles.optinBox} suppressHydrationWarning>
                  <div className={styles.optinHeadline}>{leadMagnet.headline}</div>
                  <p className={styles.optinSubtext}>{leadMagnet.subtext}</p>

                  {formStatus === 'success' ? (
                    <div className={styles.successMessage}>
                      🎉 You're in! Check your inbox for instant access.
                    </div>
                  ) : (
                    <form 
                      onSubmit={handleLeadSubmit} 
                      className={styles.optinForm}
                      suppressHydrationWarning
                    >
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={styles.formInput}
                        suppressHydrationWarning
                        autoComplete="name"
                      />
                      <input 
                        type="email" 
                        required 
                        placeholder="Email Address" 
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className={styles.formInput}
                        suppressHydrationWarning
                        autoComplete="email"
                      />
                      <button 
                        type="submit" 
                        className={styles.submitBtn}
                        suppressHydrationWarning
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? 'Processing...' : leadMagnet.buttonText}
                      </button>
                    </form>
                  )}
                </div>

                {/* Social Icon Buttons Row */}
                <div className={styles.socialBar}>
                  {socialLinks.map((soc, idx) => (
                    <a 
                      key={idx}
                      href={soc.url}
                      target={soc.url.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={styles.socialSquareBtn}
                      title={soc.name}
                      aria-label={soc.name}
                    >
                      {renderSocialIcon(soc.icon)}
                    </a>
                  ))}
                </div>

              </div>
            </FadeIn>
          </aside>

          {/* ================= RIGHT COLUMN: 2x2 GRID OF LINK CARDS ================= */}
          <section className={styles.cardsColumn}>
            <div className={styles.cardsGrid}>
              {cards.map((card, idx) => (
                <FadeIn key={card.id || idx} delay={0.08 + idx * 0.06}>
                  <a 
                    href={card.url}
                    className={styles.featureCard}
                    target={card.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                  >
                    <div className={styles.cardHoverGlow} />

                    {/* Top Row: Icon Box & Category Badge */}
                    <div className={styles.cardHeaderRow}>
                      <div className={styles.cardIconBox}>
                        {renderCardIcon(card.icon)}
                      </div>
                      <div className={styles.cardBadge}>
                        {card.badge}
                      </div>
                    </div>

                    {/* Middle: Title & Description */}
                    <div className={styles.cardBody}>
                      <h2 className={styles.cardTitle}>{card.title}</h2>
                      <p className={styles.cardDesc}>{card.description}</p>
                    </div>

                    {/* Bottom: Accent Link with Arrow */}
                    <div className={styles.cardCtaRow}>
                      <span className={styles.cardCtaText}>{card.ctaText}</span>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
