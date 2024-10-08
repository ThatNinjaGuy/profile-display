import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const Background = () => {
  const backgroundTexture = useTexture("./backgroundImage.png");
  const moonTexture = useTexture("./moonLand.png");
  return (
    <>
      {/* Full sphere background */}
      <mesh scale={[1, 1, 1]} position={[0, 0, 0]}>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial map={backgroundTexture} side={THREE.BackSide} />
      </mesh>

      {/* Moon surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial map={moonTexture} />
      </mesh>
    </>
  );
};
