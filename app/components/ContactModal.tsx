"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal() {
  const [open,    setOpen]    = useState(false);
  const [name,    setName]    = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("loading");

    const res = await fetch("/api/contact", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name, message }),
    });

    if (res.ok) {
      setStatus("success");
      setName("");
      setMessage("");
      setTimeout(() => {
        setStatus("idle");
        setOpen(false);
      }, 2500);
    } else {
      setStatus("error");
    }
  };

  return (
    <>
      {/* ── Floating ✉ button ───────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        title="Say hello"
        style={{
          position:        "fixed",
          bottom:          "1.8rem",
          right:           "1.8rem",
          zIndex:          200,
          width:           46,
          height:          46,
          borderRadius:    "50%",
          backgroundColor: "#1A1010",
          border:          "1px solid rgba(245,240,232,0.15)",
          color:           "#F5F0E8",
          fontSize:        "1.1rem",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          cursor:          "pointer",
          boxShadow:       "0 4px 24px rgba(0,0,0,0.25)",
          transition:      "transform 0.2s ease, background-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#9B1B30";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1A1010";
        }}
      >
        🙋🏻‍♀️
      </button>

      {/* ── Modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              style={{
                position:        "fixed",
                inset:           0,
                zIndex:          201,
                backgroundColor: "rgba(10,8,8,0.55)",
                backdropFilter:  "blur(4px)",
              }}
            />

            {/* Slide-up panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{    opacity: 0, y: 60  }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position:        "fixed",
                bottom:          "5.5rem",
                right:           "1.8rem",
                zIndex:          202,
                width:           "min(420px, calc(100vw - 2.4rem))",
                backgroundColor: "#FAF7F2",
                borderRadius:    24,
                padding:         "2rem",
                boxShadow:       "0 20px 60px rgba(0,0,0,0.3)",
                border:          "1px solid rgba(42,34,24,0.1)",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                style={{
                  position:   "absolute",
                  top:        "1rem",
                  right:      "1rem",
                  background: "none",
                  border:     "none",
                  cursor:     "pointer",
                  color:      "rgba(42,34,24,0.4)",
                  fontSize:   "1rem",
                  lineHeight: 1,
                  padding:    "0.2rem 0.4rem",
                }}
              >
                ✕
              </button>

              {status === "success" ? (
                /* ── Success state ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "1.5rem 0" }}
                >
                  <p style={{
                    fontFamily:   "var(--font-cormorant), Georgia, serif",
                    fontSize:     "2rem",
                    fontWeight:   300,
                    color:        "#2A2218",
                    marginBottom: "0.5rem",
                  }}>
                    Thank you. ✦
                  </p>
                  <p style={{
                    fontFamily:    "var(--font-inter), system-ui, sans-serif",
                    fontSize:      "0.72rem",
                    color:         "rgba(42,34,24,0.5)",
                    letterSpacing: "0.05em",
                  }}>
                    Your message found its way to me.
                  </p>
                </motion.div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit}>
                  <p style={{
                    fontFamily:    "var(--font-inter), system-ui, sans-serif",
                    fontSize:      "0.55rem",
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    color:         "#B85C45",
                    marginBottom:  "0.6rem",
                  }}>
                    Say hello
                  </p>
                  <p style={{
                    fontFamily:   "var(--font-cormorant), Georgia, serif",
                    fontSize:     "1.7rem",
                    fontWeight:   300,
                    color:        "#2A2218",
                    lineHeight:   1.1,
                    marginBottom: "1.6rem",
                  }}>
                    Leave a thought.
                  </p>

                  {/* Name (optional) */}
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      fontFamily:    "var(--font-inter), system-ui, sans-serif",
                      fontSize:      "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color:         "rgba(42,34,24,0.45)",
                      display:       "block",
                      marginBottom:  "0.4rem",
                    }}>
                      Name <span style={{ opacity: 0.5 }}>(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      style={{
                        width:        "100%",
                        background:   "rgba(42,34,24,0.05)",
                        border:       "1px solid rgba(42,34,24,0.12)",
                        borderRadius: 10,
                        padding:      "0.65rem 0.9rem",
                        fontFamily:   "var(--font-inter), system-ui, sans-serif",
                        fontSize:     "0.82rem",
                        color:        "#2A2218",
                        outline:      "none",
                        boxSizing:    "border-box",
                        transition:   "border-color 0.2s ease",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#B85C45"}
                      onBlur={(e)  => e.target.style.borderColor = "rgba(42,34,24,0.12)"}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "1.2rem" }}>
                    <label style={{
                      fontFamily:    "var(--font-inter), system-ui, sans-serif",
                      fontSize:      "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color:         "rgba(42,34,24,0.45)",
                      display:       "block",
                      marginBottom:  "0.4rem",
                    }}>
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Thank you for visiting my website today! Please leave a message here."
                      rows={4}
                      required
                      style={{
                        width:        "100%",
                        background:   "rgba(42,34,24,0.05)",
                        border:       "1px solid rgba(42,34,24,0.12)",
                        borderRadius: 10,
                        padding:      "0.65rem 0.9rem",
                        fontFamily:   "var(--font-inter), system-ui, sans-serif",
                        fontSize:     "0.82rem",
                        color:        "#2A2218",
                        outline:      "none",
                        resize:       "none",
                        boxSizing:    "border-box",
                        transition:   "border-color 0.2s ease",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#B85C45"}
                      onBlur={(e)  => e.target.style.borderColor = "rgba(42,34,24,0.12)"}
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p style={{
                      fontFamily:   "var(--font-inter), system-ui, sans-serif",
                      fontSize:     "0.7rem",
                      color:        "#9B1B30",
                      marginBottom: "0.8rem",
                    }}>
                      Something went wrong — please try again.
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading" || !message.trim()}
                    style={{
                      width:           "100%",
                      backgroundColor: status === "loading"
                        ? "rgba(42,34,24,0.4)" : "#2A2218",
                      color:           "#F5F0E8",
                      border:          "none",
                      borderRadius:    10,
                      padding:         "0.75rem",
                      fontFamily:      "var(--font-inter), system-ui, sans-serif",
                      fontSize:        "0.65rem",
                      letterSpacing:   "0.2em",
                      textTransform:   "uppercase",
                      cursor:          "pointer",
                      transition:      "background-color 0.2s ease",
                    }}
                  >
                    {status === "loading" ? "Sending..." : "Send"}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}