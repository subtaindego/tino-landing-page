import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import LaunchOffer from '../components/LaunchOffer';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import styles from './page.module.css';

export const metadata = {
  title: "LinkedIn Brand Blueprint – Build a Successful Personal Brand in 30 Days",
  description: "Get Tino's step by step LinkedIn Brand Blueprint and go from 'I don't know where to start' to a 3 month strategy and a full month of posts mapped out.",
};

const trustAvatars = [
  { src: "/images/dummy/avatar1.jpg", alt: "Sarah Jenkins", initials: "SJ" },
  { src: "/images/dummy/avatar2.jpg", alt: "Marcus Chen", initials: "MC" },
  { src: "/images/dummy/avatar3.jpg", alt: "Emily Roberts", initials: "ER" },
  { src: "/images/dummy/avatar4.jpg", alt: "David Miller", initials: "DM" },
  { src: "/images/dummy/avatar5.jpg", alt: "Sophia Taylor", initials: "ST" },
  { src: "/images/dummy/avatar6.jpg", alt: "James Wilson", initials: "JW" },
  { src: "/images/dummy/avatar7.jpg", alt: "Olivia Brown", initials: "OB" },
  { src: "/images/dummy/avatar8.jpg", alt: "Daniel Lee", initials: "DL" }
];

const discoverItems = [
  "A plain English guide to how LinkedIn works, plus the four myths that keep most people from ever posting",
  "Four clarity questions that point to your brand, so you stop second guessing every post",
  "A profile rewrite system for your headline, About section, banner, and Featured section",
  "The story then takeaway formula, proven hooks, and AI prompts you can copy for hooks and post ideas",
  "Three ways to get paid from your brand, plus a 3 month strategy and a 30 day posting plan"
];

const includedDeliverables = [
  { name: "9 Step by Step Modules", status: "Included" },
  { name: "10 Worksheets", status: "Included" },
  { name: "AI Prompts for Hooks and Post Ideas", status: "Included" },
  { name: "30 Day Posting Calendar (20 Posts)", status: "Included" },
  { name: "3 Month Strategy Template", status: "Included" },
  { name: "Daily Engagement Routine and Checklist", status: "Included" }
];

export default function HomePage() {
  return (
    <>
      <main className={styles.mainContent}>
        {/* ================= HERO SECTION ================= */}
        <section className={styles.heroSection}>
          <div className="container">
            <FadeIn>
              <div className={styles.heroContent}>
                {/* Trust Header: Avatars + Stars + Proof Text */}
                <div className={styles.trustHeaderRow}>
                  <div className={styles.avatarStack}>
                    {trustAvatars.map((av, idx) => (
                      <div key={idx} className={styles.stackAvatarWrapper} style={{ zIndex: 10 - idx }}>
                        <img
                          src={av.src}
                          alt={av.alt}
                          className={styles.stackAvatarImg}
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.trustInfo}>
                    <span className={styles.starsRow}>★★★★★</span>
                    <span className={styles.trustText}>
                      140+ founders &amp; creators
                    </span>
                  </div>
                </div>

                {/* Main Headline */}
                <h1 className={styles.title}>
                  Build the strategy that makes your personal brand pay off{' '}
                  <span className={styles.gradientHighlight}>in just 30 days.</span>
                </h1>

                {/* Subtitle */}
                <p className={styles.subtitle}>
                  Get Tino's step by step LinkedIn Brand Blueprint and go from &quot;I don&apos;t know where to start&quot; to a 3 month strategy and a full month of posts mapped out.
                </p>

                {/* 3 Pills Row */}
                <div className={styles.pillRow}>
                  <span className={styles.heroPill}>9 Module Workbook</span>
                  <span className={styles.heroPill}>10 Worksheets</span>
                  <span className={styles.heroPill}>30 Day Posting Plan</span>
                </div>

                {/* CTA Button */}
                <div className={styles.heroBtnWrapper}>
                  <Link href="/checkout" className={styles.heroCtaBtn}>
                    Get instant access ($47)→
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ================= STEP 02 SECTION ================= */}
        <section className={styles.offerSection}>
          <div className="container">
            <FadeIn>
              <div className={styles.header}>
                <div className={styles.badge}>STEP 02</div>
                <h2 className={styles.sectionTitle}>
                  Claim Your Exclusive <br />
                  <span className={styles.gradientHighlight}>LinkedIn Brand Blueprint</span>
                </h2>
                <p className={styles.sectionDesc}>
                  If you give me one weekend, I&apos;ll give you the exact workbook I wish I had when I started: what to stand for, what to post every day, and three ways to get paid from your brand.
                </p>
              </div>
            </FadeIn>

            {/* Features & Deliverables Grid */}
            <div className={styles.featuresGrid}>
              {/* Left Card: Inside Blueprint */}
              <FadeIn delay={0.1}>
                <div className={styles.featuresCard}>
                  <h3 className={styles.cardHeader}>Inside the LinkedIn Brand Blueprint, you&apos;ll discover:</h3>
                  <ul className={styles.list}>
                    {discoverItems.map((point, index) => (
                      <li key={index} className={styles.listItem}>
                        <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Right Card: Exactly what you get */}
              <FadeIn delay={0.2}>
                <div className={styles.valueCard}>
                  <h3 className={styles.cardHeader}>Exactly what you get:</h3>
                  <div className={styles.valueList}>
                    {includedDeliverables.map((item, index) => (
                      <div key={index} className={styles.valueRow}>
                        <span className={styles.valueItemText}>{item.name}</span>
                        <span className={styles.includedTag}>{item.status}</span>
                      </div>
                    ))}
                    <div className={styles.divider}></div>
                    <div className={styles.specialPriceRow}>
                      <span>Launch Special Price:</span>
                      <span className={styles.dealPrice}>$47</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* 48 Hour Money Back Guarantee */}
            <FadeIn delay={0.25}>
              <div className={styles.guaranteeCard}>
                <div className={styles.guaranteeBadgeWrapper}>
                  <Image
                    src="/images/guarantee/Batch.png"
                    alt="48 Hour Money Back Guarantee"
                    width={110}
                    height={110}
                    className={styles.guaranteeBadgeImg}
                  />
                </div>
                <div className={styles.guaranteeText}>
                  <h3>48 Hour Money Back Guarantee</h3>
                  <p>
                    If the LinkedIn Brand Blueprint doesn&apos;t give you a clear plan for your personal brand, just email within 48 hours for a full refund, no questions asked. And yes, you can keep the workbook and worksheets.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ================= LAUNCH OFFER SECTION ================= */}
        <LaunchOffer />

        {/* ================= TESTIMONIALS SECTION ================= */}
        <Testimonials />

        {/* ================= FREQUENTLY ASKED QUESTIONS SECTION ================= */}
        <FAQ />
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </>
  );
}
