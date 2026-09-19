import { AdditiveBlending, ShaderMaterial } from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uSpeed;

  attribute vec3 aColor;
  attribute float aScale;
  attribute float aPhase;

  varying vec3 vColor;
  varying float vFade;

  void main() {
    float radius = position.x;
    float tiltX = position.y;
    float tiltZ = position.z;

    float angle = aPhase * 6.2831853 + uTime * uSpeed / pow(radius, 1.5);

    vec3 orbit = vec3(cos(angle) * radius, 0.0, sin(angle) * radius);

    float cx = cos(tiltX), sx = sin(tiltX);
    orbit = vec3(orbit.x, orbit.y * cx - orbit.z * sx, orbit.y * sx + orbit.z * cx);

    float cz = cos(tiltZ), sz = sin(tiltZ);
    orbit = vec3(orbit.x * cz - orbit.y * sz, orbit.x * sz + orbit.y * cz, orbit.z);

    vec4 viewPosition = modelViewMatrix * vec4(orbit, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    float pulse = 0.6 + 0.4 * sin(uTime * 2.2 + aPhase * 12.0);
    gl_PointSize = uSize * aScale * pulse * (1.0 / -viewPosition.z);

    vColor = aColor;
    vFade = pulse;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;

  varying vec3 vColor;
  varying float vFade;

  void main() {
    float distanceToCentre = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - distanceToCentre * 2.0;
    if (strength <= 0.0) discard;
    strength = pow(strength, 3.0);

    gl_FragColor = vec4(vColor, strength * vFade * uOpacity);
    #include <colorspace_fragment>
  }
`;

export function createOrbitMaterial() {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 115 },
      uOpacity: { value: 0.95 },
      uSpeed: { value: 1.1 },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
}
