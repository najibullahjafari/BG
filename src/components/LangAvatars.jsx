// src/components/LangAvatars.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Small GLSL gradient emissive shimmer material
function GradientMaterial({
  colorA = "#9333EA",
  colorB = "#DB2777",
  speed = 0.6,
}) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.uTime = state.clock.elapsedTime * speed;
    }
  });
  // Inline shader via drei's <primitive> alternative using raw material
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color(colorA) },
          uColorB: { value: new THREE.Color(colorB) },
        },
        vertexShader:
          "varying vec3 vPos; void main(){ vPos=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
        fragmentShader:
          "uniform float uTime; uniform vec3 uColorA; uniform vec3 uColorB; varying vec3 vPos; void main(){ float f=0.5+0.5*sin(uTime+vPos.y*1.4+vPos.x*1.1); vec3 col=mix(uColorA,uColorB,f); gl_FragColor=vec4(col,1.0); }",
      }),
    [colorA, colorB]
  );
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime * speed;
  });
  return <primitive ref={ref} object={material} attach="material" />;
}

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

function LangSphere({
  color,
  label,
  basePosition,
  delay,
  mouseRef,
  reduced,
  gradient,
}) {
  const ref = useRef();
  const startTime = useRef(performance.now());
  const wobbleSeed = useRef(Math.random() * 10);

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
        const duration = 1.3;
        const phase = Math.min(t / duration, 1);
        const damping = 5.8;
        const stiffness = 11.5;
        const overshoot =
          Math.exp(-damping * phase) * Math.cos(stiffness * (phase - 0.12));
        const sign = baseX >= 0 ? 1 : -1;
        targetX = baseX + sign * 4.2 * overshoot;
      }
    }

    // Repulsion logic after entrance mostly settled
    if (t > 0.55) {
      const mouse = mouseRef.current;
      if (mouse) {
        // project pointer to 3D plane z=0
        const { x, y } = mouse; // already normalized in -1..1 range
        // Map to scene coordinates roughly matching layout
        const sceneX = x * 7; // width scaling
        const sceneY = y * 3.2; // height scaling
        const dx = baseX - sceneX;
        const dy = baseY - sceneY;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001;
        const maxInfluence = 4.2; // radius
        if (dist < maxInfluence) {
          const force = 1 - dist / maxInfluence; // 0..1
          const repelStrength = reduced ? 0.35 : 1.35;
          targetX += (dx / dist) * force * repelStrength;
          targetY += (dy / dist) * force * 0.9 * repelStrength;
        }
      }
    }

    // Subtle ambient wobble (idle life)
    if (!reduced) {
      const wob = Math.sin(t * 0.9 + wobbleSeed.current) * 0.25;
      targetY += wob;
    }

    // Smooth spring-like interpolation to target
    const lerp = 0.14;
    ref.current.position.x += (targetX - ref.current.position.x) * lerp;
    ref.current.position.y += (targetY - ref.current.position.y) * lerp;
    ref.current.position.z = baseZ;

    // Slow rotation / breathing scale
    if (!reduced) {
      ref.current.rotation.y += 0.004;
      const pulse = 1 + Math.sin(t * 1.5 + wobbleSeed.current) * 0.03;
      ref.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={ref} position={basePosition}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        {gradient ? (
          <GradientMaterial colorA={gradient[0]} colorB={gradient[1]} />
        ) : (
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.65}
            roughness={0.25}
            metalness={0.35}
          />
        )}
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
      { color: "#61dafb", label: "React", gradient: ["#58c7f6", "#1e90ff"] },
      { color: "#41B883", label: "Vue", gradient: ["#41B883", "#1A5F43"] },
      { color: "#F7DF1E", label: "JS", gradient: ["#F7DF1E", "#F59E0B"] },
      { color: "#3776AB", label: "Python", gradient: ["#3776AB", "#1D4ED8"] },
      { color: "#4F5D95", label: "PHP", gradient: ["#4F5D95", "#312E81"] },
      { color: "#E34F26", label: "HTML", gradient: ["#E34F26", "#C2410C"] },
      { color: "#563D7C", label: "CSS", gradient: ["#563D7C", "#4338CA"] },
      { color: "#DD3C31", label: "Livewire", gradient: ["#DD3C31", "#9D174D"] },
    ],
    []
  );

  const spacing = 2.1;
  const start = -((langs.length - 1) * spacing) / 2;

  return (
    <div className="w-full h-[260px] my-10 rounded-2xl bg-gradient-to-br from-[#0d0d15] via-[#121228] to-[#0b0b12] shadow-[0_0_40px_-10px_rgba(139,92,246,0.55)] backdrop-blur-xl border border-indigo-800/50 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.35),transparent_60%),radial-gradient(circle_at_70%_65%,rgba(139,92,246,0.4),transparent_55%)]" />
      <Canvas shadows camera={{ position: [0, 0, 9.5], fov: 50 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[6, 8, 4]}
          intensity={1.1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-6, -5, -3]} intensity={0.6} color="#ec4899" />
        <pointLight position={[5, -4, 3]} intensity={0.55} color="#6366f1" />
        <PointerTracker mouseRef={mouseRef} />
        {langs.map((lang, i) => (
          <LangSphere
            key={lang.label}
            color={lang.color}
            label={lang.label}
            gradient={lang.gradient}
            basePosition={[start + i * spacing, 0, 0]}
            delay={i * 0.065}
            mouseRef={mouseRef}
            reduced={reduced}
          />
        ))}
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
      <div className="absolute bottom-2 right-3 text-[10px] tracking-wide uppercase text-indigo-300/40 select-none font-semibold">
        Interactive Tech Cloud
      </div>
    </div>
  );
}
