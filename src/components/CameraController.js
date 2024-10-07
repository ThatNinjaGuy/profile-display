import React, { useRef, useEffect, useCallback } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export const CameraController = ({ orbitControlsEnabled }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  const targetRef = useRef(new THREE.Vector3());
  const moveSpeed = 0.5; // Adjust this value to change movement speed

  const handleKeyDown = useCallback(
    (event) => {
      const forward = new THREE.Vector3();
      const right = new THREE.Vector3();
      const up = new THREE.Vector3(0, 1, 0);

      // Get forward and right vectors
      camera.getWorldDirection(forward);
      right.crossVectors(up, forward).normalize();

      switch (event.key) {
        case "w":
          camera.position.addScaledVector(forward, moveSpeed);
          break;
        case "s":
          camera.position.addScaledVector(forward, -moveSpeed);
          break;
        case "ArrowLeft":
        case "a":
          camera.position.addScaledVector(right, moveSpeed);
          break;
        case "ArrowRight":
        case "d":
          camera.position.addScaledVector(right, -moveSpeed);
          break;
        case "ArrowDown":
        case "q":
          camera.position.addScaledVector(up, -moveSpeed);
          break;
        case "ArrowUp":
        case "e":
          camera.position.addScaledVector(up, moveSpeed);
          break;
        default:
          break;
      }

      // Update the orbit controls target
      targetRef.current.copy(camera.position).add(forward.multiplyScalar(10));
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetRef.current);
      }
    },
    [camera, moveSpeed]
  );

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.minDistance = 1;
      controlsRef.current.maxDistance = 1000;
      controlsRef.current.enablePan = true;
      controlsRef.current.enableZoom = true;
      controlsRef.current.minPolarAngle = 0;
      controlsRef.current.maxPolarAngle = Math.PI;
      controlsRef.current.minAzimuthAngle = -Infinity;
      controlsRef.current.maxAzimuthAngle = Infinity;
    }

    // Add keyboard event listeners
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useFrame(() => {
    if (controlsRef.current) {
      // Update the target to be 10 units in front of the camera
      targetRef.current
        .copy(camera.position)
        .add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(10));
      controlsRef.current.target.copy(targetRef.current);
    }
  });

  return (
    orbitControlsEnabled && (
      <OrbitControls
        ref={controlsRef}
        args={[camera, gl.domElement]}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
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
    // Time taken for transition is set in seconds
    duration: 1.75,
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
