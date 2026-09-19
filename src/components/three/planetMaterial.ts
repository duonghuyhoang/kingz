import {
  AdditiveBlending,
  Color,
  DoubleSide,
  ShaderMaterial,
  Vector3,
} from "three";

const planetVertex = /* glsl */ `
  varying vec3 vViewNormal;
  varying vec3 vViewPosition;
  varying vec3 vObjectNormal;

  void main() {
    vObjectNormal = normalize(normal);
    vViewNormal = normalize(normalMatrix * normal);

    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const planetFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uLightDirection;
  uniform vec3 uBandDark;
  uniform vec3 uBandLight;
  uniform vec3 uAtmosphere;

  varying vec3 vViewNormal;
  varying vec3 vViewPosition;
  varying vec3 vObjectNormal;

  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  }

  void main() {
    float latitude = vObjectNormal.y;
    float warp = sin(latitude * 5.0 + uTime * 0.06) * 1.5;
    float bands = sin(latitude * 13.0 + warp) * 0.5 + 0.5;
    vec3 base = mix(uBandDark, uBandLight, bands);

    base *= 0.9 + 0.2 * hash(floor(vObjectNormal * 48.0));

    vec3 normal = normalize(vViewNormal);
    float diffuse = max(dot(normal, normalize(uLightDirection)), 0.0);
    float lit = smoothstep(0.0, 0.4, diffuse);
    vec3 colour = base * (0.05 + lit * 1.15);

    vec3 viewDirection = normalize(-vViewPosition);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.0);
    colour += uAtmosphere * fresnel * (0.3 + lit * 1.1);

    gl_FragColor = vec4(colour, 1.0);
    #include <colorspace_fragment>
  }
`;

export function createPlanetMaterial() {
  return new ShaderMaterial({
    vertexShader: planetVertex,
    fragmentShader: planetFragment,
    uniforms: {
      uTime: { value: 0 },
      uLightDirection: { value: new Vector3(0.75, 0.45, 0.5).normalize() },
      uBandDark: { value: new Color("#2b1b52") },
      uBandLight: { value: new Color("#8f63e8") },
      uAtmosphere: { value: new Color("#5fd8f0") },
    },
  });
}

const ringVertex = /* glsl */ `
  varying vec3 vObjectPosition;

  void main() {
    vObjectPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragment = /* glsl */ `
  uniform float uInner;
  uniform float uOuter;
  uniform vec3 uColorInner;
  uniform vec3 uColorOuter;
  uniform float uOpacity;

  varying vec3 vObjectPosition;

  void main() {
    float radius = length(vObjectPosition.xy);
    float t = clamp((radius - uInner) / (uOuter - uInner), 0.0, 1.0);

    float alpha = smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.82, 1.0, t));

    alpha *= 0.55 + 0.45 * sin(t * 17.0);
    alpha *= 0.72 + 0.28 * sin(t * 6.0 + 1.3);

    alpha *= 1.0 - 0.92 * exp(-pow((t - 0.52) / 0.035, 2.0));
    alpha *= 1.0 - 0.6 * exp(-pow((t - 0.24) / 0.02, 2.0));

    vec3 colour = mix(uColorInner, uColorOuter, t);
    gl_FragColor = vec4(colour, alpha * uOpacity);
    #include <colorspace_fragment>
  }
`;

export function createRingMaterial(inner: number, outer: number) {
  return new ShaderMaterial({
    vertexShader: ringVertex,
    fragmentShader: ringFragment,
    uniforms: {
      uInner: { value: inner },
      uOuter: { value: outer },
      uColorInner: { value: new Color("#c9b4ff") },
      uColorOuter: { value: new Color("#5fd8f0") },
      uOpacity: { value: 0.5 },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: DoubleSide,
  });
}
