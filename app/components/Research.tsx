"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── YOUR REAL RESEARCH DATA ───────────────────────────────
const projects = [
  {
    lab:         "Melcher Lab",
    role:        "Student Researcher",
    period:      "August 2025 – May 2026",
    status:      "Completed",
    description: "Evaluating action potentials in plants in response to temperature and their correlation with gene expression.",
    highlights: [
      "Analyzed impact of freezing on moss species (Dicranum scoparium)",
      "Conducted fieldwork at two sites in South Hill, Ithaca NY",
      "Presented findings to the Biology Department for a non-lab audience",
    ],
    tags: ["Electrophysiology", "Plant Biology", "Gene Expression", "Fieldwork"],
  },
  {
    lab:         "Swensen Lab",
    role:        "Student Researcher",
    period:      "Jan 2024 – May 2024",
    status:      "Completed",
    description: "Characterized genetic variation in the inkberry (Scaevola plumieri) in Puerto Rico using microsatellites to understand impact of invasive species.",
    highlights: [
      "Used microsatellite analysis to map genetic variation",
      "Investigated native vs. invasive species dynamics",
      "Contributed to conservation biology research in Puerto Rico",
    ],
    tags: ["Genetics", "Microsatellites", "PCR", "Conservation Biology"],
  },
];

// ── MAIN COMPONENT ────────────────────────────────────────
export default function Research() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    // Dark background = visual contrast from the light About section
    // This rhythm (light → dark → light) guides the eye naturally
    <section
      id="research"
      ref={ref}
      className="py-32 px-6 md:px-20"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* ── HEADER ────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="uppercase text-center mb-3"
        style={{
          color: "#9B1B30",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.65rem", letterSpacing: "0.45em",
        }}
      >
        Scientific Work
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="text-center mb-4"
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2.8rem, 6vw, 5rem)",
          fontWeight: 300, color: "#F9F6F2", letterSpacing: "-0.02em",
        }}
      >
        Research
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="mx-auto mb-20"
        style={{
          width: 60, height: 2,
          backgroundColor: "#9B1B30",
          transformOrigin: "center",
        }}
      />

      {/* ── RESEARCH CARDS ────────────────────────────── */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ResearchCard key={project.lab} project={project} index={i} isInView={isInView} />
        ))}
      </div>

      {/* ── BOTTOM NOTE ───────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="text-center mt-16"
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.2rem", fontStyle: "italic",
          color: "rgba(249,246,242,0.3)",
        }}
      >
        Aspiring to pursue doctoral research in neuroscience.
      </motion.p>
    </section>
  );
}

// ── INDIVIDUAL RESEARCH CARD ──────────────────────────────
function ResearchCard({
  project, index, isInView,
}: {
  project: typeof projects[0];
  index:   number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 + index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-8 rounded-2xl relative overflow-hidden"
      style={{
        border: "1px solid rgba(249,246,242,0.08)",
        backgroundColor: hovered
          ? "rgba(155,27,48,0.12)"
          : "rgba(249,246,242,0.03)",
        transition: "background-color 0.4s ease",
        cursor: "none",
      }}
    >
      {/* Status + Period row */}
      <div className="flex items-center justify-between mb-6">
        <span style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase",
          color:  project.status === "Active" ? "#9B1B30" : "#6B6B6B",
          border: `1px solid ${project.status === "Active" ? "#9B1B30" : "rgba(107,107,107,0.4)"}`,
          padding: "3px 10px", borderRadius: "999px",
        }}>
          {project.status}
        </span>
        <span style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.7rem", color: "#6B6B6B",
        }}>
          {project.period}
        </span>
      </div>

      {/* Role */}
      <p style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.62rem", letterSpacing: "0.2em",
        textTransform: "uppercase", color: "#9B1B30",
      }} className="mb-2">
        {project.role}
      </p>

      {/* Lab name */}
      <h3 style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: "2rem", fontWeight: 400, color: "#F9F6F2",
      }} className="mb-4">
        {project.lab}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.8rem", color: "rgba(249,246,242,0.55)", lineHeight: 1.75,
      }} className="mb-6">
        {project.description}
      </p>

      {/* Highlights */}
      <div className="flex flex-col gap-2 mb-6">
        {project.highlights.map((h) => (
          <div key={h} className="flex items-start gap-2">
            <div style={{
              width: 4, height: 4, borderRadius: "50%",
              backgroundColor: "#9B1B30", marginTop: 7, flexShrink: 0,
            }} />
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.75rem", color: "rgba(249,246,242,0.45)",
            }}>
              {h}
            </p>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.58rem", letterSpacing: "0.1em",
            color: "rgba(249,246,242,0.35)",
            border: "1px solid rgba(249,246,242,0.1)",
            padding: "2px 8px", borderRadius: "999px",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}