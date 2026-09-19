import { AdditiveBlending, ShaderMaterial } from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uTwinkle;
  uniform float uDrift;

  attribute vec3 aColor;
  attribute float aScale;
  attribute float aPhase;

  varying vec3 vColor;
  varying float vFade;

  void main() {
    vec3 transformed = position;

    if (uDrift > 0.0) {
      transformed.x += sin(uTime * 0.09 + aPhase * 6.2831853) * uDrift;
      transformed.y += cos(uTime * 0.07 + aPhase * 4.1) * uDrift * 0.6;
    }

    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    float pulse = 1.0 - uTwinkle + uTwinkle * (0.72 + 0.28 * sin(uTime * 1.3 + aPhase * 6.2831853));

    gl_PointSize = uSize * aScale * pulse * (1.0 / -viewPosition.z);

    vColor = aColor;
    vFade = pulse;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform float uFalloff;

  varying vec3 vColor;
  varying float vFade;

  void main() {
    float distanceToCentre = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - distanceToCentre * 2.0;
    if (strength <= 0.0) discard;
    strength = pow(strength, uFalloff);

    gl_FragColor = vec4(vColor, strength * vFade * uOpacity);
    #include <colorspace_fragment>
  }
`;

export interface ParticleMaterialOptions {
  size: number;
  opacity: number;
  falloff: number;
  twinkle: number;
  drift: number;
}

export function createParticleMaterial({
  size,
  opacity,
  falloff,
  twinkle,
  drift,
}: ParticleMaterialOptions) {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: size },
      uOpacity: { value: opacity },
      uFalloff: { value: falloff },
      uTwinkle: { value: twinkle },
      uDrift: { value: drift },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
}
