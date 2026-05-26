"use client";

import { motion } from "framer-motion";
import React from "react";

/* ══════════════════════════════════════════════════════════
   SHARED STYLES
   ══════════════════════════════════════════════════════════ */

const label: React.CSSProperties = {
  fontFamily:    "var(--font-inter), system-ui, sans-serif",
  fontSize:      "0.55rem",
  letterSpacing: "0.5em",
  textTransform: "uppercase",
  color:         "#C4475B",
  marginBottom:  "1.2rem",
};

const bigQuote: React.CSSProperties = {
  fontFamily:    "var(--font-cormorant), Georgia, serif",
  fontSize:      "clamp(1.8rem, 3.5vw, 3.2rem)",
  fontWeight:    300,
  color:         "#F6F1EA",
  lineHeight:    1.35,
  letterSpacing: "-0.01em",
};

const bodyText: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), Georgia, serif",
  fontSize:   "clamp(1.2rem, 2vw, 1.55rem)",
  fontWeight: 300,
  color:      "rgba(246,241,234,0.75)",
  lineHeight: 1.75,
  maxWidth:   "55ch",
};

const divider: React.CSSProperties = {
  width:           "100%",
  height:          1,
  backgroundColor: "rgba(246,241,234,0.08)",
  margin:          "0",
};

/* ══════════════════════════════════════════════════════════
   PLACEHOLDER IMAGE BOX
   ══════════════════════════════════════════════════════════ */

function ImgBox({
  label: lbl,
  aspect = "4/3",
  maxW = 480,
}: {
  label:   string;
  aspect?: string;
  maxW?:   number;
}) {
  return (
    <div style={{
      width:          "100%",
      maxWidth:        maxW,
      aspectRatio:     aspect,
      background:     "rgba(246,241,234,0.04)",
      border:         "1px dashed rgba(246,241,234,0.15)",
      borderRadius:    18,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      flexShrink:      0,
    }}>
      <span style={{
        fontFamily:    "var(--font-inter), system-ui, sans-serif",
        fontSize:      "0.62rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color:         "rgba(246,241,234,0.25)",
      }}>
        {lbl}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   FADE-UP WRAPPER
   ══════════════════════════════════════════════════════════ */

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?:   number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */

export default function StoryPage() {
  return (
    <main style={{
      backgroundColor: "#070707",
      color:           "#F6F1EA",
      overflowX:       "hidden",
    }}>

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{
        minHeight:     "100vh",
        display:       "flex",
        flexDirection: "column",
        justifyContent:"center",
        padding:       "8rem 2rem 6rem",
        maxWidth:       1060,
        margin:        "0 auto",
      }}>
        <FadeUp>
          <p style={label}>Story</p>
          <h1 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(3rem, 9vw, 8rem)",
            fontWeight:    300,
            color:         "#F6F1EA",
            letterSpacing: "-0.04em",
            lineHeight:    0.9,
            maxWidth:      "10ch",
            marginBottom:  "2.5rem",
          }}>
            More than a website.
          </h1>
        </FadeUp>

        <FadeUp delay={0.18}>
          <p style={{ ...bodyText, maxWidth: "42ch" }}>
            Science is what I study. This is who I am — where I come from,
            what shaped me, and what keeps me moving forward.
          </p>
        </FadeUp>

        <FadeUp delay={0.32}>
          <div style={{
            width:           1,
            height:          80,
            backgroundColor: "rgba(246,241,234,0.2)",
            margin:          "3.5rem 0 0 2px",
          }} />
        </FadeUp>
      </section>

      <div style={divider} />

      {/* ── SECTION 1 — ORIGIN ────────────────────────── */}
      <section style={{
        padding:  "8rem 2rem",
        maxWidth:  1060,
        margin:   "0 auto",
      }}>
        <div
          className="story-row"
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "4rem",
            alignItems:          "center",
          }}
        >
          <FadeUp>
            <p style={label}>Origin · Surkhet, Nepal — 2022</p>
            <blockquote style={{
              ...bigQuote,
              borderLeft:  "2px solid #C4475B",
              paddingLeft: "1.5rem",
              margin:      "0 0 2rem 0",
            }}>
              "The distance from this mountain to that mountain is not only
              measured in kilometers and miles, but also in obligations and
              hunger."
            </blockquote>
            <p style={bodyText}>
              On a sunny September afternoon, hiking to my grandparents'
              village, I met Bhunti and Kaili — aged 16 and 12. When I asked
              what they loved most about school, Kaili said it was the free
              lito for lunch. That answer changed everything I thought I
              understood about access, education, and why science matters.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <ImgBox label="Nepal · hillside photo" aspect="3/4" maxW={400} />
          </FadeUp>
        </div>
      </section>

      <div style={divider} />

      {/* ── SECTION 2 — WHY SCIENCE ───────────────────── */}
      <section style={{
        padding:  "8rem 2rem",
        maxWidth:  1060,
        margin:   "0 auto",
      }}>
        <div
          className="story-row-reverse"
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "4rem",
            alignItems:          "center",
          }}
        >
          <FadeUp delay={0.1}>
            <ImgBox label="Grandfather photo" aspect="3/4" maxW={400} />
          </FadeUp>

          <FadeUp>
            <p style={label}>Why Science</p>
            <p style={{ ...bigQuote, marginBottom: "2rem" }}>
              My grandfather's brain surgery brought neuroscience home.
            </p>
            <p style={bodyText}>
              Watching his recovery alongside changes in nutrition and
              cognitive therapy made me want a research-grounded understanding
              of when these approaches help — and how we can test claims
              carefully. That's when the gut-brain axis stopped being a
              topic and became a question I needed to answer.
            </p>
            <p style={{
              ...bodyText,
              marginTop: "1.5rem",
              fontStyle: "italic",
              color:     "rgba(246,241,234,0.5)",
            }}>
              "I'm especially interested in how gut-derived signals influence
              cognition and plasticity in recovery."
            </p>
          </FadeUp>
        </div>
      </section>

      <div style={divider} />

      {/* ── SECTION 3 — HERE NOW ──────────────────────── */}
      <section style={{
        padding:  "8rem 2rem",
        maxWidth:  1060,
        margin:   "0 auto",
      }}>
        <div
          className="story-row"
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "4rem",
            alignItems:          "center",
          }}
        >
          <FadeUp>
            <p style={label}>Here, Now · Ithaca, New York</p>
            <p style={{ ...bigQuote, marginBottom: "2rem" }}>
              I haven't been able to visit home since arriving.
            </p>
            <p style={bodyText}>
              I cover my tuition through campus jobs — animal care, ed tech,
              fitness monitoring, mail services. Not because it's easy,
              but because I'm here and I intend to make it count.
              Every role has taught me something the lab couldn't.
            </p>
            <p style={{
              ...bodyText,
              marginTop: "1.5rem",
              fontStyle: "italic",
              color:     "rgba(246,241,234,0.5)",
            }}>
              "Science should be accessible to everyone, regardless of
              gender or background."
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <ImgBox label="Ithaca / campus photo" aspect="4/3" maxW={480} />
          </FadeUp>
        </div>
      </section>

      <div style={divider} />

      {/* ── SECTION 4 — MENTORS ───────────────────────── */}
      <section style={{
        padding:  "8rem 2rem",
        maxWidth:  1060,
        margin:   "0 auto",
      }}>
        <FadeUp>
          <p style={label}>People Who Shaped Me</p>
          <h2 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(2rem, 4vw, 3.5rem)",
            fontWeight:    300,
            color:         "#F6F1EA",
            letterSpacing: "-0.02em",
            lineHeight:    1.05,
            marginBottom:  "3rem",
            maxWidth:      "18ch",
          }}>
            None of this happened alone.
          </h2>
        </FadeUp>

        <div
          className="mentor-grid"
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap:                 "1.2rem",
          }}
        >
          {[
            {
              name: "Prof. Te-Wen Lo",
              role: "Faculty Mentor",
              note: "Opened the door to research and showed me what rigorous curiosity looks like.",
            },
            {
              name: "Elizabeth Reilly",
              role: "BOLD Mentor",
              note: "Helped me understand leadership as something you grow into, not perform.",
            },
            {
              name: "Mish Lenhart",
              role: "BOLD Mentor",
              note: "Reminded me that who you are outside the lab matters just as much.",
            },
          ].map((mentor, i) => (
            <FadeUp key={mentor.name} delay={i * 0.1}>
              <div style={{
                border:        "1px solid rgba(246,241,234,0.1)",
                borderRadius:   18,
                padding:       "1.8rem",
                background:    "rgba(246,241,234,0.025)",
                display:       "flex",
                flexDirection: "column",
                gap:           "1rem",
              }}>
                <ImgBox
                  label={`${mentor.name} photo`}
                  aspect="1/1"
                  maxW={280}
                />
                <div>
                  <p style={{
                    fontFamily:   "var(--font-cormorant), Georgia, serif",
                    fontSize:     "1.3rem",
                    fontWeight:   300,
                    color:        "#F6F1EA",
                    marginBottom: "0.25rem",
                  }}>
                    {mentor.name}
                  </p>
                  <p style={{
                    fontFamily:    "var(--font-inter), system-ui, sans-serif",
                    fontSize:      "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color:         "#C4475B",
                    marginBottom:  "0.75rem",
                  }}>
                    {mentor.role}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize:   "1.05rem",
                    lineHeight: 1.65,
                    color:      "rgba(246,241,234,0.6)",
                    fontStyle:  "italic",
                  }}>
                    {mentor.note}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <div style={divider} />

      {/* ── SECTION 5 — BEYOND THE LAB ────────────────── */}
      <section style={{
        padding:  "8rem 2rem 12rem",
        maxWidth:  1060,
        margin:   "0 auto",
      }}>
        <FadeUp>
          <p style={label}>Beyond the Lab</p>
          <h2 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(2rem, 4vw, 3.5rem)",
            fontWeight:    300,
            color:         "#F6F1EA",
            letterSpacing: "-0.02em",
            lineHeight:    1.05,
            marginBottom:  "3rem",
            maxWidth:      "20ch",
          }}>
            Science is what I do. This is who I am.
          </h2>
        </FadeUp>

        <div
          className="beyond-grid"
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "1.2rem",
          }}
        >
          {/* Books */}
          <FadeUp delay={0.05}>
            <div style={{
              border:       "1px solid rgba(246,241,234,0.1)",
              borderRadius:  18,
              padding:      "2rem",
              background:   "rgba(246,241,234,0.025)",
            }}>
              <p style={{ ...label, marginBottom: "1.2rem" }}>
                Currently Reading
              </p>
              {[
                "Add favourite book 1",
                "Add favourite book 2",
                "Add favourite book 3",
              ].map((book) => (
                <p key={book} style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize:   "1.2rem",
                  color:      "rgba(246,241,234,0.65)",
                  lineHeight: 2,
                  fontStyle:  "italic",
                }}>
                  {book}
                </p>
              ))}
            </div>
          </FadeUp>

          {/* Travel */}
          <FadeUp delay={0.1}>
            <div style={{
              border:       "1px solid rgba(246,241,234,0.1)",
              borderRadius:  18,
              padding:      "2rem",
              background:   "rgba(246,241,234,0.025)",
            }}>
              <p style={{ ...label, marginBottom: "1.2rem" }}>Travel</p>
              <ImgBox label="Travel photo" aspect="16/9" maxW={480} />
            </div>
          </FadeUp>

          {/* Socials — full width */}
          <FadeUp delay={0.15}>
            <div style={{
              border:        "1px solid rgba(246,241,234,0.1)",
              borderRadius:   18,
              padding:       "2rem",
              background:    "rgba(246,241,234,0.025)",
              gridColumn:    "1 / -1",
              display:       "flex",
              gap:           "1.5rem",
              flexWrap:      "wrap",
              alignItems:    "center",
            }}>
              <p style={{ ...label, margin: 0, flexShrink: 0 }}>Find Me</p>
              {[
                { name: "Instagram",  href: "https://instagram.com" },
                { name: "Letterboxd", href: "https://letterboxd.com" },
                { name: "LinkedIn",   href: "https://linkedin.com/in/aashikajdshah" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily:     "var(--font-inter), system-ui, sans-serif",
                    fontSize:       "0.65rem",
                    letterSpacing:  "0.22em",
                    textTransform:  "uppercase",
                    color:          "#F6F1EA",
                    textDecoration: "none",
                    border:         "1px solid rgba(246,241,234,0.2)",
                    borderRadius:    999,
                    padding:        "0.5rem 1rem",
                    transition:     "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C4475B";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(246,241,234,0.2)";
                  }}
                >
                  {s.name} →
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 760px) {
          .story-row,
          .story-row-reverse,
          .mentor-grid,
          .beyond-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}