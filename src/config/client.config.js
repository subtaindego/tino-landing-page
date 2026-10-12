// src/config/client.config.js
// Single Source of Truth for Tino Authority Kit Funnel System

export const clientConfig = {
  // 🎨 Brand Identity & Theme
  theme: {
    clientName: "TINO",
    brandName: "Authority Kit",
    tagline: "Build a High-Converting Personal Brand & LinkedIn Authority System",
    location: "London, UK",
    
    // Theme Colors based on user visual style
    colors: {
      bg: "#0b0d19",
      surface: "#0b0d19",
      surfaceLight: "#0e101f",
      surfaceHover: "#131726",
      textPrimary: "#edeeee",
      textSecondary: "#9ca3af",
      accent: "#51f8aa",       // Vibrant Electric Mint / Cyan Green
      accentHover: "#3de698",
      accentGlow: "rgba(81, 248, 170, 0.25)",
      border: "rgba(237, 238, 238, 0.1)",
      borderHighlight: "rgba(81, 248, 170, 0.35)",
      glassBg: "rgba(11, 13, 25, 0.85)"
    },

    // Fonts (Configured via next/font/google in layout.js)
    fonts: {
      heading: "Inter",
      body: "Inter"
    }
  },

  // 👤 Profile & Socials
  profile: {
    name: "Tino",
    avatarUrl: "/images/tino/tino.png",
    bio: "Personal brand builder & visual identity designer. I help founders, consultants, and creators build an authoritative, client-converting personal brand on LinkedIn that commands trust and high fees.",
    statsText: "Trusted by 140+ founders, consultants & creators worldwide",
    ratingScore: "4.9 / 5.0",
    email: "sibtey02@gmail.com",
    whatsapp: "https://wa.me/447700900123",
    linkedin: "https://www.linkedin.com/in/tino-branding",
    instagram: "https://instagram.com/authoritykit",
    calBookingUrl: "https://cal.com/authoritykit/discovery-call"
  },

  // 💰 Product Pricing & Launch Strategy
  product: {
    name: "The LinkedIn Brand Blueprint",
    shortBadge: "Step 01 • Instant Access System",
    heroHeadline: "Build the strategy that makes your personal brand pay off in just 30 days.",
    heroSubheadline: "Get Tino's step by step LinkedIn Brand Blueprint and go from \"I don't know where to start\" to a 3 month strategy and a full month of posts mapped out.",
    originalValue: 97,
    regularPrice: 97,
    launchPrice: 47,
    isLaunchActive: true,
    currencySymbol: "$",

    // Value Stack Deliverables
    features: [
      "9 Step-by-Step Modules from platform basics to monetization",
      "10 Practical worksheets to build your personalized plan",
      "AI Prompts for post ideas and scroll-stopping hooks",
      "30-Day posting calendar with 20 plug-and-play post frameworks",
      "3-Month strategy template with clear milestones",
      "Daily engagement routine and networking checklist"
    ],

    valueBreakdown: [
      { title: "9 Step-by-Step Modules", value: "Included" },
      { title: "10 Worksheets", value: "Included" },
      { title: "AI Prompts for Hooks and Post Ideas", value: "Included" },
      { title: "30 Day Posting Calendar (20 Posts)", value: "Included" },
      { title: "3 Month Strategy Template", value: "Included" },
      { title: "Daily Engagement Routine and Checklist", value: "Included" }
    ]
  },

  // 💳 Payment Gateways & Checkout (Stripe, PayPal, Bank Transfer)
  checkout: {
    stripePaymentLink: "https://buy.stripe.com/test_eVaeVca8c8Wl69G288",
    paypalLink: "https://www.paypal.com/ncp/payment/DEMO_PAYPAL_LINK",
    defaultMethod: "stripe",
    methods: {
      stripe: true,
      paypal: true,
      bank: true
    },
    currency: "USD",
    supportEmail: "tino@authoritykit.com",
    supportWhatsApp: "+44 7700 900123"
  },

  // 🏦 Bank & Direct Payment Details (For Manual Wire Transfer)
  paymentDetails: {
    currency: "USD / GBP / EUR",
    formEndpoint: "https://api.web3forms.com/submit",
    accessKey: "YOUR_WEB3FORMS_ACCESS_KEY",
    bankAccounts: [
      { key: "Account Title", value: "Tino" },
      { key: "Bank Name", value: "Barclays Bank UK" },
      { key: "Account Number", value: "83920194" },
      { key: "Sort Code", value: "20-04-15" },
      { key: "IBAN (Global)", value: "GB29BARC20041583920194" },
      { key: "Support WhatsApp", value: "+44 7700 900123" }
    ]
  },

  // 📧 Email Capture / Lead Magnet (Swipe My Training)
  newsletter: {
    formAction: "https://app.kit.com/forms/9700994/subscriptions",
    videoDurationLabel: "[Free 7-Day Training]",
    headline: "Free 7-Day LinkedIn Brand Training: The proven framework to build a successful personal brand & attract high-paying clients.",
    subtext: "Join 140+ ambitious founders and creators getting tactical breakdowns on profile positioning, viral carousel design, and personal brand monetization.",
    thumbnailUrl: "/images/tino/banners/Banner 1.png"
  },

  // 🔗 Links Page Hub
  linksPage: {
    name: "Tino",
    location: "London, UK",
    role: "Personal Brand Strategist",
    avatarUrl: "/images/tino/tino.png",
    bio: "Building top 1% personal brands on LinkedIn. I help founders, consultants, and creators build visual authority that commands high fees.",
    statsText: "Trusted by 140+ founders & creators",
    proofAvatars: [
      "/images/dummy/avatar1.jpg",
      "/images/dummy/avatar2.jpg",
      "/images/dummy/avatar3.jpg",
      "/images/dummy/avatar4.jpg",
      "/images/dummy/avatar5.jpg"
    ],
    leadMagnet: {
      headline: "140+ CREATORS ALREADY ENROLLED:",
      subtext: "Get my free 7-day training on personal brand building, visual positioning, and profile conversion.",
      buttonText: "GET FREE TRAINING ⚡"
    },
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/tino-branding", icon: "linkedin" },
      { name: "Instagram", url: "https://instagram.com/authoritykit", icon: "instagram" },
      { name: "WhatsApp", url: "https://wa.me/447700900123", icon: "whatsapp" },
      { name: "Calendar", url: "https://cal.com/authoritykit/discovery-call", icon: "calendar" },
      { name: "Website", url: "/", icon: "globe" }
    ],
    cards: [
      {
        id: "free-training",
        icon: "zap",
        badge: "⚡ Free 7-Day Training",
        title: "LinkedIn Brand Training",
        description: "Step-by-step masterclass to build an authoritative personal brand and attract clients on autopilot.",
        ctaText: "Start Free Training →",
        url: "/swipemytraining"
      },
      {
        id: "brand-blueprint",
        icon: "box",
        badge: "🚀 Launch Special $47",
        title: "The LinkedIn Brand Blueprint",
        description: "Step-by-step workbook, 3-month strategy, and 30-day posting plan to monetize your personal brand.",
        ctaText: "Get Brand Blueprint ($47) →",
        url: "/checkout"
      },
      {
        id: "linkedin-branding",
        icon: "layers",
        badge: "⭐ Done-For-You",
        title: "Bespoke Profile Branding",
        description: "Custom visual identity and profile architecture tailored specifically for high-growth founders and executives.",
        ctaText: "Explore Visual System →",
        url: "/authority-kit"
      },
      {
        id: "discovery-call",
        icon: "calendar",
        badge: "📞 1-on-1 Call",
        title: "1:1 Brand Strategy Call",
        description: "40-minute private consultation with Tino to audit your brand positioning and client acquisition funnel.",
        ctaText: "Schedule Session →",
        url: "https://cal.com/authoritykit/discovery-call"
      }
    ],
    badgeText: "Verified Creator",
    linksList: [
      {
        title: "⚡ Get The LinkedIn Brand Blueprint",
        subtitle: "Workbook, 3-month strategy & 30-day plan (Launch Special $47)",
        url: "/checkout",
        highlight: true,
        tag: "Save $50"
      },
      {
        title: "🎥 Free 7-Day LinkedIn Brand Training",
        subtitle: "Build a successful personal brand & monetize your audience",
        url: "/swipemytraining",
        highlight: false,
        tag: "Free Training"
      },
      {
        title: "💳 Instant Checkout & Bank Transfer",
        subtitle: "Lock in your $47 launch special discount now",
        url: "/checkout",
        highlight: false,
        tag: "Save $50"
      },
      {
        title: "🎓 Member Training & Template Portal",
        subtitle: "Access your Canva templates & resources",
        url: "/dashboard",
        highlight: false,
        tag: "Portal"
      },
      {
        title: "📞 Book a 1:1 Brand Strategy Call",
        subtitle: "Private discovery session with Tino",
        url: "https://cal.com/authoritykit/discovery-call",
        highlight: false,
        tag: "Limited Slots"
      }
    ]
  },

  // 🎓 Member Dashboard & Canva Templates
  dashboard: {
    welcomeVideoEmbed: "https://www.youtube.com/embed/ptvxcjmMaZI?rel=0&modestbranding=1",
    implementationVideoEmbed: "https://www.youtube.com/embed/ptvxcjmMaZI?rel=0&modestbranding=1",
    
    // Deliverable Resource Links
    resources: [
      {
        id: "banner",
        title: "10+ LinkedIn Banner Templates",
        category: "Canva Templates",
        url: "/images/tino/banners/Banner 1.png",
        tag: "Core Asset",
        preview: "/images/tino/banners/Banner 1.png"
      },
      {
        id: "featured",
        title: "10+ Featured Section Graphics",
        category: "Canva Templates",
        url: "/images/tino/features/Feature Section 1.png",
        tag: "Core Asset",
        preview: "/images/tino/features/Feature Section 1.png"
      },
      {
        id: "carousels",
        title: "15+ Authority Carousel Layouts",
        category: "Canva Templates",
        url: "/images/tino/carousels/Carousel Template Slide 1.png",
        tag: "Engagement",
        preview: "/images/tino/carousels/Carousel Template Slide 1.png"
      },
      {
        id: "tweets",
        title: "LinkedIn Tweet & Single Post Layouts",
        category: "Canva Templates",
        url: "/images/tino/tweets/Tweet post 1.png",
        tag: "Social Proof",
        preview: "/images/tino/tweets/Tweet post 1.png"
      },
      {
        id: "playbook",
        title: "Profile Sizing, Color & Typography Brand Guide",
        category: "PDF Documentation",
        url: "/images/tino/carousels/Linkedin Carousel Template for upload.pdf",
        tag: "PDF Guide",
        preview: "/images/tino/carousels/Carousel Template Slide 2.png"
      }
    ],

    // 5-Step Implementation Checklist
    checklist: [
      { id: "step1", text: "Watch Tino's 3-minute Quick Start & Brand Positioning Overview" },
      { id: "step2", text: "Duplicate Tino's Canva Banner Templates into your free Canva account" },
      { id: "step3", text: "Apply your brand colors & insert your profile headline and call to action" },
      { id: "step4", text: "Export in high resolution & upload banner and featured sections to LinkedIn" },
      { id: "step5", text: "Publish your first authority carousel post using Tino's swipe file framework" }
    ]
  }
};
