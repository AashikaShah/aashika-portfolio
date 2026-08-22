"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ════════════════════════════════════════════════
   PALETTE
   ════════════════════════════════════════════════ */
const CRIMSON = "#9B1B30";
const CRIMSON_LIGHT = "#C4475B";
const CRIMSON_MUTED = "#8B3545"; // brighter than before for visibility
const GOLD = "#C9A055";
const GOLD_SOFT = "#D9B978";
const CREAM = "#F9F6F2";

/* ════════════════════════════════════════════════
   HELPER — recursive tree-branch dendrite generator
   ════════════════════════════════════════════════ */
type Branch = {
  d: string;
  width: number;
  opacity: number;
  delay: number;
  duration: number;
};

function buildDendriteTree(
  startX: number,
  startY: number,
  angle: number,
  length: number,
  width: number,
  depth: number,
  delay: number,
  branches: Branch[] = []
): Branch[] {
  if (depth === 0 || length < 8) return branches;

  const endX = startX + Math.cos(angle) * length;
  const endY = startY + Math.sin(angle) * length;

  const bend = (Math.random() - 0.5) * length * 0.35;
  const perpAngle = angle + Math.PI / 2;
  const ctrlX = (startX + endX) / 2 + Math.cos(perpAngle) * bend;
  const ctrlY = (startY + endY) / 2 + Math.sin(perpAngle) * bend;

  branches.push({
    d: `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`,
    width,
    opacity: Math.max(0.18, 0.7 - (4 - depth) * 0.15),
    delay,
    duration: 1.6 + depth * 0.25,
  });

  const forks = depth > 2 ? 2 : 3;
  for (let i = 0; i < forks; i++) {
    const spread = 0.55 + Math.random() * 0.35;
    const newAngle =
      angle + (i - (forks - 1) / 2) * spread + (Math.random() - 0.5) * 0.15;
    const newLength = length * (0.55 + Math.random() * 0.15);
    const newWidth = Math.max(0.4, width * 0.65);
    buildDendriteTree(
      endX,
      endY,
      newAngle,
      newLength,
      newWidth,
      depth - 1,
      delay + 0.25,
      branches
    );
  }

  return branches;
}

/* ════════════════════════════════════════════════
   HERO NEURON
   ════════════════════════════════════════════════ */
function HeroNeuron() {
  const cx = 300;
  const cy = 270;

  const dendriteTrees: Branch[] = [];
  const trunkAngles = [
    -Math.PI * 0.95,
    -Math.PI * 0.80,
    -Math.PI * 0.65,
    -Math.PI * 0.50,
    -Math.PI * 0.35,
    -Math.PI * 0.20,
    -Math.PI * 0.05,
    Math.PI * 0.95,
  ];

  trunkAngles.forEach((angle, idx) => {
    const radius = 44;
    const sx = cx + Math.cos(angle) * radius;
    const sy = cy + Math.sin(angle) * radius * 0.95;
    const len = 55 + Math.random() * 20;
    buildDendriteTree(sx, sy, angle, len, 2.0, 4, 0.15 + idx * 0.08, dendriteTrees);
  });

  // ── MYELIN SHEATHS — slimmer, outlined (option C) ──
  // Positioned so axon flows continuously THROUGH them
  const myelinSegments = [
    { y: 388, h: 34 },
    { y: 430, h: 34 },
    { y: 472, h: 34 },
    { y: 514, h: 34 },
    { y: 556, h: 34 },
    { y: 598, h: 34 },
  ];
  const axonStartY = cy + 105; // 375
  const axonEndY = 680;

  // ── ORGANIC TERMINAL BOUTONS ──
  // Irregular, asymmetric, varied — each has a twisting branch + teardrop bulb
  const terminals = [
    { branchPath: `M ${cx} ${axonEndY} C ${cx - 15} 695, ${cx - 35} 705, ${cx - 52} 720`, bx: -52, by: 720, size: 7.5 },
    { branchPath: `M ${cx} ${axonEndY} C ${cx - 8} 700, ${cx - 22} 715, ${cx - 28} 735`,  bx: -28, by: 735, size: 6 },
    { branchPath: `M ${cx} ${axonEndY} C ${cx + 2} 705, ${cx - 4} 720, ${cx + 2} 742`,    bx: 2,   by: 742, size: 7 },
    { branchPath: `M ${cx} ${axonEndY} C ${cx + 10} 700, ${cx + 24} 718, ${cx + 32} 736`, bx: 32,  by: 736, size: 6.5 },
    { branchPath: `M ${cx} ${axonEndY} C ${cx + 18} 695, ${cx + 38} 708, ${cx + 55} 722`, bx: 55,  by: 722, size: 7.5 },
  ];

  return (
    <g>
      {/* ── DENDRITE TREES ── */}
      {dendriteTrees.map((b, i) => (
        <motion.path
          key={`dend-${i}`}
          d={b.d}
          stroke={CRIMSON_LIGHT}
          strokeWidth={b.width}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: b.opacity }}
          transition={{ duration: b.duration, ease: "easeInOut", delay: b.delay }}
        />
      ))}

      {/* ── SOMA ── */}
      <motion.ellipse
        cx={cx} cy={cy} rx={56} ry={52}
        fill={CRIMSON}
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d={`M ${cx - 44} ${cy - 8}
            Q ${cx - 48} ${cy - 40} ${cx - 10} ${cy - 46}
            Q ${cx + 30} ${cy - 50} ${cx + 44} ${cy - 12}
            Q ${cx + 48} ${cy + 22} ${cx + 18} ${cy + 36}
            Q ${cx - 2} ${cy + 42} ${cx - 22} ${cy + 38}
            Q ${cx - 46} ${cy + 28} ${cx - 44} ${cy - 8} Z`}
        fill={CRIMSON}
        animate={{ opacity: [0.38, 0.55, 0.38] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={cx} cy={cy} r={17}
        fill={CRIMSON_LIGHT}
        animate={{ opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={cx} cy={cy} r={5}
        fill={CREAM}
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── AXON HILLOCK — smooth taper from soma ── */}
      <motion.path
        d={`M ${cx - 14} ${cy + 30}
            Q ${cx - 8} ${cy + 70} ${cx - 2} ${axonStartY}
            L ${cx + 2} ${axonStartY}
            Q ${cx + 8} ${cy + 70} ${cx + 14} ${cy + 30} Z`}
        fill={CRIMSON}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.9 }}
      />

      {/* ── AXON TRUNK — ONE continuous line behind myelin ── */}
      <motion.path
        d={`M ${cx} ${axonStartY} L ${cx} ${axonEndY}`}
        stroke={CRIMSON_LIGHT}
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.65 }}
        transition={{ duration: 2.2, ease: "easeInOut", delay: 1.1 }}
      />

      {/* ── MYELIN SHEATHS — OUTLINED capsules (option C) ── */}
      {/* Slim, hollow, gold stroke — axon flows continuously through them */}
      {myelinSegments.map((seg, i) => (
        <g key={`myelin-${i}`}>
          <motion.rect
            x={cx - 7}
            y={seg.y}
            width={14}
            height={seg.h}
            rx={7}
            ry={8}
            fill="none"
            stroke={GOLD}
            strokeWidth={1.8}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.85, scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
            style={{ transformOrigin: `${cx}px ${seg.y + seg.h / 2}px` }}
          />
          {/* Subtle gold fill — very low opacity, lets axon show through */}
          <motion.rect
            x={cx - 7}
            y={seg.y}
            width={14}
            height={seg.h}
            rx={7}
            ry={8}
            fill={GOLD}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ duration: 0.5, delay: 1.7 + i * 0.1 }}
          />
        </g>
      ))}

      {/* ── AP PULSE — saltatory, SLOWER ── */}
      <motion.circle
        cx={cx}
        cy={axonStartY}
        r={6}
        fill={GOLD}
        animate={{
          cy: [
            axonStartY,
            myelinSegments[0].y - 3,
            myelinSegments[0].y + myelinSegments[0].h + 3,
            myelinSegments[1].y + myelinSegments[1].h + 3,
            myelinSegments[2].y + myelinSegments[2].h + 3,
            myelinSegments[3].y + myelinSegments[3].h + 3,
            myelinSegments[4].y + myelinSegments[4].h + 3,
            myelinSegments[5].y + myelinSegments[5].h + 3,
            axonEndY,
          ],
          opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
          r: [4, 7, 7, 7, 7, 7, 7, 6, 3],
        }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          repeatDelay: 3.2,
          ease: "easeInOut",
          delay: 3,
          times: [0, 0.05, 0.18, 0.32, 0.46, 0.6, 0.74, 0.88, 1],
        }}
      />
      {/* Afterglow trail */}
      <motion.circle
        cx={cx}
        cy={axonStartY}
        r={3}
        fill={CREAM}
        animate={{
          cy: [axonStartY, axonEndY],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          repeatDelay: 3.2,
          ease: "easeInOut",
          delay: 3.15,
        }}
      />

      {/* ── TERMINAL BRANCHES — organic, twisting ── */}
      {terminals.map((t, i) => (
        <motion.path
          key={`term-branch-${i}`}
          d={t.branchPath}
          stroke={CRIMSON_LIGHT}
          strokeWidth={1.6}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.65 }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 3.4 + i * 0.1 }}
        />
      ))}

      {/* ── ORGANIC TEARDROP BOUTONS ── */}
      {terminals.map((t, i) => {
        const cxB = cx + t.bx;
        const cyB = t.by;
        const s = t.size;
        // Teardrop / bulb path — slightly irregular
        const bulbPath = `
          M ${cxB} ${cyB - s}
          C ${cxB + s * 1.1} ${cyB - s * 0.9}, ${cxB + s * 1.3} ${cyB + s * 0.4}, ${cxB + s * 0.3} ${cyB + s * 1.1}
          C ${cxB - s * 0.8} ${cyB + s * 1.2}, ${cxB - s * 1.3} ${cyB + s * 0.2}, ${cxB - s * 1.0} ${cyB - s * 0.5}
          C ${cxB - s * 0.7} ${cyB - s * 1.0}, ${cxB - s * 0.2} ${cyB - s * 1.1}, ${cxB} ${cyB - s} Z
        `;
        return (
          <motion.path
            key={`bouton-${i}`}
            d={bulbPath}
            fill={CRIMSON_LIGHT}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: [0.55, 0.85, 0.55],
            }}
            transition={{
              scale: { delay: 4.2 + i * 0.1, duration: 0.5 },
              opacity: {
                delay: 4.4 + i * 0.1,
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{ transformOrigin: `${cxB}px ${cyB}px` }}
          />
        );
      })}

      {/* ── NEUROTRANSMITTER RELEASE ── */}
      {terminals.flatMap((t, i) =>
        [0, 1, 2].map((j) => {
          const cxB = cx + t.bx;
          const cyB = t.by;
          return (
            <motion.circle
              key={`nt-${i}-${j}`}
              cx={cxB}
              cy={cyB}
              r={1.8}
              fill={GOLD_SOFT}
              animate={{
                cy: [cyB, cyB + 22 + j * 4],
                cx: [cxB, cxB + (j - 1) * 3],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 4.4,
                ease: "easeOut",
                delay: 5.4 + j * 0.18 + i * 0.06,
              }}
            />
          );
        })
      )}
    </g>
  );
}

/* ════════════════════════════════════════════════
   POSTSYNAPTIC NEURON
   ════════════════════════════════════════════════ */
function PostsynapticNeuron({
  x, y, scale = 0.45, rotation = 0, lightUpDelay = 5.8,
}: {
  x: number; y: number; scale?: number; rotation?: number; lightUpDelay?: number;
}) {
  const dendriteTrees: Branch[] = [];
  const trunkAngles = [
    -Math.PI * 0.85,
    -Math.PI * 0.65,
    -Math.PI * 0.50,
    -Math.PI * 0.35,
    -Math.PI * 0.15,
  ];
  trunkAngles.forEach((angle, idx) => {
    const r = 26;
    const sx = Math.cos(angle) * r;
    const sy = Math.sin(angle) * r * 0.95;
    buildDendriteTree(sx, sy, angle, 38, 1.5, 3, 0.1 + idx * 0.05, dendriteTrees);
  });

  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${rotation})`}>
      {dendriteTrees.map((b, i) => (
        <motion.path
          key={`pdend-${i}`}
          d={b.d}
          stroke={CRIMSON_LIGHT}
          strokeWidth={b.width}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: b.opacity * 0.85 }}
          transition={{ duration: b.duration, ease: "easeInOut", delay: 2 + b.delay }}
        />
      ))}

      <motion.ellipse
        cx={0} cy={0} rx={28} ry={26}
        fill={CRIMSON}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: lightUpDelay }}
      />
      <motion.circle
        cx={0} cy={0} r={10}
        fill={CRIMSON_LIGHT}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: lightUpDelay }}
      />
      <motion.circle
        cx={0} cy={0} r={3}
        fill={CREAM}
        animate={{ opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: lightUpDelay }}
      />

      <motion.path
        d={`M 0 26 Q 4 60 -4 95 Q -10 125 6 160`}
        stroke={CRIMSON_LIGHT}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 2.8 }}
      />
    </g>
  );
}

/* ════════════════════════════════════════════════
   DEGENERATED NEURON — brighter, more visible
   ════════════════════════════════════════════════ */
type DegenVariant = "atrophied" | "demyelinated" | "fading";

function DegeneratedNeuron({
  x, y, scale = 0.4, rotation = 0, variant, seed = 0,
}: {
  x: number; y: number; scale?: number; rotation?: number; variant: DegenVariant; seed?: number;
}) {
  const dendriteTrees: Branch[] = [];
  const trunkCount = variant === "atrophied" ? 4 : 6;
  for (let i = 0; i < trunkCount; i++) {
    const angle = -Math.PI + (i / trunkCount) * Math.PI;
    const r = 24;
    const sx = Math.cos(angle) * r;
    const sy = Math.sin(angle) * r;
    const len = variant === "atrophied" ? 22 : 36;
    buildDendriteTree(sx, sy, angle, len, 1.3, variant === "atrophied" ? 2 : 3, 0.1 * i, dendriteTrees);
  }

  // Demyelinated: break into discrete segments instead of dasharray
  const demyelSegments = [
    { y1: 20, y2: 55 },
    { y1: 62, y2: 95 },   // gap before this
    // gap
    { y1: 115, y2: 150 },
    { y1: 158, y2: 195 },
  ];
  const brokenMyelin = [
    { y: 30, h: 22, opacity: 0.7 },
    { y: 70, h: 14, opacity: 0.35 }, // damaged
    { y: 120, h: 22, opacity: 0.7 },
    { y: 165, h: 18, opacity: 0.5 },
  ];

  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale}) rotate(${rotation})`}
      opacity={variant === "fading" ? 0.55 : 0.75}
    >
      {dendriteTrees.map((b, i) => (
        <motion.path
          key={`gdend-${seed}-${i}`}
          d={b.d}
          stroke={CRIMSON_MUTED}
          strokeWidth={b.width}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: b.opacity * 0.85 }}
          transition={{ duration: b.duration + 1, ease: "easeInOut", delay: 1.5 + b.delay }}
        />
      ))}

      <motion.ellipse
        cx={0} cy={0}
        rx={variant === "atrophied" ? 18 : 24}
        ry={variant === "atrophied" ? 16 : 22}
        fill={CRIMSON_MUTED}
        animate={{
          opacity:
            variant === "fading"
              ? [0.3, 0.55, 0.2, 0.5, 0.3]
              : [0.45, 0.65, 0.45],
        }}
        transition={{
          duration: variant === "fading" ? 4.5 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx={0} cy={0} r={6}
        fill={CRIMSON_LIGHT}
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {variant === "demyelinated" ? (
        <>
          {/* Axon drawn as discrete segments — NOT dasharray (avoids stray line bug) */}
          {demyelSegments.map((seg, i) => (
            <motion.line
              key={`axseg-${seed}-${i}`}
              x1={0} y1={seg.y1} x2={0} y2={seg.y2}
              stroke={CRIMSON_MUTED}
              strokeWidth={1.8}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ duration: 1, delay: 2 + i * 0.15 }}
            />
          ))}
          {/* Broken myelin capsules */}
          {brokenMyelin.map((m, i) => (
            <motion.rect
              key={`broken-${seed}-${i}`}
              x={-6}
              y={m.y}
              width={12}
              height={m.h}
              rx={5}
              fill="none"
              stroke={GOLD}
              strokeWidth={1.2}
              opacity={m.opacity}
              initial={{ opacity: 0 }}
              animate={{ opacity: m.opacity }}
              transition={{ duration: 0.5, delay: 2.2 + i * 0.15 }}
            />
          ))}
        </>
      ) : (
        <>
          {/* Beaded / tangled axon */}
          <motion.path
            d="M 0 18 Q 6 50 -4 80 Q -8 110 4 140 Q 8 170 -2 195"
            stroke={CRIMSON_MUTED}
            strokeWidth={1.8}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2.5, delay: 1.8 }}
          />
          {[55, 95, 140, 175].map((cy, i) => (
            <motion.circle
              key={`bead-${seed}-${i}`}
              cx={i % 2 === 0 ? -2 : 4}
              cy={cy}
              r={2.5}
              fill={CRIMSON_MUTED}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.4, delay: 2.5 + i * 0.1 }}
            />
          ))}
        </>
      )}

      {/* Failing pulse */}
      <motion.circle
        cx={0}
        cy={20}
        r={3}
        fill={GOLD}
        animate={{
          cy: [20, 70, 90],
          opacity: [0, 0.8, 0],
          r: [3, 2.5, 0.5],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          repeatDelay: 4 + seed * 0.4,
          ease: "easeOut",
          delay: 3.5 + seed * 0.6,
        }}
      />
    </g>
  );
}

/* ════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════ */
export default function NeuronAnimation() {
  const [dims, setDims] = useState({ w: 1440, h: 900 });
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(720);
  const mouseY = useMotionValue(450);
  const springX = useSpring(mouseX, { stiffness: 25, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 25, damping: 20 });
  const moveX = useTransform(springX, [0, dims.w], [-20, 20]);
  const moveY = useTransform(springY, [0, dims.h], [-20, 20]);

  useEffect(() => {
    const update = () => {
      setDims({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    update();
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", update);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.div style={{ x: moveX, y: moveY }}>
        <svg
          viewBox="0 0 600 900"
          width="700"
          height="1050"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.95 }}
        >
          {/* ── DEGENERATED NEURONS — pushed to edges, larger & brighter ── */}
          {!isMobile && (
            <>
              {/* Top corners */}
              <DegeneratedNeuron x={50}  y={110} scale={0.5}  rotation={-20} variant="atrophied"    seed={0} />
              <DegeneratedNeuron x={555} y={130} scale={0.55} rotation={25}  variant="demyelinated" seed={1} />

              {/* Mid edges */}
              <DegeneratedNeuron x={35}  y={450} scale={0.48} rotation={-30} variant="fading"       seed={2} />
              <DegeneratedNeuron x={565} y={470} scale={0.52} rotation={20}  variant="atrophied"    seed={3} />

              {/* Lower corners */}
              <DegeneratedNeuron x={55}  y={800} scale={0.45} rotation={-15} variant="demyelinated" seed={4} />
              <DegeneratedNeuron x={555} y={820} scale={0.48} rotation={30}  variant="fading"       seed={5} />
            </>
          )}

          {/* ── POSTSYNAPTIC NEURONS ── */}
          <PostsynapticNeuron x={210} y={800} scale={0.42} rotation={-12} lightUpDelay={5.8} />
          <PostsynapticNeuron x={300} y={820} scale={0.45} rotation={0}   lightUpDelay={6.0} />
          <PostsynapticNeuron x={390} y={800} scale={0.42} rotation={12}  lightUpDelay={6.2} />

          {/* ── HERO NEURON ── */}
          <HeroNeuron />
        </svg>
      </motion.div>
    </div>
  );
}
