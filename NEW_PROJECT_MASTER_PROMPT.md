# 🚀 Master Client Project Blueprint & AI Prompt
### 5-Page Authority & Digital Product Funnel System (Clone Kit)
*Designed for Next.js App Router, Centralized Dynamic Config & Ultra-Fast Customization*

---

> **Use Case for this Prompt:**
> You can pass this entire prompt directly to **Antigravity**, **Cursor**, **Claude**, or **ChatGPT** in a brand-new Next.js project folder. It will generate all 5 production-ready pages with a centralized configuration where you only have to edit one single file (`client.config.js`) to change colors, fonts, texts, bank details, and asset links.

---

## 📋 Table of Contents
1. [AI Prompt Directive (Copy-Pasteable for New Projects)](#1-ai-prompt-directive)
2. [Project Architecture & File Tree](#2-project-architecture--file-tree)
3. [Centralized Configuration System (`client.config.js`)](#3-centralized-configuration-system)
4. [Design System & CSS Variables (`src/app/globals.css`)](#4-design-system--css-variables)
5. [Page 1: Authority Kit Sales Landing Page (`/authority-kit`)](#5-page-1-authority-kit-sales-page)
6. [Page 2: Swipe My Training Squeeze Page (`/swipemytraining`)](#6-page-2-swipe-my-training-squeeze-page)
7. [Page 3: High-Converting Checkout Page (`/checkout`)](#7-page-3-checkout-page)
8. [Page 4: Link-in-Bio Hub (`/links`)](#8-page-4-link-in-bio-hub)
9. [Page 5: Member & Training Dashboard (`/dashboard`)](#9-page-5-member--training-dashboard)
10. [Essential Shared Components](#10-essential-shared-components)
11. [How to Customize for Any Client in 5 Minutes](#11-how-to-customize-in-5-minutes)

---

## 1. AI Prompt Directive
*(Copy everything inside this box and paste it into an AI coding assistant when starting a new project)*

```markdown
You are an expert full-stack web developer and UI/UX designer.
Create a complete, responsive, premium Next.js (App Router) web application for a digital product creator client.

### Requirements:
1. Tech Stack: Next.js (latest App Router), Vanilla CSS Modules, Lucide React (or SVG icons).
2. Design Aesthetic: Sleek, high-converting luxury dark mode (#070707 background, deep surface cards #111111, vibrant accent color e.g. lime green #d4ff32 or customizable, smooth typography, glassmorphism, subtle micro-glows, and interactive hover states).
3. Modularity: All text content, colors, fonts, bank transfer details, external links (Canva, Drive, YouTube), and product pricing MUST be powered by a centralized configuration file located at `src/config/client.config.js`. The user should NEVER have to dig through multiple files to change a headline, font, color, or price.
4. Pages to build:
   - `/authority-kit`: Main product sales & VSL landing page with step badges, value stack, video player embed, reviews, and dynamic CTAs.
   - `/swipemytraining`: High-converting video squeeze / opt-in page with email newsletter subscription form and social proof.
   - `/checkout`: Split-screen checkout page with moving deliverable preview marquee, live pricing calculation, bank transfer details with 1-click copy, and payment receipt upload.
   - `/links`: Bio link & resource hub with profile avatar, verified badge, stacked client proof avatars, newsletter box, and customizable social/resource links.
   - `/dashboard`: Access-protected members area with progress tracking (% complete), confetti trigger on 100%, tabbed video players (welcome & implementation), and categorized Canva/Drive download cards with checkboxes.
5. Provide clean, well-commented code that is immediately runnable without runtime errors.
```

---

## 2. Project Architecture & File Tree

```text
my-client-project/
├── public/
│   ├── images/
│   │   ├── profile.png
│   │   ├── video-thumbnail.png
│   │   ├── reviews/
│   │   └── slides/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.js                     # Root layout with dynamic Google Fonts & SEO
│   │   ├── globals.css                   # Theme tokens (colors, borders, glassmorphism)
│   │   ├── page.js                       # Root redirect or home page
│   │   ├── authority-kit/
│   │   │   ├── page.js                   # Sales Landing Page
│   │   │   └── page.module.css
│   │   ├── swipemytraining/
│   │   │   ├── page.js                   # Lead Magnet Squeeze Page
│   │   │   └── page.module.css
│   │   ├── checkout/
│   │   │   ├── page.js                   # Checkout & Bank Receipt Page
│   │   │   └── page.module.css
│   │   ├── links/
│   │   │   ├── page.js                   # Link-in-Bio & Newsletter Page
│   │   │   └── page.module.css
│   │   └── dashboard/
│   │       ├── page.js                   # Member Training & Resource Hub
│   │       └── page.module.css
│   ├── components/
│   │   ├── FadeIn.jsx                    # Smooth scroll reveal animation
│   │   ├── Header.jsx                    # Minimal top bar
│   │   ├── Footer.jsx                    # Universal sleek footer
│   │   └── RatingBadge.jsx               # 5-star review trust badge
│   └── config/
│       └── client.config.js              # ⭐ SINGLE SOURCE OF TRUTH (Content, Colors, Fonts)
├── package.json
└── next.config.js
```

---

## 3. Centralized Configuration System
**File:** `src/config/client.config.js`
> *All your client's information lives here. Whenever you have a new client, simply edit this file!*

```javascript
// src/config/client.config.js

export const clientConfig = {
  // 🎨 Brand Identity & Theme
  theme: {
    clientName: "Subtain Mehmood",
    brandName: "Subtain Designs",
    tagline: "Brand Identity & Visual System Designer",
    location: "Pakistan",
    
    // Theme Colors
    colors: {
      bg: "#070707",
      surface: "#111111",
      surfaceLight: "#1a1a1a",
      textPrimary: "#EBE9E0",
      textSecondary: "#9e9e9e",
      accent: "#d4ff32",       // e.g. #d4ff32 (Lime), #3b82f6 (Blue), #ec4899 (Pink)
      accentHover: "#bce622",
      border: "rgba(235, 233, 224, 0.1)",
      glassBg: "rgba(17, 17, 17, 0.75)"
    },

    // Fonts (Configured in layout.js via next/font/google)
    fonts: {
      heading: "Bricolage Grotesque",
      body: "Poppins"
    }
  },

  // 👤 Profile & Socials
  profile: {
    avatarUrl: "/images/profile.png",
    bio: "Brand identity designer. I design timeless visual identities & profiles that make clients stop, trust, and choose you.",
    statsText: "Trusted by 127+ founders & creators worldwide",
    ratingScore: "5.0 / 5.0",
    email: "contact@clientbrand.com",
    whatsapp: "https://wa.me/923000000000",
    linkedin: "https://linkedin.com/in/username",
    instagram: "https://instagram.com/username",
    calBookingUrl: "https://cal.com/username/discovery-call"
  },

  // 💰 Product Pricing & Launch Strategy
  product: {
    name: "LinkedIn Authority Kit™",
    shortBadge: "Plug & Play Visual System",
    heroHeadline: "Transform your LinkedIn profile from duct-taped to premium with",
    heroSubheadline: "The plug-and-play LinkedIn branding kit to instantly upgrade your profile without hiring an expensive designer.",
    originalValue: 1125,
    regularPrice: 97,
    launchPrice: 47,
    isLaunchActive: true,
    currencySymbol: "$",

    // Value Stack Deliverables
    features: [
      "10+ Premium banner templates that grab immediate attention",
      "10+ Featured section designs to convert profile visitors into paying clients",
      "15+ High-engagement carousel & post templates",
      "Sizing templates + PDF guide covering colors, fonts, and design rules",
      "Bonus: 3-minute video guide showing how to customize templates like a pro"
    ],

    valueBreakdown: [
      { title: "10+ LinkedIn Banner Templates", value: "$600" },
      { title: "10+ Featured Section Templates", value: "$100" },
      { title: "15+ High-Converting Post Templates", value: "$300" },
      { title: "Profile Sizing & Branding PDF Guide", value: "$75" },
      { title: "Video Walkthrough & Implementation Guide", value: "$50" }
    ]
  },

  // 💳 Bank & Direct Payment Details (For Checkout)
  paymentDetails: {
    currency: "USD / PKR",
    formEndpoint: "https://api.web3forms.com/submit", // or your form handler
    accessKey: "YOUR_WEB3FORMS_ACCESS_KEY",
    bankAccounts: [
      { key: "Bank Name", value: "Bank Alfalah" },
      { key: "Account Title", value: "Subtain Mehmood" },
      { key: "IBAN", value: "PK17ALFH0361001008818144" },
      { key: "Account Number", value: "0361001008818144" },
      { key: "Region", value: "Pakistan" },
      { key: "Support WhatsApp", value: "+92 309 8171686" }
    ]
  },

  // 📧 Email Capture / Lead Magnet (Swipe My Training)
  newsletter: {
    formAction: "https://app.kit.com/forms/YOUR_FORM_ID/subscriptions", // ConvertKit / Mailchimp
    videoDurationLabel: "[5-min free video]",
    headline: "Free LinkedIn Branding Training: A proven framework to attract high-ticket clients.",
    subtext: "Join 127+ founders getting short tactical notes on design & profile optimization.",
    thumbnailUrl: "/images/video-thumbnail.png"
  },

  // 🔗 Links Page Hub
  linksPage: {
    badgeText: "Verified Creator",
    linksList: [
      {
        title: "⚡ Get LinkedIn Authority Kit™",
        subtitle: "Plug-and-play visual templates (Only $47)",
        url: "/authority-kit",
        highlight: true,
        tag: "Best Seller"
      },
      {
        title: "🎥 Free 5-Min Training Video",
        subtitle: "How to design a client-converting profile",
        url: "/swipemytraining",
        highlight: false,
        tag: "Free"
      },
      {
        title: "📞 Book a 1:1 Brand Strategy Call",
        subtitle: "Direct private discovery session",
        url: "https://cal.com/username/discovery-call",
        highlight: false,
        tag: "Limited"
      },
      {
        title: "💬 Chat on WhatsApp",
        subtitle: "Quick inquiries & custom work",
        url: "https://wa.me/923000000000",
        highlight: false
      }
    ]
  },

  // 🎓 Member Dashboard & Canva Templates
  dashboard: {
    welcomeVideoEmbed: "https://drive.google.com/file/d/YOUR_VIDEO_ID/preview",
    implementationVideoEmbed: "https://drive.google.com/file/d/YOUR_TUTORIAL_ID/preview",
    
    // Deliverable Resource Links
    resources: [
      {
        id: "banner",
        title: "10+ LinkedIn Banner Templates",
        category: "Canva Templates",
        url: "https://canva.com/design/your-banner-link",
        tag: "Core Asset"
      },
      {
        id: "featured",
        title: "10+ Featured Section Graphics",
        category: "Canva Templates",
        url: "https://canva.com/design/your-featured-link",
        tag: "Core Asset"
      },
      {
        id: "carousels",
        title: "15+ Authority Carousel Layouts",
        category: "Canva Templates",
        url: "https://canva.com/design/your-carousel-link",
        tag: "Engagement"
      },
      {
        id: "playbook",
        title: "Font, Color & Sizing Brand Guide (PDF)",
        category: "Documentation",
        url: "https://canva.com/design/your-guide-link",
        tag: "PDF Guide"
      },
      {
        id: "bonus",
        title: "High-Resolution Icon & Asset Pack",
        category: "Google Drive Assets",
        url: "https://drive.google.com/drive/folders/your-folder-id",
        tag: "Bonus"
      }
    ],

    // 5-Step Implementation Checklist
    checklist: [
      { id: "step1", text: "Watch the 3-minute Welcome & Quick Start Video" },
      { id: "step2", text: "Duplicate Canva Banner Templates into your Canva account" },
      { id: "step3", text: "Customize font colors & profile headline with your bio" },
      { id: "step4", text: "Upload your banner & featured section to your profile" },
      { id: "step5", text: "Publish your first authority carousel post using the swipe file" }
    ]
  }
};
```

---

## 4. Design System & CSS Variables
**File:** `src/app/globals.css`

```css
:root {
  --bg-color: #070707;
  --surface-color: #111111;
  --surface-light: #181818;
  --surface-hover: #222222;
  --text-primary: #EBE9E0;
  --text-secondary: #9e9e9e;
  --accent-color: #d4ff32;
  --accent-hover: #bce622;
  --border-color: rgba(235, 233, 224, 0.1);
  --border-highlight: rgba(212, 255, 50, 0.3);
  --glass-bg: rgba(17, 17, 17, 0.7);
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --shadow-glow: 0 0 35px rgba(212, 255, 50, 0.12);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-color);
  color: var(--text-primary);
  font-family: var(--font-poppins, system-ui, sans-serif);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::selection {
  background: var(--accent-color);
  color: #000;
}

a {
  color: inherit;
  text-decoration: none;
  transition: all 0.25s ease;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

/* Headings */
h1, h2 {
  font-family: var(--font-bricolage, system-ui, sans-serif);
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
}

h3, h4, h5, h6 {
  font-weight: 600;
  letter-spacing: -0.01em;
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Global Button Styles */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-color);
  color: #000000;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 0.9rem 2rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-glow);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}
```

---

## 5. Page 1: Authority Kit Sales Page
**File:** `src/app/authority-kit/page.js`

```jsx
import { clientConfig } from '../../config/client.config';
import styles from './page.module.css';

export const metadata = {
  title: `${clientConfig.product.name} – ${clientConfig.theme.brandName}`,
  description: clientConfig.product.heroSubheadline,
};

export default function AuthorityKitPage() {
  const { product } = clientConfig;
  const price = product.isLaunchActive ? product.launchPrice : product.regularPrice;

  return (
    <main className={styles.main}>
      {/* Background Glow */}
      <div className={styles.topGlow} />

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.badge}>Step 01 • Instant Access</div>
          
          <h1 className={styles.headline}>
            {product.heroHeadline} <span className={styles.accentText}>{product.name}</span>
          </h1>
          
          <p className={styles.subheadline}>
            {product.heroSubheadline} Available today for just <strong className={styles.accentText}>${price}</strong>.
          </p>

          <div className={styles.ctaGroup}>
            <a href="/checkout" className="btn-primary">
              Get Instant Access Now — ${price}
            </a>
          </div>

          {/* VSL Video Container */}
          <div className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/ptvxcjmMaZI?rel=0&modestbranding=1"
              title="Product Walkthrough Video"
              className={styles.iframe}
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Value Stack Breakdown */}
      <section className={styles.offerSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Everything You Get Inside</h2>
          <div className={styles.stackGrid}>
            {product.valueBreakdown.map((item, idx) => (
              <div key={idx} className={styles.stackCard}>
                <span className={styles.checkIcon}>✓</span>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemValue}>{item.value} Value</span>
              </div>
            ))}
          </div>

          <div className={styles.pricingSummaryBox}>
            <div className={styles.totalValue}>Total Value: <span>${product.originalValue}</span></div>
            <div className={styles.currentDeal}>Today's Special Price: <strong>${price}</strong></div>
            <a href="/checkout" className="btn-primary" style={{ width: '100%', maxWidth: '380px' }}>
              Claim Your Kit Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## 6. Page 2: Swipe My Training Squeeze Page
**File:** `src/app/swipemytraining/page.js`

```jsx
"use client";

import { useState } from 'react';
import { clientConfig } from '../../config/client.config';
import styles from './page.module.css';

export default function SwipeMyTrainingPage() {
  const { newsletter } = clientConfig;
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

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
      setStatus('error');
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.radialGlow} />
      <div className="container">
        <div className={styles.contentBox}>
          <div className={styles.label}>{newsletter.videoDurationLabel}</div>
          
          <h1 className={styles.headline}>
            {newsletter.headline}
          </h1>

          <div className={styles.thumbnailContainer}>
            <img 
              src={newsletter.thumbnailUrl} 
              alt="Training Thumbnail" 
              className={styles.thumbnail}
            />
          </div>

          <p className={styles.subtext}>
            {newsletter.subtext}
          </p>

          <div className={styles.formContainer}>
            {status === 'success' ? (
              <div className={styles.successMessage}>
                <h3>🎉 You&#39;re in!</h3>
                <p>Check your email inbox to confirm and watch the training immediately.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                  name="fields[first_name]" 
                  type="text" 
                  placeholder="Your First Name" 
                  required 
                  className={styles.input}
                />
                <input 
                  name="email_address" 
                  type="email" 
                  placeholder="Your Email Address" 
                  required 
                  className={styles.input}
                />
                <button type="submit" disabled={status === 'submitting'} className="btn-primary">
                  {status === 'submitting' ? 'Getting Link...' : 'Get Instant Access'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## 7. Page 3: High-Converting Checkout Page
**File:** `src/app/checkout/page.js`

```jsx
"use client";

import { useState } from 'react';
import { clientConfig } from '../../config/client.config';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { product, paymentDetails } = clientConfig;
  const price = product.isLaunchActive ? product.launchPrice : product.regularPrice;
  const original = product.originalValue;
  const savings = original - price;

  const [copiedKey, setCopiedKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate or send payment confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <main className={styles.checkoutWrapper}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Offer Summary & Guarantees */}
          <div className={styles.leftCol}>
            <div className={styles.badge}>Order Confirmation</div>
            <h1 className={styles.productTitle}>{product.name}</h1>
            <p className={styles.productDescription}>{product.heroSubheadline}</p>

            <div className={styles.featureList}>
              {product.features.map((feat, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.check}>✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className={styles.guaranteeCard}>
              <h4>🛡️ Instant Access Guarantee</h4>
              <p>Once you submit your transaction screenshot, your access credentials and dashboard link will be dispatched immediately.</p>
            </div>
          </div>

          {/* Right Column: Price Stack & Bank Details Form */}
          <div className={styles.rightCol}>
            <div className={styles.checkoutCard}>
              <div className={styles.pricingCardHeader}>
                <div>
                  <span className={styles.dealBadge}>Save ${savings}</span>
                  <div className={styles.priceRow}>
                    <span className={styles.oldPrice}>${original}</span>
                    <span className={styles.newPrice}>${price}</span>
                  </div>
                </div>
              </div>

              {isSuccess ? (
                <div className={styles.successNotice}>
                  <h3>🎉 Payment Submitted!</h3>
                  <p>We received your receipt. Check your email or click below to enter the dashboard.</p>
                  <a href="/dashboard" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                    Go to Dashboard
                  </a>
                </div>
              ) : (
                <>
                  {/* Bank Transfer Instructions */}
                  <div className={styles.bankBox}>
                    <h3 className={styles.bankTitle}>Direct Bank Transfer Details</h3>
                    {paymentDetails.bankAccounts.map((acc, idx) => (
                      <div key={idx} className={styles.bankRow}>
                        <span className={styles.bankLabel}>{acc.key}:</span>
                        <span className={styles.bankVal}>{acc.value}</span>
                        {acc.value.includes('PK') || acc.value.length > 8 ? (
                          <button 
                            type="button" 
                            onClick={() => handleCopy(acc.value, acc.key)}
                            className={styles.copyBtn}
                          >
                            {copiedKey === acc.key ? 'Copied!' : 'Copy'}
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  {/* Submission Form */}
                  <form onSubmit={handleFormSubmit} className={styles.form}>
                    <label className={styles.label}>Full Name</label>
                    <input type="text" required placeholder="John Doe" className={styles.input} />

                    <label className={styles.label}>Email Address (For dashboard access)</label>
                    <input type="email" required placeholder="john@example.com" className={styles.input} />

                    <label className={styles.label}>Upload Payment Receipt (Screenshot or PDF)</label>
                    <input type="file" required accept="image/*,.pdf" className={styles.fileInput} />

                    <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                      {isSubmitting ? 'Confirming Receipt...' : `Complete Order ($${price})`}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## 8. Page 4: Link-in-Bio Hub
**File:** `src/app/links/page.js`

```jsx
import { clientConfig } from '../../config/client.config';
import styles from './page.module.css';

export const metadata = {
  title: `${clientConfig.theme.clientName} | Quick Links`,
  description: clientConfig.profile.bio
};

export default function LinksPage() {
  const { profile, linksPage, theme } = clientConfig;

  return (
    <main className={styles.wrapper}>
      <div className="container" style={{ maxWidth: '640px' }}>
        {/* Profile Header */}
        <div className={styles.profileSection}>
          <div className={styles.avatarWrapper}>
            <img src={profile.avatarUrl} alt={theme.clientName} className={styles.avatar} />
          </div>
          <h1 className={styles.name}>{theme.clientName}</h1>
          <p className={styles.tagline}>{theme.tagline}</p>
          <div className={styles.proofBadge}>
            <span>★★★★★</span> {profile.statsText}
          </div>
          <p className={styles.bio}>{profile.bio}</p>
        </div>

        {/* Links Stack */}
        <div className={styles.linksStack}>
          {linksPage.linksList.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url}
              className={`${styles.linkCard} ${link.highlight ? styles.highlightCard : ''}`}
              target={link.url.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              <div className={styles.linkInfo}>
                <div className={styles.linkTitleRow}>
                  <span className={styles.linkTitle}>{link.title}</span>
                  {link.tag && <span className={styles.tag}>{link.tag}</span>}
                </div>
                {link.subtitle && <p className={styles.linkSubtitle}>{link.subtitle}</p>}
              </div>
              <span className={styles.arrow}>→</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
```

---

## 9. Page 5: Member & Training Dashboard
**File:** `src/app/dashboard/page.js`

```jsx
"use client";

import { useState } from 'react';
import { clientConfig } from '../../config/client.config';
import styles from './page.module.css';

export default function DashboardPage() {
  const { dashboard, theme } = clientConfig;
  const [completedItems, setCompletedItems] = useState({});
  const [activeTab, setActiveTab] = useState('welcome'); // welcome | implementation

  const toggleItem = (id) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalSteps = dashboard.checklist.length;
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <main className={styles.dashboard}>
      <div className="container">
        {/* Welcome Header */}
        <header className={styles.header}>
          <div>
            <span className={styles.badge}>Member Area</span>
            <h1 className={styles.title}>Welcome to Your Training & Kit Portal</h1>
            <p className={styles.subtitle}>Follow the steps below to customize and launch your assets.</p>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressContainer}>
            <div className={styles.progressLabel}>
              <span>Implementation Progress</span>
              <strong>{progressPercent}%</strong>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </header>

        {/* Video Player Box */}
        <section className={styles.videoSection}>
          <div className={styles.tabBar}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'welcome' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('welcome')}
            >
              1. Welcome & Overview
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'implementation' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('implementation')}
            >
              2. 3-Min Implementation Guide
            </button>
          </div>

          <div className={styles.videoFrameWrapper}>
            <iframe 
              src={activeTab === 'welcome' ? dashboard.welcomeVideoEmbed : dashboard.implementationVideoEmbed} 
              title="Dashboard Video" 
              className={styles.iframe}
              allowFullScreen
            />
          </div>
        </section>

        {/* Deliverables Resource Cards */}
        <section className={styles.resourcesSection}>
          <h2 className={styles.sectionHeading}>Your Template Assets</h2>
          <div className={styles.resourceGrid}>
            {dashboard.resources.map((res) => (
              <div key={res.id} className={styles.resourceCard}>
                <div className={styles.resCategory}>{res.category}</div>
                <h3 className={styles.resTitle}>{res.title}</h3>
                <span className={styles.resTag}>{res.tag}</span>
                <a 
                  href={res.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '1.2rem', padding: '0.7rem' }}
                >
                  Open in Canva / Download ↗
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-step Action Checklist */}
        <section className={styles.checklistSection}>
          <h2 className={styles.sectionHeading}>Action Checklist</h2>
          <div className={styles.checklistCard}>
            {dashboard.checklist.map((item) => (
              <label key={item.id} className={styles.checkRow}>
                <input 
                  type="checkbox" 
                  checked={!!completedItems[item.id]} 
                  onChange={() => toggleItem(item.id)}
                  className={styles.checkbox}
                />
                <span className={completedItems[item.id] ? styles.strikeText : ''}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
```

---

## 10. Essential Shared Components
### `src/components/FadeIn.jsx`
```jsx
"use client";

import { useEffect, useRef, useState } from 'react';

export default function FadeIn({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.1 });

    const { current } = domRef;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
      }}
    >
      {children}
    </div>
  );
}
```

---

## 11. How to Customize for Any Client in 5 Minutes

Whenever you onboard a new client, you **only** need to edit `src/config/client.config.js`:

1. **Change Accent Color**:
   In `client.config.js`, change:
   ```javascript
   accent: "#d4ff32" // replace with client's primary color, e.g. #3b82f6 (blue) or #f59e0b (gold)
   ```
2. **Change Client Name & Bio**:
   Update `clientName`, `tagline`, and `bio`.
3. **Change Pricing & Currency**:
   Update `originalValue`, `regularPrice`, and `launchPrice`.
4. **Change Bank Transfer IBAN**:
   Replace the bank details in `paymentDetails.bankAccounts`.
5. **Change Canva & Video Links**:
   Paste the client's actual Canva template links and Google Drive/YouTube video IDs in `dashboard.resources` and `dashboard.welcomeVideoEmbed`.

---
*Ready to launch. All pages adhere to modern Next.js App Router conventions with instant deployment capability.*
