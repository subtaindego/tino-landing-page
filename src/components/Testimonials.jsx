"use client";

import FadeIn from './FadeIn';
import styles from './Testimonials.module.css';

const testimonialsData = [
  {
    initials: "SJ",
    name: "Sarah Jenkins",
    role: "B2B Marketing Director",
    image: "/images/dummy/avatar1.jpg",
    text: "The LinkedIn Authority Kit is hands down the best investment for my profile. In just 48 hours, I went from an ignored profile to attracting genuine inbound enterprise opportunities."
  },
  {
    initials: "MC",
    name: "Marcus Chen",
    role: "Tech Entrepreneur",
    image: "/images/dummy/avatar2.jpg",
    text: "Remarkable quality. The typography blueprint and banner assets alone are worth 10x the price. Everything was so easy to customize in Canva without design skills."
  },
  {
    initials: "ER",
    name: "Emily Roberts",
    role: "Executive Consultant",
    image: "/images/dummy/avatar3.jpg",
    text: "I was struggling to look credible on LinkedIn. After implementing these templates, my profile looked elite immediately and I closed two new high ticket retainers."
  },
  {
    initials: "DM",
    name: "David Miller",
    role: "Digital Strategist",
    image: "/images/dummy/avatar4.jpg",
    text: "The carousel templates and featured section designs are top tier. My engagement skyrocketed by over 300% on my very first post using this framework."
  },
  {
    initials: "ST",
    name: "Sophia Taylor",
    role: "Creative Director",
    image: "/images/dummy/avatar5.jpg",
    text: "Clean, impactful, and mathematically structured for conversion. Truly understands how human attention and trust work on LinkedIn."
  },
  {
    initials: "JW",
    name: "James Wilson",
    role: "Software Architect",
    image: "/images/dummy/avatar6.jpg",
    text: "Saved me dozens of hours of trial and error. The templates are clean, modern, and deliver immediate visual authority."
  },
  {
    initials: "OB",
    name: "Olivia Brown",
    role: "B2B Growth Lead",
    image: "/images/dummy/avatar7.jpg",
    text: "The templates are insane. Modern, bold, and took me less than 5 minutes to adapt in Canva. Colleagues literally thought I hired a $3,000 design agency for my profile."
  },
  {
    initials: "DL",
    name: "Daniel Lee",
    role: "Product Leader",
    image: "/images/dummy/avatar8.jpg",
    text: "My inbound DMs surged after revamping my LinkedIn banner and featured section with these assets. The authority you command with these designs is unmatched."
  },
  {
    initials: "ER",
    name: "Elena Rostova",
    role: "Head of Talent & HR",
    image: "/images/dummy/avatar9.jpg",
    text: "I loved the result! It turned my profile into a clean, impactful presence that matches my personal brand perfectly. Highly recommended!"
  },
  {
    initials: "LP",
    name: "Liam Patel",
    role: "Founder & CEO",
    image: "/images/dummy/avatar10.jpg",
    text: "BIG shoutout for this kit! We had a vision in mind, but these templates took things to a whole new level. Best $47 spent on personal branding."
  },
  {
    initials: "CA",
    name: "Chloe Adams",
    role: "Startup Investor",
    image: "/images/dummy/avatar11.jpg",
    text: "Demonstrates an ability to comprehend deep positioning concepts. Clear, impactful, and authoritative design system."
  },
  {
    initials: "LS",
    name: "Lucas Scott",
    role: "UI/UX Designer",
    image: "/images/dummy/avatar12.jpg",
    text: "The attention to detail and grid consistency is on a pro level. I highly recommend this Authority Kit to everyone who wants to stand out."
  },
  {
    initials: "ML",
    name: "Maya Lin",
    role: "Cofounder & CEO",
    image: "/images/dummy/avatar13.jpg",
    text: "Great visual hierarchy and incredible ease of use. Was able to implement the banners and carousels right away with fantastic results."
  },
  {
    initials: "HW",
    name: "Hannah Wright",
    role: "Brand Videographer",
    image: "/images/dummy/avatar14.jpg",
    text: "Amazing assets, super flexible to customize and perfectly tailored for high engagement. Thank you!"
  },
  {
    initials: "BC",
    name: "Benjamin Clark",
    role: "Apparel Brand Creator",
    image: "/images/dummy/avatar15.jpg",
    text: "Top notch experience. The banner and featured section templates were simple to edit and saved me time. The designs look clean, professional, and premium."
  },
  {
    initials: "GK",
    name: "Grace Kim",
    role: "Executive Consultant",
    image: "/images/dummy/avatar16.jpg",
    text: "Clearly skilled in visual design and knows what works to stand out in the crowded LinkedIn feed. Solutions that actually drive inbound results."
  },
  {
    initials: "NM",
    name: "Noah Martinez",
    role: "Digital Marketing Strategist",
    image: "/images/dummy/avatar17.jpg",
    text: "I was attempting to do my LinkedIn branding myself and it was not working. This kit gives you the exact attention getter and call to action to showcase your true value."
  }
];

export default function Testimonials({
  badgeText = "TESTIMONIALS",
  titlePart1 = "What Creators Say About",
  titleHighlight = "Tino's LinkedIn Branding System",
  subtitle = "Reviews from solo creators and founders who used Tino's LinkedIn Authority Kit."
}) {
  return (
    <section id="testimonials" className={styles.testimonialSection}>
      <div className="container">
        <FadeIn>
          <div className={styles.header}>
            <div className={styles.badge}>{badgeText}</div>
            <h2 className={styles.title}>
              {titlePart1} <br />
              <span className={styles.gradientHighlight}>{titleHighlight}</span>
            </h2>
            {subtitle && (
              <p className={styles.subtitle}>
                {subtitle}
              </p>
            )}
          </div>
        </FadeIn>

        <div className={styles.gridContainer}>
          {testimonialsData.map((item, index) => (
            <FadeIn key={`${item.name}-${index}`} delay={index * 0.03}>
              <div className={styles.card}>
                <div className={styles.cardStars}>★★★★★</div>
                <p className={styles.quoteText}>{`"${item.text}"`}</p>
                <div className={styles.cardDivider} />
                <div className={styles.authorRow}>
                  <div className={styles.avatarCircle}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.avatarImg}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className={styles.fallbackInitials}>{item.initials}</span>
                  </div>
                  <div className={styles.authorInfo}>
                    <h4 className={styles.name}>{item.name}</h4>
                    <p className={styles.role}>{item.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
