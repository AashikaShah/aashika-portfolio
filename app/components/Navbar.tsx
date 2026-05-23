"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home",     href: "/"         },
  { label: "Academic", href: "/academic" },
  { label: "Work",     href: "/work"     },
  { label: "Story",    href: "/story"    },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastScrollY && y > 100);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]
                   px-8 py-5 flex items-center justify-between"
        style={{
          backgroundColor: scrolled
            ? "rgba(12,10,11,0.88)" : "transparent",
          backdropFilter:  scrolled ? "blur(12px)" : "none",
          borderBottom:    scrolled
            ? "1px solid rgba(196,71,91,0.15)" : "none",
          transition: "background-color 0.4s ease",
        }}
      >
        {/* Monogram */}
        <Link href="/" style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.5rem", fontWeight: 300,
          color: "#1A1A1A", textDecoration: "none",
          letterSpacing: "0.05em",
        }}>
          AS<span style={{ color: "#9B1B30" }}>.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10
                        list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                label={link.label}
                href={link.href}
                active={pathname === link.href}
              />
            </li>
          ))}

          {/* Mail icon */}
          <li>
            <a
              href="mailto:ashah2@ithaca.edu"
              style={{
                color: "#9B1B30", fontSize: "1rem",
                textDecoration: "none", cursor: "none",
              }}
              title="Say hello"
            >
              ✉
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          style={{ background: "none", border: "none", cursor: "none" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-px w-6"
              style={{ backgroundColor: "#1A1A1A" }}
              animate={{
                opacity: menuOpen && i === 1 ? 0 : 1,
                rotate:  menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y:       menuOpen ? (i === 0 ?  6 : i === 2 ?  -6 : 0) : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y:   0 }}
            exit={{    opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99] flex flex-col
                       items-center justify-center md:hidden"
            style={{ backgroundColor: "#F9F6F2" }}
          >
            <ul className="flex flex-col items-center
                            gap-10 list-none p-0">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily:
                        "var(--font-cormorant), Georgia, serif",
                      fontSize: "2.8rem", fontWeight: 300,
                      color: "#F9F6F2", textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Individual nav link ───────────────────────────────────
function NavLink({
  href, label, active,
}: {
  href: string; label: string; active: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative pb-1"
      style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.7rem", letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: active ? "#9B1B30" : "#F9F6F2",
        textDecoration: "none",
      }}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-px"
        style={{ backgroundColor: "#9B1B30" }}
        animate={{ width: (hovered || active) ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </Link>
  );
}