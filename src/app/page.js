import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CountdownOffer from '../components/CountdownOffer';
import styles from './page.module.css';
import { clientConfig } from '../config/client.config';

export const metadata = {
  title: `${clientConfig.product.name} – Build a Successful Personal Brand on LinkedIn`,
  description: "Learn the exact system to build a high-authority personal brand on LinkedIn and convert profile visitors into paying clients.",
};

const trustAvatars = [
  { src: "/images/dummy/avatar1.jpg", alt: "Client" },
  { src: "/images/dummy/avatar2.jpg", alt: "Client" },
  { src: "/images/dummy/avatar3.jpg", alt: "Client" },
  { src: "/images/dummy/avatar4.jpg", alt: "Client" },
  { src: "/images/dummy/avatar5.jpg", alt: "Client" },
  { src: "/images/dummy/avatar6.jpg", alt: "Client" },
  { src: "/images/dummy/avatar7.jpg", alt: "Client" },
  { src: "/images/dummy/avatar8.jpg", alt: "Client" }
];

const keypoints = [
  "10+ High-Authority banner templates engineered to hook profile visitors in 3 seconds",
  "10+ Featured section funnel designs that turn profile clicks into booked calls & high-ticket clients",
  "15+ High-engagement carousel & post templates to explode reach and build unquestioned credibility",
  "Personal Brand Style Blueprint (PDF) covering typography rules, colors, and layout hierarchy",
  "Bonus: 3-minute fast-track video guide showing how to customize every template like a pro in Canva"
];

const valueItems = [
  { item: "10+ High-Authority Banner Templates", value: "$600" },
  { item: "10+ Featured Section Converting Funnels", value: "$100" },
  { item: "15+ High-Engagement Carousel & Post Templates", value: "$300" },
  { item: "Personal Brand Sizing & Style PDF Guide", value: "$75" },
  { item: "3-Minute Video Implementation Masterclass", value: "$50" }
];

export default function ReadyMadeBranding() {
  const currentPrice = clientConfig.product.isLaunchActive ? clientConfig.product.launchPrice : clientConfig.product.regularPrice;
  const originalPrice = clientConfig.product.regularPrice;
  const savings = originalPrice - currentPrice;

  return (
    <>
      <main className={styles.mainContent}>
        {/* Hero Section / Step 1 */}
        <section className={styles.heroSection}>
          <div className="container">
            <FadeIn>
              <div className={styles.heroContent}>
                {/* Trust Header: Avatars + Stars + Proof Text */}
                <div className={styles.trustHeaderRow}>
                  <div className={styles.avatarStack}>
                    {trustAvatars.map((av, idx) => (
                      <img key={av.src || idx} src={av.src} alt={av.alt} className={styles.stackAvatar} />
                    ))}
                  </div>
                  <div className={styles.trustInfo}>
                    <div className={styles.starsRow}>★★★★★</div>
                    <span className={styles.trustText}>140+ founders & creators building successful personal brands with Tino.</span>
                  </div>
                </div>

                {/* Main Headline matching reference */}
                <h1 className={styles.title}>
                  Build the foundation to monetize your personal brand <span className={styles.gradientHighlight}>in just 7 days.</span>
                </h1>

                {/* Subtitle matching reference */}
                <p className={styles.subtitle}>
                  Join Tino's proven LinkedIn branding training and get the exact visual system used to turn profiles into 24/7 client-generating landing pages.
                </p>

                {/* 3 Pill Badges Row with connected background shape */}
                <div className={styles.pillRow}>
                  <span className={styles.heroPill}>7-Day Brand Blueprint</span>
                  <span className={styles.heroPill}>Plug & Play Visuals</span>
                  <span className={styles.heroPill}>Proven Inbound Funnel</span>
                </div>

                {/* CTA Button above video with mint gradient */}
                <div className={styles.heroBtnWrapper}>
                  <a href="/checkout" className={styles.gradientCtaBtn}>
                    Get instant access (${currentPrice}) →
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Video Container */}
            <FadeIn delay={0.2}>
              <div className={styles.videoContainer}>
                <iframe 
                  src="https://www.youtube.com/embed/ptvxcjmMaZI?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1"
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className={styles.videoFrame}
                ></iframe>
              </div>
            </FadeIn>

            {/* Under Video CTA */}
            <div className={styles.bottomCtaSection}>
              <FadeIn delay={0.3} className={styles.buttonWrapper}>
                <a href="/checkout" className={styles.bottomGradientCtaBtn} target="_blank" rel="noopener noreferrer">
                  Get Instant Access Now — ${currentPrice} →
                </a>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Step 2 - Claim Exclusive Offer */}
        <section className={styles.offerSection}>
          <div className="container">
            <FadeIn>
              <div className={styles.header}>
                <div className={styles.badge}>Step 02</div>
                <h2 className={styles.sectionTitle}>
                  Claim Your Exclusive <br /> <span className={styles.gradientHighlight}>{clientConfig.product.name}</span>
                </h2>
                <p className={styles.sectionDesc}>
                  If you give me 5 minutes, I&apos;ll give you the exact toolkit to build an elite personal brand, design professional visuals in minutes, and attract high-paying clients on autopilot.
                </p>
              </div>
            </FadeIn>

            {/* Keypoints Grid */}
            <div className={styles.featuresGrid}>
              <div className={styles.featuresCard}>
                <h3 className={styles.cardHeader}>Inside the {clientConfig.product.name}, you&apos;ll discover:</h3>
                <ul className={styles.list}>
                  {keypoints.map((point, index) => (
                    <FadeIn key={`kp-${index}`} delay={index * 0.05}>
                      <li className={styles.listItem}>
                        <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{point}</span>
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>

              {/* Slashed value list card */}
              <div className={styles.valueCard}>
                <h3 className={styles.cardHeader}>Exactly what you get:</h3>
                <div className={styles.valueList}>
                  {valueItems.map((v, index) => (
                    <FadeIn key={`val-${v.item}`} delay={index * 0.05}>
                      <div className={styles.valueRow}>
                        <span className={styles.valueItemText}>{v.item}</span>
                        <span className={styles.valuePriceTag}>{v.value}</span>
                      </div>
                    </FadeIn>
                  ))}
                  <div className={styles.divider}></div>
                  <div className={styles.totalValueRow}>
                    <span>Total Real Value:</span>
                    <span className={styles.slashedValue}>$1,125</span>
                  </div>
                  <div className={styles.specialPriceRow}>
                    <span>Launch Special Price:</span>
                    <span className={styles.dealPrice}>${currentPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk-Free Guarantee */}
        <section className={styles.guaranteeSection}>
          <div className="container">
            <FadeIn>
              <div className={styles.guaranteeCard}>
                <div className={styles.guaranteeBadge}>
                  <img src="/Guarantee-Batch/Batch.png" alt="48-Hour Money Back Guarantee" className={styles.guaranteeImage} />
                </div>
                <div className={styles.guaranteeText}>
                  <h3>48-Hour Money Back Guarantee</h3>
                  <p>
                    If Tino's LinkedIn Authority Kit doesn't immediately elevate your personal brand and make you look like a top 1% authority, just email within 48 hours for a 100% full refund — no questions asked. And yes, you can keep all the templates and resources.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Dynamic Countdown Urgency Launch Offer */}
        <CountdownOffer />

        {/* Testimonials Section */}
        <Testimonials 
          titlePart1="What Creators Say About"
          titleHighlight="Tino's LinkedIn Branding System"
          subtitle={<span>Hear from solo creators and founders who transformed their personal brand <br /> and converted connections into clients with Tino's visual frameworks.</span>}
        />

        {/* Frequently Asked Questions Section */}
        <FAQ />

      </main>
      <Footer />
    </>
  );
}
