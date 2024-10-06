import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111); // Dark gray background
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode.appendChild(renderer.domElement);

    // Starry night background
    const loader = new THREE.TextureLoader();
    loader.load(
      "starryNight.avif",
      (texture) => {
        console.log("Background texture loaded successfully");
        scene.background = texture;
      },
      undefined,
      (error) => {
        console.error("Error loading background texture:", error);
      }
    );

    // Central image
    const imageGeometry = new THREE.PlaneGeometry(5, 5);
    loader.load(
      "/profileImage.jpeg",
      (texture) => {
        console.log("Profile image loaded successfully");
        const imageMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
        });
        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        scene.add(imageMesh);
      },
      undefined,
      (error) => {
        console.error("Error loading profile image:", error);
      }
    );

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Camera position
    camera.position.z = 10;

    // Orbit controls for navigation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the image (if it exists)
      const imageMesh = scene.children.find(
        (child) =>
          child instanceof THREE.Mesh &&
          child.geometry instanceof THREE.PlaneGeometry
      );
      if (imageMesh) {
        imageMesh.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      mountNode.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
