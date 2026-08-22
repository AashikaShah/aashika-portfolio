"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function NeuronAnimation() {
  const [dims, setDims] = useState({ w: 1440, h: 900 });

  // Track mouse position
  const mouseX = useMotionValue(720);
  const mouseY = useMotionValue(450);

  // Spring physics — neuron floats gently toward cursor
  const springX = useSpring(mouseX, { stiffness: 25, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 25, damping: 20 });

  // Convert mouse to subtle movement (-20px to +20px)
  const moveX = useTransform(springX, [0, dims.w], [-20, 20]);
  const moveY = useTransform(springY, [0, dims.h], [-20, 20]);

  useEffect(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight });
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <div
      className="absolute inset-0 flex items-center
                 justify-center pointer-events-none overflow-hidden"
    >
      <motion.div style={{ x: moveX, y: moveY }}>
        <svg
          viewBox="0 0 600 750"
          width="700"
          height="875"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.9 }}
        >

          {/* ════════════════════════════════════════
              DENDRITES — branching inputs to soma
              Each draws itself with a delay
          ════════════════════════════════════════ */}

          {/* Dendrite 1 — upper left */}
          <motion.path
            d="M 275 255 Q 220 200 180 165"
            stroke="#C4475B"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
          />
          {/* Branch off dendrite 1 */}
          <motion.path
            d="M 220 200 Q 200 170 185 145"
            stroke="#C4475B"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Sub-branch */}
          <motion.path
            d="M 200 170 Q 185 155 175 138"
            stroke="#C4475B"
            strokeWidth="0.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
          />

          {/* Dendrite 2 — straight up */}
          <motion.path
            d="M 295 248 Q 285 190 280 140"
            stroke="#C4475B"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.1 }}
          />
          {/* Branch off top */}
          <motion.path
            d="M 285 175 Q 265 155 255 130"
            stroke="#C4475B"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.7 }}
          />
          {/* Branch other side */}
          <motion.path
            d="M 285 175 Q 305 158 312 132"
            stroke="#C4475B"
            strokeWidth="0.9"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.8 }}
          />

          {/* Dendrite 3 — upper right */}
          <motion.path
            d="M 325 255 Q 375 200 415 168"
            stroke="#C4475B"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
          />
          {/* Branch off dendrite 3 */}
          <motion.path
            d="M 375 200 Q 395 172 410 148"
            stroke="#C4475B"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
          />
          {/* Sub-branch */}
          <motion.path
            d="M 395 172 Q 410 158 418 140"
            stroke="#C4475B"
            strokeWidth="0.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.0 }}
          />

          {/* Dendrite 4 — left horizontal */}
          <motion.path
            d="M 262 288 Q 210 278 168 262"
            stroke="#C4475B"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.4 }}
          />
          {/* Branch off left */}
          <motion.path
            d="M 210 278 Q 192 262 178 245"
            stroke="#C4475B"
            strokeWidth="0.9"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
          />

          {/* Dendrite 5 — right horizontal */}
          <motion.path
            d="M 338 288 Q 390 275 432 258"
            stroke="#C4475B"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.4 }}
          />
          {/* Branch off right */}
          <motion.path
            d="M 390 275 Q 408 260 422 242"
            stroke="#C4475B"
            strokeWidth="0.9"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
          />

          {/* ════════════════════════════════════════
              SOMA — cell body
              Pulses like a heartbeat
          ════════════════════════════════════════ */}

          {/* Outer glow ring */}
          <motion.circle
            cx="300" cy="295" r="55"
            fill="#9B1B30"
            animate={{ r: [55, 60, 55], opacity: [0.08, 0.14, 0.08] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main soma body */}
          <motion.circle
            cx="300" cy="295" r="42"
            fill="#9B1B30"
            animate={{ r: [42, 46, 42], opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Nucleus */}
          <motion.circle
            cx="300" cy="295" r="16"
            fill="#C4475B"
            animate={{ opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Nucleolus — tiny dot inside nucleus */}
          <motion.circle
            cx="300" cy="295" r="5"
            fill="#F9F6F2"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ════════════════════════════════════════
              AXON HILLOCK — soma narrows into axon
          ════════════════════════════════════════ */}
          <motion.path
            d="M 300 337 Q 302 358 300 378"
            stroke="#C4475B"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.0 }}
          />

          {/* ════════════════════════════════════════
              AXON — long trunk
          ════════════════════════════════════════ */}
          <motion.path
            d="M 300 378 Q 304 450 300 520 Q 296 570 300 622"
            stroke="#C4475B"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.65 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 1.2 }}
          />

          {/* ════════════════════════════════════════
              MYELIN SHEATHS — gold Schwann cells
              These insulate the axon + glow on dark
          ════════════════════════════════════════ */}
          {[395, 445, 498, 550].map((y, i) => (
            <motion.path
              key={y}
              d={`M 296 ${y} Q 312 ${y + 13} 296 ${y + 26}`}
              stroke="#C9A055"
              strokeWidth="7"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: 1.8 + i * 0.2,
              }}
            />
          ))}

          {/* ════════════════════════════════════════
              ELECTRICAL PULSE — travels down axon
              Gold dot moving from hillock to terminal
          ════════════════════════════════════════ */}
          <motion.circle
            cx="300"
            cy="378"
            r="5"
            fill="#C9A055"
            animate={{
              cy:      [378, 622],
              opacity: [1,   0  ],
              r:       [5,   2  ],
            }}
            transition={{
              duration:    2.2,
              repeat:      Infinity,
              repeatDelay: 4,
              ease:        "linear",
              delay:       3.2,
            }}
          />

          {/* Second pulse — offset timing for realism */}
          <motion.circle
            cx="300"
            cy="378"
            r="3"
            fill="#F9F6F2"
            style={{ opacity: 0.6 }}
            animate={{
              cy:      [378, 622],
              opacity: [0.6, 0  ],
            }}
            transition={{
              duration:    2.2,
              repeat:      Infinity,
              repeatDelay: 4,
              ease:        "linear",
              delay:       5.8,
            }}
          />

          {/* ════════════════════════════════════════
              AXON TERMINALS — synaptic boutons
              Three branches at the bottom
          ════════════════════════════════════════ */}
          <motion.path
            d="M 300 622 Q 262 658 242 688"
            stroke="#C4475B"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 3.4 }}
          />
          <motion.path
            d="M 300 622 Q 295 662 292 694"
            stroke="#C4475B"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 3.6 }}
          />
          <motion.path
            d="M 300 622 Q 338 658 358 688"
            stroke="#C4475B"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 3.8 }}
          />

          {/* Terminal bulbs — synaptic knobs */}
          {([[242, 688], [292, 694], [358, 688]] as [number, number][]).map(
            ([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={6}
                fill="#C4475B"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale:   1,
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  scale:   { delay: 4.0 + i * 0.2, duration: 0.4 },
                  opacity: {
                    delay:    4.2 + i * 0.2,
                    duration: 3,
                    repeat:   Infinity,
                    ease:     "easeInOut",
                  },
                }}
              />
            )
          )}

          {/* ════════════════════════════════════════
              GUT-BRAIN AXIS
              Wavy line = enteric nervous system
              Dashed connection = vagus nerve pathway
          ════════════════════════════════════════ */}

          {/* Enteric nervous system wave */}
          <motion.path
            d="M 155 732 Q 192 716 228 732
               Q 264 748 300 732
               Q 336 716 372 732
               Q 408 748 444 732"
            stroke="#C4475B"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 4.2 }}
          />

          {/* Vagus nerve — dashed connection */}
          <motion.path
            d="M 292 694 Q 296 712 300 732"
            stroke="#C9A055"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="4 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 4.4 }}
          />

          {/* Small gut plexus nodes on the wave */}
          {([[228, 732], [300, 732], [372, 732]] as [number, number][]).map(
            ([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={3}
                fill="#C9A055"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: 4.8 + i * 0.15 }}
              />
            )
          )}

        </svg>
      </motion.div>
    </div>
  );
} 



-----
"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ════════════════════════════════════════════════════════════════
   PALETTE
   ════════════════════════════════════════════════════════════════ */
const CRIMSON = "#9B1B30";
const ROSE = "#C4475B";
const GOLD = "#C9A055";
const CREAM = "#F9F6F2";
const MUTED = "#7A3340"; // desaturated crimson for degenerated neurons

/* ════════════════════════════════════════════════════════════════
   REUSABLE: TREE-BRANCH DENDRITE
   Recursive forking with tapering stroke width.
   ════════════════════════════════════════════════════════════════ */
type BranchProps = {
  d: string;
  width: number;
  opacity: number;
  delay: number;
  color?: string;
  duration?: number;
};

const Branch = ({
  d,
  width,
  opacity,
  delay,
  color = ROSE,
  duration = 2,
}: BranchProps) => (
  <motion.path
    d={d}
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity }}
    transition={{ duration, ease: "easeInOut", delay }}
  />
);

/* ════════════════════════════════════════════════════════════════
   HERO NEURON — classic pear-shaped soma, tree dendrites,
   beaded myelin with Nodes of Ranvier, saltatory AP pulse,
   NT vesicle release into the cleft.
   ════════════════════════════════════════════════════════════════ */
const HeroNeuron = () => {
  // Saltatory pulse jumps between these y-positions (Nodes of Ranvier)
  const nodes = [378, 418, 458, 498, 538, 578, 618];

  return (
    <g>
      {/* ─── DENDRITES — tree-branching with tapering width ─── */}

      {/* LEFT DENDRITE TREE */}
      <Branch d="M 278 258 Q 240 220 205 185" width={2.2} opacity={0.75} delay={0.1} />
      <Branch d="M 240 220 Q 215 195 195 160" width={1.4} opacity={0.55} delay={0.4} />
      <Branch d="M 240 220 Q 220 210 195 215" width={1.4} opacity={0.55} delay={0.4} />
      <Branch d="M 215 195 Q 200 178 188 158" width={0.9} opacity={0.35} delay={0.7} />
      <Branch d="M 215 195 Q 198 195 185 192" width={0.7} opacity={0.3} delay={0.8} />
      <Branch d="M 205 185 Q 188 168 178 148" width={1} opacity={0.4} delay={0.6} />
      <Branch d="M 178 148 Q 170 138 168 125" width={0.5} opacity={0.25} delay={1.0} />
      <Branch d="M 178 148 Q 162 145 152 138" width={0.5} opacity={0.25} delay={1.05} />

      {/* TOP DENDRITE TREE */}
      <Branch d="M 295 248 Q 288 200 282 158" width={2.2} opacity={0.75} delay={0.05} />
      <Branch d="M 288 200 Q 270 175 258 145" width={1.4} opacity={0.55} delay={0.35} />
      <Branch d="M 288 200 Q 308 178 318 148" width={1.4} opacity={0.55} delay={0.35} />
      <Branch d="M 282 158 Q 275 138 268 122" width={1} opacity={0.4} delay={0.6} />
      <Branch d="M 282 158 Q 292 138 300 120" width={1} opacity={0.4} delay={0.6} />
      <Branch d="M 270 175 Q 252 162 240 148" width={0.7} opacity={0.3} delay={0.85} />
      <Branch d="M 308 178 Q 322 162 332 145" width={0.7} opacity={0.3} delay={0.85} />
      <Branch d="M 268 122 Q 262 110 258 100" width={0.5} opacity={0.25} delay={1.0} />
      <Branch d="M 300 120 Q 305 108 308 98" width={0.5} opacity={0.25} delay={1.0} />

      {/* RIGHT DENDRITE TREE */}
      <Branch d="M 322 258 Q 360 220 395 185" width={2.2} opacity={0.75} delay={0.15} />
      <Branch d="M 360 220 Q 385 195 405 160" width={1.4} opacity={0.55} delay={0.45} />
      <Branch d="M 360 220 Q 380 210 405 215" width={1.4} opacity={0.55} delay={0.45} />
      <Branch d="M 385 195 Q 400 178 412 158" width={0.9} opacity={0.35} delay={0.75} />
      <Branch d="M 385 195 Q 402 195 415 192" width={0.7} opacity={0.3} delay={0.85} />
      <Branch d="M 395 185 Q 412 168 422 148" width={1} opacity={0.4} delay={0.65} />
      <Branch d="M 422 148 Q 430 138 432 125" width={0.5} opacity={0.25} delay={1.05} />
      <Branch d="M 422 148 Q 438 145 448 138" width={0.5} opacity={0.25} delay={1.1} />

      {/* LEFT HORIZONTAL DENDRITE */}
      <Branch d="M 262 290 Q 215 285 175 268" width={1.8} opacity={0.65} delay={0.3} />
      <Branch d="M 215 285 Q 195 275 175 258" width={1.1} opacity={0.4} delay={0.6} />
      <Branch d="M 175 268 Q 158 262 145 252" width={0.7} opacity={0.3} delay={0.9} />
      <Branch d="M 175 268 Q 160 278 148 280" width={0.6} opacity={0.28} delay={0.95} />

      {/* RIGHT HORIZONTAL DENDRITE */}
      <Branch d="M 338 290 Q 385 285 425 268" width={1.8} opacity={0.65} delay={0.3} />
      <Branch d="M 385 285 Q 405 275 425 258" width={1.1} opacity={0.4} delay={0.6} />
      <Branch d="M 425 268 Q 442 262 455 252" width={0.7} opacity={0.3} delay={0.9} />
      <Branch d="M 425 268 Q 440 278 452 280" width={0.6} opacity={0.28} delay={0.95} />

      {/* ─── SOMA — classic pear/teardrop shape ─── */}

      {/* Outer glow */}
      <motion.ellipse
        cx="300" cy="295" rx="58" ry="52"
        fill={CRIMSON}
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pear-shaped soma using path */}
      <motion.path
        d="M 300 240
           C 340 240, 352 270, 350 300
           C 348 328, 330 348, 300 350
           C 270 348, 252 328, 250 300
           C 248 270, 260 240, 300 240 Z"
        fill={CRIMSON}
        animate={{ opacity: [0.4, 0.55, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Nucleus */}
      <motion.circle
        cx="300" cy="293" r="17"
        fill={ROSE}
        animate={{ opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Nucleolus */}
      <motion.circle
        cx="300" cy="293" r="5"
        fill={CREAM}
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ─── AXON HILLOCK — tapering naturally from soma ─── */}
      <motion.path
        d="M 285 345 Q 300 360 315 345 Q 312 365 300 378"
        fill={CRIMSON}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 1.0 }}
      />

      {/* ─── AXON — long trunk ─── */}
      <motion.path
        d="M 300 378 Q 304 480 300 580 Q 297 610 300 638"
        stroke={ROSE}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.65 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 1.2 }}
      />

      {/* ─── MYELIN SHEATHS — beaded capsules with Nodes of Ranvier ─── */}
      {[388, 428, 468, 508, 548, 588].map((y, i) => (
        <g key={y}>
          {/* Outer sheath glow */}
          <motion.ellipse
            cx="300" cy={y + 16} rx="10" ry="18"
            fill={GOLD}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1, delay: 1.8 + i * 0.15 }}
          />
          {/* Main capsule body */}
          <motion.ellipse
            cx="300" cy={y + 16} rx="7.5" ry="16"
            fill={GOLD}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.75, scaleY: 1 }}
            transition={{ duration: 0.8, delay: 1.8 + i * 0.15 }}
            style={{ transformOrigin: `300px ${y + 16}px` }}
          />
          {/* Inner highlight */}
          <motion.ellipse
            cx="298" cy={y + 12} rx="2" ry="6"
            fill={CREAM}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: 1, delay: 2 + i * 0.15 }}
          />
        </g>
      ))}

      {/* ─── SALTATORY AP PULSE — jumps node to node ─── */}
      {nodes.map((y, i) => (
        <motion.circle
          key={`pulse-${y}`}
          cx="300"
          cy={y}
          r="6"
          fill={GOLD}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.4, 1, 0],
          }}
          transition={{
            duration: 0.35,
            repeat: Infinity,
            repeatDelay: 6.5,
            delay: 3 + i * 0.18,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Bright flash at hillock when AP fires */}
      <motion.circle
        cx="300" cy="378" r="10"
        fill={CREAM}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatDelay: 7,
          delay: 2.8,
        }}
      />

      {/* ─── AXON TERMINALS — three branches ─── */}
      <Branch d="M 300 638 Q 265 670 240 700" width={2} opacity={0.65} delay={3.4} duration={1.2} />
      <Branch d="M 300 638 Q 298 672 295 705" width={2} opacity={0.65} delay={3.5} duration={1.2} />
      <Branch d="M 300 638 Q 335 670 360 700" width={2} opacity={0.65} delay={3.6} duration={1.2} />

      {/* Terminal boutons */}
      {([[240, 700], [295, 705], [360, 700]] as [number, number][]).map(
        ([cx, cy], i) => (
          <g key={`bouton-${i}`}>
            <motion.circle
              cx={cx} cy={cy} r={9}
              fill={ROSE}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0.5, 0.85, 0.5] }}
              transition={{
                scale: { delay: 4 + i * 0.15, duration: 0.4 },
                opacity: {
                  delay: 4.2 + i * 0.15,
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
            {/* Inner bouton highlight */}
            <motion.circle
              cx={cx - 2} cy={cy - 2} r={3}
              fill={CREAM}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 4.4 + i * 0.15 }}
            />
          </g>
        )
      )}

      {/* ─── NT VESICLE RELEASE — gold dots cross the cleft ─── */}
      {([[240, 700, 220, 745], [295, 705, 295, 750], [360, 700, 380, 745]] as [
        number, number, number, number
      ][]).map(([sx, sy, tx, ty], i) => (
        <g key={`nt-${i}`}>
          {[0, 1, 2].map((j) => (
            <motion.circle
              key={j}
              r={2}
              fill={GOLD}
              initial={{ cx: sx, cy: sy, opacity: 0 }}
              animate={{
                cx: [sx, tx + (j - 1) * 4],
                cy: [sy, ty],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 6,
                delay: 4.5 + i * 0.15 + j * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </g>
      ))}
    </g>
  );
};

/* ════════════════════════════════════════════════════════════════
   POSTSYNAPTIC NEURON — small, receives NTs, lights up briefly
   ════════════════════════════════════════════════════════════════ */
type PostNeuronProps = {
  x: number;
  y: number;
  delay: number;
  flip?: boolean;
};

const PostsynapticNeuron = ({ x, y, delay, flip = false }: PostNeuronProps) => {
  const scale = 0.55;
  const dir = flip ? -1 : 1;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Receiving dendrites pointing UP toward presynaptic boutons */}
      <Branch d={`M 0 0 Q ${-20 * dir} -30 ${-40 * dir} -55`} width={2} opacity={0.6} delay={delay} />
      <Branch d={`M 0 0 Q 0 -30 ${5 * dir} -60`} width={2} opacity={0.6} delay={delay + 0.05} />
      <Branch d={`M 0 0 Q ${20 * dir} -30 ${40 * dir} -55`} width={2} opacity={0.6} delay={delay + 0.1} />
      <Branch d={`M ${-20 * dir} -30 Q ${-32 * dir} -42 ${-45 * dir} -60`} width={1.2} opacity={0.4} delay={delay + 0.3} />
      <Branch d={`M ${20 * dir} -30 Q ${32 * dir} -42 ${45 * dir} -60`} width={1.2} opacity={0.4} delay={delay + 0.3} />

      {/* Soma — pear-shaped, smaller */}
      <motion.ellipse
        cx="0" cy="25" rx="32" ry="28"
        fill={CRIMSON}
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5.5,
        }}
      />
      <motion.circle
        cx="0" cy="22" r="9"
        fill={ROSE}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5.5,
        }}
      />

      {/* Excitation flash when NT binds */}
      <motion.circle
        cx="0" cy="25" r="40"
        fill={GOLD}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.25, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: 6.4,
          delay: 5.6,
        }}
      />

      {/* Downward axon stub */}
      <Branch d="M 0 53 Q 2 90 0 130" width={1.8} opacity={0.5} delay={delay + 0.5} />
    </g>
  );
};

/* ════════════════════════════════════════════════════════════════
   DEGENERATED NEURON — varied pathologies, faded, failing pulses
   variant: "atrophied" | "demyelinated" | "fading"
   ════════════════════════════════════════════════════════════════ */
type DegenProps = {
  x: number;
  y: number;
  scale?: number;
  variant: "atrophied" | "demyelinated" | "fading";
  delay?: number;
};

const DegeneratedNeuron = ({
  x,
  y,
  scale = 0.4,
  variant,
  delay = 0,
}: DegenProps) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity={0.35}>
      {variant === "atrophied" && (
        <>
          {/* Shrunken, retracted dendrites — short stubs */}
          <Branch d="M -15 -10 Q -25 -25 -32 -42" width={1.2} opacity={0.4} delay={delay} color={MUTED} />
          <Branch d="M 0 -15 Q 2 -32 -3 -48" width={1.2} opacity={0.4} delay={delay + 0.1} color={MUTED} />
          <Branch d="M 15 -10 Q 25 -25 32 -40" width={1.2} opacity={0.4} delay={delay + 0.2} color={MUTED} />
          <Branch d="M -32 -42 Q -38 -50 -40 -55" width={0.6} opacity={0.3} delay={delay + 0.4} color={MUTED} />
          <Branch d="M 32 -40 Q 38 -48 40 -52" width={0.6} opacity={0.3} delay={delay + 0.4} color={MUTED} />

          {/* Shrunken soma */}
          <motion.ellipse
            cx="0" cy="10" rx="22" ry="20"
            fill={MUTED}
            animate={{ opacity: [0.3, 0.45, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="0" cy="8" r="6" fill={ROSE} opacity={0.5} />

          {/* Truncated axon */}
          <Branch d="M 0 30 Q 3 60 0 88" width={1.8} opacity={0.45} delay={delay + 0.3} color={MUTED} />
        </>
      )}

      {variant === "demyelinated" && (
        <>
          {/* Normal-ish dendrites */}
          <Branch d="M -20 -15 Q -35 -35 -50 -55" width={1.4} opacity={0.45} delay={delay} color={MUTED} />
          <Branch d="M 0 -20 Q 5 -45 -2 -70" width={1.4} opacity={0.45} delay={delay + 0.1} color={MUTED} />
          <Branch d="M 20 -15 Q 35 -35 50 -55" width={1.4} opacity={0.45} delay={delay + 0.2} color={MUTED} />
          <Branch d="M -35 -35 Q -45 -45 -55 -60" width={0.8} opacity={0.35} delay={delay + 0.4} color={MUTED} />
          <Branch d="M 35 -35 Q 45 -45 55 -60" width={0.8} opacity={0.35} delay={delay + 0.4} color={MUTED} />

          {/* Soma */}
          <motion.ellipse
            cx="0" cy="15" rx="28" ry="25"
            fill={MUTED}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="0" cy="13" r="8" fill={ROSE} opacity={0.55} />

          {/* Axon */}
          <Branch d="M 0 38 Q 3 90 0 145" width={2} opacity={0.5} delay={delay + 0.3} color={MUTED} />

          {/* BROKEN/FRAGMENTED myelin — irregular spacing & sizes */}
          {[55, 78, 108, 132].map((my, i) => (
            <motion.ellipse
              key={my}
              cx={i % 2 === 0 ? -2 : 2}
              cy={my}
              rx={i === 1 ? 3 : 5}
              ry={i === 1 ? 6 : 10}
              fill={GOLD}
              animate={{ opacity: [0.4, 0.2, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Failing pulse — starts but fades partway down */}
          <motion.circle
            cx="0" r="4" fill={GOLD}
            initial={{ cy: 40, opacity: 0 }}
            animate={{
              cy: [40, 95, 95],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeOut",
            }}
          />
        </>
      )}

      {variant === "fading" && (
        <>
          {/* Dissolving dendrites */}
          <motion.g
            animate={{ opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Branch d="M -18 -12 Q -32 -30 -45 -50" width={1.2} opacity={0.4} delay={delay} color={MUTED} />
            <Branch d="M 0 -18 Q 3 -40 -2 -62" width={1.2} opacity={0.4} delay={delay + 0.1} color={MUTED} />
            <Branch d="M 18 -12 Q 32 -30 45 -50" width={1.2} opacity={0.4} delay={delay + 0.2} color={MUTED} />
          </motion.g>

          {/* Fading soma */}
          <motion.ellipse
            cx="0" cy="12" rx="26" ry="23"
            fill={MUTED}
            animate={{ opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="0" cy="10" r="7" fill={ROSE}
            animate={{ opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Drifting apoptotic particles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              r={1.5}
              fill={MUTED}
              initial={{ cx: 0, cy: 12, opacity: 0 }}
              animate={{
                cx: [(i - 1.5) * 8, (i - 1.5) * 25],
                cy: [12, 12 + i * 15 + 30],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Faint axon */}
          <motion.path
            d="M 0 35 Q 3 75 0 115"
            stroke={MUTED}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            animate={{ opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </g>
  );
};

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════ */
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
    const updateDims = () => {
      setDims({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    updateDims();

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("resize", updateDims);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", updateDims);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      className="absolute inset-0 flex items-center
                 justify-center pointer-events-none overflow-hidden"
    >
      <motion.div style={{ x: moveX, y: moveY }}>
        <svg
          viewBox="0 0 600 900"
          width="700"
          height="1050"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.9 }}
        >
          {/* ─── DEGENERATED NEURONS (distributed, periphery) ─── */}
          {!isMobile && (
            <>
              <DegeneratedNeuron x={80} y={120} scale={0.42} variant="atrophied" delay={0.2} />
              <DegeneratedNeuron x={510} y={140} scale={0.4} variant="demyelinated" delay={0.4} />
              <DegeneratedNeuron x={60} y={460} scale={0.38} variant="fading" delay={0.6} />
              <DegeneratedNeuron x={525} y={490} scale={0.42} variant="atrophied" delay={0.3} />
              <DegeneratedNeuron x={90} y={760} scale={0.35} variant="demyelinated" delay={0.5} />
              <DegeneratedNeuron x={500} y={780} scale={0.38} variant="fading" delay={0.7} />
            </>
          )}

          {/* ─── HERO NEURON (centered) ─── */}
          <HeroNeuron />

          {/* ─── POSTSYNAPTIC NEURONS (below hero, receiving NTs) ─── */}
          <PostsynapticNeuron x={220} y={780} delay={3.8} />
          <PostsynapticNeuron x={300} y={790} delay={3.9} />
          <PostsynapticNeuron x={380} y={780} delay={4.0} flip />
        </svg>
      </motion.div>
    </div>
  );
}
