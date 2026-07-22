"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type PointerState = {
  x: number;
  y: number;
  /** Previous frame, for wake / velocity */
  px: number;
  py: number;
  vx: number;
  vy: number;
  active: boolean;
  /** 0–1 impulse from click / tap */
  strength: number;
  /** Hold to pull particles in */
  attract: boolean;
};

const COLOR_SLOW = new THREE.Color("#C2410C");
const COLOR_FAST = new THREE.Color("#FDBA74");
const COLOR_CORE = new THREE.Color("#FFF7ED");

const vertexShader = /* glsl */ `
  attribute float aSeed;
  attribute float aSpeed;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vSpeed;
  varying float vSeed;

  void main() {
    vSpeed = aSpeed;
    vSeed = aSeed;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float sizeBoost = 0.55 + aSeed * 1.1 + aSpeed * 0.85;
    gl_PointSize = uSize * sizeBoost * uPixelRatio * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorSlow;
  uniform vec3 uColorFast;
  uniform vec3 uColorCore;
  varying float vSpeed;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float soft = smoothstep(0.5, 0.05, d);
    float core = smoothstep(0.22, 0.0, d);
    float alpha = pow(soft, 1.35) * (0.4 + 0.6 * clamp(vSpeed + 0.2, 0.0, 1.0));
    alpha *= 0.8 + vSeed * 0.3;

    vec3 col = mix(uColorSlow, uColorFast, clamp(vSpeed, 0.0, 1.0));
    col = mix(col, uColorCore, core * (0.25 + vSpeed * 0.55));

    gl_FragColor = vec4(col, alpha);
  }
`;

function FluidField({
  pointer,
  count,
}: {
  pointer: React.MutableRefObject<PointerState>;
  count: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const initialized = useRef(false);

  const { positions, homes, velocities, seeds, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const homes = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
      seeds[i] = Math.random();
    }
    return { positions, homes, velocities, seeds, speeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uSize: { value: 32 },
      uPixelRatio: {
        value:
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio, 1.5)
            : 1,
      },
      uColorSlow: { value: COLOR_SLOW },
      uColorFast: { value: COLOR_FAST },
      uColorCore: { value: COLOR_CORE },
    }),
    []
  );

  useFrame((state, rawDelta) => {
    const points = pointsRef.current;
    if (!points) return;

    const dt = Math.min(rawDelta, 0.033);
    const t = state.clock.getElapsedTime();

    const halfW = state.viewport.width / 2;
    const halfH = state.viewport.height / 2;
    const width = state.viewport.width;
    const height = state.viewport.height;

    // Seed resting positions once we know the real viewport size.
    if (!initialized.current) {
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const hx = (Math.random() - 0.5) * width * 0.92;
        const hy = (Math.random() - 0.5) * height * 0.92;
        const hz = (Math.random() - 0.5) * 1.6;
        homes[ix] = hx;
        homes[ix + 1] = hy;
        homes[ix + 2] = hz;
        positions[ix] = hx;
        positions[ix + 1] = hy;
        positions[ix + 2] = hz;
      }
      initialized.current = true;
    }

    const p = pointer.current;
    const pointerX = p.x * halfW;
    const pointerY = p.y * halfH;

    p.strength *= 0.9;
    if (p.strength < 0.002) p.strength = 0;
    p.vx *= 0.88;
    p.vy *= 0.88;

    const pointerSpeed = Math.hypot(p.vx, p.vy);
    const wake = Math.min(pointerSpeed * 2.4, 1.4);

    const radius = 2.6 + p.strength * 2.4 + wake * 0.8;
    const radiusSq = radius * radius;
    const forceBase = (p.attract ? 14 : 16) + p.strength * 34 + wake * 18;
    const active = p.active || p.strength > 0.01 || wake > 0.04;

    // Spring that pulls each particle back to its home.
    const spring = 2.8;
    const maxDrift = 3.6;
    const maxDriftSq = maxDrift * maxDrift;
    const maxSpeedInv = 1 / 3.2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      const hx = homes[ix];
      const hy = homes[iy];
      const hz = homes[iz];

      let px = positions[ix];
      let py = positions[iy];
      let pz = positions[iz];

      let vx = velocities[ix];
      let vy = velocities[iy];
      let vz = velocities[iz];

      const seed = seeds[i];

      // Gentle idle drift around the home — not unbounded swim.
      const driftX = Math.sin(t * 0.35 + seed * 6.2) * 0.18;
      const driftY = Math.cos(t * 0.28 + seed * 4.1) * 0.16;
      const driftZ = Math.sin(t * 0.22 + seed * 3.3) * 0.08;
      const targetX = hx + driftX;
      const targetY = hy + driftY;
      const targetZ = hz + driftZ;

      // Always spring toward the resting spot.
      vx += (targetX - px) * spring * dt;
      vy += (targetY - py) * spring * dt;
      vz += (targetZ - pz) * spring * dt;

      if (active) {
        const dx = px - pointerX;
        const dy = py - pointerY;
        const distSq = dx * dx + dy * dy;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq) + 0.0001;
          const falloff = (1 - dist / radius) * forceBase;
          const nx = dx / dist;
          const ny = dy / dist;

          if (p.attract) {
            vx -= nx * falloff * 0.85 * dt;
            vy -= ny * falloff * 0.85 * dt;
            vx += -ny * falloff * 1.15 * dt;
            vy += nx * falloff * 1.15 * dt;
          } else {
            vx += nx * falloff * dt;
            vy += ny * falloff * dt;
            vx += -ny * falloff * 0.85 * dt;
            vy += nx * falloff * 0.85 * dt;
            vx += p.vx * falloff * 0.55 * dt;
            vy += p.vy * falloff * 0.55 * dt;
          }

          vz +=
            (Math.sin(t * 4 + seed * 6) * 0.4 + (p.attract ? -0.5 : 0.35)) *
            falloff *
            0.08 *
            dt;
        }
      }

      // Stronger damping so they settle back instead of wandering forever.
      vx *= 0.9;
      vy *= 0.9;
      vz *= 0.9;

      px += vx * dt;
      py += vy * dt;
      pz += vz * dt;

      // Hard cap: never stray too far from home (stops them vanishing off-screen).
      const ox = px - hx;
      const oy = py - hy;
      const oz = pz - hz;
      const driftSq = ox * ox + oy * oy + oz * oz;
      if (driftSq > maxDriftSq) {
        const scale = maxDrift / Math.sqrt(driftSq);
        px = hx + ox * scale;
        py = hy + oy * scale;
        pz = hz + oz * scale;
        vx *= 0.5;
        vy *= 0.5;
        vz *= 0.5;
      }

      positions[ix] = px;
      positions[iy] = py;
      positions[iz] = pz;
      velocities[ix] = vx;
      velocities[iy] = vy;
      velocities[iz] = vz;

      const speed = Math.sqrt(vx * vx + vy * vy) * maxSpeedInv;
      speeds[i] = speed > 1 ? 1 : speed;
    }

    const geometry = points.geometry;
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.aSpeed.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
}

export function HeroScene({
  pointer,
}: {
  pointer: React.MutableRefObject<PointerState>;
}) {
  const reduce = useReducedMotion();

  const count = useMemo(() => {
    if (typeof window === "undefined") return 4200;
    return window.innerWidth < 768 ? 2800 : 6200;
  }, []);

  if (reduce) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <FluidField pointer={pointer} count={count} />
    </Canvas>
  );
}
