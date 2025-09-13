// src/components/Contact.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { resume } from "../data/resume";
const __motionContact = motion;

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.target);
    try {
      // Simple email sending via Formspree (user can replace with backend)
      const resp = await fetch("https://formspree.io/f/mbjeelpk", {
        // placeholder form id
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (resp.ok) {
        setStatus("success");
        setMessage("Message sent successfully!");
        e.target.reset();
      } else {
        throw new Error("Failed");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to send. Please email me directly.");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section className="relative py-28 text-white" id="contact">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-tight drop-shadow-xl"
        >
          Reach Out
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2 flex flex-col items-start justify-center space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-pink-300 mb-2">
                Direct Email
              </h3>
              <a
                href={`mailto:${resume.email}`}
                className="text-lg font-medium text-purple-200 hover:text-white underline decoration-pink-400/40 underline-offset-4"
              >
                {resume.email}
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-pink-300 mb-2">
                Social Links
              </h3>
              <ul className="flex flex-wrap gap-3 text-sm tracking-wide">
                {[
                  { label: "GitHub", href: resume.github },
                  { label: "LinkedIn", href: resume.linkedin },
                  { label: "Twitter", href: resume.twitter },
                  { label: "StackOverflow", href: resume.stackOverflow },
                  { label: "CodeForces", href: resume.CodeForces },
                  { label: "Portfolio", href: resume.portfolio },
                ]
                  .filter((s) => !!s.href)
                  .map((s) => (
                    <li key={s.label}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={s.href}
                        aria-label={s.label}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-purple-100/80 hover:text-white shadow-sm shadow-black/40 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/60 transition"
                      >
                        <SocialIcon label={s.label} />
                        <span className="hidden sm:inline">{s.label}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <p className="text-[13px] leading-relaxed text-purple-200/70 max-w-sm">
              Prefer a direct message? Use the magical glass form. Your message
              glides through an ethereal conduit straight to my inbox.
            </p>
          </div>

          <div className="md:col-span-3 relative">
            <div
              className="absolute -inset-0.5 bg-gradient-to-br from-fuchsia-500/40 via-purple-500/30 to-indigo-500/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition"
              aria-hidden="true"
            />
            <form
              onSubmit={handleSubmit}
              className="relative group rounded-3xl p-px bg-gradient-to-br from-white/20 via-white/5 to-white/10 shadow-2xl backdrop-blur-xl border border-white/10"
            >
              <div className="relative rounded-3xl bg-[#0b0b14]/70 p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FloatingField
                    label="Name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your Name"
                  />
                  <FloatingField
                    label="Email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                  />
                </div>
                <FloatingTextArea
                  label="Message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your idea or project..."
                />
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="relative inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-sm tracking-wide bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 shadow-lg shadow-fuchsia-900/30 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                  <StatusBadge status={status} message={message} />
                </div>
                <div className="pointer-events-none absolute inset-px rounded-[calc(1.5rem-1px)] bg-[radial-gradient(circle_at_20%_15%,rgba(236,72,153,0.15),transparent_65%)] opacity-80" />
              </div>
            </form>
          </div>
        </div>
        <div className="mt-16 text-center text-xs tracking-wide text-purple-300/60">
          © {new Date().getFullYear()} {resume.name}. All rights reserved.
        </div>
      </div>
    </section>
  );
}

function FloatingField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}) {
  return (
    <label className="group/field relative block">
      <span className="text-[11px] uppercase tracking-wider font-semibold text-pink-300/80 ml-1">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl bg-white/5 focus:bg-white/10 border border-white/10 focus:border-pink-400/40 px-4 py-3 text-sm text-white placeholder-purple-300/30 shadow-inner shadow-black/40 outline-none transition"
      />
    </label>
  );
}

function FloatingTextArea({
  label,
  name,
  rows = 5,
  required = false,
  placeholder,
}) {
  return (
    <label className="group/area relative block">
      <span className="text-[11px] uppercase tracking-wider font-semibold text-pink-300/80 ml-1">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full resize-y rounded-xl bg-white/5 focus:bg-white/10 border border-white/10 focus:border-pink-400/40 px-4 py-3 text-sm text-white placeholder-purple-300/30 shadow-inner shadow-black/40 outline-none transition"
      />
    </label>
  );
}

function StatusBadge({ status, message }) {
  if (status === "idle") return null;
  const map = {
    submitting: {
      text: "Sending...",
      cls: "bg-gradient-to-r from-indigo-500/30 to-fuchsia-500/30 text-purple-100",
    },
    success: {
      text: message || "Sent!",
      cls: "bg-green-500/20 text-green-300 border border-green-400/30",
    },
    error: {
      text: message || "Error",
      cls: "bg-red-500/20 text-red-300 border border-red-400/30",
    },
  };
  const cfg = map[status];
  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-medium tracking-wide shadow-inner shadow-black/30 ${cfg.cls}`}
    >
      {cfg.text}
    </span>
  );
}

function SocialIcon({ label, className = "w-4 h-4" }) {
  const common = {
    className,
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };
  switch (label) {
    case "GitHub":
      return (
        <svg {...common}>
          <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.85 9.71.5.1.68-.23.68-.5 0-.25-.01-.92-.02-1.8-2.79.62-3.38-1.37-3.38-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.65.07-.64.07-.64 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.37-2.23-.26-4.57-1.14-4.57-5.09 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .85-.28 2.8 1.05a9.4 9.4 0 0 1 5.1 0c1.95-1.33 2.8-1.05 2.8-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.96-2.35 4.82-4.59 5.07.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.61.69.5A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.55v-5.3c0-1.26-.02-2.88-1.76-2.88-1.77 0-2.04 1.38-2.04 2.79v5.39H9.55V9h3.4v1.56h.05c.47-.89 1.62-1.83 3.33-1.83 3.56 0 4.22 2.34 4.22 5.37v6.35ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.57 20.45h3.55V9H3.57v11.45Z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg {...common}>
          <path d="M20.9 6.33c.01.15.01.29.01.44 0 4.53-3.45 9.75-9.75 9.75-1.94 0-3.75-.57-5.27-1.55.27.03.54.05.82.05 1.61 0 3.1-.55 4.28-1.47a3.43 3.43 0 0 1-3.2-2.38c.21.04.43.06.66.06.32 0 .63-.04.93-.12a3.42 3.42 0 0 1-2.74-3.35v-.04c.46.25.99.4 1.56.42a3.41 3.41 0 0 1-1.05-4.57 9.73 9.73 0 0 0 7.06 3.58 3.85 3.85 0 0 1-.08-.78 3.41 3.41 0 0 1 5.9-2.33 6.73 6.73 0 0 0 2.17-.83 3.43 3.43 0 0 1-1.5 1.88 6.86 6.86 0 0 0 1.97-.54 7.37 7.37 0 0 1-1.71 1.77Z" />
        </svg>
      );
    case "LeetCode":
      return (
        <svg {...common} viewBox="0 0 48 48">
          <path d="M29.87 7.43a2.25 2.25 0 1 1 3.26 3.1L20.3 23.64l12.83 12.8a2.25 2.25 0 1 1-3.18 3.19L15.5 25.19a2.25 2.25 0 0 1 0-3.17L29.87 7.43Z" />
          <path d="M34.16 20.5h5.59a2.25 2.25 0 1 1 0 4.5h-5.59a2.25 2.25 0 1 1 0-4.5Z" />
        </svg>
      );
    case "StackOverflow":
      return (
        <svg {...common}>
          <path d="M17 19v5H6v-5H3v8h17v-8h-3Zm-8.7-1.9.62-2.94L16.6 16l-.62 2.94-7.68-1.84Zm1.65-6.62 1.28-2.68 8.7 4.16-1.28 2.68-8.7-4.16ZM14.9 2l2 2.3-6.67 5.77-2-2.3L14.9 2Z" />
        </svg>
      );
    case "CodeForces":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <rect x="8" y="28" width="10" height="28" rx="2" />
          <rect x="27" y="8" width="10" height="48" rx="2" />
          <rect x="46" y="20" width="10" height="36" rx="2" />
        </svg>
      );
    case "Portfolio":
      return (
        <svg {...common}>
          <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v1h4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h4V7H7Zm3 6h26v8H7v-8Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}
