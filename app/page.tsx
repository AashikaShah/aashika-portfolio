"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import About    from "./components/About";
import Research from "./components/Research";

// ── TYPING ROLES ──────────────────────────────────────────
const roles = [
  "Biologist.",
  "Researcher.",
  "Leader.",
  "Future PhD.",
];

export default function Home() {

  // ── TYPING STATE ────────────────────────────────────────
  const [roleIndex,  setRoleIndex]  = useState(0);
  const [displayed,  setDisplayed]  = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // ── PARALLAX ────────────────────────────────────────────
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // ── TYPING LOGIC ────────────────────────────────────────
  useEffect(() => {
    const fullText = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < fullText.length) {
      timeout = setTimeout(() =>
        setDisplayed(fullText.slice(0, displayed.length + 1)), 100);
    } else if (!isDeleting && displayed.length === fullText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() =>
        setDisplayed(displayed.slice(0, -1)), 60);
    } else {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <main style={{ backgroundColor: "#F9F6F2" }}>

      {/* ╔══════════════════════════════════════════════════╗ */}
      {/* ║              HERO SECTION                        ║ */}
      {/* ╚══════════════════════════════════════════════════╝ */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex flex-col
                   items-center justify-center px-6 text-center
                   overflow-hidden"
        style={{ backgroundColor: "#F9F6F2" }}
      >

        {/* ── SUBTLE GRID TEXTURE (background layer) ──── */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.035,
              backgroundImage: `
                linear-gradient(#9B1B30 1px, transparent 1px),
                linear-gradient(90deg, #9B1B30 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </motion.div>

        {/* ── FLOATING PHOTOS PLACEHOLDER ─────────────── */}
        {/* We will replace this block once you add photos  */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          {/* Photo slots — will be filled with your real images */}
          {/* Top left */}
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [-3, -1, -3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-2xl overflow-hidden"
            style={{
              top: "12%", left: "6%",
              width: 160, height: 200,
              backgroundColor: "rgba(155,27,48,0.06)",
              border: "1px solid rgba(155,27,48,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.6rem", color: "rgba(155,27,48,0.4)",
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              Your photo
            </p>
          </motion.div>

          {/* Top right */}
          <motion.div
            animate={{ y: [0, 14, 0], rotate: [4, 2, 4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute rounded-2xl overflow-hidden"
            style={{
              top: "8%", right: "7%",
              width: 140, height: 180,
              backgroundColor: "rgba(155,27,48,0.06)",
              border: "1px solid rgba(155,27,48,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.6rem", color: "rgba(155,27,48,0.4)",
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              Your photo
            </p>
          </motion.div>

          {/* Bottom left */}
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [2, 5, 2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute rounded-2xl overflow-hidden"
            style={{
              bottom: "14%", left: "10%",
              width: 130, height: 160,
              backgroundColor: "rgba(155,27,48,0.06)",
              border: "1px solid rgba(155,27,48,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.6rem", color: "rgba(155,27,48,0.4)",
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              Your photo
            </p>
          </motion.div>

          {/* Bottom right */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [-5, -2, -5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute rounded-2xl overflow-hidden"
            style={{
              bottom: "10%", right: "8%",
              width: 150, height: 190,
              backgroundColor: "rgba(155,27,48,0.06)",
              border: "1px solid rgba(155,27,48,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.6rem", color: "rgba(155,27,48,0.4)",
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              Your photo
            </p>
          </motion.div>
        </div>

        {/* ── HERO CONTENT (foreground) ────────────────── */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center"
        >

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="uppercase mb-10"
            style={{
              color: "#6B6B6B",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.7rem", letterSpacing: "0.45em",
            }}
          >
            Ithaca College · Biology · Future PhD
          </motion.p>

          {/* NAME */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="font-light leading-none text-center"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "#1A1A1A",
              fontSize: "clamp(5rem, 13vw, 11rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Aashika Shah
          </motion.h1>

          {/* Crimson line draws itself */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="mb-8 mt-6"
            style={{ width: 80, height: 2, backgroundColor: "#9B1B30" }}
          />

          {/* Typing role */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="uppercase h-6"
            style={{
              color: "#9B1B30",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.75rem", letterSpacing: "0.4em",
            }}
          >
            {displayed}
            <span className="animate-pulse">|</span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
            className="font-light italic mt-10 max-w-xl leading-relaxed text-center"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "#6B6B6B",
              fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
            }}
          >
            Driven by curiosity. Grounded in science.
            <br />Built for impact.
          </motion.p>

          {/* ── MANIFESTO (substance — we fill this with your words) */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="max-w-lg text-center mt-6 leading-relaxed"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              color: "#6B6B6B",
              fontSize: "0.82rem",
              lineHeight: 1.9,
            }}
          >
            {/* ← YOUR PERSONAL STATEMENT GOES HERE */}
            {/* Tell me about yourself and I'll write this for you */}
            I am an undergraduate biologist, researcher, and leader
            at Ithaca College — driven by a deep curiosity about
            how living systems sense, adapt, and survive.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4 }}
            className="flex flex-wrap gap-6 mt-12 justify-center"
          >
            {/* Primary button */}
            <a
              href="#research"
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.7rem", letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#9B1B30",
                border: "1px solid #9B1B30",
                padding: "14px 32px",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.backgroundColor = "#9B1B30";
                (e.target as HTMLElement).style.color = "#F9F6F2";
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
                (e.target as HTMLElement).style.color = "#9B1B30";
              }}
            >
              View Research
            </a>

            {/* Secondary button */}
            <a
              href="#contact"
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.7rem", letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1A1A1A",
                textDecoration: "none",
                padding: "14px 8px",
                borderBottom: "1px solid rgba(26,26,26,0.3)",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.borderColor = "#9B1B30";
                (e.target as HTMLElement).style.color = "#9B1B30";
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.borderColor = "rgba(26,26,26,0.3)";
                (e.target as HTMLElement).style.color = "#1A1A1A";
              }}
            >
              Get in Touch
            </a>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <span
            className="uppercase"
            style={{
              color: "#6B6B6B",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.4em",
            }}
          >
            Explore
          </span>
          <motion.div
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-14 origin-top"
            style={{ backgroundColor: "#9B1B30" }}
          />
        </motion.div>

      </section>

      {/* ╔══════════════════════════════════════════════════╗ */}
      {/* ║           ABOUT SECTION                          ║ */}
      {/* ╚══════════════════════════════════════════════════╝ */}
      <About />

      {/* ╔══════════════════════════════════════════════════╗ */}
      {/* ║           RESEARCH SECTION                       ║ */}
      {/* ╚══════════════════════════════════════════════════╝ */}
      <Research />

      {/* ╔══════════════════════════════════════════════════╗ */}
      {/* ║     MORE SECTIONS COMING (Leadership, BOLD,      ║ */}
      {/* ║     CV, Contact)                                 ║ */}
      {/* ╚══════════════════════════════════════════════════╝ */}

    </main>
  );
}