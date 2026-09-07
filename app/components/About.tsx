"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type Tab = "academic" | "personal";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

const honors = [
  { title: "Dean's List", detail: "Fall '23 · Fall '24 · Spring '25 · Fall '25" },
  { title: "BOLD Women's Leadership Scholar", detail: "Ithaca College" },
  { title: "Ithaca Achievement Program Scholar", detail: "Ithaca College" },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<Tab>("academic");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-32 px-6"
      style={{ backgroundColor: "#F9F6F2" }}
    >
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-10"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "4rem",
        }}
      >
        About Me
      </motion.h2>

      <div className="flex justify-center gap-4 mb-10">
        <button onClick={() => setActiveTab("academic")}>Academic</button>
        <button onClick={() => setActiveTab("personal")}>Personal</button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "academic" ? (
          <motion.div
            key="academic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-center">Academic content here</p>
          </motion.div>
        ) : (
          <motion.div
            key="personal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-center">Personal content coming soon</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
