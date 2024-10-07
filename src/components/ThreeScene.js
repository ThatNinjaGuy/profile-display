import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Background } from "./Background.js";
import { VideoScreen } from "./VideoScreen.js";
import { NavigationItems } from "./NavigationItems.js";

const Threescene = () => {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [0, 5, 20], fov: 60 }}
    >
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />

      <Background />

      {/* Adjust positions of other elements */}
      <VideoScreen
        position={[-7.5, 5, -10]}
        rotation={[0, Math.PI / 6, 0]}
        videoId="UUnvTritYtk"
      />

      <VideoScreen
        position={[7.5, 5, -10]}
        rotation={[0, -Math.PI / 6, 0]}
        videoId="UUnvTritYtk"
      />

      <Html position={[0, 2, 0]} transform>
        <img
          src="/profileImage.jpeg"
          alt="Profile"
          style={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
      </Html>

      <NavigationItems />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#000000"
        intensity={0.5}
      />
    </Canvas>
  );
};

export default Threescene;
