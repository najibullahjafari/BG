// src/components/SocialLinks.jsx
import { resume } from "../data/resume";

function socialProfiles() {
  return [
    { label: "GitHub", href: resume.github },
    { label: "LinkedIn", href: resume.linkedin },
    { label: "Twitter", href: resume.twitter },
    { label: "StackOverflow", href: resume.stackOverflow },
    { label: "LeetCode", href: resume.LeetCode },
    { label: "CodeForces", href: resume.CodeForces },
  ].filter((s) => !!s.href);
}

export default function SocialLinks({ compact = false }) {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {socialProfiles().map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} (opens in new tab)`}
            className={`inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/25 hover:text-white ${
              compact ? "p-2.5" : "px-3 py-2 text-sm"
            }`}
          >
            <SocialIcon label={s.label} />
            {!compact && <span>{s.label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SocialIcon({ label, className = "h-4 w-4" }) {
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
          <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.23l-4.88-6.38L6.5 22H3.36l7.24-8.28L2.8 2h6.39l4.41 5.83L18.9 2Zm-1.1 18.13h1.73L7.02 3.76H5.16l12.64 16.37Z" />
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
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}
