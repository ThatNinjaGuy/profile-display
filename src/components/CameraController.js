import React from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const CameraController = ({ orbitControlsEnabled }) => {
  const { camera, gl } = useThree();

  return (
    <OrbitControls
      args={[camera, gl.domElement]}
      enablePan={orbitControlsEnabled}
      enableZoom={orbitControlsEnabled}
      enableRotate={orbitControlsEnabled}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      minDistance={5}
      maxDistance={100}
    />
  );
};
