import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export const VideoScreen = ({ position, rotation, videoId }) => {
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
