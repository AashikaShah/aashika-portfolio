"use client";

import { motion } from "framer-motion";
import NeuronAnimation from "./components/NeuronAnimation";

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden
                 flex items-center justify-center"
      style={{ backgroundColor: "#0C0A0B" }}
    >

      {/* ── NEURON BACKGROUND ─────────────────────── */}
      <NeuronAnimation />

      {/* ── CENTERED QUOTE ────────────────────────── */}
      <div className="relative z-10 flex flex-col
                      items-center justify-center
                      px-8 text-center">

        {/* Your name — small, above quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "#C4475B",
            marginBottom: "2.5rem",
          }}
        >
          Aashika Shah
        </motion.p>

        {/* THE QUOTE */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.8,
          }}
          style={{ margin: 0, padding: 0 }}
        >
          <p style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#F9F6F2",
            lineHeight: 1.4,
            maxWidth: "700px",
            letterSpacing: "-0.01em",
          }}>
            "Give a little of yours
            <br />to others to be human."
          </p>
        </motion.blockquote>

        {/* Crimson line — draws from center */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            delay: 1.6,
          }}
          style={{
            width: 40, height: 1,
            backgroundColor: "#9B1B30",
            marginTop: "2.5rem",
            transformOrigin: "center",
          }}
        />

        

      </div>
    </main>
  );
}