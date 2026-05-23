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