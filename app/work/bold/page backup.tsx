"use client";

import { motion } from "framer-motion";
import React from "react";

/* ── FADE UP ─────────────────────────────────────────────── */
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── BLOB ────────────────────────────────────────────────── */
function Blob({ top, left, right, bottom, size = 320 }: {
  top?: string; left?: string; right?: string; bottom?: string; size?: number;
}) {
  return (
    <div aria-hidden style={{
      position:     "absolute",
      top, left, right, bottom,
      width:         size,
      height:        size,
      borderRadius:  "62% 38% 55% 45% / 48% 60% 40% 52%",
      background:    "rgba(190,180,210,0.30)",
      pointerEvents: "none",
      zIndex:         0,
      filter:        "blur(2px)",
    }} />
  );
}

/* ── PHOTO PLACEHOLDER ───────────────────────────────────── */
function Photo({
  label,
  w = "100%",
  h = 200,
  rotate = 0,
  accent = "#C4B8D8",
  isPolaroid = false,
  src = "",
}: {
  label: string;
  w?: string | number;
  h?: number;
  rotate?: number;
  accent?: string;
  isPolaroid?: boolean;
  src?: string;
}) {
  if (isPolaroid) {
    return (
      <div
        style={{
          transform: `rotate(${rotate}deg)`,
          background: "#fff",
          padding: "10px 10px 40px 10px",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.15)",
          display: "inline-block",
        }}
      >
        <div
          style={{
            width: w,
            height: h,
            background: accent + "33",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {src ? (
            <img
              src={src}
              alt={label}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 12, color: "#aaa" }}>{label}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: w,
        height: h,
        background: accent + "22",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span style={{ fontSize: 12, color: "#aaa" }}>{label}</span>
      )}
    </div>
  );
}

/* ── FILM STRIP ──────────────────────────────────────────── */
function FilmStrip({ label }: { label: string }) {
  const holes = Array.from({ length: 7 });
  return (
    <div style={{ background: "#2A1F30", borderRadius: 6, overflow: "hidden", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "7px 4px" }}>
        {holes.map((_, i) => (
          <div key={i} style={{ width: 14, height: 10, background: "#4A3F55", borderRadius: 2 }} />
        ))}
      </div>
      <div style={{
        margin: "0 8px", height: 220,
        background: "rgba(255,255,255,0.06)",
        border: "1px dashed rgba(255,255,255,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          color: "rgba(255,255,255,0.32)", fontSize: "0.58rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          {label}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "7px 4px" }}>
        {holes.map((_, i) => (
          <div key={i} style={{ width: 14, height: 10, background: "#4A3F55", borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );
}

/* ── PAPERCLIP SVG ───────────────────────────────────────── */
function Paperclip() {
  return (
    <svg width="24" height="48" viewBox="0 0 24 48" fill="none"
      style={{ display: "block", margin: "0 auto -4px" }}>
      <path
        d="M12 4 C6 4 4 8 4 13 L4 35 C4 41 7 45 12 45 C17 45 20 41 20 35 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 34 C8 37 10 39 12 39 C14 39 16 37 16 34 L16 15"
        stroke="#AAA" strokeWidth="2.2" strokeLinecap="round" fill="none"
      />
    </svg>
  );
}

/* ── WORK CARD ───────────────────────────────────────────── */
function WorkCard({ title, subtitle, symbol, topColor, rotate = 0 }: {
  title: string; subtitle: string; symbol: string; topColor: string; rotate?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `rotate(${rotate}deg)` }}>
      <Paperclip />
      <div style={{
        background: "#fff", borderRadius: "0 0 10px 10px",
        borderTop: `5px solid ${topColor}`,
        padding: "1.5rem", boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
        width: "100%", minHeight: 220,
      }}>
        <div style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "0.75rem" }}>{symbol}</div>
        <h3 style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.3rem", fontWeight: 400, color: "#1A1A2A",
          textAlign: "center", marginBottom: "0.5rem", lineHeight: 1.25,
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.68rem", letterSpacing: "0.08em",
          color: topColor, textAlign: "center", lineHeight: 1.6,
        }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */

export default function BoldPage() {
  return (
    <main style={{ backgroundColor: "#F7F3FA", color: "#1A1A2A", overflowX: "hidden" }}>

      {/* ── 1. HERO ─────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "8rem 2rem 6rem", position: "relative",
        background: "linear-gradient(160deg, #EDE6F5 0%, #F7F3FA 100%)",
        overflow: "hidden",
      }}>
        <Blob top="-80px" left="-100px" size={380} />
        <Blob bottom="-60px" right="-80px" size={300} />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.58rem", letterSpacing: "0.5em",
            textTransform: "uppercase", color: "#A87EC8", marginBottom: "1rem",
          }}>
            BOLD Women's Leadership Network · Ithaca College
          </p>
          <h1 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 300,
            color: "#1A1A2A", letterSpacing: "-0.03em",
            lineHeight: 0.92, marginBottom: "2.5rem",
          }}>
            Aashika Shah<br />
            <span style={{ color: "#A87EC8" }}>BOLD Leadership Scholar</span>
          </h1>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <Photo label="boldhero.jpg" h={320} src="/images/bold/boldhero.JPG" />
          </div>
        </motion.div>
      </section>

      {/* ── 2. INTRO ────────────────────────────────────── */}
      <section style={{
        padding: "6rem 2rem", background: "#EDE8F5",
        position: "relative", overflow: "hidden",
      }}>
        <Blob top="-60px" right="-80px" size={260} />
        <FadeUp>
          <div style={{
            maxWidth: 720, margin: "0 auto", textAlign: "center",
            position: "relative", zIndex: 1,
          }}>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.2rem, 2vw, 1.65rem)", lineHeight: 1.8,
              color: "rgba(26,26,42,0.88)",
            }}>
              Being part of the Bold Women's Leadership Network has been a transformative experience
              in my academic and personal journey. With aspirations in biology, neuroscience, and
              nutrition, I sought out this program to grow as a leader, gain confidence in my voice,
              and surround myself with a community of women who inspire and challenge me. This
              portfolio captures the moments, lessons, and relationships that have guided my growth
              this semester.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── 3. VALUES ───────────────────────────────────── */}
      <section style={{
        padding: "6rem 2rem", background: "#F7F3FA",
        position: "relative", overflow: "hidden",
      }}>
        <Blob top="-40px" left="-60px" size={360} />
        <Blob bottom="-40px" right="-60px" size={280} />

        <div className="max-w-[1060px] mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <div className="values-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "2rem", alignItems: "start",
          }}>
            {/* LEFT — quote + mind map */}
            <FadeUp>
              <h2 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.8rem)", fontWeight: 400,
                color: "#1A1A2A", lineHeight: 1,
                margin: "-1 -1 2rem ",
              }}>
                Year 1 Reflection <br />
                "you don't need all the answers right now, just focus on
                doing your best where you are"
              </h2>
              
            </FadeUp>

            {/* RIGHT — film strip + selfie + honor your strength */}
            <FadeUp delay={0.12}>
              <FilmStrip label="BOLD cohort photo" />
              <div style={{ marginTop: "1.2rem" }}>
                <Photo label="Selfie · BOLD event" h={160} accent="#D4A8B8" rotate={1.5} />
              </div>
              <h2 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700,
                color: "#1A1A2A", letterSpacing: "-0.02em",
                lineHeight: 0.95, marginTop: "1.5rem",
              }}>
                honor your<br />strength
              </h2>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 4. PITCH WORKSHOP ───────────────────────────── */}
      <section style={{
        padding: "6rem 2rem", background: "#EDE8F5",
        position: "relative", overflow: "hidden",
      }}>
        <Blob bottom="-40px" right="-60px" size={300} />

        <div className="max-w-[1060px] mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <div className="pitch-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "3rem", alignItems: "center",
          }}>
            <FadeUp>
              <h2 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.8rem)", fontWeight: 400,
                color: "#1A1A2A", letterSpacing: "-0.02em", lineHeight: 1.15,
              }}>
                Pitch yourself<br />
                <em>AND</em><br />
                pitch yourself<br />
                with purpose
              </h2>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div style={{
                border: "3px solid #87CEEB", borderRadius: 14,
                padding: 10, background: "#fff",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Photo label="Workshop photo 1" h={280} accent="#A8C4D4" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Photo label="Workshop photo 2" h={135} accent="#A8C4D4" />
                    <Photo label="Workshop photo 3" h={135} accent="#A8C4D4" />
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 5. VALUES TREE ──────────────────────────────── */}
      <section style={{
        padding: "6rem 2rem", background: "#F7F3FA",
        position: "relative", overflow: "hidden",
      }}>
        <Blob top="-40px" left="-60px" size={260} />
        <Blob bottom="-40px" right="-60px" size={240} />

        <div className="max-w-[1060px] mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <div className="tree-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "2rem", alignItems: "start",
          }}>
            <FadeUp>
              <Photo label="Workshop classroom · values session" h={360} accent="#C4B8D8" />
            </FadeUp>
            <FadeUp delay={0.12}>
              <Photo label="Hand-drawn values tree" h={420} accent="#C4D4A8" />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 6. LEADERSHIP WORKS ─────────────────────────── */}
      <section style={{
        padding: "6rem 2rem", background: "#EDE8F5",
        position: "relative", overflow: "hidden",
      }}>
        <Blob top="-60px" left="-80px" size={300} />
        <Blob bottom="-60px" right="-80px" size={280} />

        <div className="max-w-[1060px] mx-auto" style={{ position: "relative", zIndex: 1 }}>

          {/* PERSISTENCE + title + CONFIDENCE */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem",
          }}>
            <div style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)", fontWeight: 900,
              color: "#5BC8C8", letterSpacing: "0.08em",
              textTransform: "uppercase", transform: "rotate(-5deg)",
              textShadow: "2px 2px 0 rgba(91,200,200,0.3)",
            }}>
              PERSISTENCE
            </div>

            <FadeUp>
              <h2 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300,
                color: "#1A1A2A", textAlign: "center",
              }}>
                Some Leadership Works
              </h2>
            </FadeUp>

            <div style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)", fontWeight: 900,
              color: "#5BC8C8", letterSpacing: "0.08em",
              textTransform: "uppercase", transform: "rotate(4deg)",
              textShadow: "2px 2px 0 rgba(91,200,200,0.3)",
            }}>
              CONFIDENCE
            </div>
          </div>

          {/* 3 paper-clip cards */}
          <FadeUp>
            <div className="works-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem", marginBottom: "2.5rem",
            }}>
              <WorkCard
                title="Radiation Safety Modules"
                subtitle="For Chemistry Department (School of H&S)"
                symbol="☢️"
                topColor="#E8A060"
                rotate={-1.5}
              />
              <WorkCard
                title="MTD Performance Evaluations GPT"
                subtitle="For the School of Music, Theatre and Dance"
                symbol="🤖"
                topColor="#A8C4D4"
                rotate={1}
              />
              <WorkCard
                title="HAL Biosafety Course"
                subtitle="For Physical Therapy Department (School of HSHP)"
                symbol="⚗️"
                topColor="#A87EC8"
                rotate={-0.5}
              />
            </div>
          </FadeUp>

          {/* CRITICAL THINKING */}
          <FadeUp delay={0.1}>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)", fontWeight: 700,
              color: "#F2C44A", textAlign: "center",
              letterSpacing: "0.1em", lineHeight: 1,
              textShadow: "0 0 30px rgba(242,196,74,0.35), 0 2px 0 rgba(200,150,0,0.2)",
            }}>
              CRITICAL THINKING
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 7. LEADERSHIP DEVELOPMENT ───────────────────── */}
      <section style={{
        padding: "6rem 2rem", background: "#F7F3FA",
        position: "relative", overflow: "hidden",
      }}>
        <Blob top="-40px" right="-60px" size={260} />

        <div className="max-w-[1060px] mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300,
              color: "#1A1A2A", letterSpacing: "-0.02em",
              marginBottom: "2.5rem",
            }}>
              For Leadership Development
            </h2>
          </FadeUp>

          {/* SLI + research poster grid */}
          <FadeUp delay={0.08}>
            <div className="dev-grid" style={{
              display: "grid", gridTemplateColumns: "1fr 2fr",
              gap: "1.5rem", alignItems: "start", marginBottom: "2rem",
            }}>
              {/* SLI slide */}
              <div style={{
                background: "#F2C44A", borderRadius: 14,
                padding: "2rem", minHeight: 220,
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.7rem", letterSpacing: "0.4em",
                  textTransform: "uppercase", color: "rgba(26,26,42,0.55)",
                  marginBottom: "0.75rem",
                }}>
                  sli · is for everyone
                </p>
                <h3 style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 700,
                  color: "#1A1A2A", lineHeight: 1.1,
                }}>
                  LEADING IN A DIVERSE WORLD
                </h3>
              </div>

              {/* 4 poster photos */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <Photo label="Aashika · research poster" h={150} accent="#D4A8B8" />
                <Photo label="Research poster · full view" h={150} accent="#D4A8B8" />
                <Photo label="Aashika · certificate" h={150} accent="#A8C4D4" />
                <Photo label="Aashika + Prof. Melcher · poster" h={150} accent="#C4D4A8" />
              </div>
            </div>
          </FadeUp>

          {/* Research flyer card */}
          <FadeUp delay={0.14}>
            <div style={{
              background: "#2A3A42", borderRadius: 18,
              padding: "2rem",
              display: "grid", gridTemplateColumns: "3fr 1fr",
              gap: "1.5rem", alignItems: "center",
            }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.6rem", letterSpacing: "0.3em",
                  textTransform: "uppercase", color: "#5BC8C8",
                  marginBottom: "0.75rem",
                }}>
                  Junior 302 Research · Fall 2025 · Monday @ 4:15 pm
                </p>
                <h3 style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.3rem, 2vw, 2rem)", fontWeight: 300,
                  color: "#F7F3FA", lineHeight: 1.3, marginBottom: "1rem",
                }}>
                  Impact of <strong>rapid freezing</strong> on{" "}
                  <em>Dicranum scoparium</em>{" "}
                  in South Hill
                </h3>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.75rem", color: "rgba(247,243,250,0.65)",
                  lineHeight: 1.8,
                }}>
                  Student: Aashika Shah<br />
                  Research Advisor: Peter Melcher<br />
                  Ithaca College · Melcher Lab, Plant Biology Research
                </p>
              </div>
              <Photo label="Field site · South Hill" h={200} accent="#5BC8C8" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 8. MENTORS ──────────────────────────────────── */}
      <section style={{
        padding: "6rem 2rem 8rem", background: "#EDE8F5",
        position: "relative", overflow: "hidden",
      }}>
        <Blob top="-40px" left="-60px" size={280} />
        <Blob bottom="-60px" right="-80px" size={320} />

        <div className="max-w-[900px] mx-auto" style={{
          position: "relative", zIndex: 1, textAlign: "center",
        }}>
          {/* Very thankful */}
          <FadeUp>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 300,
              color: "#1A1A2A", marginBottom: "2.5rem", lineHeight: 1.5,
            }}>
              Very thankful to my mentor and sponsor
            </p>
          </FadeUp>

          {/* Te-Wen Lo + Elizabeth Reilly */}
          <FadeUp delay={0.08}>
            <div style={{
              display: "flex", justifyContent: "center",
              gap: "4rem", flexWrap: "wrap", marginBottom: "2rem",
            }}>
              {[
                { name: "Prof. Te-Wen Lo", rotate: -2, accent: "#D4A8B8" },
                { name: "Elizabeth Reilly", rotate: 2, accent: "#A8C4D4" },
              ].map((m) => (
                <div key={m.name} style={{ textAlign: "center" }}>
                  <Photo
                    label={m.name} w={180} h={220}
                    rotate={m.rotate} accent={m.accent} isPolaroid
                  />
                  <p style={{
                    fontFamily: "Georgia, serif", fontStyle: "italic",
                    fontSize: "1.15rem", color: "#1A1A2A", marginTop: "0.75rem",
                  }}>
                    {m.name}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* For their time */}
          <FadeUp delay={0.14}>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 400,
              color: "#1A1A2A", marginBottom: "3rem",
            }}>
              For their time, insights and opportunities!
            </p>
          </FadeUp>

          {/* Also very thankful to */}
          <FadeUp delay={0.18}>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.65rem", letterSpacing: "0.25em",
              textTransform: "uppercase", color: "rgba(26,26,42,0.55)",
              marginBottom: "1.5rem", textAlign: "left",
            }}>
              Also very thankful to:
            </p>

            <div style={{
              display: "flex", justifyContent: "center",
              gap: "3rem", flexWrap: "wrap",
              alignItems: "flex-end", marginBottom: "2rem",
            }}>
              {/* Mish Lenhart polaroid */}
              <div style={{ textAlign: "center" }}>
                <Photo
                  label="Mish Lenhart" w={180} h={220}
                  rotate={-1.5} accent="#C4D4A8" isPolaroid
                />
                <p style={{
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  fontSize: "1.15rem", color: "#1A1A2A", marginTop: "0.75rem",
                }}>
                  Mish Lenhart
                </p>
              </div>

              {/* BOLD logo */}
              <div style={{
                background: "#C4B8E0", borderRadius: 14,
                width: 200, height: 200,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "1.5rem",
              }}>
                <p style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "2.5rem", fontWeight: 900,
                  color: "#fff", letterSpacing: "0.05em",
                  marginBottom: "0.25rem",
                }}>
                  BOLD
                </p>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.52rem", letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.75)",
                  textAlign: "center", lineHeight: 1.4,
                }}>
                  Women's Leadership Network
                </p>
              </div>
            </div>

            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.2rem, 2vw, 1.8rem)", fontWeight: 300,
              color: "rgba(26,26,42,0.6)", fontStyle: "italic",
            }}>
              & everybody involved in the program!
            </p>
          </FadeUp>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 760px) {
          .values-grid, .pitch-grid, .tree-grid,
          .works-grid, .dev-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
