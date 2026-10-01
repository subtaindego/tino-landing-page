"use client";

import { useState, useEffect } from 'react';
import styles from './RatingBadge.module.css';

const allAvatars = [
  { src: "/images/dummy/avatar1.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar2.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar3.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar4.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar5.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar6.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar7.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar8.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar9.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar10.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar11.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar12.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar13.jpg", alt: "User Review" },
  { src: "/images/dummy/avatar14.jpg", alt: "User Review" }
];

export default function RatingBadge() {
  const [avatars, setAvatars] = useState(allAvatars.slice(0, 6));

  useEffect(() => {
    const shuffled = [...allAvatars].sort(() => 0.5 - Math.random());
    setAvatars(shuffled.slice(0, 6));
  }, []);

  return (
    <div className={styles.topBadge}>
      <div className={styles.badgeAvatars}>
        {avatars.map((avatar, index) => (
          <img key={index} src={avatar.src} alt={avatar.alt} className={styles.badgeAvatar} />
        ))}
        <div className={styles.badgeCount}>140+</div>
      </div>
      <div className={styles.badgeRating}>
        <div className={styles.badgeStars}>★★★★★</div>
        <div className={styles.badgeText}>4.9/5 from 140+ founders</div>
      </div>
    </div>
  );
}
