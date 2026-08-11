// src/components/SectionHeader.jsx
export default function SectionHeader({ eyebrow, title, description, id }) {
  return (
    <div className="mb-12 max-w-2xl" id={id}>
      {eyebrow && (
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
