"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── Data — variable images per section ───────────────────── */
const SECTIONS = [
  {
    num:     "01",
    bg:      "#EDE6DC",
    accent:  "#B85C45",
    heading: "Where I\ncome from.",
    body:    "I grew up in Kathmandu. Quiet, observant, not particularly easy to impress. What got my attention early — and never let go — was contrast. The kind you see not in headlines but in the space between two lives happening side by side, looking nothing alike.\n\nAlmost every morning on my way to school, I would pass children my age sniffing adhesive on the street to dull hunger. My day was starting. Theirs was already something else entirely. I didn't have the vocabulary for what I was seeing. I only had the feeling — this isn't fair, and it isn't invisible.\n\nWe eventually moved. I stopped seeing those children. But I never stopped thinking about what I had seen.",
    // Background ghost image
    bgImage: "/images/story/kathmandu-bg.jpg",
    // Right side images — variable per section
    images: [
      { src: "/images/story/kathmandu-1.jpg", label: "Kathmandu · childhood",  aspect: "3/4" },
      { src: "/images/story/kathmandu-2.jpg", label: "Morning · street",        aspect: "4/3" },
      { src: "/images/story/kathmandu-3.jpg", label: "Hillside · Nepal",        aspect: "3/4" },
    ],
  },
  {
    num:     "02",
    bg:      "#E0EAE0",
    accent:  "#4A7A5A",
    heading: "Why biology,\nof all things?",
    body:    "Honestly? I heard it was hard.\n\nBut the more honest answer is that I was drawn to it because it refused to stay still. Every answer in biology opens into three more questions. The deeper you go, the less settled it gets.\n\nI became less interested in biology as a catalogue of facts and more interested in it as a language — one that describes how a small signal becomes a feeling, how a pathway becomes a behavior.",
    bgImage: "/images/story/biology-bg.jpg",
    images: [
      { src: "/images/story/lab-1.jpg", label: "Lab · bench work", aspect: "4/3" },
      { src: "/images/story/lab-2.jpg", label: "Research · notes",  aspect: "4/3" },
    ],
  },
  {
    num:     "03",
    bg:      "#DCE4EE",
    accent:  "#3A5A8A",
    heading: "A moment\non a hill.",
    body:    "In 2022, on a hillside in rural Nepal, during what was meant to be an ordinary family visit.\n\nI had a brief conversation with two young girls I had just met. I will not retell it in full — it is not entirely mine to retell. But something they said made me understand, in a way I hadn't before, that access is not just about geography or money. It is about what people are forced to trade just to show up.\n\nI walked away from that hillside knowing that I didn't just want to study biology for its own sake.",
    bgImage: "/images/story/nepal-bg.jpg",
    images: [
      { src: "/images/story/nepal-1.jpg", label: "Hillside · Nepal 2022", aspect: "3/4" },
    ],
  },
  {
    num:     "04",
    bg:      "#EEE0E0",
    accent:  "#8A3A3A",
    heading: "When it became\nurgent.",
    body:    "Someone in my family has been navigating significant neurological decline over the past few years. Watching that unfold — from far away, across time zones, through phone calls that go differently each time — changed how I think about the brain.\n\nIt made me want to understand not just the mechanism, but the gap between the mechanism and the intervention. What the research actually supports. What it doesn't yet.",
    bgImage: "/images/story/family-bg.jpg",
    images: [
      { src: "/images/story/family-1.jpg", label: "Family · distance",   aspect: "4/3" },
      { src: "/images/story/family-2.jpg", label: "Phone call · memory", aspect: "3/4" },
    ],
  },
  {
    num:     "05",
    bg:      "#DDE2F0",
    accent:  "#3A4A8A",
    heading: "Where the science\nfeels unfinished.",
    body:    "Somewhere in the space between the gut and the brain.\n\nI want to understand how biological processes — cognition, gut-brain signaling, recovery — translate into outcomes that matter outside the lab.\n\nWhat makes this moment feel urgent is that the tools are changing. Computation and machine learning are starting to ask questions about the brain that weren't askable before. That is where my IT background meets my science interests. Not as two separate things — as one direction.",
    bgImage: "/images/story/neuro-bg.jpg",
    images: [
      { src: "/images/story/neuro-1.jpg", label: "Neuroscience · research", aspect: "4/3" },
      { src: "/images/story/neuro-2.jpg", label: "Lab · data",              aspect: "3/4" },
      { src: "/images/story/neuro-3.jpg", label: "Tech · computation",      aspect: "4/3" },
    ],
  },
  {
    num:     "06",
    bg:      "#EAE0F0",
    accent:  "#6A3A8A",
    heading: "The rest\nof me.",
    body:    "I play violin — less fluently than I once did, but with more feeling than I expected to recover. I read widely: essays, novels, poetry, things that have nothing to do with biology and everything to do with what it means to be inside a human life.\n\nI tend to find connection in small things — a good sentence, a question I haven't thought to ask before, a conversation that goes somewhere neither person planned.\n\nI think that is also, quietly, why neuroscience suits me. It rewards exactly that kind of attention.",
    bgImage: "/images/story/life-bg.jpg",
    images: [
      { src: "/images/story/violin-1.jpg", label: "Violin · music",  aspect: "3/4" },
      { src: "/images/story/reading-1.jpg", label: "Reading · books", aspect: "4/3" },
    ],
  },
];

/* ── Cursor-reactive tilt wrapper ─────────────────────────── */
function CursorTilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function handleMouseMove(e: React.MouseEvent) {
  if (!ref.current || prefersReducedMotion) return;
  const rect = ref.current.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  setTilt({ x: x * 30, y: y * -30 });
}


  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        boxShadow: `${-tilt.x * 1.5}px ${tilt.y * 1.5}px 30px rgba(0,0,0,${0.06 + Math.abs(tilt.x + tilt.y) * 0.008})`,
        borderRadius: 16,

        transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
        transformStyle: "preserve-3d",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}



/* ── Placeholder image box ────────────────────────────────── */
function PlaceholderImg({
  label,
  accent,
  aspect,
}: {
  label:  string;
  accent: string;
  aspect: string;
}) {
  return (
    <div style={{
      aspectRatio:     aspect,
      backgroundColor: `${accent}12`,
      border:          `1px solid ${accent}22`,
      borderRadius:    16,
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      width:           "100%",
      overflow:        "hidden",
    }}>
      <span style={{
        fontFamily:    "var(--font-inter), system-ui, sans-serif",
        fontSize:      "0.44rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color:         `${accent}55`,
        textAlign:     "center",
        padding:       "0 1rem",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── Parallax image — moves up or down as page scrolls ───── */
function ParallaxImage({
  src,
  label,
  accent,
  aspect,
  direction,
  scrollYProgress,
  sectionStart,
  sectionEnd,
}: {
  src:             string;
  label:           string;
  accent:          string;
  aspect:          string;
  direction:       "up" | "down" | "still";
  scrollYProgress: any;
  sectionStart:    number;
  sectionEnd:      number;
}) {
  const range  = sectionEnd - sectionStart;
  const yRange = direction === "up"
    ? [30, -30]
    : direction === "down"
    ? [-30, 30]
    : [0, 0];

  const y = useTransform(
    scrollYProgress,
    [sectionStart, sectionEnd],
    yRange
  );

  return (
  <motion.div style={{ y, width: "100%" }}>
    <CursorTilt>
      <PlaceholderImg label={label} accent={accent} aspect={aspect} />
    </CursorTilt>
  </motion.div>
);

}

/* ── Right image panel — variable count ───────────────────── */
function ImagePanel({
  images,
  accent,
  scrollYProgress,
  sectionStart,
  sectionEnd,
}: {
  images:          typeof SECTIONS[0]["images"];
  accent:          string;
  scrollYProgress: any;
  sectionStart:    number;
  sectionEnd:      number;
}) {
  const count = images.length;

  // Direction pattern per image index
  const directions: ("up" | "down" | "still")[] = ["up", "down", "still"];

  if (count === 1) {
    return (
      <div style={{ width: "100%", paddingTop: "2rem" }}>
        <ParallaxImage
          src={images[0].src}
          label={images[0].label}
          accent={accent}
          aspect={images[0].aspect}
          direction="still"
          scrollYProgress={scrollYProgress}
          sectionStart={sectionStart}
          sectionEnd={sectionEnd}
        />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div style={{
        display:       "flex",
        flexDirection: "column",
        gap:           "1.2rem",
        paddingTop:    "2rem",
      }}>
        {images.map((img, i) => (
          <ParallaxImage
            key={i}
            src={img.src}
            label={img.label}
            accent={accent}
            aspect={img.aspect}
            direction={directions[i]}
            scrollYProgress={scrollYProgress}
            sectionStart={sectionStart}
            sectionEnd={sectionEnd}
          />
        ))}
      </div>
    );
  }

  // 3 images — one large top, two smaller bottom row
  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      gap:           "1rem",
      paddingTop:    "2rem",
    }}>
      {/* Top — large image */}
      <ParallaxImage
        src={images[0].src}
        label={images[0].label}
        accent={accent}
        aspect={images[0].aspect}
        direction="up"
        scrollYProgress={scrollYProgress}
        sectionStart={sectionStart}
        sectionEnd={sectionEnd}
      />
      {/* Bottom row — two smaller */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {images.slice(1).map((img, i) => (
          <ParallaxImage
            key={i}
            src={img.src}
            label={img.label}
            accent={accent}
            aspect={img.aspect}
            direction={i === 0 ? "down" : "up"}
            scrollYProgress={scrollYProgress}
            sectionStart={sectionStart}
            sectionEnd={sectionEnd}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Scene ────────────────────────────────────────────────── */
function Scene({
  section,
  globalProgress,
  index,
  total,
  scrollYProgress,
}: {
  section:         typeof SECTIONS[0];
  globalProgress:  number;
  index:           number;
  total:           number;
  scrollYProgress: any;
}) {
  const heroSlice    = 0.12;
  const sectionSlice = (1 - heroSlice) / total;
  const start        = heroSlice + index * sectionSlice;
  const end          = start + sectionSlice;
  const mid          = (start + end) / 2;

  let opacity = 0;
  if (globalProgress >= start && globalProgress < mid) {
    opacity = Math.min(1, (globalProgress - start) / (sectionSlice * 0.25));
  } else if (globalProgress >= mid && globalProgress <= end) {
    opacity = Math.max(0, 1 - (globalProgress - mid) / (sectionSlice * 0.35));
  }

  if (opacity <= 0.01) return null;

  const paragraphs = section.body.split("\n\n");

  return (
    <div style={{
      position:  "absolute",
      inset:      0,
      display:   "flex",
      alignItems:"center",
      opacity,
      pointerEvents: opacity > 0.5 ? "auto" : "none",
      transition:"opacity 0.1s linear",
    }}>
      {/* Ghost background image */}
      <div style={{
        position:           "absolute",
        inset:               0,
        backgroundImage:    `url(${section.bgImage})`,
        backgroundSize:     "cover",
        backgroundPosition: "center",
        opacity:             0.04,   // very faint — almost invisible
        zIndex:              0,
        pointerEvents:      "none",
      }} />
      
      <div
        className="scene-inner"
        style={{
          maxWidth:            "1060px",
          margin:              "0 auto",
          width:               "100%",
          padding:             "0 3rem",
          display:             "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap:                 "4rem",
          alignItems:          "start",
          position:            "relative",
          zIndex:               1,
        }}
      >
        {/* LEFT — text */}
        <div style={{ paddingTop: "1rem" }}>

          {/* Eyebrow */}
          <div style={{
            display:      "flex",
            alignItems:   "center",
            gap:          "0.7rem",
            marginBottom: "1.6rem",
          }}>
            <span style={{
              fontFamily:    "var(--font-cormorant), Georgia, serif",
              fontSize:      "0.85rem",
              color:         section.accent,
              letterSpacing: "0.08em",
              opacity:       0.7,
            }}>
              {section.num}
            </span>
            <div style={{
              height:          1,
              width:           22,
              backgroundColor: section.accent,
              opacity:         0.3,
            }} />
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            fontSize:      "clamp(2.4rem, 4.2vw, 3.8rem)",
            fontWeight:    300,
            color:         "#1A1A1A",
            letterSpacing: "-0.03em",
            lineHeight:    1.0,
            whiteSpace:    "pre-line",
            marginBottom:  "2rem",
          }}>
            {section.heading}
          </h2>

          {/* Accent line */}
          <div style={{
            width:           36,
            height:          1.5,
            backgroundColor: section.accent,
            opacity:         0.4,
            marginBottom:    "1.8rem",
            borderRadius:    999,
          }} />

          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize:   "clamp(1rem, 1.35vw, 1.18rem)",
                lineHeight: 1.95,
                color:      i === 0
                  ? "rgba(26,26,26,0.88)"
                  : "rgba(26,26,26,0.68)",
                margin:     0,
              }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* RIGHT — parallax images */}
        <ImagePanel
          images={section.images}
          accent={section.accent}
          scrollYProgress={scrollYProgress}
          sectionStart={start}
          sectionEnd={end}
        />
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function HeroScene({ progress }: { progress: number }) {
  const heroEnd = 0.12;
  const opacity = Math.max(0, 1 - progress / heroEnd);

  return (
    <div style={{
      position:  "absolute",
      inset:      0,
      display:   "flex",
      alignItems:"center",
      opacity,
    }}>
      <div style={{
        maxWidth: "1060px",
        margin:   "0 auto",
        padding:  "0 3rem",
        width:    "100%",
      }}>
        <p style={{
          fontFamily:    "var(--font-inter), system-ui, sans-serif",
          fontSize:      "0.5rem",
          letterSpacing: "0.55em",
          textTransform: "uppercase",
          color:         "#B85C45",
          marginBottom:  "2rem",
        }}>
          Story
        </p>
        <h1 style={{
          fontFamily:    "var(--font-cormorant), Georgia, serif",
          fontSize:      "clamp(3.2rem, 10vw, 9rem)",
          fontWeight:    300,
          color:         "#1A1A1A",
          letterSpacing: "-0.04em",
          lineHeight:    0.92,
          marginBottom:  "3rem",
        }}>
          A few things
          <br />
          <span style={{ opacity: 0.22 }}>that are</span>
          <br />
          true about me.
        </h1>
        <p style={{
          fontFamily:    "var(--font-inter), system-ui, sans-serif",
          fontSize:      "0.5rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color:         "rgba(26,26,26,0.22)",
          display:       "flex",
          alignItems:    "center",
          gap:           "0.5rem",
        }}>
          Scroll to read <span style={{ fontSize: "0.75rem" }}>↓</span>
        </p>
      </div>
    </div>
  );
}

/* ── Progress bar ─────────────────────────────────────────── */
function ProgressBar({
  progress,
  sections,
}: {
  progress: number;
  sections: typeof SECTIONS;
}) {
  const heroSlice    = 0.12;
  const sectionSlice = (1 - heroSlice) / sections.length;
  const activeIndex  = Math.max(0, Math.floor((progress - heroSlice) / sectionSlice));

  return (
    <div style={{
      position:      "fixed",
      right:         "1.8rem",
      top:           "50%",
      transform:     "translateY(-50%)",
      zIndex:        200,
      display:       "flex",
      flexDirection: "column",
      gap:           "0.5rem",
      alignItems:    "center",
    }}>
      {sections.map((s, i) => (
        <div key={i} style={{
          width:           4,
          height:          i === activeIndex ? 22 : 6,
          borderRadius:    999,
          backgroundColor: i === activeIndex
            ? s.accent
            : "rgba(26,26,26,0.14)",
          transition:      "all 0.4s ease",
        }} />
      ))}
    </div>
  );
}

/* ── Hook to subscribe to motion value ───────────────────── */
function useMotionValue(motionValue: any) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const unsubscribe = motionValue.on("change", (v: number) => setValue(v));
    return unsubscribe;
  }, [motionValue]);
  return value;
}

/* ── Page ─────────────────────────────────────────────────── */
export default function StoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const progress = useMotionValue(scrollYProgress);

  const heroSlice    = 0.12;
  const sectionSlice = (1 - heroSlice) / SECTIONS.length;

  return (
    <>
      {/* Tall scrollable container */}
      <div
        ref={containerRef}
        style={{ height: `${(SECTIONS.length + 2) * 100}vh` }}
      />

      {/* Fixed viewport */}
      <div style={{
        position:            "fixed",
        inset:                0,
        zIndex:               10,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        overflow:            "hidden",
        backgroundColor:     "#EDE6DC"
      }}>

        {/* ── Backgrounds — crossfade per section ─────────── */}
        {/* Hero bg */}
        <div style={{
          position:        "absolute",
          inset:            0,
          backgroundColor: "#FAF7F2",
          opacity:          Math.max(0, 1 - progress / heroSlice),
          transition:      "opacity 0.1s linear",
          zIndex:           0,
          pointerEvents: "none",
        }} />

        {SECTIONS.map((s, i) => {
          const start = heroSlice + i * sectionSlice;
          const end   = start + sectionSlice;
          const next  = end + sectionSlice;

        // Stay fully visible until NEXT section starts fading in
          let bgOpacity = 0;
          if (progress >= start) {
            bgOpacity = Math.min(1, (progress - start) / (sectionSlice * 0.2));
          }
          if (i < SECTIONS.length - 1 && progress >= end) {
            bgOpacity = Math.max(0, 1 - (progress - end) / (sectionSlice * 0.2));
          }

          return (
            <div key={i} style={{
            position: "absolute",
            inset: 0,
            backgroundColor: s.bg,
            opacity: bgOpacity,
            transition: "opacity 0.1s linear",
            zIndex: 0,
            pointerEvents: "none",
          }} />
        );
      })} 

          

        {/* ── Hero ─────────────────────────────────────────── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <HeroScene progress={progress} />
        </div>

        {/* ── Sections ─────────────────────────────────────── */}
        {SECTIONS.map((section, i) => (
          <div
            key={section.num}
            style={{ position: "absolute", inset: 0, zIndex: 1 }}
          >
            <Scene
              section={section}
              globalProgress={progress}
              index={i}
              total={SECTIONS.length}
              scrollYProgress={scrollYProgress}
            />
          </div>
        ))}

        {/* ── Progress bar ─────────────────────────────────── */}
        <ProgressBar progress={progress} sections={SECTIONS} />

        {/* ── Closing line ─────────────────────────────────── */}
        <div style={{
          position:       "absolute",
          inset:           0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          zIndex:          2,
          opacity:         Math.max(0, (progress - 0.94) / 0.06),
          pointerEvents:  "none",
        }}>
          <p style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize:   "clamp(1rem, 2vw, 1.4rem)",
            fontStyle:  "italic",
            color:      "rgba(26,26,26,0.28)",
            textAlign:  "center",
          }}>
            This page will grow as I do.
          </p>
        </div>

      </div>
      
      <style jsx global>{`
        @media (max-width: 760px) {
          .scene-inner {
            grid-template-columns: 1fr !important;
            padding: 0 1.5rem !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </>
  );
}