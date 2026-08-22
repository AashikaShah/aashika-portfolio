"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ══════════════════════════════════════════════════════════
   PHOTOS  ← the ONLY place you touch for the right column
   ══════════════════════════════════════════════════════════
   Each entry:
     src?    – path relative to /public, e.g. "/images/edtech/desk.jpg"
               Leave undefined to keep a placeholder slot.
     alt     – screen-reader text
     rotate  – tilt in degrees (optional, default 0)
   ══════════════════════════════════════════════════════════ */
const PHOTOS: { src?: string; alt: string; rotate?: number }[] = [
  { alt: "Ed Tech workspace", rotate: -1.5 },
  { alt: "Canvas course design", rotate: 1.2 },
  { alt: "Instructional media editing", rotate: -0.8 },
  { alt: "AI agent demo", rotate: 1.5 },
  { alt: "Faculty collaboration", rotate: -1.0 },
];

/* ══════════════════════════════════════════════════════════
   PROJECTS DATA
   ══════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "lab-safety",
    title: "Lab Safety Training Course",
    org: "Various Departments · Ithaca College",
    desc: "Developed and maintained lab safety training materials across Canvas LMS for departments spanning the sciences, humanities, and health professions. Responsibilities included building module structures, embedding multimedia content, configuring assessments with rubric alignment, conducting accessibility checks, and supporting faculty with course setup. This work helped create reusable training structures that could be adapted across different lab and instructional contexts.",
    video: "/videos/edtech/lab.mp4",
    accent: "#0C7C7C",
    flipped: false,
  },
  {
    id: "anatomy",
    title: "Human Anatomy Lab Biosafety Course",
    org: "Physical Therapy Dept · School of HSHP",
    desc: "Co-developed a comprehensive biosafety training course for the Human Anatomy Lab, specifically tailored for Physician Assistant students working with cadaveric specimens. Collaborated with the Environmental Health and Safety Department and the School of Health Sciences and Human Performance to support institutional biosafety expectations, lab procedures, and safe learning practices.",
    video: "/videos/edtech/HALlab.mp4",
    accent: "#6B4D8A",
    flipped: true,
  },
  {
    id: "radiation",
    title: "Radiation Safety",
    org: "Chemistry Dept · School of H&S",
    desc: "Designed and deployed a radiation safety training course for the Chemistry Department in collaboration with the Environmental Health and Safety Office. Developed multimedia modules covering proper handling, dosimetry, waste disposal, and emergency protocols. The course supported faculty and research students as part of the onboarding and lab preparation process.",
    video: "/videos/edtech/radlab.mp4",
    accent: "#9A5E2A",
    flipped: false,
  },
  {
    id: "ai-research",
    title: "AI Platform Research",
    org: "Ed Tech Office · Ithaca College",
    desc: "Conducted an evaluation of AI platforms for possible instructional use, considering pedagogical alignment, privacy, accessibility, Canvas compatibility, cost, scalability, and faculty onboarding needs. The work helped inform conversations around how AI tools could be thoughtfully introduced into teaching and learning contexts.",
    video: "/videos/edtech/ai-platform-research.mp4",
    accent: "#3D6B82",
    flipped: true,
  },
  {
    id: "mtd-gpt",
    title: "MTD Performance Evaluations GPT",
    org: "School of Music, Theatre & Dance · Ithaca College",
    desc: "Built a custom AI agent using Claude Code to support faculty with student performance evaluations in the School of Music, Theatre and Dance. The tool was designed to work with rubric criteria, student portfolio material, and structured evaluation drafts, helping streamline a process that had previously required extensive manual writing and formatting.",
    video: "/videos/edtech/MDALchat.mp4",
    accent: "#0C7C7C",
    flipped: false,
  },
];

/* ══════════════════════════════════════════════════════════
   TOOLS
   ══════════════════════════════════════════════════════════ */
const TOOLS = [
  "Canvas LMS",
  "Kaltura",
  "Camtasia",
  "Adobe Illustrator",
  "Premiere Pro",
  "Claude Code",
  "ChatGPT",
  "Copilot Studio",
  "Gamma",
  "Supabase",
];

/* ══════════════════════════════════════════════════════════
   useIsMobile
   ══════════════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════════════
   FadeUp
   ══════════════════════════════════════════════════════════ */
function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   RIGHT-COLUMN PHOTO GALLERY  (lab-page style)
   ══════════════════════════════════════════════════════════ */
const xOffsets = [0, 8, -6, 4, -8];

function PhotoGallery() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      {PHOTOS.map((photo, i) => {
        const rotate = photo.rotate ?? 0;
        const xShift = xOffsets[i % xOffsets.length];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: (i % 3) * 0.08,
            }}
            style={{
              width: "100%",
              borderRadius: 10,
              overflow: "hidden",
              transform: `rotate(${rotate}deg) translateX(${xShift}px)`,
              flexShrink: 0,
            }}
          >
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.alt}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  height: 160,
                  border: "1px dashed rgba(15,23,42,0.15)",
                  borderRadius: 10,
                  background: "rgba(15,23,42,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(15,23,42,0.18)",
                  }}
                >
                  +
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   VIDEO PLAYER
   ══════════════════════════════════════════════════════════ */
function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const vid = videoRef.current;
    const container = containerRef.current;
    if (!vid || !container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            vid.pause();
            return;
          }
          const allVideos = document.querySelectorAll<HTMLVideoElement>(
            "[data-edtech-video='true']"
          );
          allVideos.forEach((v) => {
            if (v !== vid) v.pause();
          });
          vid.play().catch(() => {});
        });
      },
      { threshold: 0.65 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: "26px",
        overflow: "hidden",
        background: "#F3F4F6",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
      }}
    >
      <video
        ref={videoRef}
        data-edtech-video="true"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        controls
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROJECT CARD  — unchanged from previous version
   ══════════════════════════════════════════════════════════ */
function ProjectCard({
  project,
  isMobile,
}: {
  project: (typeof PROJECTS)[0];
  isMobile: boolean;
}) {
  const { title, org, desc, video, accent, flipped } = project;

  let flexDirection: React.CSSProperties["flexDirection"] = "row";
  let borderLeft: string | undefined = `5px solid ${accent}`;
  let borderRight: string | undefined = undefined;

  if (isMobile) {
    flexDirection = "column";
    borderLeft = `5px solid ${accent}`;
    borderRight = undefined;
  } else if (flipped) {
    flexDirection = "row-reverse";
    borderLeft = undefined;
    borderRight = `5px solid ${accent}`;
  }

  return (
    <FadeUp>
      <article
        style={{
          display: "flex",
          flexDirection,
          gap: isMobile ? "26px" : "38px",
          alignItems: "center",
          padding: isMobile ? "24px" : "34px",
          borderRadius: "30px",
          background: "#FFFFFF",
          borderLeft,
          borderRight,
          boxShadow: "0 22px 58px rgba(15, 23, 42, 0.10)",
          marginBottom: "40px",
        }}
      >
        {/* Text */}
        <div style={{ flex: isMobile ? "1 1 auto" : "0 0 40%" }}>
          <p
            style={{
              margin: "0 0 12px",
              color: accent,
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            {org}
          </p>
          <h3
            style={{
              margin: "0 0 16px",
              color: "#111827",
              fontSize: isMobile ? "1.45rem" : "1.9rem",
              lineHeight: 1.1,
              fontWeight: 300,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-cormorant), Georgia, serif",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: 0,
              color: "#4B5563",
              fontSize: "0.91rem",
              lineHeight: 1.78,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            {desc}
          </p>
        </div>

        {/* Video */}
        <div
          style={{
            flex: isMobile ? "1 1 auto" : "1 1 60%",
            width: "100%",
            minWidth: 0,
          }}
        >
          <VideoPlayer src={video} />
        </div>
      </article>
    </FadeUp>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */
export default function EdTechPage() {
  const isMobile = useIsMobile();

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #FFFDF8 0%, #F8FBFD 45%, #FFF9F2 100%)",
        color: "#1F2937",
        padding: "7rem 2rem 6rem",
      }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* ──────────────── HEADER ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "4rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#0C7C7C",
              marginBottom: "0.9rem",
            }}
          >
            Ithaca College · IT &amp; Analytics
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              fontWeight: 300,
              color: "#111827",
              letterSpacing: "-0.025em",
              lineHeight: 1,
              marginBottom: "1.5rem",
            }}
          >
            Ed Tech.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.1rem, 1.7vw, 1.35rem)",
              lineHeight: 1.7,
              color: "rgba(26,20,16,0.62)",
              maxWidth: "56ch",
            }}
          >
            Building AI agents, developing safety courses, producing
            instructional media, and translating complex science into accessible
            learning experiences.
          </p>
        </motion.div>

        {/* ──────────────── 75 / 25 SPLIT — What I Do + Photos ──────────────── */}
        <div
          className="edtech-split"
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: "2.5rem",
            alignItems: "flex-start",
            marginBottom: "4rem",
          }}
        >
          {/* ── LEFT — What I Do ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderTop: "1px solid rgba(15,23,42,0.06)",
              borderRight: "1px solid rgba(15,23,42,0.06)",
              borderBottom: "1px solid rgba(15,23,42,0.06)",
              borderLeft: "4px solid #0C7C7C",
              borderRadius: "0 20px 20px 0",
              background: "rgba(255,255,255,0.7)",
              padding: "2.4rem 2.4rem 2.4rem 2.2rem",
              boxShadow: "0 4px 20px rgba(15,23,42,0.05)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#0C7C7C",
                marginBottom: "0.55rem",
              }}
            >
              My Role
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 300,
                color: "#111827",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginBottom: "1.2rem",
              }}
            >
              What I Do
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.91rem",
                lineHeight: 1.82,
                color: "#4B5563",
                marginBottom: "1rem",
              }}
            >
              As an Immersive and Ed Tech Specialist within IT &amp; Analytics
              at Ithaca College, I work at the intersection of technology,
              education, and design. I research and help faculty with various
              educational technologies — including Canvas LMS and Kaltura —
              ensuring they have the tools to teach effectively. I build
              goal-based and utility-based AI agents and GPTs to analyze and
              manipulate datasets, and produce instructional media with a focus
              on improving clarity and accessibility.
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.91rem",
                lineHeight: 1.82,
                color: "#4B5563",
                marginBottom: "1rem",
              }}
            >
              My work spans multiple departments and disciplines. I developed a
              lab safety course in collaboration with the Environmental Health
              and Safety Department, which was implemented across over 100
              faculty members and research students, achieving a 99.8% positive
              response rate. I have collaborated with the School of Health
              Sciences and Human Performance to develop a specialized human
              anatomy lab safety course for the Physician Assistant program, and
              partnered with the Chemistry Department to develop a Radiation
              Safety Course.
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.91rem",
                lineHeight: 1.82,
                color: "#4B5563",
                margin: 0,
              }}
            >
              My toolkit includes Adobe Illustrator, Premiere Pro, Camtasia,
              and a growing proficiency in AI development — all in service of
              making complex information more accessible and engaging.
            </p>
          </motion.div>

          {/* ── RIGHT 25% — photo gallery ── */}
          {/*
              To add a photo:    go to const PHOTOS at the top,
                                 set src: "/images/edtech/yourfile.jpg"
              To remove a photo: delete its object from PHOTOS
              To reorder:        move the object up / down in PHOTOS
          */}
          <div style={{ paddingTop: "0.5rem" }}>
            <PhotoGallery />
          </div>
        </div>

        {/* ──────────────── PROJECTS COMPLETED (full width) ──────────────── */}
        <div style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.56rem",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "#0C7C7C",
              marginBottom: "1.6rem",
            }}
          >
            Projects Completed
          </p>
          <FadeUp>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 300,
                color: "#111827",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                marginBottom: "2.4rem",
              }}
            >
              Courses, AI tools, and instructional systems I have built.
            </h2>
          </FadeUp>

          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} isMobile={isMobile} />
          ))}
        </div>

        {/* ──────────────── PLATFORMS & TOOLS ──────────────── */}
        <div style={{ marginTop: "1rem" }}>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.56rem",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "#0C7C7C",
              marginBottom: "1.2rem",
            }}
          >
            Platforms &amp; Tools
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)",
              lineHeight: 1.75,
              color: "rgba(26,20,16,0.5)",
              fontStyle: "italic",
              maxWidth: "72ch",
            }}
          >
            {TOOLS.map((t, i) => (
              <span key={t}>
                {t}
                {i < TOOLS.length - 1 && (
                  <span
                    aria-hidden="true"
                    style={{ color: "rgba(15,23,42,0.2)", margin: "0 0.5em" }}
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* ──────────────── FOOTER ──────────────── */}
        <p
          style={{
            marginTop: "5rem",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(15,23,42,0.28)",
          }}
        >
          Last updated · August 2026
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .edtech-split {
            grid-template-columns: 1fr !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </main>
  );
}
