import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Github, Linkedin, Mail, Download, ArrowUpRight, ChevronRight, X,
  Circle, CheckCircle2, FileText, Award, GraduationCap, Sparkles,
  Menu, ArrowRight, ExternalLink
} from "lucide-react";

/* ============================================================
   DATA — everything here is drawn directly from the resume.
   No fabricated stats, repos, testimonials, or numbers.
   ============================================================ */

const PROFILE = {
  name: "Rajana Yaswanth",
  location: "Visakhapatnam, Andhra Pradesh, India",
  email: "yaswanth.rajana255@gmail.com",
  github: "https://github.com/yaswanth-tech",
  linkedin: "https://linkedin.com/in/yaswanth-rajana",
};

const TECH_GROUPS = [
  {
    id: "lang",
    label: "Languages",
    accent: "teal",
    items: [
      { name: "Python", note: "Primary language for AI/ML pipelines, FastAPI backends, and data processing." },
      { name: "JavaScript", note: "Used across React frontends and Node/Express services." },
      { name: "Java", note: "Coursework and structured problem-solving." },
      { name: "SQL", note: "Querying and modeling relational data for MySQL-backed systems." },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    accent: "teal",
    items: [
      { name: "OpenAI API", note: "Powers the conversational layer of the AI Campus Assistant." },
      { name: "LLaMA2", note: "Local/open-weight model experimentation for the campus assistant." },
      { name: "Ollama", note: "Running and serving open-weight models locally during development." },
      { name: "RAG Pipelines", note: "Retrieval-augmented generation for grounding assistant responses in real data." },
      { name: "Prompt Engineering", note: "Structuring prompts for reliable, on-task LLM behavior." },
      { name: "Scikit-learn", note: "Building the ML recommendation engine for the tour planner." },
      { name: "TensorFlow", note: "Model experimentation." },
      { name: "Feature Engineering", note: "Shaping inputs for the recommendation and classification models." },
    ],
  },
  {
    id: "data",
    label: "Data",
    accent: "amber",
    items: [
      { name: "Pandas", note: "Data cleaning and transformation ahead of analysis." },
      { name: "NumPy", note: "Numerical operations underlying ML feature pipelines." },
      { name: "Power BI", note: "Built the Sales Insights Dashboard used across 5+ departments." },
      { name: "DAX", note: "KPI measures behind the Sales Insights Dashboard." },
      { name: "Statistical Analysis", note: "Interpreting trends behind dashboard KPIs." },
    ],
  },
  {
    id: "backend",
    label: "Backend / Cloud",
    accent: "teal",
    items: [
      { name: "Node.js", note: "Runtime for the AI Campus Assistant's MERN backend." },
      { name: "Express.js", note: "REST API layer for the campus assistant." },
      { name: "FastAPI", note: "Backend service for the KYC Agent platform." },
      { name: "AWS", note: "Cloud infrastructure familiarity." },
      { name: "Docker", note: "Containerized the KYC Agent for consistent deployment." },
    ],
  },
  {
    id: "db",
    label: "Databases",
    accent: "teal",
    items: [
      { name: "MongoDB", note: "Document store behind KYC Agent and the campus assistant." },
      { name: "MySQL", note: "Relational data for structured project work." },
      { name: "Elasticsearch", note: "Search infrastructure familiarity." },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    accent: "teal",
    items: [
      { name: "React.js", note: "Frontend for the KYC Agent and AI Campus Assistant." },
      { name: "HTML5 / CSS3", note: "Foundation of every web interface built." },
      { name: "WebSocket APIs", note: "Real-time, multi-agent communication in the campus assistant." },
    ],
  },
];

const PROJECTS = [
  {
    id: "kyc",
    tag: "Fintech · Identity",
    accent: "teal",
    name: "KYC Agent for Finance",
    oneLiner: "Role-based KYC verification platform for financial customer onboarding.",
    problem:
      "Financial onboarding needs identity documents verified accurately, quickly, and with a clear audit trail — while giving users, admins, and auditors different views into the same case.",
    solution:
      "A role-based platform with dedicated dashboards for users, admins, and auditors. Users submit documents and complete a face-verification step; the system runs OCR-based document verification and tracks status end-to-end; admins and auditors review and act on cases from their own dashboards.",
    architecture:
      "React.js frontend talking to a Python/FastAPI backend, with MongoDB as the document and case store. Secure authentication gates access by role. The entire backend is containerized with Docker for consistent, repeatable deployment.",
    stack: ["React.js", "Python", "FastAPI", "MongoDB", "OCR", "Docker"],
    impact: [
      "Dedicated dashboards for three distinct roles: user, admin, auditor",
      "OCR-based document verification with real-time face detection",
      "Dockerized for consistent deployment",
    ],
    github: "https://github.com/yaswanth-tech/kyc_agent",
    flow: ["Document Upload", "OCR Extraction", "Face Detection", "Verification", "Admin / Auditor Review", "Approved"],
  },
  {
    id: "campus",
    tag: "AI Product · Conversational",
    accent: "teal",
    name: "AI Campus Assistant",
    oneLiner: "Conversational AI assistant for campus life, built on a RAG pipeline.",
    problem:
      "Campus information — schedules, notices, services — is scattered across systems, so students lose time hunting for answers instead of getting them instantly.",
    solution:
      "A MERN-stack conversational assistant that retrieves relevant campus knowledge through a RAG pipeline and generates grounded answers via the OpenAI API and LLaMA2 (served locally through Ollama). Real-time notifications and multi-agent communication run over WebSockets, so information reaches users as it changes rather than on request only.",
    architecture:
      "MongoDB/Express/React/Node (MERN) core, with a retrieval layer feeding relevant context into the LLM before generation (RAG), and a WebSocket layer handling real-time notification delivery and multi-agent message passing.",
    stack: ["MERN Stack", "OpenAI API", "LLaMA2", "Ollama", "WebSocket", "RAG"],
    impact: [
      "25% higher operational efficiency",
      "35% increase in user adoption",
      "30% faster information delivery",
    ],
    github: "https://github.com/yaswanth-tech/AI-assistant",
    flow: ["User Query", "Retrieval (RAG)", "Knowledge Base", "AI Agent", "Grounded Response"],
  },
  {
    id: "sales",
    tag: "Analytics · Business Intelligence",
    accent: "amber",
    name: "Sales Insights Dashboard",
    oneLiner: "Interactive Power BI reporting layer tracking KPIs across departments.",
    problem:
      "Manual, spreadsheet-driven reporting across departments was slow and made it harder to trust decisions made from the numbers.",
    solution:
      "Interactive Power BI reports built on DAX measures, surfacing KPIs across more than five departments in one consistent view — replacing manual analysis with a live, explorable dashboard.",
    architecture:
      "Power Query for data preparation and shaping, DAX for the measure layer (KPI logic), and Power BI as the reporting and visualization surface.",
    stack: ["Power BI", "Excel", "DAX", "Power Query"],
    impact: [
      "KPIs tracked across 5+ departments",
      "35% reduction in manual analysis time",
      "20% improvement in decision accuracy",
    ],
    github: "https://github.com/yaswanth-tech/Diligent_Yaswanth",
    flow: null,
  },
  {
    id: "tour",
    tag: "Mobile · Recommendation Engine",
    accent: "teal",
    name: "AI Tour Planner",
    oneLiner: "ML-based recommendation engine for personalized travel itineraries.",
    problem:
      "Generic travel itineraries don't reflect an individual's actual preferences, and building a personalized one by hand takes time.",
    solution:
      "A React Native app that takes in a traveler's preferences, runs them through an ML recommendation engine to surface relevant places, and assembles them into an optimized, personalized itinerary — backed by Firebase and the Google Maps API.",
    architecture:
      "React Native client, Firebase for backend/data, Google Maps API for place and routing data, with an ML recommendation layer scoring places against stated preferences.",
    stack: ["React Native", "Firebase", "Google Maps API", "ML"],
    impact: [
      "30% increase in user satisfaction",
      "25% faster itinerary creation",
    ],
    github: "https://github.com/yaswanth-tech/Yaswanth",
    flow: ["Preferences", "ML Recommendation", "Places", "Optimized Itinerary"],
  },
];

const TIMELINE = [
  { year: "2022", title: "Started B.Tech, CSE", detail: "Woxsen University, Hyderabad." },
  { year: "2024", title: "MGIT Hackathon", detail: "Top 10 Finalist, Hyderabad." },
  { year: "2024–25", title: "Built KYC Agent & AI Campus Assistant", detail: "Full-stack + RAG-based AI systems." },
  { year: "2025", title: "Udhgam Fest Hackathon", detail: "Finalist." },
  { year: "2025", title: "Research paper published", detail: "Multi-Agent Incident Response System." },
  { year: "2026", title: "Graduation", detail: "B.Tech, Computer Science Engineering." },
];

const ACHIEVEMENTS = [
  { title: "MGIT Hackathon 2024", detail: "Top 10 Finalist — Hyderabad", icon: "trophy" },
  { title: "Udhgam Fest Hackathon 2025", detail: "Finalist", icon: "trophy" },
];

const RESEARCH = {
  title: "Multi-Agent Incident Response System",
  detail: "Published research paper.",
};

const CERTS = [
  { title: "Introduction to Generative AI", issuer: "Google Cloud · Coursera" },
  { title: "Data Analysis and Visualization with Power BI", issuer: "Coursera" },
  { title: "IBM Full Stack Developer", issuer: "Coursera" },
  { title: "Cloud Security Governance", issuer: "Centific Premier Hackathon 2.0" },
];

const BUILD_AREAS = [
  { label: "Full Stack", value: 100, note: "3 of 4 projects" },
  { label: "AI Systems", value: 70, note: "2 of 4 projects" },
  { label: "Data & Analytics", value: 55, note: "1–2 of 4 projects" },
  { label: "Cloud & Deployment", value: 55, note: "2 of 4 projects" },
];

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

/* ============================================================
   STYLES
   ============================================================ */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    .yw-root {
      --bg: #0A0C10;
      --surface: #12151B;
      --surface-2: #171B22;
      --border: rgba(255,255,255,0.09);
      --border-strong: rgba(255,255,255,0.16);
      --text: #E7E7E4;
      --text-dim: #9AA0AC;
      --text-faint: #5C6270;
      --teal: #4FD8C4;
      --teal-dim: rgba(79,216,196,0.14);
      --amber: #F0A857;
      --amber-dim: rgba(240,168,87,0.14);

      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      position: relative;
      min-height: 100vh;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    .yw-root * { box-sizing: border-box; }
    .yw-root ::selection { background: var(--teal); color: #04120F; }

    .yw-display {
      font-family: 'Space Grotesk', sans-serif;
      letter-spacing: -0.01em;
    }
    .yw-mono { font-family: 'JetBrains Mono', monospace; }

    .yw-shell { max-width: 1160px; margin: 0 auto; padding: 0 28px; }
    @media (max-width: 640px) { .yw-shell { padding: 0 20px; } }

    a { color: inherit; text-decoration: none; }
    button { font-family: inherit; cursor: pointer; }

    /* focus visibility */
    .yw-root a:focus-visible,
    .yw-root button:focus-visible {
      outline: 2px solid var(--teal);
      outline-offset: 3px;
      border-radius: 4px;
    }

    @media (prefers-reduced-motion: reduce) {
      .yw-root *, .yw-root *::before, .yw-root *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }
    }

    /* ---------- NAV ---------- */
    .yw-nav {
      position: sticky; top: 0; z-index: 40;
      backdrop-filter: blur(14px);
      background: rgba(10,12,16,0.72);
      border-bottom: 1px solid var(--border);
    }
    .yw-nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
    .yw-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 16px; letter-spacing: 0.02em; display: flex; align-items: center; gap: 8px; }
    .yw-logo-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 8px var(--teal); }
    .yw-nav-links { display: flex; align-items: center; gap: 4px; }
    .yw-nav-link {
      position: relative; padding: 8px 14px; font-size: 13.5px; color: var(--text-dim);
      transition: color 0.2s ease;
    }
    .yw-nav-link:hover { color: var(--text); }
    .yw-nav-link.active { color: var(--text); }
    .yw-nav-link.active::after {
      content: ''; position: absolute; left: 14px; right: 14px; bottom: 2px; height: 1.5px;
      background: var(--teal); border-radius: 2px;
    }
    .yw-nav-cta {
      font-size: 13px; padding: 8px 16px; border-radius: 7px;
      background: var(--text); color: #0A0C10; font-weight: 600;
      display: none;
    }
    @media (min-width: 640px) { .yw-nav-cta { display: inline-flex; align-items: center; gap: 6px; } }
    .yw-nav-mobile-btn { display: flex; background: none; border: 1px solid var(--border); border-radius: 8px; padding: 8px; color: var(--text); }
    @media (min-width: 780px) { .yw-nav-mobile-btn { display: none; } }
    @media (max-width: 780px) { .yw-nav-links { display: none; } }
    .yw-mobile-menu {
      border-top: 1px solid var(--border); background: var(--bg);
      display: flex; flex-direction: column; padding: 8px 0;
    }
    .yw-mobile-menu a { padding: 12px 28px; font-size: 14px; color: var(--text-dim); border-bottom: 1px solid var(--border); }

    /* ---------- HERO ---------- */
    .yw-hero { position: relative; padding: 88px 0 96px; overflow: hidden; }
    .yw-hero-grid {
      display: grid; grid-template-columns: 1.35fr 0.9fr; gap: 48px; align-items: start; position: relative; z-index: 2;
    }
    @media (max-width: 900px) { .yw-hero-grid { grid-template-columns: 1fr; } }

    .yw-hero-net {
      position: absolute; inset: 0; z-index: 0; opacity: 0.55; pointer-events: none;
    }
    .yw-hero-fade {
      position: absolute; inset: 0; z-index: 1; pointer-events: none;
      background: radial-gradient(ellipse 60% 50% at 30% 20%, rgba(10,12,16,0) 0%, var(--bg) 78%),
                  linear-gradient(180deg, rgba(10,12,16,0.2) 0%, var(--bg) 100%);
    }

    .yw-eyebrow-mono {
      font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--teal);
      display: flex; align-items: center; gap: 8px; margin-bottom: 22px;
    }
    .yw-eyebrow-mono .pulse { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); animation: ywpulse 2s ease-in-out infinite; }
    @keyframes ywpulse { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(79,216,196,0.5);} 50% { opacity: 0.5; box-shadow: 0 0 0 5px rgba(79,216,196,0);} }

    .yw-h1 {
      font-family: 'Space Grotesk', sans-serif; font-weight: 600;
      font-size: clamp(34px, 5.4vw, 60px); line-height: 1.03; letter-spacing: -0.02em;
      margin: 0 0 22px;
      opacity: 0; transform: translateY(14px);
      animation: ywrise 0.7s cubic-bezier(.2,.7,.2,1) 0.05s forwards;
    }
    .yw-headline {
      font-size: clamp(19px, 2.3vw, 25px); line-height: 1.35; color: #D8D9D6; max-width: 34ch;
      margin: 0 0 16px; font-weight: 500;
      opacity: 0; transform: translateY(14px);
      animation: ywrise 0.7s cubic-bezier(.2,.7,.2,1) 0.16s forwards;
    }
    .yw-sub {
      font-size: 15.5px; color: var(--text-dim); max-width: 46ch; line-height: 1.65; margin: 0 0 34px;
      opacity: 0; transform: translateY(14px);
      animation: ywrise 0.7s cubic-bezier(.2,.7,.2,1) 0.26s forwards;
    }
    @keyframes ywrise { to { opacity: 1; transform: translateY(0); } }

    .yw-hero-actions { display: flex; flex-wrap: wrap; gap: 12px;
      opacity: 0; animation: ywrise 0.7s cubic-bezier(.2,.7,.2,1) 0.36s forwards; }
    .yw-btn {
      display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600;
      padding: 12px 20px; border-radius: 9px; border: 1px solid transparent; transition: all 0.18s ease;
    }
    .yw-btn-primary { background: var(--teal); color: #04120F; }
    .yw-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px -8px rgba(79,216,196,0.45); }
    .yw-btn-ghost { background: var(--surface); border-color: var(--border-strong); color: var(--text); }
    .yw-btn-ghost:hover { border-color: var(--teal); color: var(--teal); }

    /* status panel */
    .yw-status {
      background: linear-gradient(180deg, var(--surface), var(--surface-2));
      border: 1px solid var(--border-strong); border-radius: 14px; padding: 22px;
      font-family: 'JetBrains Mono', monospace;
      opacity: 0; animation: ywrise 0.7s cubic-bezier(.2,.7,.2,1) 0.3s forwards;
      box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6);
    }
    .yw-status-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }
    .yw-status-title { font-size: 11px; letter-spacing: 0.08em; color: var(--text-dim); }
    .yw-status-dots { display: flex; gap: 5px; }
    .yw-status-dots span { width: 7px; height: 7px; border-radius: 50%; background: var(--border-strong); }
    .yw-status-row { display: flex; align-items: center; justify-content: space-between; padding: 7px 0; font-size: 12.5px; }
    .yw-status-row .lbl { display: flex; align-items: center; gap: 9px; color: #C9CBD1; }
    .yw-status-led { width: 7px; height: 7px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 6px var(--teal); flex-shrink: 0; animation: ywpulse 2.4s ease-in-out infinite; }
    .yw-status-val { color: var(--text-faint); font-size: 11.5px; }
    .yw-status-foot { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border); font-size: 11px; color: var(--text-faint); display: flex; justify-content: space-between; }

    /* ---------- SECTION SCAFFOLDING ---------- */
    .yw-section { padding: 100px 0; border-top: 1px solid var(--border); }
    .yw-kicker {
      font-size: 12px; color: var(--teal); font-family: 'JetBrains Mono', monospace; margin-bottom: 10px;
    }
    .yw-h2 {
      font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: clamp(26px, 3.4vw, 36px);
      letter-spacing: -0.015em; margin: 0 0 14px;
    }
    .yw-lead { color: var(--text-dim); font-size: 15.5px; max-width: 58ch; line-height: 1.7; margin: 0 0 48px; }

    /* ---------- ABOUT ---------- */
    .yw-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
    @media (max-width: 860px) { .yw-about-grid { grid-template-columns: 1fr; gap: 40px; } }
    .yw-about-copy p { color: #C7C9CE; font-size: 15.5px; line-height: 1.75; margin: 0 0 18px; }
    .yw-about-copy strong { color: var(--text); font-weight: 600; }

    .yw-timeline { position: relative; padding-left: 26px; }
    .yw-timeline::before { content: ''; position: absolute; left: 4px; top: 6px; bottom: 6px; width: 1px; background: var(--border-strong); }
    .yw-tl-item { position: relative; padding-bottom: 28px; }
    .yw-tl-item:last-child { padding-bottom: 0; }
    .yw-tl-dot { position: absolute; left: -26px; top: 3px; width: 9px; height: 9px; border-radius: 50%; background: var(--bg); border: 2px solid var(--teal); }
    .yw-tl-year { font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: var(--teal); margin-bottom: 4px; }
    .yw-tl-title { font-weight: 600; font-size: 14.5px; margin-bottom: 3px; }
    .yw-tl-detail { font-size: 13px; color: var(--text-dim); }

    /* ---------- TECH ---------- */
    .yw-tech-groups { display: flex; flex-direction: column; gap: 14px; }
    .yw-tech-group {
      border: 1px solid var(--border); border-radius: 14px; background: var(--surface); overflow: hidden;
    }
    .yw-tech-group-head { padding: 16px 20px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px; color: var(--text-dim); letter-spacing: 0.01em; display: flex; align-items: center; gap: 10px; }
    .yw-tech-group-head .bar { width: 3px; height: 14px; border-radius: 2px; }
    .yw-chip-row { padding: 0 20px 20px; display: flex; flex-wrap: wrap; gap: 8px; }
    .yw-chip {
      font-family: 'JetBrains Mono', monospace; font-size: 12.5px; padding: 7px 13px; border-radius: 7px;
      border: 1px solid var(--border-strong); background: var(--surface-2); color: var(--text-dim);
      transition: all 0.15s ease;
    }
    .yw-chip:hover { color: var(--text); border-color: var(--teal); }
    .yw-chip.active { color: #04120F; background: var(--teal); border-color: var(--teal); }
    .yw-chip.active.amber { color: #1A0F02; background: var(--amber); border-color: var(--amber); }
    .yw-tech-detail {
      margin: 0 20px 20px; padding: 14px 16px; border-radius: 10px; background: var(--surface-2);
      border: 1px solid var(--border); font-size: 13.5px; color: #C9CBD1; line-height: 1.5;
      display: flex; gap: 10px; align-items: flex-start;
    }

    /* ---------- PROJECTS ---------- */
    .yw-proj-list { display: flex; flex-direction: column; gap: 14px; }
    .yw-proj-card {
      border: 1px solid var(--border); border-radius: 16px; background: var(--surface);
      padding: 26px 26px; cursor: pointer; transition: border-color 0.18s ease, background 0.18s ease;
      display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 24px;
    }
    @media (max-width: 720px) { .yw-proj-card { grid-template-columns: 1fr; gap: 14px; } }
    .yw-proj-card:hover { border-color: var(--border-strong); background: var(--surface-2); }
    .yw-proj-index { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--text-faint); }
    .yw-proj-tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--teal); margin-bottom: 8px; }
    .yw-proj-tag.amber { color: var(--amber); }
    .yw-proj-name { font-family: 'Space Grotesk', sans-serif; font-size: 19px; font-weight: 600; margin-bottom: 6px; }
    .yw-proj-oneliner { font-size: 13.5px; color: var(--text-dim); max-width: 56ch; }
    .yw-proj-arrow { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--border-strong); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.18s ease; }
    .yw-proj-card:hover .yw-proj-arrow { background: var(--teal); border-color: var(--teal); color: #04120F; transform: rotate(45deg); }

    /* ---------- MODAL ---------- */
    .yw-modal-overlay {
      position: fixed; inset: 0; z-index: 100; background: rgba(6,7,9,0.78); backdrop-filter: blur(6px);
      display: flex; justify-content: center; align-items: flex-start; padding: 40px 20px; overflow-y: auto;
      animation: ywfade 0.2s ease forwards;
    }
    @keyframes ywfade { from { opacity: 0; } to { opacity: 1; } }
    .yw-modal {
      background: var(--surface); border: 1px solid var(--border-strong); border-radius: 18px;
      max-width: 780px; width: 100%; margin: auto; overflow: hidden;
      animation: ywmodalrise 0.25s cubic-bezier(.2,.8,.2,1) forwards;
    }
    @keyframes ywmodalrise { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
    .yw-modal-head { padding: 26px 30px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: flex-start; }
    .yw-modal-close { background: var(--surface-2); border: 1px solid var(--border-strong); border-radius: 8px; padding: 8px; color: var(--text-dim); flex-shrink: 0; }
    .yw-modal-close:hover { color: var(--text); border-color: var(--teal); }
    .yw-modal-body { padding: 8px 30px 30px; }
    .yw-modal-block { padding: 20px 0; border-bottom: 1px solid var(--border); }
    .yw-modal-block:last-child { border-bottom: none; }
    .yw-modal-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--teal); margin-bottom: 8px; letter-spacing: 0.04em; }
    .yw-modal-block-title { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15.5px; margin-bottom: 8px; }
    .yw-modal-block p { font-size: 14px; color: #C9CBD1; line-height: 1.7; margin: 0; }
    .yw-modal-stack { display: flex; flex-wrap: wrap; gap: 7px; }
    .yw-modal-impact { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
    .yw-modal-impact li { display: flex; gap: 9px; font-size: 14px; color: #C9CBD1; align-items: flex-start; }
    .yw-modal-impact svg { color: var(--teal); flex-shrink: 0; margin-top: 2px; }

    /* flow diagram */
    .yw-flow { display: flex; align-items: center; flex-wrap: wrap; gap: 0; margin-top: 4px; }
    .yw-flow-node {
      font-family: 'JetBrains Mono', monospace; font-size: 11.5px; padding: 9px 13px; border-radius: 8px;
      background: var(--surface-2); border: 1px solid var(--border-strong); color: var(--text); white-space: nowrap;
    }
    .yw-flow-arrow { width: 26px; height: 1px; background: linear-gradient(90deg, var(--border-strong), var(--teal)); position: relative; margin: 0 2px; flex-shrink: 0; }
    .yw-flow-arrow::after { content: ''; position: absolute; right: 0; top: -2px; width: 5px; height: 5px; border-right: 1px solid var(--teal); border-bottom: 1px solid var(--teal); transform: rotate(-45deg); }
    @media (max-width: 560px) { .yw-flow { flex-direction: column; align-items: flex-start; } .yw-flow-arrow { width: 1px; height: 16px; margin: 2px 0 2px 13px; } .yw-flow-arrow::after { right: -2px; top: 0; transform: rotate(45deg); } }

    /* ---------- WHAT I BUILD ---------- */
    .yw-build-list { display: flex; flex-direction: column; gap: 22px; }
    .yw-build-row-head { display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 8px; }
    .yw-build-row-head .name { font-weight: 600; }
    .yw-build-row-head .note { color: var(--text-faint); font-family: 'JetBrains Mono', monospace; font-size: 11.5px; }
    .yw-build-track { height: 8px; border-radius: 5px; background: var(--surface-2); border: 1px solid var(--border); overflow: hidden; }
    .yw-build-fill { height: 100%; border-radius: 5px; background: linear-gradient(90deg, var(--teal), #7FE9DA); width: 0%; transition: width 1.1s cubic-bezier(.2,.8,.2,1); }

    /* ---------- ACHIEVEMENTS / CERTS ---------- */
    .yw-ach-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 14px; }
    @media (max-width: 640px) { .yw-ach-grid { grid-template-columns: 1fr; } }
    .yw-card { border: 1px solid var(--border); background: var(--surface); border-radius: 14px; padding: 22px; }
    .yw-ach-icon { width: 36px; height: 36px; border-radius: 9px; background: var(--teal-dim); color: var(--teal); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
    .yw-ach-title { font-weight: 600; font-size: 14.5px; margin-bottom: 4px; }
    .yw-ach-detail { font-size: 13px; color: var(--text-dim); }

    .yw-research {
      border: 1px solid var(--border-strong); border-radius: 16px; padding: 30px;
      background: linear-gradient(135deg, var(--teal-dim), transparent 60%), var(--surface);
      display: flex; gap: 20px; align-items: flex-start;
    }
    .yw-research-icon { width: 44px; height: 44px; border-radius: 11px; background: var(--teal); color: #04120F; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .yw-research-kicker { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--teal); margin-bottom: 8px; }
    .yw-research-title { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 19px; margin-bottom: 6px; }
    .yw-research-detail { font-size: 13.5px; color: var(--text-dim); }

    .yw-cert-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 40px; }
    @media (max-width: 640px) { .yw-cert-grid { grid-template-columns: 1fr; } }
    .yw-cert-card { border: 1px solid var(--border); background: var(--surface); border-radius: 12px; padding: 18px 20px; display: flex; gap: 12px; align-items: flex-start; }
    .yw-cert-card svg { color: var(--amber); flex-shrink: 0; margin-top: 2px; }
    .yw-cert-title { font-size: 13.5px; font-weight: 600; margin-bottom: 2px; }
    .yw-cert-issuer { font-size: 12px; color: var(--text-faint); }

    /* ---------- CONTACT ---------- */
    .yw-contact { text-align: left; }
    .yw-contact-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }

    /* ---------- FOOTER ---------- */
    .yw-footer { border-top: 1px solid var(--border); padding: 26px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
    .yw-footer-text { font-size: 12.5px; color: var(--text-faint); font-family: 'JetBrains Mono', monospace; }
    .yw-footer-links { display: flex; gap: 16px; }
    .yw-footer-links a { color: var(--text-faint); }
    .yw-footer-links a:hover { color: var(--teal); }
  `}</style>
);

/* ============================================================
   HERO NETWORK BACKGROUND (deterministic SVG, no fabricated data)
   ============================================================ */

function useSeededPositions(count, seed) {
  return useRef(
    Array.from({ length: count }, (_, i) => {
      const s = Math.sin(seed + i * 12.9898) * 43758.5453;
      const frac = s - Math.floor(s);
      const s2 = Math.sin(seed + i * 78.233) * 12345.678;
      const frac2 = s2 - Math.floor(s2);
      return { x: 4 + frac * 92, y: 4 + frac2 * 92 };
    })
  ).current;
}

const NetworkBackground = () => {
  const nodes = useSeededPositions(16, 7.3);
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    let closest = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      closest.push({ j, d });
    }
    closest.sort((p, q) => p.d - q.d);
    closest.slice(0, 2).forEach((c) => {
      const key = [i, c.j].sort().join("-");
      if (!edges.find((e) => e.key === key)) edges.push({ key, a, b: nodes[c.j] });
    });
  }

  return (
    <svg className="yw-hero-net" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ywEdgeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4FD8C4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4FD8C4" stopOpacity="0" />
        </linearGradient>
      </defs>
      {edges.map((e, i) => (
        <line
          key={e.key}
          x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y}
          stroke="url(#ywEdgeGrad)" strokeWidth="0.15"
          strokeDasharray="2 1.4"
          style={{
            animation: `ywdash 7s linear infinite`,
            animationDelay: `${(i % 6) * -1.2}s`,
          }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i} cx={n.x} cy={n.y} r={i % 5 === 0 ? 0.55 : 0.32}
          fill={i % 5 === 0 ? "#4FD8C4" : "#3A4048"}
          style={{ animation: `ywnodepulse 4s ease-in-out infinite`, animationDelay: `${(i % 8) * -0.5}s` }}
        />
      ))}
      <style>{`
        @keyframes ywdash { to { stroke-dashoffset: -34; } }
        @keyframes ywnodepulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
      `}</style>
    </svg>
  );
};

/* ============================================================
   STATUS PANEL
   ============================================================ */

const StatusPanel = () => {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const rows = [
    "AI Systems Online",
    "Full Stack Ready",
    "Data Analytics Active",
    "Currently Building",
  ];

  return (
    <div className="yw-status">
      <div className="yw-status-head">
        <span className="yw-status-title">SYSTEM STATUS</span>
        <div className="yw-status-dots"><span /><span /><span /></div>
      </div>
      {rows.map((r) => (
        <div className="yw-status-row" key={r}>
          <span className="lbl"><span className="yw-status-led" />{r}</span>
        </div>
      ))}
      <div className="yw-status-foot">
        <span>session</span>
        <span>{mm}:{ss}</span>
      </div>
    </div>
  );
};

/* ============================================================
   NAV
   ============================================================ */

const Nav = ({ active }) => {
  const [open, setOpen] = useState(false);
  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="yw-nav">
      <div className="yw-shell yw-nav-inner">
        <a className="yw-logo" href="#top" onClick={(e) => { e.preventDefault(); scrollTo("top"); }}>
          <span className="yw-logo-dot" />YASWANTH
        </a>
        <div className="yw-nav-links">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`yw-nav-link${active === n.id ? " active" : ""}`}
              onClick={(e) => { e.preventDefault(); scrollTo(n.id); }}
            >
              {n.label}
            </a>
          ))}
        </div>
        <a className="yw-nav-cta" href={PROFILE.github} target="_blank" rel="noreferrer">
          <Github size={14} /> GitHub
        </a>
        <button className="yw-nav-mobile-btn" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="yw-mobile-menu">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollTo(n.id); }}>{n.label}</a>
          ))}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   HERO
   ============================================================ */

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="top" className="yw-hero">
      <NetworkBackground />
      <div className="yw-hero-fade" />
      <div className="yw-shell yw-hero-grid">
        <div>
          <div className="yw-eyebrow-mono"><span className="pulse" /> AVAILABLE FOR OPPORTUNITIES</div>
          <h1 className="yw-h1 yw-display">RAJANA YASWANTH</h1>
          <p className="yw-headline">I build intelligent products at the intersection of AI, data &amp; software.</p>
          <p className="yw-sub">
            Computer Science Engineer building AI-powered applications, full-stack systems,
            analytics platforms, and intelligent automation.
          </p>
          <div className="yw-hero-actions">
            <button className="yw-btn yw-btn-primary" onClick={() => scrollTo("projects")}>
              View Projects <ArrowRight size={15} />
            </button>
            <a className="yw-btn yw-btn-ghost" href={PROFILE.github} target="_blank" rel="noreferrer">
              <Github size={15} /> GitHub
            </a>
            <a className="yw-btn yw-btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a className="yw-btn yw-btn-ghost" href={`mailto:${PROFILE.email}`}>
              <Download size={15} /> Resume
            </a>
          </div>
        </div>
        <StatusPanel />
      </div>
    </section>
  );
};

/* ============================================================
   ABOUT
   ============================================================ */

const About = () => (
  <section id="about" className="yw-section">
    <div className="yw-shell">
      <div className="yw-kicker">01 / About</div>
      <h2 className="yw-h2 yw-display">From coursework to production-shaped systems.</h2>
      <div className="yw-about-grid">
        <div className="yw-about-copy">
          <p>
            I'm a Computer Science Engineering student at Woxsen University, but most of what I know
            didn't come from a syllabus — it came from building things end to end. A <strong>role-based
            KYC platform</strong> that had to handle real identity documents. A <strong>conversational
            assistant</strong> that had to retrieve the right context before it said anything. A
            <strong> dashboard</strong> that had to survive being checked by five different departments.
          </p>
          <p>
            That pattern — <strong>AI, backend, frontend, and data working together</strong> — is where I
            spend most of my time. I've paired LLMs with retrieval pipelines to keep them grounded,
            built the APIs and databases underneath them, and shipped the interfaces people actually use
            on top.
          </p>
          <p>
            Outside of project work, I've competed in hackathons at MGIT and Udhgam Fest, and
            co-authored a research paper on a <strong>multi-agent incident response system</strong> —
            work that pushed me to think about how autonomous systems coordinate, not just how a single
            model performs.
          </p>
        </div>
        <div className="yw-timeline">
          {TIMELINE.map((t) => (
            <div className="yw-tl-item" key={t.title}>
              <div className="yw-tl-dot" />
              <div className="yw-tl-year yw-mono">{t.year}</div>
              <div className="yw-tl-title">{t.title}</div>
              <div className="yw-tl-detail">{t.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   TECH STACK
   ============================================================ */

const TechStack = () => {
  const [selected, setSelected] = useState({ group: "ai", item: TECH_GROUPS[1].items[3] });

  return (
    <section id="skills" className="yw-section">
      <div className="yw-shell">
        <div className="yw-kicker">02 / Stack</div>
        <h2 className="yw-h2 yw-display">Technologies, grouped by what they're for.</h2>
        <p className="yw-lead">Click any technology to see how it's actually been used across the projects below — not just listed.</p>

        <div className="yw-tech-groups">
          {TECH_GROUPS.map((g) => (
            <div className="yw-tech-group" key={g.id}>
              <div className="yw-tech-group-head">
                <span className="bar" style={{ background: g.accent === "amber" ? "var(--amber)" : "var(--teal)" }} />
                {g.label}
              </div>
              <div className="yw-chip-row">
                {g.items.map((it) => {
                  const isActive = selected.item.name === it.name;
                  return (
                    <button
                      key={it.name}
                      className={`yw-chip${isActive ? ` active${g.accent === "amber" ? " amber" : ""}` : ""}`}
                      onClick={() => setSelected({ group: g.id, item: it })}
                    >
                      {it.name}
                    </button>
                  );
                })}
              </div>
              {g.items.some((it) => it.name === selected.item.name) && (
                <div className="yw-tech-detail">
                  <Sparkles size={15} color={g.accent === "amber" ? "var(--amber)" : "var(--teal)"} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span><strong style={{ color: "var(--text)" }}>{selected.item.name}: </strong>{selected.item.note}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   PROJECT FLOW VISUAL (used inside modal)
   ============================================================ */

const FlowVisual = ({ steps }) => {
  if (!steps) return null;
  return (
    <div className="yw-flow">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className="yw-flow-node">{s}</div>
          {i < steps.length - 1 && <div className="yw-flow-arrow" />}
        </React.Fragment>
      ))}
    </div>
  );
};

/* ============================================================
   PROJECTS + MODAL
   ============================================================ */

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="yw-modal-overlay" onClick={onClose}>
      <div className="yw-modal" onClick={(e) => e.stopPropagation()}>
        <div className="yw-modal-head">
          <div>
            <div className={`yw-proj-tag${project.accent === "amber" ? " amber" : ""}`}>{project.tag}</div>
            <div className="yw-proj-name yw-display">{project.name}</div>
          </div>
          <button className="yw-modal-close" onClick={onClose} aria-label="Close"><X size={17} /></button>
        </div>
        <div className="yw-modal-body">
          <div className="yw-modal-block">
            <div className="yw-modal-num">01 — OVERVIEW</div>
            <p>{project.oneLiner}</p>
          </div>
          <div className="yw-modal-block">
            <div className="yw-modal-num">02 — PROBLEM</div>
            <p>{project.problem}</p>
          </div>
          <div className="yw-modal-block">
            <div className="yw-modal-num">03 — SOLUTION</div>
            <p>{project.solution}</p>
          </div>
          <div className="yw-modal-block">
            <div className="yw-modal-num">04 — ARCHITECTURE</div>
            <p style={{ marginBottom: project.flow ? 16 : 0 }}>{project.architecture}</p>
            <FlowVisual steps={project.flow} />
          </div>
          <div className="yw-modal-block">
            <div className="yw-modal-num">05 — TECHNOLOGY STACK</div>
            <div className="yw-modal-stack">
              {project.stack.map((s) => <span className="yw-chip" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="yw-modal-block">
            <div className="yw-modal-num">06 — IMPACT</div>
            <ul className="yw-modal-impact">
              {project.impact.map((imp) => (
                <li key={imp}><CheckCircle2 size={15} />{imp}</li>
              ))}
            </ul>
          </div>
          <div className="yw-modal-block">
            <div className="yw-modal-num">07 — GITHUB</div>
            <a className="yw-btn yw-btn-ghost" href={project.github} target="_blank" rel="noreferrer">
              <Github size={15} /> View repository <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [openId, setOpenId] = useState(null);
  const project = PROJECTS.find((p) => p.id === openId);

  return (
    <section id="projects" className="yw-section">
      <div className="yw-shell">
        <div className="yw-kicker">03 / Projects</div>
        <h2 className="yw-h2 yw-display">Products, not exercises.</h2>
        <p className="yw-lead">Four systems spanning AI, fintech, analytics, and mobile — each one open on GitHub. Click a project for the full case study.</p>

        <div className="yw-proj-list">
          {PROJECTS.map((p, i) => (
            <div className="yw-proj-card" key={p.id} onClick={() => setOpenId(p.id)} role="button" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setOpenId(p.id)}>
              <div className="yw-proj-index yw-mono">0{i + 1}</div>
              <div>
                <div className={`yw-proj-tag${p.accent === "amber" ? " amber" : ""}`}>{p.tag}</div>
                <div className="yw-proj-name yw-display">{p.name}</div>
                <div className="yw-proj-oneliner">{p.oneLiner}</div>
              </div>
              <div className="yw-proj-arrow"><ChevronRight size={16} /></div>
            </div>
          ))}
        </div>
      </div>
      {project && <ProjectModal project={project} onClose={() => setOpenId(null)} />}
    </section>
  );
};

/* ============================================================
   WHAT I BUILD
   ============================================================ */

const WhatIBuild = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="yw-section" ref={ref}>
      <div className="yw-shell">
        <div className="yw-kicker">04 / Engineering Focus</div>
        <h2 className="yw-h2 yw-display">What I build.</h2>
        <p className="yw-lead">Where the four projects above actually land, by area — not a proficiency claim, just where the work has been.</p>
        <div className="yw-build-list">
          {BUILD_AREAS.map((b) => (
            <div key={b.label}>
              <div className="yw-build-row-head">
                <span className="name">{b.label}</span>
                <span className="note yw-mono">{b.note}</span>
              </div>
              <div className="yw-build-track">
                <div className="yw-build-fill" style={{ width: visible ? `${b.value}%` : "0%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   ACHIEVEMENTS + CERTS
   ============================================================ */

const Achievements = () => (
  <section id="achievements" className="yw-section">
    <div className="yw-shell">
      <div className="yw-kicker">05 / Recognition</div>
      <h2 className="yw-h2 yw-display">Achievements &amp; certifications.</h2>

      <div className="yw-research">
        <div className="yw-research-icon"><FileText size={20} /></div>
        <div>
          <div className="yw-research-kicker">PUBLISHED RESEARCH</div>
          <div className="yw-research-title yw-display">{RESEARCH.title}</div>
          <div className="yw-research-detail">{RESEARCH.detail}</div>
        </div>
      </div>

      <div style={{ height: 14 }} />

      <div className="yw-ach-grid">
        {ACHIEVEMENTS.map((a) => (
          <div className="yw-card" key={a.title}>
            <div className="yw-ach-icon"><Award size={18} /></div>
            <div className="yw-ach-title">{a.title}</div>
            <div className="yw-ach-detail">{a.detail}</div>
          </div>
        ))}
      </div>

      <div className="yw-cert-grid">
        {CERTS.map((c) => (
          <div className="yw-cert-card" key={c.title}>
            <GraduationCap size={18} />
            <div>
              <div className="yw-cert-title">{c.title}</div>
              <div className="yw-cert-issuer">{c.issuer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   CONTACT + FOOTER
   ============================================================ */

const Contact = () => (
  <section id="contact" className="yw-section">
    <div className="yw-shell yw-contact">
      <div className="yw-kicker">06 / Contact</div>
      <h2 className="yw-h2 yw-display">Have an idea worth building?</h2>
      <p className="yw-lead" style={{ marginBottom: 0 }}>Let's turn it into something real.</p>
      <div className="yw-contact-actions">
        <a className="yw-btn yw-btn-primary" href={`mailto:${PROFILE.email}`}>
          <Mail size={15} /> Email Me
        </a>
        <a className="yw-btn yw-btn-ghost" href={PROFILE.github} target="_blank" rel="noreferrer">
          <Github size={15} /> GitHub
        </a>
        <a className="yw-btn yw-btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={15} /> LinkedIn
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="yw-footer">
    <div className="yw-shell yw-footer" style={{ borderTop: "none", padding: 0 }}>
      <span className="yw-footer-text">© {new Date().getFullYear()} Rajana Yaswanth · {PROFILE.location}</span>
      <div className="yw-footer-links">
        <a href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={16} /></a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /></a>
        <a href={`mailto:${PROFILE.email}`}><Mail size={16} /></a>
      </div>
    </div>
  </footer>
);

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = ["about", "skills", "projects", "achievements", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="yw-root">
      <GlobalStyles />
      <Nav active={active} />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <WhatIBuild />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}
