import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Background } from "./Background.js";
import { VideoScreen } from "./VideoScreen.js";
import { NavigationItems } from "./NavigationItems.js";
import config from "../configs/navigationItems.json";

const Threescene = () => {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [0, 0, 15], fov: 60 }}
    >
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={100}
      />

      <Background />

      {/* Semi-circle of video screens on the background wall */}
      {config.items.map((item) => (
        <VideoScreen
          key={item.id}
          position={item.screenPosition}
          rotation={item.screenRotation}
          scale={[2, 2, 2]}
          videoId={item.videoId}
        />
      ))}

      {/* Centered existing video screens */}
      <VideoScreen
        position={[-10, 5, -10]}
        rotation={[0, Math.PI / 6, 0]}
        videoId="UUnvTritYtk"
      />
      <VideoScreen
        position={[10, 5, -10]}
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

      {/* Adjusted lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 10, 10]} intensity={1} />
      <pointLight position={[0, -10, -10]} intensity={0.5} />
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#000000"
        intensity={0.5}
      />
    </Canvas>
  );
};

export default Threescene;
