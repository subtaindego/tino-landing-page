import styles from './DeliverableMarquee.module.css';

const previewImages = [
  "/images/tino/banners/Banner 1.png",
  "/images/tino/carousels/Carousel Template Slide 1.png",
  "/images/tino/features/Feature Section 1.png",
  "/images/tino/banners/Banner 2.png",
  "/images/tino/carousels/Carousel Template Slide 2.png",
  "/images/tino/tweets/Tweet post 1.png",
  "/images/tino/features/Feature Section 2.png",
  "/images/tino/carousels/Carousel Template Slide 3.png"
];

export default function DeliverableMarquee() {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.track}>
        {previewImages.concat(previewImages).map((src, i) => (
          <div key={i} className={styles.item}>
            <img src={src} alt="Template Asset Preview" className={styles.img} />
          </div>
        ))}
      </div>
    </div>
  );
}
