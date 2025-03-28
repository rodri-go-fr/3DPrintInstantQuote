
"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei"
import { Suspense } from "react"
import { Color, Mesh, MeshStandardMaterial, BufferGeometry, Vector3 } from "three"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
// Import loaders dynamically to avoid TypeScript errors
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
// Note: 3MF files are converted to STL on the server

interface ModelViewerProps {
  modelPath: string
  color: string
  material: string
  jobId?: string | undefined
  isLoading?: boolean
}

// Helper function to determine file type
const getFileType = (path: string): 'stl' | 'obj' | 'gltf' | 'unknown' | 'fallback' => {
  if (!path || path === 'fallback') return 'fallback';
  const lowercasePath = path.toLowerCase();
  
  // Check for specific file extensions
  if (lowercasePath.endsWith('.stl')) {
    return 'stl';
  } else if (lowercasePath.endsWith('.obj')) {
    return 'obj';
  } else if (lowercasePath.endsWith('.gltf') || lowercasePath.endsWith('.glb')) {
    return 'gltf';
  }
  
  // For API URLs, we'll check for file extension in the URL path
  if (lowercasePath.includes('api/file/')) {
    if (lowercasePath.includes('.stl')) {
      return 'stl';
    } else if (lowercasePath.includes('.obj')) {
      return 'obj';
    } else if (lowercasePath.includes('.gltf') || lowercasePath.includes('.glb')) {
      return 'gltf';
    }
    // Default to STL for API URLs without clear extension
    return 'stl';
  }
  
  return 'unknown';
}

// Function to center and normalize a geometry
const centerAndNormalizeGeometry = (geometry: BufferGeometry) => {
  geometry.computeBoundingBox();
  
  if (!geometry.boundingBox) return geometry;
  
  const center = geometry.boundingBox.getCenter(new THREE.Vector3());
  geometry.center();
  
  const size = new THREE.Vector3();
  geometry.boundingBox.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2 / maxDim;
  
  geometry.scale(scale, scale, scale);
  
  return geometry;
}

function Model({ modelPath, color, onError }: { modelPath: string; color: string; onError?: () => void }) {
  const [error, setError] = useState<boolean>(false)
  const modelRef = useRef<THREE.Group | THREE.Mesh>(null)
  const fileType = getFileType(modelPath);
  
  // Create a standard material with the selected color
  const createMaterial = () => {
    return new MeshStandardMaterial({ 
      color: new Color(color),
      roughness: 0.5,
      metalness: 0.2
    });
  };
  
  // For STL files
  const StlModel = () => {
    try {
      // Use STLLoader for STL files
      const geometry = useLoader(STLLoader, modelPath);
      
      // Center and normalize the geometry
      const normalizedGeometry = centerAndNormalizeGeometry(geometry);
      
      // Create a new material with the selected color
      const material = createMaterial();
      
      return (
        <mesh ref={modelRef as React.RefObject<Mesh>} geometry={normalizedGeometry} material={material} />
      );
    } catch (err) {
      console.error("Error loading STL model:", err);
      setError(true);
      if (onError) onError();
      return null;
    }
  };
  
  // For OBJ files
  const ObjModel = () => {
    try {
      // Use OBJLoader for OBJ files
      const obj = useLoader(OBJLoader, modelPath);
      
      // Apply color to all materials in the model
      useEffect(() => {
        if (obj) {
          obj.traverse((child: any) => {
            if (child.isMesh) {
              child.material = createMaterial();
            }
          });
        }
      }, [obj, color]);
      
      return <primitive ref={modelRef} object={obj} scale={2} />;
    } catch (err) {
      console.error("Error loading OBJ model:", err);
      setError(true);
      if (onError) onError();
      return null;
    }
  };
  
  // For GLB/GLTF files
  const GltfModel = () => {
    try {
      // Use GLTFLoader directly for better control
      const gltfLoader = new GLTFLoader();
      const [model, setModel] = useState<THREE.Group | null>(null);
      const [loadingError, setLoadingError] = useState(false);
      
      useEffect(() => {
        let isMounted = true;
        
        gltfLoader.load(
          modelPath,
          (gltf) => {
            if (!isMounted) return;
            
            const scene = gltf.scene;
            // Apply color to all materials in the model
            scene.traverse((child: any) => {
              if (child.isMesh && child.material) {
                // Create a new material to avoid modifying the shared materials
                if (Array.isArray(child.material)) {
                  child.material = child.material.map((mat: any) => {
                    const newMat = mat.clone();
                    newMat.color = new Color(color);
                    return newMat;
                  });
                } else {
                  child.material = child.material.clone();
                  child.material.color = new Color(color);
                }
              }
            });
            
            setModel(scene);
          },
          undefined,
          (error) => {
            if (!isMounted) return;
            console.error("Error loading GLTF model:", error);
            setLoadingError(true);
            setError(true);
            if (onError) onError();
          }
        );
        
        return () => {
          isMounted = false;
        };
      }, [modelPath, color]);
      
      if (loadingError) return null;
      if (!model) return <mesh><boxGeometry args={[0.1, 0.1, 0.1]} /><meshBasicMaterial color="white" wireframe /></mesh>; // Tiny placeholder while loading
      
      return <primitive ref={modelRef} object={model} />;
    } catch (err) {
      console.error("Error in GLTF model component:", err);
      setError(true);
      if (onError) onError();
      return null;
    }
  };
  
  // Fallback to a simple cube when no model is available
  const FallbackModel = () => {
    return (
      <mesh ref={modelRef as React.RefObject<Mesh>}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={new Color(color)} />
      </mesh>
    );
  };
  
  // Render based on file type
  if (error) {
    return <FallbackModel />;
  }
  
  switch (fileType) {
    case 'stl':
      return <StlModel />;
    case 'obj':
      return <ObjModel />;
    case 'gltf':
      return <GltfModel />;
    case 'fallback':
    case 'unknown':
    default:
      return <FallbackModel />;
  }
}

export function ModelViewer({ modelPath, color, material, jobId, isLoading = false }: ModelViewerProps) {
  // If modelPath is null or undefined, use a fallback
  const actualModelPath = modelPath || 'fallback';
  const router = useRouter()
  const [loadError, setLoadError] = useState<boolean>(false)
  const [isModelLoading, setIsModelLoading] = useState<boolean>(true)
  const { theme } = useTheme()
  
  // Reset error state when model path changes
  useEffect(() => {
    if (modelPath && modelPath !== 'fallback') {
      setLoadError(false);
      setIsModelLoading(true);
      
      // Try to preload the model to check if it's available
      const checkModelAvailability = async () => {
        try {
          // For API URLs, check if the file exists
          if (modelPath.includes('api/file/')) {
            const response = await fetch(modelPath, { method: 'HEAD' });
            if (!response.ok) {
              console.log("Model file not available yet, will retry");
              
              // Check if there's a converted STL version (for 3MF files)
              if (modelPath.includes('.3mf')) {
                const stlPath = modelPath.replace('.3mf', '.stl');
                try {
                  const stlResponse = await fetch(stlPath, { method: 'HEAD' });
                  if (stlResponse.ok) {
                    console.log("Found converted STL file");
                    // File exists, but give it a moment to load in the viewer
                    setTimeout(() => {
                      setIsModelLoading(false);
                    }, 1000);
                  }
                } catch (stlErr) {
                  console.error("Error checking STL version:", stlErr);
                }
              }
            } else {
              console.log("Model file is available");
              // File exists, but give it a moment to load in the viewer
              setTimeout(() => {
                setIsModelLoading(false);
              }, 1000);
            }
          } else {
            // For direct file paths, just set a timeout
            setTimeout(() => {
              setIsModelLoading(false);
            }, 2000);
          }
        } catch (err) {
          console.error("Error checking model availability:", err);
          // Don't set error yet, just keep loading
        }
      };
      
      checkModelAvailability();
      
      // Set a longer timeout as a fallback to exit loading state
      const timer = setTimeout(() => {
        setIsModelLoading(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setIsModelLoading(false);
    }
  }, [modelPath]);

  // Handle model loading errors
  const handleModelError = () => {
    setLoadError(true)
  }

  // Redirect to contact form for incompatible models
  const handleContactRedirect = () => {
    // Store information about the failed model in session storage
    sessionStorage.setItem("modelError", "true")
    sessionStorage.setItem("selectedColor", color || "")
    sessionStorage.setItem("selectedMaterial", material || "")

    router.push("/contact")
  }

  // Show loading state
  if (isLoading || isModelLoading) {
    return (
      <div className="w-full h-full rounded-md overflow-hidden border bg-muted/20 flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <h3 className="text-lg font-medium mb-2">Loading Model</h3>
        <p className="text-muted-foreground mb-4">
          We're preparing your 3D model for preview. This may take a moment...
        </p>
      </div>
    )
  }
  
  if (loadError) {
    return (
      <div className="w-full h-full rounded-md overflow-hidden border bg-muted/20 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-medium mb-2">Unable to Preview Model</h3>
        <p className="text-muted-foreground mb-4">
          We couldn't load your 3D model for preview. This could be due to file format incompatibility or file
          corruption.
        </p>
        <Button onClick={handleContactRedirect}>Contact Support</Button>
      </div>
    )
  }

  return (
    <div className="w-full h-full rounded-md overflow-hidden border bg-muted/20 relative model-viewer-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={[theme === "dark" ? "#1a1a1a" : "#f5f5f5"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <Center>
            <Model modelPath={actualModelPath} color={color} onError={handleModelError} />
          </Center>
          <Environment preset="studio" />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={true} autoRotateSpeed={1} />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 right-2 bg-background/80 text-xs px-2 py-1 rounded">
        {material} • {color === "#ffffff" ? "White" : color === "#000000" ? "Black" : color}
      </div>
    </div>
  )
}
