"use client";

import { useState } from 'react';
import Link from 'next/link';
import { clientConfig } from '../../config/client.config';
import styles from './page.module.css';

export default function CheckoutPage() {
  // Product details from clientConfig (same as main page)
  const basePrice = clientConfig.product.isLaunchActive 
    ? clientConfig.product.launchPrice 
    : clientConfig.product.regularPrice; // 47
  const regularPrice = clientConfig.product.regularPrice; // 97
  const productName = clientConfig.product.name; // "LinkedIn Authority Kit™"
  const bumpPrice = 49;

  // Contact State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('US');

  // Order Bump State ($49 Masterclass)
  const [addMasterclass, setAddMasterclass] = useState(false);

  // Payment Method & Fields
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'gpay' | 'applepay'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Calculate Total
  const totalPrice = addMasterclass ? basePrice + bumpPrice : basePrice;

  // Format Card Number
  const handleCardNumber = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  // Format Expiry
  const handleExpiry = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = val.substring(0, 2) + ' / ' + val.substring(2);
    }
    setCardExpiry(val);
  };

  // Quick fill test card
  const handleFillTest = (e) => {
    e.preventDefault();
    setName('Alex Morgan');
    setEmail('alex.morgan@example.com');
    setCardNumber('4242 4242 4242 4242');
    setCardExpiry('12 / 28');
    setCardCvc('123');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1400);
  };

  return (
    <main className={styles.checkoutPage}>
      <div className={styles.ambientGlow} />

      <div className={styles.container}>
        <div className={styles.splitLayout}>

          {/* ============================================================ */}
          {/* LEFT SIDE: Heading, Subheading & Review Screenshots          */}
          {/* ============================================================ */}
          <div className={styles.leftCol}>
            {/* Top Step Badge styled like testimonial badge */}
            <div className={styles.stepBadge}>Final Step</div>

            {/* Main Heading from Main Page */}
            <h1 className={styles.mainTitle}>
              Build the foundation to monetize your personal brand <span className={styles.gradientHighlight}>in just 7 days.</span>
            </h1>

            {/* Subheading with Main Page Pricing & Guarantee */}
            <p className={styles.subTitle}>
              ${basePrice} once · launch special pricing · <span className={styles.accentBrand}>48 hour money back guarantee</span>
            </p>

            {/* Offer Line matching Main Page */}
            <div className={styles.offerBlock}>
              <h2 className={styles.offerTitle}>
                Claim Your Exclusive {productName} — ${basePrice}
              </h2>
              <p className={styles.offerSubtitle}>
                {clientConfig.product.heroSubheadline}
              </p>
            </div>

            {/* ================= REVIEW SCREENSHOTS STACK ================= */}
            <div className={styles.reviewsStack}>

              {/* Screenshot 1: Chat message bubble */}
              <div className={styles.chatScreenshotCard}>
                <div className={styles.chatBubbleContent}>
                  <p className={styles.chatLine}>Anyways I followed all your instructions in the course</p>
                  <p className={styles.chatLine}>Revamped my LinkedIn profile &amp; offer using the templates</p>
                  <p className={styles.chatLine}>
                    Sent it to one lead and he was in without any hesitation. This has never happened to me before 😭 very thankful that I bought your {productName}
                  </p>
                </div>
                <div className={styles.chatUserRow}>
                  <img src="/images/reviews/Farirai Masocha.png" alt="Student" className={styles.chatAvatar} />
                  <span className={styles.chatCaption}>Now $2K Happier in my business 🥹 lol</span>
                </div>
              </div>

              {/* Screenshot 2: Sharon Singh Sidhu community review */}
              <div className={styles.communityReviewCard}>
                <div className={styles.communityHeader}>
                  <img src="/images/dummy/avatar1.jpg" alt="Sharon Singh Sidhu" className={styles.communityAvatar} />
                  <div className={styles.communityMeta}>
                    <span className={styles.communityName}>Sharon Singh Sidhu</span>
                    <span className={styles.communityHandle}>@sharonsinghsidhu</span>
                  </div>
                </div>
                <div className={styles.communityBody}>
                  <p className={styles.communityGreeting}>Hey there 👋 thanks for taking the time to do this!</p>
                  <p className={styles.communityText}>
                    I&apos;ve just started this and I&apos;m already impressed by the level of detail you go into in a simple and easily digestible way, with step-by-step fill-in-the-blank templates. I can&apos;t wait to continue diving deeper. Thank you for putting this amazing offer together and for ${basePrice}?!?! Other people are probably charging 100x more. You walk the talk in trust building. Thank you.
                  </p>
                </div>
                <div className={styles.communityFooter}>
                  <span>💜 3 months ago</span>
                  <span>•</span>
                  <span>English</span>
                </div>
              </div>

            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE: Clean Checkout Card (Contact, Bump, Stripe)      */}
          {/* ============================================================ */}
          <div className={styles.rightCol}>
            <div className={styles.checkoutBox}>

              {/* Top tiny label */}
              <div className={styles.toolLabel}>{productName}</div>

              <form onSubmit={handleSubmit} className={styles.form} suppressHydrationWarning>

                {/* --- Section 1: Contact Information --- */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionHeading}>Contact information</h3>

                  <div className={styles.inputStack}>
                    <input 
                      type="text" 
                      required 
                      placeholder="Your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.simpleInput}
                      suppressHydrationWarning
                    />

                    <input 
                      type="email" 
                      required 
                      placeholder="Your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.simpleInput}
                      suppressHydrationWarning
                    />

                    <select 
                      value={country} 
                      onChange={(e) => setCountry(e.target.value)}
                      className={styles.simpleSelect}
                      suppressHydrationWarning
                    >
                      <option value="US">United States</option>
                      <option value="PK">Pakistan</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="OTHER">Other Country</option>
                    </select>
                  </div>
                </div>

                {/* --- Section 2: Order Bump (Masterclass) --- */}
                <div className={`${styles.bumpBox} ${addMasterclass ? styles.bumpBoxActive : ''}`}>
                  <div className={styles.bumpTopTag}>Add to order</div>
                  
                  <h4 className={styles.bumpHeadline}>
                    🔥 One Time Offer: Fast-Track Implementation Masterclass
                  </h4>

                  <p className={styles.bumpLead}>
                    The templates give you the assets. This shows you how to monetize them.
                  </p>

                  <p className={styles.bumpParagraph}>
                    Most creators get the templates, then second-guess themselves: &ldquo;Is this right for my niche?&rdquo; &ldquo;What do I post first?&rdquo; &ldquo;How do I convert profile views into clients?&rdquo;
                  </p>

                  <p className={styles.bumpParagraph}>
                    This 60-minute implementation masterclass walks through the exact inbound client acquisition system live so you stop guessing and start getting booked.
                  </p>

                  <ul className={styles.bumpBullets}>
                    <li>• Why 1 post a day works before you have a big following</li>
                    <li>• Where your first high-ticket client actually comes from</li>
                    <li>• What kills profile conversion (and how to fix it in 5 minutes)</li>
                    <li>• How to scale from profile visits to $3k-$5k monthly retainers</li>
                  </ul>

                  <p className={styles.bumpWarning}>
                    ⚠️ One time launch offer. Gone when you close this page.
                  </p>

                  <div className={styles.bumpPricingRow}>
                    <span className={styles.bumpOldPrice}>$147</span>
                    <span className={styles.bumpNewPrice}>$49</span>
                  </div>

                  <p className={styles.bumpActionText}>Add to order now</p>
                  
                  <p className={styles.bumpGuarantee}>
                    Protected by our full 48-hour money-back guarantee.
                  </p>

                  {/* Interactive Checkbox Row */}
                  <label className={styles.bumpCheckboxLabel}>
                    <div className={styles.checkboxLeft}>
                      <input 
                        type="checkbox" 
                        checked={addMasterclass}
                        onChange={(e) => setAddMasterclass(e.target.checked)}
                        className={styles.bumpCheckbox}
                        suppressHydrationWarning
                      />
                      <span className={styles.bumpCheckText}>Add to cart</span>
                    </div>
                    <span className={styles.bumpPriceTag}>$49.00</span>
                  </label>
                </div>

                {/* --- Section 3: Payment Information (Stripe) --- */}
                <div className={styles.formSection}>
                  <div className={styles.paymentHeaderRow}>
                    <h3 className={styles.sectionHeading}>Payment information</h3>
                    <button 
                      type="button" 
                      onClick={handleFillTest}
                      className={styles.quickTestLink}
                      title="Auto-fill test card details"
                      suppressHydrationWarning
                    >
                      ⚡ Test Card
                    </button>
                  </div>

                  {/* Stripe Card Box */}
                  <div className={styles.stripeBox}>
                    {/* Top Stripe Link indicator */}
                    <div className={styles.stripeTopBar}>
                      <div className={styles.stripeIcons}>
                        <span className={styles.stripeTabActive}>💳 Card</span>
                      </div>
                      <div className={styles.stripeLinkTag}>
                        <span>🔒 Secure, fast checkout with Link</span>
                        <span className={styles.arrowDown}>⌄</span>
                      </div>
                    </div>

                    {/* Card inputs container */}
                    <div className={styles.stripeFieldsWrap}>
                      {/* Card Number */}
                      <div className={styles.cardNumberWrap}>
                        <input 
                          type="text" 
                          required 
                          placeholder="1234 1234 1234 1234"
                          value={cardNumber}
                          onChange={handleCardNumber}
                          maxLength={19}
                          className={styles.cardFieldInput}
                          suppressHydrationWarning
                        />
                        <div className={styles.cardLogos}>
                          <span className={styles.cardLogo}>VISA</span>
                          <span className={styles.cardLogo}>MC</span>
                          <span className={styles.cardLogo}>AMEX</span>
                        </div>
                      </div>

                      {/* Expiration & CVC */}
                      <div className={styles.cardSubFields}>
                        <div className={styles.subFieldCol}>
                          <label className={styles.miniLabel}>Expiration date</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="MM / YY"
                            value={cardExpiry}
                            onChange={handleExpiry}
                            maxLength={7}
                            className={styles.miniInput}
                            suppressHydrationWarning
                          />
                        </div>

                        <div className={styles.subFieldColBordered}>
                          <label className={styles.miniLabel}>Security code</label>
                          <div className={styles.cvcWrap}>
                            <input 
                              type="text" 
                              required 
                              placeholder="CVC"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                              maxLength={4}
                              className={styles.miniInput}
                              suppressHydrationWarning
                            />
                            <span className={styles.cardIconMini}>💳</span>
                          </div>
                        </div>
                      </div>

                      {/* Country in Card element */}
                      <div className={styles.cardCountryWrap}>
                        <label className={styles.miniLabel}>Country</label>
                        <select 
                          value={country} 
                          onChange={(e) => setCountry(e.target.value)}
                          className={styles.cardCountrySelect}
                          suppressHydrationWarning
                        >
                          <option value="PK">Pakistan</option>
                          <option value="US">United States</option>
                          <option value="GB">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Alternative express payment radios */}
                    <div className={styles.altPaymentRows}>
                      <label className={styles.altRadioRow}>
                        <input 
                          type="radio" 
                          name="paymentOption" 
                          checked={paymentMethod === 'gpay'}
                          onChange={() => setPaymentMethod('gpay')}
                          className={styles.altRadio}
                          suppressHydrationWarning
                        />
                        <span className={styles.altPayText}>G Pay (Google Pay)</span>
                      </label>

                      <label className={styles.altRadioRow}>
                        <input 
                          type="radio" 
                          name="paymentOption" 
                          checked={paymentMethod === 'applepay'}
                          onChange={() => setPaymentMethod('applepay')}
                          className={styles.altRadio}
                          suppressHydrationWarning
                        />
                        <span className={styles.altPayText}> Pay (Apple Pay)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* --- Primary CTA Button --- */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                  suppressHydrationWarning
                >
                  {isSubmitting ? 'Processing payment...' : `Get instant access — $${totalPrice}`}
                </button>

                {/* --- Total Payment Row --- */}
                <div className={styles.totalBox}>
                  <div className={styles.totalHeader}>Total payment</div>
                  <div className={styles.totalLine}>
                    <span>{productName}</span>
                    <span>${basePrice}</span>
                  </div>
                  {addMasterclass && (
                    <div className={styles.totalLine}>
                      <span>Implementation Masterclass</span>
                      <span>${bumpPrice}</span>
                    </div>
                  )}
                  {addMasterclass && (
                    <div className={styles.totalFinalLine}>
                      <span>Total Due</span>
                      <span>${totalPrice}</span>
                    </div>
                  )}
                  <div className={styles.totalLockNotice}>
                    🔒 All payments are 256-bit encrypted via Stripe
                  </div>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>

      {/* Success Modal Simulation */}
      {isSuccess && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div className={styles.modalCheck}>✓</div>
            <h3>Payment Confirmed!</h3>
            <p>
              Your order for <strong>{productName}</strong> {addMasterclass ? '& Masterclass' : ''} (${totalPrice}) has been processed successfully.
            </p>
            <p className={styles.modalEmailNotice}>
              Access credentials have been sent to <strong>{email || 'your email'}</strong>.
            </p>
            <Link href="/dashboard" className={styles.modalLinkBtn}>
              Enter Member Portal &amp; Assets →
            </Link>
            <button 
              type="button" 
              onClick={() => setIsSuccess(false)}
              className={styles.modalCloseLink}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
