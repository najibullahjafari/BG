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
              <ul className="flex flex-wrap gap-4 text-sm tracking-wide">
                {[
                  { label: "GitHub", href: resume.github },
                  { label: "LinkedIn", href: resume.linkedin },
                  { label: "Twitter", href: resume.twitter },
                  { label: "Portfolio", href: resume.portfolio },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      target="_blank"
                      rel="noopener"
                      href={s.href}
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-purple-100/80 hover:text-white shadow-sm shadow-black/40 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/60 transition"
                    >
                      {s.label}
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
