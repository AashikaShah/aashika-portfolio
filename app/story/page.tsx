"use client";

import { motion } from "framer-motion";

export default function CampusPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF7F2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >

      {/* ── Ambient grain texture overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Soft radial glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(194,91,91,0.055) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
        }}
      >

        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#8B3333",
            fontWeight: 600,
            marginBottom: "2rem",
          }}
        >
          Aashika Shah
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3.5rem, 12vw, 9.5rem)",
            fontWeight: 300,
            color: "#111827",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            marginBottom: "2.5rem",
          }}
        >
          Work in
          <br />
          <span style={{ opacity: 0.18 }}>progress.</span>
        </motion.h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{
            width: 48,
            height: 1,
            backgroundColor: "#C25B5B",
            opacity: 0.4,
            borderRadius: 999,
            marginBottom: "2.5rem",
            transformOrigin: "center",
          }}
        />

        {/* Coming soon */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            fontStyle: "italic",
            color: "rgba(55,65,81,0.55)",
            letterSpacing: "0.01em",
            lineHeight: 1.7,
          }}
        >
          Coming soon.
        </motion.p>

      </div>

      {/* ── Corner accent — bottom right ── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.9 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "2.5rem",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.52rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(26,26,26,0.2)",
        }}
      >
        Aashika Shah
      </motion.div>

      {/* ── Corner accent — bottom left ── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.9 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "2.5rem",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.52rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(26,26,26,0.2)",
        }}
      >
        © 2026
      </motion.div>

    </main>
  );
}
