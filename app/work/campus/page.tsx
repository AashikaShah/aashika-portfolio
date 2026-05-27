"use client";

import React from "react";
import { motion } from "framer-motion";

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

const JOBS = [
  {
    num:     "01",
    title:   "Animal Care Technician",
    org:     "Biology Department · Ithaca College",
    period:  "2023 – Present",
    accent:  "#E8A598",
    bg:      "#FFF8F6",
    bullets: [
      "Followed IACUC animal care guidelines ensuring ethical research standards",
      "Assisted in natal dispersal research in Siberian dwarf hamsters — Kanda Lab",
      "Assisted in neural mechanisms research in zebra finches — Zemel Lab",
      "Developed precision, attention to detail, and research collaboration skills",
    ],
    photo: "Lab · hamster care",
    link: null,
  },
  {
    num:     "02",
    title:   "Ed Tech Specialist",
    org:     "School of Health Sciences · Ithaca College",
    period:  "2023 – Present",
    accent:  "#5BC8C8",
    bg:      "#F4FAFA",
    bullets: [
      "Built AI agents, Canvas LMS courses, and instructional media for campus departments",
      "Developed lab safety course reaching 100+ faculty and students",
      "Collaborated with Environmental Health & Safety and School of Health Sciences",
    ],
    photo: "Canvas LMS · course build",
    link: { href: "/work/edtech", label: "View Ed Tech Portfolio →" },
  },
  {
    num:     "03",
    title:   "Fitness Facility Monitor",
    org:     "Ithaca College Fitness Center · Ithaca, NY",
    period:  "November 2023 – Present",
    accent:  "#A8C4D4",
    bg:      "#F4F7FA",
    bullets: [
      "Ensured the safety and well-being of members during operating hours",
      "Monitored gym equipment, workout areas, and the overall facility",
      "Fostered an inclusive and welcoming environment for the campus fitness community",
    ],
    photo: "Fitness center · campus",
    link: null,
  },
  {
    num:     "04",
    title:   "Mail Center",
    org:     "Ithaca College",
    period:  "2023 – Present",
    accent:  "#C4D4A8",
    bg:      "#F5F8F0",
    bullets: [
      "Supported campus operations and daily logistics with care and consistency",
      "Developed reliability, operational attention to detail, and community service mindset",
    ],
    photo: "Mail services · campus ops",
    link: null,
  },
];

export default function CampusPage() {
  return (
    <main style={{
      backgroundColor:     "#FAF7F2",
      color:               "#1A1A2A",
      minHeight:           "100vh",
      overflowX:           "hidden",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ padding: "9rem 2rem 5rem" }}>
        <div className="max-w-[1060px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily:    "var(--font-inter), system-ui, sans-serif",
              fontSize:      "0.55rem",
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              color:         "#C4475B",
              marginBottom:  "1rem",
            }}>
              Campus Life
            </p>
            <h1 style={{
              fontFamily:    "var(--font-cormorant), Georgia, serif",
              fontSize:      "clamp(3rem, 8vw, 6.5rem)",
              fontWeight:    300,
              color:         "#1A1A2A",
              letterSpacing: "-0.035em",
              lineHeight:    0.92,
              maxWidth:      "16ch",
              marginBottom:  "2rem",
            }}>
              Work that keeps me present.
            </h1>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize:   "clamp(1.1rem, 1.8vw, 1.35rem)",
              lineHeight: 1.75,
              color:      "rgba(26,26,42,0.52)",
              maxWidth:   "48ch",
            }}>
              Four roles on campus that have shaped how I show up — in labs,
              in classrooms, in facilities, and in the everyday.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Top divider */}
      <div style={{
        maxWidth:    "1060px",
        margin:      "0 auto",
        padding:     "0 2rem",
        borderTop:   "1px solid rgba(26,26,42,0.08)",
      }} />

      {/* ── JOB SECTIONS — alternating ───────────────────── */}
      {JOBS.map((job, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={job.num}
            style={{
              padding:         "5.5rem 2rem",
              backgroundColor: job.bg,
              borderBottom:    "1px solid rgba(26,26,42,0.06)",
            }}
          >
            <div className="max-w-[1060px] mx-auto">
              <FadeUp delay={0.05}>
                <div
                  className="campus-grid"
                  style={{
                    display:             "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap:                 "5rem",
                    alignItems:          "center",
                    direction:           isEven ? "ltr" : "rtl",
                  }}
                >

                  {/* TEXT */}
                  <div style={{ direction: "ltr" }}>

                    {/* Number row */}
                    <div style={{
                      display:      "flex",
                      alignItems:   "center",
                      gap:          "0.85rem",
                      marginBottom: "1.2rem",
                    }}>
                      <span style={{
                        fontFamily:    "var(--font-cormorant), Georgia, serif",
                        fontSize:      "0.9rem",
                        fontWeight:    300,
                        color:         job.accent,
                        letterSpacing: "0.1em",
                      }}>
                        {job.num}
                      </span>
                      <div style={{
                        height:          1,
                        width:           28,
                        backgroundColor: job.accent,
                        opacity:         0.45,
                      }} />
                      <span style={{
                        fontFamily:    "var(--font-inter), system-ui, sans-serif",
                        fontSize:      "0.52rem",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color:         "rgba(26,26,42,0.38)",
                      }}>
                        {job.period}
                      </span>
                    </div>

                    {/* Org */}
                    <p style={{
                      fontFamily:    "var(--font-inter), system-ui, sans-serif",
                      fontSize:      "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color:         job.accent,
                      marginBottom:  "0.65rem",
                    }}>
                      {job.org}
                    </p>

                    {/* Title */}
                    <h2 style={{
                      fontFamily:    "var(--font-cormorant), Georgia, serif",
                      fontSize:      "clamp(2rem, 3.2vw, 3rem)",
                      fontWeight:    300,
                      color:         "#1A1A2A",
                      letterSpacing: "-0.02em",
                      lineHeight:    1.05,
                      marginBottom:  "1.8rem",
                    }}>
                      {job.title}
                    </h2>

                    {/* Bullets */}
                    <ul style={{
                      listStyle:     "none",
                      padding:        0,
                      margin:         0,
                      display:       "flex",
                      flexDirection: "column",
                      gap:           "0.9rem",
                      marginBottom:  job.link ? "2rem" : 0,
                    }}>
                      {job.bullets.map((b) => (
                        <li key={b} style={{
                          display:    "flex",
                          gap:        "0.9rem",
                          alignItems: "flex-start",
                        }}>
                          <div style={{
                            width:           5,
                            height:          5,
                            borderRadius:    "50%",
                            backgroundColor: job.accent,
                            flexShrink:      0,
                            marginTop:       "0.52rem",
                          }} />
                          <span style={{
                            fontFamily: "var(--font-inter), system-ui, sans-serif",
                            fontSize:   "0.88rem",
                            lineHeight: 1.85,
                            color:      "rgba(26,26,42,0.68)",
                          }}>
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Link */}
                    {job.link && (
                      <a href={job.link.href} style={{
                        display:        "inline-flex",
                        alignItems:     "center",
                        gap:            "0.4rem",
                        borderBottom:   `1px solid ${job.accent}`,
                        color:          job.accent,
                        paddingBottom:  "0.15rem",
                        fontFamily:     "var(--font-inter), system-ui, sans-serif",
                        fontSize:       "0.62rem",
                        letterSpacing:  "0.18em",
                        textTransform:  "uppercase",
                        textDecoration: "none",
                        transition:     "opacity 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                      >
                        {job.link.label}
                      </a>
                    )}
                  </div>

                  {/* VISUAL — clean minimal placeholder */}
                  <div style={{ direction: "ltr" }}>
                    <div style={{
                      aspectRatio:     "4/3",
                      backgroundColor: `${job.accent}12`,
                      border:          `1px solid ${job.accent}28`,
                      borderRadius:    20,
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                    }}>
                      <span style={{
                        fontFamily:    "var(--font-inter), system-ui, sans-serif",
                        fontSize:      "0.52rem",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color:         job.accent,
                        opacity:       0.5,
                      }}>
                        {job.photo}
                      </span>
                    </div>
                  </div>

                </div>
              </FadeUp>
            </div>
          </section>
        );
      })}

      {/* ── FOOTER ───────────────────────────────────────── */}
      <section style={{
        backgroundColor: "#FAF7F2",
        padding:         "3.5rem 2rem",
        textAlign:       "center",
        borderTop:       "1px solid rgba(26,26,42,0.08)",
      }}>
        <p style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize:   "clamp(1.1rem, 2vw, 1.5rem)",
          fontWeight: 300,
          color:      "rgba(26,26,42,0.32)",
          fontStyle:  "italic",
        }}>
          Every role, a different kind of presence.
        </p>
      </section>

      <style jsx>{`
        @media (max-width: 720px) {
          .campus-grid {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
        }
      `}</style>
    </main>
  );
}