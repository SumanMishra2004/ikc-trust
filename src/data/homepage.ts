// ─────────────────────────────────────────────────────────────────────────────
// IKC Trust – Homepage Content Data
// Edit this file to update text, numbers, images, and links.
// Items marked [PLACEHOLDER] are sample content and should be replaced
// with verified organisational information before going live.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "IKC TRUST",
  tagline: "Integrated Knowledge & Care · Kolkata",
  description:
    "Empowering communities across West Bengal through sustainable education, healthcare, and social development.",
  headquarters: "5 Elgin Road, Heritage Enclave, Kolkata, West Bengal 700020, India",
  email: "contact@ikc.org.in",
  phone: "+91 33 2456 7890",
  coordinates: "22°32′N 88°21′E",
  coordinatesLabel: "Rural Bengal Field Operations",
};

export const navLinks = [
  { label: "About Us", href: "/about" },
    { label: "Advisory Board", href: "/advisory-board" },
  { label: "Our Team", href: "/team" },


  { label: "Contact", href: "/contact" },
];

export type NetworkNavItem = {
  label: string;
  description: string;
  href: string;
  iconBg: string;
};

export const networkNavItems: NetworkNavItem[] = [
  {
    label: "Partnerships",
    description: "Corporate CSR, academic & medical alliances",
    href: "/partnerships",
    iconBg: "bg-[#244B3C]",
  },
  {
    label: "Collaborators",
    description: "Grassroots NGOs & panchayat networks",
    href: "/collaborators",
    iconBg: "bg-[#292B27]",
  },
  {
    label: "Contributors",
    description: "Donors & philanthropic supporters",
    href: "/contributors",
    iconBg: "bg-[#B9674B]",
  },
  {
    label: "Awards & Recognition",
    description: "Honours received for our field work",
    href: "/awards-recognition",
    iconBg: "bg-[#1B3A2D]",
  },
];

export type InitiativeNavItem = {
  number: string;
  label: string;
  description: string;
  href: string;
  iconBg: string;
};

export const initiativeNavItems: InitiativeNavItem[] = [
  {
    number: "01",
    label: "Education & Knowledge",
    description: "Establishing schools, colleges, and skill development...",
    href: "/initiatives/education",
    iconBg: "bg-sky-500",
  },
  {
    number: "02",
    label: "Environment",
    description: "Tree plantation, environmental awareness, wildlife...",
    href: "/initiatives/environment",
    iconBg: "bg-teal-500",
  },
  {
    number: "03",
    label: "Social Welfare",
    description: "Supporting children, women, youth, senior citizens, an...",
    href: "/initiatives/social-welfare",
    iconBg: "bg-green-500",
  },
  {
    number: "04",
    label: "Healthcare & Medical",
    description: "Establishing hospitals, health centers, mobile clinics,...",
    href: "/initiatives/healthcare",
    iconBg: "bg-orange-500",
  },
  {
    number: "05",
    label: "Disaster Relief",
    description: "Providing emergency relief, rehabilitation, and...",
    href: "/initiatives/disaster-relief",
    iconBg: "bg-gray-500",
  },
  {
    number: "06",
    label: "Culture & Sports",
    description: "Promoting Indian culture through arts, music, dance,...",
    href: "/initiatives/culture-sports",
    iconBg: "bg-pink-500",
  },
  {
    number: "07",
    label: "Conference",
    description: "Academic and community conferences on knowledge and care.",
    href: "/initiatives/conference",
    iconBg: "bg-purple-500",
  },
];

export const hero = {
  eyebrow: "INTEGRATED KNOWLEDGE & CARE · KOLKATA, WEST BENGAL",
  headlineLine1: "Building a better",
  headlineLine2: "tomorrow through",
  headlineItalic: "knowledge, compassion & action.",
  body: "Empowering communities through education, healthcare, social welfare and sustainable development across rural and semi-urban West Bengal.",
  ctaPrimary: { label: "Explore Our Work", href: "#areas-of-work" },
  ctaSecondary: { label: "Discover Our Story", href: "#about-trust" },
  scrollTarget: { label: "Explore Overview", href: "#about-trust" },
  stats: [
    {
      icon: "community",
      label: "COMMUNITY FOCUS",
      value: "Rural Bengal",
    },
    {
      icon: "legal",
      label: "LEGAL RECOGNITION",
      value: "Section 12A & 80G",
    },
    {
      icon: "grassroots",
      label: "GRASSROOTS NETWORK",
      value: "Direct Community Engagement",
    },
  ],
  imageUrl: "/homebg.png",
  mobileImageUrl: "/mobilebg.png",
  imageAlt: "IKC Trust community outreach illustration — volunteers helping rural families in West Bengal",
};

export const about = {
  sectionTag: "Who We Are",
  headlinePart1: "Care that reaches people.",
  headlinePart2: "Knowledge that moves communities forward.",
  leadText:
    "Founded on the principle of unconditional human dignity, the IKC TRUST (Integrated Knowledge & Care) bridges structural divides across West Bengal. We believe sustainable societal resilience cannot be engineered in isolation: knowledge frameworks and empathetic healthcare must walk hand in hand.",
  bodyText:
    "From remote hamlets in the Sundarbans mangrove tracts to drought-prone agrarian settlements in Purulia and Bankura, our programs deliver direct, accountable interventions. We mobilize doctors, agronomists, educators, and grassroots field coordinators under an unyielding ethical commitment.",
  quote: {
    label: "Core Ethical Pledge",
    text: '"No village left unreached, no child left without learning, no elder left without healing."',
    attribution: "— Charter of The Board of Trustees, Kolkata",
  },
  credentials: [
    {
      value: "100%",
      label: "Non-Profit Mandate",
      description:
        "Zero administrative dilution of designated grassroots relief funds.",
    },
    {
      value: "FCRA & 80G",
      label: "Statutory Compliance",
      description:
        "Rigorous annual social auditing and state-sanctioned fiduciary reporting.",
    },
  ],
  image: {
    // Replace with actual IKC Trust field photography before launch
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85&auto=format&fit=crop",
    alt: "Healthcare camp in rural Bengal — [PLACEHOLDER: replace with IKC Trust field photography]",
    caption: "Rural Healthcare and Community Outreach Camp in the delta regions of West Bengal.",
    badge: "Sundarbans Sector · Field Clinic",
    seriesLabel: "Field Documentation Series · Vol. VIII",
    auditYear: "2024 Audit",
  },
};

export type AreaOfWork = {
  number: string;
  title: string;
  description: string;
  meta: string;
  tag?: string;
  imageUrl?: string;
  imageAlt?: string;
  size: "featured" | "medium" | "small" | "wide";
};

export const areasOfWork: AreaOfWork[] = [
  {
    number: "01",
    title: "Education & Knowledge Systems",
    description:
      "Foundational rural schooling, digital learning laboratories, community libraries, and teacher training programs designed to dismantle multi-generational illiteracy in marginalized districts.",
    meta: "Focus: Primary & Vocational Literacy",
    tag: "Primary Pillar",
    // Replace with actual IKC Trust field photography before launch
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=85&auto=format&fit=crop",
    imageAlt:
      "Children in a rural classroom — [PLACEHOLDER: replace with IKC Trust field photography]",
    size: "featured",
  },
  {
    number: "02",
    title: "Healthcare & Preventive Wellbeing",
    description:
      "Operating mobile health vans, tele-medicine outposts, maternal-child nutritional regimens, and quarterly specialized diagnostic camps across remote riverine settlements.",
    meta: "Sundarbans & Junglemahal",
    // Replace with actual IKC Trust field photography before launch
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85&auto=format&fit=crop",
    imageAlt:
      "Mobile health camp — [PLACEHOLDER: replace with IKC Trust field photography]",
    size: "medium",
  },
  {
    number: "03",
    title: "Environment & Conservation",
    description:
      "Afforestation drives with indigenous flora, traditional water reservoir revival, rainwater harvesting, and training farmers in chemical-free permaculture.",
    meta: "Purulia & Bankura Belt",
    // Replace with actual IKC Trust field photography before launch
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=85&auto=format&fit=crop",
    imageAlt:
      "Community tree-planting in rural Bengal — [PLACEHOLDER: replace with IKC Trust field photography]",
    size: "medium",
  },
  {
    number: "04",
    title: "Social Welfare & Women Collectives",
    description:
      "Self-help micro-enterprises, traditional Kantha stitching collectives, financial literacy, and community legal guidance to champion autonomous livelihoods for women.",
    meta: "Self-Help Collectives · Active",
    size: "small",
  },
  {
    number: "05",
    title: "Disaster Relief & Emergency Resilience",
    description:
      "Rapid response network providing immediate ration kits, water purification units, and dry-shelter stabilization during seasonal Bengal cyclones, tidal surges, and floods.",
    meta: "Delta Contingency Fleet",
    size: "small",
  },
  {
    number: "06",
    title: "Culture, Heritage & Youth Sports",
    description:
      "Reviving indigenous folk arts of rural Bengal (Baul musical archives, Patachitra painting circles) alongside organizing grassroots football academies for district youth development.",
    meta: "Civic Cohesion",
    size: "wide",
  },
];

export const approachStages = [
  {
    number: "01",
    stage: "Stage I",
    title: "Understand",
    description:
      "Listen with humility directly to Gram Sabhas, elders, and women's groups to accurately diagnose grassroots realities without external biases.",
  },
  {
    number: "02",
    stage: "Stage II",
    title: "Plan",
    description:
      "Formulate localized, culturally respectful blueprints using field metrics, fiscal governance, and clear seasonal timeframes.",
  },
  {
    number: "03",
    stage: "Stage III",
    title: "Collaborate",
    description:
      "Mobilize universities, medical institutions, corporate CSR partners, local panchayat leaders, and community volunteers.",
  },
  {
    number: "04",
    stage: "Stage IV",
    title: "Act",
    description:
      "Execute on-ground programs with agile logistics: deploying healthcare boats, conducting outdoor study groups, and distributing saplings.",
  },
  {
    number: "05",
    stage: "Stage V",
    title: "Transform",
    description:
      "Transition ownership to autonomous village committees for self-reliant, multi-decade sustainability and community stewardship.",
  },
];

// [PLACEHOLDER] – Verify all statistics with the IKC Trust board before publishing
export const impactStats = [
  {
    value: 12000,
    suffix: "+",
    label: "Lives Positively Impacted",
    description:
      "Across health, literacy, and self-help programs in remote districts.",
  },
  {
    value: 42,
    suffix: "+",
    label: "Villages & Panchayats Reached",
    description:
      "Covering delta islands, Purulia uplands, and fringe agrarian settlements.",
  },
  {
    value: 280,
    suffix: "+",
    label: "Field Staff & Volunteers",
    description:
      "Grassroots coordinators and tutors permanently based in rural clusters.",
  },
  {
    value: 24,
    suffix: "+",
    label: "Years of Ethical Benefaction",
    description:
      "Dedicated governance and social welfare stewardship since inception.",
  },
];

// [PLACEHOLDER] – Relative allocation index for illustrative program planning
export const allocationBars = [
  { label: "Community Development & Basic Amenities", value: 90 },
  { label: "Education & Digital Literacy Infrastructure", value: 85 },
  { label: "Healthcare, Mobile Clinics & Nutrition", value: 70 },
  { label: "Social Welfare & Women Self-Help Collectives", value: 65 },
  { label: "Environment, Agro-Forestry & Water Systems", value: 55 },
  { label: "Disaster Relief, Cyclone Contingency & Shelters", value: 45 },
];

export type FeaturedInitiative = {
  id: string;
  tag: string;
  region: string;
  highlight: string;
  title: string;
  body: string;
  status: string;
  cta: string;
  imageUrl: string;
  imageAlt: string;
};

export type SideInitiative = {
  id: string;
  tag: string;
  title: string;
  body: string;
  stat: string;
  highlight: string;
};

export const featuredInitiative: FeaturedInitiative = {
  id: "featured",
  tag: "Agrarian Resilience · Purulia",
  region: "Purulia & Bankura Belt",
  highlight: "50,000+ Native Saplings Planted",
  title: "Community Forestation & Agrarian Water Revival",
  body: "Transforming degraded arid tracts into biodiverse fruit orchards and silvopasture reserves. Local tribal women spearhead sapling nurseries, securing water retention ponds and creating dependable micro-revenue channels for 850 rural families.",
  status: "Phase II Expansion",
  cta: "Read Field Report",
  // Replace with actual IKC Trust field photography before launch
  imageUrl:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=85&auto=format&fit=crop",
  imageAlt:
    "Community forestation and agrarian land — [PLACEHOLDER: replace with IKC Trust field photography]",
};

export const sideInitiatives: SideInitiative[] = [
  {
    id: "healthcare-boats",
    tag: "Healthcare Outreach",
    title: "Mobile Diagnostic Boats in the Sundarbans Delta",
    body: "Navigating complex riverine channels to bring certified medical triage, point-of-care diagnostics, and essential pharmaceuticals directly to 18 remote coastal islands.",
    stat: "3,400+ Consultations",
    highlight: "Sundarbans Mission",
  },
  {
    id: "solar-hubs",
    tag: "Knowledge Ecosystems",
    title: "Primary Learning & Solar-Powered Study Hubs",
    body: "Electrifying village community halls to enable evening study circles, digital tablet education, and adult functional literacy modules free of charge.",
    stat: "14 Active Centers",
    highlight: "Rural Bengal Literacy",
  },
];

// Keep legacy export for any backward compatibility
export const initiatives = [featuredInitiative, ...sideInitiatives];

export const partnerships = [
  {
    icon: "GraduationCap",
    title: "Academic Alliances",
    description:
      "Collaborating with leading universities for scientific social audits, rural sociological studies, and student volunteer fellowships.",
  },
  {
    icon: "Building2",
    title: "Corporate CSR Funds",
    description:
      "Executing legally compliant, impactful Schedule VII CSR projects with complete audit trails and transparent impact scorecards.",
  },
  {
    icon: "HeartPulse",
    title: "Medical Societies",
    description:
      "Partnering with major Kolkata hospitals and doctors' guilds for voluntary field consultations and essential pharmaceutical supply.",
  },
  {
    icon: "Users",
    title: "Grassroots CBOs",
    description:
      "Co-developing field programs alongside existing indigenous collectives to ensure deep cultural respect and uninterrupted trust.",
  },
];

export const getInvolved = {
  sectionTag: "Join The Mandate",
  headline: "Be part of something that creates lasting, self-reliant change.",
  body: "Whether as a field volunteer, research fellow, philanthropic donor, or institutional partner, your involvement directly translates into lives saved, youth educated, and land restored across West Bengal.",
  pathways: [
    {
      number: "Pathway 01",
      title: "Become a Volunteer",
      description:
        "Lend your medical, educational, or logistical expertise in the field during regular weekend and monthly village campaigns.",
      cta: "Register As Volunteer",
      href: "mailto:volunteer@ikc.org.in",
    },
    {
      number: "Pathway 02",
      title: "Institutional CSR",
      description:
        "Deploy corporate social responsibility mandates with verifiable third-party auditing, real-time tracking, and regulatory governance.",
      cta: "CSR Program Office",
      href: "mailto:csr@ikc.org.in",
    },
    {
      number: "Pathway 03",
      title: "Endowment Benefaction",
      description:
        "Direct tax-deductible financial contributions validated under Section 80G to support immediate field clinics and long-term corpus goals.",
      cta: "Make A Contribution",
      href: "mailto:giving@ikc.org.in",
    },
  ],
};

export const footer = {
  about:
    "Integrated Knowledge & Care — Empowering communities across West Bengal through sustainable education, healthcare, and social development.",
  focusAreas: [
    "Education & Knowledge Systems",
    "Healthcare & Wellbeing Mandate",
    "Social Welfare & Rehabilitation",
    "Environment & Agro-Ecology",
    "Disaster Relief & Emergency Response",
    "Culture, Heritage & Youth Sports",
  ],
  governance: [
    "Board of Trustees & Leadership",
    "Annual Audited Disclosures",
    "Financial Ledgers & Statements",
    "Statutory Audit Compliance",
    "FCRA Returns & Declarations",
    "Whistleblower Policy & Ethics Code",
  ],
  institution: [
    "About The Endowment",
    "Our Heritage & Mission",
    "Strategic Benefaction",
    "Archival Monographs",
    "Press Office & Inquiries",
  ],
  legal:
    "Registered Public Charitable Trust under the Indian Trusts Act, 1882. Validations under Section 12A & 80G of the Income Tax Act, 1961.",
};
