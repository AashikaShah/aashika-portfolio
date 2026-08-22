"use client";

import React from "react";
import { motion } from "framer-motion";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function hexToRgba(hex: string, alpha: number) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── Colors ──────────────────────────────────────────────
const ACCENT = {
  maroon: "#C25B5B",
  teal:   "#5BC8C8",
  blue:   "#A8C4D4",
  green:  "#C4D4A8",
};
const ACCENT_TEXT = {
  maroon: "#8B3333",
  teal:   "#0C7C7C",
  blue:   "#3D6B82",
  green:  "#5A6B3D",
};

// ── Photo Placeholder ───────────────────────────────────
function PhotoPlaceholder({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{
      aspectRatio: "4/3", backgroundColor: hexToRgba(accent, 0.07),
      border: `1px solid ${hexToRgba(accent, 0.18)}`, borderRadius: 14,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 6,
    }}>
      <span style={{ color: accent, opacity: 0.4, fontSize: "1.2rem", userSelect: "none" }}>+</span>
      <span style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.52rem", letterSpacing: "0.2em",
        textTransform: "uppercase", color: accent, opacity: 0.45,
      }}>{label}</span>
    </div>
  );
}

// ── Job Data ────────────────────────────────────────────
const JOBS = [
  {
    num: "01",
    title: "Animal Care Technician",
    org: "Biology Department · Ithaca College",
    period: "2023 – Present",
    accent: ACCENT.maroon,
    accentText: ACCENT_TEXT.maroon,
    bg: "#FAF5F5",
    bullets: [
      "Monitor and care for lab research animals across multiple vivarium facilities, ensuring strict adherence to IACUC protocols and institutional ethical standards for animal welfare",
      "Conduct daily feeding, health assessments, and environmental checks — maintaining detailed records of animal health status, behavioral observations, and any irregularities requiring veterinary attention",
      "Assist in natal dispersal research in Siberian dwarf hamsters in the Kanda Lab, supporting experimental setups, data collection on dispersal behaviors, and colony management",
      "Assist in neural mechanisms research in zebra finches in the Zemel Lab, contributing to specimen handling, behavioral observation protocols, and maintaining controlled environmental conditions",
      "Collaborate closely with research staff and faculty to support ongoing experimental protocols, including cage preparation, enrichment procedures, and compliance documentation",
      "Develop and refine skills in animal handling, biosafety practices, precision record-keeping, and cross-functional research collaboration",
    ],
    photos: [
      "Vivarium · daily care",
      "Hamster colony · Kanda Lab",
      "Zebra finch facility · Zemel Lab",
      "Health monitoring · records",
    ],
    link: null,
  },
  {
    num: "02",
    title: "Ed Tech Specialist",
    org: "IT & Analytics · Ithaca College",
    period: "2023 – Present",
    accent: ACCENT.teal,
    accentText: ACCENT_TEXT.teal,
    bg: "#F4FAFA",
    bullets: [
      "Build AI agents, Canvas LMS courses, and instructional media for departments across campus — translating complex subject matter into accessible, engaging learning experiences",
      "Develop and deploy lab safety training courses in collaboration with Environmental Health & Safety, reaching over 100 faculty members and research students with a 99.8% positive response rate",
      "Research and evaluate educational technology platforms for institutional adoption, assessing pedagogical value, accessibility compliance, and integration potential",
    ],
    photos: ["Canvas LMS · course build"],
    link: { href: "/work/edtech", label: "View Ed Tech Portfolio →" },
  },
  {
    num: "03",
    title: "Fitness Facility Monitor",
    org: "Ithaca College Fitness Center · Ithaca, NY",
    period: "2023 – Present",
    accent: ACCENT.blue,
    accentText: ACCENT_TEXT.blue,
    bg: "#F4F7FA",
    bullets: [
      "Ensure the safety and well-being of all members during operating hours by monitoring equipment usage, enforcing facility policies, and responding promptly to incidents or equipment malfunctions",
      "Conduct routine inspections of gym equipment, workout areas, and locker rooms — reporting maintenance needs and ensuring a clean, functional environment for the campus community",
      "Foster an inclusive, welcoming atmosphere for students, faculty, and staff of all fitness levels, providing guidance on equipment use and encouraging safe workout practices",
    ],
    photos: ["Fitness center · campus"],
    link: null,
  },
  {
    num: "04",
    title: "Mail Center Associate",
    org: "Ithaca College Mail Services",
    period: "2023 – Present",
    accent: ACCENT.green,
    accentText: ACCENT_TEXT.green,
    bg: "#F5F8F0",
    bullets: [
      "Sort, process, and distribute incoming mail and packages for the campus community, maintaining accuracy and efficiency during high-volume periods including start-of-semester surges",
      "Operate mail processing equipment, manage tracking systems, and coordinate with carriers to ensure timely delivery and proper handling of sensitive or priority items",
      "Develop strong operational reliability, attention to detail, and a service-oriented mindset through consistent daily logistics work supporting campus infrastructure",
    ],
    photos: ["Mail services · campus ops"],
    link: null,
  },
];

// ── Page ────────────────────────────────────────────────
export default function CampusPage() {
  return (
    <main style={{
      backgroundColor: "#FAF7F2",
      color: "#111827",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>

      {/* ── HERO ── */}
      <section style={{ padding: "4.5rem 2rem 2.5rem" }}>
        <div className="max-w-[1060px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              paddingBottom: "2rem",
              borderBottom: "1px solid rgba(26,26,42,0.1)",
            }}
          >
            <div style={{
              display: "flex", alignItems: "baseline",
              gap: "1rem", flexWrap: "wrap", marginBottom: "0.5rem",
            }}>
              <h1 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                fontWeight: 400, color: "#111827",
                letterSpacing: "-0.025em", lineHeight: 1,
              }}>
                Campus Life
              </h1>
              <span style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.65rem", letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#8B3333", fontWeight: 600,
              }}>
                Ithaca College
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
              lineHeight: 1.65, color: "#374151", maxWidth: "56ch",
            }}>
              Four roles on campus that shape how I show up — in labs,
              in classrooms, in facilities, and in the everyday.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── JOB SECTIONS ── */}
      {JOBS.map((job, i) => {
        const isEven = i % 2 === 0;
        const isAnimalCare = i === 0;

        return (
          <section key={job.num} style={{
            padding: "3.5rem 2rem",
            backgroundColor: job.bg,
            borderBottom: "1px solid rgba(26,26,42,0.06)",
          }}>
            <div className="max-w-[1060px] mx-auto">
              <FadeUp delay={0.05}>
                <div
                  className="campus-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: isAnimalCare ? "1.15fr 0.85fr" : "1fr 1fr",
                    gap: "3rem",
                    alignItems: "start",
                    direction: isEven ? "ltr" : "rtl",
                  }}
                >
                  {/* TEXT SIDE */}
                  <div style={{ direction: "ltr" }}>
                    <div style={{
                      display: "flex", alignItems: "center",
                      gap: "0.75rem", marginBottom: "0.9rem",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "0.85rem", fontWeight: 400,
                        color: job.accentText, letterSpacing: "0.08em",
                      }}>{job.num}</span>
                      <div style={{
                        height: 1, width: 24,
                        backgroundColor: job.accent, opacity: 0.4,
                      }} />
                      <span style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: "0.58rem", letterSpacing: "0.2em",
                        textTransform: "uppercase", color: "#6B7280",
                      }}>{job.period}</span>
                    </div>

                    <p style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.6rem", letterSpacing: "0.22em",
                      textTransform: "uppercase", color: job.accentText,
                      marginBottom: "0.5rem", fontWeight: 600,
                    }}>{job.org}</p>

                    <h2 style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(1.8rem, 3vw, 2.7rem)",
                      fontWeight: 400, color: "#111827",
                      letterSpacing: "-0.015em", lineHeight: 1.08,
                      marginBottom: "1.4rem",
                    }}>{job.title}</h2>

                    <ul style={{
                      listStyle: "none", padding: 0, margin: 0,
                      display: "flex", flexDirection: "column",
                      gap: "0.7rem",
                      marginBottom: job.link ? "1.5rem" : 0,
                    }}>
                      {job.bullets.map((b) => (
                        <li key={b} style={{
                          display: "flex", gap: "0.75rem", alignItems: "flex-start",
                        }}>
                          <div style={{
                            width: 5, height: 5, borderRadius: "50%",
                            backgroundColor: job.accent, flexShrink: 0,
                            marginTop: "0.5rem", opacity: 0.7,
                          }} />
                          <span style={{
                            fontFamily: "var(--font-inter), system-ui, sans-serif",
                            fontSize: "0.86rem", lineHeight: 1.75,
                            color: "#374151",
                          }}>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {job.link && (
                      <a href={job.link.href} style={{
                        display: "inline-flex", alignItems: "center",
                        gap: "0.4rem", borderBottom: `1px solid ${job.accentText}`,
                        color: job.accentText, paddingBottom: "0.15rem",
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: "0.62rem", letterSpacing: "0.18em",
                        textTransform: "uppercase", textDecoration: "none",
                        fontWeight: 600, transition: "opacity 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        {job.link.label}
                      </a>
                    )}
                  </div>

                  {/* VISUAL SIDE */}
                  <div style={{ direction: "ltr" }}>
                    {isAnimalCare ? (
                      <div style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr",
                        gap: "0.7rem",
                      }}>
                        {job.photos.map((p) => (
                          <PhotoPlaceholder key={p} label={p} accent={job.accent} />
                        ))}
                      </div>
                    ) : (
                      <PhotoPlaceholder label={job.photos[0]} accent={job.accent} />
                    )}
                  </div>
                </div>
              </FadeUp>
            </div>
          </section>
        );
      })}
    </main>
  );
}
