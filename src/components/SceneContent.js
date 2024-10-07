import React from "react";
import { Html } from "@react-three/drei";
import { VideoScreen } from "./VideoScreen.js";
import { NavigationItems } from "./NavigationItems.js";
import config from "../configs/navigationItems.json";

const SceneContent = ({ setNavigationItemClicked, openDisplayMenus }) => {
  return (
    <>
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

      <NavigationItems
        setNavigationItemClicked={setNavigationItemClicked}
        openDisplayMenus={openDisplayMenus}
      />
    </>
  );
};

export default SceneContent;
