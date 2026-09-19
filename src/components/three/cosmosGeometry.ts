import { BufferAttribute, BufferGeometry, Color } from "three";

function scatter(power: number) {
  return Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1);
}

function build(
  count: number,
  fill: (
    index: number,
    positions: Float32Array,
    colors: Float32Array,
    scales: Float32Array,
    phases: Float32Array,
  ) => void,
) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) fill(i, positions, colors, scales, phases);

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aColor", new BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new BufferAttribute(scales, 1));
  geometry.setAttribute("aPhase", new BufferAttribute(phases, 1));
  return geometry;
}

const STAR_COLORS = ["#ffffff", "#dbe7ff", "#b9d3ff", "#ffe6c9", "#ffd0a8"];

export function createStarfieldGeometry(count: number, radius: number) {
  const palette = STAR_COLORS.map((hex) => new Color(hex));

  return build(count, (i, positions, colors, scales, phases) => {
    const r = radius * (0.6 + Math.random() * 0.4);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const colour =
      palette[Math.floor(Math.pow(Math.random(), 2) * palette.length)]!;
    const jitter = 0.6 + Math.random() * 0.6;
    colors[i * 3] = colour.r * jitter;
    colors[i * 3 + 1] = colour.g * jitter;
    colors[i * 3 + 2] = colour.b * jitter;

    scales[i] = 0.3 + Math.pow(Math.random(), 5) * 3.4;
    phases[i] = Math.random();
  });
}

const NEBULA_COLORS = [
  "#7b4ae2",
  "#7b4ae2",
  "#5b3fc4",
  "#2f4bb8",
  "#2f4bb8",
  "#38d6ee",
  "#a94ae2",
];

export function createNebulaGeometry(count: number) {
  const palette = NEBULA_COLORS.map((hex) => new Color(hex));
  const filaments = 7;

  const seeds = Array.from({ length: filaments }, () => ({
    origin: [
      (Math.random() - 0.5) * 26,
      (Math.random() - 0.5) * 12,
      -14 - Math.random() * 22,
    ] as const,
    direction: [
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 1.4,
    ] as const,
    color: palette[Math.floor(Math.random() * palette.length)]!,
    length: 9 + Math.random() * 14,
  }));

  return build(count, (i, positions, colors, scales, phases) => {
    const seed = seeds[i % filaments]!;
    const t = Math.random();

    positions[i * 3] =
      seed.origin[0] + seed.direction[0] * seed.length * t + scatter(2.4) * 6.5;
    positions[i * 3 + 1] =
      seed.origin[1] + seed.direction[1] * seed.length * t + scatter(2.4) * 4;
    positions[i * 3 + 2] =
      seed.origin[2] + seed.direction[2] * seed.length * t + scatter(2.4) * 5.5;

    const other = palette[Math.floor(Math.random() * palette.length)]!;
    const mixed = seed.color.clone().lerp(other, Math.random() * 0.45);
    const jitter = 0.5 + Math.random() * 0.8;
    colors[i * 3] = mixed.r * jitter;
    colors[i * 3 + 1] = mixed.g * jitter;
    colors[i * 3 + 2] = mixed.b * jitter;

    scales[i] = 0.9 + Math.pow(Math.random(), 2.2) * 5.5;
    phases[i] = Math.random();
  });
}

export function createOrbitSwarmGeometry(
  count: number,
  minRadius: number,
  maxRadius: number,
) {
  const warm = new Color("#ffe3bd");
  const cool = new Color("#9fe4ff");
  const brand = new Color("#b79bff");
  const mixed = new Color();

  return build(count, (i, positions, colors, scales, phases) => {
    const radius =
      minRadius + Math.pow(Math.random(), 1.7) * (maxRadius - minRadius);

    positions[i * 3] = radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * Math.PI * 0.9;
    positions[i * 3 + 2] = (Math.random() - 0.5) * Math.PI * 0.6;

    const pick = Math.random();
    mixed.copy(pick < 0.5 ? brand : pick < 0.8 ? cool : warm);
    const jitter = 0.6 + Math.random() * 0.6;
    colors[i * 3] = mixed.r * jitter;
    colors[i * 3 + 1] = mixed.g * jitter;
    colors[i * 3 + 2] = mixed.b * jitter;

    scales[i] = 0.35 + Math.pow(Math.random(), 3) * 2.2;
    phases[i] = Math.random();
  });
}

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface GalaxySprite {
  position: [number, number, number];
  scale: number;
  rotation: number;
  opacity: number;
}

export function createGalaxyField(
  count: number,
  seed = 20260919,
): GalaxySprite[] {
  const random = seededRandom(seed);

  return Array.from({ length: count }, () => {
    const radius = 34 + random() * 30;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);

    return {
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * 0.7,
        radius * Math.cos(phi),
      ] as [number, number, number],
      scale: 2.5 + random() * 6,
      rotation: random() * Math.PI,
      opacity: 0.35 + random() * 0.5,
    };
  });
}
