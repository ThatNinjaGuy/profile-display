import React from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export const CameraController = ({ orbitControlsEnabled }) => {
  const { camera, gl } = useThree();

  return (
    orbitControlsEnabled && (
      <OrbitControls enableDamping args={[camera, gl.domElement]} />
    )
  );
};

export const moveCamera = (
  camera,
  screenPosition,
  screenRotation,
  onComplete
) => {
  const offset = new THREE.Vector3(0, 0, 10).applyEuler(
    new THREE.Euler(...screenRotation)
  );
  const cameraPosition = new THREE.Vector3(...screenPosition).add(offset);

  gsap.to(camera.position, {
    duration: 1.5,
    x: cameraPosition.x,
    y: cameraPosition.y,
    z: cameraPosition.z,
    onUpdate: () => {
      camera.lookAt(new THREE.Vector3(...screenPosition));
      camera.updateProjectionMatrix();
    },
    onComplete,
  });
};
