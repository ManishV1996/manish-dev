export const projectsData = {
  "portfolio": {
    id: "portfolio",
    title: "Manish Portfolio 2026",
    category: "Web Apps",
    badge: "FEATURED CASE STUDY",
    description: "A high-performance personal branding platform built with Next.js 14, featuring dynamic routing and optimized asset delivery.",
    imageColor: "bg-[#0b1220]",
    heroImage: "/Portfolio/1.png",
    challenge: {
      title: "Performance & SEO Optimization",
      content: "The main hurdle was achieving a perfect 100 Lighthouse score while maintaining heavy visual effects. Standard React state management caused unnecessary re-renders in the project filter system, impacting the smooth scrolling experience on mobile devices."
    },
    solution: {
      title: "Server Components & Framer Motion",
      content: "I utilized Next.js App Router and Server Components to shift heavy logic to the server. For the UI, I implemented Framer Motion for hardware-accelerated animations and utilized the Next/Image component for prioritized LCP loading."
    },
    techStack: [
      { name: "Next.js", icon: "⚛️" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Framer Motion", icon: "🎬" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Vercel", icon: "▲" },
      { name: "JavaScript", icon: "📘" }
    ],
    features: [
      { title: "Dynamic Filter Engine", desc: "Category-based project filtering with zero-layout shift." },
      { title: "Responsive Glassmorphism", desc: "A sleek, modern UI that maintains 60fps across all device resolutions." },
      { title: "Optimized Image Pipeline", desc: "Automated WebP conversion and lazy loading for project galleries." },
      { title: "SEO Meta Management", desc: "Dynamic OpenGraph image generation for social media sharing." }
    ],
    gallery: ["/projects/port-1.jpg", "/projects/port-2.jpg", "/projects/port-3.jpg"],
    impact: [
      { label: "LIGHTHOUSE SCORE", value: "100" },
      { label: "PAGE LOAD TIME", value: "0.8s" },
      { label: "USER ENGAGEMENT", value: "+40%" }
    ]
  },

  "blood-donation": {
    id: "blood-donation",
    title: "LifeStream Mobile",
    category: "Mobile",
    badge: "MOBILE APP",
    description: "A cross-platform emergency blood donation connector reducing the gap between donors and urgent hospital requirements.",
    imageColor: "bg-[#1a0b0b]",
    heroImage: "/No_Image.jpg",
    challenge: {
      title: "Real-time Proximity Matching",
      content: "Finding donors within a 5km radius and notifying them instantly without draining battery life via background GPS was the primary technical bottleneck. We also needed a secure way to verify donor eligibility."
    },
    solution: {
      title: "Geofencing & Push Protocols",
      content: "We implemented Google Maps API for geofencing and used Firebase Cloud Messaging (FCM) for low-latency notifications. The backend used a TTL (Time-To-Live) index in MongoDB to clear expired blood requests automatically."
    },
    techStack: [
      { name: "React Native", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "Firebase", icon: "🔥" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Google Maps", icon: "🗺️" },
      { name: "Redux", icon: "🟣" }
    ],
    features: [
      { title: "Emergency SOS", desc: "One-tap alert system that broadcasts to all eligible donors in the area." },
      { title: "Donor Tracking", desc: "Real-time location tracking of the donor once the request is accepted." },
      { title: "Digital Health Card", desc: "Secure storage for blood group verification and donation history." },
      { title: "Appointment Scheduler", desc: "Integrated booking system for blood bank donation slots." }
    ],
    gallery: ["/projects/blood-1.jpg", "/projects/blood-2.jpg", "/projects/blood-3.jpg"],
    impact: [
      { label: "RESPONSE TIME", value: "< 5min" },
      { label: "ACTIVE DONORS", value: "2.5k" },
      { label: "LIVES IMPACTED", value: "500+" }
    ]
  },

  "patho-xpert": {
    id: "patho-xpert",
    title: "PathoXpert Solutions",
    category: "Web Apps",
    badge: "BACKEND SERVICE",
    description: "An AI-powered pathology lab management system that automates report generation and patient data analysis.",
    imageColor: "bg-[#0b1a1a]",
    heroImage: "/PathoXpert/1.png",
    challenge: {
      title: "Automating Complex Diagnostics",
      content: "Pathologists were manually entering data from blood analyzers, leading to a 15% human error rate. We needed to build a bridge between hardware lab equipment and a cloud-based database."
    },
    solution: {
      title: "HL7 Data Parsing & AI",
      content: "I developed a custom parser for HL7 and ASTM protocols to ingest data directly from lab machines. We then applied a lightweight Python-based ML model to flag abnormal results for immediate doctor review."
    },
    techStack: [
      { name: "React.js", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "MongoDB", icon: "🍃" }
    ],
    features: [
      { title: "Auto-Report Generation", desc: "Converts raw lab data into professional PDF reports in seconds." },
      { title: "Doctor Dashboard", desc: "A specialized view for clinicians to review and sign off on reports." },
      { title: "Patient Portal", desc: "Secure 2FA-protected access for patients to view their history." },
      { title: "Smart Flagging", desc: "AI-driven highlighting of critical health markers." }
    ],
    gallery: ["/projects/patho-1.jpg", "/projects/patho-2.jpg", "/projects/patho-3.jpg"],
    impact: [
      { label: "ERROR REDUCTION", value: "98%" },
      { label: "REPORT SPEED", value: "x10" },
      { label: "DAILY SAMPLES", value: "1.2k" }
    ]
  },

  // ─── FROM WORK EXPERIENCE @ SAMISHTI ────────────────────────────────────────

  "suprsales": {
    id: "suprsales",
    title: "SuprSales CRM",
    category: "Mobile",
    badge: "ENTERPRISE APP",
    description: "Enterprise mobility CRM platform for 5+ agro-industry clients, managing employee workflows, sales operations, claim processing, and field route tracking.",
    imageColor: "bg-[#0b1220]",
    heroImage: "/No_Image.jpg",
    challenge: {
      title: "Multi-Client Field Operations",
      content: "Different agro-industry clients had divergent workflows and reporting requirements. Encoding all their business logic into one shared platform without cross-contaminating data or UI was a significant architectural challenge."
    },
    solution: {
      title: "Modular React Native Architecture",
      content: "Built a feature-flag driven module system in React Native so each client sees only their permitted feature set. Redux slices were isolated per domain — sales, claims, and routing — enabling independent iteration without side effects."
    },
    techStack: [
      { name: "React Native", icon: "⚛️" },
      { name: "Redux", icon: "🟣" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "REST APIs", icon: "🔗" }
    ],
    features: [
      { title: "Employee Management", desc: "Attendance, role assignment, and performance tracking for field teams." },
      { title: "Sales Workflow Engine", desc: "End-to-end sales pipeline from lead capture to order confirmation." },
      { title: "Claim Processing", desc: "Automated expense claim submission and multi-level approval flows." },
      { title: "Field Route Tracking", desc: "Live GPS-based route monitoring and daily visit logging for field reps." }
    ],
    gallery: ["/projects/suprsales-1.jpg", "/projects/suprsales-2.jpg", "/projects/suprsales-3.jpg"],
    impact: [
      { label: "CLIENTS SERVED", value: "5+" },
      { label: "FIELD AGENTS", value: "200+" },
      { label: "CLAIM ACCURACY", value: "99%" }
    ]
  },

  "qtags": {
    id: "qtags",
    title: "Q-Tags",
    category: "Web Apps",
    badge: "PRODUCT TOOL",
    description: "QR-based product identification and tracking system improving customer interaction accuracy across 1,000+ product SKUs.",
    imageColor: "bg-[#0d1a12]",
    heroImage: "/No_Image.jpg",
    challenge: {
      title: "Scalable QR Mapping at SKU Level",
      content: "Generating unique, collision-free QR codes for thousands of product SKUs and reliably resolving them back to the correct product page — including variant-level data — required a robust encoding and storage strategy."
    },
    solution: {
      title: "Encoded Short URLs + Next.js Dynamic Routes",
      content: "Each QR code encodes a short hashed ID that maps to a product document in MongoDB. Next.js dynamic routing handles resolution at the edge, serving product detail pages with sub-100ms latency even under bulk scan events."
    },
    techStack: [
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "🔺" },
      { name: "Node.js", icon: "🟢" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "JavaScript", icon: "📘" }
    ],
    features: [
      { title: "Bulk QR Generator", desc: "Generate and download hundreds of QR codes in a single batch export." },
      { title: "Product Mapping Engine", desc: "Links each QR to a specific SKU, variant, and metadata record." },
      { title: "Scan Analytics", desc: "Track scan counts, locations, and time-series data per product." },
      { title: "Embeddable Widget", desc: "Drop-in scanner component for use on e-commerce storefronts." }
    ],
    gallery: ["/projects/qtags-1.jpg", "/projects/qtags-2.jpg", "/projects/qtags-3.jpg"],
    impact: [
      { label: "PRODUCT SKUS", value: "1,000+" },
      { label: "SCAN ACCURACY", value: "99.9%" },
      { label: "SETUP TIME", value: "-60%" }
    ]
  },

  "scheme-portal": {
    id: "scheme-portal",
    title: "Scheme Portal",
    category: "Web Apps",
    badge: "ENTERPRISE PORTAL",
    description: "A centralized scheme management portal streamlining end-to-end workflows for corporate clients — from scheme creation to beneficiary disbursement.",
    imageColor: "bg-[#0f1520]",
    heroImage: "/No_Image.jpg",
    challenge: {
      title: "Complex Multi-Stage Approval Chains",
      content: "Corporate clients required scheme proposals to pass through several approval layers before activation. Each layer had different permissions and visibility rules, making a generic CRUD approach insufficient."
    },
    solution: {
      title: "Role-Based Workflow Engine",
      content: "Designed a configurable state-machine for scheme lifecycle management. Each scheme has defined transitions (Draft → Review → Approved → Active → Closed) enforced server-side, with React Context surfacing the correct UI per user role."
    },
    techStack: [
      { name: "React.js", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Redux", icon: "🟣" },
      { name: "Tailwind CSS", icon: "🎨" }
    ],
    features: [
      { title: "Scheme Builder", desc: "Drag-and-drop form builder to define eligibility rules and reward tiers." },
      { title: "Multi-Level Approvals", desc: "Configurable approval chains with email and in-app notifications." },
      { title: "Beneficiary Management", desc: "Import, validate, and track scheme participants at scale." },
      { title: "Disbursement Reports", desc: "Automated reconciliation reports exportable to Excel/PDF." }
    ],
    gallery: ["/projects/scheme-1.jpg", "/projects/scheme-2.jpg", "/projects/scheme-3.jpg"],
    impact: [
      { label: "WORKFLOW STEPS", value: "-45%" },
      { label: "PROCESSING TIME", value: "3x faster" },
      { label: "CORPORATE CLIENTS", value: "10+" }
    ]
  },

  "gatepass": {
    id: "gatepass",
    title: "GatePass Go",
    category: "Backend",
    badge: "SECURITY SYSTEM",
    description: "Gate pass management system for tracking entry and exit of visitors and material, enhancing site security workflows across industrial facilities.",
    imageColor: "bg-[#100f1a]",
    heroImage: "/No_Image.jpg",
    challenge: {
      title: "Real-time Vehicle & Material Logging",
      content: "Site security teams needed instant visibility into who and what was entering or leaving the premises. Paper-based logs caused audit failures and delayed incident response. Moving this to a real-time digital system required offline resilience for areas with poor connectivity."
    },
    solution: {
      title: "Offline-First PWA with Sync Queue",
      content: "Built a progressive web app with a local IndexedDB queue that buffers gate entries when offline and syncs to MongoDB the moment connectivity is restored. WebSocket events push live gate activity to the security dashboard in real time."
    },
    techStack: [
      { name: "React.js", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "WebSocket", icon: "🔌" },
      { name: "JavaScript", icon: "📘" }
    ],
    features: [
      { title: "Vehicle Entry Management", desc: "Number plate logging, driver details, and purpose tracking per visit." },
      { title: "Material Gate Passes", desc: "Inward/outward material pass generation with digital signatures." },
      { title: "Live Security Dashboard", desc: "Real-time feed of all active and completed passes on-site." },
      { title: "Audit Trail Export", desc: "Filterable logs exportable for compliance and security audits." }
    ],
    gallery: ["/projects/gatepass-1.jpg", "/projects/gatepass-2.jpg", "/projects/gatepass-3.jpg"],
    impact: [
      { label: "LOG ACCURACY", value: "100%" },
      { label: "AUDIT PREP TIME", value: "-70%" },
      { label: "INCIDENTS TRACKED", value: "Real-time" }
    ]
  },

  "aarogyam": {
    id: "aarogyam",
    title: "Aarogyam",
    category: "Web Apps",
    badge: "HEALTHCARE",
    description: "Healthcare platform with doctor appointment scheduling, patient management, and backend API support for seamless clinical data flow.",
    imageColor: "bg-[#0b1a14]",
    heroImage: "/No_Image.jpg",
    challenge: {
      title: "Reliable Scheduling Under Concurrency",
      content: "Double-booking of appointment slots was a recurring issue when multiple patients tried to book the same doctor at the same time. The existing system lacked transactional guarantees, causing data inconsistencies that eroded patient trust."
    },
    solution: {
      title: "Optimistic UI with Server-Side Locking",
      content: "Implemented MongoDB transactions to lock appointment slots during booking confirmation, preventing race conditions. The React frontend uses optimistic updates for instant feedback while the server validates slot availability before committing."
    },
    techStack: [
      { name: "React.js", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "REST APIs", icon: "🔗" },
      { name: "JavaScript", icon: "📘" }
    ],
    features: [
      { title: "Appointment Booking", desc: "Real-time slot availability with conflict-free concurrent booking." },
      { title: "Doctor Profiles", desc: "Specialty, availability, and ratings managed through an admin panel." },
      { title: "Patient Records", desc: "Centralized patient history with visit notes and prescription tracking." },
      { title: "Backend API Layer", desc: "RESTful APIs consumed by web and mobile clients for unified data access." }
    ],
    gallery: ["/projects/aarogyam-1.jpg", "/projects/aarogyam-2.jpg", "/projects/aarogyam-3.jpg"],
    impact: [
      { label: "DOUBLE BOOKINGS", value: "0" },
      { label: "BOOKING TIME", value: "< 30s" },
      { label: "PATIENT RECORDS", value: "5,000+" }
    ]
  },

  "plant-management": {
    id: "plant-management",
    title: "Plant Management",
    category: "Backend",
    badge: "OPS PLATFORM",
    description: "Industrial plant management system providing real-time data visibility across multiple operational units, assets, and maintenance workflows.",
    imageColor: "bg-[#111a0d]",
    heroImage: "/No_Image.jpg",
    challenge: {
      title: "Aggregating Data Across Distributed Units",
      content: "Each plant unit had isolated systems with no unified view. Managers had to log into multiple dashboards to get a full picture, resulting in delayed decisions and missed maintenance windows."
    },
    solution: {
      title: "Centralized MERN Dashboard with Live Feeds",
      content: "Built a single aggregation layer on Node.js that polls each unit's data source on a configurable interval and normalizes it into a unified schema. The React dashboard uses polling and WebSockets to surface real-time KPIs and maintenance alerts."
    },
    techStack: [
      { name: "React.js", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "WebSocket", icon: "🔌" },
      { name: "Redux", icon: "🟣" }
    ],
    features: [
      { title: "Multi-Unit Dashboard", desc: "Consolidated KPI view across all plant units on a single screen." },
      { title: "Asset Tracker", desc: "Lifecycle management for machinery including service history and depreciation." },
      { title: "Maintenance Scheduler", desc: "Preventive maintenance calendar with automated reminder alerts." },
      { title: "Production Reports", desc: "Shift-wise and daily production reports with trend analysis charts." }
    ],
    gallery: ["/projects/plant-1.jpg", "/projects/plant-2.jpg", "/projects/plant-3.jpg"],
    impact: [
      { label: "UNITS MONITORED", value: "Real-time" },
      { label: "DOWNTIME REDUCTION", value: "-30%" },
      { label: "REPORT GEN TIME", value: "< 5s" }
    ]
  },

  // ─── PERSONAL PROJECTS ──────────────────────────────────────────────────────

  "assessment-pro": {
    id: "assessment-pro",
    title: "Assessment Pro",
    category: "Web Apps",
    badge: "EDTECH PLATFORM",
    description: "Online assessment system allowing users to create, manage, and attempt quizzes — supporting proctored exams for educational institutions and corporates.",
    imageColor: "bg-[#0f0f1a]",
    heroImage: "/No_Image.jpg",
    challenge: {
      title: "Preventing Cheating in Online Exams",
      content: "Unproctored online assessments were prone to tab-switching and copying answers from external sources. Building anti-cheat measures without requiring third-party proctoring software was a key requirement."
    },
    solution: {
      title: "Browser Lock + Event Monitoring",
      content: "Implemented fullscreen enforcement using the Fullscreen API and tracked visibility change events. Any tab-switch or exit from fullscreen triggers a warning and is logged server-side as a violation, flagging the attempt for manual review."
    },
    techStack: [
      { name: "React.js", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "MongoDB", icon: "🍃" },
      { name: "JavaScript", icon: "📘" },
      { name: "Tailwind CSS", icon: "🎨" }
    ],
    features: [
      { title: "Quiz Builder", desc: "Rich text question editor supporting MCQ, true/false, and short answer formats." },
      { title: "Timed Assessments", desc: "Configurable per-question and total exam timers with auto-submission." },
      { title: "Anti-Cheat Engine", desc: "Browser lock, tab-switch detection, and violation logging." },
      { title: "Results & Analytics", desc: "Instant scoring, percentile rankings, and question-level performance breakdown." }
    ],
    gallery: ["/projects/assessment-1.jpg", "/projects/assessment-2.jpg", "/projects/assessment-3.jpg"],
    impact: [
      { label: "QUESTIONS BANK", value: "10,000+" },
      { label: "CONCURRENT USERS", value: "500+" },
      { label: "VIOLATION DETECTION", value: "99%" }
    ]
  },

  "company-portfolio": {
    id: "company-portfolio",
    title: "Company Portfolio",
    category: "Web Apps",
    badge: "MARKETING SITE",
    description: "Corporate portfolio website presenting services, case studies, and team profiles to enhance client engagement and business development.",
    imageColor: "bg-[#0d0f1a]",
    heroImage: "/No_Image.jpg",
    challenge: {
      title: "Converting Visitors into Leads",
      content: "The client's existing static website had a high bounce rate and no mechanism for capturing leads. The redesign needed to communicate credibility, showcase work, and funnel visitors toward contact actions — all while loading fast on mobile."
    },
    solution: {
      title: "Scroll-Driven Storytelling with Next.js",
      content: "Rebuilt the site with Next.js for static generation and lightning-fast page loads. Used Framer Motion scroll-triggered animations to guide visitors through a narrative arc, with strategically placed CTAs reducing bounce rate significantly."
    },
    techStack: [
      { name: "Next.js", icon: "🔺" },
      { name: "React.js", icon: "⚛️" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Framer Motion", icon: "🎬" },
      { name: "JavaScript", icon: "📘" },
      { name: "Vercel", icon: "▲" }
    ],
    features: [
      { title: "Animated Case Studies", desc: "Scroll-triggered reveals for project showcases with before/after comparisons." },
      { title: "Lead Capture Forms", desc: "Multi-step contact forms with validation and CRM webhook integration." },
      { title: "Service Pages", desc: "SEO-optimized landing pages per service with structured data markup." },
      { title: "Team Profiles", desc: "Dynamic team directory with individual bios and social links." }
    ],
    gallery: ["/projects/company-1.jpg", "/projects/company-2.jpg", "/projects/company-3.jpg"],
    impact: [
      { label: "BOUNCE RATE", value: "-35%" },
      { label: "LEAD CONVERSIONS", value: "+60%" },
      { label: "PAGE SPEED SCORE", value: "98" }
    ]
  }
};

export const projectsList = Object.values(projectsData);