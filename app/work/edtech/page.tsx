"use client";

import React from "react";
import { motion } from "framer-motion";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Photo({ label, accent = "#5BC8C8", h = 180 }: {
  label: string; accent?: string; h?: number;
}) {
  return (
    <div style={{
      width: "100%", height: h,
      border: `1px dashed ${accent}50`,
      borderRadius: 10, background: `${accent}08`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "0.4rem", flexShrink: 0,
    }}>
      <span style={{ fontSize: "0.9rem", color: accent, opacity: 0.4 }}>+</span>
      <span style={{
        fontFamily:    "var(--font-inter), system-ui, sans-serif",
        fontSize:      "0.5rem", letterSpacing: "0.18em",
        textTransform: "uppercase", color: accent,
        opacity: 0.55, textAlign: "center", padding: "0 1rem",
      }}>
        {label}
      </span>
    </div>
  );
}

const TEAL   = "#5BC8C8";
const ORANGE = "#E8A060";
const PURPLE = "#A87EC8";
const BLUE   = "#A8C4D4";

const AI_PROJECTS = [
  {
    title:  "MTD Performance Evaluations GPT",
    org:    "School of Music, Theatre and Dance · Ithaca College",
    desc:   "Built a custom AI agent to support performance evaluations for faculty and students. Streamlined a complex evaluation workflow into a guided AI-assisted process.",
    photo:  "MTD GPT · screenshot",
    accent: TEAL,
  },
  {
    title:  "AI Platform Research",
    org:    "Ed Tech Office · Ithaca College",
    desc:   "Researched and evaluated multiple AI platforms for educational use — assessing pedagogical value, accessibility, and integration potential with Canvas LMS.",
    photo:  "AI platforms · research doc",
    accent: BLUE,
  },
];

const COURSE_PROJECTS = [
  {
    title:  "Radiation Safety Modules",
    org:    "Chemistry Department · School of H&S",
    desc:   "Developed and deployed radiation safety training modules for the Chemistry Department. Aligned content with institutional lab safety standards and OSHA guidelines.",
    photo:  "Radiation safety · Canvas module",
    accent: ORANGE,
  },
  {
    title:  "HAL Biosafety Course",
    org:    "Physical Therapy Department · School of HSHP",
    desc:   "Co-developed a human anatomy lab biosafety course for Physician Assistant students. Collaborated with Environmental Health and Safety and the School of Health Sciences.",
    photo:  "HAL biosafety · course screenshot",
    accent: PURPLE,
  },
  {
    title:  "Canvas LMS Development",
    org:    "Various Departments · Ithaca College",
    desc:   "Developed multiple courses on Canvas LMS — including multimedia content, instructional design, accessibility review, and faculty training across departments.",
    photo:  "Canvas LMS · course view",
    accent: TEAL,
  },
];

const MEDIA_ITEMS = [
  { label: "Instructional video · course walkthrough", accent: TEAL   },
  { label: "Lab safety animation",                     accent: ORANGE },
  { label: "Course illustration · biology diagram",    accent: PURPLE },
  { label: "Edited faculty training video",            accent: BLUE   },
];

function ProjectCard({ title, org, desc, photo, accent }: {
  title: string; org: string; desc: string; photo: string; accent: string;
}) {
  return (
    <FadeUp>
      <div style={{
        borderLeft:   `4px solid ${accent}`,
        borderRadius: "0 16px 16px 0",
        background:   "rgba(246,241,234,0.03)",
        overflow:     "hidden",
        marginBottom: "1rem",
      }}>
        <div className="card-split" style={{
          display: "grid", gridTemplateColumns: "3fr 1fr", gap: 0,
        }}>
          <div style={{ padding: "2rem 2rem 2rem 1.8rem" }}>
            <p style={{
              fontFamily:    "var(--font-inter), system-ui, sans-serif",
              fontSize:      "0.55rem", letterSpacing: "0.3em",
              textTransform: "uppercase", color: accent, marginBottom: "0.5rem",
            }}>
              {org}
            </p>
            <h3 style={{
              fontFamily:   "var(--font-cormorant), Georgia, serif",
              fontSize:     "clamp(1.5rem, 2.5vw, 2.2rem)",
              fontWeight:   300, color: "#F6F1EA",
              marginBottom: "0.85rem", lineHeight: 1.15,
            }}>
              {title}
            </h3>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.85rem", lineHeight: 1.8,
              color: "rgba(246,241,234,0.72)",
            }}>
              {desc}
            </p>
          </div>
          <div style={{ padding: "1.5rem 1.5rem 1.5rem 0", borderLeft: `1px solid ${accent}15` }}>
            <Photo label={photo} accent={accent} h={160} />
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

export default function EdTechPage() {
  return (
    <main style={{
      backgroundColor: "#0C0C14", color: "#F6F1EA",
      minHeight: "100vh", overflowX: "hidden",
    }}>
      <div className="max-w-[1060px] mx-auto" style={{ padding: "7rem 2rem 6rem" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "4rem" }}
        >
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.55rem", letterSpacing: "0.55em",
            textTransform: "uppercase", color: TEAL, marginBottom: "0.9rem",
          }}>
            Ed Tech
          </p>
          <h1 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(3rem, 8vw, 6.5rem)",
            fontWeight:    300, color: "#F6F1EA",
            letterSpacing: "-0.035em", lineHeight: 0.92,
            maxWidth: "14ch", marginBottom: "1.8rem",
          }}>
            Building tools that teach.
          </h1>
          <p style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize:   "clamp(1.1rem, 1.8vw, 1.4rem)",
            lineHeight: 1.7, color: "rgba(246,241,234,0.72)", maxWidth: "52ch",
          }}>
            As an Ed Tech Specialist at Ithaca College, I build AI agents,
            develop courses, produce media, and translate complex science into
            accessible learning experiences.
          </p>
        </motion.div>

        {/* Stats */}
        <FadeUp>
          <div style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap:                 "1px",
            background:          `${TEAL}18`,
            borderRadius:         16,
            overflow:            "hidden",
            marginBottom:        "5rem",
          }}>
            {[
              { num: "100+",  label: "Faculty & students reached"     },
              { num: "★★★★★", label: "Very high positive response rate" },
              { num: "3",     label: "Departments collaborated with"  },
            ].map((s) => (
              <div key={s.label} style={{
                background: "#0C0C14", padding: "2rem", textAlign: "center",
              }}>
                <p style={{
                  fontFamily:    "var(--font-cormorant), Georgia, serif",
                  fontSize:      "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight:    300, color: TEAL,
                  letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.5rem",
                }}>
                  {s.num}
                </p>
                <p style={{
                  fontFamily:    "var(--font-inter), system-ui, sans-serif",
                  fontSize:      "0.62rem", letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "rgba(246,241,234,0.55)",
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Section 1 — AI */}
        <FadeUp>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.52rem", letterSpacing: "0.45em",
            textTransform: "uppercase", color: TEAL, marginBottom: "0.6rem",
          }}>
            01 — AI & Automation
          </p>
          <h2 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(1.8rem, 3vw, 3rem)",
            fontWeight:    300, color: "#F6F1EA",
            letterSpacing: "-0.02em", marginBottom: "2rem",
          }}>
            Agents, models, and intelligent tools.
          </h2>
        </FadeUp>
        {AI_PROJECTS.map((p) => <ProjectCard key={p.title} {...p} />)}

        <div style={{ height: "3rem" }} />

        {/* Section 2 — Courses */}
        <FadeUp>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.52rem", letterSpacing: "0.45em",
            textTransform: "uppercase", color: ORANGE, marginBottom: "0.6rem",
          }}>
            02 — Course Development
          </p>
          <h2 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(1.8rem, 3vw, 3rem)",
            fontWeight:    300, color: "#F6F1EA",
            letterSpacing: "-0.02em", marginBottom: "2rem",
          }}>
            Safety, science, and learning design.
          </h2>
        </FadeUp>
        {COURSE_PROJECTS.map((p) => <ProjectCard key={p.title} {...p} />)}

        <div style={{ height: "3rem" }} />

        {/* Section 3 — Media */}
        <FadeUp>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.52rem", letterSpacing: "0.45em",
            textTransform: "uppercase", color: PURPLE, marginBottom: "0.6rem",
          }}>
            03 — Media Production
          </p>
          <h2 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(1.8rem, 3vw, 3rem)",
            fontWeight:    300, color: "#F6F1EA",
            letterSpacing: "-0.02em", marginBottom: "2rem",
          }}>
            Video, illustration, animation.
          </h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {MEDIA_ITEMS.map((m) => (
              <Photo key={m.label} label={m.label} accent={m.accent} h={200} />
            ))}
          </div>
        </FadeUp>

      </div>

      <style jsx>{`
        @media (max-width: 760px) {
          .card-split { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}