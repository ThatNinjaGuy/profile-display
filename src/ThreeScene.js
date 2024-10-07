import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";

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
      <boxGeometry args={[1.875, 1.5625, 0.15625]} />{" "}
      {/* Scaled by 1.5625 (1.25 * 1.25) */}
      <meshStandardMaterial color={hovered ? "red" : "blue"} />
      <Html
        transform
        style={{
          width: "300px", // Scaled width (240px * 1.25)
          height: "225px", // Scaled height (180px * 1.25)
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

const Threescene = () => {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw", background: "black" }}
      camera={{ position: [0, 0, 12], fov: 60 }} // Adjusted camera position for better fit
    >
      {/* Left Screen */}
      <VideoScreen
        position={[-5, 0.5, -2]} // Increased distance from center
        rotation={[0, Math.PI / 6, 0]}
        videoId="UUnvTritYtk"
      />

      {/* Right Screen */}
      <VideoScreen
        position={[5, 0.5, -2]} // Increased distance from center
        rotation={[0, -Math.PI / 6, 0]}
        videoId="UUnvTritYtk"
      />

      {/* Enlarged Profile Image Placeholder */}
      <Sphere args={[1.125, 32, 32]} position={[0, -0.5, -1]}>
        <meshStandardMaterial color="green" />
      </Sphere>

      {/* Enlarged Navigation Icons */}
      {[...Array(5)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.3, 16, 16]}
          position={[-3 + i * 1.5, -3.5, -1]}
        >
          <meshStandardMaterial color="blue" />
        </Sphere>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
    </Canvas>
  );
};

export default Threescene;
