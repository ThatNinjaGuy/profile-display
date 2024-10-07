import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Background } from "./Background.js";
import { CameraController, moveCamera } from "./CameraController.js";
import Menu from "./Menu.js";
import SceneContent from "./SceneContent.js";
import NavigationInstructions from "./NavigationInstructions.js";

const initialCameraPosition = [0, 0, 18];
const initialCameraRotation = [0, 0, 0];

const HomeScreen = () => {
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
  const [navigationItemClicked, setNavigationItemClicked] = useState(false);
  const [displayMenusOpened, setDisplayMenusOpened] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const cameraRef = useRef();

  useEffect(() => {
    if (navigationItemClicked) {
      setOrbitControlsEnabled(false);
    }
  }, [navigationItemClicked]);

  const handleGoBack = () => {
    setNavigationItemClicked(false);
    setDisplayMenusOpened(false);

    // Reset camera to initial position
    if (cameraRef.current) {
      moveCamera(
        cameraRef.current,
        initialCameraPosition, // Initial position
        initialCameraRotation, // No rotation
        () => {
          // Callback after camera movement is complete
          setOrbitControlsEnabled(true);
        }
      );
    }
  };

  return (
    <>
      <Canvas style={{ height: "100vh", width: "100vw" }}>
        <PerspectiveCamera
          makeDefault
          ref={cameraRef}
          position={initialCameraPosition}
          fov={60}
        />
        <CameraController orbitControlsEnabled={orbitControlsEnabled} />

        <Background />

        <SceneContent
          setNavigationItemClicked={setNavigationItemClicked}
          openDisplayMenus={setDisplayMenusOpened}
        />

        {/* Setup lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 10, 10]} intensity={1} />
        <pointLight position={[0, -10, -10]} intensity={0.5} />
        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#000000"
          intensity={0.5}
        />
      </Canvas>
      {displayMenusOpened && <Menu onGoBack={handleGoBack} />}
      <NavigationInstructions
        isVisible={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </>
  );
};

export default HomeScreen;
