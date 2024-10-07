import React from "react";
import { Sphere, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import config from "../configs/navigationItems.json";
import { moveCamera } from "./CameraController";

export const NavigationItems = ({
  setNavigationItemClicked,
  openDisplayMenus,
}) => {
  const envMap = useTexture("/asphalt_04_diff_1k.jpg");
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  const { camera } = useThree();

  const handleClick = (item) => {
    setNavigationItemClicked(true);
    moveCamera(camera, item.screenPosition, item.screenRotation, () =>
      openDisplayMenus(true)
    );
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
