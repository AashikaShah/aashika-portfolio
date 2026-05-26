"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════ */

const LABS = [
  {
    id:     "melcher",
    lab:    "Melcher Lab",
    pi:     "Prof. Peter Melcher",
    period: "Aug 2025 – Present",
    status: "completed",
    accent: "#53C8B4",
    bg:     "#0F2E28",
    pageBg: "#0A1A18",
    focus: (
      <>
        How do mosses survive freezing? I studied the physiological and
        molecular responses of{" "}
        <em>Dicranum scoparium</em> and{" "}
        <em>Leucobryum glaucum</em> to freezing stress across two
        contrasting microhabitats on South Hill — comparing cold-stress
        response by location and light exposure.
      </>
    ),
    details: [
      "Designed and executed controlled freezing experiments with slow, rapid, and non-freeze treatments",
      "Quantified membrane injury using electrolyte leakage assays and photosynthetic performance using chlorophyll fluorescence (Fv/Fm)",
      "Installed temperature dataloggers in the field to capture nighttime cooling patterns",
      "Analysed habitat-by-treatment effects in R and presented findings to the Biology Department",
      "Measured gene expression responses and plant electrical signalling in response to temperature changes",
    ],
    methods: "electrolyte leakage · Fv/Fm chlorophyll fluorescence · gene expression profiling · plant electrical signalling · R statistical analysis · field data collection",
    photos: [
      { label: "South Hill field site", h: 180, rotate: -1.5 },
      { label: "Lab bench",             h: 140, rotate:  1.5 },
      { label: "Poster presentation",   h: 160, rotate: -1   },
    ],
  },
  {
    id:     "swensen",
    lab:    "Swensen Lab",
    pi:     "Swensen Lab, Ithaca College",
    period: "Jan 2024 – May 2024",
    status: "completed",
    accent: "#E85E7A",
    bg:     "#251018",
    pageBg: "#140810",
    focus: (
      <>
        Population genetics of{" "}
        <em>Scaevola plumieri</em>{" "}
        (inkberry) in Puerto Rico — examining genetic variation using
        microsatellite markers and characterising native population
        structure relative to the invasive{" "}
        <em>Scaevola taccada</em>.
      </>
    ),
    details: [
      "Supported a genetics research project on inkberry in Puerto Rico",
      "Examined genetic variation using microsatellite markers",
      "Assisted in characterising native population structure vs. invasive species impact",
      "Maintained organised documentation to support repeatable workflows and sample tracking",
    ],
    methods: "DNA extraction · microsatellite analysis · population structure analysis · gel electrophoresis · lab documentation",
    photos: [
      { label: "Puerto Rico field", h: 200, rotate:  1.5 },
      { label: "Lab work",          h: 150, rotate: -1.5 },
      { label: "Samples",           h: 160, rotate:  1   },
    ],
  },
  {
    id:     "gondek",
    lab:    "Gondek Lab",
    pi:     "Prof. Dave Gondek",
    period: "Fall 2026",
    status: "upcoming",
    accent: "#F2C95E",
    bg:     "#1E1A08",
    pageBg: "#121006",
    focus: (
      <>
        Coming Fall 2026. Details will be added as the project begins.
      </>
    ),
    details: [],
    methods: "",
    photos: [
      { label: "Coming Fall 2026", h: 180, rotate: -1 },
      { label: "Gondek Lab",       h: 160, rotate:  1 },
      { label: "Placeholder",      h: 140, rotate: -1 },
    ],
  },
  {
    id:     "woods",
    lab:    "Woods Lab",
    pi:     "Woods Lab",
    period: "Summer 2026",
    status: "upcoming",
    accent: "#C49A73",
    bg:     "#181208",
    pageBg: "#0F0C07",
    focus: (
      <>
        Coming Summer 2026. Details will be added as the project begins.
      </>
    ),
    details: [],
    methods: "",
    photos: [
      { label: "Coming Summer 2026", h: 180, rotate:  1   },
      { label: "Woods Lab",          h: 160, rotate: -1.5 },
      { label: "Placeholder",        h: 140, rotate:  1   },
    ],
  },
];

/* ══════════════════════════════════════════════════════════
   PHOTO COLLAGE — 25% sticky right panel
   Stacked vertically with slight offsets + rotations
   ══════════════════════════════════════════════════════════ */

const offsets = [0, 10, -8];

function PhotoCollage({ lab }: { lab: typeof LABS[0] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lab.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{    opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {lab.photos.map((photo, i) => (
          <motion.div
            key={photo.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            style={{
              width:          "100%",
              height:          photo.h,
              borderRadius:    12,
              border:         `1px dashed ${lab.accent}55`,
              background:     `${lab.accent}0A`,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              gap:            "0.4rem",
              transform:      `rotate(${photo.rotate}deg) translateX(${offsets[i] ?? 0}px)`,
              flexShrink:      0,
            }}
          >
            <span style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize:   "1rem",
              color:       lab.accent,
              opacity:     0.5,
            }}>
              +
            </span>
            <span style={{
              fontFamily:    "var(--font-inter), system-ui, sans-serif",
              fontSize:      "0.52rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:          lab.accent,
              opacity:        0.7,
              textAlign:     "center",
              padding:       "0 0.5rem",
              lineHeight:     1.4,
            }}>
              {photo.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════
   STATUS BADGE
   ══════════════════════════════════════════════════════════ */

function StatusBadge({ status, accent }: { status: string; accent: string }) {
  const labels: Record<string, string> = {
    completed: "Completed",
    upcoming:  "Upcoming",
  };
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
      {labels[status]}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   LAB SECTION — left 75%
   ══════════════════════════════════════════════════════════ */

type Lab = typeof LABS[0];

function LabSection({
  lab,
  onVisible,
}: {
  lab:       Lab;
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

  const isUpcoming = lab.status === "upcoming";

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
        <StatusBadge status={lab.status} accent={lab.accent} />
      </div>

      {/* Focus — high contrast */}
      <p style={{
        fontFamily:   "var(--font-cormorant), Georgia, serif",
        fontSize:     "clamp(1.25rem, 2vw, 1.6rem)",
        lineHeight:   1.7,
        color:        "rgba(246,241,234,0.95)",
        marginBottom: isUpcoming ? 0 : "2rem",
        fontStyle:    isUpcoming ? "italic" : "normal",
      }}>
        {lab.focus}
      </p>

      {/* Bullets — high contrast */}
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

      {/* Methods line */}
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
   PAGE
   ══════════════════════════════════════════════════════════ */

export default function ResearchPage() {
  const [activeLab, setActiveLab] = useState("melcher");

  const handleVisible = useCallback((id: string) => {
    setActiveLab(id);
  }, []);

  const active = LABS.find((l) => l.id === activeLab) ?? LABS[0];

  return (
    <motion.main
      animate={{ backgroundColor: active.pageBg }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ color: "#F6F1EA", minHeight: "100vh", padding: "7rem 2rem 6rem" }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
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
            fontSize:      "clamp(3rem, 7vw, 6rem)",
            fontWeight:    300,
            color:         "#F6F1EA",
            letterSpacing: "-0.035em",
            lineHeight:    0.92,
            maxWidth:      "16ch",
            marginBottom:  "1.5rem",
          }}>
            I study how living things sense the world.
          </h1>
          <p style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize:   "clamp(1.15rem, 1.8vw, 1.45rem)",
            lineHeight: 1.7,
            color:      "rgba(246,241,234,0.8)",
            maxWidth:   "52ch",
          }}>
            From electrical signals in plants to gut microbiome dynamics —
            I work across systems to understand how organisms respond to
            stress, change, and environment.
          </p>
        </motion.div>

        {/* 75 / 25 SPLIT */}
        <div
          className="research-split"
          style={{
            display:             "grid",
            gridTemplateColumns: "3fr 1fr",
            gap:                 "2.5rem",
            alignItems:          "flex-start",
          }}
        >
          {/* LEFT 75% */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {LABS.map((lab) => (
              <LabSection
                key={lab.id}
                lab={lab}
                onVisible={handleVisible}
              />
            ))}
          </div>

          {/* RIGHT 25% — sticky */}
          <div style={{ position: "sticky", top: "8rem" }}>
            <p style={{
              fontFamily:    "var(--font-inter), system-ui, sans-serif",
              fontSize:      "0.52rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color:          active.accent,
              opacity:        0.7,
              marginBottom:  "1rem",
            }}>
              {active.lab}
            </p>
            <PhotoCollage lab={active} />
          </div>
        </div>

        {/* Footer */}
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
            color:      "rgba(246,241,234,0.22)",
          }}
        >
          This page grows with my research.
          Woods Lab (Summer 2026) · Gondek Lab (Fall 2026) coming soon.
        </motion.p>

      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .research-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.main>
  );
}