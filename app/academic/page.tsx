"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

/* ---------------------------------- DATA ---------------------------------- */

const coursework = [
  "Neurobiology",
  "Developmental Biology",
  "Genetics",
  "Cognition",
  "Behavioral Neuroscience",
  "Neurotransmitters, Drugs & Behavior",
  "Microbiology",
  "Computational Biology",
];

const questions = [
  "How do biological signals become lived experience?",
  "How does pain change depending on context?",
  "How do gut-brain pathways shape behavior and perception?",
  "How can scientific ideas stay accurate as they become accessible?",
];

/* -------------------------------- COMPONENTS ------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.56rem",
        letterSpacing: "0.42em",
        textTransform: "uppercase",
        color: "#B85C45",
        marginBottom: "1.4rem",
      }}
    >
      {children}
    </p>
  );
}

function SectionDivider() {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(42,34,24,0.12)",
        marginTop: "4rem",
        paddingTop: "2.6rem",
      }}
    />
  );
}

/* A single question that fades + lifts in as it enters the viewport,
   with a small terracotta dot in the margin acting as a depth marker. */
function DepthQuestion({
  question,
  index,
}: {
  question: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.05,
      }}
      style={{
        position: "relative",
        paddingLeft: "2.5rem",
        paddingTop: "1.2rem",
        paddingBottom: "1.2rem",
      }}
    >
      {/* depth marker — single dot in left margin */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: "2.1rem",
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#B85C45",
          opacity: 0.55,
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
          lineHeight: 1.5,
          fontWeight: 300,
          color: "rgba(42,34,24,0.88)",
          letterSpacing: "-0.005em",
        }}
      >
        {question}
      </p>
    </motion.div>
  );
}

/* ---------------------------------- PAGE ---------------------------------- */

export default function AcademicPage() {
  const questionsRef = useRef<HTMLDivElement>(null);

  // A very subtle scroll-driven progress line that grows down the questions
  // section's left margin — like a quiet depth gauge. Pure decoration, no
  // text, no numbers.
  const { scrollYProgress } = useScroll({
    target: questionsRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "#EDE8DF",
        color: "#2A2218",
        padding: "7rem 2rem 6rem",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      }}
    >
      <div className="max-w-[1060px] mx-auto">

        {/* ------------------------------ HEADER ------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "3.5rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              color: "#B85C45",
              marginBottom: "0.9rem",
            }}
          >
            Academic
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 300,
              color: "#2A2218",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              maxWidth: "20ch",
              fontOpticalSizing: "auto",
            }}
          >
            On the academic side.
          </h1>
        </motion.div>

        {/* ------------------------ INTRO + EDUCATION GRID -------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="intro-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {/* Reflection card */}
          <div
            style={{
              background: "#DDD7CC",
              border: "1px solid rgba(42,34,24,0.12)",
              borderRadius: 22,
              padding: "2.2rem",
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                lineHeight: 1.6,
                color: "rgba(42,34,24,0.85)",
                maxWidth: "30ch",
              }}
            >
              I&apos;m a fourth-year student studying biology, neuroscience,
              and psychology. I&apos;m curious about how small signals shape
              behavior, perception, pain, memory, and learning.
            </p>
          </div>

          {/* Education card */}
          <div
            style={{
              background: "#DDD7CC",
              border: "1px solid rgba(42,34,24,0.12)",
              borderRadius: 22,
              padding: "2.2rem",
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.56rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#B85C45",
                  marginBottom: "1rem",
                }}
              >
                Education
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "#2A2218",
                  marginBottom: "1rem",
                }}
              >
                Ithaca College
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                {[
                  "B.S. Biology",
                  "Minor in Neuroscience",
                  "Minor in Psychology",
                  "Class of 2026",
                ].map((line) => (
                  <p
                    key={line}
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.68rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(42,34,24,0.6)",
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* TriBeta badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1.2rem",
                border: "1px solid rgba(184,92,69,0.35)",
                borderRadius: 999,
                padding: "0.4rem 0.85rem",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#B85C45",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#B85C45",
                }}
              >
                TriBeta Honor Society
              </span>
            </div>
          </div>
        </motion.div>

        {/* ---------------------------- RESEARCH CTA -------------------------- */}
      
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderTop: "1px solid rgba(42,34,24,0.12)",
            paddingTop: "2.4rem",
            marginTop: "3.2rem",
          }}
        >
          <Eyebrow>Research</Eyebrow>

          <a
            href="/work/research"
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            <div
              style={{
                background: "#2A2218",
                borderRadius: 18,
                padding: "1.6rem 2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                maxWidth: 560,
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "scale(1.015)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "scale(1)";
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.55rem",
                    fontWeight: 300,
                    color: "#F5F0E8",
                    marginBottom: "0.3rem",
                  }}
                >
                  View Research Work
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.5)",
                  }}
                >
                  Projects, methods, and ongoing work
                </p>
              </div>
              <span
                style={{
                  fontSize: "1.2rem",
                  color: "#F5F0E8",
                  opacity: 0.7,
                }}
              >
                →
              </span>
            </div>
          </a>
        </motion.div>

        {/* ---------------------------- COURSEWORK ---------------------------- */}
        <SectionDivider />
        <Eyebrow>Selected coursework</Eyebrow>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.1rem, 1.6vw, 1.45rem)",
            lineHeight: 1.7,
            color: "rgba(42,34,24,0.82)",
            fontWeight: 300,
          }}
        >
          {coursework.map((c, i) => (
            <span key={c}>
              {c}
              {i < coursework.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    color: "rgba(42,34,24,0.35)",
                    margin: "0 0.55em",
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </p>

        {/* Liberal arts line — small visual break, italic, framed as deliberate breadth */}
        <p
          style={{
            marginTop: "1.6rem",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.98rem",
            lineHeight: 1.6,
            color: "rgba(42,34,24,0.55)",
            maxWidth: "52ch",
          }}
        >
          Also: philosophy, sociology, social psychology, psycholgy of women, etc. 
        </p>

        {/* ----------------------------- QUESTIONS ---------------------------- */}
        <SectionDivider />
        <Eyebrow>Questions I keep returning to</Eyebrow>

        <div
          ref={questionsRef}
          style={{
            position: "relative",
            paddingLeft: "0.5rem",
          }}
        >
          {/* Scroll-driven depth gauge — quiet vertical line in the margin */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "0.5rem",
              bottom: "0.5rem",
              width: 1,
              backgroundColor: "rgba(42,34,24,0.08)",
            }}
          />
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "0.5rem",
              width: 1,
              height: lineHeight,
              backgroundColor: "#B85C45",
              opacity: 0.45,
              transformOrigin: "top",
            }}
          />

          {questions.map((q, i) => (
            <DepthQuestion key={q} question={q} index={i} />
          ))}
        </div>

        {/* ------------------------------ FOOTER ------------------------------ */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            marginTop: "5rem",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1rem",
            fontStyle: "italic",
            color: "rgba(42,34,24,0.32)",
          }}
        >
          This page will grow as my questions do.
        </motion.p>

        <p
          style={{
            marginTop: "1.4rem",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(42,34,24,0.32)",
          }}
        >
          Last updated · May 2026
        </p>
      </div>

      {/* Responsive + accessibility refinements */}
      <style jsx>{`
        @media (max-width: 760px) {
          .intro-grid {
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
    </main>
  );
}
