// src/components/Footer.jsx
import { resume } from "../data/resume";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-site flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} {resume.name}. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Built with React, Vite, and Tailwind CSS.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <SocialLinks compact />
          <a href="#hero" className="text-xs text-zinc-500 transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
