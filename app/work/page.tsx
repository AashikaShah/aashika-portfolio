"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

// ══════════════════════════════════════════════════════════
// WORK DATA — add new items here to update the page
// ══════════════════════════════════════════════════════════
const workItems = [
  {
    id:          "research",
    number:      "01",
    title:       "Research",
    oneliner:    "I study how living things sense the world.",
    reveal:      "Melcher Lab · Swensen Lab · Woods Lab (Summer 2026) · Gondek Lab (Fall 2026)",
    href:        "/work/research",
    image:       null as string | null,
    placeholder: "linear-gradient(135deg, #0D2B2B 0%, #1A5A5A 100%)",
  },
  {
    id:          "bold",
    number:      "02",
    title:       "BOLD Leadership",
    oneliner:    "I learned that leadership starts with listening.",
    reveal:      "BOLD Women's Leadership Scholar · Ithaca College",
    href:        "/work/bold",
    image:       null as string | null,
    placeholder: "linear-gradient(135deg, #2D1B1B 0%, #9B1B30 100%)",
  },
  {
    id:          "edtech",
    number:      "03",
    title:       "Ed Tech & Learning Design",
    oneliner:    "I build things that make learning feel human.",
    reveal:      "AI Agents · Course Design · Media Production · Instructional Design",
    href:        "/work/edtech",
    image:       null as string | null,
    placeholder: "linear-gradient(135deg, #1A1208 0%, #C9A055 100%)",
  },
  {
    id:          "campus",
    number:      "04",
    title:       "Campus Life",
    oneliner:    "I show up. Every single day.",
    reveal:      "Animal Care Technician · Fitness Monitor · Mail Services",
    href:        "/work/campus",
    image:       null as string | null,
    placeholder: "linear-gradient(135deg, #1E1410 0%, #8B5E3C 100%)",
  },
];

type WorkItem = typeof workItems[0];

// ══════════════════════════════════════════════════════════
// FLOATING IMAGE COMPONENT
// ══════════════════════════════════════════════════════════
function FloatingImage({ activeItem }: { activeItem: WorkItem | null }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const rotate = useSpring(0, { stiffness: 80, damping: 15 });

  useEffect(() => {
    let lastX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const dx = e.clientX - lastX;
      rotate.set(dx * 0.15);
      lastX = e.clientX;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, rotate]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        translateX: "20px",
        translateY: "-60%",
      }}
      className="fixed top-0 left-0 pointer-events-none z-[200]"
      animate={{
        opacity: activeItem ? 1 : 0,
        scale:   activeItem ? 1 : 0.85,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          width:      220,
          height:     280,
          background: activeItem?.image
            ? `url(${activeItem.image}) center/cover`
            : activeItem?.placeholder ?? "transparent",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
        }}
      >
        {!activeItem?.image && activeItem && (
          <div
            className="w-full h-full flex flex-col
                       items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
          >
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.2rem", fontWeight: 300,
              color: "rgba(249,246,242,0.7)",
              fontStyle: "italic", textAlign: "center",
              padding: "0 1rem",
            }}>
              {activeItem.title}
            </p>
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.55rem",
              color: "rgba(249,246,242,0.35)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: "0.5rem",
            }}>
              Photo coming soon
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════
// WORK ROW COMPONENT
// ══════════════════════════════════════════════════════════
function WorkRow({
  item,
  index,
  isActive,
  isAnyActive,
  onEnter,
  onLeave,
}: {
  item:        WorkItem;
  index:       number;
  isActive:    boolean;
  isAnyActive: boolean;
  onEnter:     () => void;
  onLeave:     () => void;
}) {
  return (
    <Link href={item.href} style={{ textDecoration: "none" }}>
      <motion.div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1,  y: 0  }}
        transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
        className="relative px-8 md:px-20 py-10 md:py-14
                   flex items-center justify-between gap-8"
        style={{
          borderBottom:  "1px solid rgba(249,246,242,0.08)",
          cursor:        "none",
          opacity:        isAnyActive && !isActive ? 0.3 : 1,
          transition:    "opacity 0.4s ease",
        }}
      >

        {/* Left side — number + text */}
        <div className="flex items-start gap-6 md:gap-10 flex-1">

          {/* Number */}
          <span style={{
            fontFamily:    "var(--font-inter), system-ui, sans-serif",
            fontSize:      "0.58rem",
            letterSpacing: "0.3em",
            color:          isActive
              ? "#C4475B"
              : "rgba(249,246,242,0.2)",
            paddingTop:    "0.6rem",
            transition:    "color 0.3s ease",
            flexShrink:    0,
            width:         "2rem",
          }}>
            {item.number}
          </span>

          {/* Text */}
          <div>

            {/* Category label */}
            <p style={{
              fontFamily:    "var(--font-inter), system-ui, sans-serif",
              fontSize:      "0.58rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color:          isActive
                ? "#C4475B"
                : "rgba(249,246,242,0.28)",
              marginBottom:  "0.6rem",
              transition:    "color 0.3s ease",
            }}>
              {item.title}
            </p>

            {/* One-liner */}
            <p style={{
              fontFamily:    "var(--font-cormorant), Georgia, serif",
              fontSize:      "clamp(1.8rem, 3.5vw, 3rem)",
              fontWeight:    300,
              fontStyle:     "italic",
              color:         "#F9F6F2",
              lineHeight:    1.2,
              letterSpacing: "-0.01em",
            }}>
              {item.oneliner}
            </p>

            {/* Reveal detail */}
            <p style={{
              fontFamily:    "var(--font-inter), system-ui, sans-serif",
              fontSize:      "0.68rem",
              letterSpacing: "0.08em",
              color:          isActive
                ? "rgba(249,246,242,0.6)"
                : "rgba(249,246,242,0.22)",
              marginTop:     "0.85rem",
              lineHeight:    1.7,
              transition:    "color 0.4s ease",
            }}>
              {item.reveal}
            </p>

          </div>
        </div>

        {/* Right side — explore arrow */}
        <motion.span
          animate={{
            opacity: isActive ? 1   : 0,
            x:       isActive ? 0   : -12,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            fontFamily:    "var(--font-inter), system-ui, sans-serif",
            fontSize:      "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "#C4475B",
            flexShrink:    0,
          }}
        >
          Explore →
        </motion.span>

      </motion.div>
    </Link>
  );
}

// ══════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════
export default function WorkPage() {
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);

  return (
    <main style={{ backgroundColor: "#0C0A0B", cursor: "none" }}>

      {/* Floating image — follows cursor */}
      <FloatingImage activeItem={activeItem} />

      {/* ── PAGE HEADER ───────────────────────────── */}
      <section className="pt-36 pb-20 px-8 md:px-20">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily:    "var(--font-inter), system-ui, sans-serif",
            fontSize:      "0.62rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color:         "#C4475B",
            marginBottom:  "1.2rem",
          }}
        >
          Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3,
          }}
          style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(3.5rem, 9vw, 8rem)",
            fontWeight:    300,
            color:         "#F9F6F2",
            letterSpacing: "-0.02em",
            lineHeight:    1,
          }}
        >
          My Work
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize:   "1rem",
            fontStyle:  "italic",
            color:      "rgba(249,246,242,0.22)",
            marginTop:  "1.5rem",
          }}
        >
          Hover to explore. Click to go deeper.
        </motion.p>

      </section>

      {/* ── WORK LIST ─────────────────────────────── */}
      <section
        style={{ borderTop: "1px solid rgba(249,246,242,0.08)" }}
      >
        {workItems.map((item, i) => (
          <WorkRow
            key={item.id}
            item={item}
            index={i}
            isActive={activeItem?.id === item.id}
            isAnyActive={activeItem !== null}
            onEnter={() => setActiveItem(item)}
            onLeave={() => setActiveItem(null)}
          />
        ))}
      </section>

      {/* ── FOOTER NOTE ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="px-8 md:px-20 py-16"
        style={{ borderTop: "1px solid rgba(249,246,242,0.05)" }}
      >
        <p style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize:   "0.95rem",
          fontStyle:  "italic",
          color:      "rgba(249,246,242,0.15)",
        }}>
          More coming — Woods Lab (Summer 2026) ·
          Gondek Lab (Fall 2026)
        </p>
      </motion.div>

    </main>
  );
}