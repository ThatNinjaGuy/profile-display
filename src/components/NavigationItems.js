import React from "react";
import { Sphere, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import config from "../configs/navigationItems.json";

export const NavigationItems = () => {
  const envMap = useTexture("/asphalt_04_diff_1k.jpg");
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  return (
    <>
      {config.items.map((item) => (
        <Sphere
          key={item.id}
          args={[1.5, 30, 30]}
          position={item.spherePosition}
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
