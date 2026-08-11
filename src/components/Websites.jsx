// src/components/Websites.jsx
import { resume } from "../data/resume";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Websites() {
  const sites = resume.websites || [];
  if (!sites.length) return null;
  return (
    <section className="py-24" aria-label="Live websites">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="In production"
            title="Live websites"
            description="Sites and apps I've built or contributed to that you can visit right now."
          />
        </Reveal>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site, i) => (
            <li key={site.url} className="h-full">
              <Reveal delay={i * 0.04} className="h-full">
                <div className="card card-hover flex h-full flex-col p-6">
                  <h3 className="text-base font-semibold text-white">
                    {site.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {site.description}
                  </p>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent mt-4 inline-flex items-center gap-1 text-sm font-medium"
                    aria-label={`Visit ${site.name} (opens in new tab)`}
                  >
                    Visit site <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-zinc-500">
          More projects on{" "}
          <a
            href={resume.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
