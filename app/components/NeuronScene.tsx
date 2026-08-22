// components/NeuronScene.tsx
"use client";

import React, { useRef, useState, useMemo, useCallback, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import {
  generateDendriteBranches,
  generateAxonPath,
  getTerminalBoutonPositions,
  getMyelinPositions,
  DendriteBranch,
  CRIMSON,
  CRIMSON_LIGHT,
  CRIMSON_MUTED,
  GOLD,
  GOLD_SOFT,
  CREAM,
  BG,
} from "./neuronUtils";

type Vec3 = [number, number, number];

const AXON_START: Vec3 = [-2.5, -0.3, 0];
const AXON_END: Vec3 = [5.8, 0.15, 0];
const POST_NEURON_POS: Vec3 = [7.5, 0.1, 0.3];

/* ═══════════════════════════════════════════════
   1. CameraDrift — very subtle
   ═══════════════════════════════════════════════ */
function CameraDrift() {
  const { camera } = useThree();
  useFrame(() => {
    const t = performance.now() * 0.00004;
    camera.position.x = 0.1 + Math.sin(t * 1.2) * 0.2;
    camera.position.y = 1.5 + Math.sin(t * 1.8) * 0.15;
    camera.position.z = 12 + Math.cos(t * 1.0) * 0.15;
    camera.lookAt(0, 0.5, 0);
  });
  return null;
}

/* ═══════════════════════════════════════════════
   2. Dendrites — LIGHTER, fewer branches
   ═══════════════════════════════════════════════ */
interface DendritesProps {
  origin: Vec3;
  baseDirection: Vec3;
  trunkCount: number;
  maxDepth: number;
  length: number;
  radius: number;
  color: string;
  opacity?: number;
}

function Dendrites({
  origin,
  baseDirection,
  trunkCount,
  maxDepth,
  length,
  radius,
  color,
  opacity = 0.3,
}: DendritesProps) {
  const branches = useMemo(() => {
    const allBranches: DendriteBranch[] = [];
    const originVec = new THREE.Vector3(...origin);

    for (let i = 0; i < trunkCount; i++) {
      const angle = Math.PI * (i / trunkCount) * 0.85 + Math.PI * 0.08;
      const y = Math.cos(angle);
      const x = Math.sin(angle);
      const dir = new THREE.Vector3(
        baseDirection[0] + x * 0.5,
        baseDirection[1] + y,
        baseDirection[2] + (Math.random() - 0.5) * 0.4
      ).normalize();

      generateDendriteBranches(
        originVec.clone(),
        dir,
        length,
        radius,
        0,
        maxDepth,
        allBranches
      );
    }
    return allBranches;
  }, [origin, baseDirection, trunkCount, maxDepth, length, radius]);

  return (
    <group>
      {branches.map((branch, i) => (
        <mesh key={i}>
          <tubeGeometry args={[branch.curve, 10, branch.radius, 4, false]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.25}
            transparent
            opacity={opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   3. PresynapticNeuron — SUBTLE, elegant
   ═══════════════════════════════════════════════ */
interface PresynapticNeuronProps {
  axonCurve: THREE.CatmullRomCurve3;
  boutonPositions: THREE.Vector3[];
}

function PresynapticNeuron({ axonCurve, boutonPositions }: PresynapticNeuronProps) {
  const somaRef = useRef<THREE.Mesh>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const now = performance.now();
    if (somaRef.current) {
      const mat = somaRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = 0.4 + Math.sin(now * 0.001) * 0.15;
    }
    if (nucleusRef.current) {
      const mat = nucleusRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = 0.6 + Math.cos(now * 0.0012) * 0.2;
    }
  });

  const myelinInfos = useMemo(
    () => getMyelinPositions(axonCurve, 4),
    [axonCurve]
  );

  return (
    <group>
      {/* Soma — smaller, translucent */}
      <mesh ref={somaRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 24, 18]} />
        <meshPhysicalMaterial
          color={CRIMSON}
          emissive={CRIMSON}
          emissiveIntensity={0.4}
          clearcoat={0.6}
          roughness={0.55}
          metalness={0.2}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Nucleus — subtle inner glow */}
      <mesh ref={nucleusRef} position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.25, 18, 14]} />
        <meshPhysicalMaterial
          color={CRIMSON_LIGHT}
          emissive={CRIMSON_LIGHT}
          emissiveIntensity={0.6}
          clearcoat={0.8}
          metalness={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Nucleolus — tiny bright dot */}
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.07, 10, 8]} />
        <meshStandardMaterial
          color={CREAM}
          emissive={CREAM}
          emissiveIntensity={0.5}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Dendrites — fewer, thinner, more transparent */}
      <Dendrites
        origin={[0, 0, 0]}
        baseDirection={[0, 1, 0]}
        trunkCount={5}
        maxDepth={3}
        length={1.8}
        radius={0.035}
        color={CRIMSON_LIGHT}
        opacity={0.28}
      />

      {/* Axon Hillock */}
      <mesh
        position={[-0.4, -0.5, 0]}
        rotation={[Math.PI * 0.55, 0, Math.PI * 0.08]}
      >
        <coneGeometry args={[0.15, 0.3, 6]} />
        <meshStandardMaterial
          color={CRIMSON_MUTED}
          emissive={CRIMSON_MUTED}
          emissiveIntensity={0.2}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Axon — razor thin, very subtle */}
      <mesh>
        <tubeGeometry args={[axonCurve, 32, 0.03, 5, false]} />
        <meshStandardMaterial
          color={CRIMSON_LIGHT}
          emissive={CRIMSON_LIGHT}
          emissiveIntensity={0.25}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Myelin Sheaths — small, subtle gold outlines */}
      {myelinInfos.map((info, i) => (
        <mesh key={`myelin-${i}`} position={info.position} quaternion={info.quaternion}>
          <cylinderGeometry args={[0.07, 0.06, 0.35, 8]} />
          <meshPhysicalMaterial
            color={GOLD}
            emissive={GOLD}
            emissiveIntensity={0.3}
            clearcoat={0.7}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}

      {/* Terminal Boutons — tiny */}
      {boutonPositions.map((pos, idx) => (
        <mesh key={`bouton-${idx}`} position={pos}>
          <sphereGeometry args={[0.08, 10, 8]} />
          <meshPhysicalMaterial
            color={CRIMSON_LIGHT}
            emissive={GOLD_SOFT}
            emissiveIntensity={0.5}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   4. ActionPotentialPulse — smaller, 1 trail
   ═══════════════════════════════════════════════ */
interface ActionPulseProps {
  axonCurve: THREE.CatmullRomCurve3;
  onArrive: () => void;
}

function ActionPotentialPulse({ axonCurve, onArrive }: ActionPulseProps) {
  const mainRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const tRef = useRef(0);
  const hasFiredRef = useRef(false);

  useFrame((_, delta) => {
    tRef.current += delta * 0.15;

    if (tRef.current > 1.2) {
      tRef.current = 0;
      if (!hasFiredRef.current) {
        hasFiredRef.current = true;
        onArrive();
        setTimeout(() => {
          hasFiredRef.current = false;
        }, 200);
      }
    }

    const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
    const now = performance.now();

    const t0 = clamp(tRef.current);
    const pos0 = axonCurve.getPointAt(t0);
    if (mainRef.current) {
      mainRef.current.position.copy(pos0);
      const mat = mainRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(now * 0.003) * 0.5;
    }
    if (lightRef.current) {
      lightRef.current.position.copy(pos0);
    }

    const t1 = clamp(tRef.current - 0.04);
    if (trailRef.current) {
      trailRef.current.position.copy(axonCurve.getPointAt(t1));
    }
  });

  return (
    <group>
      <mesh ref={mainRef}>
        <sphereGeometry args={[0.12, 14, 10]} />
        <meshPhysicalMaterial
          color={GOLD}
          emissive={GOLD}
          emissiveIntensity={1.5}
          clearcoat={1}
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh ref={trailRef}>
        <sphereGeometry args={[0.08, 10, 8]} />
        <meshPhysicalMaterial
          color={GOLD_SOFT}
          emissive={GOLD_SOFT}
          emissiveIntensity={0.8}
          transparent
          opacity={0.35}
        />
      </mesh>

      <pointLight
        ref={lightRef}
        color={GOLD}
        intensity={0.25}
        distance={1.5}
      />
    </group>
  );
}
/* ═══════════════════════════════════════════════
   5. NeurotransmitterParticles — fewer, subtler
   ═══════════════════════════════════════════════ */
interface NTParticlesProps {
  boutonPositions: THREE.Vector3[];
  targetPosition: Vec3;
  firing: boolean;
}

const PARTICLE_COUNT = 18;

interface ParticleState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  alive: boolean;
}

function NeurotransmitterParticles({
  boutonPositions,
  targetPosition,
  firing,
}: NTParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particleStates = useMemo<ParticleState[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        life: 0,
        alive: false,
      })),
    []
  );

  useFrame(() => {
    if (firing && boutonPositions.length > 0) {
      for (const p of particleStates) {
        if (!p.alive) {
          const idx = Math.floor(Math.random() * boutonPositions.length);
          p.position.copy(boutonPositions[idx]);
          p.velocity.set(
            (targetPosition[0] - p.position.x) * 0.12 +
              (Math.random() - 0.5) * 0.05,
            (targetPosition[1] - p.position.y) * 0.12 +
              (Math.random() - 0.5) * 0.04,
            (targetPosition[2] - p.position.z) * 0.12 +
              (Math.random() - 0.5) * 0.04
          );
          p.life = 1.2 + Math.random() * 0.4;
          p.alive = true;
          break;
        }
      }
    }

    for (const p of particleStates) {
      if (p.alive) {
        p.position.add(p.velocity.clone().multiplyScalar(0.1));
        p.velocity.x += (Math.random() - 0.5) * 0.012;
        p.velocity.y += (Math.random() - 0.5) * 0.008;
        p.velocity.z += (Math.random() - 0.5) * 0.01;
        p.life -= 0.02;
        if (p.life <= 0) {
          p.alive = false;
        }
      }
    }

    if (meshRef.current) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particleStates[i];
        if (p.alive) {
          dummy.position.copy(p.position);
          dummy.scale.setScalar(0.5 + p.life * 0.3);
        } else {
          dummy.position.set(0, -999, 0);
          dummy.scale.setScalar(0);
        }
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined!, undefined!, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.04, 6, 4]} />
      <meshStandardMaterial
        color={GOLD_SOFT}
        emissive={GOLD_SOFT}
        emissiveIntensity={0.8}
        transparent
        opacity={0.45}
      />
    </instancedMesh>
  );
}

/* ═══════════════════════════════════════════════
   6. PostsynapticNeuron — subtle, peripheral
   ═══════════════════════════════════════════════ */
interface PostsynapticNeuronProps {
  position: Vec3;
  arrived: boolean;
}

function PostsynapticNeuron({ position, arrived }: PostsynapticNeuronProps) {
  const somaRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (somaRef.current) {
      const mat = somaRef.current.material as THREE.MeshPhysicalMaterial;
      const now = performance.now();
      mat.emissiveIntensity = arrived
        ? 0.5 + Math.sin(now * 0.002) * 0.25
        : 0.15 + Math.sin(now * 0.0008) * 0.08;
    }
  });

  const shortAxonCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.3, 0),
        new THREE.Vector3(0.08, -1.0, 0.1),
        new THREE.Vector3(-0.03, -1.6, 0.2),
      ]),
    []
  );

  return (
    <group position={position} scale={[0.45, 0.45, 0.45]}>
      <mesh ref={somaRef}>
        <sphereGeometry args={[0.55, 18, 14]} />
        <meshPhysicalMaterial
          color={arrived ? GOLD_SOFT : CRIMSON_MUTED}
          emissive={arrived ? GOLD_SOFT : CRIMSON_MUTED}
          emissiveIntensity={arrived ? 0.5 : 0.2}
          clearcoat={0.5}
          roughness={0.5}
          metalness={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>

      <Dendrites
        origin={[0, 0, 0]}
        baseDirection={[0, 1, 0]}
        trunkCount={3}
        maxDepth={2}
        length={1.0}
        radius={0.025}
        color={arrived ? GOLD_SOFT : CRIMSON_MUTED}
        opacity={0.2}
      />

      <mesh>
        <tubeGeometry args={[shortAxonCurve, 10, 0.025, 4, false]} />
        <meshStandardMaterial
          color={CRIMSON_MUTED}
          emissive={CRIMSON_MUTED}
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   7. DegeneratingNeuron — ghostly, minimal
   ═══════════════════════════════════════════════ */
interface DegeneratingNeuronProps {
  position: Vec3;
  variant: "atrophied" | "demyelinated" | "fading";
  scale: number;
}

function DegeneratingNeuron({ position, variant, scale }: DegeneratingNeuronProps) {
  const somaRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (somaRef.current && variant === "fading") {
      const mat = somaRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.08 + Math.random() * 0.08;
      mat.opacity = 0.1 + Math.random() * 0.08;
    }
  });

  const dendriteBranches = useMemo(() => {
    const arr: DendriteBranch[] = [];
    const branchCount = variant === "atrophied" ? 2 : 3;
    for (let i = 0; i < branchCount; i++) {
      const angle = Math.PI * (i / branchCount) * 0.7 + Math.PI * 0.15;
      const dir = new THREE.Vector3(
        Math.sin(angle) * 0.4,
        Math.cos(angle),
        (Math.random() - 0.5) * 0.3
      ).normalize();
      generateDendriteBranches(
        new THREE.Vector3(0, 0, 0),
        dir,
        0.5,
        0.02,
        0,
        2,
        arr
      );
    }
    return arr;
  }, [variant]);

  const axonCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.3, 0),
        new THREE.Vector3(0.05, -0.7, 0.04),
      ]),
    []
  );

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh ref={somaRef}>
        <sphereGeometry args={[variant === "atrophied" ? 0.35 : 0.45, 12, 10]} />
        <meshStandardMaterial
          color={CRIMSON_MUTED}
          emissive={CRIMSON_MUTED}
          emissiveIntensity={0.12}
          transparent
          opacity={variant === "fading" ? 0.12 : 0.18}
        />
      </mesh>

      {dendriteBranches.map((branch, i) => (
        <mesh key={`dd-${i}`}>
          <tubeGeometry args={[branch.curve, 6, branch.radius * 0.4, 3, false]} />
          <meshStandardMaterial
            color={CRIMSON_MUTED}
            emissive={CRIMSON_MUTED}
            emissiveIntensity={0.06}
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}

      <mesh>
        <tubeGeometry args={[axonCurve, 5, 0.018, 3, false]} />
        <meshStandardMaterial
          color={CRIMSON_MUTED}
          emissive={CRIMSON_MUTED}
          emissiveIntensity={0.05}
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   8. InteractionLayer — smooth parallax only
   ═══════════════════════════════════════════════ */
function InteractionLayer({ children }: { children: ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (groupRef.current) {
      groupRef.current.position.x +=
        (pointer.x * 0.3 - groupRef.current.position.x) * 0.02;
      groupRef.current.position.y +=
        (pointer.y * 0.2 - groupRef.current.position.y) * 0.02;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ═══════════════════════════════════════════════
   9. SceneContent
   ═══════════════════════════════════════════════ */
function SceneContent() {
  const axonCurve = useMemo(
    () => generateAxonPath(AXON_START, AXON_END),
    []
  );
  const boutonPositions = useMemo(
    () => getTerminalBoutonPositions(axonCurve),
    [axonCurve]
  );

  const [arrived, setArrived] = useState(false);
  const [firing, setFiring] = useState(false);

  const handlePulseArrive = useCallback(() => {
    setArrived(true);
    setFiring(true);
    setTimeout(() => {
      setArrived(false);
      setFiring(false);
    }, 2200);
  }, []);

  return (
    <>
      <CameraDrift />

      <ambientLight color={CREAM} intensity={0.15} />
      <directionalLight color={GOLD_SOFT} intensity={0.06} position={[-6, 3, 10]} />
      <directionalLight color={CRIMSON} intensity={0.04} position={[5, 2, 8]} />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.4}
          intensity={0.4}
        />
        <Vignette eskil={false} offset={0.15} darkness={0.5} />
      </EffectComposer>

      {/* Only 2 degenerating neurons, pushed far back */}
      <DegeneratingNeuron position={[-4.5, 2.5, -4.0]} variant="fading" scale={0.5} />
      <DegeneratingNeuron position={[9.0, 3.0, -5.0]} variant="atrophied" scale={0.45} />

      <InteractionLayer>
        <PresynapticNeuron
          axonCurve={axonCurve}
          boutonPositions={boutonPositions}
        />
        <ActionPotentialPulse
          axonCurve={axonCurve}
          onArrive={handlePulseArrive}
        />
        <NeurotransmitterParticles
          boutonPositions={boutonPositions}
          targetPosition={POST_NEURON_POS}
          firing={firing}
        />
        <PostsynapticNeuron
          position={POST_NEURON_POS}
          arrived={arrived}
        />
      </InteractionLayer>
    </>
  );
}

/* ═══════════════════════════════════════════════
   10. NeuronScene — DEFAULT EXPORT
   ═══════════════════════════════════════════════ */
export default function NeuronScene() {
  return (
    <Canvas
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: BG,
      }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 1.5, 12], fov: 58 }}
    >
      <SceneContent />
    </Canvas>
  );
}
