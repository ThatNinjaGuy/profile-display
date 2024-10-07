import React from "react";
import { Sphere, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

export const NavigationItems = () => {
  const envMap = useTexture("/asphalt_04_diff_1k.jpg");
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Sphere
          key={i}
          args={[1.5, 30, 30]}
          position={[-10 + i * 5, -4.375, -0.5]}
        >
          <meshPhongMaterial
            // color="#E5E4E2"
            // specular="#FFFFFF"
            shininess={100}
            envMap={envMap}
            reflectivity={0.9}
          />
          <Html
            position={[0, 0, 0]} // Moved slightly in front of the sphere
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
              Item {i + 1}
            </div>
          </Html>
        </Sphere>
      ))}
    </>
  );
};
