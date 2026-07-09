import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ count = 1500, mousePosition }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array>(new Float32Array(count * 3));

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color("#00ff88");
    const color2 = new THREE.Color("#00ccff");
    const color3 = new THREE.Color("#a855f7");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Sphere distribution
      const radius = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random velocity
      velocitiesRef.current[i3] = (Math.random() - 0.5) * 0.002;
      velocitiesRef.current[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocitiesRef.current[i3 + 2] = (Math.random() - 0.5) * 0.002;

      // Gradient colors
      const t = Math.random();
      let color: THREE.Color;
      if (t < 0.33) {
        color = color1.clone().lerp(color2, t / 0.33);
      } else if (t < 0.66) {
        color = color2.clone().lerp(color3, (t - 0.33) / 0.33);
      } else {
        color = color3.clone().lerp(color1, (t - 0.66) / 0.34);
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count]);

  const originalPositions = useMemo(() => positions.slice(), [positions]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = Date.now() * 0.001;

    // Mouse interaction
    const mouseX = (mousePosition.current.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePosition.current.y / window.innerHeight) * 2 + 1;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gentle floating
      posArray[i3] += velocitiesRef.current[i3] + Math.sin(time + i * 0.1) * 0.0003;
      posArray[i3 + 1] += velocitiesRef.current[i3 + 1] + Math.cos(time + i * 0.15) * 0.0003;
      posArray[i3 + 2] += velocitiesRef.current[i3 + 2] + Math.sin(time * 0.8 + i * 0.05) * 0.0002;

      // Pulse from center
      const dist = Math.sqrt(
        posArray[i3] ** 2 + posArray[i3 + 1] ** 2 + posArray[i3 + 2] ** 2
      );
      const pulse = Math.sin(time * 2 + dist * 0.5) * 0.003;
      const norm = dist > 0 ? 1 / dist : 0;
      posArray[i3] += posArray[i3] * norm * pulse;
      posArray[i3 + 1] += posArray[i3 + 1] * norm * pulse;
      posArray[i3 + 2] += posArray[i3 + 2] * norm * pulse;

      // Mouse repulsion
      const dx = posArray[i3] - mouseX * 4;
      const dy = posArray[i3 + 1] - mouseY * 4;
      const dz = posArray[i3 + 2];
      const mouseDist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (mouseDist < 2.5 && mouseDist > 0) {
        const force = (2.5 - mouseDist) * 0.02;
        posArray[i3] += (dx / mouseDist) * force;
        posArray[i3 + 1] += (dy / mouseDist) * force;
        posArray[i3 + 2] += (dz / mouseDist) * force;
      }

      // Return to original position (spring force)
      const springStrength = 0.003;
      posArray[i3] += (originalPositions[i3] - posArray[i3]) * springStrength;
      posArray[i3 + 1] += (originalPositions[i3 + 1] - posArray[i3 + 1]) * springStrength;
      posArray[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * springStrength;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.02;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosition.current.x = e.clientX;
    mousePosition.current.y = e.clientY;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={1200} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
