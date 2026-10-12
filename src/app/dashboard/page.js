"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { clientConfig } from '../../config/client.config';
import styles from './page.module.css';

const DEFAULT_VIDEO = "https://www.youtube.com/embed/ptvxcjmMaZI?enablejsapi=1&rel=0&modestbranding=1";

const MODULES_CONFIG = [
  {
    id: "overview",
    num: "00",
    navLabel: "00  Welcome & Overview",
    tag: "START HERE",
    title: "The LinkedIn Brand Blueprint",
    subtitle: "A step-by-step workbook that ends with a 3-month strategy and a 30-day posting plan. By Tino, Personal Brand and LinkedIn Strategist.",
    videoUrl: DEFAULT_VIDEO,
    nextId: "mod-1",
    prevId: null
  },
  {
    id: "mod-1",
    num: "01",
    navLabel: "01  How LinkedIn Works",
    tag: "MODULE 1 / PLATFORM",
    title: "Module 1: How LinkedIn actually works",
    subtitle: "What you need to know about the platform before your first post.",
    videoUrl: DEFAULT_VIDEO,
    nextId: "mod-2",
    prevId: "overview"
  },
  {
    id: "mod-2",
    num: "02",
    navLabel: "02  Clarity & Goals",
    tag: "MODULE 2 / POSITIONING",
    title: "Module 2: Clarity",
    subtitle: "Confidence comes from knowing what you're good at. The rest becomes clear once you start posting.",
    videoUrl: DEFAULT_VIDEO,
    nextId: "mod-3",
    prevId: "mod-1"
  },
  {
    id: "mod-3",
    num: "03",
    navLabel: "03  Your Profile",
    tag: "MODULE 3 / CONVERSION",
    title: "Module 3: Your profile",
    subtitle: "Your profile turns curious people into followers, connections, and clients.",
    videoUrl: DEFAULT_VIDEO,
    nextId: "mod-4",
    prevId: "mod-2"
  },
  {
    id: "mod-4",
    num: "04",
    navLabel: "04  What to Post",
    tag: "MODULE 4 / PILLARS",
    title: "Module 4: What to post",
    subtitle: "A simple system for having a post idea ready every day.",
    videoUrl: DEFAULT_VIDEO,
    nextId: "mod-5",
    prevId: "mod-3"
  },
  {
    id: "mod-5",
    num: "05",
    navLabel: "05  How to Write",
    tag: "MODULE 5 / VIRAL WRITING",
    title: "Module 5: How to write",
    subtitle: "How to hook readers in the first line, tell a story, and leave them with a takeaway.",
    videoUrl: DEFAULT_VIDEO,
    nextId: "mod-6",
    prevId: "mod-4"
  },
  {
    id: "mod-6",
    num: "06",
    navLabel: "06  Engage & Network",
    tag: "MODULE 6 / GROWTH ENGINE",
    title: "Module 6: Engaging and networking",
    subtitle: "How commenting and connecting grow your audience faster than posting alone.",
    videoUrl: DEFAULT_VIDEO,
    nextId: "mod-7",
    prevId: "mod-5"
  },
  {
    id: "mod-7",
    num: "07",
    navLabel: "07  Ways to Get Paid",
    tag: "MODULE 7 / MONETIZATION",
    title: "Module 7: Ways to get paid",
    subtitle: "Three ways to earn income from your brand.",
    videoUrl: DEFAULT_VIDEO,
    nextId: "mod-8",
    prevId: "mod-6"
  },
  {
    id: "mod-8",
    num: "08",
    navLabel: "08  3-Month Strategy",
    tag: "MODULE 8 / BIG PICTURE",
    title: "Module 8: Your 3-month strategy",
    subtitle: "What each month is for, and how you'll know it's working.",
    videoUrl: DEFAULT_VIDEO,
    nextId: "mod-9",
    prevId: "mod-7"
  },
  {
    id: "mod-9",
    num: "09",
    navLabel: "09  30-Day Plan",
    tag: "MODULE 9 / EXECUTION",
    title: "Module 9: Your 30-day plan",
    subtitle: "20 posts over 4 weeks, with an hour of engagement every day.",
    videoUrl: DEFAULT_VIDEO,
    nextId: "resources",
    prevId: "mod-8"
  },
  {
    id: "resources",
    num: "10",
    navLabel: "10  Templates & Tools",
    tag: "RESOURCES / BONUS",
    isBonus: true,
    title: "Bonus Templates & Resources",
    subtitle: "Ready-made Canva templates, LinkGenie AI writer, and 1:1 strategy consultation.",
    videoUrl: DEFAULT_VIDEO,
    nextId: null,
    prevId: "mod-9"
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [watchedModules, setWatchedModules] = useState([]);
  const [autoAdvancing, setAutoAdvancing] = useState(false);
  const [answers, setAnswers] = useState({});
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [checklist, setChecklist] = useState({
    post: false,
    reply: false,
    comment: false,
    connect: false,
    note: false
  });

  const advanceTimerRef = useRef(null);

  // Load saved worksheet & watched module status on mount
  useEffect(() => {
    try {
      const savedWatched = localStorage.getItem('tino_blueprint_watched_modules');
      if (savedWatched) {
        // Ensure overview (intro) is unchecked
        const parsed = JSON.parse(savedWatched).filter(id => id !== 'overview');
        setWatchedModules(parsed);
        localStorage.setItem('tino_blueprint_watched_modules', JSON.stringify(parsed));
      }

      const savedAnswers = localStorage.getItem('tino_blueprint_worksheet_answers');
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));

      const savedChecklist = localStorage.getItem('tino_blueprint_daily_checklist');
      if (savedChecklist) setChecklist(JSON.parse(savedChecklist));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Load YouTube IFrame API script
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Listen to postMessage from YouTube iframe when video ends
  useEffect(() => {
    const handleMessage = (e) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        // YouTube PlayerState.ENDED is 0
        if (data?.event === 'onStateChange' && (data?.info === 0 || data?.info === '0')) {
          handleVideoCompleted(activeTab);
        }
      } catch (err) {}
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeTab]);

  // Bind YouTube Player API instance
  useEffect(() => {
    let checkInterval = null;

    const setupPlayer = () => {
      if (window.YT && window.YT.Player) {
        const iframe = document.getElementById("dashboard-video-iframe");
        if (iframe) {
          try {
            new window.YT.Player("dashboard-video-iframe", {
              events: {
                onStateChange: (event) => {
                  if (event.data === 0) { // ENDED
                    handleVideoCompleted(activeTab);
                  }
                }
              }
            });
          } catch (e) {}
        }
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkInterval);
          setupPlayer();
        }
      }, 500);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [activeTab]);

  const handleVideoCompleted = (completedTabId) => {
    // 1. Mark as watched and persist (excluding overview/intro)
    if (completedTabId !== 'overview') {
      setWatchedModules((prev) => {
        if (!prev.includes(completedTabId)) {
          const updated = [...prev, completedTabId];
          try {
            localStorage.setItem('tino_blueprint_watched_modules', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        }
        return prev;
      });
    }

    // 2. Auto advance to next module
    const current = MODULES_CONFIG.find(m => m.id === completedTabId);
    if (current && current.nextId) {
      setAutoAdvancing(true);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = setTimeout(() => {
        setActiveTab(current.nextId);
        setAutoAdvancing(false);
      }, 2000);
    }
  };

  const cancelAutoAdvance = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    setAutoAdvancing(false);
  };

  const toggleWatched = (moduleId) => {
    setWatchedModules((prev) => {
      const updated = prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId];
      try {
        localStorage.setItem('tino_blueprint_watched_modules', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleAnswerChange = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    try {
      localStorage.setItem('tino_blueprint_worksheet_answers', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleChecklistToggle = (key) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    try {
      localStorage.setItem('tino_blueprint_daily_checklist', JSON.stringify(updated));
    } catch (e) {}
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const currentModule = MODULES_CONFIG.find(m => m.id === activeTab) || MODULES_CONFIG[0];

  return (
    <div className={styles.dashboardShell}>
      <div className={styles.ambientGlow} />

      {/* ================= LEFT SIDEBAR ================= */}
      <aside className={styles.sidebar}>
        <div>
          {/* Brand Logo */}
          <Link href="/" className={styles.brandLink}>
            <span className={styles.brandMain}>Brand Blueprint</span>
            <span className={styles.brandSub}>TINO MASTERCLASS</span>
          </Link>

          {/* Modules Navigation Stack */}
          <nav className={styles.navStack} aria-label="Course Navigation">
            {MODULES_CONFIG.map((tab) => {
              const isActive = activeTab === tab.id;
              const isWatched = watchedModules.includes(tab.id);

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    cancelAutoAdvance();
                    setActiveTab(tab.id);
                  }}
                  className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                >
                  <span
                    className={styles.statusIconWrap}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatched(tab.id);
                    }}
                    role="button"
                    tabIndex={0}
                    title={isWatched ? "Click to uncheck" : "Click to mark as watched"}
                  >
                    {isWatched ? (
                      <span className={styles.statusCheck} title="Completed / Watched">✓</span>
                    ) : isActive ? (
                      <span className={styles.statusActiveDot} title="Current Module">●</span>
                    ) : (
                      <span className={styles.statusCircle} title="Not Watched">○</span>
                    )}
                  </span>
                  <span className={styles.itemTitle}>{tab.navLabel}</span>
                  {tab.isBonus && (
                    <span className={`${styles.bonusBadge} ${isActive ? styles.bonusBadgeActive : ''}`}>
                      BONUS
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: Support */}
        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarHelpCard}>
            <div className={styles.helpLabel}>Have Questions?</div>
            <a
              href="https://wa.me/447700900123"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.helpLink}
            >
              Message Tino on WhatsApp →
            </a>
          </div>
        </div>
      </aside>

      {/* ================= MAIN WORKBOOK CONTENT ================= */}
      <main className={styles.mainContent}>
        {/* Module Content View */}
        <div className={styles.tabViewContainer} key={activeTab}>
          
          {/* Module Title Header */}
          <div className={styles.moduleHeaderRow}>
            <div className={styles.moduleMeta}>
              <span className={styles.moduleBreadcrumb}>{currentModule.tag}</span>
              <h1 className={styles.moduleTitle}>{currentModule.title}</h1>
              <p className={styles.moduleSubtitle}>{currentModule.subtitle}</p>
            </div>
          </div>

          {/* Module Video Player */}
          {currentModule.videoUrl && (
            <div className={styles.videoLessonCard}>
              {autoAdvancing && (
                <div className={styles.autoAdvanceToast}>
                  <div className={styles.toastText}>
                    🎉 Video completed! Moving to next module in 2 seconds...
                  </div>
                  <button
                    type="button"
                    onClick={cancelAutoAdvance}
                    className={styles.toastCancelBtn}
                  >
                    Stay on this module
                  </button>
                </div>
              )}

              <div className={styles.videoWrapper}>
                <iframe
                  id="dashboard-video-iframe"
                  src={currentModule.videoUrl}
                  title={`${currentModule.title} Video Lesson`}
                  className={styles.videoIframe}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* ================= MODULE 0: OVERVIEW ================= */}
          {activeTab === "overview" && (
            <>
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  What's Inside
                </h3>
                <p className={styles.bodyText}>
                  A step-by-step workbook that ends with a 3-month strategy and a 30-day posting plan.
                </p>
                <div className={styles.definitionListSingle}>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>1. How LinkedIn works</div>
                    <p className={styles.definitionDesc}>What you need to know about the platform before your first post.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>2. Clarity</div>
                    <p className={styles.definitionDesc}>Confidence comes from knowing what you are good at.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>3. Your profile</div>
                    <p className={styles.definitionDesc}>Your profile turns curious people into followers and clients.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>4. What to post</div>
                    <p className={styles.definitionDesc}>A simple system for having a post idea ready every day.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>5. How to write</div>
                    <p className={styles.definitionDesc}>Hook readers in line one, tell a story, leave a takeaway.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>6. Engaging & networking</div>
                    <p className={styles.definitionDesc}>How commenting and connecting grow your audience faster.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>7. Ways to get paid</div>
                    <p className={styles.definitionDesc}>Three actionable paths to earn income from your brand.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>8. 3-Month strategy</div>
                    <p className={styles.definitionDesc}>What each month is for and how you will know it is working.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>9. 30-Day plan</div>
                    <p className={styles.definitionDesc}>20 posts over 4 weeks with an hour of daily engagement.</p>
                  </div>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Who This Is For
                </h3>
                <p className={styles.bodyText}>
                  You&apos;ve decided you want to be known. You have expertise. You&apos;ve watched other people build a name on LinkedIn and thought, <em>&quot;I could do that.&quot;</em> The only problem is you don&apos;t know where to start. That&apos;s exactly who this blueprint is for.
                </p>
                <p className={styles.bodyText}>
                  By the last page, you&apos;ll walk away with three things:
                </p>
                <div className={styles.definitionListSingle}>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>1. Clarity</div>
                    <p className={styles.definitionDesc}>You know who you are on LinkedIn, what you talk about, and why, so you stop second-guessing every post.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>2. A 3-Month Strategy</div>
                    <p className={styles.definitionDesc}>The big picture: what each month is for and how you&apos;ll know it&apos;s working.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>3. A 30-Day Plan</div>
                    <p className={styles.definitionDesc}>Exactly what to post and when for your first month, so you never stare at a blank screen.</p>
                  </div>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  How to Use This Blueprint
                </h3>
                <p className={styles.bodyText}>
                  <strong>1. Go in order:</strong> Each module builds on the one before it.<br />
                  <strong>2. Do the worksheets:</strong> Reading gives you ideas, and writing your answers gives you a plan.<br />
                  <strong>3. Give it 30 days before you judge anything:</strong> LinkedIn rewards people who keep showing up.<br />
                  <strong>4. You don&apos;t need to have it all figured out:</strong> Most of it gets clearer once you start.
                </p>
              </div>

              <div className={styles.tinoNoteCard}>
                <span className={styles.tinoNoteLabel}>A Note From Tino</span>
                <p className={styles.tinoNoteText}>
                  &quot;When I started, I thought LinkedIn was a place to announce new jobs. It felt overwhelming, like everyone else already had it figured out. I didn&apos;t. I started anyway, and everything I learned along the way is in these pages.&quot;
                </p>
              </div>
            </>
          )}

          {/* ================= MODULE 1 ================= */}
          {activeTab === "mod-1" && (
            <>
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  What You Need to Know
                </h3>
                <p className={styles.bodyText}>
                  LinkedIn is the one platform where the people scrolling are also the people hiring, buying, partnering, and booking speakers. Your future clients, collaborators, and brand partners are already there. Most of them just haven&apos;t seen your work yet.
                </p>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  The Basics in Plain English
                </h3>
                <div className={styles.definitionList}>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>Your profile</div>
                    <p className={styles.definitionDesc}>Your landing page. When someone sees your post or comment and gets curious, this is where they go.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>Your headline</div>
                    <p className={styles.definitionDesc}>The line under your name. It shows up on your posts, on your comments, and in search.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>Connections</div>
                    <p className={styles.definitionDesc}>A two-way relationship you both agreed to. Your posts show up in each other&apos;s feeds.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>Followers</div>
                    <p className={styles.definitionDesc}>People who see your content without connecting with you. This is how your audience grows past your network.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>The feed</div>
                    <p className={styles.definitionDesc}>LinkedIn shows your post to a small group first. If they engage, it shows the post to more people.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>Impressions</div>
                    <p className={styles.definitionDesc}>How many times your post was seen. This is the first number to watch.</p>
                  </div>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Four Common Myths
                </h3>
                <div className={styles.mythsGrid}>
                  <div className={styles.mythCard}>
                    <span className={styles.mythBadge}>Myth 1</span>
                    <h4 className={styles.mythTitle}>You need a big following to make money.</h4>
                    <p className={styles.mythTruth}><strong>Truth:</strong> Brands, clients, and opportunities come from the right people seeing you. A small, engaged audience can pay you.</p>
                  </div>
                  <div className={styles.mythCard}>
                    <span className={styles.mythBadge}>Myth 2</span>
                    <h4 className={styles.mythTitle}>You need to have it all figured out.</h4>
                    <p className={styles.mythTruth}><strong>Truth:</strong> Nobody does. Your brand gets clearer every time you post.</p>
                  </div>
                  <div className={styles.mythCard}>
                    <span className={styles.mythBadge}>Myth 3</span>
                    <h4 className={styles.mythTitle}>You need one niche.</h4>
                    <p className={styles.mythTruth}><strong>Truth:</strong> Start with a few content pillars. After 30 days, the topics people respond to will show you where to focus.</p>
                  </div>
                  <div className={styles.mythCard}>
                    <span className={styles.mythBadge}>Myth 4</span>
                    <h4 className={styles.mythTitle}>You need to be the top expert in your industry.</h4>
                    <p className={styles.mythTruth}><strong>Truth:</strong> You only need to be a few steps ahead of the person you&apos;re helping. Share what you know and what you&apos;re learning.</p>
                  </div>
                </div>
              </div>

              {/* Worksheet 1 */}
              <div className={styles.worksheetSection}>
                <div className={styles.worksheetHeader}>
                  <span className={styles.worksheetTag}>Worksheet 1</span>
                  <span className={styles.worksheetSavedNote}>✓ Auto-saves in browser</span>
                </div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Your Starting Point</h3>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>1. What have you believed about LinkedIn that&apos;s kept you from posting?</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="Write your thoughts..."
                    value={answers['ws1_q1'] || ''}
                    onChange={(e) => handleAnswerChange('ws1_q1', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>2. Which of the four myths hits closest to home for you?</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="e.g. Myth 1, Myth 2..."
                    value={answers['ws1_q2'] || ''}
                    onChange={(e) => handleAnswerChange('ws1_q2', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>3. Why do you want to be known? Write the real reason.</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="The genuine motivation behind building your presence..."
                    value={answers['ws1_q3'] || ''}
                    onChange={(e) => handleAnswerChange('ws1_q3', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* ================= MODULE 2 ================= */}
          {activeTab === "mod-2" && (
            <>
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  The 4-Step Process I Use
                </h3>
                <p className={styles.bodyText}>
                  Most people stay stuck because they think they need a perfect brand before they post. You don&apos;t. Here is the process:
                </p>
                <div className={styles.definitionList}>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>1. Figure out what you are good at</div>
                    <p className={styles.definitionDesc}>Your expertise, your experience, and the things people already ask you about.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>2. Pick your content pillars</div>
                    <p className={styles.definitionDesc}>These are the 3 to 4 topics you will talk about (covered in Module 4).</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>3. Post for 30 days</div>
                    <p className={styles.definitionDesc}>Pay close attention to which posts people respond to.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>4. Keep what works</div>
                    <p className={styles.definitionDesc}>After 30 days, keep posting about the topics that land and drop the ones that don&apos;t.</p>
                  </div>
                </div>
              </div>

              <div className={styles.tinoNoteCard}>
                <span className={styles.tinoNoteLabel}>A Note on Starting</span>
                <p className={styles.tinoNoteText}>
                  &quot;You don&apos;t have to have it figured out. Think of your first 30 days as research. Every post tells you something about what your audience wants from you.&quot;
                </p>
              </div>

              {/* Worksheet 2 */}
              <div className={styles.worksheetSection}>
                <div className={styles.worksheetHeader}>
                  <span className={styles.worksheetTag}>Worksheet 2</span>
                  <span className={styles.worksheetSavedNote}>✓ Auto-saves in browser</span>
                </div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Find Your Clarity</h3>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>1. What do you want to be known for?</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="Your primary reputation goal..."
                    value={answers['ws2_q1'] || ''}
                    onChange={(e) => handleAnswerChange('ws2_q1', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>2. What&apos;s your expertise? What do people come to you for?</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="Skills, advice, industry insights..."
                    value={answers['ws2_q2'] || ''}
                    onChange={(e) => handleAnswerChange('ws2_q2', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>3. What are you studying or learning right now?</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="Topics you're currently exploring..."
                    value={answers['ws2_q3'] || ''}
                    onChange={(e) => handleAnswerChange('ws2_q3', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>4. What do you read, watch, or listen to the most?</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="Podcasts, creators, newsletters, books..."
                    value={answers['ws2_q4'] || ''}
                    onChange={(e) => handleAnswerChange('ws2_q4', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion} style={{ marginTop: '0.5rem' }}>
                  <label className={styles.questionLabel}>Look at your 4 answers. What keeps showing up? Write it as one sentence:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder='I want to be known for [what you do] helping [who you help]...'
                    value={answers['ws2_summary'] || ''}
                    onChange={(e) => handleAnswerChange('ws2_summary', e.target.value)}
                  />
                </div>
              </div>

              {/* Worksheet 3 */}
              <div className={styles.worksheetSection}>
                <div className={styles.worksheetHeader}>
                  <span className={styles.worksheetTag}>Worksheet 3</span>
                  <span className={styles.worksheetSavedNote}>✓ Auto-saves in browser</span>
                </div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Your One Goal (Next 90 Days)</h3>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>
                    Select your main goal for the next 90 days:
                    <span className={styles.questionChoices}>Options: Get clients · Get visibility · Land brand deals · Build an audience · Get a new role</span>
                  </label>
                  <select
                    className={styles.worksheetInput}
                    value={answers['ws3_goal'] || 'get-clients'}
                    onChange={(e) => handleAnswerChange('ws3_goal', e.target.value)}
                  >
                    <option value="get-clients">Get clients</option>
                    <option value="get-visibility">Get visibility</option>
                    <option value="land-brand-deals">Land brand deals</option>
                    <option value="build-audience">Build an audience</option>
                    <option value="get-new-role">Get a new role</option>
                  </select>
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>Why this goal, and why now?</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="Explain why this goal is your immediate focus..."
                    value={answers['ws3_reason'] || ''}
                    onChange={(e) => handleAnswerChange('ws3_reason', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* ================= MODULE 3 ================= */}
          {activeTab === "mod-3" && (
            <>
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Your Profile Is Your Landing Page
                </h3>
                <p className={styles.bodyText}>
                  Every post and comment you make sends people to your profile. If your profile doesn&apos;t explain who you are and why they should care, all that effort leaks out the bottom.
                </p>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Why Your Headline Matters
                </h3>
                <p className={styles.bodyText}>
                  When you comment on someone else&apos;s post, your headline is what people see next to your name. That makes every comment a tiny ad for you, so your headline needs to say clearly what you do.
                </p>
                <p className={styles.bodyText}>
                  • Say what you do and who you help, in words your audience would use.<br />
                  • Add a proof point or a hook if you have one, such as a result, a story, or a credential people recognize.<br />
                  • Skip vague titles like &quot;Passionate professional&quot; or &quot;Aspiring leader.&quot; Nobody clicks on those.
                </p>
                <div style={{ marginTop: '0.5rem' }}>
                  <strong style={{ color: '#51f8aa' }}>Headline examples:</strong>
                  <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#cbd5e1', lineHeight: '1.8' }}>
                    <li><em>&quot;Helping first-time founders turn LinkedIn into their best sales channel&quot;</em></li>
                    <li><em>&quot;Data analyst sharing the SQL tricks I wish I knew in year one&quot;</em></li>
                    <li><em>&quot;Nurse turned health tech founder making patient follow-up easier&quot;</em></li>
                  </ul>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Your About Section (The 4-Part Flow)
                </h3>
                <div className={styles.definitionList}>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>1. Hook</div>
                    <p className={styles.definitionDesc}>The problem your audience has, in their own words.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>2. Your Reason</div>
                    <p className={styles.definitionDesc}>Why you care about this problem, in two or three sentences of your story.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>3. Proof</div>
                    <p className={styles.definitionDesc}>Results, numbers, or experience you can share.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>4. Next Step</div>
                    <p className={styles.definitionDesc}>What someone should do if they want to work with you or learn more.</p>
                  </div>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Photo, Banner, and Featured Section
                </h3>
                <p className={styles.bodyText}>
                  <strong>Photo:</strong> Your face, clear and close up, with a plain background.<br />
                  <strong>Banner:</strong> Treat it like a billboard. Say who you help or what you&apos;re known for.<br />
                  <strong>Featured section:</strong> Once you have an offer, this is where customers find out how to contact you or buy. Pin your offer, your booking link, or your best post.
                </p>
              </div>

              {/* Worksheet 4 */}
              <div className={styles.worksheetSection}>
                <div className={styles.worksheetHeader}>
                  <span className={styles.worksheetTag}>Worksheet 4</span>
                  <span className={styles.worksheetSavedNote}>✓ Auto-saves in browser</span>
                </div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Profile Rewrite</h3>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>
                    My new headline:
                    <span className={styles.formulaHint}>Framework: [Who you help] + [How you help] + [Proof / result]</span>
                  </label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="[Who you help] + [How you help] + [Proof/result]..."
                    value={answers['ws4_headline'] || ''}
                    onChange={(e) => handleAnswerChange('ws4_headline', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>My About section hook (the problem my audience has):</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="Hook opening lines..."
                    value={answers['ws4_hook'] || ''}
                    onChange={(e) => handleAnswerChange('ws4_hook', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>Why I care, in two or three sentences:</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="Your background story and purpose..."
                    value={answers['ws4_why'] || ''}
                    onChange={(e) => handleAnswerChange('ws4_why', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>What goes in my Featured section:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="e.g. Lead magnet link, Discovery call booking, Portfolio..."
                    value={answers['ws4_featured'] || ''}
                    onChange={(e) => handleAnswerChange('ws4_featured', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* ================= MODULE 4 ================= */}
          {activeTab === "mod-4" && (
            <>
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Content Pillars: The 5-Idea Rule
                </h3>
                <p className={styles.bodyText}>
                  Content pillars are the 3 to 4 topics you post about again and again. They make you memorable, because people start to connect you with those topics.
                </p>
                <div className={styles.tinoNoteCard} style={{ margin: '0.5rem 0' }}>
                  <span className={styles.tinoNoteLabel}>Tino's Pillars as an Example</span>
                  <p className={styles.tinoNoteText}>
                    &quot;AI, startups, founder life, and tech. Every post I write fits into one of these. Yours will be different, and they should be.&quot;
                  </p>
                </div>
                <p className={styles.bodyText}>
                  <strong>The 5-idea rule:</strong> For every pillar, write down at least 5 post ideas. Then rotate through your pillars so your audience gets variety and you never run out. 4 pillars × 5 ideas = <strong>20 posts</strong>. That&apos;s a full month at 5 posts a week!
                </p>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Why Photos of You Work Best
                </h3>
                <p className={styles.bodyText}>
                  On LinkedIn, a post with a photo of you is easier to make and usually reaches more people than an infographic. This is a personal brand, and people want to see your face.
                </p>
                <div className={styles.definitionList}>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>1. Text + Photo of You</div>
                    <p className={styles.definitionDesc}>Easiest to make and builds the most connection. <strong>Start here.</strong></p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>2. Video</div>
                    <p className={styles.definitionDesc}>Lets people hear your voice and see your energy. Add it once posting feels comfortable.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>3. Text Only</div>
                    <p className={styles.definitionDesc}>Great for short stories, hot takes, and quick lessons.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>4. Infographics & Carousels</div>
                    <p className={styles.definitionDesc}>Useful for in-depth teaching, but they take more time to design.</p>
                  </div>
                </div>
              </div>

              {/* AI Prompts */}
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  AI Prompts for Endless Post Ideas
                </h3>
                <p className={styles.bodyText}>
                  Copy any of these into ChatGPT, Claude, or LinkGenie to generate immediate ideas:
                </p>
                <div className={styles.promptsGrid}>
                  {[
                    "My content pillars are [pillar 1], [pillar 2], [pillar 3], and [pillar 4]. I help [who you help] with [what you do]. Give me 5 LinkedIn post ideas for each pillar, and base at least 2 of them on a personal story or lesson.",
                    "Here's one of my pillars: [pillar]. List 10 questions my audience might ask about it, written the way they'd actually ask them. I'll turn each question into a post.",
                    "Here are a few things that happened in my work or life this month: [list them]. For each one, tell me which of my pillars it fits and suggest a lesson I could share from it.",
                    "Here's a post idea: [your idea]. Give me 3 different ways to write it: as a personal story, as a how-to, and as an opinion.",
                    "Here are my 3 best-performing posts: [paste them]. Tell me what they have in common, then give me 5 new post ideas that follow the same pattern."
                  ].map((prompt, pIdx) => (
                    <div key={pIdx} className={styles.promptCard}>
                      <div className={styles.promptHeader}>
                        <span className={styles.promptNumber}>Prompt {pIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(prompt, pIdx)}
                          className={styles.copyPromptBtn}
                        >
                          {copiedIndex === pIdx ? 'Copied! ✓' : 'Copy Prompt'}
                        </button>
                      </div>
                      <p className={styles.promptText}>{prompt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worksheet 5 */}
              <div className={styles.worksheetSection}>
                <div className={styles.worksheetHeader}>
                  <span className={styles.worksheetTag}>Worksheet 5</span>
                  <span className={styles.worksheetSavedNote}>✓ Auto-saves in browser</span>
                </div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Your 4 Pillars and 20 Ideas</h3>

                {[1, 2, 3, 4].map(pillarNum => (
                  <div key={pillarNum} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.75rem' }}>
                    <label className={styles.questionLabel} style={{ color: '#51f8aa', fontSize: '1.05rem' }}>
                      Pillar {pillarNum} Topic Name:
                    </label>
                    <input
                      className={styles.worksheetInput}
                      placeholder={`e.g. Pillar ${pillarNum} (e.g. Startup Lessons, Leadership, Design...)`}
                      value={answers[`ws5_p${pillarNum}_name`] || ''}
                      onChange={(e) => handleAnswerChange(`ws5_p${pillarNum}_name`, e.target.value)}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem' }}>
                      {[1, 2, 3, 4, 5].map(ideaNum => (
                        <input
                          key={ideaNum}
                          className={styles.worksheetInput}
                          placeholder={`Idea ${ideaNum}...`}
                          value={answers[`ws5_p${pillarNum}_i${ideaNum}`] || ''}
                          onChange={(e) => handleAnswerChange(`ws5_p${pillarNum}_i${ideaNum}`, e.target.value)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ================= MODULE 5 ================= */}
          {activeTab === "mod-5" && (
            <>
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  The Formula: Story, Then Takeaway
                </h3>
                <p className={styles.bodyText}>
                  People forget advice, but they remember stories. The best posts tell a short story and then share the lesson you took from it. The story holds attention, and the takeaway gives the reader something to use.
                </p>
                <div className={styles.definitionList}>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>1. Hook</div>
                    <p className={styles.definitionDesc}>One or two lines that make people stop scrolling.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>2. The Moment</div>
                    <p className={styles.definitionDesc}>Drop them into the story. Where were you? What happened?</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>3. The Struggle</div>
                    <p className={styles.definitionDesc}>What went wrong, what you felt, what you didn&apos;t know yet.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>4. The Turn</div>
                    <p className={styles.definitionDesc}>What changed. The decision, the realization, the help you got.</p>
                  </div>
                  <div className={styles.definitionCard} style={{ gridColumn: '1 / -1' }}>
                    <div className={styles.definitionTerm}>5. The Takeaway</div>
                    <p className={styles.definitionDesc}>The actionable lesson your reader can immediately use in their own life or work.</p>
                  </div>
                </div>
              </div>

              <div className={styles.tinoNoteCard}>
                <span className={styles.tinoNoteLabel}>Why Vulnerability Works</span>
                <p className={styles.tinoNoteText}>
                  &quot;My layoff post reached 50,000 likes. It took off because I was vulnerable and so many people could relate. When you share something real, people see themselves in it. That&apos;s what makes them stop, read, and remember you.&quot;
                </p>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Hooks That Work
                </h3>
                <p className={styles.bodyText}>
                  Only the first two or three lines show before someone has to click &quot;see more.&quot; If those lines don&apos;t grab them, most people never read the rest. Spend as much time on your hook as on the rest of the post.
                </p>
                <div className={styles.mythsGrid}>
                  <div className={styles.mythCard}>
                    <span className={styles.mythBadge} style={{ background: 'rgba(81, 248, 170, 0.12)', color: '#51f8aa' }}>Vulnerable Open</span>
                    <p className={styles.bodyText}><em>&quot;I got laid off on a Tuesday. Here&apos;s what I did on Wednesday.&quot;</em></p>
                  </div>
                  <div className={styles.mythCard}>
                    <span className={styles.mythBadge} style={{ background: 'rgba(81, 248, 170, 0.12)', color: '#51f8aa' }}>Surprising Result</span>
                    <p className={styles.bodyText}><em>&quot;I posted for 30 days straight. The results surprised me.&quot;</em></p>
                  </div>
                  <div className={styles.mythCard}>
                    <span className={styles.mythBadge} style={{ background: 'rgba(81, 248, 170, 0.12)', color: '#51f8aa' }}>Specific Number</span>
                    <p className={styles.bodyText}><em>&quot;3 changes to my profile that brought in my first inbound client.&quot;</em></p>
                  </div>
                  <div className={styles.mythCard}>
                    <span className={styles.mythBadge} style={{ background: 'rgba(81, 248, 170, 0.12)', color: '#51f8aa' }}>Bold Opinion</span>
                    <p className={styles.bodyText}><em>&quot;You don&apos;t need a niche to start on LinkedIn.&quot;</em></p>
                  </div>
                </div>
              </div>

              {/* Hook AI Prompts */}
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  AI Prompts for Writing Hooks
                </h3>
                <div className={styles.promptsGrid}>
                  {[
                    "Here's my post idea: [your idea]. Write 10 hook options under 15 words each. Make 3 vulnerable, 3 curiosity-driven, and 4 with a specific number.",
                    "Here's a story from my life: [your story]. Give me 5 opening lines that start in the middle of the moment.",
                    "Rewrite this hook 5 ways so it sounds like a real person talking, with no buzzwords: [your hook]."
                  ].map((prompt, pIdx) => (
                    <div key={pIdx} className={styles.promptCard}>
                      <div className={styles.promptHeader}>
                        <span className={styles.promptNumber}>Hook Prompt {pIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(prompt, 10 + pIdx)}
                          className={styles.copyPromptBtn}
                        >
                          {copiedIndex === 10 + pIdx ? 'Copied! ✓' : 'Copy Prompt'}
                        </button>
                      </div>
                      <p className={styles.promptText}>{prompt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* LinkGenie callout */}
              <div className={styles.tinoNoteCard} style={{ borderColor: '#38bdf8' }}>
                <span className={styles.tinoNoteLabel} style={{ color: '#38bdf8' }}>Recommended Tool: LinkGenie</span>
                <p className={styles.tinoNoteText} style={{ fontStyle: 'normal' }}>
                  LinkGenie is the AI tool I co-founded to help you write LinkedIn posts in your own voice. It learns how you write, gives you content ideas, generates more than 10 hooks per topic, and lets you schedule posts straight to LinkedIn. Try it at <a href="https://linkgenie.one" target="_blank" rel="noopener noreferrer" style={{ color: '#51f8aa', fontWeight: 700 }}>linkgenie.one</a>.
                </p>
              </div>

              {/* Worksheet 6 */}
              <div className={styles.worksheetSection}>
                <div className={styles.worksheetHeader}>
                  <span className={styles.worksheetTag}>Worksheet 6</span>
                  <span className={styles.worksheetSavedNote}>✓ Auto-saves in browser</span>
                </div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Draft Your First Story Post</h3>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>A moment from my life or work that taught me something:</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="Describe the moment..."
                    value={answers['ws6_moment'] || ''}
                    onChange={(e) => handleAnswerChange('ws6_moment', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>How I felt in that moment:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="Emotions, pressure, doubts..."
                    value={answers['ws6_felt'] || ''}
                    onChange={(e) => handleAnswerChange('ws6_felt', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>What changed:</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="The decision, pivot, or realization..."
                    value={answers['ws6_changed'] || ''}
                    onChange={(e) => handleAnswerChange('ws6_changed', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>The takeaway for my reader:</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="The lesson they can apply today..."
                    value={answers['ws6_takeaway'] || ''}
                    onChange={(e) => handleAnswerChange('ws6_takeaway', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>My best hook for this story:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="Punchy, scroll-stopping first 2 lines..."
                    value={answers['ws6_hook'] || ''}
                    onChange={(e) => handleAnswerChange('ws6_hook', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* ================= MODULE 6 ================= */}
          {activeTab === "mod-6" && (
            <>
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Engagement Is Half the Work
                </h3>
                <p className={styles.bodyText}>
                  Most beginners skip engagement. When you comment on other people&apos;s posts, their audience sees your headline and your thoughts. That&apos;s how strangers find you before they&apos;ve ever seen one of your posts.
                </p>
                <div className={styles.tinoNoteCard} style={{ margin: '0.75rem 0' }}>
                  <span className={styles.tinoNoteLabel}>A Note From Tino</span>
                  <p className={styles.tinoNoteText}>
                    &quot;When I started, I spent five hours a day commenting. You don&apos;t need to go that far, but plan on at least an hour a day. That hour is how your network grows.&quot;
                  </p>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Your Daily Engagement Routine (60 Mins)
                </h3>
                <div className={styles.definitionList}>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>15 Minutes: Your Own Posts</div>
                    <p className={styles.definitionDesc}>Reply to every comment on your own posts and keep the conversation going.</p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>30 Minutes: Target Creators</div>
                    <p className={styles.definitionDesc}>Leave thoughtful comments on posts from people in your space and people your audience follows.</p>
                  </div>
                  <div className={styles.definitionCard} style={{ gridColumn: '1 / -1' }}>
                    <div className={styles.definitionTerm}>15 Minutes: Expanding Network</div>
                    <p className={styles.definitionDesc}>Send connection requests to people you want to know, and accept requests from people in your field.</p>
                  </div>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  What Makes a Good Comment & Who to Connect With
                </h3>
                <div className={styles.mythsGrid}>
                  <div className={styles.mythCard}>
                    <h4 className={styles.mythTitle} style={{ color: '#51f8aa' }}>What Makes a Good Comment</h4>
                    <p className={styles.mythTruth}>
                      • It adds something (a point, question, or experience).<br />
                      • It runs 2 or 3 sentences (&quot;Great post!&quot; doesn&apos;t work).<br />
                      • It shows up early when engagement is freshest.<br />
                      • It goes to the same people regularly.
                    </p>
                  </div>
                  <div className={styles.mythCard}>
                    <h4 className={styles.mythTitle} style={{ color: '#51f8aa' }}>Who to Connect With</h4>
                    <p className={styles.mythTruth}>
                      • People you&apos;d love to work with or for.<br />
                      • Creators and leaders in your industry.<br />
                      • People at your level who are also building.<br />
                      • Anyone who engages with your posts more than once.
                    </p>
                  </div>
                </div>
              </div>

              {/* Worksheet 7 */}
              <div className={styles.worksheetSection}>
                <div className={styles.worksheetHeader}>
                  <span className={styles.worksheetTag}>Worksheet 7</span>
                  <span className={styles.worksheetSavedNote}>✓ Auto-saves in browser</span>
                </div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>My Engagement List</h3>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>5 creators I&apos;ll comment on every week:</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="1. Name / Profile&#10;2. Name / Profile&#10;3. Name / Profile&#10;4. Name / Profile&#10;5. Name / Profile"
                    value={answers['ws7_creators'] || ''}
                    onChange={(e) => handleAnswerChange('ws7_creators', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>The kind of people I want in my network:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="e.g. B2B Founders, Marketing Executives, Tech Leaders..."
                    value={answers['ws7_network'] || ''}
                    onChange={(e) => handleAnswerChange('ws7_network', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>When I&apos;ll do my daily engagement hour:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="e.g. 8:30 AM - 9:30 AM or 30m morning / 30m evening"
                    value={answers['ws7_time'] || ''}
                    onChange={(e) => handleAnswerChange('ws7_time', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* ================= MODULE 7 ================= */}
          {activeTab === "mod-7" && (
            <>
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  Three Ways to Earn Income from Your Brand
                </h3>
                <p className={styles.bodyText}>
                  Once you build presence, monetization becomes natural. Here are the three proven paths:
                </p>
                <div className={styles.mythsGrid}>
                  <div className={styles.mythCard}>
                    <span className={styles.mythBadge} style={{ background: 'rgba(81, 248, 170, 0.12)', color: '#51f8aa' }}>Path 1</span>
                    <h4 className={styles.mythTitle}>Brand Deals</h4>
                    <p className={styles.mythTruth}>
                      Brands want to reach the people who already trust you. Post consistently about your pillars, make it easy to contact you, and only partner with tools you genuinely endorse.
                    </p>
                  </div>
                  <div className={styles.mythCard}>
                    <span className={styles.mythBadge} style={{ background: 'rgba(81, 248, 170, 0.12)', color: '#51f8aa' }}>Path 2</span>
                    <h4 className={styles.mythTitle}>Your Own Offer</h4>
                    <p className={styles.mythTruth}>
                      Package what people ask you about: 1:1 strategy calls, done-for-you services, digital templates, or paid speaking. Put it in your Featured section.
                    </p>
                  </div>
                  <div className={styles.mythCard} style={{ gridColumn: '1 / -1' }}>
                    <span className={styles.mythBadge} style={{ background: 'rgba(81, 248, 170, 0.12)', color: '#51f8aa' }}>Path 3</span>
                    <h4 className={styles.mythTitle}>Ghostwriting</h4>
                    <p className={styles.mythTruth}>
                      Busy founders need content but don&apos;t have time. If you write well for yourself, write for them! Your profile is your portfolio. Set up monthly packages for 10-20 posts.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.tinoNoteCard}>
                <span className={styles.tinoNoteLabel}>Tino's Experience with HubSpot</span>
                <p className={styles.tinoNoteText}>
                  &quot;HubSpot reached out to me without any pitch from my side. They found me because I kept posting. Once you post consistently, opportunities start coming to you.&quot;
                </p>
              </div>

              {/* Worksheet 8 */}
              <div className={styles.worksheetSection}>
                <div className={styles.worksheetHeader}>
                  <span className={styles.worksheetTag}>Worksheet 8</span>
                  <span className={styles.worksheetSavedNote}>✓ Auto-saves in browser</span>
                </div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>Pick Your Income Path</h3>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>Which path will I focus on first?</label>
                  <select
                    className={styles.worksheetInput}
                    value={answers['ws8_path'] || 'own-offer'}
                    onChange={(e) => handleAnswerChange('ws8_path', e.target.value)}
                  >
                    <option value="brand-deals">Brand deals</option>
                    <option value="own-offer">My own offer (Coaching, DFY, Digital)</option>
                    <option value="ghostwriting">Ghostwriting for founders</option>
                  </select>
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>Why this one:</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="Why this fits your current time and skill set..."
                    value={answers['ws8_why'] || ''}
                    onChange={(e) => handleAnswerChange('ws8_why', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>What I could offer or create:</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="Specific deliverable, package, or price point..."
                    value={answers['ws8_offer'] || ''}
                    onChange={(e) => handleAnswerChange('ws8_offer', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* ================= MODULE 8 ================= */}
          {activeTab === "mod-8" && (
            <>
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  What Each Month Is For
                </h3>
                <p className={styles.bodyText}>
                  Three months gives you enough posts to see what works and build on it. Each month has one job:
                </p>
                <div className={styles.definitionList}>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>Month 1: Foundation</div>
                    <p className={styles.definitionDesc}>
                      <strong>Action:</strong> Finish clarity work, optimize profile, pick pillars, post 5x a week, engage 1 hour a day.<br />
                      <strong>The Win:</strong> Consistency.
                    </p>
                  </div>
                  <div className={styles.definitionCard}>
                    <div className={styles.definitionTerm}>Month 2: Find What Works</div>
                    <p className={styles.definitionDesc}>
                      <strong>Action:</strong> Review top posts, double down on resonant topics, tell deeper stories, maintain 5x posting.<br />
                      <strong>The Win:</strong> Higher impressions.
                    </p>
                  </div>
                  <div className={styles.definitionCard} style={{ gridColumn: '1 / -1' }}>
                    <div className={styles.definitionTerm}>Month 3: Growth & Conversion</div>
                    <p className={styles.definitionDesc}>
                      <strong>Action:</strong> Commit to income path, add offer to Featured section, DM target collaborators.<br />
                      <strong>The Win:</strong> A bigger network & paying opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  What to Track Each Week
                </h3>
                <p className={styles.bodyText}>
                  • Number of posts you published<br />
                  • Total impressions<br />
                  • New connections and followers<br />
                  • Your best post, and why you think it worked
                </p>
              </div>

              {/* Worksheet 9 */}
              <div className={styles.worksheetSection}>
                <div className={styles.worksheetHeader}>
                  <span className={styles.worksheetTag}>Worksheet 9</span>
                  <span className={styles.worksheetSavedNote}>✓ Auto-saves in browser</span>
                </div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>My 3-Month Strategy</h3>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>Month 1, my focus and goal:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="Focus & metric goal..."
                    value={answers['ws9_m1'] || ''}
                    onChange={(e) => handleAnswerChange('ws9_m1', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>Month 2, my focus and goal:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="Focus & metric goal..."
                    value={answers['ws9_m2'] || ''}
                    onChange={(e) => handleAnswerChange('ws9_m2', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>Month 3, my focus and goal:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="Focus & metric goal..."
                    value={answers['ws9_m3'] || ''}
                    onChange={(e) => handleAnswerChange('ws9_m3', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>How I&apos;ll know it&apos;s working:</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="Key qualitative and quantitative indicators..."
                    value={answers['ws9_proof'] || ''}
                    onChange={(e) => handleAnswerChange('ws9_proof', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* ================= MODULE 9 ================= */}
          {activeTab === "mod-9" && (
            <>
              <div className={styles.contentCard}>
                <h3 className={styles.sectionHeaderTitle}>
                  <span className={styles.accentDot} />
                  20 Posts Over 4 Weeks (Monday to Friday)
                </h3>
                <p className={styles.bodyText}>
                  Post 5 times a week, Monday to Friday. Use the prompts below and fill them with ideas from your pillar worksheet. Every day, spend at least an hour engaging.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
                  <div className={styles.calendarWeek}>
                    <h4 className={styles.weekTitle}>Week 1: Introductions</h4>
                    <div className={styles.daysList}>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Monday:</span> Who I am and why I&apos;m here</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Tuesday:</span> A tip from pillar 1</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Wednesday:</span> A personal story with a takeaway</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Thursday:</span> A lesson from pillar 2</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Friday:</span> Something I&apos;m learning right now</div>
                    </div>
                  </div>

                  <div className={styles.calendarWeek}>
                    <h4 className={styles.weekTitle}>Week 2: Sharing What You Know</h4>
                    <div className={styles.daysList}>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Monday:</span> A myth in my field I disagree with</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Tuesday:</span> A mistake I made and what I learned</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Wednesday:</span> A how-to from pillar 3</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Thursday:</span> A photo of me working, plus a lesson</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Friday:</span> My opinion on a pillar 4 topic</div>
                    </div>
                  </div>

                  <div className={styles.calendarWeek}>
                    <h4 className={styles.weekTitle}>Week 3: Doubling Down</h4>
                    <div className={styles.daysList}>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Monday:</span> My best topic so far, from a new angle</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Tuesday:</span> Behind the scenes of my work</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Wednesday:</span> A vulnerable story</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Thursday:</span> Someone who helped me, and what they taught me</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Friday:</span> A question my audience asks me, answered</div>
                    </div>
                  </div>

                  <div className={styles.calendarWeek}>
                    <h4 className={styles.weekTitle}>Week 4: Building Momentum</h4>
                    <div className={styles.daysList}>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Monday:</span> What I help people with</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Tuesday:</span> A win or result I&apos;m proud of</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Wednesday:</span> A story from pillar 1 or 2</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Thursday:</span> A deep dive on my best pillar</div>
                      <div className={styles.dayRow}><span className={styles.dayTag}>Friday:</span> What 30 days of posting taught me</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Checklist */}
              <div className={styles.checklistCard}>
                <h4 style={{ margin: 0, color: '#51f8aa', fontSize: '1.15rem', fontWeight: 700 }}>
                  Your Daily Habit Checklist
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <label className={styles.checklistItem}>
                    <input
                      type="checkbox"
                      checked={checklist.post}
                      onChange={() => handleChecklistToggle('post')}
                      className={styles.checkboxInput}
                    />
                    <span>Post (Monday to Friday)</span>
                  </label>
                  <label className={styles.checklistItem}>
                    <input
                      type="checkbox"
                      checked={checklist.reply}
                      onChange={() => handleChecklistToggle('reply')}
                      className={styles.checkboxInput}
                    />
                    <span>Reply to every comment on your post</span>
                  </label>
                  <label className={styles.checklistItem}>
                    <input
                      type="checkbox"
                      checked={checklist.comment}
                      onChange={() => handleChecklistToggle('comment')}
                      className={styles.checkboxInput}
                    />
                    <span>Leave thoughtful comments for at least 30 minutes</span>
                  </label>
                  <label className={styles.checklistItem}>
                    <input
                      type="checkbox"
                      checked={checklist.connect}
                      onChange={() => handleChecklistToggle('connect')}
                      className={styles.checkboxInput}
                    />
                    <span>Send a few targeted connection requests</span>
                  </label>
                  <label className={styles.checklistItem}>
                    <input
                      type="checkbox"
                      checked={checklist.note}
                      onChange={() => handleChecklistToggle('note')}
                      className={styles.checkboxInput}
                    />
                    <span>Note what worked today</span>
                  </label>
                </div>
              </div>

              {/* Worksheet 10 */}
              <div className={styles.worksheetSection}>
                <div className={styles.worksheetHeader}>
                  <span className={styles.worksheetTag}>Worksheet 10</span>
                  <span className={styles.worksheetSavedNote}>✓ Auto-saves in browser</span>
                </div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem' }}>My 30-Day Commitment</h3>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>My posting time each day:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="e.g. 8:00 AM EST"
                    value={answers['ws10_time'] || ''}
                    onChange={(e) => handleAnswerChange('ws10_time', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>My engagement hour each day:</label>
                  <input
                    className={styles.worksheetInput}
                    placeholder="e.g. 12:00 PM - 1:00 PM"
                    value={answers['ws10_eng'] || ''}
                    onChange={(e) => handleAnswerChange('ws10_eng', e.target.value)}
                  />
                </div>

                <div className={styles.worksheetQuestion}>
                  <label className={styles.questionLabel}>On day 30, I want to be able to say:</label>
                  <textarea
                    className={styles.worksheetTextarea}
                    placeholder="Write your declaration..."
                    value={answers['ws10_statement'] || ''}
                    onChange={(e) => handleAnswerChange('ws10_statement', e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.tinoNoteCard}>
                <span className={styles.tinoNoteLabel}>What Happens Next</span>
                <p className={styles.tinoNoteText}>
                  &quot;You now have clarity, a 3-month strategy, and a 30-day plan. The only thing left is to start. Your first post won&apos;t be perfect. Mine wasn&apos;t. Post it anyway. See you on LinkedIn! — Tino&quot;
                </p>
              </div>
            </>
          )}

          {/* ================= BONUS RESOURCES ================= */}
          {activeTab === "resources" && (
            <div className={styles.resourcesGrid}>
              <div className={styles.resourceCard}>
                <div className={styles.resourceHeader}>
                  <span className={styles.resourceTag}>Templates</span>
                </div>
                <h4 className={styles.resourceTitle}>Canva Authority Kit</h4>
                <p className={styles.resourceDesc}>
                  Plug and play design system to upgrade your LinkedIn profile to scale your business faster. Ready-made visual guide, banner, featured section, and content design styles.
                </p>
                <a
                  href="https://subtaindesigns.com/linkedin-authority-kit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resourceBtn}
                >
                  Access Authority Kit →
                </a>
              </div>

              <div className={styles.resourceCard}>
                <div className={styles.resourceHeader}>
                  <span className={styles.resourceTag}>AI Writer</span>
                </div>
                <h4 className={styles.resourceTitle}>LinkGenie AI</h4>
                <p className={styles.resourceDesc}>
                  AI that writes LinkedIn posts in your voice, so you can post 5 times a week without burning out.
                </p>
                <a
                  href="https://linkgenie.one"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resourceBtn}
                >
                  Visit linkgenie.one →
                </a>
              </div>

              <div className={styles.resourceCard}>
                <div className={styles.resourceHeader}>
                  <span className={styles.resourceTag}>PDF Guide</span>
                </div>
                <h4 className={styles.resourceTitle}>Style & Layout Blueprint PDF</h4>
                <p className={styles.resourceDesc}>
                  The official personal brand guide covering typography rules, colors, safe zones, and profile specifications.
                </p>
                <a
                  href="/images/tino/carousels/Linkedin Carousel Template for upload.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resourceBtn}
                >
                  Download Master PDF →
                </a>
              </div>

              <div className={styles.resourceCard}>
                <div className={styles.resourceHeader}>
                  <span className={styles.resourceTag}>1-on-1 Consultation</span>
                </div>
                <h4 className={styles.resourceTitle}>Strategy Call with Tino</h4>
                <p className={styles.resourceDesc}>
                  Work directly with Tino on your positioning, profile architecture, and high-ticket client funnel.
                </p>
                <a
                  href="https://cal.com/authoritykit/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resourceBtn}
                >
                  Book 1:1 Call →
                </a>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
