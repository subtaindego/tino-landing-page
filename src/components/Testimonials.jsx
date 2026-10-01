"use client";

import { useState, useEffect } from 'react';
import FadeIn from './FadeIn';
import styles from './Testimonials.module.css';

const testimonials1 = [
  {
    name: "Sarah Jenkins",
    role: "B2B Marketing Director",
    text: "The LinkedIn Authority Kit is hands down the best investment for my profile. In just 48 hours, I went from an ignored profile to attracting genuine inbound enterprise opportunities.",
    image: "/images/dummy/avatar1.jpg"
  },
  {
    name: "Marcus Chen",
    role: "Tech Entrepreneur",
    text: "Remarkable quality. The typography blueprint and banner assets alone are worth 10x the price. Everything was so easy to customize in Canva without design skills.",
    image: "/images/dummy/avatar2.jpg"
  },
  {
    name: "Emily Roberts",
    role: "Executive Consultant",
    text: "I was struggling to look credible on LinkedIn. After implementing these templates, my profile looked elite immediately and I closed two new high-ticket retainers.",
    image: "/images/dummy/avatar3.jpg"
  },
  {
    name: "David Miller",
    role: "Digital Strategist",
    text: "The carousel templates and featured section designs are top-tier. My engagement skyrocketed by over 300% on my very first post using this framework.",
    image: "/images/dummy/avatar4.jpg"
  },
  {
    name: "Sophia Taylor",
    role: "Creative Director",
    text: "Clean, impactful, and mathematically structured for conversion. Truly understands how human attention and trust work on LinkedIn.",
    image: "/images/dummy/avatar5.jpg"
  },
  {
    name: "James Wilson",
    role: "Software Architect",
    text: "Saved me dozens of hours of trial and error. The templates are clean, modern, and deliver immediate visual authority.",
    image: "/images/dummy/avatar6.jpg"
  }
];

const testimonials2 = [
  {
    name: "Olivia Brown",
    role: "B2B Growth Lead",
    text: "The templates are insane. Modern, bold, and took me less than 5 minutes to adapt in Canva. Colleagues literally thought I hired a $3,000 design agency for my profile.",
    image: "/images/dummy/avatar7.jpg"
  },
  {
    name: "Daniel Lee",
    role: "Product Leader",
    text: "My inbound DMs surged after revamping my LinkedIn banner and featured section with these assets. The authority you command with these designs is unmatched.",
    image: "/images/dummy/avatar8.jpg"
  },
  {
    name: "Elena Rostova",
    role: "Head of Talent & HR",
    text: "I loved the result! It turned my profile into a clean, impactful presence that matches my personal brand perfectly. Highly recommended!",
    image: "/images/dummy/avatar9.jpg"
  },
  {
    name: "Liam Patel",
    role: "Founder & CEO",
    text: "BIG shoutout for this kit! We had a vision in mind, but these templates took things to a whole new level. Best $47 spent on personal branding.",
    image: "/images/dummy/avatar10.jpg"
  },
  {
    name: "Chloe Adams",
    role: "Startup Investor",
    text: "Demonstrates an ability to comprehend deep positioning concepts. Clear, impactful, and authoritative design system.",
    image: "/images/dummy/avatar11.jpg"
  }
];

const testimonials3 = [
  {
    name: "Lucas Scott",
    role: "UI/UX Designer",
    text: "The attention to detail and grid consistency is on a pro level. I highly recommend this Authority Kit to everyone who wants to stand out.",
    image: "/images/dummy/avatar12.jpg"
  },
  {
    name: "Maya Lin",
    role: "Co-Founder & CEO",
    text: "Great visual hierarchy and incredible ease of use. Was able to implement the banners and carousels right away with fantastic results.",
    image: "/images/dummy/avatar13.jpg"
  },
  {
    name: "Hannah Wright",
    role: "Brand Videographer",
    text: "Amazing assets, super flexible to customize and perfectly tailored for high engagement. Thank you!",
    image: "/images/dummy/avatar14.jpg"
  },
  {
    name: "Benjamin Clark",
    role: "Apparel Brand Creator",
    text: "Top-notch experience. The banner and featured section templates were simple to edit and saved me time. The designs look clean, professional, and premium.",
    image: "/images/dummy/avatar15.jpg"
  },
  {
    name: "Grace Kim",
    role: "Executive Consultant",
    text: "Clearly skilled in visual design and knows what works to stand out in the crowded LinkedIn feed. Solutions that actually drive inbound results.",
    image: "/images/dummy/avatar16.jpg"
  },
  {
    name: "Noah Martinez",
    role: "Digital Marketing Strategist",
    text: "I was attempting to do my LinkedIn branding myself and it was not working. This kit gives you the exact attention getter and call to action to showcase your true value.",
    image: "/images/dummy/avatar17.jpg"
  }
];

export default function Testimonials({
  titlePart1 = "What People Say About",
  titleHighlight = "Authority Kit™",
  subtitle = "Hear from creators, consultants, and founders who transformed their visual presence with this plug-and-play visual kit."
}) {
  const renderCard = (t, prefix) => (
    <div key={`${prefix}-${t.name}`} className={styles.card}>
      <div className={styles.cardStars}>★★★★★</div>
      <p className={styles.text}>{`"${t.text}"`}</p>
      <div className={styles.author}>
        <img src={t.image} alt={t.name} className={styles.avatar} />
        <div className={styles.authorInfo}>
          <h4 className={styles.name}>{t.name}</h4>
          <p className={styles.role}>{t.role}</p>
        </div>
      </div>
    </div>
  );

  const renderMarqueeContent = (items, prefix) => (
    <div key={prefix} className={styles.marqueeSet}>
      {items.map((t) => renderCard(t, prefix))}
    </div>
  );

  return (
    <section id="testimonials" className={styles.testimonialSection}>
      <div className="container">
        <FadeIn>
          <div className={styles.header}>
            <div className={styles.badge}>Testimonials</div>
            <h2 className={styles.title}>
              {titlePart1} <br />
              <span className={styles.italicHighlight}>{titleHighlight}</span>
            </h2>
            {subtitle && (
              <p className={styles.subtitle}>
                {subtitle}
              </p>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeColumn}>
              <div className={styles.marqueeInner} style={{ animationDuration: '40s' }}>
                {renderMarqueeContent(testimonials1, 'col1-a')}
                {renderMarqueeContent(testimonials1, 'col1-b')}
              </div>
            </div>

            <div className={styles.marqueeColumn}>
              <div className={styles.marqueeInnerDown} style={{ animationDuration: '48s' }}>
                {renderMarqueeContent(testimonials2, 'col2-a')}
                {renderMarqueeContent(testimonials2, 'col2-b')}
              </div>
            </div>

            <div className={`${styles.marqueeColumn} ${styles.hideMobile}`}>
              <div className={styles.marqueeInner} style={{ animationDuration: '36s' }}>
                {renderMarqueeContent(testimonials3, 'col3-a')}
                {renderMarqueeContent(testimonials3, 'col3-b')}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
