import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Html, useTexture } from "@react-three/drei";

const VideoScreen = ({ position, rotation, videoId }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation[1];
    }
  });

  return (
    <mesh
      position={position}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.875, 1.5625, 0.15625]} />
      <meshStandardMaterial color={hovered ? "red" : "blue"} />
      <Html
        transform
        style={{
          width: "300px",
          height: "225px",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {videoId ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=1&loop=1&playlist=${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div>Loading video...</div>
        )}
      </Html>
    </mesh>
  );
};

const Background = () => {
  const backgroundTexture = useTexture("/backgroundImage.png");
  return (
    <mesh scale={[100, 100, 1]} position={[0, 0, -5]}>
      <planeGeometry />
      <meshBasicMaterial map={backgroundTexture} />
    </mesh>
  );
};

const NavigationItems = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.625, 30, 30]}
          position={[-5 + i * 2.5, -4.375, -0.5]} // Adjusted z-position
        >
          <meshStandardMaterial color="blue" />
        </Sphere>
      ))}
    </>
  );
};

const Threescene = () => {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [0, 0, 12], fov: 60 }}
    >
      {/* Background */}
      <Background />

      {/* Left Screen */}
      <VideoScreen
        position={[-7.5, 0.5, -2]}
        rotation={[0, Math.PI / 6, 0]}
        videoId="UUnvTritYtk"
      />

      {/* Right Screen */}
      <VideoScreen
        position={[7.5, 0.5, -2]}
        rotation={[0, -Math.PI / 6, 0]}
        videoId="UUnvTritYtk"
      />

      {/* Profile Image */}
      <Html position={[0, -0.5, -1]} transform>
        <img
          src="/profileImage.jpeg"
          alt="Profile"
          style={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
      </Html>

      {/* Navigation Items */}
      <NavigationItems />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
    </Canvas>
  );
};

export default Threescene;
