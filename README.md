<div align="center">

<h1>BG – Magical Developer Portfolio</h1>

<p>A modern, animated, 3D‑enhanced, accessibility‑aware developer portfolio built with React + Vite + Tailwind CSS + Framer Motion + Three.js.</p>

<p>
	<a href="https://najibullahjafari.github.io/BG/" target="_blank"><strong>Live Demo »</strong></a>
	·
	<a href="https://github.com/najibullahjafari/BG/issues">Report Bug</a>
	·
	<a href="https://github.com/najibullahjafari/BG/issues">Request Feature</a>
</p>

</div>

---

## ✨ Overview

This project is a polished personal portfolio emphasizing performance, interactivity, and a cohesive "magical dark" aesthetic. It showcases professional experience, projects, live websites, mentoring & education, and provides a contact channel. It leverages GPU‑accelerated 3D spheres, layered animated backgrounds (aurora, noise, particles), and subtle motion while respecting user accessibility preferences.

## 🧩 Core Features

- Hero section with scroll‑based motion & gradient glass layers
- Floating glassmorphic navigation bar with active island highlight + state persistence
- Skills & technology taxonomy with animated badges
- Experience timeline (data‑driven)
- Projects gallery with per‑project carousel + lightbox (keyboard accessible)
- Websites showcase (external production links)
- Education & Mentoring section (animated timeline + impact stats)
- Interactive 3D language spheres (react‑three‑fiber + pointer repulsion)
- Contact form (async submission placeholder – Formspree compatible) with status feedback
- Animated ambient layers: aurora gradients, film grain, vignette & particles
- Light / “muted glow” toggle persistence (localStorage)
- Reduced motion compliance (prefers-reduced-motion)
- Accessible focus styles, aria-current for nav, keyboard navigation in lightbox

## 🛠️ Tech Stack

| Layer              | Tools                                              |
| ------------------ | -------------------------------------------------- |
| Frontend Framework | React (Vite)                                       |
| Styling            | Tailwind CSS (custom keyframes, glassmorphism)     |
| Animation          | Framer Motion                                      |
| 3D / Canvas        | Three.js via react-three-fiber & @react-three/drei |
| Deployment         | GitHub Pages (gh-pages)                            |
| Build              | Vite (ESM, fast HMR)                               |
| Linting            | ESLint (React hooks & refresh plugins)             |

## 📂 Project Structure (Key Paths)

```
src/
	components/        Reusable UI + section components
	data/resume.js     Central structured data (skills, projects, etc.)
	assets/            Images & media
	index.css          Tailwind directives + custom layers
	App.jsx            Layout composition & section ordering
```

## 🔄 Data‑Driven Content

All portfolio data (skills, experience, projects, websites, education, mentoring) lives in `src/data/resume.js`. Updating that file automatically updates corresponding UI sections without structural changes elsewhere.

## 🔐 Accessibility & UX Considerations

- Keyboard navigation supported (lightbox: ESC / arrows)
- Focus outlines preserved for interactive elements
- `aria-current="page"` on active nav link
- Respects `prefers-reduced-motion` (disables intensive transforms)
- High‑contrast gradients & layered shadows for readability

## 🧪 Development

Prerequisites: Node.js >= 18.

Install dependencies:

```powershell
npm install
```

Run locally:

```powershell
npm run dev
```

Build production bundle:

```powershell
npm run build
```

Preview production build locally:

```powershell
npm run preview
```

## 🚀 Deployment

This project is deployed to GitHub Pages using the `gh-pages` package.

1. Ensure `homepage` in `package.json` is set to: `https://najibullahjafari.github.io/BG/`
2. Ensure `base: '/BG/'` is configured in `vite.config.js`
3. Run:
   ```powershell
   npm run deploy
   ```
4. GitHub Pages publishes from the generated `gh-pages` branch.

## 🗺️ Routing Strategy

This is a single‑page application using in‑page anchors (`#hero`, `#projects`, etc.) rather than client‑side routing libraries. Smooth scroll and scroll‑spy maintain state. LocalStorage persists active nav and glow/muted preference.

## 🖼️ Asset Handling

Project screenshots are imported in `resume.js` (ES module imports) so Vite fingerprints & copies them for production. Avoid raw `/src/...` string paths; they are not transformed in the build output.

## 🧵 Animations & Motion

- Framer Motion powers entrance, presence & scroll transforms.
- Custom Tailwind keyframes: aurora drift, gradient shift, slow spin, float, grain/noise.
- Canvas layer: interactive language spheres with pointer repulsion & spring smoothing.

## 📈 Performance Notes

- Initial JS bundle contains 3D & animation libs; future enhancement: dynamic `lazy()` import of 3D section & education timeline to reduce first paint cost.
- Image assets are static & fingerprinted; could be further optimized via responsive sources if necessary.

## 🧭 Roadmap

- [ ] Replace placeholder contact form endpoint with live Formspree / serverless handler
- [ ] Code splitting: lazy load 3D sphere component & lightbox
- [ ] Add spam protection (honeypot + optional CAPTCHA)
- [ ] ARIA labels audit & additional landmarks
- [ ] Optional theme variants (solarized / light mode)
- [ ] Automated Lighthouse CI badge

## 🤝 Contributing

Issues & feature requests welcome via the GitHub Issues tab. For substantial changes:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit (`git commit -m "feat: add amazing"`)
4. Push (`git push origin feature/amazing`)
5. Open a Pull Request

## 📬 Contact

Author: **Najibullah Jafari**  
GitHub: https://github.com/najibullahjafari  
LinkedIn: https://linkedin.com/in/najibullahjafari  
Email: najib2020202020@gmail.com

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

## ⭐ Acknowledgements

- React + Vite ecosystem
- Tailwind CSS team
- Framer Motion & react-three-fiber communities

---

If you find this portfolio useful or inspiring, consider starring the repository. Thank you!
