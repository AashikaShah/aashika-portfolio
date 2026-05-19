"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Navigation links — easy to update later
const navLinks = [
  { label: "About",      href: "#about"      },
  { label: "Research",   href: "#research"   },
  { label: "Leadership", href: "#leadership" },
  { label: "CV",         href: "#cv"         },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false); // has user scrolled?
  const [hidden,       setHidden]       = useState(false); // should navbar hide?
  const [lastScrollY,  setLastScrollY]  = useState(0);     // previous scroll position
  const [menuOpen,     setMenuOpen]     = useState(false); // mobile menu open?

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Frosted glass triggers after 50px scroll
      setScrolled(currentY > 50);

      // Hide navbar when scrolling DOWN, show when scrolling UP
      // (like how your phone browser hides the URL bar)
      if (currentY > lastScrollY && currentY > 100) {
        setHidden(true);   // scrolling down → hide
      } else {
        setHidden(false);  // scrolling up → show
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* ── MAIN NAVBAR ─────────────────────────────────── */}
      <motion.nav
        // Slides up when hidden, slides back down when visible
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-8 py-5
                   flex items-center justify-between"
        style={{
          // Frosted glass when scrolled, transparent at top
          backgroundColor: scrolled
            ? "rgba(249, 246, 242, 0.85)"
            : "transparent",
          backdropFilter:  scrolled ? "blur(12px)" : "none",
          borderBottom:    scrolled ? "1px solid rgba(155,27,48,0.1)" : "none",
          transition: "background-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >

        {/* ── MONOGRAM LOGO ─────────────────────────────── */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="relative z-10"
          style={{
            fontFamily:    "var(--font-cormorant), Georgia, serif",
            color:         "#1A1A1A",
            fontSize:      "1.6rem",
            fontWeight:    300,
            letterSpacing: "0.05em",
            textDecoration: "none",
          }}
        >
          AS
          {/* Tiny crimson dot after monogram */}
          <span style={{ color: "#9B1B30" }}>.</span>
        </motion.a>

        {/* ── DESKTOP NAV LINKS ─────────────────────────── */}
        <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        {/* ── MOBILE HAMBURGER ──────────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          style={{ background: "none", border: "none", cursor: "none" }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-px w-6"
              style={{ backgroundColor: "#1A1A1A" }}
              animate={{
                // Middle line disappears, top/bottom rotate when open
                opacity:  menuOpen && i === 1 ? 0 : 1,
                rotate:   menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y:        menuOpen ? (i === 0 ? 6 : i === 2 ? -6 : 0) : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>

      </motion.nav>

      {/* ── MOBILE DROPDOWN MENU ──────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-[99] flex flex-col
                       items-center justify-center min-h-screen md:hidden"
            style={{ backgroundColor: "#F9F6F2" }}
          >
            <ul className="flex flex-col items-center gap-10 list-none p-0">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: i * 0.08 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily:    "var(--font-cormorant), Georgia, serif",
                      fontSize:      "2.5rem",
                      fontWeight:    300,
                      color:         "#1A1A1A",
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── INDIVIDUAL NAV LINK ────────────────────────────────────
// Separated into its own component — cleaner and reusable
function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative pb-1"
      style={{
        fontFamily:    "var(--font-inter), system-ui, sans-serif",
        fontSize:      "0.72rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color:         "#1A1A1A",
        textDecoration: "none",
      }}
    >
      {label}
      {/* Crimson underline slides in from left on hover */}
      <motion.span
        className="absolute bottom-0 left-0 h-px"
        style={{ backgroundColor: "#9B1B30" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </a>
  );
}