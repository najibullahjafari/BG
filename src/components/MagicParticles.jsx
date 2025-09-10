// src/components/MagicParticles.jsx
import { useEffect, useRef } from "react";

export default function MagicParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const colors = [
      "#61dafb",
      "#a78bfa",
      "#f472b6",
      "#34d399",
      "#fbbf24",
      "#f87171",
    ];
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    function createParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
      };
    }
    for (let i = 0; i < 120; i++) particles.push(createParticle());

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });
      requestAnimationFrame(animate);
    }
    animate();
    return () => {
      ctx.clearRect(0, 0, w, h);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
}
