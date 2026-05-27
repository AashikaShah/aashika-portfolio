"use client";

import { motion } from "framer-motion";
import React from "react";

const coursework = [
  "Neurobiology",
  "Cell Biology",
  "Genetics",
  "Ecology",
  "Behavioral Neuroscience",
  "Abnormal Psychology",
  "Microbiology",
  "Computational Biology",
];

const skills = [
  "Python",
  "JavaScript",
  "Scientific writing",
  "Data analysis",
  "Lab techniques",
  "Science communication",
];

const questions = [
  "How do biological signals become lived experience?",
  "How does pain change depending on context?",
  "How do gut-brain pathways shape behavior and perception?",
  "How can scientific ideas become accessible without losing their depth?",
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        border:        "1px solid rgba(42,34,24,0.18)",
        borderRadius:  999,
        padding:       "0.45rem 0.85rem",
        color:         "rgba(42,34,24,0.72)",
        fontFamily:    "var(--font-inter), system-ui, sans-serif",
        fontSize:      "0.66rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        background:    "rgba(42,34,24,0.06)",
      }}
    >
      {children}
    </span>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow:  string;
  title:    string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderTop:  "1px solid rgba(42,34,24,0.12)",
        paddingTop: "2.4rem",
        marginTop:  "3.2rem",
      }}
    >
      <p style={{
        fontFamily:    "var(--font-inter), system-ui, sans-serif",
        fontSize:      "0.56rem",
        letterSpacing: "0.42em",
        textTransform: "uppercase" as const,
        color:         "#B85C45",
        marginBottom:  "0.85rem",
      }}>
        {eyebrow}
      </p>
      <h2 style={{
        fontFamily:    "var(--font-cormorant), Georgia, serif",
        fontSize:      "clamp(1.9rem, 3vw, 3rem)",
        fontWeight:    300,
        color:         "#2A2218",
        letterSpacing: "-0.015em",
        lineHeight:    1.05,
        marginBottom:  "1.5rem",
      }}>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export default function AcademicPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "#EDE8DF",   // warm ivory
        color:           "#2A2218",   // dark warm brown
        padding:         "7rem 2rem 6rem",
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility"
      }}
    >
      <div className="max-w-[1060px] mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "3.5rem" }}
        >
          <p style={{
            fontFamily:    "var(--font-inter), system-ui, sans-serif",
            fontSize:      "0.55rem",
            letterSpacing: "0.55em",
            textTransform: "uppercase" as const,
            color:         "#B85C45",   // terracotta accent
            marginBottom:  "0.9rem",
          }}>
            Academic
          </p>
          <h1 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(3.2rem, 8vw, 7rem)",
            fontWeight:    300,
            color:         "#2A2218",
            letterSpacing: "-0.035em",
            lineHeight:    0.92,
            maxWidth:      "12ch",
            WebkitFontSmoothing:     "antialiased",     
            fontOpticalSizing:       "auto" as const,

          }}>
            Learning to ask better questions.
          </h1>
        </motion.div>

        {/* INTRO + EDUCATION GRID */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="intro-grid"
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "1rem",
          }}
        >
          {/* Reflection card */}
          <div style={{
            background:    "#DDD7CC",   // soft stone
            border:        "1px solid rgba(42,34,24,0.12)",
            borderRadius:  22,
            padding:       "2.2rem",
            minHeight:     260,
            display:       "flex",
            flexDirection: "column" as const,
            justifyContent:"center",
          }}>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize:   "clamp(1.4rem, 2.2vw, 2rem)",
              lineHeight: 1.6,
              color:      "rgba(42,34,24,0.85)",
              maxWidth:   "30ch",
            }}>
              I am fourth year student where my academic life sits between biology, neuroscience,
              and psychology. I am drawn to places where a small signal
              becomes something larger — behaviour, perception, pain,
              memory, learning.
            </p>
          </div>

          {/* Education card */}
          <div style={{
            background:     "#DDD7CC",   // soft stone
            border:         "1px solid rgba(42,34,24,0.12)",
            borderRadius:   22,
            padding:        "2.2rem",
            minHeight:      260,
            display:        "flex",
            flexDirection:  "column" as const,
            justifyContent: "space-between",
          }}>
            <div>
              <p style={{
                fontFamily:    "var(--font-inter), system-ui, sans-serif",
                fontSize:      "0.56rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase" as const,
                color:         "#B85C45",
                marginBottom:  "1rem",
              }}>
                Education
              </p>
              <h2 style={{
                fontFamily:   "var(--font-cormorant), Georgia, serif",
                fontSize:     "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight:   300,
                lineHeight:   1,
                color:        "#2A2218",
                marginBottom: "1rem",
              }}>
                Ithaca College
              </h2>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.4rem" }}>
                {["B.S. Biology", "Minor in Neuroscience", "Minor in Psychology"].map((line) => (
                  <p key={line} style={{
                    fontFamily:    "var(--font-inter), system-ui, sans-serif",
                    fontSize:      "0.68rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color:         "rgba(42,34,24,0.6)",
                  }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* TriBeta badge */}
            <div style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "0.5rem",
              marginTop:    "1.2rem",
              border:       "1px solid rgba(184,92,69,0.35)",
              borderRadius: 999,
              padding:      "0.4rem 0.85rem",
              width:        "fit-content",
            }}>
              <div style={{
                width:           6,
                height:          6,
                borderRadius:    "50%",
                backgroundColor: "#B85C45",
              }} />
              <span style={{
                fontFamily:    "var(--font-inter), system-ui, sans-serif",
                fontSize:      "0.58rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color:         "#B85C45",
              }}>
                TriBeta Honor Society
              </span>
            </div>
          </div>
        </motion.div>

        {/* RESEARCH LINK */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderTop:  "1px solid rgba(42,34,24,0.12)",
            paddingTop: "2.4rem",
            marginTop:  "3.2rem",
          }}
        >
          <p style={{
            fontFamily:    "var(--font-inter), system-ui, sans-serif",
            fontSize:      "0.56rem",
            letterSpacing: "0.42em",
            textTransform: "uppercase" as const,
            color:         "#B85C45",   // fixed to accent color for consistency
            marginBottom:  "0.85rem",
          }}>
            Research
          </p>
          <h2 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(1.9rem, 3vw, 3rem)",
            fontWeight:    300,
            color:         "#2A2218",
            letterSpacing: "-0.015em",
            lineHeight:    1.05,
            marginBottom:  "1.4rem",
          }}>
            My lab work lives here.
          </h2>

          <a
            href="/work/research"
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            <div
              style={{
                background:     "#2A2218",   // dark warm brown (replaces cold navy)
                borderRadius:   18,
                padding:        "1.6rem 2rem",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "space-between",
                cursor:         "pointer",
                maxWidth:       560,
                transition:     "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.015)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              }}
            >
              <div>
                <p style={{
                  fontFamily:   "var(--font-cormorant), Georgia, serif",
                  fontSize:     "1.55rem",
                  fontWeight:   300,
                  color:        "#F5F0E8",
                  marginBottom: "0.3rem",
                }}>
                  View Research Work
                </p>
                <p style={{
                  fontFamily:    "var(--font-inter), system-ui, sans-serif",
                  fontSize:      "0.58rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color:         "rgba(245,240,232,0.5)",
                }}>
                </p>
              </div>
              <span style={{ fontSize: "1.2rem", color: "#F5F0E8", opacity: 0.7 }}>
                →
              </span>
            </div>
          </a>
        </motion.div>

        {/* COURSEWORK */}
        <Section eyebrow="Selected coursework" title="The classes shaping my foundation.">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {coursework.map((c) => <Pill key={c}>{c}</Pill>)}
          </div>
        </Section>

        {/* SKILLS */}
        <Section eyebrow="Tools & practices" title="How I work across lab, code, and communication.">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {skills.map((s) => <Pill key={s}>{s}</Pill>)}
          </div>
        </Section>

        {/* QUESTIONS */}
        <Section eyebrow="Questions I keep returning to" title="What pulls me forward.">
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {questions.map((q) => (
              <div key={q} style={{
                border:       "1px solid rgba(42,34,24,0.12)",
                borderRadius: 16,
                padding:      "1.1rem 1.3rem",
                background:   "#D4CCBE",   // slightly deeper than bg to distinguish
              }}>
                <p style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize:   "1.25rem",
                  lineHeight: 1.55,
                  color:      "rgba(42,34,24,0.82)",
                }}>
                  {q}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            marginTop:  "4.5rem",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize:   "1rem",
            fontStyle:  "italic",
            color:      "rgba(42,34,24,0.28)",
          }}
        >
          This page will grow as my questions do.
        </motion.p>

      </div>

      <style jsx>{`
        @media (max-width: 760px) {
          .intro-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}