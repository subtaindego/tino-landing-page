"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { clientConfig } from '../../config/client.config';
import styles from './page.module.css';

// 7 Core Menu Sections:
// - 1 Intro Section (20%)
// - 4 Video Breakdown Lessons (20% each = 80%)
// -> Intro + 4 Lessons = EXACTLY 100% at Lesson 4!
// - 1 Blueprint Guide (BONUS - does not block 100%)
// - 1 Upgrade to 1:1 (VIP Consultation)
const TABS_CONFIG = [
  {
    id: "intro",
    num: "01",
    navLabel: "01  Intro Section",
    tag: "01 / ORIENTATION",
    stepIndex: 1,
    totalSteps: 5,
    title: "Welcome to LinkedIn Personal Branding Training",
    subtitle: "Watch this fast-track orientation video before diving into the core implementation lessons.",
    videoUrl: "https://www.youtube.com/embed/ptvxcjmMaZI?rel=0&modestbranding=1",
    weight: 20,
    type: "video",
    nextTabId: "breakdown-1",
    prevTabId: null
  },
  {
    id: "breakdown-1",
    num: "02",
    navLabel: "02  Video Breakdown 1",
    tag: "02 / LESSON 1: POSITIONING",
    stepIndex: 2,
    totalSteps: 5,
    title: "Profile Positioning & The 3-Second Rule",
    subtitle: "Position yourself as the undisputed top 1% authority in your niche before prospects even scroll.",
    videoUrl: "https://www.youtube.com/embed/ptvxcjmMaZI?rel=0&modestbranding=1",
    weight: 20,
    type: "video",
    nextTabId: "breakdown-2",
    prevTabId: "intro"
  },
  {
    id: "breakdown-2",
    num: "03",
    navLabel: "03  Video Breakdown 2",
    tag: "03 / LESSON 2: VISUAL ASSETS",
    stepIndex: 3,
    totalSteps: 5,
    title: "Implementation Video Breakdown: High-Authority Visuals",
    subtitle: "Follow the step-by-step visual design breakdown to build your high-converting LinkedIn assets.",
    videoUrl: "https://www.youtube.com/embed/ptvxcjmMaZI?rel=0&modestbranding=1",
    weight: 20,
    type: "video",
    nextTabId: "breakdown-3",
    prevTabId: "breakdown-1"
  },
  {
    id: "breakdown-3",
    num: "04",
    navLabel: "04  Video Breakdown 3",
    tag: "04 / LESSON 3: CONTENT & INBOUND",
    stepIndex: 4,
    totalSteps: 5,
    title: "Viral Content Creation & Inbound DM Conversion",
    subtitle: "Drive qualified profile traffic on autopilot and convert post comments into high-ticket clients.",
    videoUrl: "https://www.youtube.com/embed/ptvxcjmMaZI?rel=0&modestbranding=1",
    weight: 20,
    type: "video",
    nextTabId: "breakdown-4",
    prevTabId: "breakdown-2"
  },
  {
    id: "breakdown-4",
    num: "05",
    navLabel: "05  Video Breakdown 4",
    tag: "05 / LESSON 4: MONETIZATION",
    stepIndex: 5,
    totalSteps: 5,
    title: "Profile Monetization & High-Ticket Offer Architecture",
    subtitle: "Structure your featured section, offer links, and conversion pathways to close 4-figure deals.",
    videoUrl: "https://www.youtube.com/embed/ptvxcjmMaZI?rel=0&modestbranding=1",
    weight: 20,
    type: "video",
    isFinalStep: true,
    nextTabId: "blueprint",
    prevTabId: "breakdown-3"
  },
  {
    id: "blueprint",
    num: "06",
    navLabel: "06  Blueprint Guide",
    tag: "06 / BONUS BLUEPRINT GUIDE",
    isBonus: true,
    title: "Official Brand Blueprints & Asset Downloads",
    subtitle: "Download your complete style documentation, swipe files, and plug-and-play Canva templates.",
    type: "blueprint",
    nextTabId: "upgrade",
    prevTabId: "breakdown-4",
    resources: [
      {
        title: "Tino's Personal Brand Style Blueprint (PDF)",
        desc: "Comprehensive 24-page master guide covering color psychology, font pairings, contrast ratios, and safe zones.",
        fileUrl: "/images/tino/carousels/Linkedin Carousel Template for upload.pdf",
        fileName: "Tino_LinkedIn_Brand_Blueprint.pdf",
        size: "24 Pages • High Resolution PDF",
        tag: "Master Guide"
      },
      {
        title: "Plug & Play Canva Template Pack",
        desc: "Instant access to 10+ banners, 10+ featured sections, and 15+ carousel slide decks ready to customize in Canva.",
        fileUrl: "https://www.canva.com",
        fileName: "Canva_Templates_Access",
        size: "100% Plug & Play Canva Links",
        tag: "Canva Templates",
        isExternal: true
      },
      {
        title: "50+ Scroll-Stopping Post Hooks Swipe File",
        desc: "Curated collection of high-converting post openers tested across 140+ creator campaigns to maximize reach.",
        fileUrl: "/images/tino/tweets/Tweet post 1.png",
        fileName: "50_Viral_Post_Hooks.png",
        size: "50+ Proven Viral Hooks",
        tag: "Swipe File"
      },
      {
        title: "High-Resolution Icon & Accent Vector Pack",
        desc: "Clean PNG badges, verified checkmarks, glowing gradient arrows, and frame accents to drop into your designs.",
        fileUrl: "/images/tino/features/Feature Section 1.png",
        fileName: "Authority_Asset_Pack.png",
        size: "40+ Clean Vector Elements",
        tag: "Asset Pack"
      }
    ]
  },
  {
    id: "upgrade",
    num: "07",
    navLabel: "07  Upgrade to 1:1",
    tag: "07 / VIP CONSULTATION",
    isBonus: true,
    title: "Work Directly with Tino — Bespoke Branding & Mentorship",
    subtitle: "Fast-track your authority with custom visual identity design and private 1:1 consulting.",
    type: "upgrade",
    prevTabId: "blueprint",
    upgrades: [
      {
        id: "call",
        badge: "Private Consultation",
        isFeatured: false,
        title: "1:1 Brand Strategy Call",
        desc: "A 40-minute intensive deep dive with Tino to audit your profile positioning, optimize your headline, and map out your 90-day client acquisition funnel.",
        features: [
          "Complete profile & positioning audit",
          "Custom headline & bio refinement live on call",
          "Content strategy & posting schedule roadmap",
          "Full call recording + action step summary"
        ],
        ctaText: "Schedule 1:1 Strategy Call →",
        ctaUrl: "https://cal.com/authoritykit/discovery-call"
      },
      {
        id: "dfy",
        badge: "Most Popular • Done-For-You",
        isFeatured: true,
        title: "Bespoke Profile Branding",
        desc: "Let Tino design your entire personal brand visual identity from scratch. You get custom 3D banners, bespoke featured funnels, and signature carousel templates.",
        features: [
          "100% custom-designed LinkedIn banner",
          "Bespoke Featured Section 3-card client funnel",
          "Signature 10-slide carousel template in your brand identity",
          "Mobile & desktop pixel-perfect optimization",
          "2 rounds of revisions & direct WhatsApp support"
        ],
        ctaText: "Inquire via WhatsApp VIP Concierge →",
        ctaUrl: "https://wa.me/447700900123"
      },
      {
        id: "accelerator",
        badge: "Full Mentorship",
        isFeatured: false,
        title: "90-Day Authority Mentorship",
        desc: "Comprehensive 1:1 personal brand mentorship with Tino to take your brand from under-the-radar to top 1% authority generating $10k+/month.",
        features: [
          "Full Done-For-You visual identity & profile redesign",
          "Weekly 1:1 strategy calls & ongoing content review",
          "Inbound DM closing system & sales call review",
          "Unlimited 24/7 private WhatsApp VIP access"
        ],
        ctaText: "Apply for Mentorship →",
        ctaUrl: "https://wa.me/447700900123"
      }
    ]
  }
];

// Core 5 steps (Intro + 4 Breakdowns) = 20% each = 100%
const CORE_STEPS = ["intro", "breakdown-1", "breakdown-2", "breakdown-3", "breakdown-4"];
const STEP_WEIGHT = 20;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("intro");
  const [completedTabs, setCompletedTabs] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const confettiCanvasRef = useRef(null);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('tino_dashboard_completed_tabs_v4');
      if (saved) {
        setCompletedTabs(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore private browsing storage errors
    }
  }, []);

  // Switch tab manually
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Mark step complete seamlessly (NO toast, NO separate pop buttons)
  const handleMarkComplete = (tabId, nextTabId) => {
    let updated;
    const isAlreadyDone = completedTabs.includes(tabId);
    if (isAlreadyDone) {
      updated = completedTabs;
    } else {
      updated = [...completedTabs, tabId];
      setCompletedTabs(updated);
      try {
        localStorage.setItem('tino_dashboard_completed_tabs_v4', JSON.stringify(updated));
      } catch (e) {}
    }

    // Check if 100% reached on Lesson 4
    const completedCoreCount = updated.filter(id => CORE_STEPS.includes(id)).length;
    const isNow100 = completedCoreCount >= CORE_STEPS.length;

    if (isNow100 && tabId === "breakdown-4") {
      setTimeout(() => {
        setShowCelebration(true);
      }, 300);
    } else if (nextTabId) {
      setTimeout(() => {
        setActiveTab(nextTabId);
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 350);
    }
  };

  // Confetti Particle Celebration Animation
  useEffect(() => {
    if (!showCelebration) return;

    const canvas = confettiCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#51f8aa', '#3de698', '#38bdf8', '#fbbf24', '#f43f5e', '#a855f7', '#ffffff'];
    const particleCount = 130;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2.5,
      speedX: (Math.random() - 0.5) * 3.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      w: Math.random() * 11 + 6,
      h: Math.random() * 7 + 4
    }));

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [showCelebration]);

  // Listen for YouTube video completion via IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    let playerInstance = null;

    const setupPlayer = () => {
      const iframeId = `yt-player-${activeTab}`;
      const el = document.getElementById(iframeId);
      if (!el || !window.YT || !window.YT.Player) return;

      try {
        playerInstance = new window.YT.Player(iframeId, {
          events: {
            onStateChange: (event) => {
              // 0 = YT.PlayerState.ENDED
              if (event.data === 0) {
                const current = TABS_CONFIG.find((t) => t.id === activeTab);
                if (current && !completedTabs.includes(current.id)) {
                  handleMarkComplete(current.id, current.nextTabId);
                }
              }
            }
          }
        });
      } catch (err) {
        // Player setup fail-safe
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      window.onYouTubeIframeAPIReady = setupPlayer;
    }

    return () => {
      if (playerInstance && playerInstance.destroy) {
        try { playerInstance.destroy(); } catch (e) {}
      }
    };
  }, [activeTab, completedTabs]);

  // Dynamic progress calculation: 5 core steps * 20% = 100%
  const completedCoreCount = isMounted
    ? completedTabs.filter((id) => CORE_STEPS.includes(id)).length
    : 0;
  const progressPercent = Math.min(100, completedCoreCount * STEP_WEIGHT);

  // Active Tab Configuration
  const currentTab = TABS_CONFIG.find((t) => t.id === activeTab) || TABS_CONFIG[0];
  const isCurrentDone = completedTabs.includes(currentTab.id);

  // Clean share URLs
  const linkedInShareText = "Just completed the LinkedIn Authority Kit™ by @Tino! 🚀 Reframed my positioning, visual identity, and inbound personal brand engine. Excited to attract high-ticket clients.";
  const linkedInShareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(linkedInShareText)}`;
  const feedbackWhatsAppUrl = `https://wa.me/447700900123?text=${encodeURIComponent("Hey Tino! I just completed the LinkedIn Authority Kit™ with 100% progress 🎉. Here is my profile link for your review. Would love your quick feedback on my new positioning!")}`;

  return (
    <div className={styles.dashboardShell}>
      <div className={styles.ambientGlow} />

      {/* ================= CELEBRATION OVERLAY & EXACTLY 2 BUTTONS ================= */}
      {showCelebration && (
        <div className={styles.celebrationOverlay} onClick={() => setShowCelebration(false)}>
          {/* 60FPS Confetti Canvas Animation */}
          <canvas ref={confettiCanvasRef} className={styles.confettiCanvas} />

          {/* Minimalist Celebration Card (NO Clutter, Just 2 Buttons) */}
          <div className={styles.celebrationCleanCard} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.celebrationClose}
              onClick={() => setShowCelebration(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className={styles.celebrationEmoji}>🎉</div>
            <h2 className={styles.celebrationMainTitle}>100% Completed!</h2>
            <p className={styles.celebrationSubTitle}>
              Congratulations! You've mastered all lessons in the LinkedIn Authority Kit™.
            </p>

            {/* EXACTLY 2 BUTTONS & NOTHING ELSE */}
            <div className={styles.celebrationTwoButtonsRow}>
              <a
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareLinkedInBtn}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Share on LinkedIn
              </a>

              <a
                href={feedbackWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.getFeedbackBtn}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                Get Feedback
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= STATIC LEFT SIDEBAR ================= */}
      <aside className={styles.sidebar}>
        <div>
          {/* Brand Logo */}
          <Link href="/" className={styles.brandLink}>
            <span className={styles.brandMain}>LinkedIn</span>
            <span className={styles.brandSub}>AUTHORITY KIT™</span>
          </Link>

          {/* 7 Menu Items: 1 Intro, 4 Video Breakdowns, 1 Blueprint Guide (Bonus), 1 Upgrade to 1:1 */}
          <nav className={styles.navStack} aria-label="Course Navigation">
            {TABS_CONFIG.map((tab) => {
              const isActive = activeTab === tab.id;
              const isDone = completedTabs.includes(tab.id);

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                >
                  <span className={styles.itemTitle}>{tab.navLabel}</span>
                  {isDone ? (
                    <span className={`${styles.completedCheck} ${isActive ? styles.completedCheckActive : ''}`}>
                      ✓
                    </span>
                  ) : tab.isBonus ? (
                    <span className={`${styles.bonusBadge} ${isActive ? styles.bonusBadgeActive : ''}`}>
                      BONUS
                    </span>
                  ) : (
                    <span className={`${styles.weightBadge} ${isActive ? styles.weightBadgeActive : ''}`}>
                      +{tab.weight}%
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Need Help? Widget */}
        <div className={styles.sidebarHelpCard}>
          <div className={styles.helpLabel}>Need Help?</div>
          <a
            href={clientConfig.profile.whatsapp || "https://wa.me/447700900123"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.helpLink}
          >
            Message Tino →
          </a>
          <div className={styles.socialIconsRow}>
            <a
              href={clientConfig.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialSquareBtn}
              title="LinkedIn"
              aria-label="Tino LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href={clientConfig.profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialSquareBtn}
              title="Instagram"
              aria-label="Tino Instagram"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href={`mailto:${clientConfig.profile.email}`}
              className={styles.socialSquareBtn}
              title="Email Tino"
              aria-label="Email Tino"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </aside>

      {/* ================= RIGHT MAIN ISOLATED TAB VIEW ================= */}
      <main className={styles.mainContent}>
        {/* Top Sticky Progress Header Card */}
        <div className={styles.progressStickyWrapper}>
          <div className={styles.progressHeaderCard}>
            <div className={styles.progressLabelGroup}>
              <span className={styles.progressHeaderLabel}>YOUR PROGRESS</span>
              <span className={styles.progressStepsFraction}>
                {completedCoreCount} of {CORE_STEPS.length} Lessons Completed
              </span>
            </div>

            <div className={styles.progressBarTrack}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className={styles.progressRightCol}>
              <span className={styles.progressPercentText}>{progressPercent}% Complete</span>
            </div>
          </div>
        </div>

        {/* DEDICATED SINGLE-TAB VIEW */}
        <div key={currentTab.id} className={styles.tabViewContainer}>
          {/* Header Row */}
          <div className={styles.moduleHeaderRow}>
            <div className={styles.moduleMeta}>
              <span className={styles.moduleBreadcrumb}>{currentTab.tag}</span>
              <h1 className={styles.moduleTitle}>{currentTab.title}</h1>
              <p className={styles.moduleSubtitle}>{currentTab.subtitle}</p>
            </div>
            <div
              className={`${styles.statusBadge} ${isCurrentDone ? styles.statusBadgeDone : styles.statusBadgePending}`}
            >
              {isCurrentDone ? "✓ Completed" : (currentTab.isBonus ? "Bonus Guide" : `+${currentTab.weight}% Progress`)}
            </div>
          </div>

          {/* ================= VIEW 1: VIDEO LESSON VIEW (Intro & 4 Breakdowns) ================= */}
          {currentTab.type === "video" && (
            <div className={styles.videoTabBody}>
              {/* Clean Widescreen Video Player */}
              <div className={styles.videoWrapper}>
                <iframe
                  id={`yt-player-${currentTab.id}`}
                  className={styles.videoIframe}
                  src={`${currentTab.videoUrl}&enablejsapi=1`}
                  title={`${currentTab.title} Walkthrough`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* SINGLE UNIFIED MARKING ACTION BAR */}
              <div className={styles.premiumActionBar}>
                {/* Left Step Meta */}
                <div className={styles.actionLeftMeta}>
                  <div className={styles.actionStepBadge}>
                    STEP {currentTab.stepIndex} OF {currentTab.totalSteps}
                  </div>
                  <div className={styles.actionStatusIndicator}>
                    <span className={`${styles.statusDot} ${isCurrentDone ? styles.statusDotDone : ''}`} />
                    <span className={styles.statusDescription}>
                      {isCurrentDone ? (
                        <strong>✓ Completed (+{currentTab.weight}% saved)</strong>
                      ) : (
                        <span>Mark as complete to add <strong>+{currentTab.weight}%</strong> to your progress</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Right Action */}
                <div className={styles.actionBtnCluster}>
                  {currentTab.prevTabId && (
                    <button
                      type="button"
                      onClick={() => handleTabChange(currentTab.prevTabId)}
                      className={styles.prevNavBtn}
                    >
                      ← Previous
                    </button>
                  )}

                  {/* Single Unified Primary Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!isCurrentDone) {
                        handleMarkComplete(currentTab.id, currentTab.nextTabId);
                      } else if (currentTab.nextTabId) {
                        handleTabChange(currentTab.nextTabId);
                      }
                    }}
                    className={`${styles.markPrimaryBtn} ${isCurrentDone ? styles.markCompletedBtn : ''} ${currentTab.isFinalStep && !isCurrentDone ? styles.markFinalBtn : ''}`}
                  >
                    {isCurrentDone ? (
                      <>
                        <span className={styles.checkIcon}>✓</span>
                        <span>
                          {currentTab.isFinalStep ? "Completed • View Blueprints →" : "Completed • Next Lesson →"}
                        </span>
                      </>
                    ) : currentTab.isFinalStep ? (
                      <>Complete 100% & Finish 🎉</>
                    ) : (
                      <>Mark as Complete (+{currentTab.weight}%) & Next →</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: BLUEPRINT GUIDE TAB (BONUS) ================= */}
          {currentTab.type === "blueprint" && (
            <div className={styles.blueprintTabBody}>
              <div className={styles.bonusBannerNotice}>
                <span className={styles.bonusBannerIcon}>🎁</span>
                <div>
                  <h3 className={styles.bonusBannerTitle}>Bonus Authority Assets & Blueprints</h3>
                  <p className={styles.bonusBannerDesc}>
                    These are exclusive bonus downloads to accompany your 4 video breakdown lessons. Download all guides below.
                  </p>
                </div>
              </div>

              <div className={styles.blueprintGrid}>
                {currentTab.resources.map((res, idx) => (
                  <div key={idx} className={styles.blueprintCard}>
                    <div className={styles.blueprintCardTop}>
                      <span className={styles.blueprintCardTag}>{res.tag}</span>
                      <h3 className={styles.blueprintCardTitle}>{res.title}</h3>
                      <p className={styles.blueprintCardDesc}>{res.desc}</p>
                    </div>

                    <div className={styles.blueprintCardFooter}>
                      <span className={styles.blueprintCardSize}>{res.size}</span>
                      {res.isExternal ? (
                        <a
                          href={res.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.downloadBtn}
                        >
                          Open in Canva ↗
                        </a>
                      ) : (
                        <a
                          href={res.fileUrl}
                          download={res.fileName}
                          className={styles.downloadBtn}
                        >
                          Download Asset ↓
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Action Bar for Blueprints */}
              <div className={styles.premiumActionBar} style={{ marginTop: '2.5rem' }}>
                <div className={styles.actionLeftMeta}>
                  <div className={styles.actionStepBadge}>BONUS RESOURCE</div>
                  <div className={styles.actionStatusIndicator}>
                    <span className={styles.statusDotDone} />
                    <span className={styles.statusDescription}>
                      All 4 lessons completed (100%). You have unlocked the bonus library.
                    </span>
                  </div>
                </div>

                <div className={styles.actionBtnCluster}>
                  <button
                    type="button"
                    onClick={() => handleTabChange("breakdown-4")}
                    className={styles.prevNavBtn}
                  >
                    ← Back to Lesson 4
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange("upgrade")}
                    className={styles.markPrimaryBtn}
                  >
                    Explore 1:1 Mentorship →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 3: UPGRADE TO 1:1 TAB ================= */}
          {currentTab.type === "upgrade" && (
            <div className={styles.upgradeTabBody}>
              <div className={styles.upgradeGrid}>
                {currentTab.upgrades.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.upgradeCard} ${item.isFeatured ? styles.upgradeCardFeatured : ''}`}
                  >
                    <div>
                      <span className={`${styles.upgradeBadge} ${!item.isFeatured ? styles.upgradeBadgeOutline : ''}`}>
                        {item.badge}
                      </span>
                      <h3 className={styles.upgradeTitle}>{item.title}</h3>
                      <p className={styles.upgradeDesc}>{item.desc}</p>

                      <div className={styles.upgradeFeaturesList}>
                        {item.features.map((feat, fIdx) => (
                          <div key={fIdx} className={styles.upgradeFeatureItem}>
                            <span className={styles.upgradeFeatureCheck}>✓</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={item.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.upgradeCtaBtn} ${!item.isFeatured ? styles.upgradeCtaBtnOutline : ''}`}
                    >
                      {item.ctaText}
                    </a>
                  </div>
                ))}
              </div>

              {/* Bottom Navigation */}
              <div className={styles.premiumActionBar} style={{ marginTop: '2.5rem' }}>
                <div className={styles.actionLeftMeta}>
                  <div className={styles.actionStepBadge}>VIP CONCIERGE</div>
                  <div className={styles.actionStatusIndicator}>
                    <span className={styles.statusDotDone} />
                    <span className={styles.statusDescription}>
                      Direct VIP line to Tino for 1:1 strategy and bespoke design.
                    </span>
                  </div>
                </div>

                <div className={styles.actionBtnCluster}>
                  <button
                    type="button"
                    onClick={() => handleTabChange("blueprint")}
                    className={styles.prevNavBtn}
                  >
                    ← Back to Blueprints
                  </button>
                  <a
                    href={clientConfig.profile.whatsapp || "https://wa.me/447700900123"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.markPrimaryBtn}
                  >
                    Chat with Tino on WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
