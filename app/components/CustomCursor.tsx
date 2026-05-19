"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    // Grow cursor when hovering links/buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, [data-hover]"));
    };

    // Hide cursor when it leaves window
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main crimson dot — snaps to cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        animate={{
          x: position.x - (isHovering ? 20 : 5),
          y: position.y - (isHovering ? 20 : 5),
          width:  isHovering ? 40 : 10,
          height: isHovering ? 40 : 10,
          opacity: isHovering ? 0.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
        style={{ backgroundColor: "#9B1B30" }}
      />

      {/* Trailing ring — lags behind slightly for depth */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          width: 32,
          height: 32,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ borderColor: "#9B1B30", opacity: 0.25 }}
      />
    </>
  );
}