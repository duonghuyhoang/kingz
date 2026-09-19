"use client";

import {
  useEffect,
  useMemo,
  useRef,
  type DependencyList,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import type { Group, Mesh, Sprite } from "three";
import { AdditiveBlending, CanvasTexture, MathUtils } from "three";
import {
  createGalaxyField,
  createNebulaGeometry,
  createOrbitSwarmGeometry,
  createStarfieldGeometry,
} from "./cosmosGeometry";
import { createOrbitMaterial } from "./orbitMaterial";
import { createParticleMaterial } from "./particleMaterial";
import { createPlanetMaterial, createRingMaterial } from "./planetMaterial";

const PLANET_RADIUS = 1.75;
const RING_INNER = PLANET_RADIUS * 1.45;
const RING_OUTER = PLANET_RADIUS * 2.6;

interface MotionProps {
  still: boolean;
}

export type ScrollRef = MutableRefObject<number>;

export interface DragState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
}

export type DragRef = MutableRefObject<DragState>;

function useDisposable<T extends { dispose(): void }>(
  create: () => T,
  deps: DependencyList,
) {
  const resource = useMemo(create, deps);
  useEffect(() => () => resource.dispose(), [resource]);
  return resource;
}

function Particles({
  still,
  geometry,
  material,
}: MotionProps & {
  geometry: ReturnType<typeof createStarfieldGeometry>;
  material: ReturnType<typeof createParticleMaterial>;
}) {
  useFrame((state) => {
    if (still) return;
    material.uniforms.uTime!.value = state.clock.elapsedTime;
  });

  return (
    <points>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </points>
  );
}

function Starfield({
  still,
  count,
  radius,
  size,
  opacity,
  speed,
}: MotionProps & {
  count: number;
  radius: number;
  size: number;
  opacity: number;
  speed: number;
}) {
  const ref = useRef<Group>(null);
  const geometry = useDisposable(
    () => createStarfieldGeometry(count, radius),
    [count, radius],
  );
  const material = useDisposable(
    () =>
      createParticleMaterial({
        size,
        opacity,
        falloff: 3.2,
        twinkle: 1,
        drift: 0,
      }),
    [size, opacity],
  );

  useFrame((_, delta) => {
    if (still || !ref.current) return;
    ref.current.rotation.y += delta * speed;
  });

  return (
    <group ref={ref}>
      <Particles still={still} geometry={geometry} material={material} />
    </group>
  );
}

function Nebula({ still }: MotionProps) {
  const geometry = useDisposable(() => createNebulaGeometry(3600), []);
  const material = useDisposable(
    () =>
      createParticleMaterial({
        size: 120,
        opacity: 0.085,
        falloff: 2.0,
        twinkle: 0.25,
        drift: 0.9,
      }),
    [],
  );

  return <Particles still={still} geometry={geometry} material={material} />;
}

function OrbitSwarm({ still }: MotionProps) {
  const geometry = useDisposable(
    () =>
      createOrbitSwarmGeometry(1700, PLANET_RADIUS * 1.35, PLANET_RADIUS * 4.2),
    [],
  );
  const material = useDisposable(() => createOrbitMaterial(), []);

  useFrame((state) => {
    if (still) return;
    material.uniforms.uTime!.value = state.clock.elapsedTime;
  });

  return (
    <points>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </points>
  );
}

function Moon({ still }: MotionProps) {
  const ref = useRef<Group>(null);
  const material = useDisposable(() => createPlanetMaterial(), []);

  useEffect(() => {
    material.uniforms.uBandDark!.value.set("#3a3350");
    material.uniforms.uBandLight!.value.set("#cfc6e8");
    material.uniforms.uAtmosphere!.value.set("#8f7fd6");
  }, [material]);

  useFrame((state) => {
    if (still || !ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.16;
  });

  return (
    <group ref={ref} rotation={[0.35, 0, 0]}>
      <mesh position={[PLANET_RADIUS * 3.4, 0.5, 0]}>
        <sphereGeometry args={[PLANET_RADIUS * 0.16, 32, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
}

function Planet({ still }: MotionProps) {
  const planetRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  const planetMaterial = useDisposable(() => createPlanetMaterial(), []);
  const ringMaterial = useDisposable(
    () => createRingMaterial(RING_INNER, RING_OUTER),
    [],
  );

  useFrame((state, delta) => {
    if (still) return;
    planetMaterial.uniforms.uTime!.value = state.clock.elapsedTime;
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.06;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.012;
  });

  return (
    <group rotation={[0.42, 0, 0.22]}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[PLANET_RADIUS, 96, 96]} />
        <primitive object={planetMaterial} attach="material" />
      </mesh>

      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[RING_INNER, RING_OUTER, 192]} />
        <primitive object={ringMaterial} attach="material" />
      </mesh>

      <OrbitSwarm still={still} />
      <Moon still={still} />
    </group>
  );
}

function makeGlowTexture(stops: [number, string][]) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    for (const [offset, color] of stops) gradient.addColorStop(offset, color);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  return new CanvasTexture(canvas);
}

function makeGalaxyTexture(core: string, halo: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    const half = size / 2;
    ctx.translate(half, half);
    ctx.scale(1, 0.34);
    ctx.translate(-half, -half);

    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, core);
    gradient.addColorStop(0.22, halo);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  return new CanvasTexture(canvas);
}

const GALAXY_PALETTE = [
  { core: "rgba(255,246,230,0.85)", halo: "rgba(190,150,255,0.28)" },
  { core: "rgba(230,244,255,0.8)", halo: "rgba(90,180,255,0.24)" },
  { core: "rgba(255,235,245,0.8)", halo: "rgba(226,120,200,0.22)" },
] as const;

function DistantGalaxies({ count = 24 }: { count?: number }) {
  const textures = useMemo(
    () => GALAXY_PALETTE.map(({ core, halo }) => makeGalaxyTexture(core, halo)),
    [],
  );
  useEffect(
    () => () => textures.forEach((texture) => texture.dispose()),
    [textures],
  );

  const galaxies = useMemo(() => createGalaxyField(count), [count]);

  return (
    <group>
      {galaxies.map(({ position, scale, rotation, opacity }, index) => (
        <sprite key={index} position={position} scale={scale}>
          <spriteMaterial
            map={textures[index % textures.length]}
            rotation={rotation}
            transparent
            blending={AdditiveBlending}
            depthWrite={false}
            opacity={opacity}
          />
        </sprite>
      ))}
    </group>
  );
}

function DistantSun({ still }: MotionProps) {
  const ref = useRef<Sprite>(null);
  const texture = useDisposable(
    () =>
      makeGlowTexture([
        [0, "rgba(255,255,255,0.95)"],
        [0.08, "rgba(214,240,255,0.6)"],
        [0.3, "rgba(95,216,240,0.2)"],
        [1, "rgba(95,216,240,0)"],
      ]),
    [],
  );

  useFrame((state) => {
    if (still || !ref.current) return;
    ref.current.scale.setScalar(
      7 + Math.sin(state.clock.elapsedTime * 0.35) * 0.35,
    );
  });

  return (
    <sprite ref={ref} position={[7.5, 4.5, -5]} scale={7}>
      <spriteMaterial
        map={texture}
        transparent
        blending={AdditiveBlending}
        depthWrite={false}
        opacity={0.75}
      />
    </sprite>
  );
}

function CameraRig({ still, scroll }: MotionProps & { scroll: ScrollRef }) {
  useFrame((state: RootState, delta) => {
    if (still) return;
    const ease = 1 - Math.exp(-2 * delta);
    const progress = scroll.current;
    const { camera, pointer } = state;

    camera.position.x = MathUtils.lerp(
      camera.position.x,
      pointer.x * 0.8,
      ease,
    );
    camera.position.y = MathUtils.lerp(
      camera.position.y,
      2 + progress * 5 - pointer.y * 0.6,
      ease,
    );
    camera.position.z = MathUtils.lerp(
      camera.position.z,
      13 + progress * 6,
      ease,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function DragRig({
  still,
  drag,
  children,
}: MotionProps & { drag: DragRef; children: React.ReactNode }) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const state = drag.current;

    if (!still && !state.active) {
      const decay = Math.pow(0.94, delta * 60);
      state.x += state.vx;
      state.y += state.vy;
      state.vx *= decay;
      state.vy *= decay;
    }

    state.x = MathUtils.clamp(state.x, -1.1, 1.1);

    const ease = 1 - Math.exp(-9 * delta);
    ref.current.rotation.x = MathUtils.lerp(
      ref.current.rotation.x,
      state.x,
      ease,
    );
    ref.current.rotation.y = MathUtils.lerp(
      ref.current.rotation.y,
      state.y,
      ease,
    );
  });

  return <group ref={ref}>{children}</group>;
}

export interface SceneProps {
  still?: boolean;
  scroll: ScrollRef;
  drag: DragRef;
}

export default function Scene({ still = false, scroll, drag }: SceneProps) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
      camera={{ position: [0, 2, 13], fov: 55 }}
      frameloop={still ? "demand" : "always"}
    >
      <CameraRig still={still} scroll={scroll} />

      <DistantGalaxies />

      <Nebula still={still} />

      <Starfield
        still={still}
        count={2600}
        radius={30}
        size={115}
        opacity={0.95}
        speed={0.004}
      />
      <Starfield
        still={still}
        count={1200}
        radius={16}
        size={55}
        opacity={0.7}
        speed={-0.009}
      />

      <DistantSun still={still} />

      <DragRig still={still} drag={drag}>
        <Planet still={still} />
      </DragRig>
    </Canvas>
  );
}
