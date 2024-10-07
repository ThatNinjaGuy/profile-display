import React from "react";
import { Sphere, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import config from "../configs/navigationItems.json";

export const NavigationItems = ({ setOrbitControlsEnabled }) => {
  const envMap = useTexture("/asphalt_04_diff_1k.jpg");
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  const { camera } = useThree();

  const handleClick = (item) => {
    setOrbitControlsEnabled(false);

    const screenPosition = new THREE.Vector3(...item.screenPosition);
    const screenRotation = new THREE.Euler(...item.screenRotation);

    // Calculate a position slightly in front of the screen
    const offset = new THREE.Vector3(0, 0, 5).applyEuler(screenRotation);
    const cameraPosition = screenPosition.clone().add(offset);

    // Calculate the camera rotation
    const cameraRotation = new THREE.Euler(
      screenRotation.x,
      screenRotation.y + Math.PI, // Rotate 180 degrees to face the screen
      screenRotation.z
    );

    gsap.to(camera.position, {
      duration: 1.5,
      x: cameraPosition.x,
      y: cameraPosition.y,
      z: cameraPosition.z,
      onUpdate: () => camera.updateProjectionMatrix(),
    });

    gsap.to(camera.rotation, {
      duration: 1.5,
      x: cameraRotation.x,
      y: cameraRotation.y,
      z: cameraRotation.z,
      onUpdate: () => camera.updateProjectionMatrix(),
      onComplete: () => setOrbitControlsEnabled(true),
    });
  };

  return (
    <>
      {config.items.map((item) => (
        <Sphere
          key={item.id}
          args={[1.5, 30, 30]}
          position={item.spherePosition}
          onClick={() => handleClick(item)}
        >
          <meshPhongMaterial
            shininess={100}
            envMap={envMap}
            reflectivity={0.9}
          />
          <Html
            position={[0, 0, 0]}
            center
            distanceFactor={10}
            zIndexRange={[100, 0]}
          >
            <div
              style={{
                color: "white",
                fontSize: "32px",
                textAlign: "center",
                fontWeight: "bold",
                width: "100px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {item.title}
            </div>
          </Html>
        </Sphere>
      ))}
    </>
  );
};
