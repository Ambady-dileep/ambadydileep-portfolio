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
  heroImagePath: "/portfolio.png",
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
  statement:
    "I am a full-stack developer focused on building practical web applications with modern technologies. My approach centers on learning through building, solving real-world problems, and creating software that delivers meaningful value.",
  philosophy:
    "Ship iteratively, measure what matters, and treat clean architecture as a product feature—not an afterthought.",
  vision:
    "Become an engineer who designs, builds, and scales production systems that teams trust and users love.",
};

export const projects = [
  {
    id: "user-management",
    title: "User Management Dashboard",
    description:
      "Secure full-stack platform featuring JWT authentication, role-based access control, profile management, and administrative workflows.",
    tech: ["React", "Redux Toolkit", "JWT", "REST APIs", "RBAC"],
    live: "https://frontend-mdsa.onrender.com/",
    accent: "#2563EB",
    image: "/projects/user-management.png",
  },
  {
    id: "sslc-calculator",
    title: "Kerala SSLC Percentage Calculator",
    description:
      "Modern educational web app focused on performance, accessibility, responsive design, and excellent user experience.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Vercel"],
    live: "https://sslc-percentage-calculator.vercel.app/",
    accent: "#10B981",
    image: "/projects/sslc-percentage-calculator.png",
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
    image: "/projects/thaibhavan.png",
  },
];