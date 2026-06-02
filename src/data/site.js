export const siteConfig = {
  name: "Ambady Dileep",
  role: "Full-Stack Developer",
  headline:
    "Building modern web applications with Python, Django, React, and scalable backend systems.",
  email: "ambadydileep.pro@gmail.com",
  phone: "+91 8547502375",
  phoneCopy: "8547502375",
  whatsappNumber: "918547502375",
  whatsappUrl: "https://wa.me/918547502375",
  location: "Kerala, India",
  domain: "https://ambadydileep.live",
  resumePath: "/AmbadyDileepResume.pdf",
  heroImagePath: "/portfolio.webp",
  portraitPath: "/portrait.jpg",
};

export const heroStats = [
  { value: "4+", label: "Projects" },
  { value: "10+", label: "Technologies" },
  { value: "Full-Stack", label: "Focus" },
];

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const socialLinks = [
  { name: "GitHub", href: "https://github.com/Ambady-dileep", icon: "github" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ambadydileep/",
    icon: "linkedin",
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/Ambady_dileep/",
    icon: "code",
  },
];

export const about = {
  intro: {
    title: "Hi, I'm Ambady Dileep",

    description1:
      "I'm a Full Stack Developer focused on building modern web applications using Python, Django, React, JavaScript, and PostgreSQL. I transitioned from a commerce background into software engineering through intensive training and hands-on development.",

    description2:
      "I enjoy designing scalable backend systems, building clean user experiences, and solving real-world problems through software. My focus is on writing maintainable code, strengthening engineering fundamentals, and continuously improving through project-based learning.",
  },

  philosophy:
    "Prioritize fundamentals, build with clarity, and focus on long-term maintainability over short-term complexity.",

  vision:
    "To build reliable software at scale, contribute to meaningful products, and continuously grow as an engineer through learning, execution, and real-world problem solving.",

  timeline: [
    {
      date: "March 2022",
      type: "education",
      tag: "Foundation",
      title: "SSLC",
      institution: "Thiruvampady Higher Secondary School, Alappuzha",
      achievements: ["97.78%", "9 A+", "1 B+"],
    },

    {
      date: "March 2024",
      type: "education",
      tag: "Higher Secondary",
      title: "Commerce with Computer Application",
      institution: "Thiruvampady Higher Secondary School, Alappuzha",
      achievements: ["98.15%", "5 A+", "1 A"],
    },

    {
      date: "2024 – 2026",
      type: "training",
      tag: "Professional Training",
      title: "Full Stack Development Program",
      institution: "Brototype",

      technologies: [
        "Python",
        "Django",
        "Django REST Framework",
        "JavaScript",
        "React",
        "PostgreSQL",
        "Git",
        "GitHub",
        "REST APIs",
        "Full Stack Architecture",
      ],

      highlight: "2+ years of real-world project experience",
    },

    {
      date: "2025 – Present",
      type: "degree",
      tag: "Degree",
      title: "Bachelor of Computer Applications (BCA)",
      institution: "IGNOU",
      achievements: ["Currently Pursuing"],
    },

    {
      date: "Present",
      type: "growth",
      tag: "Current Focus",
      title: "Continuous Learning & Product Development",
      institution: null,

      technologies: [
        "Advanced Django",
        "React Ecosystem",
        "System Design",
        "Database Design",
        "Backend Architecture",
        "Clean Code",
        "Scalable APIs",
      ],
    },
  ],

  stats: [
    {
      value: "97.78%",
      label: "SSLC Score",
    },
    {
      value: "98.15%",
      label: "Higher Secondary",
    },
    {
      value: "2+",
      label: "Years Building Projects",
    },
    {
      value: "2025",
      label: "BCA Started",
    },
  ],
};

export const projects = [
  {
    id: "user-management",
    title: "User Management Dashboard",
    description:
      "Secure full-stack platform featuring JWT authentication, role-based access control, profile management, and administrative workflows.",
    tech: [
      "React",
      "Redux Toolkit",
      "JWT",
      "REST APIs",
      "RBAC",
      "React Router DOM",
      "Axios",
      "Tailwind CSS",
      "Vite",
      "ESLint",
      "Prettier",
      "Python",
      "Django",
      "Django REST Framework",
      "Django ORM",
      "Dotenv"
    ],
    live: "https://frontend-mdsa.onrender.com/",
    accent: "#2563EB",
    image: "/projects/user-management.webp",
  },
  {
    id: "sslc-calculator",
    title: "Kerala SSLC Percentage Calculator",
    description:
      "Modern educational web app focused on performance, accessibility, responsive design, and excellent user experience.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Vercel"],
    live: "https://sslc-percentage-calculator.vercel.app/",
    accent: "#10B981",
    image: "/projects/sslc-percentage-calculator.webp",
  },
  {
    id: "olx-clone",
    title: "OLX Marketplace Clone",
    description:
      "Marketplace platform with product listings, image uploads, browsing, and responsive product discovery experiences.",
    tech: ["React", "Firebase", "Firestore", "Tailwind CSS"],
    live: null,
    accent: "#F59E0B",
    image: "/projects/olx-clone.png",
  },
  {
    id: "thaibhavan-pg",
    title: "Thaibhavan PG Landing Page",
    description:
      "Premium, minimal landing page for a luxury women's PG in Alappuzha built for CA students. Features an adaptive gallery carousel and smooth micro-interactions.",
    tech: ["React", "Django", "Tailwind v4", "Netlify", "Git"],
    live: "https://thaibhavan-alappuzha.netlify.app/",
    accent: "#EC4899", 
    image: "/projects/thaibhavan.webp",
  },
];