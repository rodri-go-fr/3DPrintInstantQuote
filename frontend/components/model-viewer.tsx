"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls, Environment, Center } from "@react-three/drei"
import { Color, Mesh, MeshStandardMaterial, BufferGeometry } from "three"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

interface ModelViewerProps {
  modelPath: string
  color: string
  material: string
  jobId?: string | undefined
  isLoading?: boolean
}

const getFileType = (path: string): 'stl' | 'obj' | 'gltf' | 'unknown' | 'fallback' => {
  if (!path || path === 'fallback') return 'fallback';
  const lowercasePath = path.toLowerCase();

  if (lowercasePath.endsWith('.stl')) {
    return 'stl';
  } else if (lowercasePath.endsWith('.obj')) {
    return 'obj';
  } else if (lowercasePath.endsWith('.gltf') || lowercasePath.endsWith('.glb')) {
    return 'gltf';
  }

  if (lowercasePath.includes('api/file/')) {
    if (lowercasePath.includes('.stl')) {
      return 'stl';
    } else if (lowercasePath.includes('.obj')) {
      return 'obj';
    } else if (lowercasePath.includes('.gltf') || lowercasePath.includes('.glb')) {
      return 'gltf';
    }
    return 'stl';
  }

  return 'unknown';
}

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

  const createMaterial = () => {
    return new MeshStandardMaterial({
      color: new Color(color),
      roughness: 0.5,
      metalness: 0.2
    });
  };

  const StlModel = ({ modelPath, color, onError }: { modelPath: string; color: string; onError?: () => void }) => {
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [error, setError] = useState<boolean>(false);
    const modelRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
      const loadModel = async () => {
        try {
          console.log("Loading STL model:", modelPath);
          const loadedGeometry = await new STLLoader().loadAsync(modelPath);
          const normalizedGeometry = centerAndNormalizeGeometry(loadedGeometry);
          setGeometry(normalizedGeometry);
        } catch (err) {
          console.error("Error loading STL model:", err);
          setError(true);
          if (onError) onError();
        }
      };

      loadModel();
    }, [modelPath, onError]);

    if (error) {
      return null;
    }

    if (!geometry) {
      return <mesh><boxGeometry args={[0.1, 0.1, 0.1]} /><meshBasicMaterial color="white" wireframe /></mesh>;
    }

    const material = new MeshStandardMaterial({
      color: new Color(color),
      roughness: 0.5,
      metalness: 0.2
    });

    return (
        <mesh ref={modelRef} geometry={geometry} material={material} />
    );
  }

  const ObjModel = () => {
    try {
      console.log("Loading OBJ model:", modelPath);
      const obj = useLoader(OBJLoader, modelPath);

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

  const GltfModel = () => {
    try {
      console.log("Loading GLTF model:", modelPath);
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
              scene.traverse((child: any) => {
                if (child.isMesh && child.material) {
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
      if (!model) return <mesh><boxGeometry args={[0.1, 0.1, 0.1]} /><meshBasicMaterial color="white" wireframe /></mesh>;

      return <primitive ref={modelRef} object={model} />;
    } catch (err) {
      console.error("Error in GLTF model component:", err);
      setError(true);
      if (onError) onError();
      return null;
    }
  };

  const FallbackModel = () => {
    console.log("Loading fallback model");
    return (
        <mesh ref={modelRef as React.RefObject<Mesh>}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={new Color(color)} />
        </mesh>
    );
  };

  if (error) {
    return <FallbackModel />;
  }

  switch (fileType) {
    case 'stl':
      return <StlModel modelPath={modelPath} color={color} onError={onError} />;
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
  const actualModelPath = modelPath || 'fallback';
  const router = useRouter();
  const [loadError, setLoadError] = useState<boolean>(false);
  const [isModelLoading, setIsModelLoading] = useState<boolean>(true);
  const { theme } = useTheme();

  useEffect(() => {
    console.log("ModelViewer useEffect triggered with modelPath:", modelPath);
    if (modelPath && modelPath !== 'fallback') {
      setLoadError(false);
      setIsModelLoading(true);

      const checkModelAvailability = async () => {
        try {
          if (modelPath.includes('api/file/')) {
            const response = await fetch(modelPath, { method: 'HEAD' });
            if (!response.ok) {
              console.log("Model file not available yet, will retry");

              if (modelPath.includes('.3mf')) {
                const stlPath = modelPath.replace('.3mf', '.stl');
                try {
                  const stlResponse = await fetch(stlPath, { method: 'HEAD' });
                  if (stlResponse.ok) {
                    console.log("Found converted STL file");
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
              setTimeout(() => {
                setIsModelLoading(false);
              }, 1000);
            }
          } else {
            setTimeout(() => {
              setIsModelLoading(false);
            }, 2000);
          }
        } catch (err) {
          console.error("Error checking model availability:", err);
        }
      };

      checkModelAvailability();

      const timer = setTimeout(() => {
        setIsModelLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsModelLoading(false);
    }
  }, [modelPath]);

  const handleModelError = () => {
    setLoadError(true);
  };

  const handleContactRedirect = () => {
    sessionStorage.setItem("modelError", "true");
    sessionStorage.setItem("selectedColor", color || "");
    sessionStorage.setItem("selectedMaterial", material || "");

    router.push("/contact");
  };

  if (isLoading || isModelLoading) {
    return (
        <div className="w-full h-full rounded-md overflow-hidden border bg-muted/20 flex flex-col items-center justify-center p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <h3 className="text-lg font-medium mb-2">Loading Model</h3>
          <p className="text-muted-foreground mb-4">
            We're preparing your 3D model for preview. This may take a moment...
          </p>
        </div>
    );
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
    );
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
  );
}