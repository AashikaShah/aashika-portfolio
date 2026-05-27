
"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

// ── puṣpa — Flower (Research / plant biology)
function MascotFlower({ color }: { color: string }) {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="65" cy="65" rx="13" ry="30"
          fill={color}
          transform={`rotate(${angle} 65 65)`}
          opacity="0.92"
        />
      ))}
      <circle cx="65" cy="65" r="16" fill={color} />
      <circle cx="65" cy="65" r="7"  fill="rgba(0,0,0,0.22)" />
    </svg>
  );
}

// ── dhvaja — Flag (Leadership / BOLD)
function MascotFlag({ color }: { color: string }) {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" aria-hidden>
      <rect x="42" y="18" width="8" height="96" rx="4" fill={color} />
      <path d="M50 22 L108 38 L50 58 Z" fill={color} />
      <path d="M50 26 L96 40 L50 52 Z"  fill="rgba(255,255,255,0.1)" />
      <rect x="30" y="110" width="32" height="8" rx="4" fill={color} />
    </svg>
  );
}

// ── daraṁ — Conch (Ed Tech / call to learn)
function MascotConch({ color }: { color: string }) {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" aria-hidden>
      <path
        d="M65 20 C90 20,112 40,110 65
           C108 88,90 108,65 110
           C45 110,25 95,22 75
           C19 55,35 35,55 28
           C58 22,62 20,65 20Z"
        fill={color}
      />
      <path
        d="M65 38 C82 38,92 52,90 66 C88 78,76 88,65 88"
        stroke="rgba(0,0,0,0.2)" strokeWidth="5"
        fill="none" strokeLinecap="round"
      />
      <path
        d="M65 52 C74 52,78 60,76 68"
        stroke="rgba(0,0,0,0.15)" strokeWidth="4"
        fill="none" strokeLinecap="round"
      />
      <ellipse
        cx="38" cy="42" rx="10" ry="6"
        fill={color}
        transform="rotate(-40 38 42)"
      />
    </svg>
  );
}

// ── parvata — Mountain (Campus Life / Ithaca gorges)
function MascotMountain({ color }: { color: string }) {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" aria-hidden>
      <path d="M72 32 L112 104 H32 Z"  fill={color} opacity="0.55" />
      <path d="M48 18 L96 104 H0 Z"    fill={color} />
      <path d="M48 18 L62 46 L34 46 Z" fill="rgba(255,255,255,0.22)" />
      <rect x="0" y="104" width="130" height="8" rx="4" fill={color} opacity="0.6" />
    </svg>
  );
}

// ── types
type CardDef = {
  title:      string;
  subtitle:   string;
  
  href:       string;
  accent:     string;
  bgA:        string;
  bgB:        string;
  Mascot:     React.FC<{ color: string }>;
  floatDur:   number;
  floatY:     number;
  floatDelay: number;
};

// ── data
const CARDS: CardDef[] = [
  {
    title:      "Research",
    subtitle:   "Biology Department",
    
    href:       "/work/research",
    accent:     "#53C8B4",
    bgA:        "#0D2F2A",
    bgB:        "#061A17",
    Mascot:     MascotFlower,
    floatDur:   6.2,
    floatY:     8,
    floatDelay: 0,
  },
  {
    title:      "Leadership",
    subtitle:   "BOLD · Ithaca College",
    
    href:       "/work/bold",
    accent:     "#E85E7A",
    bgA:        "#2E0D18",
    bgB:        "#16060C",
    Mascot:     MascotFlag,
    floatDur:   7.1,
    floatY:     6,
    floatDelay: 0.6,
  },
  {
    title:      "Ed Tech",
    subtitle:   "Learning Design · AI Tools",
    
    href:       "/work/edtech",
    accent:     "#F2C95E",
    bgA:        "#2E220A",
    bgB:        "#130E05",
    Mascot:     MascotConch,
    floatDur:   6.8,
    floatY:     7,
    floatDelay: 0.3,
  },
  {
    title:      "Campus Life",
    subtitle:   "Community · Belonging",
    
    href:       "/work/campus",
    accent:     "#CF9F74",
    bgA:        "#2A1C0E",
    bgB:        "#110D07",
    Mascot:     MascotMountain,
    floatDur:   7.4,
    floatY:     9,
    floatDelay: 0.9,
  },
];

// ── card component
function WorkCard({ card, index }: { card: CardDef; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX   = useSpring(useTransform(my, [-1, 1], [6,  -6]), { stiffness: 220, damping: 24 });
  const rotateY   = useSpring(useTransform(mx, [-1, 1], [-6, 6]),  { stiffness: 220, damping: 24 });
  const cardScale = useSpring(1, { stiffness: 260, damping: 24 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    my.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  };

  return (
    <Link href={card.href} style={{ display: "block", height: "100%" }}>
      {/* float */}
      <motion.div
        style={{ height: "100%" }}
        animate={{ y: [0, -card.floatY, 0] }}
        transition={{
          duration:  card.floatDur,
          repeat:    Infinity,
          ease:      "easeInOut",
          delay:     card.floatDelay,
        }}
      >
        {/* tilt */}
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseEnter={() => cardScale.set(1.03)}
          onMouseLeave={() => { mx.set(0); my.set(0); cardScale.set(1); }}
          style={{
            rotateX,
            rotateY,
            scale:          cardScale,
            transformStyle: "preserve-3d",
            perspective:    900,
            height:         "100%",
            cursor:         "pointer",
          }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{
            duration: 0.9,
            ease:     [0.22, 1, 0.36, 1],
            delay:    0.07 * index,
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              borderRadius: 20,
              border:       `1px solid ${card.accent}35`,
              background:   `
                radial-gradient(ellipse at 15% 20%, ${card.accent}22 0%, transparent 60%),
                linear-gradient(145deg, ${card.bgA} 0%, ${card.bgB} 100%)
              `,
            }}
          >
            {/* scanline grain */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,rgba(255,255,255,0.025) 0px,rgba(255,255,255,0.025) 1px,transparent 1px,transparent 6px)",
                mixBlendMode: "overlay",
              }}
            />

            {/* bottom glow */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                width:      "55%",
                height:     "55%",
                right:      "-10%",
                bottom:     "-10%",
                background: `radial-gradient(ellipse at center,${card.accent}28 0%,transparent 70%)`,
              }}
            />

            {/* content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">

              {/* text */}
              <div>
                <h2 style={{
                  fontFamily:    "var(--font-cormorant),Georgia,serif",
                  fontSize:      "clamp(1.65rem,2.4vw,2.8rem)",
                  fontWeight:    300,
                  color:         "#F6F1EA",
                  letterSpacing: "-0.01em",
                  lineHeight:    1.0,
                  marginBottom:  "0.4rem",
                }}>
                  {card.title}
                </h2>

                <p style={{
                  fontFamily:    "var(--font-inter),system-ui,sans-serif",
                  fontSize:      "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color:         card.accent,
                  opacity:       0.65,
                }}>
                  {card.subtitle}
                </p>

                <div style={{
                  width:           38,
                  height:          1,
                  backgroundColor: card.accent,
                  opacity:         0.5,
                  marginTop:       "0.85rem",
                }} />

                {/* Sanskrit name — tiny, italic, barely there */}
                <p style={{
                  fontFamily:    "var(--font-cormorant),Georgia,serif",
                  fontSize:      "0.72rem",
                  fontStyle:     "italic",
                  color:         card.accent,
                  opacity:       0.4,
                  marginTop:     "0.5rem",
                  letterSpacing: "0.05em",
                }}>
                  {card.symbol}
                </p>
              </div>

              {/* mascot */}
              <motion.div
                aria-hidden
                animate={{
                  y:      [0, -(card.floatY * 0.7), 0],
                  rotate: [0, 1.5, -1.5, 0],
                }}
                transition={{
                  duration: card.floatDur * 0.85,
                  repeat:   Infinity,
                  ease:     "easeInOut",
                  delay:    card.floatDelay,
                }}
                style={{
                  position: "absolute",
                  right:    "8%",
                  top:      "16%",
                  opacity:  0.78,
                }}
              >
                <card.Mascot color={card.accent} />
              </motion.div>

              {/* CTA */}
              <span style={{
                fontFamily:    "var(--font-inter),system-ui,sans-serif",
                fontSize:      "0.6rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color:         card.accent,
                opacity:       0.9,
              }}>
                Explore →
              </span>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}

// ── page
export default function WorkPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#070707" }}>
      <div
        className="max-w-[1220px] mx-auto"
        style={{ padding: "7rem 2rem 4rem" }}
      >
        <div style={{ marginBottom: "2.4rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily:    "var(--font-inter),system-ui,sans-serif",
              fontSize:      "0.55rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color:         "#C4475B",
              marginBottom:  "0.7rem",
            }}
          >
            Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              fontFamily:    "var(--font-cormorant),Georgia,serif",
              fontSize:      "clamp(2.6rem,5.5vw,5.2rem)",
              fontWeight:    300,
              color:         "#F6F1EA",
              letterSpacing: "-0.02em",
              lineHeight:    1,
            }}
          >
            My Work
          </motion.h1>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 14, minHeight: "65vh" }}
        >
          {CARDS.map((card, i) => (
            <WorkCard key={card.title} card={card} index={i} />
          ))}
        </div>

      </div>
    </main>
  );
}
