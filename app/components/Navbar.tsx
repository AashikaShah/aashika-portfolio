"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home",     href: "/"         },
  { label: "Academic", href: "/academic" },
  { label: "Work",     href: "/work"     },
  { label: "Personal",    href: "/story"    },
];

const lightPages = ["/academic", "/work/campus" ,"/work/bold" , "/work/edtech"];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const pathname = usePathname();

  const isLightPage  = lightPages.includes(pathname);
  const useDarkText  = isLightPage && !scrolled;

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

  // Icon colors that match the rest of the nav
  const iconColor    = useDarkText ? "#B85C45" : "#9B1B30";
  const tooltipBg    = useDarkText ? "#2A2218" : "#111827";

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
          fontFamily:     "var(--font-cormorant), Georgia, serif",
          fontSize:       "1.5rem",
          fontWeight:     300,
          color:          useDarkText ? "#2A2218" : "#F9F6F2",
          textDecoration: "none",
          letterSpacing:  "0.05em",
          transition:     "color 0.3s ease",
        }}>
          AS<span style={{ color: useDarkText ? "#B85C45" : "#9B1B30" }}>.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                label={link.label}
                href={link.href}
                active={pathname === link.href}
                useDarkText={useDarkText}
              />
            </li>
          ))}

          {/* Mail icon with tooltip */}
          <li style={{ position: "relative", display: "inline-flex" }}>
            <a
              href="mailto:ashah2@ithaca.edu, aashikashah7@gmail.com"
              aria-label="Say hello via email"
              style={{
                color:          iconColor,
                fontSize:       "1rem",
                textDecoration: "none",
                cursor:         "pointer",
                transition:     "color 0.3s ease",
                display:        "inline-flex",
                alignItems:     "center",
              }}
              onMouseEnter={(e) => {
                const tip = e.currentTarget.querySelector("[data-tooltip]") as HTMLElement;
                if (tip) tip.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const tip = e.currentTarget.querySelector("[data-tooltip]") as HTMLElement;
                if (tip) tip.style.opacity = "0";
              }}
            >
              ✉
              <span
                data-tooltip
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: tooltipBg,
                  color: "#FFFFFF",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  padding: "0.35rem 0.7rem",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                  pointerEvents: "none",
                }}
              >
                Email
                <span style={{
                  position: "absolute", top: "100%", left: "50%",
                  transform: "translateX(-50%)",
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: `5px solid ${tooltipBg}`,
                }} />
              </span>
            </a>
          </li>

          {/* LinkedIn icon with tooltip */}
          <li style={{ position: "relative", display: "inline-flex" }}>
            <a
              href="https://www.linkedin.com/in/aashikajdshah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Let's connect on LinkedIn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const tip = e.currentTarget.querySelector("[data-tooltip]") as HTMLElement;
                if (tip) tip.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const tip = e.currentTarget.querySelector("[data-tooltip]") as HTMLElement;
                if (tip) tip.style.opacity = "0";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: iconColor, transition: "color 0.3s ease" }}
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>

              <span
                data-tooltip
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: tooltipBg,
                  color: "#FFFFFF",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  padding: "0.35rem 0.7rem",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                  pointerEvents: "none",
                }}
              >
                Let&apos;s connect on LinkedIn
                <span style={{
                  position: "absolute", top: "100%", left: "50%",
                  transform: "translateX(-50%)",
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: `5px solid ${tooltipBg}`,
                }} />
              </span>
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-px w-6"
              style={{
                backgroundColor: useDarkText ? "#2A2218" : "#F9F6F2",
                transition: "background-color 0.3s ease",
              }}
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
            style={{ backgroundColor: "#1A1010" }}
          >
            <ul className="flex flex-col items-center gap-10 list-none p-0">
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
                      fontFamily:     "var(--font-cormorant), Georgia, serif",
                      fontSize:       "2.8rem",
                      fontWeight:     300,
                      color:          pathname === link.href ? "#B85C45" : "#F9F6F2",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Mobile social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                display: "flex", gap: "1.5rem",
                marginTop: "2.5rem", alignItems: "center",
              }}
            >
              <a
                href="mailto:ashah2@ithaca.edu, aashikashah7@gmail.com"
                style={{ color: "#B85C45", fontSize: "1.2rem", textDecoration: "none" }}
              >
                ✉
              </a>
              <a
                href="https://www.linkedin.com/in/aashikajdshah"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20} height={20}
                  viewBox="0 0 24 24"
                  fill="#B85C45"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Individual nav link ───────────────────────────────────
function NavLink({
  href, label, active, useDarkText,
}: {
  href: string; label: string; active: boolean; useDarkText: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const inactiveColor  = useDarkText ? "#2A2218" : "#F9F6F2";
  const activeColor    = useDarkText ? "#B85C45" : "#9B1B30";
  const underlineColor = useDarkText ? "#B85C45" : "#9B1B30";

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative pb-1"
      style={{
        fontFamily:     "var(--font-inter), system-ui, sans-serif",
        fontSize:       "0.7rem",
        letterSpacing:  "0.15em",
        textTransform:  "uppercase",
        color:          active ? activeColor : inactiveColor,
        textDecoration: "none",
        transition:     "color 0.3s ease",
      }}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-px"
        style={{ backgroundColor: underlineColor }}
        animate={{ width: (hovered || active) ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </Link>
  );
}
