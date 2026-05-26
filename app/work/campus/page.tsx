"use client";

import React from "react";
import { motion } from "framer-motion";

/* ── helpers ─────────────────────────────────────────────── */
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Polaroid({ label, accent, rotate = 0, h = 180 }: {
  label: string; accent: string; rotate?: number; h?: number;
}) {
  return (
    <div style={{
      background:   "#FFFFFF",
      padding:      "10px 10px 38px",
      borderRadius:  4,
      boxShadow:    "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
      transform:    `rotate(${rotate}deg)`,
      width:        "100%",
      flexShrink:    0,
    }}>
      <div style={{
        height:         h,
        background:    `${accent}18`,
        border:        `1px dashed ${accent}60`,
        borderRadius:   2,
        display:       "flex",
        alignItems:    "center",
        justifyContent:"center",
      }}>
        <span style={{
          fontFamily:    "var(--font-inter), system-ui, sans-serif",
          fontSize:      "0.48rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:          accent,
          opacity:        0.7,
          textAlign:     "center",
          padding:       "0 1rem",
        }}>
          {label}
        </span>
      </div>
    </div>
  );
}

function Blob({ color, style }: { color: string; style: React.CSSProperties }) {
  return (
    <div style={{
      position:     "absolute",
      width:         220,
      height:        220,
      borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%",
      background:    color,
      pointerEvents:"none",
      zIndex:         0,
      ...style,
    }} />
  );
}

/* ── data ─────────────────────────────────────────────────── */
const JOBS = [
  {
    num:     "01",
    title:   "Animal Care Technician",
    org:     "Biology Department · Ithaca College",
    period:  "2023 – Present",
    accent:  "#E8A598",
    bg:      "#FFF0EC",
    blob:    "rgba(232,165,152,0.18)",
    bullets: [
      "Followed IACUC animal care guidelines ensuring ethical research standards",
      "Assisted in natal dispersal research in Siberian dwarf hamsters — Kanda Lab",
      "Assisted in neural mechanisms research in zebra finches — Zemel Lab",
      "Developed precision, attention to detail, and research collaboration skills",
    ],
    photos: [
      { label: "Lab · hamster care",       rotate:  2  },
      { label: "Zemel Lab · zebra finches", rotate: -2  },
    ],
    link: null,
  },
  {
    num:     "02",
    title:   "Ed Tech Specialist",
    org:     "School of Health Sciences · Ithaca College",
    period:  "2023 – Present",
    accent:  "#5BC8C8",
    bg:      "#EEF8F8",
    blob:    "rgba(91,200,200,0.14)",
    bullets: [
      "Built AI agents, Canvas LMS courses, and instructional media for campus departments",
      "Developed lab safety course reaching 100+ faculty and students",
      "Collaborated with Environmental Health & Safety and School of Health Sciences",
    ],
    photos: [
      { label: "Canvas LMS · course", rotate: -2 },
      { label: "AI agent build",      rotate:  2 },
    ],
    link: { href: "/work/edtech", label: "View Ed Tech Portfolio →" },
  },
  {
    num:     "03",
    title:   "Fitness Facility Monitor",
    org:     "Ithaca College",
    period:  "2023 – Present",
    accent:  "#A8C4D4",
    bg:      "#F0F5FF",
    blob:    "rgba(168,196,212,0.20)",
    bullets: [
      "Ensured a safe and inclusive environment for the campus fitness community",
      "Fostered well-being and community connection across all facility users",
    ],
    photos: [
      { label: "Fitness facility · campus", rotate: 1.5 },
    ],
    link: null,
  },
  {
    num:     "04",
    title:   "Mail Services",
    org:     "Ithaca College",
    period:  "2023 – Present",
    accent:  "#C4D4A8",
    bg:      "#EEF5EE",
    blob:    "rgba(196,212,168,0.22)",
    bullets: [
      "Supported campus operations and daily logistics with care and consistency",
      "Developed reliability, operational attention to detail, and community service mindset",
    ],
    photos: [
      { label: "Mail services · campus ops", rotate: -1.5 },
    ],
    link: null,
  },
];

/* ── page ─────────────────────────────────────────────────── */
export default function CampusPage() {
  return (
    <main style={{
      backgroundColor: "#FAF7F2", color: "#1A1A2A",
      minHeight: "100vh", overflowX: "hidden",
    }}>

      {/* HERO HEADER */}
      <section style={{
        position: "relative", backgroundColor: "#FAF7F2",
        padding: "8rem 2rem 5rem", overflow: "hidden",
      }}>
        <Blob color="rgba(196,71,91,0.07)"   style={{ top: -60,   right: -60 }} />
        <Blob color="rgba(232,165,152,0.15)" style={{ bottom: -40, left: -80 }} />

        <div className="max-w-[1060px] mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily:    "var(--font-inter), system-ui, sans-serif",
              fontSize:      "0.55rem", letterSpacing: "0.55em",
              textTransform: "uppercase", color: "#C4475B", marginBottom: "0.9rem",
            }}>
              Campus Life
            </p>
            <h1 style={{
              fontFamily:    "var(--font-cormorant), Georgia, serif",
              fontSize:      "clamp(3rem, 8vw, 6.5rem)",
              fontWeight:    300, color: "#1A1A2A",
              letterSpacing: "-0.035em", lineHeight: 0.92,
              maxWidth:      "16ch", marginBottom: "1.8rem",
            }}>
              Work that keeps me present.
            </h1>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize:   "clamp(1.1rem, 1.8vw, 1.4rem)",
              lineHeight: 1.7, color: "rgba(26,26,42,0.65)", maxWidth: "52ch",
            }}>
              Four roles on campus that have shaped how I show up — in labs,
              in classrooms, in facilities, and in the everyday.
            </p>
          </motion.div>
        </div>
      </section>

      {/* JOB SECTIONS */}
      {JOBS.map((job, i) => (
        <section key={job.num} style={{
          position: "relative", backgroundColor: job.bg,
          padding: "5rem 2rem", overflow: "hidden",
        }}>
          <Blob color={job.blob}
            style={i % 2 === 0 ? { top: -60, right: -60 } : { bottom: -60, left: -60 }} />
          <Blob color={job.blob}
            style={i % 2 === 0 ? { bottom: -40, left: -40 } : { top: -40, right: -40 }} />

          <div className="max-w-[1060px] mx-auto" style={{ position: "relative", zIndex: 1 }}>

            {/* Faint big number */}
            <div style={{
              position:      "absolute",
              top:            "-1.5rem",
              right:           0,
              fontFamily:    "var(--font-cormorant), Georgia, serif",
              fontSize:      "clamp(5rem, 12vw, 10rem)",
              fontWeight:    300,
              color:         `${job.accent}22`,
              lineHeight:    1,
              userSelect:    "none",
              pointerEvents: "none",
            }}>
              {job.num}
            </div>

            <FadeUp delay={0.05}>
              <div className="campus-grid" style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 "3rem",
                alignItems:          "start",
              }}>

                {/* LEFT — text */}
                <div>
                  <p style={{
                    fontFamily:    "var(--font-inter), system-ui, sans-serif",
                    fontSize:      "0.55rem", letterSpacing: "0.38em",
                    textTransform: "uppercase", color: job.accent, marginBottom: "0.5rem",
                  }}>
                    {job.period} · {job.org}
                  </p>

                  <h2 style={{
                    fontFamily:    "var(--font-cormorant), Georgia, serif",
                    fontSize:      "clamp(2rem, 3.5vw, 3.2rem)",
                    fontWeight:    300, color: "#1A1A2A",
                    letterSpacing: "-0.02em", lineHeight: 1.05,
                    marginBottom:  "1.8rem",
                  }}>
                    {job.title}
                  </h2>

                  <ul style={{
                    listStyle: "none", padding: 0, margin: 0,
                    display: "flex", flexDirection: "column", gap: "0.9rem",
                    marginBottom: job.link ? "1.8rem" : 0,
                  }}>
                    {job.bullets.map((b) => (
                      <li key={b} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                        <span style={{
                          color: job.accent, flexShrink: 0,
                          marginTop: "0.3rem", fontSize: "0.45rem",
                        }}>◆</span>
                        <span style={{
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                          fontSize: "0.9rem", lineHeight: 1.8,
                          color: "rgba(26,26,42,0.82)",
                        }}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {job.link && (
                    <a href={job.link.href} style={{
                      display:        "inline-flex",
                      alignItems:     "center",
                      gap:            "0.4rem",
                      background:     job.accent,
                      color:          "#FFFFFF",
                      borderRadius:    999,
                      padding:        "0.55rem 1.2rem",
                      fontFamily:     "var(--font-inter), system-ui, sans-serif",
                      fontSize:       "0.6rem",
                      letterSpacing:  "0.18em",
                      textTransform:  "uppercase",
                      textDecoration: "none",
                      boxShadow:      `0 4px 16px ${job.accent}40`,
                    }}>
                      {job.link.label}
                    </a>
                  )}
                </div>

                {/* RIGHT — polaroids */}
                <div style={{
                  display: "flex", flexDirection: "column",
                  gap: "1.5rem", paddingTop: "1rem",
                }}>
                  {job.photos.map((p) => (
                    <Polaroid
                      key={p.label}
                      label={p.label}
                      accent={job.accent}
                      rotate={p.rotate}
                      h={160}
                    />
                  ))}
                </div>

              </div>
            </FadeUp>
          </div>
        </section>
      ))}

      {/* FOOTER STRIP */}
      <section style={{
        backgroundColor: "#FAF7F2",
        padding:         "3rem 2rem",
        textAlign:       "center",
        borderTop:       "1px solid rgba(26,26,42,0.08)",
      }}>
        <p style={{
          fontFamily:    "var(--font-cormorant), Georgia, serif",
          fontSize:      "clamp(1.2rem, 2vw, 1.6rem)",
          fontWeight:    300,
          color:         "rgba(26,26,42,0.4)",
          fontStyle:     "italic",
        }}>
          Every role, a different kind of presence.
        </p>
      </section>

      <style jsx>{`
        @media (max-width: 720px) {
          .campus-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}