// src/components/LangAvatars.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function LangSphere({ color, label, basePosition, delay, mouseRef, reduced }) {
  const ref = useRef();
  const startTime = useRef(performance.now());

  useFrame(() => {
    const t = (performance.now() - startTime.current) / 1000 - delay;
    const baseX = basePosition[0];
    const baseY = basePosition[1];
    const baseZ = basePosition[2];

    let targetX = baseX;
    let targetY = baseY;

    // Entrance slap animation only first 1.2s each
    if (!reduced) {
      if (t >= 0) {
        const duration = 1.2;
        const phase = Math.min(t / duration, 1);
        const damping = 6;
        const stiffness = 10;
        const overshoot =
          Math.exp(-damping * phase) * Math.cos(stiffness * (phase - 0.15));
        const sign = baseX >= 0 ? 1 : -1;
        targetX = baseX + sign * 4 * overshoot;
      }
    }

    // Repulsion logic after entrance mostly settled
    if (t > 0.6) {
      const mouse = mouseRef.current;
      if (mouse) {
        // project pointer to 3D plane z=0
        const { x, y } = mouse; // already normalized in -1..1 range
        // Map to scene coordinates roughly matching layout
        const sceneX = x * 6; // width scaling
        const sceneY = y * 2.5; // height scaling
        const dx = baseX - sceneX;
        const dy = baseY - sceneY;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001;
        const maxInfluence = 3.5; // radius
        if (dist < maxInfluence) {
          const force = 1 - dist / maxInfluence; // 0..1
          const repelStrength = reduced ? 0.4 : 1.1;
          targetX += (dx / dist) * force * repelStrength;
          targetY += (dy / dist) * force * 0.8 * repelStrength;
        }
      }
    }

    // Smooth spring-like interpolation to target
    const lerp = 0.12;
    ref.current.position.x += (targetX - ref.current.position.x) * lerp;
    ref.current.position.y += (targetY - ref.current.position.y) * lerp;
    ref.current.position.z = baseZ;
  });

  return (
    <group ref={ref} position={basePosition}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
        />
      </mesh>
      <Html center>
        <div
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.0em",
            textShadow: "0 0 8px #000",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

function PointerTracker({ mouseRef }) {
  useFrame(({ pointer }) => {
    // pointer.x/y already normalized -1..1 by R3F
    mouseRef.current = { x: pointer.x, y: pointer.y };
  });
  return null;
}

export default function LangAvatars() {
  const reduced = usePrefersReducedMotion();
  const mouseRef = useRef(null);
  const langs = useMemo(
    () => [
      { color: "#61dafb", label: "React" },
      { color: "#41B883", label: "Vue" },
      { color: "#F7DF1E", label: "JS" },
      { color: "#3776AB", label: "Python" },
      { color: "#4F5D95", label: "PHP" },
      { color: "#E34F26", label: "HTML" },
      { color: "#563D7C", label: "CSS" },
      { color: "#DD3C31", label: "Livewire" },
    ],
    []
  );

  const spacing = 2.1;
  const start = -((langs.length - 1) * spacing) / 2;

  return (
    <div className="w-full h-[230px] my-8 rounded-2xl bg-gradient-to-br from-gray-900/80 via-indigo-900/70 to-black/80 shadow-2xl backdrop-blur-lg border border-indigo-900/40 flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <ambientLight intensity={0.75} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <PointerTracker mouseRef={mouseRef} />
        {langs.map((lang, i) => (
          <LangSphere
            key={lang.label}
            color={lang.color}
            label={lang.label}
            basePosition={[start + i * spacing, 0, 0]}
            delay={i * 0.07}
            mouseRef={mouseRef}
            reduced={reduced}
          />
        ))}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
