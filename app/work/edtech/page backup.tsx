"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// ---------- useIsMobile Hook ----------
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

// ---------- Helper ----------
function hexToRgba(hex: string, alpha: number) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ---------- Colors ----------
// Decorative accents (borders, card accents, backgrounds)
const ACCENTS: Record<string,string> = {
  teal:   "#7DD4D4",
  orange: "#F0B87E",
  purple: "#C4A4E0",
  blue:   "#B8D4E8",
};
// Darker versions for TEXT labels (WCAG AA on white/light bg)
const ACCENT_TEXT: Record<string,string> = {
  teal:   "#0C7C7C",
  orange: "#9A5E2A",
  purple: "#6B4D8A",
  blue:   "#3D6B82",
};

// ---------- FadeUp ----------
const fadeUpVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={fadeUpVariants}
      transition={{ duration: 0.75, ease: [0.22,1,0.36,1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ---------- VideoPlayer ----------
function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const vid = videoRef.current;
    const container = containerRef.current;
    if (!vid || !container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) vid.play().catch(()=>{});
          else vid.pause();
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div ref={containerRef} style={{
      borderRadius: 12, overflow: "hidden", background: "#D1D5DB",
      width: "100%", aspectRatio: "16/9",
    }}>
      <video ref={videoRef} src={src} style={{
        width: "100%", height: "100%", objectFit: "cover",
      }} muted loop playsInline aria-hidden="true" />
    </div>
  );
}

// ---------- PhotoPlaceholder ----------
function PhotoPlaceholder({ label, accent="teal" }: { label: string; accent?: string }) {
  const c = ACCENTS[accent] || ACCENTS.teal;
  return (
    <div style={{
      border: `2px dashed ${hexToRgba(c, 0.35)}`, borderRadius: 12,
      background: hexToRgba(c, 0.05), height: 150,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ color: c, opacity: 0.45, fontSize: "1.3rem", userSelect: "none" }}>+</span>
      <span style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.6rem", textTransform: "uppercase",
        letterSpacing: "0.14em", color: c, opacity: 0.55, marginTop: 6,
      }}>{label}</span>
    </div>
  );
}

// ---------- ProjectCard ----------
function ProjectCard({
  title, org, desc, video, accent="teal", flipped=false, isMobile=false,
}: {
  title: string; org: string; desc: string; video: string;
  accent?: string; flipped?: boolean; isMobile?: boolean;
}) {
  const ac = ACCENTS[accent] || ACCENTS.teal;
  const acText = ACCENT_TEXT[accent] || ACCENT_TEXT.teal;

  let flexDir: React.CSSProperties["flexDirection"] = "row";
  let bL: string|undefined = `4px solid ${ac}`;
  let bR: string|undefined = undefined;
  if (isMobile) { flexDir = "column"; bL = `4px solid ${ac}`; bR = undefined; }
  else if (flipped) { flexDir = "row-reverse"; bL = undefined; bR = `4px solid ${ac}`; }

  return (
    <FadeUp>
      <div style={{
        background: "#FFFFFF", boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
        borderLeft: bL, borderRight: bR,
        borderRadius: 14, overflow: "hidden", marginBottom: "1.2rem",
        display: "flex", flexDirection: flexDir,
      }}>
        {/* Text */}
        <div style={{
          width: isMobile ? "100%" : "52%",
          padding: isMobile ? "1.8rem 1.4rem" : "2.2rem 2rem 2.2rem 1.8rem",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.6rem", textTransform: "uppercase",
            letterSpacing: "0.22em", color: acText,
            marginBottom: "0.45rem", fontWeight: 600,
          }}>{org}</p>
          <h3 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 500, fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
            color: "#111827", lineHeight: 1.18,
            marginBottom: "0.75rem", letterSpacing: "-0.015em",
          }}>{title}</h3>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.88rem", lineHeight: 1.75, color: "#374151",
          }}>{desc}</p>
        </div>
        {/* Video */}
        <div style={{
          width: isMobile ? "100%" : "48%",
          padding: isMobile ? "0 1.2rem 1.4rem" : "1.4rem",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <VideoPlayer src={video} />
        </div>
      </div>
    </FadeUp>
  );
}

// ---------- Data ----------
const AI_PROJECTS = [
  {
    title: "MTD Performance Evaluations GPT",
    org: "School of Music, Theatre and Dance · Ithaca College",
    desc: "Built a custom AI agent using Claude Code to support faculty with student performance evaluations in the School of Music, Theatre and Dance. The tool ingests rubric criteria, parses student portfolios, and generates structured evaluation drafts — streamlining what was previously a labor-intensive manual process. Collaborated directly with faculty to iterate on prompt design and output formatting, reducing evaluation turnaround time while maintaining pedagogical rigor.",
    video: "/videos/edtech/MDALchat.mp4",
    accent: "teal",
    flipped: false,
  },
  {
    title: "AI Platform Research",
    org: "Ed Tech Office · Ithaca College",
    desc: "Conducted a comprehensive evaluation of AI platforms for institutional adoption, analyzing tools across dimensions of pedagogical alignment, data privacy, accessibility compliance, and LMS integration capability. Produced a comparative report with recommendations for Canvas-compatible solutions, factoring in cost, scalability, and faculty onboarding requirements. Findings informed the Ed Tech Office's strategic roadmap for AI-enhanced instruction.",
    video: "/videos/edtech/ai-platform-research.mp4",
    accent: "blue",
    flipped: true,
  },
];

const COURSE_PROJECTS = [
  {
    title: "Radiation Safety",
    org: "Chemistry Department · School of H&S",
    desc: "Designed and deployed a radiation safety training course for the Chemistry Department in collaboration with the Environmental Health and Safety Office. Developed multimedia modules covering proper handling, dosimetry, waste disposal, and emergency protocols. Aligned all content with OSHA 29 CFR 1910.1096 and institutional lab safety standards. The course was rolled out to faculty and research students department-wide and integrated into the onboarding pipeline for new lab personnel.",
    video: "/videos/edtech/radlab.mp4",
    accent: "orange",
    flipped: false,
  },
  {
    title: "Human Anatomy Lab Biosafety Course",
    org: "Physical Therapy Department · School of HSHP",
    desc: "Co-developed a comprehensive biosafety training course for the Human Anatomy Lab, specifically tailored for Physician Assistant students working with cadaveric specimens. Collaborated with the Environmental Health and Safety Department and the School of Health Sciences and Human Performance to ensure compliance with institutional biosafety protocols, OSHA bloodborne pathogen standards, and formaldehyde exposure guidelines. Designed interactive assessments and procedural walkthroughs for safe lab practices.",
    video: "/videos/edtech/HALlab.mp4",
    accent: "purple",
    flipped: true,
  },
  {
    title: "Canvas LMS Development",
    org: "Various Departments · Ithaca College",
    desc: "Developed and maintained multiple courses across Canvas LMS for departments spanning the sciences, humanities, and health professions. Responsibilities included building module structures, embedding multimedia content, configuring assessments with rubric alignment, conducting accessibility audits (WCAG 2.1 AA), and providing one-on-one faculty training sessions. Established reusable course templates to streamline future development cycles across the institution.",
    video: "/videos/edtech/lab.mp4",
    accent: "teal",
    flipped: false,
  },
];

const MEDIA_ITEMS = [
  { label: "Instructional video · course walkthrough", accent: "teal" },
  { label: "Lab safety animation", accent: "orange" },
  { label: "Course illustration · biology diagram", accent: "purple" },
  { label: "Edited faculty training video", accent: "blue" },
];

// ---------- Page ----------
export default function EdTechPage() {
  const isMobile = useIsMobile();

  return (
    <main style={{
      minHeight: "100vh", background: "#F0F2F5", color: "#111827",
      fontFamily: "var(--font-inter), system-ui, sans-serif",
      overflowX: "hidden",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem 3.5rem" }}>

        {/* ══ HERO ══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22,1,0.36,1] }}
          style={{
            marginBottom: "2.5rem",
            borderBottom: "1px solid #D1D5DB",
            paddingBottom: "2.5rem",
          }}
        >
          <div style={{
            display: "flex", alignItems: "baseline", gap: "1rem",
            flexWrap: "wrap", marginBottom: "0.6rem",
          }}>
            <h1 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 400, fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              color: "#111827", letterSpacing: "-0.025em", lineHeight: 1,
            }}>
              Ed Tech
            </h1>
            <span style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.65rem", letterSpacing: "0.3em",
              textTransform: "uppercase", color: "#0C7C7C", fontWeight: 600,
            }}>
              Ithaca College · IT &amp; Analytics
            </span>
          </div>
          <p style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
            lineHeight: 1.65, color: "#374151", maxWidth: "60ch",
          }}>
            Building AI agents, developing safety courses, producing instructional media, and translating complex science into accessible learning experiences.
          </p>
        </motion.div>

        {/* ══ ABOUT MY ROLE ══ */}
        <FadeUp>
          <div style={{
            background: "#FFFFFF", borderRadius: 14,
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            padding: isMobile ? "1.8rem 1.4rem" : "2.2rem 2.4rem",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "1.8rem", marginBottom: "2.5rem",
          }}>
            <div style={{ flex: isMobile ? "1 1 100%" : "1 1 62%" }}>
              <h2 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 500, fontSize: "clamp(1.3rem, 1.8vw, 1.65rem)",
                color: "#111827", marginBottom: "1rem",
              }}>What I Do</h2>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.88rem", lineHeight: 1.78, color: "#374151",
                marginBottom: "0.85rem",
              }}>
                As an Immersive and Ed Tech Specialist within IT &amp; Analytics at Ithaca College, I work at the intersection of technology, education, and design. I research and help faculty with various educational technologies — including Canvas LMS and Kaltura — ensuring they have the tools to teach effectively. I build goal-based and utility-based AI agents and GPTs to analyze and manipulate datasets, and produce instructional media with a focus on improving clarity and accessibility.
              </p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.88rem", lineHeight: 1.78, color: "#374151",
                marginBottom: "0.85rem",
              }}>
                My work spans multiple departments and disciplines. I developed a lab safety course in collaboration with the Environmental Health and Safety Department, which was implemented across over 100 faculty members and research students, achieving a 99.8% positive response rate. I&apos;ve collaborated with the School of Health Sciences and Human Performance to develop a specialized human anatomy lab safety course for the Physician Assistant program, and partnered with the Chemistry Department to develop a Radiation Safety Course.
              </p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.88rem", lineHeight: 1.78, color: "#374151",
              }}>
                My toolkit includes Adobe Illustrator, Premiere Pro, Camtasia, and a growing proficiency in AI development — all in service of making complex information more accessible and engaging.
              </p>
            </div>
            <div style={{
              flex: isMobile ? "1 1 100%" : "1 1 38%",
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "0.7rem", alignContent: "start",
            }}>
              <PhotoPlaceholder label="Working with faculty" accent="teal" />
              <PhotoPlaceholder label="Course dev session" accent="blue" />
              <div style={{ gridColumn: "1 / -1" }}>
                <PhotoPlaceholder label="Media production" accent="purple" />
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ══ 01 — AI & Automation ══ */}
        <FadeUp>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.58rem", letterSpacing: "0.35em",
            textTransform: "uppercase", color: "#0C7C7C",
            marginBottom: "0.35rem", fontWeight: 600,
          }}>01 — AI &amp; Automation</p>
          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 400, fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)",
            color: "#111827", letterSpacing: "-0.02em", marginBottom: "1.3rem",
          }}>Agents, models, and intelligent tools.</h2>
        </FadeUp>
        {AI_PROJECTS.map((p) => (
          <ProjectCard key={p.title} {...p} isMobile={isMobile} />
        ))}

        <div style={{ height: "1.2rem" }} />

        {/* ══ 02 — Course Development ══ */}
        <FadeUp>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.58rem", letterSpacing: "0.35em",
            textTransform: "uppercase", color: "#9A5E2A",
            marginBottom: "0.35rem", fontWeight: 600,
          }}>02 — Course Development</p>
          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 400, fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)",
            color: "#111827", letterSpacing: "-0.02em", marginBottom: "1.3rem",
          }}>Safety, science, and learning design.</h2>
        </FadeUp>
        {COURSE_PROJECTS.map((p) => (
          <ProjectCard key={p.title} {...p} isMobile={isMobile} />
        ))}

        <div style={{ height: "1.2rem" }} />

        {/* ══ 03 — Media Production ══ */}
        <FadeUp>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.58rem", letterSpacing: "0.35em",
            textTransform: "uppercase", color: "#6B4D8A",
            marginBottom: "0.35rem", fontWeight: 600,
          }}>03 — Media Production</p>
          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 400, fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)",
            color: "#111827", letterSpacing: "-0.02em", marginBottom: "1.3rem",
          }}>Video, illustration, animation.</h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "0.9rem",
          }}>
            {MEDIA_ITEMS.map((m) => (
              <PhotoPlaceholder key={m.label} label={m.label} accent={m.accent} />
            ))}
          </div>
        </FadeUp>
                {/* ══ CONTACT ══ */}
        <FadeUp>
          <div style={{
            marginTop: "2.5rem",
            borderTop: "1px solid #D1D5DB",
            paddingTop: "2.5rem",
            paddingBottom: "1rem",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: "1.2rem",
          }}>
            <div>
              <h2 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                color: "#111827",
                marginBottom: "0.4rem",
              }}>
                Let&apos;s connect.
              </h2>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.88rem",
                lineHeight: 1.6,
                color: "#374151",
              }}>
                Have a question about ed tech, want to collaborate, or just want to say hi?
              </p>
            </div>
            <div style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}>
              <a
                href="mailto:ashah2@ithaca.edu"
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "#0C7C7C",
                  background: hexToRgba("#7DD4D4", 0.12),
                  border: `1px solid ${hexToRgba("#7DD4D4", 0.3)}`,
                  borderRadius: 8,
                  padding: "0.65rem 1.3rem",
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                }}
              >
                ✉ Email
              </a>
              <a
                href="https://www.linkedin.com/in/aashikajdshah"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "#3D6B82",
                  background: hexToRgba("#B8D4E8", 0.12),
                  border: `1px solid ${hexToRgba("#B8D4E8", 0.3)}`,
                  borderRadius: 8,
                  padding: "0.65rem 1.3rem",
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                }}
              >
                in LinkedIn
              </a>
            </div>
          </div>
        </FadeUp>

      </div>
    </main>
  );
}
