"use client";

import { useState } from 'react';
import FadeIn from './FadeIn';
import styles from './DeliverablesShowcase.module.css';

const categories = [
  { id: "all", name: "All Assets" },
  { id: "banners", name: "LinkedIn Banners" },
  { id: "carousels", name: "Carousel Slides" },
  { id: "features", name: "Featured Sections" },
  { id: "tweets", name: "Viral Post Templates" },
];

const showcaseItems = [
  {
    id: 1,
    category: "banners",
    title: "High-Authority Hero Banner",
    badge: "10+ Variations",
    image: "/images/tino/banners/Banner 1.png",
    desc: "Engineered with high-contrast typography, strategic whitespace, and direct conversion hooks."
  },
  {
    id: 2,
    category: "carousels",
    title: "Viral Authority Carousel Slide 1",
    badge: "Slide Deck",
    image: "/images/tino/carousels/Carousel Template Slide 1.png",
    desc: "Designed to maximize retention and thumb-stopping power in the LinkedIn feed."
  },
  {
    id: 3,
    category: "features",
    title: "Featured Section Offer Graphic",
    badge: "Lead Magnet",
    image: "/images/tino/features/Feature Section 1.png",
    desc: "Transforms profile visitors into calendar bookings and email subscribers."
  },
  {
    id: 4,
    category: "banners",
    title: "Minimal Dark Mode Executive Banner",
    badge: "Executive Style",
    image: "/images/tino/banners/Banner 2.png",
    desc: "Sleek obsidian background with mint green accents, perfect for B2B consultants."
  },
  {
    id: 5,
    category: "carousels",
    title: "Step-by-Step Educational Carousel",
    badge: "Framework",
    image: "/images/tino/carousels/Carousel Template Slide 3.png",
    desc: "Numbered visual steps to teach actionable frameworks and get hundreds of saves."
  },
  {
    id: 6,
    category: "tweets",
    title: "LinkedIn Tweet-Style Visual Post",
    badge: "High-Engagement",
    image: "/images/tino/tweets/Tweet post 1.png",
    desc: "Compact micro-content template that stands out effortlessly in dark mode."
  },
  {
    id: 7,
    category: "features",
    title: "Discovery Call Booking Feature Section",
    badge: "Calendar Hook",
    image: "/images/tino/features/Feature Section 2.png",
    desc: "Direct call-to-action asset with high-contrast clickable appearance."
  },
  {
    id: 8,
    category: "carousels",
    title: "Engagement & Summary Carousel Slide",
    badge: "Call To Action",
    image: "/images/tino/carousels/Carousel Template Slide 6.png",
    desc: "Follow/Repost slide with clear visual cues to maximize profile visits."
  }
];

export default function DeliverablesShowcase() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems = activeTab === "all" 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === activeTab);

  return (
    <section className={styles.section}>
      <div className="container">
        <FadeIn>
          <div className={styles.header}>
            <div className="pill-badge">Visual Deliverables Preview</div>
            <h2 className={styles.title}>
              Peek Inside the <span className={styles.accentText}>Authority Visual System</span>
            </h2>
            <p className={styles.subtitle}>
              Every asset is crafted in Canva with strict design rules — typography, grid hierarchy, and psychology-backed conversion zones.
            </p>

            {/* Filter Tabs */}
            <div className={styles.tabsRow}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`${styles.tabBtn} ${activeTab === cat.id ? styles.activeTabBtn : ''}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Gallery Grid */}
        <div className={styles.galleryGrid}>
          {filteredItems.map((item) => (
            <FadeIn key={item.id} delay={0.05}>
              <div className={`glass-card ${styles.card}`}>
                <div className={styles.imageFrame}>
                  <img src={item.image} alt={item.title} className={styles.previewImage} />
                  <span className={styles.badge}>{item.badge}</span>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className={styles.bottomCallout}>
            <div className={styles.calloutLeft}>
              <h4>Ready to transform your profile in under 10 minutes?</h4>
              <p>Get instant Canva template links + video walkthrough.</p>
            </div>
            <a href="/checkout" className="btn-primary">
              Get Instant Access ($47) →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
