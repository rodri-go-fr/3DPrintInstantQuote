'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { OrbitControls, Stage } from '@react-three/drei';
import { Color } from '../types';

interface ModelViewerProps {
  modelUrl: string;
  selectedColor?: Color;
  className?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, selectedColor, className }) => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (!modelUrl) return;

    setLoading(true);
    setError(null);

    const fileExtension = modelUrl.split('.').pop()?.toLowerCase();
    
    try {
      if (fileExtension === 'stl') {
        const loader = new STLLoader();
        loader.load(
          modelUrl,
          (geometry) => {
            setGeometry(geometry);
            setLoading(false);
          },
          (xhr) => {
            // Progress callback
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
          },
          (error) => {
            console.error('Error loading STL:', error);
            setError('Failed to load the 3D model');
            setLoading(false);
          }
        );
      } else if (fileExtension === '3mf') {
        const loader = new ThreeMFLoader();
        loader.load(
          modelUrl,
          (object) => {
            // ThreeMFLoader returns a Group, not a geometry
            // We need to extract the geometry from the first mesh
            const mesh = object.children.find((child) => child.type === 'Mesh');
            if (mesh && 'geometry' in mesh) {
              setGeometry(mesh.geometry);
            } else {
              setError('Invalid 3MF model structure');
            }
            setLoading(false);
          },
          (xhr) => {
            // Progress callback
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
          },
          (error) => {
            console.error('Error loading 3MF:', error);
            setError('Failed to load the 3D model');
            setLoading(false);
          }
        );
      } else {
        setError('Unsupported file format');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error in model loading:', err);
      setError('An error occurred while loading the model');
      setLoading(false);
    }
  }, [modelUrl]);

  // Reset camera when model changes
  useEffect(() => {
    if (geometry && controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [geometry]);

  return (
    <div className={`relative w-full h-96 rounded-lg overflow-hidden bg-gray-100 ${className || ''}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-red-500 text-center p-4">
            <svg
              className="w-12 h-12 mx-auto text-red-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 100], fov: 50 }}>
        <Stage environment="city" intensity={0.5}>
          {geometry && (
            <mesh>
              <primitive object={geometry} attach="geometry" />
              <meshStandardMaterial 
                color={selectedColor?.hex || '#CCCCCC'} 
                roughness={0.5} 
                metalness={0.2} 
              />
            </mesh>
          )}
        </Stage>
        <OrbitControls ref={controlsRef} autoRotate={!loading && !error} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
