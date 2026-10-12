"use client";

import styles from './RatingBadge.module.css';

const trustAvatars = [
  { src: "/images/dummy/avatar1.jpg", alt: "Sarah Jenkins" },
  { src: "/images/dummy/avatar2.jpg", alt: "Marcus Chen" },
  { src: "/images/dummy/avatar3.jpg", alt: "Emily Roberts" },
  { src: "/images/dummy/avatar4.jpg", alt: "David Miller" },
  { src: "/images/dummy/avatar5.jpg", alt: "Sophia Taylor" },
  { src: "/images/dummy/avatar6.jpg", alt: "James Wilson" },
  { src: "/images/dummy/avatar7.jpg", alt: "Olivia Brown" },
  { src: "/images/dummy/avatar8.jpg", alt: "Daniel Lee" }
];

export default function RatingBadge() {
  return (
    <div className={styles.topBadge}>
      <div className={styles.badgeAvatars}>
        {trustAvatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            className={styles.badgeAvatar}
            style={{ zIndex: 10 - index }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ))}
      </div>
      <div className={styles.badgeRating}>
        <span className={styles.badgeStars}>★★★★★</span>
        <span className={styles.badgeText}>140+ founders &amp; creators</span>
      </div>
    </div>
  );
}
