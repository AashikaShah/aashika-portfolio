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
  sage:   "#5B9E8A",
  maroon: "#C25B5B",
  teal:   "#5BC8C8",
  blue:   "#A8C4D4",
  gold:   "#C4A84A",
};
const ACCENT_TEXT = {
  sage:   "#2A6B58",
  maroon: "#8B3333",
  teal:   "#0C7C7C",
  blue:   "#3D6B82",
  gold:   "#7A6020",
};

// ╔══════════════════════════════════════════════════════╗
// ║  📸  PHOTOS — drop your filenames here              ║
// ║  All files go in:  /public/images/campus/           ║
// ║  Example:  "hamster.jpg"                            ║
// ║         →  /public/images/campus/hamster.jpg        ║
// ╚══════════════════════════════════════════════════════╝
const PHOTOS = {
  // ── 01 · Learning Assistant ──────────────────────────
  learningAssistant:   "",   // 📸 Woods Lab / tardigrade microscopy

  // ── 02 · Animal Care Technician ──────────────────────
  animalCare_vivarium: "guniea.jpg",   // 📸 Vivarium · daily care
  animalCare_hamster:  "hamster.jpg",   // 📸 Hamster colony · Kanda Lab

  // ── 03 · Ed Tech Specialist ──────────────────────────
  edTech:              "remember.png",   // 📸 Canvas LMS / Ed Tech work  (already set → leave "" or add a filename)

  // ── 04 · Fitness Facility Monitor ────────────────────
  fitness:             "",   // 📸 Fitness center · campus

  // ── 05 · IAP Scholar ─────────────────────────────────
  iapScholar:          "IAP.png",   // 📸 IAP Scholar portrait / event photo
};

// ── Photo Component ─────────────────────────────────────
function Photo({
  src,
  label,
  accent,
  aspectRatio = "4/3",
}: {
  src: string;
  label: string;
  accent: string;
  aspectRatio?: string;
}) {
  const shared: React.CSSProperties = {
    aspectRatio,
    width: "100%",
    borderRadius: 14,
    border: `1px solid ${hexToRgba(accent, 0.2)}`,
    display: "block",
  };

  if (src) {
    return (
      <img
        src={`/images/campus/${src}`}
        alt={label}
        style={{ ...shared, objectFit: "cover" }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      style={{
        ...shared,
        backgroundColor: hexToRgba(accent, 0.07),
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 8,
      }}
    >
      <span style={{ color: accent, opacity: 0.35, fontSize: "1.5rem", userSelect: "none" }} aria-hidden="true">⬜</span>
      <span style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.65rem", letterSpacing: "0.18em",
        textTransform: "uppercase", color: accent, opacity: 0.5,
        textAlign: "center", padding: "0 0.5rem",
      }}>{label}</span>
    </div>
  );
}

// ── Animal Species Card ──────────────────────────────────
type AnimalSpecies = {
  name: string;
  note: string;
};

function AnimalCard({
  species,
  accent,
  accentText,
}: {
  species: AnimalSpecies;
  accent: string;
  accentText: string;
}) {
  return (
    <div style={{
      padding: "0.8rem 1rem",
      borderRadius: 10,
      backgroundColor: hexToRgba(accent, 0.06),
      border: `1px solid ${hexToRgba(accent, 0.18)}`,
    }}>
      <p style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.78rem", fontWeight: 650,
        color: accentText, marginBottom: "0.22rem",
        letterSpacing: "0.01em",
      }}>{species.name}</p>
      <p style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.76rem", lineHeight: 1.6,
        color: "#4B5563", margin: 0,
      }}>{species.note}</p>
    </div>
  );
}

// ── Job Data ────────────────────────────────────────────
type Job = {
  num: string;
  title: string;
  org: string;
  period: string;
  accent: string;
  accentText: string;
  bg: string;
  bullets: string[];
  animalSpecies?: AnimalSpecies[];
  photos: { src: string; label: string }[];
  gridPhotos: boolean;
  link: { href: string; label: string } | null;
};

const JOBS: Job[] = [
  // ── 01 · Learning Assistant ──────────────────────────
  {
    num: "01",
    title: "Learning Assistant",
    org: "Woods Lab · Ithaca College",
    period: "August 2026 – Present",
    accent: ACCENT.sage,
    accentText: ACCENT_TEXT.sage,
    bg: "#F4FAF8",
    bullets: [
      "Support undergraduate instruction and hands-on lab operations within an active tardigrade research environment, bridging course concepts with live experimental work",
      "Guide students through microscopy techniques, specimen preparation, and behavioral data collection protocols used in tardigrade research",
      "Collaborate with faculty and research staff to reinforce scientific methodology, lab safety standards, and best practices in biological experimentation",
    ],
    photos: [
      { src: PHOTOS.learningAssistant, label: "Woods Lab · tardigrade research" },
    ],
    gridPhotos: false,
    link: null,
  },

  // ── 02 · Animal Care Technician ─────────────────────
  {
    num: "02",
    title: "Animal Care Technician",
    org: "Biology Department · Ithaca College",
    period: "2023 – Present",
    accent: ACCENT.maroon,
    accentText: ACCENT_TEXT.maroon,
    bg: "#FAF5F5",
    bullets: [
      "Provide daily care, feeding, and health monitoring for research animals across multiple vivarium facilities in full compliance with IACUC protocols",
      "Assist with experimental setups, colony management, and compliance documentation alongside research faculty and staff",
    ],
    animalSpecies: [
      {
        name: "Zebrafish",
        note: "Developmental genetics & model organism studies; tank cycling and water quality management",
      },
      {
        name: "Siberian Hamster",
        note: "Natal dispersal behavioral research (Kanda Lab); colony tracking and breeding record maintenance",
      },
      {
        name: "Zebra Finch",
        note: "Vocal learning & neurobiology research (Zemel Lab); daily behavioral monitoring and husbandry",
      },
      {
        name: "Mouse",
        note: "Chlamydia infection & immunological studies; handling, health checks, and experimental support",
      },
      {
        name: "Tilapia",
        note: "Aquatic physiology and behavioral research; aquatic habitat maintenance and feeding protocols",
      },
      {
        name: "Sea Anemone",
        note: "Marine invertebrate biology studies; specialized saltwater system upkeep and specimen care",
      },
    ],
    photos: [
      { src: PHOTOS.animalCare_vivarium, label: "Vivarium · daily care" },
      { src: PHOTOS.animalCare_hamster,  label: "Hamster colony · Kanda Lab" },
    ],
    gridPhotos: true,
    link: null,
  },

  // ── 03 · Ed Tech Specialist ──────────────────────────
  {
    num: "03",
    title: "Ed Tech Specialist",
    org: "IT & Analytics · Ithaca College",
    period: "2023 – Present",
    accent: ACCENT.teal,
    accentText: ACCENT_TEXT.teal,
    bg: "#F4FAFA",
    bullets: [
      "Research and evaluate educational technology platforms for institutional adoption, assessing pedagogical value, accessibility compliance, and integration potential",
    ],
    photos: [
      { src: PHOTOS.edTech, label: "Canvas LMS · course build" },
    ],
    gridPhotos: false,
    link: { href: "/work/edtech", label: "View Ed Tech Portfolio →" },
  },

  // ── 04 · Fitness Facility Monitor ───────────────────
  {
    num: "04",
    title: "Fitness Facility Monitor",
    org: "Ithaca College Fitness Center · Ithaca, NY",
    period: "2023 – Present",
    accent: ACCENT.blue,
    accentText: ACCENT_TEXT.blue,
    bg: "#F4F7FA",
    bullets: [
      "Foster an inclusive, welcoming atmosphere for students, faculty, and staff of all fitness levels, offering guidance on equipment use and safe workout practices",
      "Ensure the safety and well-being of all members during operating hours by monitoring equipment usage, enforcing facility policies, and responding promptly to incidents",
      "Conduct routine inspections of gym equipment, workout areas, and locker rooms — reporting maintenance needs and keeping the space clean and functional for the campus community",
    ],
    photos: [
      { src: PHOTOS.fitness, label: "Fitness center · campus" },
    ],
    gridPhotos: false,
    link: null,
  },
];

// ── IAP Scholar ──────────────────────────────────────────
const IAP_PHOTO = { src: PHOTOS.iapScholar, label: "IAP Scholar · Ithaca College" };

// ── Campus Involvement ───────────────────────────────────
const INVOLVEMENTS = [
  "Active Member · International Club",
  "TriBeta Biology Honor Society",
  "BOLD Leadership Scholar",
];

// ── Page ─────────────────────────────────────────────────
export default function CampusPage() {
  return (
    <main style={{
      backgroundColor: "#FAF7F2",
      color: "#111827",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>

      {/* ── HERO ── */}
      <section style={{ padding: "4.5rem 2rem 2.5rem" }} aria-labelledby="campus-heading">
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
              <h1
                id="campus-heading"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                  fontWeight: 400, color: "#111827",
                  letterSpacing: "-0.025em", lineHeight: 1,
                }}
              >
                Campus Life
              </h1>
              <span style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.68rem", letterSpacing: "0.3em",
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
              A few of the ways I am involved in my campus community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── JOB SECTIONS ── */}
      {JOBS.map((job, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={job.num}
            aria-label={job.title}
            style={{
              padding: "3.5rem 2rem",
              backgroundColor: job.bg,
              borderBottom: "1px solid rgba(26,26,42,0.06)",
            }}
          >
            <div className="max-w-[1060px] mx-auto">
              <FadeUp delay={0.05}>
                <div
                  className="campus-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: job.gridPhotos ? "1.15fr 0.85fr" : "1fr 1fr",
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
                        fontSize: "0.88rem", fontWeight: 400,
                        color: job.accentText, letterSpacing: "0.08em",
                      }}>{job.num}</span>
                      <div style={{
                        height: 1, width: 24,
                        backgroundColor: job.accent, opacity: 0.4,
                      }} aria-hidden="true" />
                      <span style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: "0.62rem", letterSpacing: "0.2em",
                        textTransform: "uppercase", color: "#6B7280",
                      }}>{job.period}</span>
                    </div>

                    <p style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.62rem", letterSpacing: "0.22em",
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
                      marginBottom: job.animalSpecies ? "1.5rem" : (job.link ? "1.5rem" : 0),
                    }}>
                      {job.bullets.map((b) => (
                        <li key={b} style={{
                          display: "flex", gap: "0.75rem", alignItems: "flex-start",
                        }}>
                          <div
                            aria-hidden="true"
                            style={{
                              width: 5, height: 5, borderRadius: "50%",
                              backgroundColor: job.accent, flexShrink: 0,
                              marginTop: "0.55rem", opacity: 0.7,
                            }}
                          />
                          <span style={{
                            fontFamily: "var(--font-inter), system-ui, sans-serif",
                            fontSize: "0.88rem", lineHeight: 1.78,
                            color: "#374151",
                          }}>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ── Animal Species Grid (Animal Care only) ── */}
                    {job.animalSpecies && (
                      <div style={{ marginBottom: job.link ? "1.5rem" : 0 }}>
                        <p style={{
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                          fontSize: "0.62rem", letterSpacing: "0.2em",
                          textTransform: "uppercase", color: job.accentText,
                          fontWeight: 600, marginBottom: "0.9rem",
                        }}>
                          Species &amp; Research Areas
                        </p>
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0.6rem",
                        }}>
                          {job.animalSpecies.map((sp) => (
                            <AnimalCard
                              key={sp.name}
                              species={sp}
                              accent={job.accent}
                              accentText={job.accentText}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {job.link && (
                      <a
                        href={job.link.href}
                        style={{
                          display: "inline-flex", alignItems: "center",
                          gap: "0.4rem", borderBottom: `1px solid ${job.accentText}`,
                          color: job.accentText, paddingBottom: "0.15rem",
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                          fontSize: "0.65rem", letterSpacing: "0.18em",
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
                    {job.gridPhotos ? (
                      <div style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr",
                        gap: "0.7rem",
                      }}>
                        {job.photos.map((p) => (
                          <Photo key={p.label} src={p.src} label={p.label} accent={job.accent} />
                        ))}
                      </div>
                    ) : (
                      <Photo
                        src={job.photos[0].src}
                        label={job.photos[0].label}
                        accent={job.accent}
                      />
                    )}
                  </div>
                </div>
              </FadeUp>
            </div>
          </section>
        );
      })}

      {/* ── IAP SCHOLAR ── */}
      <section
        aria-label="Ithaca Achievement Program Scholar"
        style={{
          padding: "3.5rem 2rem",
          backgroundColor: "#F9F6EE",
          borderBottom: "1px solid rgba(26,26,42,0.06)",
        }}
      >
        <div className="max-w-[1060px] mx-auto">
          <FadeUp delay={0.05}>
            <div
              className="campus-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                gap: "3rem",
                alignItems: "start",
              }}
            >
              {/* TEXT SIDE */}
              <div>
                <div style={{
                  display: "flex", alignItems: "center",
                  gap: "0.75rem", marginBottom: "0.9rem",
                }}>
                  <span style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.88rem", fontWeight: 400,
                    color: ACCENT_TEXT.gold, letterSpacing: "0.08em",
                  }}>05</span>
                  <div style={{
                    height: 1, width: 24,
                    backgroundColor: ACCENT.gold, opacity: 0.4,
                  }} aria-hidden="true" />
                  <span style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.62rem", letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "#6B7280",
                  }}>2023 – Present</span>
                </div>

                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.62rem", letterSpacing: "0.22em",
                  textTransform: "uppercase", color: ACCENT_TEXT.gold,
                  marginBottom: "0.5rem", fontWeight: 600,
                }}>Ithaca College · IAP</p>

                <h2 style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.7rem)",
                  fontWeight: 400, color: "#111827",
                  letterSpacing: "-0.015em", lineHeight: 1.08,
                  marginBottom: "1.2rem",
                }}>Ithaca Achievement Program Scholar</h2>

                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.88rem", lineHeight: 1.8,
                  color: "#374151", marginBottom: "1rem",
                }}>
                  The Ithaca Achievement Program (IAP) recognizes and supports students who bring
                  dedication, community care, and a genuine drive to make a difference — on campus
                  and beyond. I&apos;ve been pushed to show up fully: in service,
                  in work, and in the everyday life as a college student.
                </p>

                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.88rem", lineHeight: 1.8,
                  color: "#374151",
                }}>
                  As an IAP Scholar, I&apos;ve actively volunteered at Prunty&apos;s Pantry and the Food Bank of the Southern Tier —
                  sorting donations, packing boxes, and preparing groceries for families in need.
                </p>
              </div>

              {/* PHOTO SIDE */}
              <div>
                <Photo
                  src={IAP_PHOTO.src}
                  label={IAP_PHOTO.label}
                  accent={ACCENT.gold}
                  aspectRatio="16/9"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CAMPUS INVOLVEMENT ── */}
      <section
        aria-label="Campus Involvement"
        style={{
          padding: "3.5rem 2rem 5rem",
          backgroundColor: "#FAF7F2",
        }}
      >
        <div className="max-w-[1060px] mx-auto">
          <FadeUp delay={0.05}>
            <div style={{
              paddingBottom: "1.2rem",
              borderBottom: "1px solid rgba(26,26,42,0.08)",
              marginBottom: "2rem",
            }}>
              <h2 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                fontWeight: 400, color: "#111827",
                letterSpacing: "-0.015em", lineHeight: 1.1,
                marginBottom: "0.4rem",
              }}>Also part of the community</h2>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.88rem", lineHeight: 1.7,
                color: "#6B7280",
              }}>
                A few more spaces on campus where I show up, connect, and keep growing.
              </p>
            </div>

            <div style={{
              display: "flex", flexWrap: "wrap", gap: "0.65rem",
            }}>
              {INVOLVEMENTS.map((item) => (
                <div key={item} style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.82rem", letterSpacing: "0.06em",
                  color: "#374151", padding: "0.5rem 1.1rem",
                  border: "1px solid rgba(26,26,42,0.14)",
                  borderRadius: 100,
                  backgroundColor: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(4px)",
                }}>
                  {item}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

    </main>
  );
}
