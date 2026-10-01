"use client";

import { useState } from 'react';
import Link from 'next/link';
import FadeIn from './FadeIn';
import styles from './FAQ.module.css';

const faqData = [
  {
    q: "What exactly is included in Tino's LinkedIn Authority Kit™?",
    a: "You get 10+ high-authority banner templates, 10+ featured section funnel designs, 15+ viral carousel and post templates, Tino's comprehensive typography and sizing brand guide (PDF), plus a 3-minute video masterclass showing you how to customize everything like a pro in Canva."
  },
  {
    q: "Do I need design skills or a paid Canva subscription?",
    a: "No design skills or paid software required! All templates are 100% compatible with a free Canva account. You can easily drag and drop your photos, change colors, customize text, and export in high resolution within minutes."
  },
  {
    q: "How long does it take to customize and launch on my profile?",
    a: "Most creators and founders set up their new banner and featured sections in under 15 minutes. Once applied, your profile immediately looks top-tier and builds instant credibility with visitors."
  },
  {
    q: "Who is this personal branding system designed for?",
    a: "It is specifically engineered for founders, consultants, coaches, B2B creators, and agency owners who want to monetize their audience and attract high-ticket clients on LinkedIn without spending $3,000+ on design agencies."
  },
  {
    q: "What will I get that isn't in Tino's free 7-day training?",
    a: "While Tino's free training teaches core positioning frameworks, the Authority Kit gives you the exact plug-and-play Canva templates, headline formulas, and design assets to implement immediately without building from scratch."
  },
  {
    q: "How will this help me land more clients and inbound leads?",
    a: "Your LinkedIn banner and featured section act as your primary sales landing page. By applying proven visual hierarchy and clear calls-to-action, profile visitors immediately understand what you do, trust your expertise, and reach out via DM or booking links."
  },
  {
    q: "How do I access the templates and bonuses after purchase?",
    a: "Instant access! Immediately after your payment is confirmed, your Canva template links, video guides, and member dashboard access credentials will be delivered directly to your email inbox."
  },
  {
    q: "Is this a one-time payment or a recurring subscription?",
    a: "It is a one-time payment of just $47 for lifetime access. There are no recurring fees, hidden charges, or ongoing subscription costs."
  },
  {
    q: "What is your refund policy?",
    a: "We offer a 100% risk-free 48-hour money-back guarantee. If you go through Tino's training and templates and don't feel they immediately elevate your personal brand, send an email within 48 hours for a full, hassle-free refund."
  },
  {
    q: "Can I use these templates for multiple profiles or client accounts?",
    a: "Yes! Once you purchase the kit, you have full flexibility to reuse, adapt, and apply the templates across your own personal brands or client projects as often as needed."
  },
  {
    q: "What if I get stuck or need help with customization?",
    a: "The kit includes a step-by-step video walkthrough explaining colors, font pairing, and sizing rules. Plus, you can reach out via WhatsApp support or email anytime for quick assistance."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className="container">
        <FadeIn>
          <div className={styles.faqWrapper}>
            <h2 className={styles.faqTitle}>
              Frequently asked questions
            </h2>

            <div className={styles.faqList}>
              {faqData.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
                    <button 
                      type="button" 
                      onClick={() => toggleFAQ(idx)}
                      className={styles.faqQuestionBtn}
                      aria-expanded={isOpen}
                    >
                      <span className={styles.faqQuestionText}>{item.q}</span>
                      <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}>
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div className={styles.faqAnswer}>
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA Button */}
            <div className={styles.ctaWrapper}>
              <Link href="/checkout" className={styles.faqCtaBtn}>
                I am in ($47) →
              </Link>
              <span className={styles.ctaSubtext}>
                🔒 48-Hour Money-Back Guarantee • Instant Access
              </span>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
