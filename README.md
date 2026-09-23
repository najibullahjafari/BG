# BG — Najibullah Jafari Portfolio

A responsive, accessible developer portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

**Live site:** https://najibullahjafari.github.io/BG/

## What it includes

- Hero positioning with proof points and clear work/contact CTAs
- Data-driven work, capabilities, experience, live websites, education, and mentoring sections
- Keyboard-accessible project gallery with focus management and mobile-friendly controls
- Responsive navigation with scroll spy, mobile focus restoration, and reduced-motion support
- Contact delivery through Appwrite with a Formspree fallback
- Shared visual tokens for surfaces, borders, accent colors, and card styling
- Local portfolio data fallback when remote Appwrite content is unavailable

## Structure

```text
src/
  components/        Portfolio sections and shared UI
  data/resume.js     Local fallback content
  lib/appwrite.js    Appwrite data and contact delivery
  lib/PortfolioContext.jsx
  lib/usePortfolio.js
  index.css          Tailwind directives and design tokens
  App.jsx            Page composition and portfolio provider
```

## Data flow

`PortfolioProvider` loads remote portfolio content through Appwrite and exposes the resulting data through `usePortfolio()`. The bundled `src/data/resume.js` content remains available as a reliable local fallback, so the public page can still render when remote data is unavailable.

## Contact flow

The contact form tries Appwrite first. If the request fails or Appwrite is not storing messages, it retries through Formspree. When both services fail, the UI provides a direct-email fallback.

## Development

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Deployment

The project is configured for GitHub Pages with the `/BG/` Vite base path. Build output is deployed through the existing `gh-pages` workflow.

## Accessibility notes

The portfolio preserves visible focus styles, supports keyboard navigation in the gallery, traps focus while the gallery is open, restores focus when it closes, labels external links, and respects `prefers-reduced-motion`.

## License

MIT. See `LICENSE`.
