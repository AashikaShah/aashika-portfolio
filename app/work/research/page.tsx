"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   PHOTOS  ← the ONLY place you touch for the right column
   ══════════════════════════════════════════════════════════
   Each entry:
     src?    – path relative to /public, e.g. "/images/labs/me.jpg"
               Leave undefined to keep a placeholder slot.
     alt     – screen-reader text (never shown visually)
     rotate  – tilt in degrees (optional, default 0)

   ── ADD a photo   → append a new object with src set
   ── REMOVE a photo → delete its object
   ── REORDER       → move the object up / down
   ── RESIZE        → nothing! Real images size themselves
                       automatically from their actual dimensions.
   ══════════════════════════════════════════════════════════ */
const PHOTOS: { src?: string; alt: string; rotate?: number }[] = [
  { alt: "Gondek Lab – Fall 2026",  rotate: -1.5, src: "/images/lab/20260720_C_KC_002.jpg" },
  { alt: "Gondek Lab – Fall 2026",  rotate: -1.5, src: "/images/lab/talk.jpg" },
  { alt: "Gondek Lab – Fall 2026",  rotate: -1.5, src: "/images/lab/summer.png" },
  { alt: "Gondek Lab – Fall 2026",  rotate: -1.5, src: "/images/lab/crt.png" },
  { alt: "Gondek Lab – Fall 2026",  rotate: -1.5, src: "/images/lab/lab2.1.png" },
  { alt: "Gondek Lab – Fall 2026",  rotate: -1.5, src: "/images/lab/ok.jpg" }
];

/* ══════════════════════════════════════════════════════════
   DATA  — labs only (no photos inside lab objects)
   ══════════════════════════════════════════════════════════ */

interface UpcomingLab {
  id:        string;
  lab:       string;
  pi:        string;
  period:    string;
  status:    "upcoming";
  accent:    string;
  bg:        string;
  pageBg:    string;
  intention: string;
}

interface ActiveLab {
  id:      string;
  lab:     string;
  pi:      string;
  period:  string;
  status:  "active" | "completed";
  role?:   string;
  accent:  string;
  bg:      string;
  pageBg:  string;
  focus:   React.ReactNode;
  finding: string | null;
  details: string[];
  methods: string;
}

type AnyLab = UpcomingLab | ActiveLab;

/* ── Upcoming ──────────────────────────────────────────── */
const GONDEK: UpcomingLab = {
  id:     "gondek",
  lab:    "Gondek Lab",
  pi:     "Prof. Gondek",
  period: "Fall 2026",
  status: "upcoming",
  accent: "#9B8FD4",
  bg:     "#1A1028",
  pageBg: "#100A1A",
  intention:
    "Joining the Gondek Lab this fall. More info to be added as the semester begins.",
};

/* ── Active & completed (newest → oldest) ─────────────── */
const LABS: ActiveLab[] = [
  /* ── Woods Lab ─ Summer 2026 - H&S Summer Scholar ──────────────────────────── */
  {
    id:     "woods",
    lab:    "Woods Lab (H&S Summer Scholar)",
    pi:     "Prof. Ian Woods",
    period: "Summer 2026",
    status: "completed",
    accent: "#C49A73",
    bg:     "#181208",
    pageBg: "#0F0C07",
    focus: (
      <>
        How do tardigrades walk? In the Woods Lab I found tardigrades 
        for behavioral studies, specifically the gait/locomotion of tardigrades — mapping how these eight-legged
        microscopic animals coordinate their legs during forward movement.
      </>
    ),
    finding:
      "Gait analysis in progress. Manuscript in preparation for submission to Journal of Visualized Experiments (2026).",
    details: [
      "Found and identified tardigrades in NY Finger Lakes region for behavioral studies",
      "Used high-resolution video microscopy to record and track individual tardigrade gait",
      "Prepared permanent slides for morphological identification",
      "Performed DNA extraction, PCR and analyzed DNA sequencing for genetic identification",
    ],
    methods:
      "sampling · microscopy · DNA extraction · PCR · gait analysis · image/video tracking · Python ",
  },

  /* ── Melcher Lab ─ Aug 2025 – May 2026 ─────────────────── */
  {
    id:     "melcher",
    lab:    "Melcher Lab",
    pi:     "Prof. Peter Melcher",
    period: "Aug 2025 – May 2026",
    status: "completed",
    accent: "#53C8B4",
    bg:     "#0F2E28",
    pageBg: "#0A1A18",
    focus: (
      <>
        How do mosses survive freezing? I studied the physiological
        responses of <em>Dicranum scoparium</em> and{" "}
        <em>Leucobryum glaucum</em> to freezing stress across two
        contrasting microhabitats on South Hill — comparing cold-stress
        response by location, canopy cover, and treatment severity.
      </>
    ),
    finding:
      "Rapid freezing was detrimental to both species. Mosses in open-canopy sites tolerated freezing better than those under closed canopy.",
    details: [
      "Designed and ran controlled freezing experiments with slow, rapid, and non-freeze treatments",
      "Quantified membrane injury using electrolyte leakage assays and photosynthetic performance using chlorophyll fluorescence (Fv/Fm)",
      "Installed temperature dataloggers in the field to capture nighttime cooling patterns",
      "Analysed habitat-by-treatment effects in R and presented findings to the Biology Department",
    ],
    methods:
      "electrolyte leakage · Fv/Fm chlorophyll fluorescence · plant electrical signalling · R statistical analysis · field data collection",
  },

  /* ── Swensen Lab ─ Jan 2024 – May 2024 ─────────────────── */
  {
    id:     "swensen",
    lab:    "Swensen Lab",
    pi:     "Prof. Susan Swensen",
    period: "Jan 2024 – May 2024",
    status: "completed",
    role:   "Research assistant",
    accent: "#E85E7A",
    bg:     "#251018",
    pageBg: "#140810",
    focus: (
      <>
        Assisted a population-genetics project on{" "}
        <em>Scaevola plumieri</em> (native inkberry) in Puerto Rico,
        examining genetic variation with microsatellite markers and
        comparing native populations against the invasive{" "}
        <em>Scaevola taccada</em>.
      </>
    ),
    finding: null,
    details: [
      "Extracted DNA and ran microsatellite analyses",
      "Helped compare native and invasive populations using gel electrophoresis",
      "Maintained organised documentation to support sample tracking and repeatable workflows",
    ],
    methods:
      "DNA extraction · microsatellite analysis · gel electrophoresis · lab documentation",
  },
];

/* ── Posters ────────────────────────────────────────────── */
const POSTERS = [
  {
    title:  "Cold-stress response in two moss species across microhabitats",
    venue:  "Whalen Symposium",
    year:   "2026",
    lab:    "Melcher Lab",
    accent: "#53C8B4",
  },
  {
    title:  "Freezing tolerance in different plant species",
    venue:  "Whalen Symposium",
    year:   "2026",
    lab:    "Melcher Lab",
    accent: "#53C8B4",
  },
];

/* ── Methods cloud ──────────────────────────────────────── */
const ALL_METHODS = [
  "microscopy",
  "gait analysis",
  "phototaxis assays",
  "chemotaxis assays",
  "aversive conditioning",
  "image tracking",
  "electrolyte leakage",
  "Fv/Fm chlorophyll fluorescence",
  "gene expression profiling",
  "plant electrical signalling",
  "R statistical analysis",
  "field data collection and sampling",
  "DNA extraction",
  "microsatellite analysis",
  "gel electrophoresis",
  "lab documentation",
  "Golden Gate Assembly",
];

/* ══════════════════════════════════════════════════════════
   RIGHT-COLUMN PHOTO GALLERY
   – no labels
   – real images size themselves from their own dimensions
   – placeholders are neutral dashed boxes
   ══════════════════════════════════════════════════════════ */
const xOffsets = [0, 8, -6, 4, -8, 6, -4, 10, -2];

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
              width:       "100%",
              borderRadius: 10,
              overflow:    "hidden",
              transform:   `rotate(${rotate}deg) translateX(${xShift}px)`,
              flexShrink:   0,
            }}
          >
            {photo.src ? (
              /* ── Real photo — sizes itself ─────────────
                 width: 100% fills the column
                 height: auto preserves aspect ratio       */
              <img
                src={photo.src}
                alt={photo.alt}
                style={{
                  display:   "block",
                  width:     "100%",
                  height:    "auto",
                  objectFit: "cover",
                }}
              />
            ) : (
              /* ── Placeholder slot ──────────────────────
                 Remove this block once src is set          */
              <div
                style={{
                  height:         160,
                  border:         "1px dashed rgba(246,241,234,0.15)",
                  borderRadius:    10,
                  background:     "rgba(246,241,234,0.03)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize:   "0.9rem",
                  color:      "rgba(246,241,234,0.18)",
                }}>
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
   STATUS BADGE
   ══════════════════════════════════════════════════════════ */
function StatusBadge({ label, accent }: { label: string; accent: string }) {
  return (
    <span style={{
      display:       "inline-flex",
      alignItems:    "center",
      gap:           "0.45rem",
      fontFamily:    "var(--font-inter), system-ui, sans-serif",
      fontSize:      "0.6rem",
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color:          accent,
    }}>
      <span style={{
        width:           7,
        height:          7,
        borderRadius:    "50%",
        backgroundColor: accent,
        display:         "inline-block",
      }} />
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   LAB SECTION  (active / completed)
   ══════════════════════════════════════════════════════════ */
function LabSection({
  lab,
  onVisible,
}: {
  lab:       ActiveLab;
  onVisible: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(lab.id); },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lab.id, onVisible]);

  const badgeLabel = lab.status === "active" ? "In Progress" : "Completed";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderLeft:   `4px solid ${lab.accent}`,
        borderRadius: "0 20px 20px 0",
        background:    lab.bg,
        padding:      "2.8rem 2.8rem 2.8rem 2.4rem",
        marginBottom: "1rem",
      }}
    >
      {/* Header */}
      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "flex-start",
        flexWrap:       "wrap",
        gap:            "1rem",
        marginBottom:   "1.8rem",
      }}>
        <div>
          <p style={{
            fontFamily:    "var(--font-inter), system-ui, sans-serif",
            fontSize:      "0.62rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color:          lab.accent,
            marginBottom:  "0.6rem",
          }}>
            {lab.period} · {lab.pi}
            {lab.role ? ` · ${lab.role}` : ""}
          </p>
          <h2 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(2.2rem, 3.5vw, 3.4rem)",
            fontWeight:    300,
            color:         "#F6F1EA",
            letterSpacing: "-0.01em",
            lineHeight:    1,
          }}>
            {lab.lab}
          </h2>
        </div>
        <StatusBadge label={badgeLabel} accent={lab.accent} />
      </div>

      {/* Focus */}
      <p style={{
        fontFamily:   "var(--font-cormorant), Georgia, serif",
        fontSize:     "clamp(1.25rem, 2vw, 1.6rem)",
        lineHeight:   1.7,
        color:        "rgba(246,241,234,0.95)",
        marginBottom: "1.6rem",
      }}>
        {lab.focus}
      </p>

      {/* Finding callout */}
      {lab.finding && (
        <div style={{
          borderLeft:   `2px solid ${lab.accent}`,
          paddingLeft:  "1rem",
          marginBottom: "2rem",
        }}>
          <p style={{
            fontFamily:    "var(--font-inter), system-ui, sans-serif",
            fontSize:      "0.58rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color:          lab.accent,
            marginBottom:  "0.45rem",
            opacity:        0.85,
          }}>
            Finding
          </p>
          <p style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize:   "clamp(1.1rem, 1.6vw, 1.3rem)",
            lineHeight: 1.6,
            color:      "rgba(246,241,234,0.92)",
            fontStyle:  "italic",
          }}>
            {lab.finding}
          </p>
        </div>
      )}

      {/* Bullet details */}
      {lab.details.length > 0 && (
        <ul style={{
          listStyle:     "none",
          padding:        0,
          margin:        "0 0 2.2rem 0",
          display:       "flex",
          flexDirection: "column",
          gap:           "1rem",
        }}>
          {lab.details.map((d) => (
            <li key={d} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{
                color:      lab.accent,
                flexShrink: 0,
                marginTop:  "0.4rem",
                fontSize:   "0.5rem",
              }}>◆</span>
              <span style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize:   "0.92rem",
                lineHeight: 1.8,
                color:      "rgba(246,241,234,0.9)",
              }}>
                {d}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Methods */}
      {lab.methods && (
        <div style={{
          borderTop:  `1px solid ${lab.accent}30`,
          paddingTop: "1.3rem",
          display:    "flex",
          gap:        "0.8rem",
          flexWrap:   "wrap",
          alignItems: "baseline",
        }}>
          <span style={{
            fontFamily:    "var(--font-inter), system-ui, sans-serif",
            fontSize:      "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color:          lab.accent,
            flexShrink:     0,
          }}>
            Methods
          </span>
          <span style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize:   "1.1rem",
            color:      "rgba(246,241,234,0.75)",
            fontStyle:  "italic",
          }}>
            {lab.methods}
          </span>
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   UPCOMING CARD
   ══════════════════════════════════════════════════════════ */
function NextCard({
  lab,
  onVisible,
}: {
  lab:       UpcomingLab;
  onVisible: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(lab.id); },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lab.id, onVisible]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderLeft:   `2px dashed ${lab.accent}`,
        background:    lab.bg,
        borderRadius: "0 16px 16px 0",
        padding:      "2rem 2rem 2rem 1.8rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "flex-start",
        flexWrap:       "wrap",
        gap:            "1rem",
        marginBottom:   "1rem",
      }}>
        <div>
          <p style={{
            fontFamily:    "var(--font-inter), system-ui, sans-serif",
            fontSize:      "0.58rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color:          lab.accent,
            marginBottom:  "0.5rem",
          }}>
            {lab.period} · {lab.pi}
          </p>
          <h3 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(1.6rem, 2.5vw, 2.2rem)",
            fontWeight:    300,
            color:         "#F6F1EA",
            letterSpacing: "-0.01em",
            lineHeight:    1,
          }}>
            {lab.lab}
          </h3>
        </div>
        <StatusBadge label="Upcoming" accent={lab.accent} />
      </div>
      <p style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize:   "clamp(1.05rem, 1.5vw, 1.25rem)",
        lineHeight: 1.65,
        color:      "rgba(246,241,234,0.8)",
        fontStyle:  "italic",
        maxWidth:   "58ch",
      }}>
        {lab.intention}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */
export default function ResearchPage() {
  const [activeId, setActiveId] = useState<string>(GONDEK.id);

  const handleVisible = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const active: AnyLab =
    activeId === GONDEK.id
      ? GONDEK
      : (LABS.find((l) => l.id === activeId) ?? GONDEK);

  return (
    <motion.main
      animate={{ backgroundColor: active.pageBg }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ color: "#F6F1EA", minHeight: "100vh", padding: "7rem 2rem 6rem" }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* ──────────────── HEADER ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "4rem" }}
        >
          <p style={{
            fontFamily:    "var(--font-inter), system-ui, sans-serif",
            fontSize:      "0.58rem",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color:         "#C4475B",
            marginBottom:  "0.9rem",
          }}>
            Research
          </p>
          <h1 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(2.4rem, 5vw, 4.2rem)",
            fontWeight:    300,
            color:         "#F6F1EA",
            letterSpacing: "-0.025em",
            lineHeight:    1,
            marginBottom:  "1.5rem",
          }}>
            Lab work.
          </h1>
          <p style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize:   "clamp(1.1rem, 1.7vw, 1.35rem)",
            lineHeight: 1.7,
            color:      "rgba(246,241,234,0.78)",
            maxWidth:   "56ch",
          }}>
            From moss freezing tolerance to tardigrade locomotion — each lab
            has taught me a different way of asking questions. Two completed
            projects, one active summer, one beginning this fall.
          </p>
        </motion.div>

        {/* ──────────────── 75 / 25 SPLIT ──────────────── */}
        <div
          className="research-split"
          style={{
            display:             "grid",
            gridTemplateColumns: "3fr 1fr",
            gap:                 "2.5rem",
            alignItems:          "flex-start",
          }}
        >
          {/* ── LEFT 75% — lab cards ─────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Upcoming */}
            <div style={{ marginBottom: "0.5rem" }}>
              <p style={{
                fontFamily:    "var(--font-inter), system-ui, sans-serif",
                fontSize:      "0.56rem",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color:         "#C4475B",
                marginBottom:  "1.2rem",
              }}>
                What&apos;s next
              </p>
              <NextCard lab={GONDEK} onVisible={handleVisible} />
            </div>

            {/* Active & completed */}
            {LABS.map((lab) => (
              <LabSection key={lab.id} lab={lab} onVisible={handleVisible} />
            ))}

            {/* Poster presentations */}
            <div style={{ marginTop: "3rem" }}>
              <p style={{
                fontFamily:    "var(--font-inter), system-ui, sans-serif",
                fontSize:      "0.56rem",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color:         "#C4475B",
                marginBottom:  "1.2rem",
              }}>
                Poster presentations
              </p>
              <div
                className="posters-grid"
                style={{
                  display:             "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap:                 "1rem",
                }}
              >
                {POSTERS.map((p, i) => (
                  <motion.div
                    key={`${p.title}-${i}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                    style={{
                      borderLeft:   `3px solid ${p.accent}`,
                      borderRadius: "0 14px 14px 0",
                      background:   "rgba(15,46,40,0.55)",
                      padding:      "1.4rem 1.4rem 1.4rem 1.2rem",
                    }}
                  >
                    <p style={{
                      fontFamily:    "var(--font-inter), system-ui, sans-serif",
                      fontSize:      "0.55rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color:          p.accent,
                      marginBottom:  "0.55rem",
                    }}>
                      {p.venue} · {p.year}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize:   "1.15rem",
                      lineHeight: 1.5,
                      color:      "rgba(246,241,234,0.92)",
                      fontWeight: 300,
                    }}>
                      {p.title}
                    </p>
                    <p style={{
                      marginTop:     "0.7rem",
                      fontFamily:    "var(--font-inter), system-ui, sans-serif",
                      fontSize:      "0.62rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color:         "rgba(246,241,234,0.5)",
                    }}>
                      {p.lab}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Methods */}
            <div style={{ marginTop: "3rem" }}>
              <p style={{
                fontFamily:    "var(--font-inter), system-ui, sans-serif",
                fontSize:      "0.56rem",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color:         "#C4475B",
                marginBottom:  "1.2rem",
              }}>
                Methods across labs
              </p>
              <p style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize:   "clamp(1.05rem, 1.5vw, 1.25rem)",
                lineHeight: 1.75,
                color:      "rgba(246,241,234,0.7)",
                fontStyle:  "italic",
                maxWidth:   "70ch",
              }}>
                {ALL_METHODS.map((m, i) => (
                  <span key={m}>
                    {m}
                    {i < ALL_METHODS.length - 1 && (
                      <span aria-hidden="true" style={{ color: "rgba(246,241,234,0.3)", margin: "0 0.5em" }}>
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* ── RIGHT 25% — photo gallery, scrolls with page ── */}
          {/*
              To add a photo:   go to const PHOTOS at the top, add { src: "/images/labs/…", alt: "…" }
              To remove a photo: delete its object from PHOTOS
              To reorder:       move the object up / down in PHOTOS
          */}
          <div style={{ paddingTop: "0.5rem" }}>
            <PhotoGallery />
          </div>
        </div>

        {/* ──────────────── FOOTER ──────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            marginTop:  "5rem",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize:   "1rem",
            fontStyle:  "italic",
            color:      "rgba(246,241,234,0.28)",
          }}
        >
        </motion.p>

        <p style={{
          marginTop:     "1.4rem",
          fontFamily:    "var(--font-inter), system-ui, sans-serif",
          fontSize:      "0.58rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color:         "rgba(246, 241, 234, 0.89)",
        }}>
          Last updated · August 2026
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .research-split {
            grid-template-columns: 1fr !important;
          }
          .posters-grid {
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
    </motion.main>
  );
}
