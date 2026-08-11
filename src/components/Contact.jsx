// src/components/Contact.jsx
import { useState } from "react";
import { resume } from "../data/resume";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import SocialLinks from "./SocialLinks";

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
    <section className="py-24" aria-label="Contact">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Contact"
            title="Let's work together"
            description="Have a project, role, or question in mind? Send a message — I usually reply within a day."
          />
        </Reveal>
        <div className="grid gap-10 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  Email
                </h3>
                <a
                  href={`mailto:${resume.email}`}
                  className="link-accent mt-2 inline-block text-base font-medium"
                >
                  {resume.email}
                </a>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  Profiles
                </h3>
                <SocialLinks />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-3">
            <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
              <TextArea
                label="Message"
                name="message"
                rows={5}
                required
                placeholder="Tell me about your project or role…"
              />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                </button>
                <StatusBadge status={status} message={message} />
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const fieldCls =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-accent-400/60 focus:bg-white/[0.06]";

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
      >
        {label}
        {required && (
          <span className="text-accent-400" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={fieldCls}
      />
    </div>
  );
}

function TextArea({ label, name, rows = 5, required = false, placeholder }) {
  const id = `contact-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
      >
        {label}
        {required && (
          <span className="text-accent-400" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={`${fieldCls} resize-y`}
      />
    </div>
  );
}

function StatusBadge({ status, message }) {
  const map = {
    submitting: {
      text: "Sending…",
      cls: "border-white/15 text-zinc-300",
    },
    success: {
      text: message || "Sent!",
      cls: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
    },
    error: {
      text: message || "Error",
      cls: "border-red-400/30 bg-red-500/10 text-red-300",
    },
  };
  const cfg = map[status];
  return (
    <span role="status" aria-live="polite">
      {cfg && (
        <span
          className={`inline-flex items-center rounded-lg border px-3 py-2 text-xs font-medium ${cfg.cls}`}
        >
          {cfg.text}
        </span>
      )}
    </span>
  );
}
