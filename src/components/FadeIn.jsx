"use client";

import { useEffect, useRef } from 'react';

export default function FadeIn({ children, delay = 0, className = "" }) {
  const domRef = useRef(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    // Safety fallback timer to guarantee visibility without blocking
    const fallbackTimer = setTimeout(() => {
      if (el && el.style.opacity !== '1') {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={className}
      suppressHydrationWarning
      style={{
        opacity: 0,
        transform: 'translateY(18px)',
        transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
}
