"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContact() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 999 }}>
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            style={{
              position:      "absolute",
              bottom:        "calc(100% + 10px)",
              right:          0,
              background:    "rgba(12,8,10,0.92)",
              border:        "1px solid rgba(196,71,91,0.3)",
              borderRadius:   8,
              padding:       "0.4rem 0.85rem",
              whiteSpace:    "nowrap",
              fontFamily:    "var(--font-inter), system-ui, sans-serif",
              fontSize:      "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color:         "#F6F1EA",
              pointerEvents: "none",
            }}
          >
            Say hello
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href="mailto:ashah2@ithaca.edu"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        animate={{ width: hovered ? "auto" : 44 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display:        "flex",
          alignItems:     "center",
          gap:            "0.6rem",
          background:     "#C4475B",
          borderRadius:   999,
          height:          44,
          minWidth:        44,
          padding:        hovered ? "0 1.2rem" : "0",
          justifyContent: "center",
          textDecoration: "none",
          overflow:       "hidden",
          boxShadow:      "0 4px 20px rgba(196,71,91,0.4)",
          cursor:         "pointer",
        }}
      >
       
<span style={{
  fontSize:   "1.1rem",
  lineHeight:  1,
  flexShrink:  0,
}}>
  🙏🏼
</span>
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily:    "var(--font-inter), system-ui, sans-serif",
                fontSize:      "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "#F6F1EA",
                whiteSpace:    "nowrap",
                overflow:      "hidden",
              }}
            >
              ashah2@ithaca.edu
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
}