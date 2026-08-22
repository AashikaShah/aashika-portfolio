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

      {/* ── 3. YEAR 1 REFLECTION ─────────────────────── */}
      <section style={{
        padding: "5rem 2rem", background: "#F7F3FA",
        position: "relative", overflow: "hidden",
      }}>
        <Blob top="-40px" left="-60px" size={300} />

        <div className="max-w-[1060px] mx-auto" style={{ position: "relative", zIndex: 1 }}>

          {/* Section label */}
          <FadeUp>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.58rem", letterSpacing: "0.46em",
              textTransform: "uppercase", color: "#A87EC8",
              marginBottom: "0.75rem",
            }}>
              Year 1 Reflection
            </p>
          </FadeUp>

          <div className="reflection-grid" style={{
            display: "grid", gridTemplateColumns: "1.5fr 1fr",
            gap: "3rem", alignItems: "start", marginTop: "0.5rem",
          }}>

            {/* LEFT — text */}
            <FadeUp>
              <h2 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontWeight: 300,
                color: "#1A1A2A", lineHeight: 1.05,
                letterSpacing: "-0.02em", marginBottom: "1.6rem",
              }}>
                Showing up, learning to lead,<br />and finding my voice.
              </h2>

              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.93rem", lineHeight: 1.82,
                color: "rgba(26,26,42,0.72)", marginBottom: "1.2rem",
              }}>
                The Friday workshops reshaped how I think about leadership. Learning to
                pitch with purpose, navigate difficult conversations, and lead with
                intention gave me language for things I had felt but couldn't articulate.
                Each session pushed me to be more deliberate — about how I show up,
                how I communicate, and what kind of leader I want to become.
              </p>

              {/* Pull quote */}
              <div style={{
                borderLeft: "3px solid #C4B8D8",
                paddingLeft: "1.1rem",
                margin: "1.4rem 0",
              }}>
                <p style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                  fontStyle: "italic", lineHeight: 1.65,
                  color: "#A87EC8",
                }}>
                  "you don't need all the answers right now — just focus on
                  doing your best where you are."
                </p>
              </div>

              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.93rem", lineHeight: 1.82,
                color: "rgba(26,26,42,0.72)",
              }}>
                This year I carried those lessons into action — building AI tools for
                faculty, developing safety training that reached over 100 students,
                and showing up as a researcher, a collaborator, and a scholar in spaces
                that asked me to grow.
              </p>
            </FadeUp>

            {/* RIGHT — photo column
                ═══════════════════════════════════════════════
                ADD PHOTOS: add a new line to the array below.
                  src  – path under /public, e.g. "/images/bold/event.jpg"
                  rotate – tilt in degrees, e.g. -1.5, 1.2, 0
                Leave src as "" to keep a dashed placeholder slot.
                Photos display at their natural size — no cropping.
                Add as many entries as you like.
                ═══════════════════════════════════════════════ */}
            <FadeUp delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {(
                  [
                    { rotate: -1.5, src: "/images/bold/bold-cohort2027.jpeg" },
                    { rotate:  1.2, src: "" },
                    { rotate: -0.8, src: "" },
                    /* ← add more lines here, e.g.:
                    { rotate:  1.0, src: "/images/bold/photo4.jpg" },
                    { rotate: -1.2, src: "/images/bold/photo5.jpg" },
                    */
                  ] as { rotate: number; src: string }[]
                ).map((p, i) => (
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
                      transform: `rotate(${p.rotate}deg) translateX(${i % 2 === 0 ? 4 : -4}px)`,
                      borderRadius: 10,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {p.src ? (
                      /* Real photo — natural size, no cropping */
                      <img
                        src={p.src}
                        alt={`Reflection photo ${i + 1}`}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "auto",
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      /* Placeholder — remove once src is set */
                      <div style={{
                        height: 160,
                        border: "1px dashed rgba(26,26,42,0.15)",
                        borderRadius: 10,
                        background: "rgba(196,184,216,0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                          fontSize: "0.9rem", color: "rgba(26,26,42,0.18)",
                        }}>+</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── 4. THANK YOU ────────────────────────────────── */}
      {/*
        ═══════════════════════════════════════════════════
        HOW TO ADD PHOTOS
        ═══════════════════════════════════════════════════

        POLAROID photos (mentor cards):
          Find the <Photo ... isPolaroid /> components below.
          Add  src="/images/bold/filename.jpg"  to any of them.
          Example:
            <Photo
              label="Prof. Te-Wen Lo"
              src="/images/bold/tewenlo.jpg"   ← add this line
              w={160} h={200} rotate={-2} accent="#D4A8B8" isPolaroid
            />
          → Place your image files in /public/images/bold/

        PLAIN photo placeholders (reflection section above):
          Those use inline <div> boxes — to swap in a real image,
          replace the <div style={{ height: p.h, border: "1px dashed..." }}>
          block with:
            <img
              src="/images/bold/yourfile.jpg"
              alt="description"
              style={{ width:"100%", height: p.h, objectFit:"cover", borderRadius:10 }}
            />
        ═══════════════════════════════════════════════════
      */}
      <section style={{
        padding: "5rem 2rem 7rem", background: "#EDE8F5",
        position: "relative", overflow: "hidden",
      }}>
        <Blob top="-40px" left="-60px" size={260} />
        <Blob bottom="-40px" right="-60px" size={220} />

        <div className="max-w-[860px] mx-auto" style={{
          position: "relative", zIndex: 1, textAlign: "center",
        }}>

          {/* Label */}
          <FadeUp>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.58rem", letterSpacing: "0.46em",
              textTransform: "uppercase", color: "#A87EC8",
              marginBottom: "0.75rem",
            }}>
              Acknowledgements
            </p>
            <h2 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300,
              color: "#1A1A2A", letterSpacing: "-0.02em",
              lineHeight: 1.05, marginBottom: "3rem",
            }}>
              Thank you.
            </h2>
          </FadeUp>

          {/* Mentor + sponsor polaroids */}
          <FadeUp delay={0.06}>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.28em",
              textTransform: "uppercase", color: "rgba(26,26,42,0.4)",
              marginBottom: "1.6rem",
            }}>
              Mentor &amp; Sponsor
            </p>
            <div style={{
              display: "flex", justifyContent: "center",
              gap: "3rem", flexWrap: "wrap", marginBottom: "1rem",
            }}>
              {[
                { name: "Prof. Te-Wen Lo",   rotate: -2,  accent: "#D4A8B8" },
                { name: "Elizabeth Reilly",  rotate:  2,  accent: "#A8C4D4" },
              ].map((m) => (
                <div key={m.name} style={{ textAlign: "center" }}>
                  {/* ← add src="/images/bold/yourfile.jpg" below to show a real photo */}
                  <Photo
                    label={m.name} w={160} h={200}
                    rotate={m.rotate} accent={m.accent} isPolaroid
                  />
                  <p style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontStyle: "italic", fontSize: "1.05rem",
                    color: "#1A1A2A", marginTop: "0.6rem",
                  }}>
                    {m.name}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Divider */}
          <FadeUp delay={0.1}>
            <div style={{
              width: 40, height: 1,
              background: "rgba(168,126,200,0.35)",
              margin: "2rem auto",
            }} />
          </FadeUp>

          {/* Also thankful row */}
          <FadeUp delay={0.14}>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.28em",
              textTransform: "uppercase", color: "rgba(26,26,42,0.4)",
              marginBottom: "1.6rem",
            }}>
              Also very thankful to
            </p>
            <div style={{
              display: "flex", justifyContent: "center",
              gap: "3rem", flexWrap: "wrap",
              alignItems: "flex-end", marginBottom: "2rem",
            }}>
              {/* ← add src="/images/bold/mishlenhart.jpg" below */}
              <div style={{ textAlign: "center" }}>
                <Photo
                  label="Mish Lenhart" w={160} h={200}
                  rotate={-1.5} accent="#C4D4A8" isPolaroid
                />
                <p style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontStyle: "italic", fontSize: "1.05rem",
                  color: "#1A1A2A", marginTop: "0.6rem",
                }}>
                  Mish Lenhart
                </p>
              </div>

              {/* BOLD tile */}
              <div style={{
                background: "#C4B8E0", borderRadius: 14,
                width: 180, height: 180,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "1.2rem",
              }}>
                <p style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "2.2rem", fontWeight: 900,
                  color: "#fff", letterSpacing: "0.05em", marginBottom: "0.2rem",
                }}>
                  BOLD
                </p>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.48rem", letterSpacing: "0.16em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.75)",
                  textAlign: "center", lineHeight: 1.5,
                }}>
                  Women's<br />Leadership Network
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Closing line */}
          <FadeUp delay={0.18}>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", fontWeight: 300,
              color: "rgba(26,26,42,0.55)", fontStyle: "italic",
              marginBottom: "3rem",
            }}>
              & everybody involved in the program!
            </p>

            {/* Final stamp */}
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.56rem", letterSpacing: "0.38em",
              textTransform: "uppercase", color: "rgba(26,26,42,0.28)",
            }}>
              Aashika Shah · BOLD Leadership Scholar · Year 1
            </p>
          </FadeUp>

        </div>
      </section>

      <style jsx>{`
        @media (max-width: 760px) {
          .reflection-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
